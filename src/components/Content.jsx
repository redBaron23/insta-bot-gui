import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import UserCard from "./UserCard";
import { Account } from "../fun/account";
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

export default function Content() {
  const classes = useStyles();
  const [garcas, setGarcas] = useState([]);

  useEffect(() => {
    loadGarcas();
    console.log(garcas);
  }, []);

  const loadGarcas = () => {
    const data = localStorage.getItem("account");
    const json = JSON.parse(data);
    const account = new Account(json.userName, "NoPass");
    //TEST
    account.import(json);

    let whiteList = "pato.toledo";
    account
      .getGarcas(whiteList)
      .then(usernames => setGarcas(usernames))

      .catch(e => console.log(e));
    /* .then( garcas => console.log(garcas) )*/
  };
  return (
    <Grid container styles={classes.root} spacing={2}>
      {garcas.map(i => (
        <UserCard
          name={i}
          src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        />
      ))}
    </Grid>
  );
}
