import React, { Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';

import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gri: {
    marginTop: theme.spacing(3)
  }
}));

const ToasterTemplate = (props) => {

  const classes = useStyles();

return (
  <Fragment>
        <div className={classes.paper}>
          {/* TOASTER INFO */}

            <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
              {props.user.name}
            </Typography> 

            {props.user.pictureUrl ?
            <Avatar alt={props.user.account.username} src={props.user.pictureUrl} /> :
              <Avatar className={classes.avatar}/>}
        </div>

          <Divider variant="middle" /><br/>

          {props.user.phoneNumber &&
              <Chip className={classes.chip} icon={<PhoneIcon />} label={props.user.phoneNumber} />
          }

          {props.user.instagramUrl &&
            <a href={props.user.instagramUrl} style={{ textDecoration: 'none' }}>
              <Chip className={classes.chip} icon={<InstagramIcon />} label="Instagram" clickable />
            </a>
          }
          {props.user.facebookUrl &&
            <a href={props.user.facebookUrl} style={{ textDecoration: 'none' }}>
              <Chip className={classes.chip} icon={<FacebookIcon />} label="Facebook" clickable />
            </a>
          }
          {props.user.twitterUrl &&
            <a href={props.user.twitterUrl} style={{ textDecoration: 'none' }}>
              <Chip className={classes.chip} icon={<TwitterIcon />} label="Twitter" clickable />
            </a>
          }

          <br/> <br/>
          <Typography component="h1" variant="h6">
              Sobre nosotros
          </Typography>
          {props.user.description}

          {props.user.address && 
            <div>
              <br/>
              <Typography component="h1" variant="h6">
                Estamos en...
              </Typography>
              
              {props.user.address}
            </div>
          }
          <br/>
          <Typography component="h1" variant="h6">
            Nuestros productos
          </Typography>

          {/* TODO: meter catálogo de productos */}
  </Fragment>
          
)}

export default ToasterTemplate;