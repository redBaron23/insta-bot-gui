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
import { Zoom, Checkbox } from "@material-ui/core/";

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

const handleCheckBox = (setCheckStatus, setTextStatus) => {
  setCheckStatus(prev => !prev);
  setTextStatus(prev => !prev);
};

const handleUserName = (e, setUserName) => {
  const { name, value } = e.target;
  setUserName(value);
};

const handleButton = async (e,bigFish, type, random) => {
  e.preventDefault();
  let userName,password;
  userName = localStorage.getItem("userName");
  password = localStorage.getItem("password");
  let account = new Account(userName, password);
  console.log("Tipo",type)
  console.log("es random",random)
  console.log("Bigfish",bigFish)
  //
  //await account.startBot(type);
};
export default function BotForm(props) {
  const { onLogin } = props;
  const classes = styles();
  const [userName, setUserName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [radiusValue, setRadiusValue] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [textStatus, setTextStatus] = useState(false);

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
        <form className={classes.form} noValidate>
          <FormControl component="fieldset">
            <FormLabel component="legend">Bot</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={radiusValue}
              onChange={e => handleRadiusChange(e, setRadiusValue)}
            >
              <FormControlLabel
                value="static"
                control={<Radio />}
                label="Farm Famous"
              />
              <FormControlLabel
                value="dynamic"
                control={<Radio />}
                label="Follow user Followers"
              />
            </RadioGroup>
          </FormControl>
          <Zoom
            in={radiusValue === "dynamic"}
            style={{ transitionDelay: showMenu ? "800ms" : "0ms" }}
          >
            <Box>
              <FormControlLabel
                checked={isChecked}
                onChange={e => handleCheckBox(setIsChecked, setTextStatus)}
                control={<Checkbox name="random" />}
                label="Random"
              />
              <Zoom
                in={textStatus}
                style={{ transitionDelay: showMenu ? "800ms" : "0ms" }}
              >
                <Box>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="userName"
                    onChange={e => handleUserName(e, setUserName)}
                    label="Username"
                    type="userName"
                    id="userName"
                  />
                </Box>
              </Zoom>
            </Box>
          </Zoom>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={e => handleButton(e,userName, radiusValue, isChecked)}
            color="primary"
            disabled={!isChecked && userName.length < 6}
            className={classes.submit}
          >
            {"Create"}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
            {" Bot"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
