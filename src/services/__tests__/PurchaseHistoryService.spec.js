import PurchaseHistoryService from "../PurchaseHistoryService";
import axios from "axios";
import AxiosMock from 'axios-mock-adapter';
import store from "../../redux/store";
import startLoader from "../../redux/actions/PurchaseHistory/load";
import { doLogin, doLogout } from "../../setupTests";

const pageSize = 4;
const beforeTimestamp = new Date();

const sampleData = [
    {
        userID: "userID",
        operationType: "payment",
        products: [
            {
                _id: "1",
                quantity: "20",
                unitPriceEuros: "30",
            },
            {
                _id: "2",
                quantity: "20",
                unitPriceEuros: "30",
            }
        ]
    }
];

const assertAuthError = () => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe("No se encuentra autenticado ahora mismo");
};

beforeEach(() => {
    localStorage.clear();
    store.dispatch(startLoader());  // Set to a known state
    doLogout(store);
});

it("No token found", () => {
    PurchaseHistoryService.getHistory(pageSize, beforeTimestamp)
        .catch(() => {
            assertAuthError();
            expect(store.getState().PurchaseHistoryReducer.elements).toEqual([]);
        });
});

it("GET working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet("/api/history").reply(200, sampleData);
    axiosMock.onGet("/api/products-several").reply(200, [{ _id: "1", name: "productname1", imageUrl: "testimage1" }, { _id: "2", name: "productname2", imageUrl: "testimage2" }]);
    doLogin(store);

    return PurchaseHistoryService.getHistory(pageSize, beforeTimestamp)
        .then(() => {
            const state = store.getState();
            expect(state.PurchaseHistoryReducer.elements.length).toBe(1);
            expect(state.PurchaseHistoryReducer.elements[0].userID).toBe("userID");
            expect(state.PurchaseHistoryReducer.elements[0].operationType).toBe("payment");
            expect(state.PurchaseHistoryReducer.elements[0].products.length).toBe(2);
            state.PurchaseHistoryReducer.elements[0].products.forEach((product, i) => {
                expect(product._id).toBe((i + 1).toString());
                expect(product.quantity).toBe(sampleData[0].products[i].quantity);
                expect(product.unitPriceEuros).toBe(sampleData[0].products[i].unitPriceEuros);
                expect(product.name).toBe(`productname${i + 1}`);
                expect(product.imageUrl).toBe(`testimage${i + 1}`);
            });
        });
});

it("Error in GET", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet('/api/history').reply(401, "error");
    doLogin(store);

    return PurchaseHistoryService.getHistory(pageSize, beforeTimestamp)
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("Ha ocurrido un error cargando el historial de compras");
        });
});

it("Error during product loading", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet('/api/history').reply(200, sampleData);
    axiosMock.onGet("/api/products").reply(500);
    doLogin(store);

    return PurchaseHistoryService.getHistory(pageSize, beforeTimestamp)
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("Ha ocurrido un error cargando el historial de compras");
        });
});

it("Empty history", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet("/api/history").reply(200, []);
    axiosMock.onGet("/api/products-several").reply(500);
    doLogin(store);

    return PurchaseHistoryService.getHistory(pageSize, beforeTimestamp)
        .then(() => {
            const state = store.getState();
            expect(state.PurchaseHistoryReducer.elements.length).toBe(0);
            expect(state.SnackbarReducer.severity).toBe("info");
            expect(state.SnackbarReducer.message).toBe("No tiene más entradas en el historial de compras");
        });
});
