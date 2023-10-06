import React, { useEffect} from 'react'
import api from '../api'
import { useDispatch, useSelector} from 'react-redux'
import { MovieReducerActions } from '../redux/reducers/movieSlice'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


const Home = () => {

  const dispatch = useDispatch()

  const {popularMovies , topRatedMovies , upcomingMovies} = useSelector((state)=>state.movie)

  let [loading, setLoading] = useState(true);

  // const override: CSSProperties = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "red",
  // };

  // console.log("pm : " , pm[0])

  // const popularReq = async () => {
  //   let res = await api.get('movie/popular?language=ko-KR&page=1')
  //     console.log("popular", res)
  // }


  // 3가지 종류의 영화목록을 묶어서 요청하는 방법
  // Promist.all() : 모든 요청에 대한 응답이 올 때까지
  const getMovieList = async () => {
    

    setLoading(true) // 데이터를 가져오기 전

    const popularList = api.get('movie/popular?language=ko-KR&page=1')
    const topRatedList = api.get('movie/top_rated?language=ko-KR&page=1')
    const upcomingList = api.get('movie/upcoming?language=ko-KR&page=1')
    const genreList = api.get('genre/movie/list?language=ko')

    const [popular, topRated, upcoming, genre] = await Promise.all([popularList, topRatedList, upcomingList, genreList])

    dispatch(MovieReducerActions.initData({
      popular : popular.data, 
      topRated : topRated.data, 
      upcoming : upcoming.data,
      genre : genre.data
    }))

    setLoading(false)

  }

  useEffect(()=>{
    getMovieList()
  },[])

  // true : 데이터를 가져 오기 전
  // false : 데이터를 가져 온 후
  return (
    <div>
      {loading ? (
        <ClipLoader
        color="white"
        loading={loading}
        size={150}
        // cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      ) : (
        <>
          <Banner movie={popularMovies[0]}/>
          <h1>인기있는 영화</h1>
          <MovieSlide movies={popularMovies}/>
          <h1>평점이 높은 영화</h1>
          <MovieSlide movies={topRatedMovies}/>
          <h1>개봉예정인 영화</h1>
          <MovieSlide movies={upcomingMovies}/>
        </>
      )
      }
      
    </div>
  )
}

export default Home

