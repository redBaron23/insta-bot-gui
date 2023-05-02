import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { RiUserUnfollowLine } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const onUnfollowers = (history) =>{
  history.push("/unfollowers");
}

const onBot = (history) => {
  history.push("/bot");
}


export default function ListBar(props) {
  const classes = useStyles();
  let history = useHistory();

 // const { logged } = props;
  const logged = localStorage.getItem("logged")

  return (
    <div className={classes.root}>

      {logged && 
      <List component="nav">
	<ListItem button onClick= { e => onUnfollowers(history) }>
          <ListItemIcon>
            <RiUserUnfollowLine />
          </ListItemIcon>
          <ListItemText primary="Unfollowers" />
        </ListItem>
	<ListItem button onClick={ e => onBot(history) }>
          <ListItemIcon>
            <FaRobot />
          </ListItemIcon>
          <ListItemText primary="Bot" />
        </ListItem>
      </List>}
    </div>
  );
}
