import React, { useState } from "react";
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
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75"
  },
  iconHover: {
    color: "#ff3d47"
  }
})(Rating);

const styles = {
  root: {
    maxWidth: 350
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
    marginLeft:15,
    marginRight: 25
  }
};

export default function UserCard(props) {
  const { name, src } = props;
  return (
    <Grid item style={styles.root} xs={12} sm={3} md={3}>
      <Card variant="outlined" style={styles.card}>
        <CardActionArea style={styles.first}>
          <CardContent style={styles.profile}>
	    <StyledRating 
              name="customized-color"
	      max={1}
              defaultValue={0}
              icon={<FavoriteIcon fontSize="inherit" />}
            />
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
