import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import UserCard from "./UserCard";
import { Account } from "../fun/account";
import { sleep } from "../fun/helper";
import BotForm from "./BotForm"




const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: "flex",
    justifyContent: "space-between"
  }
}));
export default function ContentGarcas() {
  const classes = useStyles();
  const [garcas, setGarcas] = useState([]);
  const [totalUnfollowers, setTotalUnfollowers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [removePointer, setRemovePointer] = useState(0);
  const [buttonText, setButtonText] = useState("Unfollow All");

  return (
    <Grid container spacing={2}>
      <div styles={classes.root}>
	<BotForm />
      </div>
    </Grid>
  );
}
