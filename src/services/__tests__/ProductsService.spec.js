import ProductsService from "../ProductsService";
import axios from "axios";
import AxiosMock from "axios-mock-adapter";
import { waitFor } from "@testing-library/react";
import store from "../../redux/store";
import startLoader from "../../redux/actions/Loader/startLoader";
import { doLogin, doLogout } from "../../setupTests";

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

it("GET all products working", () => {
  const axiosMock = new AxiosMock(axios);
  const data = "expected_data";
  axiosMock.onGet("/api/products").reply(200, data);

  ProductsService.requestAllProducts();

  waitFor(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.message).toBe("");
    expect(state.LoaderReducer.elements).toEqual(data);
  });
});

it("No token found in POST", () => {
  return ProductsService.postProduct({}).catch(() => {
    assertAuthError();
    expect(store.getState().LoaderReducer.elements).toEqual(null);
  });
});

it("POST working", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/products").reply(201);
  doLogin(store);

  return ProductsService.postProduct({}).then(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("success");
    expect(state.SnackbarReducer.message).toBe(
      "Producto guardado correctamente"
    );
  });
});

it("Error in POST", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/products").reply(400);
  doLogin(store);

  return ProductsService.postProduct({}).catch(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe(
      "No ha sido posible guardar el producto"
    );
  });
});

it("No token found in PUT", () => {
  return ProductsService.updateProduct({}).catch(() => {
    assertAuthError();
    expect(store.getState().LoaderReducer.elements).toEqual(null);
  });
});

it("PUT working", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPut("/api/products").reply(204);
  doLogin(store);

  return ProductsService.updateProduct({}).then(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("success");
    expect(state.SnackbarReducer.message).toBe(
      "Producto actualizado correctamente"
    );
  });
});

it("Error in PUT", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPut("/api/products").reply(400);
  doLogin(store);

  return ProductsService.updateProduct({}).catch(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe(
      "No ha sido posible actualizar el producto"
    );
  });
});

it("No token found in DELETE", () => {
  return ProductsService.deleteProduct({}).catch(() => {
    assertAuthError();
    expect(store.getState().LoaderReducer.elements).toEqual(null);
  });
});

it("DELETE working", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onDelete("/api/products").reply(200);
  doLogin(store);

  return ProductsService.deleteProduct({}).then(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("success");
    expect(state.SnackbarReducer.message).toBe("Producto borrado con éxito");
  });
});

it("Error in DELETE", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onDelete("/api/products").reply(400);
  doLogin(store);

  return ProductsService.deleteProduct({}).catch(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe(
      "No se ha podido eliminar el producto"
    );
  });
});

it("No token found uploading image", () => {
  return ProductsService.uploadImage({}).catch(() => {
    assertAuthError();
    expect(store.getState().LoaderReducer.elements).toEqual(null);
  });
});

it("Error uploading image", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/uploadImage").reply(400);
  doLogin(store);

  return ProductsService.uploadImage({}).catch(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("error");
    expect(state.SnackbarReducer.message).toBe(
      "No ha sido posible subir la imagen"
    );
  });
});

it("Updloading image succesfully working", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/uploadImage").reply(200);
  doLogin(store);

  return ProductsService.uploadImage({}).then(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.severity).toBe("success");
    expect(state.SnackbarReducer.message).toBe("Imagen subida correctamente");
  });
});
