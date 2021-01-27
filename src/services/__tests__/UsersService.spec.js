import UsersService from "../UsersService";
import axios from "axios";
import AxiosMock from "axios-mock-adapter";
import { waitFor } from "@testing-library/react";
import store from "../../redux/store";
import startLoader from "../../redux/actions/Products/load";
import { doLogout } from "../../setupTests";


const assertAuthError = () => {
  const state = store.getState();
  expect(state.SnackbarReducer.severity).toBe("error");
  expect(state.SnackbarReducer.message).toBe(
    "No se encuentra autenticado ahora mismo"
  );
};

beforeEach(() => {
  localStorage.clear();
  store.dispatch(startLoader());
  doLogout(store);
});

it("sample", () => {});

//////////////         CUSTOMER         //////////////////////
it("GET Customer working", () => {
  const axiosMock = new AxiosMock(axios);
  const data = "expected_data";
  axiosMock.onGet('/api/customers').reply(200, data);

  UsersService.getCustomerProfile();

  waitFor(() => {
      const state = store.getState();
      expect(state.SnackbarReducer.message).toBe("");
      expect(state.ProfileReducer.user).toEqual(data);
  });
});

it("Error in GET Customer", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onGet('/api/customers').reply(404, "error");

  UsersService.getCustomerProfile();

  waitFor(() => {
      const state = store.getState();
      expect(state.SnackbarReducer.severity).toBe("error");
      expect(state.SnackbarReducer.message).toBe("Error al obtener usuario");
      expect(state.ProfileReducer.user).toEqual({});
  });
});

it("POST customer working", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/customers").reply(201, {});

  return UsersService.registerCustomer({}).then(() => {
    const state = store.getState();

    expect(state.AuthReducer.loading).toBe(false);
    expect(state.AuthReducer.error).toBe(null);
  });
});

it("Error in POST customer", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/customers").reply(500);

  return UsersService.registerCustomer({}).catch(() => {
    const state = store.getState();
    expect(state.AuthReducer.loading).toBe(false);
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe("Error al registrar un cliente. Puede que el nick o email ya estén en uso.");
  
  });
});


it("No token found in PUT customer", () => {
  return UsersService.updateCustomerProfile({}).catch(() => {
    assertAuthError();
  });
});


it("No token found in DELETE", () => {
  return UsersService.deleteCustomer({}).catch(() => {
    assertAuthError();
  });
});



//////////////         TOASTER         //////////////////////

it("GET Toaster working", () => {
  const axiosMock = new AxiosMock(axios);
  const data = "expected_data";
  axiosMock.onGet('/api/toasters').reply(200, data);

  UsersService.getToasterProfile();

  waitFor(() => {
      const state = store.getState();
      expect(state.SnackbarReducer.message).toBe("");
      expect(state.ProfileReducer.user).toEqual(data);
  });
});


it("Error in GET Toaster", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onGet('/api/toasters').reply(404, "error");

  UsersService.getToasterProfile();

  waitFor(() => {
      const state = store.getState();
      expect(state.SnackbarReducer.severity).toBe("error");
      expect(state.SnackbarReducer.message).toBe("Error al obtener usuario");
      expect(state.ProfileReducer.user).toEqual({});
  });
});


it("POST Toaster working", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/toasters").reply(201, {});

  return UsersService.registerToaster({}).then(() => {
    const state = store.getState();

    expect(state.AuthReducer.loading).toBe(false);
    expect(state.AuthReducer.error).toBe(null);
  });
});


it("Error in POST Toaster", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/toasters").reply(500);

  return UsersService.registerToaster({}).catch(() => {
    const state = store.getState();
    expect(state.AuthReducer.loading).toBe(false);
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe("Error al registrar un tostador. Puede que el nick, nombre o email ya estén en uso.");
  });
});


it("No token found in PUT toaster", () => {
  return UsersService.updateToasterProfile({}).catch(() => {
    assertAuthError();
  });
});