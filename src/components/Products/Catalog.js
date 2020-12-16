import React, { Component } from "react";
import ProductsService from "../../services/ProductsService";
import { connect } from "react-redux";
import ProductSkeleton from "./ProductSkeleton";
import Product from "./Product";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = (theme) => ({
    centerColumn: {
        backgroundColor: "lightgray",
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
            products.map(product => <Product product={product} />)
        );

        return (
            <Grid container spacing={2}>
                <Grid item xs={2}/>
                <Grid container item xs={8} spacing={2} className={classes.centerColumn}>
                    {productsList}
                </Grid>
                <Grid item xs={2}/>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.ProductsReducer.products,
        loading: state.ProductsReducer.loading
    };
};

export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(Catalog)
);
