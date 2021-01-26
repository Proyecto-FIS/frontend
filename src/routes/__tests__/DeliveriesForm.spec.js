import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, fireEvent } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import DeliveryForm from "../DeliveryForm";
import DeliveryService from "../../services/DeliveryService";
import setDelivery from "../../redux/actions/Delivery/setDelivery";
import DeliveriesReducer from "../../redux/reducers/DeliveriesReducer";
import AuthReducer from "../../redux/reducers/AuthReducer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ReactTestUtils from "react-dom/test-utils";

jest.mock("../../services/DeliveryService");

const history = createMemoryHistory();

let store = null;
const renderComponent = () =>
  renderRedux(
    <Router history={history}>
      <DeliveryForm />
    </Router>,
    store
  );

const delivery = {
  statusType: "INICIADO",
  createdDate: "28/01/2021 00:00",
  deliveryDate: "28/01/2021 00:00",
  comments: "comments1",
  name: "John1",
  surname: "Doe1",
  address: "Michigan Deliveries, 47",
  city: "Michigan",
  province: "Texas",
  country: "EEUU",
  phoneNumber: "666999000",
  zipCode: "57000",
  email: "johndoe1@deliveries.com"
};

const updatedDelivery = {
  statusType: "PREPARADO",
  createdDate: "28/01/2021 00:00",
  deliveryDate: "28/01/2021 00:00",
  comments: "comments2",
  name: "John1",
  surname: "Doe1",
  address: "Springfield Deliveries, 50",
  city: "Springfield",
  province: "Connecticut",
  country: "EEUU",
  phoneNumber: "900",
  zipCode: "67000",
  email: "johndoe1@deliveries.com"
};

beforeEach(() => {
  store = createReduxStore({ DeliveriesReducer, AuthReducer });
  DeliveryService.mockClear();
});

afterEach(cleanup);

it("should render", () => {
  const res = renderComponent();
  expect(res).not.toBeNull();
});

it("has submit button", () => {
  renderComponent();

  const submitButton = screen.queryByText("CONFIRMAR");
  expect(submitButton).not.toBeNull();
});

it("has all form fields", () => {
  renderComponent();

  const fields1 = [
    "Nombre",
    "Apellidos",
    "Dirección",
    "Ciudad",
    "Provincia",
    "País",
    "Código postal",
    "Número de teléfono",
    "Correo electrónico"
  ];

  const fields2 = [
    "ESTADO",
    "Fecha de inicio",
    "Fecha de entrega estimada",
    "Comentarios"
  ];


  fields1.forEach((field, i) =>
    expect(screen.queryAllByText(field).length).toBe(2)
  );

  fields2.forEach((field, i) =>
    expect(screen.queryAllByText(field).length).toBe(1)
  );
});


it("edit delivery", () => {
  store.dispatch(setDelivery(delivery));

  renderComponent();

  DeliveryService.editDelivery = jest
    .fn()
    .mockImplementation((delivery) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });

  expect(screen.queryByText("MODIFICAR")).not.toBeNull();

  const fields = screen.getAllByRole("textbox");

  fields[9].value = updatedDelivery.statusType;
  ReactTestUtils.Simulate.change(fields[9]);
  expect(fields[9]).toHaveValue(updatedDelivery.statusType);

  const editButton = screen.queryByText("MODIFICAR");
  expect(editButton).not.toBeNull();
  fireEvent.click(editButton);

  expect(DeliveryService.editDelivery).toHaveBeenCalledTimes(1);
  expect(DeliveryService.editDelivery).toHaveBeenCalledWith({
    ...delivery,
    statusType: updatedDelivery.statusType
  });
});

it("should show validation errors", () => {
  renderComponent();

  const errorText = "El valor no cumple el formato solicitado";
  expect(screen.queryByText(errorText)).toBeNull();

  const fields= screen.getAllByRole("textbox");

  fields[6].value = updatedDelivery.phoneNumber;
  ReactTestUtils.Simulate.change(fields[6]);
  expect(fields[6]).toHaveValue(updatedDelivery.phoneNumber);

  expect(screen.queryByText(errorText)).not.toBeNull();
});
