import React, { Component } from 'react';

import { Card, Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';

import { withStyles } from "@material-ui/core/styles";

import { Link } from 'react-router-dom';

import { Divider } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

const styles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: '100px',
},
  cardContent: {
    flexGrow: 1,
  },
  chip: {
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "10px",
  },
  cardSecondaryInfo: {
    display: 'flex',
  },
  CardActions: {
    margin: "auto",
  },
});

class ToasterDetails extends Component {

  render() {
    const { classes, toaster } = this.props;

    return (
        <Grid item key={toaster._id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>

            <CardMedia
              component="div"
              className={classes.cardMedia}
              
              image={toaster.pictureUrl}
              title={toaster.name}
            />

            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {toaster.name}
              </Typography>
              <Typography>
                {toaster.description}
              </Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent className={classes.cardContent}>
              {toaster.phoneNumber &&
                  <Chip className={classes.chip} icon={<PhoneIcon />} label={toaster.phoneNumber} />
              }

              {toaster.phoneNumber &&
                <div>
                  Dirección: {toaster.address}
                </div>
              }
            </CardContent>

            <CardActions className={classes.CardActions}>
              <Button size="large" color="primary" variant="contained" component={Link} 
              to={`/toasters/${toaster.account._id}`}>
                Ver
              </Button>
            </CardActions>
        </Card>
      </Grid>
    );
}
}

export default withStyles(styles, { withTheme: true })(ToasterDetails);
