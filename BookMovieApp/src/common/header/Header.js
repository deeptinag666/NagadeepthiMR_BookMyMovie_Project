import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import LoginModal from "../loginModal/LoginModal";

const Header = (props) => {
  console.log("Inside header component");
  let headerMenu = "";
  const [isLogin, setLogin] = useState(false);
  const [showBookMovie, setShowBookMovie] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const loginHandler = () => {
    setLogin(true);
  };

  const logoutHandler = () => {
    setLogin(false);
  };

  const bookShowHandler = () => {
    if (isLogin) {
      // Display information
    } else {
      // Login modal
      console.log("open login");
      setShowLoginModal(true);
    }
  };

  const closeLoginModal = () => {
    console.log('closing modal');
    setShowLoginModal(false);
  };

  headerMenu = (
    <React.Fragment>
      <div className="headerStyle">
        <a href={props.baseUrl}>
          <img className="logoStyle" src={logo} alt="Header Logo" />
        </a>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mx: 3 }}
          className="buttonStyle"
        >
          {showBookMovie && (
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
        <LoginModal showModal={showLoginModal} closeModal={closeLoginModal}/>
      </div>
    </React.Fragment>
  );

  return headerMenu;
};

export default Header;
