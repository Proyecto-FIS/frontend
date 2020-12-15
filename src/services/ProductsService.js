import axios from "axios";
import getAllProducts from "../redux/actions/getAllProducts";
import store from "../redux/store";

export class ProductsService {
    getAllProducts() {
        axios.get("/api/products", {}).then((response) => {
            store.dispatch(getAllProducts(response));
        });
    }
}

export default ProductsService;
