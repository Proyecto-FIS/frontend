import axios from "axios";
import getAllProducts from "../redux/actions/getAllProducts";
import getProduct from "../redux/actions/getProduct";
import loadingProducts from "../redux/actions/loadingProducts";
import loadingProduct from "../redux/actions/loadingProduct";
import creatingProduct from "../redux/actions/creatingProduct";
import imageUploaded from "../redux/actions/imageUploaded";
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
        store.dispatch(loadingProduct());
        axios.get("/api/products", {params: { productId: productId }})
            .then(response => store.dispatch(getProduct(response.data)))
            .catch(err => loadingError())
    }

    uploadImage = (formData) =>{
        store.dispatch(creatingProduct());
        axios.post('/api/uploadImage', formData)
        .then((res) => {
            store.dispatch(imageUploaded())
            return res.data.coverURL;
        })
        .catch((err)=>{
            console.log(err);
        });
    }

}

export default ProductsService;
