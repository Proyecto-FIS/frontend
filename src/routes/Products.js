import React, { Component, Fragment } from "react";
import Catalog from "../components/Products/Catalog";
import AddProduct from "../components/Products/AddProduct"

class Products extends Component {
    render() {
        return (
            <Fragment>
                <Catalog/>
                <AddProduct />
            </Fragment>
        );
    }
}

export default Products;
