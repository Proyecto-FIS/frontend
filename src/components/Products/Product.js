import { Component } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import styles from "../Common/Styles"

//MUI
import { withStyles } from "@material-ui/core/styles";

class Product extends Component {
  render() {

    
    const { classes, product: {_id, name, description, imageUrl}} = this.props;

    return (
      <Card key={_id} className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={imageUrl}
          title={name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
}

export default (withStyles(styles, { withTheme: true })(Product));;
