import React, { Component } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Typography
} from "@material-ui/core";

const styles = {
  card: {
    display: "flex",
  },
  profile: {
    display:'flex',
    alignItems:'center',
    justifyContent:'spaceBetween'
  },
  avatar: {
    marginRight:15
  }
};

export default class UserCard extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardActionArea>
          <CardContent style={styles.profile}>
            <Avatar style={styles.avatar}
              alt="Juancho Tacorta"
              src="https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            />{" "}
            <Typography variant="body2" color="textSecondary" component="p">
              Juancho Tacorta
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button>Follow</Button>
        </CardActions>
      </Card>
    );
  }
}
