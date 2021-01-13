import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, render } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import ProductsReducer from "../../redux/reducers/ProductsReducer";
import AuthReducer from "../../redux/reducers/AuthReducer";
import CartReducer from "../../redux/reducers/CartReducer";
import getProduct from "../../redux/actions/Products/getProduct";
import loadingProduct from "../../redux/actions/Products/loadingProduct";
import ProductsService from "../../services/ProductsService";
import Product from "../Product";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../services/ProductsService");

let store = null;
const mock_id = { params: { productId: "test_id" } };

const renderComponent = () =>
  renderRedux(
    <MemoryRouter>
      <Product match={mock_id} />
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

  store.dispatch(loadingProduct());

  const skeleton = screen.queryAllByLabelText("skeleton");
  expect(skeleton.length).toBe(1);
  expect(screen.queryByText(`testname`)).toBeNull();
});

it("show product not skeleton", () => {
  renderComponent();

  const product = {
    name: "testname",
    description: "enough description for coffee of mercadona",
    stock: 3,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons.jpg",
    grind: ["Expresso", "Grano"],
    format: [
      {
        name: "250g",
        price: 25,
      },
    ],
  };

  store.dispatch(getProduct(product));

  expect(screen.queryByText(`testname`)).not.toBeNull();
  expect(
    screen.queryByText(`enough description for coffee of mercadona`)
  ).not.toBeNull();

  const skeleton = screen.queryAllByLabelText("skeleton");
  expect(skeleton.length).toBe(0);
});
