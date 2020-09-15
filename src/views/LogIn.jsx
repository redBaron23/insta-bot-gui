import React, { useState } from "react";
import { Grid, makeStyles, Hidden, Box, CssBaseline } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Menu from "../components/Menu";
import Content from "../components/Content";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import FormDialog from "../components/FormDialog";

const styles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: "flex",
    paddingTop: 75,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const LogIn = props => {
  const { onLogin } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = styles();
  return (
    <div className={classes.root}>
      <Header />
      {sessionStorage.setItem("userName", "")}
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Grid container>
            <FormDialog show={false} />
            <LoginForm onLogin={onLogin} />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
