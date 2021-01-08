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
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import store from "../redux/store";
import UsersService from "./UsersService";

const sendAuthError = () =>
  store.dispatch(
    startSnackBar("error", "No se encuentra autenticado ahora mismo")
  );

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
      const userToken = store.getState().AuthReducer.account.token;
      if (!userToken) {
        sendAuthError();
        reject();
        return;
      }

      store.dispatch(creatingProduct());
      return axios
        .post("/api/uploadImage", formData)
        .then((res) => {
          store.dispatch(imageUploaded(res.data.data.Location));
          store.dispatch(
            startSnackBar("success", "Perfil imagen subida correctamente")
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
    console.log(newProduct);
    return new Promise((resolve, reject) => {
      const userToken = UsersService.getUserToken();
      if (!userToken) {
        reject();
        return;
      }
      console.log(newProduct);
      console.log(userToken);
      store.dispatch(creatingProduct());
      axios
        .post("/api/products", {
          data: { userToken: userToken, product: newProduct },
        })
        .then((res) => {
          store.dispatch(createdProduct(res));
          store.dispatch(clearProductErrors());
          store.dispatch(
            startSnackBar("success", "Producto guardado correctamente")
          );
          resolve();
        })
        .catch((err) => {
          console.log(err);
          //   let errors = {};
          //   Object.keys(err.response.data.errors).map(
          //     (key) => (errors[key] = err.response.data.errors[key].message)
          //   );
          //store.dispatch(setProductErrors(err));
          store.dispatch(
            startSnackBar("error", "No ha sido posible guardar el producto")
          );
          reject();
        });
    });
  }

  static updateProduct(updatedProduct) {
    return new Promise((resolve, reject) => {
      const userToken = UsersService.getUserToken();
      if (!userToken) {
        reject();
        return;
      }
      //TODO:  que hace esto ?? es necesario en el put ?
      store.dispatch(creatingProduct());
      axios
        .put("/api/products", {
          data: { userToken: userToken, product: updatedProduct },
        })
        .then((res) => {
          //TODO: misma pregunta, supongo que en esta caso si es necesario
          store.dispatch(createdProduct(res));
          store.dispatch(clearProductErrors());
          store.dispatch(
            startSnackBar("success", "Producto actualizado correctamente")
          );
          resolve();
        })
        .catch((err) => {
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
