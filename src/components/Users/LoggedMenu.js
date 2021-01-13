import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

import UsersService from "../../services/UsersService";

import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import DeliveryIcon from '@material-ui/icons/LocalShipping';

const LoggedMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    UsersService.logOut();
}
  return (
    <div>
      <Button variant="contained" color="primary" endIcon={<MenuIcon />} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {props.account.username}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.account.isCustomer ?
        <div>
          <MenuItem component={Link} to={`/customers/${props.account._id}`} onClick={handleClose}>
            <PersonIcon /> Mi perfil</MenuItem> 
          <MenuItem component={Link} to="/billingprofiles" onClick={handleClose}>
            <HomeWorkIcon/> Perfiles de entrega
          </MenuItem>
          <MenuItem component={Link} to="/purchase-history" onClick={handleClose}> 
            <HistoryIcon/> Historial de compras
          </MenuItem>
          <MenuItem component={Link} to="/deliveries" onClick={handleClose}> 
            <DeliveryIcon/> Lista de entregas
          </MenuItem>
        </div>
          
          :
          
        <MenuItem component={Link} to={`/toasters/${props.account._id}`} onClick={handleClose}>
          <PersonIcon /> Mi perfil</MenuItem>
      }

        <MenuItem onClick={logoutHandler}> 
          <ExitToAppIcon /> Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  );
}

export default LoggedMenu;