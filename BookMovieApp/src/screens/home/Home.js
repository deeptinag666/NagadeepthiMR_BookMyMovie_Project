import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  createTheme,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@mui/material";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { ThemeProvider } from "@emotion/react";
import { blue } from "@mui/material/colors";
import createPalette from "@material-ui/core/styles/createPalette";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@mui/material";

const Home = (props) => {
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
  const [releasedMoviesList, setReleasedMoviesList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [releaseStartDate, setReleaseStartDate] = useState(null);
  const [releaseEndDate, setReleaseEndDate] = useState(null);

  const theme = createTheme({
    palette: createPalette({
      type: "light",
      primary: blue,
    }),
    spacing: 4,
  });
  theme.spacing(2);

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

  const getGenres = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/v1/genres");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getArtists = async () => {
    try {
      const response = await fetch(
        "http://localhost:8085/api/v1/artists?page=1&limit=10"
      );
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const selectedGenresHandler = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const selectedArtistsHandler = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedArtists(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const applySearchHandler = () => {}

  useEffect(async () => {
    console.log("inside useeffect hook");
    const moviesResponse = await getMovies();
    const releasedMoviesResponse = await getReleasedMovies();
    const genresResponse = await getGenres();
    const artistsResponse = await getArtists();
    const movieList = [];
    const releasedMoviesList = [];
    const genresList = [];
    const artistsList = [];
    moviesResponse.movies.map((movie) => {
      movieList.push(movie);
    });
    releasedMoviesResponse.movies.map((movie) => {
      releasedMoviesList.push(movie);
    });
    genresResponse.genres.map((genreData) => {
      genresList.push(genreData);
    });
    artistsResponse.artists.map((artistData) => {
      artistsList.push(artistData);
    });
    setUpcomingMoviesList(movieList);
    setReleasedMoviesList(releasedMoviesList);
    setGenres(genresList);
    setArtists(artistsList);
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
      <Grid container spacing={2} style={{ width: "100%" }}>
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
        <Grid item style={{ width: "24%", marginTop: "10px" }}>
          <ThemeProvider theme={theme}>
            <Card variant="outlined">
              <CardHeader
                title="FIND MOVIES BY:"
                titleTypographyProps={{ variant: "h7" }}
              ></CardHeader>
              <CardContent>
                <FormControl>
                  <TextField
                    variant="standard"
                    label="Movie Name"
                    style={{ minWidth: "240px", maxWidth: "240px" }}
                  ></TextField>

                  <FormControl
                    variant="standard"
                    sx={{ mt: 3, minWidth: 240, maxWidth: 240 }}
                  >
                    <InputLabel id="genresSelect">Genres</InputLabel>
                    <Select
                      labelId="genresSelect"
                      multiple
                      renderValue={(selected) => selected.join(", ")}
                      value={selectedGenres}
                      onChange={selectedGenresHandler}
                    >
                      {genres.map((genreInfo) => (
                        <MenuItem key={genreInfo.genre} value={genreInfo.genre}>
                          <Checkbox
                            checked={
                              selectedGenres.indexOf(genreInfo.genre) > -1
                            }
                          />
                          <ListItemText primary={genreInfo.genre} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="standard"
                    sx={{ mt: 3, minWidth: 240, maxWidth: 240 }}
                  >
                    <InputLabel id="artistsSelect">Artists</InputLabel>
                    <Select
                      labelId="artistsSelect"
                      multiple
                      renderValue={(selected) => selected.join(", ")}
                      value={selectedArtists}
                      onChange={selectedArtistsHandler}
                    >
                      {artists.map((artistInfo) => (
                        <MenuItem
                          key={artistInfo.first_name.concat(
                            " ",
                            artistInfo.last_name
                          )}
                          value={artistInfo.first_name.concat(
                            " ",
                            artistInfo.last_name
                          )}
                        >
                          <Checkbox
                            checked={
                              selectedArtists.indexOf(
                                artistInfo.first_name.concat(
                                  " ",
                                  artistInfo.last_name
                                )
                              ) > -1
                            }
                          />
                          <ListItemText
                            primary={artistInfo.first_name.concat(
                              " ",
                              artistInfo.last_name
                            )}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="standard"
                    sx={{ mt: 5, minWidth: 240, maxWidth: 240 }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["day", "month", "year"]}
                        openTo="day"
                        label="Release Date Start"
                        value={releaseStartDate}
                        onChange={(newValue) => {
                          setReleaseStartDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl
                    variant="standard"
                    sx={{ mt: 5, minWidth: 240, maxWidth: 240 }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["day", "month", "year"]}
                        openTo="day"
                        label="Release Date End"
                        value={releaseEndDate}
                        onChange={(newValue) => {
                          setReleaseEndDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <Button
                    variant="contained"
                    aria-label="Apply"
                    color="primary"
                    size="large"
                    sx={{mt: 5}}
                    onClick={applySearchHandler}
                  >
                    APPLY
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
