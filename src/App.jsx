import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Routes, Route, Link, useNavigate, useParams, Navigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Home } from './Home';

export default function App() {

  const [movieList, setMovieList] = useState([])
  const navigate = useNavigate()
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => navigate("/")} color="inherit">Home</Button>
            <Button onClick={() => navigate("/movies")} color="inherit">Movie</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seats" element={<Proudctedroute><Seats /></Proudctedroute>} />
        <Route path="/showtime" element={<Theater/>} />
        <Route path="/movies" element={<MovieList movieList={movieList} setMovieList={setMovieList} />} />
        <Route path="/movies/:id" element={<MovieDetails movieList={movieList} />} />
      </Routes>

    </div>
  )
}

function Proudctedroute({children}){
  const token=localStorage.getItem('token');
  // const token=false;
  return(
   token? <section>{children}</section>:<Navigate replace to="/"/>
  //  token? <section>{children}</section>:<h1>unautharaied</h1>
  )
}

function MovieDetails({ movieList }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  useEffect(() => {
    fetch(`https://641061f4864814e5b64fe12e.mockapi.io/movies/${id}`)
      .then((data) => data.json())
      .then((mvs) => setMovie(mvs))
  }, [id])
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
      <div className="movie-detail-container">
        <h1>Movie Details of {movie.name}</h1>
       
            <p className="movie-summary">{movie.summary}</p>
         
        <Button onClick={() => navigate("/showtime")} color="inherit">book ticket</Button>
      </div>
    </div>
  )
}

function MovieList({ movieList, setMovieList }) {
  useEffect(() => {
    fetch("https://641061f4864814e5b64fe12e.mockapi.io/movies")
      .then((data) => data.json())
      .then((mvs) => setMovieList(mvs))
  }, [])

  return (
    <div className="movie-list">
      {movieList.map((mv, id) => <Movies key={mv.id} movie={mv} id={mv.id} />)}
    </div>
  )
}


function Movies({ movie, id }) {
  const navigate = useNavigate()
  return (
    <Card  onClick={() => navigate(`/movies/${id}`)}>

      <div className="movie-container">

        <img className="movie-poster" src={movie.poster} alt={movie.name} />
        <CardContent>
          <div>
            <div className="movie-data">
              <CardActions>
                <p className="movie-name"><h2>{movie.name}
                  <IconButton color="primary" fontSize="small"
                    onClick={() => navigate(`/movies/${id}`)}>
                    <InfoIcon /></IconButton>
                </h2></p>
                <p className="movie-rating">⭐{movie.rating}</p>
              </CardActions>
            </div>
            {/* <p className="movie-summary">{movie.summary}</p> */}
          </div>

        </CardContent>
      </div >

    </Card >
  )
}

function Theater(){
  const showtime=[{"id":"1","theatername":"pss multiplex","show1":"09:00 am","show2":"09:00 pm"},
  {"id":"2","theatername":"bharathi multiplex","show1":"09:00 am","show2":"09:00 pm"},
  {"id":"3","theatername":"bhagavath multiplex","show1":"09:00 am","show2":"09:00 pm"},
  {"id":"4","theatername":"fathima multiplex","show1":"09:00 am","show2":"09:00 pm"}]
  return(
    <div className='show'>
      {showtime.map((mv) => <Showtime key={mv.id} show={mv} id={mv.id} />)}
      </div>
  )
}


function Showtime({show}){
  const navigate = useNavigate()
  return(
    <div>
      <h2>{show.theatername}</h2>
      <Button onClick={() => navigate("/seats")} color="inherit" variant='contained'>{show.show1}</Button>
      <Button onClick={() => navigate("/seats")} color="inherit" variant='contained'>{show.show2}</Button>
      </div>
  )
}

function Seats(){
  const button = Array(100).fill(<CheckBoxOutlineBlankIcon />)
    return (
        <div className="seatlist">
            {button.map((btn, i) => <Seatbooking key={i} button={btn} />)}
        </div>
    )

}

function Seatbooking({button,key}){
  const [active, setActive] = useState(true)
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count + 1)
        setActive(!active)
        console.log("clicked")
    }
    return (
        <div className="seats">
            <Button color={active ? "success" : "inherit"} onClick={handleClick}>{button}{key}</Button>
        </div>
    )
}