import React, { Component } from "react";
import ProductsService from "../../services/ProductsService";
import { connect } from "react-redux";
import ProductSkeleton from "./ProductSkeleton";
import Product from "./Product";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = (theme) => ({
    centerColumn: {
        marginTop: theme.spacing(0),
    }
});

export class Catalog extends Component {

    componentDidMount() {
        this.ProductsService = new ProductsService();
        this.ProductsService.requestAllProducts();
    }

    render() {
        const { classes, products, loading } = this.props;

        let productsList = loading ? (
            <ProductSkeleton />
        ) : (
            products.map(product => <Product key={product._id} product={product} />)
        );

        return (
            <Grid container>
                <Grid container item sm={2} xs={1}></Grid>
                <Grid container item sm={8} xs={10} spacing={2} justify="center" alignItems="stretch" direction="row" className={classes.centerColumn}>
                    {productsList}
                </Grid>
                <Grid container item sm={2} xs={1}></Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.ProductsReducer.productList,
        loading: state.ProductsReducer.loading
    };
};

export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(Catalog)
);
