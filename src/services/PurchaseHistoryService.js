import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import startLoader from "../redux/actions/Loader/startLoader";
import finishLoader from "../redux/actions/Loader/finishLoader";
import store from "../redux/store";

const addProductsData = (purchases) => {

    // Get all product identifiers
    let productIDs = {};
    purchases.forEach(purchase => {
        purchase.products.forEach(product => {
            productIDs[product._id] = {};
        });
    });

    // Get every needed product only once
    const promises = Object.keys(productIDs).map(productId => {
        return axios.get("/api/products", { params: { productId } })
            .then(response => response.data)
            .then(data => ({ _id: productId, name: data.name, imageUrl: data.imageUrl }));
    });

    // Map every product to its purchase
    return Promise.all(promises)
        .then(products => {
            for (let i = 0; i < purchases.length; i++) {
                purchases[i].timestamp = new Date(purchases[i].timestamp);
                for (let j = 0; j < purchases[i].products.length; j++) {
                    const matchingProduct = products.find(prod => prod._id === purchases[i].products[j]._id);
                    purchases[i].products[j] = { ...purchases[i].products[j], ...matchingProduct };
                }
            }
            return purchases;
        });
};

export class PurchaseHistoryService {

    static getHistory(pageSize, beforeTimestamp) {
        return new Promise((resolve, reject) => {

            store.dispatch(startLoader());

            const userToken = localStorage.getItem("token");
            if (!userToken) {
                store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));
                store.dispatch(finishLoader());
                reject();
                return;
            }

            return axios.get("/api/history", { params: { userToken, beforeTimestamp, pageSize } })
                .then(response => addProductsData(response.data))
                .then(data => {
                    store.dispatch(finishLoader(data));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "Ha ocurrido un error cargando el historial de compras"));
                    store.dispatch(finishLoader());
                    reject();
                });
        });
    }
}

export default PurchaseHistoryService;
