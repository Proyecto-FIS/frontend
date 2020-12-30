import BillingProfileService from "../BillingProfileService";
import axios from "axios";
import AxiosMock from 'axios-mock-adapter';
import { waitFor } from "@testing-library/react";
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
    BillingProfileService.requestProfiles();
    assertAuthError();
    expect(store.getState().LoaderReducer.elements).toEqual([]);
});

it("GET working", () => {
    const axiosMock = new AxiosMock(axios);
    const data = "expected_data";
    axiosMock.onGet('/api/billing-profile').reply(200, data);

    localStorage.setItem("token", "sample_token");

    BillingProfileService.requestProfiles();

    waitFor(() => {
        const state = store.getState();
        expect(state.SnackbarReducer.message).toBe("");
        expect(state.LoaderReducer.elements).toEqual(data);
    });
});

it("Error in GET", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet('/api/billing-profile').reply(401, "error");

    localStorage.setItem("token", "sample_token");

    BillingProfileService.requestProfiles();

    waitFor(() => {
        const state = store.getState();
        expect(state.SnackbarReducer.severity).toBe("error");
        expect(state.SnackbarReducer.message).toBe("Ha ocurrido un error en la carga de perfiles");
        expect(state.LoaderReducer.elements).toEqual([]);
    });
});

it("No token found in POST", () => {
    return BillingProfileService.postNewProfile({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().LoaderReducer.elements).toEqual(null);
        });
});

it("POST working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost('/api/billing-profile').reply(200);
    localStorage.setItem("token", "sample_token");

    return BillingProfileService.postNewProfile({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Perfil guardado satisfactoriamente");
        });
});

it("Error in POST", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPost('/api/billing-profile').reply(401);
    localStorage.setItem("token", "sample_token");

    return BillingProfileService.postNewProfile({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No ha sido posible guardar el perfil");
        });
});

it("No token found in PUT", () => {
    return BillingProfileService.editProfile({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().LoaderReducer.elements).toEqual(null);
        });
});

it("PUT working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPut('/api/billing-profile').reply(200);
    localStorage.setItem("token", "sample_token");

    return BillingProfileService.editProfile({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Perfil actualizado correctamente");
        });
});

it("Error in PUT", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onPut('/api/billing-profile').reply(401);
    localStorage.setItem("token", "sample_token");

    return BillingProfileService.editProfile({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No ha sido posible actualizar el perfil");
        });
});

it("No token found in DELETE", () => {
    return BillingProfileService.deleteProfile({})
        .catch(() => {
            assertAuthError();
            expect(store.getState().LoaderReducer.elements).toEqual(null);
        });
});

it("DELETE working", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete('/api/billing-profile').reply(200);
    localStorage.setItem("token", "sample_token");

    return BillingProfileService.deleteProfile({})
        .then(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("success");
            expect(state.SnackbarReducer.message).toBe("Perfil eliminado sin problemas");
        });
});

it("Error in PUT", () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onDelete('/api/billing-profile').reply(401);
    localStorage.setItem("token", "sample_token");

    return BillingProfileService.deleteProfile({})
        .catch(() => {
            const state = store.getState();
            expect(state.SnackbarReducer.severity).toBe("error");
            expect(state.SnackbarReducer.message).toBe("No se ha podido eliminar el perfil");
        });
});
