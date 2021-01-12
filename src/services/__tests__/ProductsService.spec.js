import ProductsService from "../ProductsService";
import axios from "axios";
import AxiosMock from "axios-mock-adapter";
import { waitFor } from "@testing-library/react";
import store from "../../redux/store";
import startLoader from "../../redux/actions/Products/load";
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

it("sample", () => {});

it("GET all products working", () => {
  const axiosMock = new AxiosMock(axios);
  const data = "expected_data";
  axiosMock.onGet("/api/products").reply(200, data);

  ProductsService.requestAllProducts();

  waitFor(() => {
    const state = store.getState();
    expect(state.SnackbarReducer.message).toBe("");
    expect(state.ProductsReducer.productList).toEqual(data);
    expect(state.ProductsReducer.loading).toEqual(false);
  });
});

it("No token found in POST", () => {
  return ProductsService.postProduct({}).catch(() => {
    assertAuthError();
  });
});

it("POST working", () => {
  const axiosMock = new AxiosMock(axios);
  axiosMock.onPost("/api/products").reply(201, {});
  doLogin(store);

  return ProductsService.postProduct({}).then(() => {
    const state = store.getState();
    console.log(state);
    expect(state.SnackbarReducer.severity).toBe("success");
    expect(state.SnackbarReducer.message).toBe(
      "Producto guardado correctamente"
    );

    expect(state.ProductsReducer.newProduct.loading).toBe(false);
    expect(state.ProductsReducer.newProduct.created).toBe(true);
    expect(state.ProductsReducer.newProduct.errors).toBe(null);
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
    expect(state.ProductsReducer.productDetails.deleted).toBe(true);
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
  const data = { data: { Location: "location example" } };
  axiosMock.onPost("/api/uploadImage").reply(200, data);
  doLogin(store);

  return ProductsService.uploadImage({}).then(() => {
    const state = store.getState();
    expect(state.ProductsReducer.newProduct.productImage).toMatch(
      data.data.Location
    );
    expect(state.SnackbarReducer.severity).toBe("success");
    expect(state.SnackbarReducer.message).toBe("Imagen subida correctamente");
  });
});
