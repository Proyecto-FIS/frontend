import { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";

class NavBar extends Component {
  render() {

    return (
      <AppBar position="relative">
        <Toolbar className="nav-container">
          <CameraIcon/>
          <Typography variant="h6" color="inherit" noWrap>
             ¿Te apetece un café?
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
