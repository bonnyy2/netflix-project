import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import api from '../api'
import Accordion from 'react-bootstrap/Accordion';

// /movies/1 -> useParams()
// /movies?id=1 -> useSearchParams()
const MovieDetail = () => {
  const { id } = useParams()

  console.log('[MovieDetail.jsx] :', id)

  const [movieDetail, setMovieDetail] = useState(null)
  const [reviews, setReviews] = useState([])

  const getMovieDetail = async () => {
    let res = await api.get(`/movie/${id}?language=ko`)
    console.log('[MovieDetail.js]', res.data)

    setMovieDetail(res.data)
  }

  const getReviews = async () => {
    let res = await api.get(`/movie/${id}/reviews?language=en-US&page=1`)
    console.log(res.data)
    setReviews(res.data.results)
  }

  useEffect(() => {
    getMovieDetail()
    getReviews()
  }, [])

  return (
    <div>
      {movieDetail ? (
        <div className="container movie-details">
          <div className="poster">
            <img
              src={`https://www.themoviedb.org/t/p/original${movieDetail.poster_path}`}
              alt="포스터 사진"
            />
          </div>
          <div className="info">
            <div className="genre">
              {movieDetail.genres.map((item)=>(
                <Badge bg="danger" key={item.id}>{item.name}</Badge>
              ))}
            </div>
            <h1 className='movie-title'>{movieDetail.title}</h1>
            <h4>{movieDetail.tagline}</h4>
            <div>
              <span>{movieDetail.release_date}</span>
              <span>상영시간: {movieDetail.runtime}분</span>
              <span>평점: {movieDetail.vote_average}점</span>
              <span>{movieDetail.adult? '청불' : '18세 미만'}</span>
            </div>
            <div className="overview">
              {movieDetail.overview}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* 리뷰영역 */}
      <div className="container review-box">
        <div>
          <h1>리뷰</h1>
        </div>
        {reviews.map((item, index)=>(
          <div className="review-item" key={index}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header bsPrefix={{backgroundColor:"black"}}>{item.author}</Accordion.Header>
                <Accordion.Body style={{backgroundColor:'gray'}}>
                  {item.content}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieDetail
