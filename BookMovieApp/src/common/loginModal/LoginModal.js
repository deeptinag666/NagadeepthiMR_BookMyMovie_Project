import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "react-modal";
import "./LoginModal.css";
import { FormControl, TextField, Button, Tab, Tabs } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const LoginModal = (props) => {
  const [value, setValue] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [contactNumberError, setContactNumberError] = useState(false);
  const [contactNumberErrorMessage, setContactNumberErrorMessage] =
    useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailAddressChangeHandler = (event) => {
    setEmailAddress(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const contactNumberChangeHandler = (event) => {
    setContactNumber(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkFirstNameHandler = (event) => {
    if (event.target.value.length === 0) {
      setFirstNameError(true);
      setFirstNameErrorMessage("required");
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }
  };

  const checkLastNameHandler = (event) => {
    if (event.target.value.length === 0) {
      setLastNameError(true);
      setLastNameErrorMessage("required");
    } else {
      setLastNameError(false);
      setLastNameErrorMessage("");
    }
  };

  const checkEmailHandler = (event) => {
    if (event.target.value.length === 0) {
      setEmailError(true);
      setEmailErrorMessage("required");
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
  };

  const checkPasswordHandler = (event) => {
    if (event.target.value.length === 0) {
      setPasswordError(true);
      setPasswordErrorMessage("required");
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  };

  const checkContactNumberHandler = (event) => {
    if (event.target.value.length === 0) {
      setContactNumberError(true);
      setContactNumberErrorMessage("required");
    } else {
      setContactNumberError(false);
      setContactNumberErrorMessage("");
    }
  };

  const registerUserHandler = () => {
    // If registration is successful, then set registrationSuccess to true
    const requestObj = {
      email_address: emailAddress,
      first_name: firstName,
      last_name: lastName,
      mobile_number: contactNumber,
      password: password,
    };

    const serviceRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestObj),
    };
    fetch(props.baseUrl + "signup", serviceRequest)
      .then((response) => {
        response.json();
      })
      .then((data) => setRegistrationSuccess(true));
  };

  const loginHandler = async () => {
    const token = "Basic " + btoa(signInUsername + ":" + signInPassword);
    const serviceRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    };

    const response = await fetch(props.baseUrl + "auth/login", serviceRequest)

    if(response.status === 200){
      for (var pair of response.headers.entries()) {
        if(pair[0] == "access-token"){
          localStorage.setItem("token", pair[1]);
        }
      }
      setIsLoginSuccess(true);
      props.closeModal();
    }else{
      console.error("Login failed");
    }
  };

  const usernameChangeHandler = (event) => {
    setSignInUsername(event.target.value);
  };

  const signInPasswordChangeHandler = (event) => {
    setSignInPassword(event.target.value);
  };

  return (
    <Modal
      isOpen={props.showModal}
      style={modalStyles}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FormControl fullWidth={true}>
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Username"
              variant="standard"
              required
              value={signInUsername}
              onChange={usernameChangeHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Password"
              variant="standard"
              required
              value={signInPassword}
              onChange={signInPasswordChangeHandler}
            />
            <Button
              sx={{ m: 5 }}
              variant="contained"
              size="small"
              color="primary"
              onClick={loginHandler}
            >
              Login
            </Button>
          </FormControl>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormControl>
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="First Name"
              variant="standard"
              required
              value={firstName}
              error={firstNameError}
              helperText={firstNameErrorMessage}
              onBlur={checkFirstNameHandler}
              onChange={firstNameChangeHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Last Name"
              variant="standard"
              required
              value={lastName}
              error={lastNameError}
              helperText={lastNameErrorMessage}
              onBlur={checkLastNameHandler}
              onChange={lastNameChangeHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Email"
              variant="standard"
              required
              value={emailAddress}
              error={emailError}
              helperText={emailErrorMessage}
              onBlur={checkEmailHandler}
              onChange={emailAddressChangeHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Password"
              variant="standard"
              required
              value={password}
              error={passwordError}
              helperText={passwordErrorMessage}
              onBlur={checkPasswordHandler}
              onChange={passwordChangeHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Contact No."
              variant="standard"
              required
              value={contactNumber}
              error={contactNumberError}
              helperText={contactNumberErrorMessage}
              onBlur={checkContactNumberHandler}
              onChange={contactNumberChangeHandler}
            />
            {registrationSuccess && (
              <p className="messageStyle">
                Registration Successful. Please Login!
              </p>
            )}
            <Button
              sx={{ m: 5 }}
              variant="contained"
              size="small"
              color="primary"
              onClick={registerUserHandler}
            >
              Register
            </Button>
          </FormControl>
        </TabPanel>
      </Box>
    </Modal>
  );
};

export default LoginModal;
