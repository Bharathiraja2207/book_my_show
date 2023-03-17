import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Routes, Route, Link, useNavigate, useParams, Navigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { Home } from './Home';
import { Seats } from './Seats';
import { AddTheatre } from './AddTheatre';
import { AddMovies } from './AddMovies';
import TextField from '@mui/material/TextField';

export default function App() {

  const [movieList, setMovieList] = useState([])
  const navigate = useNavigate()
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => navigate("/")} color="inherit">Home</Button>
            <Button onClick={() => navigate("/movies")} color="inherit">Movies</Button>
            <Button onClick={() => navigate("/addmovies")} color="inherit">Add Movies </Button>
            <Button onClick={() => navigate("/add-theatre")} color="inherit">Add Theatre</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seats" element={<Proudctedroute><Seats /></Proudctedroute>} />
        <Route path="/showtime" element={<Proudctedroute><Theater/></Proudctedroute>} />
        <Route path="/movies" element={<Proudctedroute><MovieList movieList={movieList} setMovieList={setMovieList} /></Proudctedroute>} />
        <Route path="/movies/:id" element={<Proudctedroute><MovieDetails movieList={movieList} /></Proudctedroute>} />
        <Route path="/ticketbooked" element={<Proudctedroute><TicketBooked /></Proudctedroute>} />
        <Route path="/add-theatre" element={<Proudctedroute><AddTheatre /></Proudctedroute>} />
        <Route path="/addmovies" element={<Proudctedroute><AddMovies /></Proudctedroute>} />
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

function TicketBooked() {
  return (
    <div className='ticketconform'><h2>ticket conformed</h2> </div>
  )
}

function MovieDetails({ movieList }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  useEffect(() => {
    fetch(`https://tasty-sweater-tuna.cyclic.app/moviesid/${id}`)
      .then((data) => data.json())
      .then((mvs) => setMovie(mvs))
  }, [id])
  return (
    <div className='trailer'>
      <div className='video'>
      <iframe
        width="70%"
        height="450"
        src={movie.trailer}
        title="Marvel"
        frameborder="0"
        allow="accelerometer; autoplay;clipboard-white"
        allowfullscreen
      ></iframe>
      </div>
      <div className="movie-detail-container">
        <h1>Movie Name : {movie.name}</h1>
       
            <p className="movie-summary"><h4>{movie.summary}</h4></p>
         
        <Button onClick={() => navigate("/showtime")} variant="contained" color="success">book ticket</Button>
      </div>
    </div>
  )
}

function MovieList({ movieList, setMovieList }) {
  const [search,setsearch]=useState("")
  useEffect(() => {
    fetch("https://tasty-sweater-tuna.cyclic.app/moviesid")
      .then((data) => data.json())
      .then((mvs) => setMovieList(mvs))
  }, [])

  return (
    <div className="movie-list...">
   <div className='searchbar'> <TextField  type="text" placeholder='search movie...'onChange={(event)=>setsearch(event.target.value)} /></div>
    <div className='movie-list'>
          {movieList.filter((mv)=>{
  if(search ===""){
    return mv
  }else if(mv.name.toLowerCase().includes(search.toLowerCase())){
    return mv
  }
  }).map((mv, id,key) => <Movies keys={key} movie={mv} id={mv.id} />)}
  </div>
  </div>

  )
  }


function Movies({ movie, id,keys }) {
  const navigate = useNavigate()
  return (
    <div className='moviearrange'>    
    <Card  onClick={() => navigate(`/movies/${id}`)}>

      <div key={keys} className="movie-container">

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
    </div>

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



