import React, { useState } from "react";
import Proptypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { FaPowerOff } from "react-icons/fa";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

const handleRadiusChange = (event, setValue) => {
  setValue(event.target.value);
};
export default function BotForm(props) {
  const { onLogin } = props;
  const classes = styles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [radiusValue, setRadiusValue] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar autoHideDuration={6000}>
        <Alert severity={notificationSeverity}>{notificationMessage}</Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaPowerOff />
        </Avatar>
        <Typography component="h1" variant="h5">
          Este lo que hace es bla bla bla y bla bla bla, bla bla blald;asld;a
          slda;s blaldalsldasldasl ald asldla sldals dlas ldals lasl l
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={radiusValue}
              onChange={e => handleRadiusChange(e, setRadiusValue)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={username.length < 6 || password.length < 6 || loading}
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
