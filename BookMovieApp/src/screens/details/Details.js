import React, { useEffect, useState } from "react";
import "./Details.css";
import { Stack, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Header from "../../common/header/Header";
import Youtube from "react-youtube";
import Rating from "@mui/material/Rating";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

const Details = (props) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [releaseDate, setReleaseDate] = useState("");
  const [videoId, setVideoId] = useState("");
  const [movieRating, setMovieRating] = useState(0);

  const opts = {
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const getMovieDetails = async () => {
    const movieUrl = props.baseUrl + "movies/" + props.match.params.id;
    const response = await fetch(movieUrl);
    return await response.json();
  };

  useEffect(async () => {
    const movieResponse = await getMovieDetails();
    setMovieDetails(movieResponse);

    // Convert the date to display format
    const date = new Date(movieResponse.release_date);
    const displayDate = date.toDateString();
    setReleaseDate(displayDate);

    // Get the video Id from Video URL
    var videoIdFinal = movieResponse.trailer_url.split("v=")[1];
    var ampersandPosition = videoIdFinal.indexOf("&");
    if (ampersandPosition !== -1) {
      videoIdFinal = videoIdFinal.substring(0, ampersandPosition);
    }
    setVideoId(videoIdFinal);
  }, []);

  return (
    <div className="detailPageStyle">
      <div>
        <Header baseUrl={props.baseUrl} showBookMovie={true} />
      </div>
      <br />
      <div className="backToHome">
        <Typography>
          <a href="/">&#60; Back to Home Page</a>
        </Typography>
      </div>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item style={{ width: "20%", marginTop: 10 }}>
          <img src={movieDetails.poster_url} alt={movieDetails.title} />
        </Grid>
        <Grid item style={{ width: "60%" }}>
          <Typography variant="h2">{movieDetails.title}</Typography>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontWeight: 600 }}>Genre:</Typography>
            <Typography variant="body1">
              {movieDetails.genres && movieDetails.genres.join(", ")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontWeight: 600 }}>Duration:</Typography>
            <Typography variant="body1">{movieDetails.duration}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontWeight: 600 }}>Release Date:</Typography>
            <Typography variant="body1">{releaseDate}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontWeight: 600 }}>Rating:</Typography>
            <Typography variant="body1">{movieDetails.rating}</Typography>
          </Stack>
          <br />
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontWeight: 600 }}>Plot:</Typography>
            <Typography variant="body1">
              <a href={movieDetails.wiki_url}>Wiki Link </a>
              {movieDetails.storyline}
            </Typography>
          </Stack>
          <br />
          <Stack direction="column" spacing={2}>
            <Typography sx={{ fontWeight: 600 }}>Trailer:</Typography>
            <Typography variant="body1" sx={{ margin: 16 }}>
              <Youtube videoId={videoId} opts={opts} onReady={onPlayerReady} />
            </Typography>
          </Stack>
        </Grid>
        <Grid item style={{ width: "20%" }}>
          <Typography sx={{ fontWeight: 600 }}>Rate this movie:</Typography>
          <Rating
            name="Simple"
            value={movieRating}
            onChange={(event, newValue) => {
              setMovieRating(newValue);
            }}
          />
          <br />
          <Typography sx={{ fontWeight: 600 }}>Artists:</Typography>
          <GridList cols={2}>
            {movieDetails.artists &&
              movieDetails.artists.map((artist) => (
                <GridListTile
                  key={artist.first_name.concat(" ", artist.last_name)}
                >
                  <img
                    src={artist.profile_url}
                    alt={artist.first_name.concat(" ", artist.last_name)}
                  />
                  <GridListTileBar
                    title={artist.first_name.concat(" ", artist.last_name)}
                  />
                </GridListTile>
              ))}
          </GridList>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
