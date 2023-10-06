import React from 'react'
import Badge from 'react-bootstrap/Badge'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {  

  // const dispatch = useDispatch()
  // const [isHovering, setIsHovering] = useState(false)

  // const handleMouseOver = () => {
  //   setIsHovering(true)
  // }

  // const handleMouseOut = () => {
  //   setIsHovering(false)
  // }

  const genreList = useSelector((state)=> state.movie.genreList)

  // const handleClick = (e) => {
  // }


  const div_style = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.poster_path})`,
    width: '300px',
    height: '200px',
  }

  return (
    <div style={div_style} className='movie-card'>
      <Link to={`/movies/${movie.id}`}>
      <div className='overlay'  >
        <h1>{movie.title}</h1>
        <div className='genres'>
          {movie.genre_ids.map((id) => {
            // find() : 일치한 정보들 중 첫번째 요소만 반환하는 함수
            const a = genreList.find((item) => item.id === id)
            if(a){
              return (
                <Badge bg="danger" key={id}>
                  {a.name}
                </Badge>
              )
            } else {
              return null
            }
          })}
        </div>
        <div className='info'>
          <span>{`평점: ${movie.vote_average}점`}</span>
          <span>|</span>
          <span>{movie.adult ? '청불' : '청소년관람'}</span>
        </div>
      </div>
      </Link>
    </div>
  )
}

// 내가 한거

// return (
//   <div style={div_style} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} key={movie.id}>
//     {isHovering && <div className='movieHover'>
//       <h3 className='title'>{movie.title}</h3>
//       {movie.genre_ids.map((item)=>(
//         <Badge bg="danger" className='badge'>{item}</Badge>
//       ))}
//       {movie.adult ? (<h6 className='avg'>평점: {movie.vote_average}점 | 성인</h6>) : (<h6 className='avg'>평점: {movie.vote_average}점 | 청소년</h6>)}
//     </div>}
//   </div>
// )

export default MovieCard
