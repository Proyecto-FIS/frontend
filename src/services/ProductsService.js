import axios from "axios";
import getAllProducts from "../redux/actions/getAllProducts";
import getAProduct from "../redux/actions/getAProduct";
import loadingProducts from "../redux/actions/loadingProducts";
import loadingError from "../redux/actions/loadingError";

export class ProductsService {

    getAllProducts = () => dispatch => {
      dispatch(loadingProducts());
      axios.get("/api/products", {})
      .then((response) => {
        dispatch(getAllProducts(response));
      })
      .catch(err => loadingError())
    }

    getAProduct = (productId) => dispatch => {
      dispatch(loadingProducts());
      axios.get("/api/products", {productId: productId})
      .then((response) => {
        dispatch(getAProduct(response));
      })
      .catch(err => loadingError())
    }
}

export default ProductsService;
