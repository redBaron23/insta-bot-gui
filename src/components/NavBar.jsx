import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { onClick, logout, userName } = props;
  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => onClick()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Insta Bot
        </Typography>
        <Typography variant="h8" className={classes.title}>
          {sessionStorage.getItem('userName')}
        </Typography>{" "}
        <Button color="inherit" onClick={e => (logout ? logout() : "")}>
          {!logout ? "LOGIN" : "LOGOUT"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
