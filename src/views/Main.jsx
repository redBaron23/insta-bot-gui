import React, { useState } from "react";
import { Grid, makeStyles, Hidden } from "@material-ui/core";
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";
import Menu from "../components/Menu";

const styles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const Main = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = styles();
  return (
    <div>
      <NavBar onClick={handleDrawerToggle} />
      <Hidden xsDown>
        <Menu variant="permanent" open={true} />
      </Hidden>
      <Hidden smUp>
	<Menu variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} />
      </Hidden>
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Grid container>
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Roberto Carlos"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Juancho Tacorta"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
            <UserCard
              name="Armando Paredes"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Main;
