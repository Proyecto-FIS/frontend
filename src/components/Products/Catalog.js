import React, { Component } from "react";
import ProductsService from "../../services/ProductsService";
import { connect } from "react-redux";
import ProductSkeleton from "../Common/ProductSkeleton"
import Product from "./Product"
import NavBar from "../Common/NavBar"

//MUI
import { withStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Grid,
  Container
} from "@material-ui/core";
//Redux


const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

export class Album extends Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount(){
    this.ProductsService = new ProductsService();
    this.ProductsService.getAllProducts();
  }
  render() {
    const {classes, ProductsReducer: {products, loading}} = this.props;

    let productsList = loading ? (<ProductSkeleton />) : (
      products.map((product) => 
          <Product product={product}/>)
    );

    return (
      <Grid>
        <CssBaseline />
        <NavBar/>
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {productsList}
            </Grid>
          </Container>
        </main>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ProductsReducer: state.ProductsReducer
  };
};


export default connect(
  mapStateToProps
)(withStyles(styles, { withTheme: true })(Album));
