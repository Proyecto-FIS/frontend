import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

const styles = {
  addButton: {
    position: "fixed",
    bottom: "10%",
    right: "5%",
  },
  extendedIcon: {
    margin: "5px",
  },
};

class AddProduct extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.addButton}>
        <Fab
          aria-label="add-product"
          variant="extended"
          component={Link}
          to={`/products/new`}
        >
          <AddIcon className={classes.extendedIcon} />
          Añadir Producto
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(AddProduct);
