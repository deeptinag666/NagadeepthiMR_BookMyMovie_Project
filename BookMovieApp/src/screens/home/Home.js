import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import GridList from "@material-ui/core/GridList";

const Home = (props) => {
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);

  const getMovies = async () => {
      try{
        const response = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=10', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        console.log(response);
        return await response.json();
      }catch(error){
          console.error(error);
          return [];
      }  
  };

  useEffect(() => {
    const movieList = getMovies();
    // const movieList = [
    //   {
    //     poster_url: "",
    //     title: "",
    //   },
    //   {
    //     poster_url: "",
    //     title: "",
    //   },
    // ];
    setUpcomingMoviesList(movieList);
  }, []);

  return (
    <Stack direction="row">
      <Header baseUrl={props.baseUrl} />
      <div className="homePageHeader">Upcoming Movies</div>
      <GridList></GridList>
    </Stack>
  );
};

export default Home;
