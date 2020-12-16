import axios from "axios";
import getAllProducts from "../redux/actions/getAllProducts";
import getAProduct from "../redux/actions/getProduct";
import loadingProducts from "../redux/actions/loadingProducts";
import loadingError from "../redux/actions/loadingError";
import store from "../redux/store";

export class ProductsService {

    requestAllProducts = () => {
        store.dispatch(loadingProducts());
        axios.get("/api/products")
            .then(response => store.dispatch(getAllProducts(response.data)))
            .catch(err => loadingError())
    }

    requestProduct = (productId) => {
        store.dispatch(loadingProducts());
        axios.get("/api/products", {params: { productId: productId }})
            .then(response => store.dispatch(getAProduct(response.data)))
            .catch(err => loadingError())
    }
}

export default ProductsService;
