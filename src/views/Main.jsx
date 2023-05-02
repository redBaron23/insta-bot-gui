import React, { useState } from "react";
import { Grid, makeStyles, Hidden, Box, CssBaseline } from "@material-ui/core";
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";
import ContentGarcas from "../components/ContentGarcas";
import ContentBot from "../components/ContentBot";
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
  const { page,onLogout } = props;
  return (
    <div className={classes.root}>
      <Header logged={true} onLogout={onLogout} />
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Grid container>
	    { page === "bot" && <ContentBot /> }
	    { page === "unfollowers" && <ContentGarcas /> }
	    { page === "home" && <ContentGarcas /> }
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Main;
