import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, fireEvent } from "@testing-library/react";
import ReactTestUtils from "react-dom/test-utils";
import NewProduct from "../NewProduct/NewProduct";
import { createReduxStore, renderRedux } from "../../../setupTests";
import { Router, Route, MemoryRouter } from "react-router-dom";
import { LOGIN_SUCCESS } from "../../../redux/actions/types";
import ProductsReducer from "../../../redux/reducers/ProductsReducer";
import AuthReducer from "../../../redux/reducers/AuthReducer";
import CartReducer from "../../../redux/reducers/CartReducer";
import getProduct from "../../../redux/actions/Products/getProduct";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import ProductsService from "../../../services/ProductsService";
jest.mock("../../../services/ProductsService");

const history = createMemoryHistory();
const productDetails = {};
let productValues = [
  ["Nombre", "Nombre cafe"],
  ["Descripción", "looooooong enough description"],
  ["Tipos de molido", "Grueso"],
  ["Formato", "1kg"],
  ["Price", "13.00"],
];

let store = null;
const renderComponent = () =>
  renderRedux(
    <MemoryRouter>
      <NewProduct productDetails={productDetails} />
    </MemoryRouter>,
    store
  );

beforeEach(() => {
  store = createReduxStore({ ProductsReducer, AuthReducer });
});

afterEach(cleanup);

it("should render", () => {
  const res = renderComponent();
  expect(res).not.toBeNull();
});

it("should render fields ", () => {
  renderComponent();

  screen.getAllByRole("textbox").forEach((e, i) => {
    expect(e.placeholder).toMatch(productValues[i][0]);
  });

  expect(
    screen.getByRole("button", {
      name: /upload image/i,
    })
  ).not.toBeNull();
});

it("add product", () => {
  renderComponent();

  ProductsService.postNewProfile = jest.fn().mockImplementation((profile) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  });

  screen.getAllByRole("textbox").forEach((field, i) => {
    field.value = productValues[i][1];
    ReactTestUtils.Simulate.change(field);
    expect(field.value).toMatch(productValues[i][1]);
  });

  screen.debug(screen.getAllByRole("textbox"));
});
