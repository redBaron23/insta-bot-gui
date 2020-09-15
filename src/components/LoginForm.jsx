import React, { useState } from "react";
import Proptypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UserCard from "./UserCard";
import FormDialog from "./FormDialog";

import { Account } from "../fun/account";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/redbaron23/insta-bot-gui">
        redbaron23
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
const styles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LogIn(props) {
  const { onLogin } = props;
  const classes = styles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("");

  const handleClick = () => {
    setOpenNotification(true);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotification(false);
  };

  const handleCredentials = e => {
    const { name, value } = e.target;
    name === "username" ? setUsername(value) : setPassword(value);
  };
  const customAlert = (message, type) => {
    setNotificationMessage(message);
    setNotificationSeverity(type);
    setOpenNotification(true);
  };
  const handleSubmit = e => {
    if (!loading) {
      setLoading(true);
      let status = true;
      //No refresh
      e.preventDefault();
      let account = { username, password };
      if (account.username && account.password) {
        status = isMatch(account);
      } else {
        let message = "No username or password detected";
        !account.username ? setUsernameError(true) : setUsernameError(false);
        !account.password ? setPasswordError(true) : setPasswordError(false);

        customAlert(message, "error");
      }
    }
  };

  const handleSendCode = code => {
    const userName = localStorage.getItem("userName");
    const password = localStorage.getItem("password");
    let account = new Account(userName, password);
    account
      .initCode(code)
      .then(res => keepAccount(res, customAlert, username))
      .catch(e => console.log(e));
  };
  const keepAccount = async (data, customAlert, userName) => {
    if (data === 402) {
      //Necesito codigo de verificacion
      setOpenForm(true);
      console.log("Dame el codigo paper");
    } else if (data === 401) {
      customAlert("Wrong password or username", "error");
    } else {
      localStorage.setItem("account", JSON.stringify(data.data));
      sessionStorage.setItem("userName", userName);
      //Logged
      onLogin();
      console.log(data);
    }
    setLoading(false);
  };
  const isMatch = async acc => {
    //Send to backend
    let backend = true;

    if (backend) {
      //LOGEADO
      localStorage.setItem("userName", acc.username);
      localStorage.setItem("password", acc.password);
      let account = new Account(username, password);
      account
        .test()
        .then(res => keepAccount(res, customAlert, username))
        .catch(e => console.log(e));
    } else {
      let message = "Incorrect username or password";

      setUsernameError(true);
      setPasswordError(true);
      setNotificationMessage(message);
      setNotificationSeverity("error");
      setOpenNotification(true);
      return false;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <FormDialog show={openForm} onSend={handleSendCode} />
      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationSeverity}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            error={usernameError}
            autoComplete="username"
            onChange={handleCredentials}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={passwordError}
            onChange={handleCredentials}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={username.length < 6 || password.length < 6 || loading}
            onClick={handleSubmit}
            className={classes.submit}
          >
            {"Log"}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
            {" In"}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
