import axios from "axios";
import getAllProducts from "../redux/actions/Products/getAllProducts";
import getProduct from "../redux/actions/Products/getProduct";
import loadingProducts from "../redux/actions/Products/loadingProducts";
import loadingProduct from "../redux/actions/Products/loadingProduct";
import creatingProduct from "../redux/actions/Products/creatingProduct";
import imageUploaded from "../redux/actions/imageUploaded";
import loadingError from "../redux/actions/loadingError";
import createdProduct from "../redux/actions/Products/createdProduct";
import deletingProduct from "../redux/actions/Products/deletingProduct";
import deletedProduct from "../redux/actions/Products/deletedProduct";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import store from "../redux/store";
import UsersService from "./UsersService";

export class ProductsService {
  static requestAllProducts() {
    store.dispatch(loadingProducts());
    axios
      .get("/api/products")
      .then((response) => {
        store.dispatch(getAllProducts(response.data));
      })
      .catch((err) => {
        store.dispatch(loadingError());
        store.dispatch(
          startSnackBar(
            "error",
            "Ha ocurrido un error en la carga de productos"
          )
        );
      });
  }

  static requestProduct(productId) {
    store.dispatch(loadingProduct());
    axios
      .get("/api/products", { params: { productId: productId } })
      .then((response) => {
        store.dispatch(getProduct(response.data));
      })
      .catch((err) => {
        store.dispatch(loadingError());
        store.dispatch(
          startSnackBar(
            "error",
            "Ha ocurrido un error en la carga del producto"
          )
        );
      });
  }

  //TODO: requestProductByToasterId
  static uploadImage(formData) {
    return new Promise((resolve, reject) => {
      const userToken = UsersService.getUserToken();
      if (!userToken) {
        reject();
        return;
      }

      store.dispatch(creatingProduct());
      return axios
        .post("/api/uploadImage", formData)
        .then((res) => {
          store.dispatch(imageUploaded(res.data.data.Location));
          store.dispatch(
            startSnackBar("success", "Imagen subida correctamente")
          );
          resolve();
        })
        .catch((err) => {
          store.dispatch(
            startSnackBar("error", "No ha sido posible subir la imagen")
          );
          reject();
        });
    });
  }

  static postProduct(newProduct) {
    return new Promise((resolve, reject) => {
      const userToken = UsersService.getUserToken();
      if (!userToken) {
        reject();
        return;
      }
      store.dispatch(creatingProduct());
      console.log(newProduct);
      console.log(userToken);
      axios
        .post("/api/products", { userToken: userToken, product: newProduct })
        .then((res) => {
          store.dispatch(createdProduct(res));
          store.dispatch(
            startSnackBar("success", "Producto guardado correctamente")
          );
          resolve();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          store.dispatch(
            startSnackBar("error", "No ha sido posible guardar el producto")
          );
          reject();
        });
    });
  }

  static updateProduct(updatedProduct) {
    console.log(updatedProduct);
    return new Promise((resolve, reject) => {
      const userToken = UsersService.getUserToken();
      if (!userToken) {
        reject();
        return;
      }
      store.dispatch(creatingProduct());
      axios
        .put(
          "/api/products",
          { userToken: userToken, product: updatedProduct },
          { params: { productId: updatedProduct._id } }
        )
        .then((res) => {
          store.dispatch(createdProduct(res));
          store.dispatch(
            startSnackBar("success", "Producto actualizado correctamente")
          );
          resolve();
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(
            startSnackBar("error", "No ha sido posible actualizar el producto")
          );
          reject();
        });
    });
  }

  static deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      const userToken = UsersService.getUserToken();
      if (!userToken) {
        reject();
        return;
      }
      store.dispatch(deletingProduct());
      axios
        .delete("/api/products", {
          data: { userToken: userToken },
          params: { productId: productId },
        })
        .then(() => {
          store.dispatch(deletedProduct());
          store.dispatch(
            startSnackBar("success", "Producto borrado con éxito")
          );
          resolve();
        })
        .catch((err) => {
          store.dispatch(
            startSnackBar("error", "No se ha podido eliminar el producto")
          );
          reject();
        });
    });
  }
}
export default ProductsService;
