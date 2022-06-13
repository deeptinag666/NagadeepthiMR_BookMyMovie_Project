import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const Home = (props) => {
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
  const [releasedMoviesList, setReleasedMoviesList] = useState([]);

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

  const getReleasedMovies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8085/api/v1/movies?status=RELEASED"
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
    const releasedMoviesResponse = await getReleasedMovies();
    const movieList = [];
    const releasedMoviesList = [];
    moviesResponse.movies.map((movie) => {
      movieList.push(movie);
    });
    releasedMoviesResponse.movies.map((movie) => {
      releasedMoviesList.push(movie);
    });
    setUpcomingMoviesList(movieList);
    setReleasedMoviesList(releasedMoviesList);
  }, []);

  return (
    <React.Fragment>
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
      <Grid container spacing={2} direction="column">
        <Grid item style={{ width: "76%" }}>
          <div className="containerReleaseDiv">
            <GridList cellHeight={350} cols={4}>
              {releasedMoviesList.map((movie) => (
                <GridListTile
                  className="releaseMovieGridTile"
                  key={movie.poster_url}
                >
                  <img src={movie.poster_url} alt={movie.title} />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={<span>Release Date: {movie.release_date}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
        <Grid item style={{ width: "26%" }}>
          <Card variant="outlined">
            <CardHeader
              title="FIND MOVIES BY:"
              sx={{ color: "text.primary.light", fontSize: 14 }}
            ></CardHeader>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
