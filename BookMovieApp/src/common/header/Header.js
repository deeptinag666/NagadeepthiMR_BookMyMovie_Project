import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import LoginModal from "../loginModal/LoginModal";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  let headerMenu = "";
  const [isLogin, setLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage && localStorage.token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const loginHandler = () => {
    setShowLoginModal(true);
  };

  const logoutHandler = async () => {
    const requestObj = {};
    let token = "";

    if (localStorage.token) {
      token = localStorage.token;
    }
    const serviceRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(props.baseUrl + "auth/logout", serviceRequest);
    if (response.status === 200) {
      localStorage.clear();
      setLogin(false);
    }
  };

  const bookShowHandler = () => {
    if (isLogin) {
      // Get the movie Id from the URL
      const parts = window.location.href.split("/");
      const paramId = parts[parts.length - 1];
      history.push("/bookshow/" + paramId);
    } else {
      // Login modal
      setShowLoginModal(true);
    }
  };

  const closeLoginModal = () => {
    if (localStorage.token) {
      setLogin(true);
    }
    setShowLoginModal(false);
  };

  headerMenu = (
    <React.Fragment>
      <div className="headerStyle">
        <img
          className="logoStyle rotate linear infinite"
          src={logo}
          alt="Header Logo"
        />
        {/* <img className="logoStyle" src={logo} alt="Header Logo" /> */}
        {/* <a href={props.baseUrl}>
          <img className="logoStyle" src={logo} alt="Header Logo" />
        </a> */}
        <Stack
          spacing={2}
          direction="row"
          sx={{ mx: 3 }}
          className="buttonStyle"
        >
          {props.showBookMovie && (
            <Button
              variant="contained"
              aria-label="BookShow"
              color="primary"
              size="medium"
              onClick={bookShowHandler}
            >
              Book Show
            </Button>
          )}
          {isLogin && (
            <Button
              variant="contained"
              aria-label="Logout"
              size="medium"
              color="inherit"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
          {!isLogin && (
            <Button
              variant="contained"
              aria-label="Login"
              color="inherit"
              size="medium"
              onClick={loginHandler}
            >
              Login
            </Button>
          )}
        </Stack>
        <LoginModal
          baseUrl={props.baseUrl}
          showModal={showLoginModal}
          closeModal={closeLoginModal}
        />
      </div>
    </React.Fragment>
  );

  return headerMenu;
};

export default Header;
