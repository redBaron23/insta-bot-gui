import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import UserCard from "./UserCard";
import { Account } from "../fun/account";
import { sleep } from "../fun/helper";

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
  const [totalUnfollowers, setTotalUnfollowers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [removePointer, setRemovePointer] = useState(0);
  const [buttonText, setButtonText] = useState("Unfollow All");

  useEffect(() => {
    loadGarcas();
    updateButton();
    localStorage.setItem("likes", "[]");
  }, []);
  const removeElement = userName => {
    setGarcas(oldGarcas => oldGarcas.filter(i => i.userName !== userName));
  };
  const handleButton = () => {
    setLoading(true);
    let i = 0 + removePointer;
    const data = localStorage.getItem("account");
    const json = JSON.parse(data);
    const account = new Account(json.userName, "NoPass");
    account.import(json);
    if (garcas[i]) {
      unfollowButton(account, i);
      setRemovePointer(removePointerOld => removePointerOld + 10);
    }
  };
  const unfollowButton = (account, i) => {
    let userNames, users;
    const data = localStorage.getItem("likes");
    const likes = JSON.parse(data);

    users = garcas.filter(i => !likes.includes(i.userName));

    console.log("Going to unfollow");
    console.log("Longitud de garcas", garcas.length);
    console.log("Longitud de users", users.length);

    userNames = users.map(i => i.userName);
    setLoading(true);
    account.startBot(userNames).then(res => {
      setLoading(false);
      setButtonText(prev => (prev.includes("Stop") ? "Unfollow All" : "Stop Unfollow All" ));
    });
  };

  const updateButton = async () => {
    const data = localStorage.getItem("account");
    const json = JSON.parse(data);
    const account = new Account(json.userName, "NoPass");
    console.log("Going to update");
  };
  const loadGarcas = async () => {
    let json, garcas;
    const data = localStorage.getItem("account");
    const cookies = JSON.parse(data);
    const userName = localStorage.getItem("userName");
    console.log("Mi datita", userName);
    const account = new Account(userName, "NoPass");
    //TEST
    account.import(cookies);
    try {
      garcas = await account.getGarcas();
      json = garcas.map((i, index) => {
        return { index: index, userName: i, alive: true, like: false };
      });
      await setGarcas(json);
      setTotalUnfollowers(json.filter(x => x.alive).length);
    } catch (e) {
      console.log("Hubo un error en loadGarcas intentando en 30sec", e);
      await sleep(30 * 1000);
      await loadGarcas();
    } /*   account
      .getGarcas()
      .then(usernames =>
        usernames.map((i, index) => {
          let json = { index: index, userName: i, alive: true, like: false };
          return json;
        })
      )
      .then(json => setGarcas(json))
      .catch(e => console.log(e));*/
  };
  return (
    <Grid container spacing={2}>
      <div styles={classes.root}>
        <Box display="flex" flexDirection="row" width="100%" mx="auto" m={3}>
          <Box right="40%">
            <Typography variant="h4" display="inline">
              Total: {totalUnfollowers}
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={handleButton}
              disabled={loading}
              variant="contained"
              color="primary"
              style={{ marginLeft: "60%" }}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
        {garcas
          .filter(x => x.alive)
          .map((i, index) => (
            <UserCard
              userName={i.userName}
              alive={i.alive}
              removeElement={removeElement}
              updateGarcas={setTotalUnfollowers}
            />
          ))}
      </div>
    </Grid>
  );
}
