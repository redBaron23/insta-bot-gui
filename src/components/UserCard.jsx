import React, { Component } from "react";
import {
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Typography
} from "@material-ui/core";

const styles = {
  root:{
    maxWidth:300
  },
  card: {
    display: "flex"
  },
  first: {
    maxWidth: 225
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "spaceBetween"
  },
  avatar: {
    marginRight: 15
  }
};

export default class UserCard extends Component {
  render() {
    const { name, src } = this.props;
    return (
      <Grid style={styles.root} xs={12} sm={3} md={3}>
        <Card variant="outlined" style={styles.card}>
          <CardActionArea style={styles.first}>
            <CardContent style={styles.profile}>
              <Avatar style={styles.avatar} alt="Juancho Tacorta" src={src} />{" "}
              <Typography variant="body2" color="textSecondary" component="p">
                {name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button>Follow</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
