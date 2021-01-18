import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import startLoader from "../redux/actions/PurchaseHistory/load";
import finishLoader from "../redux/actions/PurchaseHistory/done";
import store from "../redux/store";
import UsersService from "./UsersService";

const addProductsData = (purchases) => {

    // Check for no purchases
    if(purchases.length === 0) {
        store.dispatch(startSnackBar("info", "No tiene más entradas en el historial de compras"));
        return purchases;
    }

    // Get all product identifiers
    let productIDs = new Set();
    purchases.forEach(purchase => {
        purchase.products.forEach(product => {
            productIDs.add(product._id);
        });
    });

    // Get every needed product only once
    const identifiers = Array.from(productIDs).join();
    return axios.get("/api/products-several", { params: { identifiers } })
        .then(response => response.data)
        .then(products => {
            return products.map(product => ({ _id: product._id, name: product.name, imageUrl: product.imageUrl }));
        })
        .then(products => {

            // Map every product to its purchases
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

            const userToken = UsersService.getUserToken();
            if (!userToken) {
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
