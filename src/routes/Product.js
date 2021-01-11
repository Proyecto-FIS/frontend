import React, { Component } from "react";
import ProductDetails from "../components/Products/ProductDetails";
import { Grid } from "@material-ui/core";
import ProductsService from "../services/ProductsService";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ProductDetailSkeleton from "../components/Products/ProductDetailSkeleton";

const styles = (theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "70vh",
  },
  cardMedia: {
    paddingTop: "100%", // Image aspect ratio
  },
  cardContent: {
    flexDirection: "column",
    padding: 25,
  },
});

class Product extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    ProductsService.requestProduct(productId);
  }

  render() {
    const { product, loading } = this.props;
    return (
      <Grid container>
        <Grid container item sm={2} xs={1}></Grid>
        <Grid item sm={8} xs={10}>
          {loading === undefined || loading === true ? (
            <ProductDetailSkeleton />
          ) : (
            <ProductDetails product={product} />
          )}
        </Grid>
        <Grid container item sm={2} xs={1}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.ProductsReducer.productDetails.product,
  loading: state.ProductsReducer.productDetails.loading,
});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Product)
);
