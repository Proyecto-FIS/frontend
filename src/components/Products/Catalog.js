import React, { Component } from "react";
import ProductsService from "../../services/ProductsService";
import Product from "./Product";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AddProduct from "./AddProduct";
import { connect } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";

const styles = (theme) => ({
  centerColumn: {
    marginTop: theme.spacing(0),
  },
});

export class Catalog extends Component {
  componentDidMount() {
    ProductsService.requestAllProducts();
  }

  render() {
    const { classes, products, loading, account } = this.props;

    let productsList = loading ? (
      <Skeleton aria-label="skeleton" variant="rect" height={"70vh"} />
    ) : (
      products.map((product) => <Product key={product._id} product={product} />)
    );

    return (
      <Grid container>
        <Grid container item sm={2} xs={1}></Grid>
        <Grid
          container
          item
          sm={8}
          xs={10}
          spacing={2}
          justify="center"
          alignItems="stretch"
          direction="row"
          className={classes.centerColumn}
        >
          {productsList}
          {account && !account.isCustomer ? <AddProduct /> : null}
        </Grid>
        <Grid container item sm={2} xs={1}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.ProductsReducer.productList,
    loading: state.ProductsReducer.loading,
    account: state.AuthReducer.account,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Catalog)
);
