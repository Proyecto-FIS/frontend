import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const ProductSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
      <Card className={classes.card} key={index}>
        <CardMedia className={classes.cover} />
        <CardContent className={classes.cardContent}>
          <div className={classes.handle} />
          <div className={classes.date} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
        </CardContent>
      </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ProductSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ProductSkeleton;