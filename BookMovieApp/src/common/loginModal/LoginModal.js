import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "react-modal";
import "./LoginModal.css";
import {
  FormControl,
  TextField,
  Button,
  Tab,
  Tabs,
} from "@mui/material";

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
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [contactNumberError, setContactNumberError] = useState(false);
  const [conatctNumberErrorMessage, setContactNumberErrorMessage] =
    useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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
    console.log('inside registerUserHandler');
    setRegistrationSuccess(true);
  };

  return (
    <Modal
      isOpen={props.showModal}
      className="loginModalStyle"
      onRequestClose={props.closeModal}
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
          <FormControl fullWidth="true">
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Username"
              variant="standard"
              required
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Password"
              variant="standard"
              required
            />
            <Button
              sx={{ m: 5 }}
              variant="contained"
              size="small"
              color="primary"
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
              error={firstNameError}
              helperText={firstNameErrorMessage}
              onBlur={checkFirstNameHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Last Name"
              variant="standard"
              required
              error={lastNameError}
              helperText={lastNameErrorMessage}
              onBlur={checkLastNameHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Email"
              variant="standard"
              required
              error={emailError}
              helperText={emailErrorMessage}
              onBlur={checkEmailHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Password"
              variant="standard"
              required
              error={passwordError}
              helperText={passwordErrorMessage}
              onBlur={checkPasswordHandler}
            />
            <TextField
              sx={{ m: 1 }}
              id="standard-basic"
              label="Contact No."
              variant="standard"
              required
              error={contactNumberError}
              helperText={conatctNumberErrorMessage}
              onBlur={checkContactNumberHandler}
            />
            {registrationSuccess && <p className="messageStyle">Registration Successful. Please Login!</p>}
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
