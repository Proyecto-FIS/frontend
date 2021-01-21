import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, fireEvent } from "@testing-library/react";
import NewProduct from "../NewProduct";
import { createReduxStore, renderRedux } from "../../../../setupTests";
import { Router, Route, MemoryRouter } from "react-router-dom";
import { LOGIN_SUCCESS } from "../../../../redux/actions/types";
import ProductsReducer from "../../../../redux/reducers/ProductsReducer";
import AuthReducer from "../../../../redux/reducers/AuthReducer";
import CartReducer from "../../../../redux/reducers/CartReducer";
import getProduct from "../../../../redux/actions/Products/getProduct";
import { createMemoryHistory } from "history";
import ProductsService from "../../../../services/ProductsService";

const history = createMemoryHistory();
const productDetails = {};

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

it("should render one ", () => {
  renderComponent();
  expect(
    screen.queryByRole("textbox", { name: /tipos de molido/i })
  ).not.toBeNull();
  // expect(screen.getByText("name")).not.toBeNull();
  expect(screen.getByText("Nombre")).not.toBeNull();
  // expect(screen.queryByRole("textbox", { name: /formato/i })).not.toBeNull();
  // expect(screen.queryByRole("textbox", { name: /price/i })).not.toBeNull();
  expect(screen.queryAllByRole("textbox").length).toBe(5);
});

it("should render two ", () => {
  renderComponent();
  // const createButton = screen.getByText(/crear/i);
  // expect(createButton).not.toBeNull();

  const imageButton = screen.getByRole("button", {
    name: /upload image/i,
  });
  expect(imageButton).not.toBeNull();
});

// it("has csubmit buttons", () => {
//   renderComponent();

//   const submitButton = screen.queryByText("Descripción");
//   expect(submitButton).not.toBeNull();
// });

// it("has all form fields", () => {
//   renderComponent();

//   screen.debug();

//   const fields = [
//     "Formato",
//     "Precio formato",
//     "Imagen",
//     "Tipos de molido",
//     "Formato",
//   ];
//   fields.forEach((field, i) => {
//     console.log(field);
//     expect(screen.queryAllByText(field).length).toBe(1);
//   });
//});
