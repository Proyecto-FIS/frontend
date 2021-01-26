import DeliveryService from "../DeliveryService";
import axios from "axios";
import AxiosMock from 'axios-mock-adapter';
import { waitFor } from "@testing-library/react";
import store from "../../redux/store";
import startLoader from "../../redux/actions/Delivery/load";
import { doLogin, doLogout } from "../../setupTests";

const assertAuthError = () => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe("No se encuentra autenticado ahora mismo");
};

beforeEach(() => {
    localStorage.clear();
    store.dispatch(startLoader());
    doLogout(store);
});

it("No token found in GET /deliveries", () => {
    DeliveryService.requestDeliveries();
    assertAuthError();
    expect(store.getState().DeliveriesReducer.elements).toEqual([]);
});

it("GET /deliveries working", () => {
    const axiosMock = new AxiosMock(axios);
    const data = "expected_data";
    axiosMock.onGet('/api/deliveries').reply(200, data);

    doLogin(store);

    DeliveryService.requestDeliveries();

    waitFor(() => {
        const state = store.getState();
        expect(state.SnackbarReducer.message).toBe("");
        expect(state.DeliveriesReducer.elements).toEqual(data);
    });
});

it("Error in GET /deliveries", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet('/api/deliveries').reply(401, "error");

    doLogin(store);

    DeliveryService.requestDeliveries();

    waitFor(() => {
        const state = store.getState();
        expect(state.SnackbarReducer.severity).toBe("error");
        expect(state.SnackbarReducer.message).toBe("Ha ocurrido un error en la carga de deliveries");
        expect(state.DeliveriesReducer.elements).toEqual([]);
    });
});

it("No token found in POST /deliveries", () => {
    return DeliveryService.newDelivery({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().DeliveriesReducer.elements).toEqual(null);
        });
});

it("POST /deliveries working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost('/api/deliveries').reply(200);

    doLogin(store);

    return DeliveryService.newDelivery({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Entrega iniciada satisfactoriamente");
        });
});

it("Error in POST /deliveries", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost('/api/deliveries').reply(401);

    doLogin(store);

    return DeliveryService.newDelivery({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No ha sido posible iniciar la entrega");
        });
});

it("No token found in PUT /deliveries", () => {
    return DeliveryService.editDelivery({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().DeliveriesReducer.elements).toEqual(null);
        });
});

it("PUT /deliveries working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPut('/api/deliveries').reply(200);

    doLogin(store);

    return DeliveryService.editDelivery({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Entrega actualizado correctamente");
        });
});

it("Error in PUT /deliveries", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPut('/api/deliveries').reply(401);

    doLogin(store);

    return DeliveryService.editDelivery({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No ha sido posible actualizar la entrega");
        });
});

it("No token found in DELETE /deliveries", () => {
    return DeliveryService.deleteDelivery({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().DeliveriesReducer.elements).toEqual(null);
        });
});

it("DELETE /deliveries working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete('/api/deliveries').reply(200);

    doLogin(store);

    return DeliveryService.deleteDelivery({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Entrega eliminada correctamente");
        });
});

it("Error in DELETE /deliveries", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete('/api/deliveries').reply(401);

    doLogin(store);

    return DeliveryService.deleteDelivery({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No ha sido posible eliminar la entrega");
        });
});
