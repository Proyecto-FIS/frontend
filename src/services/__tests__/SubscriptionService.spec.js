import SubscriptionService from "../SubscriptionService";
import axios from "axios";
import AxiosMock from 'axios-mock-adapter';
import store from "../../redux/store";
import { doLogin, doLogout } from "../../setupTests";

const assertAuthError = () => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe("No se encuentra autenticado ahora mismo");
};

beforeEach(() => {
    localStorage.clear();
    doLogout(store);
});

it("No token found in POST", () => {
    SubscriptionService.postSubscription("billingProfile", "products", "paymentMethodID")
        .catch(() => {
            assertAuthError();
        });
});

it("Correct POST", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost("/api/subscription").reply(200, {});

    doLogin(store);

    SubscriptionService.postSubscription("billingProfile", "products", "paymentMethodID")
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Suscripción realizada satisfactoriamente");
        });
});

it("Error in POST", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost("/api/subscription").reply(200, { error: { message: "error message" } });

    doLogin(store);

    SubscriptionService.postSubscription("billingProfile", "products", "paymentMethodID")
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("¡Ha habido un error! error message");
        });
});

it("Exception in POST", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost("/api/subscription").reply(500);

    doLogin(store);

    SubscriptionService.postSubscription("billingProfile", "products", "paymentMethodID")
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("¡Ha habido un error! Error: Request failed with status code 500");
        });
});

it("No token found in DELETE", () => {
    SubscriptionService.deleteSubscription("transactionID")
        .catch(() => {
            assertAuthError();
        });
});

it("Correct DELETE", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete("/api/subscription").reply(200);

    doLogin(store);

    SubscriptionService.deleteSubscription("transactionID")
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Suscripción eliminada correctamente");
        });
});

it("Wrong DELETE", () => {

    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete("/api/subscription").reply(500);

    doLogin(store);

    SubscriptionService.deleteSubscription("transactionID")
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No se ha podido eliminar la suscripción");
        });
});
