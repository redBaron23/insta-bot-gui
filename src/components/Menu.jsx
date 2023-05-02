import React from "react";
import { makeStyles, Drawer, Divider } from "@material-ui/core";
import ListBar from "./ListBar"
const drawerWidth = 240;

const styles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}));

const Menu = (props) => {
  const classes = styles();
  const { logged,variant, open, onClose } = props
  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
      variant={ variant }
      open= { open }
      onClose={ onClose ? onClose : null }
    >
      <div className={classes.toolbar}></div>
      <Divider />
      <ListBar logged={logged}/>
    </Drawer>
  );
};

export default Menu;
