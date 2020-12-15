import axios from "axios";
import getAllProducts from "../redux/actions/getAllProducts";
import store from "../redux/store";

export class ProductsService {
  getAllProducts() {
    axios.get("/products", {}).then((response) => {
      console.log(response)
      store.dispatch(getAllProducts(response));
    });
  }
}

export default ProductsService;
