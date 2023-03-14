import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';


export default function App() {
  const [movieList, setMovieList] = useState([{
    "_id": "63f8d87354972eaaeb617522",
    "id": "102",
    "name": "No Country for Old Men",
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating": 8.1,
    "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
    },
    {
    "_id": "63f8d87354972eaaeb617529",
    "name": "Thor: Ragnarok",
    "poster": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg",
    "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\\n of researchers, to find a new planet for humans.",
    "rating": 8.8,
    "trailer": "https://youtu.be/NgsQ8mVkN8w",
    "id": "109"
    },
    {
    "_id": "63f8d87354972eaaeb61751f",
    "id": "99",
    "name": "Vikram😍😍😍",
    "poster": "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
    "rating": 8,
    "summary": "Members of a black ops team must track and eliminate a gang of masked murderers.",
    "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
    }])
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.05 }}>
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movies
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList movieList={movieList} />} />
        <Route path="/movies/:id" element={<MovieDetails movieList={movieList} setMovieList={setMovieList} />} />
      </Routes>
      {/* <Home />
      <MovieList /> */}
    </div>
  )
}

function MovieDetails({ movieList }) {
  const { id } = useParams()
  const movie = movieList[id]
  return (
    <div>
       <iframe
        width="100%"
        height="650"
        src={movie.trailer}
        title="Marvel"
        frameborder="0"
        allow="accelerometer; autoplay;clipboard-white"
        allowfullscreen
      ></iframe>
      Movie details {movie.name}</div>
  )
}
function Home() {
  return (
    <div>Welcome to bookmyshow</div>

  )
}

function MovieList({ movieList }) {

  return (
    <div className="movie-list">
      {movieList.map((mv, id) => <Movies key={mv.id} movie={mv} id={mv.id} />)}
    </div>
  )
}
function Movies({ movie, id }) {
  const navigate = useNavigate()
  return (
    <div className="movie-container">
      <img className="movie-poster" src={movie.poster} alt={movie.name} />

      <div>
        <div className="movie-data">

          <p className="movie-name"><h2>{movie.name}</h2>
          </p>
          <IconButton color="primary" fontSize="small"
            onClick={() => navigate(`/movies/${id}`)}
            arial-label="movie-details">
            <InfoIcon />
          </IconButton>
          <p className="movie-rating">⭐{movie.rating}</p>

        </div>
        <p className="movie-summary">{movie.summary}</p>
      </div >
    </div >
  )
}