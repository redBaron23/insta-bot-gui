import React, { useState } from "react";
import { Grid, makeStyles, Hidden, Box, CssBaseline } from "@material-ui/core";
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";
import Content from "../components/Content";
import Header from "../components/Header";

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

const Main = props => {
  const classes = styles();
  const { onLogout } = props;
  return (
    <div className={classes.root}>
      <Header onLogout={onLogout} />
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Grid container>
            <Content />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Main;
