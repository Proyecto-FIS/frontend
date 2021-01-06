import axios from "axios";
import getAllProducts from "../redux/actions/getAllProducts";
import getProduct from "../redux/actions/getProduct";
import loadingProducts from "../redux/actions/loadingProducts";
import loadingProduct from "../redux/actions/loadingProduct";
import creatingProduct from "../redux/actions/creatingProduct";
import imageUploaded from "../redux/actions/imageUploaded";
import loadingError from "../redux/actions/loadingError";
import setProductErrors from "../redux/actions/setProductErrors";
import clearProductErrors from "../redux/actions/clearProductErrors";
import createdProduct from "../redux/actions/createdProduct";
import deletingProduct from "../redux/actions/Products/deletingProduct";
import deletedProduct from "../redux/actions/Products/deletedProduct";


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
            store.dispatch(imageUploaded(res.data.data.Location))
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    postProduct = (newProduct) => {
        store.dispatch(creatingProduct());
        axios.post('/api/products', newProduct)
        .then((res) => {
            store.dispatch(createdProduct(res))
            store.dispatch(clearProductErrors())
        })
        .catch((err) => {
            let errors = {}
            Object.keys(err.response.data.errors).map((key) => errors[key] = err.response.data.errors[key].message)
            store.dispatch(setProductErrors(errors)) 
        })
    }

    deleteProduct = (token, productId) => {
        console.log(token)
        store.dispatch(deletingProduct());

        axios.delete('/api/products', {data:{userToken: token}, params: { productId: productId }})
        .then(() => {
            store.dispatch(deletedProduct());
        })
        .catch((err) => {
            store.dispatch(deletedProduct());
            console.error(err)
        })
    }

}
export default ProductsService;
