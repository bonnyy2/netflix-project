import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieNav from './components/MovieNav';
import TMovies from './pages/TMovies';

function App() {
  return (
    <div>
      <MovieNav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/movies' element={<TMovies/>}></Route>
        <Route path='/movies/:id' element={<MovieDetail/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
