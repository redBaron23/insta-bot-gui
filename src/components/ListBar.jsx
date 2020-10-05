import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { RiUserUnfollowLine } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ListBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <RiUserUnfollowLine />
          </ListItemIcon>
          <ListItemText primary="Unfollowers" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FaRobot />
          </ListItemIcon>
          <ListItemText primary="Bot" />
        </ListItem>
      </List>
    </div>
  );
}
