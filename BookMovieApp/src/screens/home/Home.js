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
import { Button } from "@mui/material";

const Home = (props) => {
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
  const [releasedMoviesList, setReleasedMoviesList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
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

  const getPublishedMovies = async () => {
    try {
      const response = await fetch(props.baseUrl + "movies?status=PUBLISHED");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getReleasedMovies = async () => {
    try {
      const response = await fetch(props.baseUrl + "movies?status=RELEASED");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getGenres = async () => {
    try {
      const response = await fetch(props.baseUrl + "genres");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getArtists = async () => {
    try {
      const response = await fetch(props.baseUrl + "artists?page=1&limit=10");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const selectMovieHandler = (event) => {
    setSelectedMovie(event.target.value);
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

  const applySearchHandler = () => {
    if (
      selectedMovie === "" &&
      selectedGenres.length === 0 &&
      selectedArtists.length === 0 &&
      releaseStartDate === null &&
      releaseEndDate === null
    ) {
      setFilteredMovieList(releasedMoviesList);
    } else {
      const filteredReleasedMovies = filteredMovieList.filter((movie) => {
        // Check if movie name matches filter criteria
        let movieNameMatching = false;
        if (movie.title === selectedMovie) {
          movieNameMatching = true;
        }

        // Check if genres include the ones present in filter
        let areGenresPresent = false;
        selectedGenres.forEach((genre) => {
          if (!areGenresPresent) {
            areGenresPresent = movie.genres.includes(genre);
          }
        });

        // Check if artists include the ones present in filter
        let areArtistsPresent = false;
        movie.artists.forEach((artist) => {
          const artistName = artist.first_name.concat(" ", artist.last_name);
          if (selectedArtists.includes(artistName)) {
            areArtistsPresent = true;
          }
        });

        // Check if release date is between the start date and end date
        let isWithinReleaseDateRange = false;

        // Check if the date range matches
        if (releaseStartDate && releaseEndDate === null) {
          const relStartDate = new Date(releaseStartDate);
          const relStartDateFinal =
            relStartDate.getFullYear() +
            "-" +
            (relStartDate.getMonth() + 1) +
            "-" +
            relStartDate.getDate();

          if (Date.parse(movie.release_date) >= Date.parse(relStartDateFinal)) {
            isWithinReleaseDateRange = true;
          }
        } else if (releaseEndDate && releaseStartDate === null) {
          const relEndDate = new Date(releaseEndDate);
          const relEndDateFinal =
            relEndDate.getFullYear() +
            "-" +
            (relEndDate.getMonth() + 1) +
            "-" +
            relEndDate.getDate();

          if (Date.parse(movie.release_date) <= Date.parse(relEndDateFinal)) {
            isWithinReleaseDateRange = true;
          }
        } else if (releaseStartDate && releaseEndDate) {
          const relStartDate = new Date(releaseStartDate);
          const relStartDateFinal =
            relStartDate.getFullYear() +
            "-" +
            (relStartDate.getMonth() + 1) +
            "-" +
            relStartDate.getDate();

          const relEndDate = new Date(releaseEndDate);
          const relEndDateFinal =
            relEndDate.getFullYear() +
            "-" +
            (relEndDate.getMonth() + 1) +
            "-" +
            relEndDate.getDate();

          const movieRelDate = Date.parse(movie.release_date);
          if (
            movieRelDate >= Date.parse(relStartDateFinal) &&
            movieRelDate <= Date.parse(relEndDateFinal)
          ) {
            isWithinReleaseDateRange = true;
          }
        }

        if (
          movieNameMatching ||
          areGenresPresent ||
          areArtistsPresent ||
          isWithinReleaseDateRange
        ) {
          return movie;
        }
      });
      setFilteredMovieList(filteredReleasedMovies);
    }
  };

  useEffect(async () => {
    const publishedMoviesResponse = await getPublishedMovies();
    const releasedMoviesResponse = await getReleasedMovies();
    const genresResponse = await getGenres();
    const artistsResponse = await getArtists();
    const movieList = [];
    const releasedMoviesList = [];
    const genresList = [];
    const artistsList = [];

    publishedMoviesResponse.movies.map((movie) => {
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
    setFilteredMovieList(releasedMoviesList);
    setGenres(genresList);
    setArtists(artistsList);
  }, []);

  return (
    <React.Fragment>
      <Grid container direction="row">
        <Header baseUrl={props.baseUrl} showBookMovie={false} />
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
              {filteredMovieList.map((movie) => (
                <GridListTile
                  className="releaseMovieGridTile"
                  key={movie.poster_url}
                  cols={filteredMovieList.length === 1 ? 4 : 1}
                  spacing={2}
                >
                  <a onClick={() => {window.location.href="/movie/" + movie.id}}>
                    <img src={movie.poster_url} alt={movie.title} />
                  </a>
                  <GridListTileBar
                    spacing={2}
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
                    value={selectedMovie}
                    onChange={selectMovieHandler}
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
                    sx={{ mt: 5 }}
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
