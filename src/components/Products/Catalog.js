import React, { Component } from "react";
import ProductsService from "../../services/ProductsService";
import { connect } from "react-redux";
import ProductSkeleton from "../Common/ProductSkeleton";
import Product from "./Product";
import styles from "../Common/Styles";
import NavBar from "../Common/NavBar";

//MUI
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
//Redux

export class Catalog extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.ProductsService = new ProductsService();
    this.ProductsService.getAllProducts();
  }
  render() {
    const {
      ProductsReducer: { products, loading },
    } = this.props;
    let productsList = loading ? (
      <ProductSkeleton />
    ) : (
      products.map((product) => <Product product={product} />)
    );

    return (
      <div>
        <NavBar />
        <Grid container spacing={16}>
          <Grid item sm={8} xs={12}>
            {productsList}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ProductsReducer: state.ProductsReducer,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Catalog)
);
