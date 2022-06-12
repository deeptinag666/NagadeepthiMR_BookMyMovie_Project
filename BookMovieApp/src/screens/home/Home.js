import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { Grid } from "@mui/material";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const Home = (props) => {
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8085/api/v1/movies?page=1&limit=10"
      );
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(async () => {
    console.log("inside useeffect hook");
    const moviesResponse = await getMovies();
    const movieList = [];
    moviesResponse.movies.map((movie) => {
      movieList.push(movie);
    });
    setUpcomingMoviesList(movieList);
  }, []);

  return (
    <Grid container direction="row">
      <Header baseUrl={props.baseUrl} />
      <div className="homePageHeader">Upcoming Movies</div>
      <div className="containerDiv">
        <GridList cellHeight={250} cols={6} className="gridListStyle">
          {upcomingMoviesList.map((movie) => (
            <GridListTile key={movie.poster_url}>
              <img src={movie.poster_url} alt={movie.title} />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Grid>
  );
};

export default Home;
