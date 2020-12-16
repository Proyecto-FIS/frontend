import React, { Component } from "react";
import ProductDetails from "../components/Products/ProductDetails";
import { Grid } from "@material-ui/core";
import ProductsService from "../services/ProductsService";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const styles = (theme) => ({
  card: {
      display: "flex",
      flexDirection: "column",
      height: "70vh"
  },
  cardMedia: {
      paddingTop: "100%", // Image aspect ratio
  },
  cardContent: {
      flexDirection: 'column',
      padding: 25
  },
});


class Product extends Component {
  componentDidMount(){
    const productId = this.props.match.params.productId;
    this.ProductsService = new ProductsService();
    this.ProductsService.requestProduct(productId);
}
  render() {
    const {products, loading} = this.props;
    console.log(this.props)
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {loading ? null : (<ProductDetails products={products}/>)}
        </Grid>
      </Grid>
    );
  }
}

Product.propTypes = {
  products: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
  products: state.products
});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Product)
);
