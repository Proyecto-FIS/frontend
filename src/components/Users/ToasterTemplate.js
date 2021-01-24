import React, { Fragment, Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import ProductSkeleton from "../Products/ProductSkeleton";
import Product from "../Products/Product";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import PhoneIcon from "@material-ui/icons/Phone";

import { Divider } from "@material-ui/core";

import { Divider } from "@material-ui/core";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    width: "100%", // Fix IE 11 issue.
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
    marginTop: theme.spacing(3),
  },
  centerColumn: {
    marginTop: theme.spacing(0),
  },
});

class ToasterTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      empty: null,
    };
  }

  render() {
    const { classes, user } = this.props;

    if (!this.props.toasterProducts) {
      this.products = <div></div>;
    } else {
      if (this.props.toasterProducts.length === 0 && this.props.loading) {
        this.products = <ProductSkeleton />;
      } else if (
        this.props.toasterProducts.length === 0 &&
        !this.props.loading
      ) {
        this.empty = (
          <div>Actualmente no tenemos ningún producto disponible :(</div>
        );
      } else {
        this.products = this.props.toasterProducts.map((product) => (
          <Product key={product._id} product={product} />
        ));
      }
    }

    return (
      <Fragment>
        <div className={classes.paper}>
          {/* TOASTER INFO */}

          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            {user.name}
          </Typography>

          {user.pictureUrl ? (
            <Avatar
              className={classes.avatar2}
              alt={user.account.username}
              src={user.pictureUrl}
            />
          ) : (
            <Avatar className={classes.avatar} />
          )}
        </div>
        <Divider variant="middle" />
        <br />
        {user.phoneNumber && (
          <Chip
            className={classes.chip}
            icon={<PhoneIcon />}
            label={user.phoneNumber}
          />
        )}
        {user.instagramUrl && (
          <a href={user.instagramUrl} style={{ textDecoration: "none" }}>
            <Chip
              className={classes.chip}
              icon={<InstagramIcon />}
              label="Instagram"
              clickable
            />
          </a>
        )}
        {user.facebookUrl && (
          <a href={user.facebookUrl} style={{ textDecoration: "none" }}>
            <Chip
              className={classes.chip}
              icon={<FacebookIcon />}
              label="Facebook"
              clickable
            />
          </a>
        )}
        {user.twitterUrl && (
          <a href={user.twitterUrl} style={{ textDecoration: "none" }}>
            <Chip
              className={classes.chip}
              icon={<TwitterIcon />}
              label="Twitter"
              clickable
            />
          </a>
        )}
        <br /> <br />
        <Typography component="h1" variant="h6">
          Sobre nosotros
        </Typography>
        {user.description}
        {user.address && (
          <div>
            <br />
            <Typography component="h1" variant="h6">
              Estamos en...
            </Typography>

            {user.address}
          </div>
        )}
        <br /> <br />
        <Typography component="h1" variant="h6">
          Estamos en...
        </Typography>
        {this.empty}
        {/* Catálogo de productos */}
        <Grid container>
          <Grid container item sm={2} xs={1}></Grid>
          <Grid
            container
            item
            sm={8}
            xs={10}
            spacing={2}
            alignItems="stretch"
            direction="row"
            className={classes.centerColumn}
          >
            {this.products}
          </Grid>
          <Grid container item sm={2} xs={1}></Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ToasterTemplate);
