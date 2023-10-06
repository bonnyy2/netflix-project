import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Accordion } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

const Movies = () => {
  const { popularMovies } = useSelector((state) => state.movie)
  const [sortRes, setSortRes] = useState([])

  const polular = [...sortRes]

  const arr = [
    '제목 오름차순',
    '제목 내림차순',
    '평점 오름차순',
    '평점 내림차순',
    '인기도 오름차순',
    '인기도 내림차순',
  ]

  const clickHandler = (e) => {

    let result = []
    
    switch(e.target.innerText){
      case '제목 오름차순' : result = polular.sort((a,b)=> a.title.localeCompare(b.title)) 
      break
      case '제목 내림차순' : result = polular.sort((a,b)=> b.title.localeCompare(a.title))
      break
      case '평점 오름차순' : result = polular.sort((a, b) => a.vote_average - b.vote_average)
      break
      case '평점 내림차순' : result = polular.sort((a, b) => b.vote_average - a.vote_average)
      break
      case '인기도 오름차순' : result = polular.sort((a, b) => a.popularity - b.popularity)
      break
      case '인기도 내림차순' : result = polular.sort((a, b) => b.popularity - a.popularity)
      break
    }

    setSortRes(result)

  }

  useEffect(()=>{
    if(popularMovies.length !== 0){
      setSortRes(popularMovies)
    }
  },[])

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>정렬</Accordion.Header>
          {arr.map((item, index) => (
            <Accordion.Body onClick={clickHandler} key={index}>
              {item}
            </Accordion.Body>
          ))}
        </Accordion.Item>
      </Accordion>
      
      {sortRes.map((item)=>(
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/original${item.poster_path}`} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              {item.release_date}
            </Card.Text>
          </Card.Body>
        </Card> 
))}
    </div>
  )
}

export default Movies
