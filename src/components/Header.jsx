import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Menu from "../components/Menu";
import { makeStyles, Hidden, CssBaseline } from "@material-ui/core";

const drawerWidth = 240;

const styles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }
}));

const Header = (props) => {
  const classes = styles();
  const { onLogout } = props
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar logout={onLogout} onClick={handleDrawerToggle} />
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
    </div>
  );
};

export default Header;
