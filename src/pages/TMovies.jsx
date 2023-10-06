import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TMovies = () => {

  const { popularMovies } = useSelector((state)=> state.movie)
  const [filter, setFilter] = useState([])
  const [name, setName] = useState()

  const movieSorted = ( keyword , sortMethod) => {
    // React에서 state는 불변성을 유지해야 하기 때문에
    // 전개 연산자를 통해서 새로운 배열을 생성하고 sort()함수를 실행해야 한다.
    // 정렬된 배열을 state에 다시 초기화해주면 영화정보가 정렬되어 출력된다.
    let list = [...filter]
    let result = []

    if(keyword === '평점'){
        result =
            sortMethod === "asc" 
            ? list.sort((a,b)=> a.vote_average - b.vote_average) 
            : list.sort((a,b)=> b.vote_average - a.vote_average)
    } else if (keyword === '인기도'){
        result =
            sortMethod === "asc" 
            ? list.sort((a,b)=> a.popularity - b.popularity) 
            : list.sort((a,b)=> b.popularity - a.popularity)
    } else if (keyword === '제목'){
        result =
            sortMethod === "asc" 
            ? list.sort((a,b)=> a.title.localeCompare(b.title)) 
            : list.sort((a,b)=> b.title.localeCompare(a.title))
    }

    // let result = list.sort((a,b)=> a.vote_average - b.vote_average)
    // console.log('실행결과 : ', result)

    setFilter(result)
    // set
  }


  useEffect(()=>{
    if(popularMovies.length !== 0){
        setFilter(popularMovies)
    }
  },[])

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>인기 영화 필터링</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>정렬</Accordion.Header>
                <Accordion.Body>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      정렬방식을 선택하세요!
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1" onClick={()=>movieSorted('제목', 'asc')}>
                        제목 오름차순
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2" onClick={()=>movieSorted('제목', 'decs')}>
                        제목 내림차순
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3" onClick={()=>movieSorted('평점', 'asc')}>
                        평점 오름차순
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-4" onClick={()=>movieSorted('평점', 'decs')}>
                        평점 내림차순
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-5" onClick={()=>movieSorted('인기도', 'asc')}>
                        인기도 오름차순
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-6" onClick={()=>movieSorted('인기도', 'decs')}>
                        인기도 내림차순
                      </Dropdown.Item>
                    </Dropdown.Menu>

                  </Dropdown>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col sm={9} className='movie-card-list'>
            {filter.map((item)=>(
                <Link to={`/movies/${item.id}`}>
                    <Card style={{ width: '13rem' , marginBottom : "13px" }}>
                    <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} />
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                            {item.release_date}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Link>
            ))}

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TMovies
