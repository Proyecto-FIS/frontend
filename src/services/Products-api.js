import axios from "axios";

function AllProducts() {
  return axios.get("/api/products", {});
}

export default AllProducts;
