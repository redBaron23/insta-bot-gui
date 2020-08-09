import React, { useState } from "react";
import { Grid, makeStyles, Hidden, Box, CssBaseline } from "@material-ui/core";
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";
import Menu from "../components/Menu";
import Content from "../components/Content";

const drawerWidth = 240;

const styles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }
}));

const Main = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = styles();
  return (
    <div className={classes.root}>
      <CssBaseline />

      <NavBar onClick={handleDrawerToggle} />
      <Hidden xsDown implementation="css">
        <Menu variant="permanent" open={true} />
      </Hidden>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Menu
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Grid container>
            <Box>HOLA paper como estas lalalalalalalal</Box>
            <Box>HOLA paper como estas lalalalalalalal</Box>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Main;
