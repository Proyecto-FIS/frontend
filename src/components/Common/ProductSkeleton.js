import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from "./Styles"

// MUI
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from "@material-ui/core/styles";

const ProductSkeleton = (props) => {
  const content = Array.from({ length: 20 }).map((item, index) => (
      <Card key={index}>
        <Skeleton variant="rect" width={210} height={118} />
      </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ProductSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withStyles(styles, { withTheme: true })(ProductSkeleton));