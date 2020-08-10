import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core'
import UserCard from './UserCard'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  container:{
    display:'flex',
    justifyContent:'space-between'
  }
}));

export default function Content() {
  const classes = useStyles();

  return (
    <Grid container styles={classes.root} spacing={2}>
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
  );
}
