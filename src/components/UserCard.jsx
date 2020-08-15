import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Zoom
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { Account } from "../fun/account";

const defaultSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png";
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
    marginLeft: 15,
    marginRight: 25
  }
};

export default function UserCard(props) {
  const { userName, removeElement } = props;
  const [src, setSrc] = useState(false);
  const [show, setShow] = useState(true);
  const [remove, setRemove] = useState(false);
  const [liked, setLiked] = useState(false);
  const [buttonText, setButtonText] = useState("Unfollow");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    getImage();
  }, []);

  const handleLike = () => {
    console.log("Handle like",userName);
    let likes = JSON.parse(localStorage.getItem("likes"));
    if (!liked) {
      likes.push(userName);
    } else {
      likes = likes.filter(i => i !== userName);
    }
    const json = JSON.stringify(likes);
    localStorage.setItem("likes", json);
    setLiked(!liked);
  };
  const buttonHandle = () => {
    let newText;
    const data = localStorage.getItem("account");
    const json = JSON.parse(data);
    const account = new Account(json.userName, "NoPass");
    account.import(json);

    if (buttonText === "Unfollow") {
      newText = "Follow";
      account
        .unfollow(userName)
        .then(bool => setShow(!bool))
        .then(removeElement(userName))
        .catch(e => console.log(e));
    } else {
      newText = "Unfollow";
      account.follow(userName).then(setButtonDisabled(false));
    }
    setButtonDisabled(true);
    setButtonText(newText);
  };
  const getImage = () => {
    const uri = "https://www.instagram.com/" + userName + "/?__a=1";
    axios
      .get(uri)
      .then(res => res.data.graphql.user.profile_pic_url_hd)
      .then(pic => setSrc(pic))

      .catch(e => setSrc(defaultSrc));
  };
  return (
    <Zoom
      in={show}
      onExited={() => setRemove(true)}
      style={{ transitionDelay: show ? "800ms" : "0ms" }}
    >
      <div style={{ display: remove ? "none" : "" }}>
        <Grid item style={styles.root} xs={12} sm={3} md={3}>
          <Card variant="outlined" style={styles.card}>
            <div style={styles.first}>
              <CardContent style={styles.profile}>
                <StyledRating
                  name={userName}
                  max={1}
                  onChange={handleLike}
                  defaultValue={0}
                  icon={<FavoriteIcon fontSize="inherit" />}
                />
                <CardActionArea
                  style={styles.profile}
                  onClick={() =>
                    window.open("https://instagram.com/" + userName, "_blank")
                  }
                >
                  <Avatar
                    style={styles.avatar}
                    alt="Juancho Tacorta"
                    src={src}
                  />{" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {userName}
                  </Typography>
                </CardActionArea>
              </CardContent>
            </div>
            <CardActions>
              <Button
                variant="outlined"
                disabled={buttonDisabled}
                color="secondary"
                onClick={buttonHandle}
              >
                {buttonText}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </Zoom>
  );
}
