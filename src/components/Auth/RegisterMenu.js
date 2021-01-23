import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

export default function RegisterMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<GroupAddIcon />} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Registrarse
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem component={Link} to="/customer-register" onClick={handleClose}> Como cliente</MenuItem>
        <MenuItem component={Link} to="/toaster-register" onClick={handleClose}>Como tostador</MenuItem>
      </Menu>
    </div>
  );
}