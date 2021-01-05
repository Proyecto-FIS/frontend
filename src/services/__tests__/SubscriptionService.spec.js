import SubscriptionService from "../SubscriptionService";
import axios from "axios";
import AxiosMock from 'axios-mock-adapter';
import {
    waitFor
} from "@testing-library/react";
import store from "../../redux/store";
import startLoader from "../../redux/actions/Loader/startLoader";

const assertAuthError = () => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe("No se encuentra autenticado ahora mismo");
};

beforeEach(() => {
    localStorage.clear();
    store.dispatch(startLoader());
});

it("No token found in GET", () => {
    SubscriptionService.requestSubscriptions();
    assertAuthError();
    expect(store.getState().LoaderReducer.elements).toEqual([]);
});

it("GET working", () => {
    const axiosMock = new AxiosMock(axios);
    const data = "expected_data";
    axiosMock.onGet('/api/subscription').reply(200, data);

    localStorage.setItem("token", "sample_token");

    SubscriptionService.requestSubscriptions();

    waitFor(() => {
        const state = store.getState();
        expect(state.SnackbarReducer.message).toBe("");
        expect(state.LoaderReducer.elements).toEqual(data);
    });
});

it("Error in GET", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet('/api/subscription').reply(401, "error");

    localStorage.setItem("token", "sample_token");

    SubscriptionService.requestSubscriptions();

    waitFor(() => {
        const state = store.getState();
        expect(state.SnackbarReducer.severity).toBe("error");
        expect(state.SnackbarReducer.message).toBe("Ha ocurrido un error en la carga de subscripciones");
        expect(state.LoaderReducer.elements).toEqual([]);
    });
});

it("No token found in POST", () => {
    return SubscriptionService.postNewSubscription({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().LoaderReducer.elements).toEqual(null);
        });
});

it("POST working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost('/api/subscription').reply(200);
    localStorage.setItem("token", "sample_token");

    return SubscriptionService.postNewSubscription({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Perfil guardado satisfactoriamente");
        });
});

it("Error in POST", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost('/api/subscription').reply(401);
    localStorage.setItem("token", "sample_token");

    return SubscriptionService.postNewSubscription({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No ha sido posible guardar el subscripcion");
        });
});

it("No token found in PUT", () => {
    return SubscriptionService.editSubscription({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().LoaderReducer.elements).toEqual(null);
        });
});

it("PUT working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPut('/api/subscription').reply(200);
    localStorage.setItem("token", "sample_token");

    return SubscriptionService.editSubscription({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Perfil actualizado correctamente");
        });
});

it("Error in PUT", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPut('/api/subscription').reply(401);
    localStorage.setItem("token", "sample_token");

    return SubscriptionService.editSubscription({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No ha sido posible actualizar el subscripcion");
        });
});

it("No token found in DELETE", () => {
    return SubscriptionService.deleteSubscription({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().LoaderReducer.elements).toEqual(null);
        });
});

it("DELETE working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete('/api/subscription').reply(200);
    localStorage.setItem("token", "sample_token");

    return SubscriptionService.deleteSubscription({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Perfil eliminado sin problemas");
        });
});

it("Error in DELETE", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete('/api/subscription').reply(401);
    localStorage.setItem("token", "sample_token");

    return SubscriptionService.deleteSubscription({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No se ha podido eliminar el subscripcion");
        });
});