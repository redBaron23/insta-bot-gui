import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
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
    localStorage.setItem("likes", "[]");
  }, []);

  const removeElement = userName => {
    let array = garcas.filter(i => i !== userName);
    setGarcas(array);
  };
  const keepGarcas = acc => {
    const json = JSON.stringify(acc);
    localStorage.setItem("garcas", acc);
  };
  const handleButton = () => {
    let i = 0;
    const data = localStorage.getItem("account");
    const json = JSON.parse(data);
    const account = new Account(json.userName, "NoPass");
    account.import(json);
    unfollowButton(account, i);
  };
  const unfollowButton = (account, i) => {
    //  create a loop function
    setTimeout(function() {
      //  call a 3s setTimeout when the loop is called

      console.log('GARCA',garcas[i].alive,'Pos',garcas[i].userName,i)
      let newGarcas = JSON.parse(JSON.stringify(garcas))
      setGarcas(newGarcas.slice(i+1,newGarcas.length))
      account.unfollow(garcas[i].userName); //  your code here
      i++; //  increment the counter
      if (i < 10) {
        //  if the counter < 10, call the loop function
        unfollowButton(account,i); //  ..  again which will trigger another
      } //  ..  setTimeout()
    }, 1500);
  };
  const loadGarcas = () => {
    const data = localStorage.getItem("account");
    const json = JSON.parse(data);
    const account = new Account(json.userName, "NoPass");
    //TEST
    account.import(json);

    let whiteList = "pato.toledo";
    account
      .getGarcas(whiteList)
      .then(usernames =>
        usernames.map(i => {
	  let  json ={ userName: i, alive: true }
	  console.log(json)
          return json;
        })
      )
      .then(json => setGarcas(json))
      .catch(e => console.log(e));
  };
  return (
    <Grid container spacing={2}>
      <h1>Total: {garcas.filter(x => x.alive).length}</h1>
      <Button onClick={handleButton}>Unfollow 10</Button>
      <div styles={classes.root}>
        {keepGarcas(garcas)}
	{garcas.filter( x => x.alive ).map((i, index) => (
          <UserCard
            userName={i.userName}
            alive={i.alive}
            removeElement={removeElement}
            src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          />
        ))}
      </div>
    </Grid>
  );
}
