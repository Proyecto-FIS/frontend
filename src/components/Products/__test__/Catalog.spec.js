import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../../setupTests";
import React from "react";
import Catalog from "../Catalog";
import ProductsReducer from "../../../redux/reducers/ProductsReducer";
import AuthReducer from "../../../redux/reducers/AuthReducer";
import CartReducer from "../../../redux/reducers/CartReducer";
import { MemoryRouter } from "react-router-dom";
import loadingProducts from "../../../redux/actions/Products/loadingProducts";
import getAllProducts from "../../../redux/actions/Products/getAllProducts";
import { LOGIN_SUCCESS } from "../../../redux/actions/types";

let store = null;

const renderComponent = () =>
  renderRedux(
    <MemoryRouter>
      <Catalog />
    </MemoryRouter>,
    store
  );

beforeEach(() => {
  store = createReduxStore({ ProductsReducer, CartReducer, AuthReducer });
});

afterEach(cleanup);

it("should render", () => {
  const res = renderComponent();
  expect(res).not.toBeNull();
});

it("shows skeleton on load", () => {
  renderComponent();

  store.dispatch(loadingProducts());

  const skeleton = screen.queryAllByLabelText("skeleton");
  expect(skeleton.length).toBe(1);
});

it("show add product button when toaster logged", () => {
  renderComponent();
  store.dispatch(loadingProducts());
  store.dispatch(getAllProducts([]));
  store.dispatch({ type: LOGIN_SUCCESS, payload: { isCustomer: false } });

  expect(screen.queryAllByLabelText("add-product").length).toBe(1);
  const skeleton = screen.queryAllByLabelText("skeleton");
  expect(skeleton.length).toBe(0);
});

it("Don't show add product button when  no toaster logged", () => {
  renderComponent();
  store.dispatch(loadingProducts());
  store.dispatch(getAllProducts([]));

  expect(screen.queryAllByLabelText("add-product").length).toBe(0);
  const skeleton = screen.queryAllByLabelText("skeleton");
  expect(skeleton.length).toBe(0);
});

it("shows products", () => {
  renderComponent();

  let products = [];
  const numProducts = 3;
  for (let i = 0; i < numProducts; i++) {
    products.push({
      name: `name${i}`,
      imageUrl: `imageUrl${i}`,
      description: `description${i}`,
    });
  }

  store.dispatch(loadingProducts());
  store.dispatch(getAllProducts(products));

  products.forEach((v, i) => {
    expect(screen.queryByText(`name${i}`)).not.toBeNull();
    expect(screen.queryByText(`description${i}`)).not.toBeNull();
  });
});
