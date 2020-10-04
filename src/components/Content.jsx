import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import UserCard from "./UserCard";
import { Account } from "../fun/account";
import { sleep } from "../fun/helper";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

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
  const [progress, setProgress] = React.useState(0);
  const [totalUnfollowers, setTotalUnfollowers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [removePointer, setRemovePointer] = useState(0);
  const [buttonText, setButtonText] = useState("Loading");

  useEffect(() => {
    loadGarcas();
    updateButton();
    localStorage.setItem("likes", "[]");
  }, []);
  const removeElement = userName => {
    setGarcas(oldGarcas => oldGarcas.filter(i => i.userName !== userName));
  };
  const keepGarcas = () => {
    const json = JSON.stringify(garcas);
    localStorage.setItem("garcas", garcas);
    console.log("Keep garcas",garcas)
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
    const data = localStorage.getItem("likes");
    const likes = JSON.parse(data);

    let users = garcas.filter(i => !likes.includes(i.userName));

    console.log("Going to unfollow");
    console.log("garcas", garcas);
    console.log("likes", likes);
    console.log("users", users);

    setLoading(false);
    /*
    //  create a loop function
    setTimeout(function() {
      //  call a 3s setTimeout when the loop is called

      const data = localStorage.getItem("likes");
      const likes = JSON.parse(data);

      console.log(i, removePointer, garcas[i].userName);
      if (!likes.includes(garcas[i].userName)) {
        if (i !== -1) {
          //let array = garcas
          //array.splice(i,1)
          let newArr = [...garcas];

          newArr[i].alive = false;
          console.log("Old", garcas[i]);
          setGarcas(newArr);
          console.log("New", garcas[i], "ponmter", i, removePointer);
          account.unfollow(garcas[i].userName); //  your code here
        }
      }
      setProgress(prevProgress =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
      i++; //  increment the counter
      setRemovePointer(i);
      if (i - removePointer < 10 && garcas[i]) {
        //  if the counter < 10, call the loop function
        unfollowButton(account, i); //  ..  again which will trigger another
      } else {
        if (garcas[i]) {
          setProgress(prevProgress =>
            prevProgress >= 100 ? 0 : prevProgress + 10
          );
        } else {
          setProgress(prevProgress => 0);
        }
        setLoading(false);
      }
    }, 1500);
    */
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
      setTotalUnfollowers(json.filter(x => x.alive).length)
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
              <CircularProgressWithLabel value={progress} />
            </Button>
          </Box>
        </Box>
        {keepGarcas()}
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
