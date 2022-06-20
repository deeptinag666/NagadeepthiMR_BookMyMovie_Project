import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import LoginModal from "../loginModal/LoginModal";

const Header = (props) => {
  let headerMenu = "";
  const [isLogin, setLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (sessionStorage && sessionStorage.token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const loginHandler = () => {
    setShowLoginModal(true);
  };

  const logoutHandler = async () => {
    let token = "";

    if (sessionStorage.token) {
      token = sessionStorage.token;
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
      sessionStorage.clear();
      setLogin(false);
    }
  };

  const closeLoginModal = () => {
    if (sessionStorage.token) {
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
        <Stack
          spacing={2}
          direction="row"
          sx={{ mx: 3 }}
          className="buttonStyle"
        >
          {props.showBookMovie && (
            <a
              onClick={() => {
                const parts = window.location.href.split("/");
                const paramId = parts[parts.length - 1];
                window.location.href = "/bookshow/" + paramId;
              }}
            >
              <Button
                variant="contained"
                aria-label="BookShow"
                color="primary"
                size="medium"
              >
                Book Show
              </Button>
            </a>
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
