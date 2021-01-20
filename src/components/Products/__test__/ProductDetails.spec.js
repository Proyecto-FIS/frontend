import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetails from "../ProductDetails";
import { createReduxStore, renderRedux } from "../../../setupTests";
import { Router, Route } from "react-router-dom";
import { LOGIN_SUCCESS } from "../../../redux/actions/types";
import ProductsReducer from "../../../redux/reducers/ProductsReducer";
import AuthReducer from "../../../redux/reducers/AuthReducer";
import CartReducer from "../../../redux/reducers/CartReducer";
import getProduct from "../../../redux/actions/Products/getProduct";
import { createMemoryHistory } from "history";
import ProductsService from "../../../services/ProductsService";

const catalogComponent = () => <h2>Catalog</h2>;
const newProductComponent = () => <h2>NewProduct</h2>;

jest.mock("../../../services/ProductsService");

const history = createMemoryHistory();
const productDetails = { loading: false };
let store = null;

const getProductMock = jest.fn();

let productSample = {
  _id: "id",
  name: "name",
  description: "description more than twenty-five",
  format: [
    { _id: "1", price: 20, name: "250g" },
    { _id: "2", price: 25, name: "300g" },
  ],
  grind: ["Medio", "Grueso"],
  imageUrl: "www.google.com.png",
  providerId: "providerId",
};

const renderComponent = () =>
  renderRedux(
    <Router history={history}>
      <ProductDetails
        getProduct={getProduct}
        product={productSample}
        productsDetails={productDetails}
      />
      <Route exact path="/" component={catalogComponent} />
      <Route exact path="/products/new" component={newProductComponent} />
    </Router>,
    store
  );

beforeEach(() => {
  store = createReduxStore({ ProductsReducer, CartReducer, AuthReducer });
  getProductMock.mockClear();
  ProductsService.mockClear();
});

afterEach(cleanup);

it("should render", () => {
  const res = renderComponent();
  expect(res).not.toBeNull();
});

it("show add to cart button when customer logged", () => {
  renderComponent();
  store.dispatch({ type: LOGIN_SUCCESS, payload: { isCustomer: true } });

  expect(screen.queryAllByLabelText("add-cart").length).toBe(1);
  expect(screen.queryAllByLabelText("edit-product").length).toBe(0);
  expect(screen.queryAllByLabelText("delete-product").length).toBe(0);
});

it("show delete/edit button when toaster owner", () => {
  renderComponent();
  store.dispatch({
    type: LOGIN_SUCCESS,
    payload: { isCustomer: false, _id: "providerId" },
  });

  expect(screen.queryAllByLabelText("edit-product").length).toBe(1);
  expect(screen.queryAllByLabelText("delete-product").length).toBe(1);
  expect(screen.queryAllByLabelText("add-cart").length).toBe(0);
});

it("does NOT show delete/edit button when toaster is NOT owner", () => {
  renderComponent();
  store.dispatch({
    type: LOGIN_SUCCESS,
    payload: { isCustomer: false, _id: "DifferentProviderId" },
  });

  expect(screen.queryAllByLabelText("edit-product").length).toBe(0);
  expect(screen.queryAllByLabelText("delete-product").length).toBe(0);
  expect(screen.queryAllByLabelText("add-cart").length).toBe(0);
});

it("fire delete button", () => {
  renderComponent();
  store.dispatch(getProduct({}));
  store.dispatch({
    type: LOGIN_SUCCESS,
    payload: { isCustomer: false, _id: "providerId" },
  });

  const deleteButton = screen.queryByLabelText("delete-product");
  expect(deleteButton).not.toBeNull();

  fireEvent.click(deleteButton);
  expect(ProductsService.deleteProduct).toHaveBeenCalledTimes(1);
  expect(ProductsService.deleteProduct).toHaveBeenCalledWith(productSample._id);
  expect(screen.queryByText("Catalog")).not.toBeNull();
});

it("fire edit button", async () => {
  renderComponent();
  store.dispatch(getProduct(productSample));
  store.dispatch({
    type: LOGIN_SUCCESS,
    payload: { isCustomer: false, _id: "providerId" },
  });

  const editButton = screen.queryByLabelText("edit-product");
  expect(editButton).not.toBeNull();
  fireEvent.click(editButton);

  expect(screen.queryByText("NewProduct")).not.toBeNull();

  await waitFor(() =>
    expect(
      store.getState().ProductsReducer.productDetails.product
    ).toMatchObject(productSample)
  );
});
