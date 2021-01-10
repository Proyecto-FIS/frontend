import React, { Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ProductSkeleton from "../Products/ProductSkeleton";
import Product from "../Products/Product";

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';

import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatar2: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(9),
    height: theme.spacing(9),
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
  },
  centerColumn: {
    marginTop: theme.spacing(0),
}
}));

const ToasterTemplateLogout = (props) => {

  const classes = useStyles();
  let products = null;
  var empty = null;

    if(!props.toasterProducts) {
        products = <div></div>
    } else {
      if(props.toasterProducts.length === 0 && props.loading) {
        products = <ProductSkeleton/>
      } else if(props.toasterProducts.length === 0 && !props.loading) {
        empty = <div>Actualmente no tenemos ningún producto disponible :(</div>
      } else {
        products = props.toasterProducts.map(product => <Product key={product._id} product={product} />)
      }
    }
       
return (
  <Fragment>
        <div className={classes.paper}>
          {/* TOASTER INFO */}

            <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
              {props.user.name}
            </Typography> 

            {props.user.pictureUrl ?
            <Avatar className={classes.avatar2} alt={props.user.account.username} src={props.user.pictureUrl} /> :
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
          {empty}

          {/* Catálogo de productos */}
          <Grid container>
              <Grid container item sm={2} xs={1}></Grid>
              <Grid container item sm={8} xs={10} spacing={2} alignItems="stretch" direction="row" className={classes.centerColumn}>
                {products}
              </Grid>
              <Grid container item sm={2} xs={1}></Grid>
          </Grid>
          
  </Fragment>
          
)}

export default ToasterTemplateLogout;