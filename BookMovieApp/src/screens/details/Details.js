import React, { useEffect, useState } from "react";
import "./Details.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Header from "../../common/header/Header";

const Details = (props) => {
  console.log(props.baseUrl);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
      //const movieUrl = props.baseUrl + "movies/" + props.match.params.id;
      const movieUrl = "http://localhost:8085/api/v1/movies/" + props.match.params.id;
      console.log(movieUrl);
    fetch(movieUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setMovieDetails(response);
        console.log(movieDetails);
      });
  }, []);

  return (
    <div className="detailPageStyle">
      <div>
        <Header baseUrl={props.baseUrl} />
      </div>
      <br />
      <div className="backToHome">
        <Typography>
          <Link to={"/"}>&#60; Back to Home Page</Link>
        </Typography>
      </div>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item style={{ width: "20%" }}></Grid>
        <Grid item style={{ width: "60%" }}></Grid>
        <Grid item style={{ width: "20%" }}></Grid>
      </Grid>
    </div>
  );
};

export default Details;
