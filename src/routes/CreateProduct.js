import React, { Component } from "react";
import NewProduct from "../components/Products/NewProduct/NewProduct";
import { Grid } from "@material-ui/core";

class CreateProduct extends Component {
  render() {
    return (
      <Grid container>
        <Grid container item sm={2} xs={1}></Grid>
        <Grid item sm={8} xs={10}>
          <NewProduct />
        </Grid>
      </Grid>
    );
  }
}

export default CreateProduct;
