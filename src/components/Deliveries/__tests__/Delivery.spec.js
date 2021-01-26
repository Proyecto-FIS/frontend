import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Delivery from "../Delivery";
import DeliveryService from "../../../services/DeliveryService";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../services/DeliveryService");

const history = { push: jest.fn() };
const delivery = {
  statusType: "INICIADO",
  createdDate: "28/02/2021 00:00",
  deliveryDate: "28/02/2021 00:00",
  comments: "comments",
  name: "John",
  surname: "Doe",
  address: "Michigan Deliveries, 47",
  city: "Michigan",
  province: "Texas",
  country: "EEUU",
  phoneNumber: "666666999",
  zipCode: "57000",
  email: "johndoe@deliveries.com",
  products: [{
    name: "Product1",
    quantity: "2",
    unitPriceEuros: "1"
  },
  {
    name: "Product2",
    quantity: "3",
    unitPriceEuros: "2"
  }]
};

const setDelivery = jest.fn();
const renderComponent = () =>
  render(
    <MemoryRouter>
      <Delivery.WrappedComponent
        history={history}
        delivery={delivery}
        setDelivery={setDelivery}
      />
    </MemoryRouter>
  );

beforeEach(() => {
  setDelivery.mockClear();
  history.push.mockClear();
  DeliveryService.mockClear();
});

afterEach(cleanup);

it("should render", () => {
  const res = renderComponent();
  expect(res).not.toBeNull();
});

it("should have delivery fields", () => {
  renderComponent();
  
  expect(screen.queryByText("INICIADO")).not.toBeNull();
  expect(screen.queryByText("Entrega estimada: 28/02/2021 00:00")).not.toBeNull();
  expect(screen.queryByText("John Doe")).not.toBeNull();
  expect(screen.queryByText("Michigan Deliveries, 47")).not.toBeNull();
  expect(screen.queryByText("57000, Michigan [EEUU]")).not.toBeNull();
  expect(screen.queryByText("TLF contacto: 666666999")).not.toBeNull();
  expect(screen.queryByText("Product1")).not.toBeNull();
  expect(screen.queryByText("2€ [2 unid.]")).not.toBeNull();
  expect(screen.queryByText("Product2")).not.toBeNull();
  expect(screen.queryByText("6€ [3 unid.]")).not.toBeNull();

  expect(screen.queryByLabelText("Editar")).not.toBeNull();
  expect(screen.queryByLabelText("Borrar")).not.toBeNull();
});

it("fire edit button", () => {
  renderComponent();

  const editButton = screen.queryByLabelText("Editar");
  expect(editButton).not.toBeNull();

  fireEvent.click(editButton);
  expect(setDelivery).toHaveBeenCalledTimes(1);
  expect(setDelivery).toHaveBeenCalledWith(delivery);
  expect(history.push).toHaveBeenCalledTimes(1);
  expect(history.push).toHaveBeenCalledWith("/deliveries/add");
});

it("fire delete button", async () => {
  renderComponent();

  DeliveryService.deleteDelivery = jest
    .fn()
    .mockImplementation((delivery) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });

  const deleteButton = screen.queryByLabelText("Borrar");
  expect(deleteButton).not.toBeNull();

  fireEvent.click(deleteButton);
  expect(DeliveryService.deleteDelivery).toHaveBeenCalledTimes(1);
  expect(DeliveryService.deleteDelivery).toHaveBeenCalledWith(delivery);
  await waitFor(() =>
    expect(DeliveryService.requestDeliveries).toHaveBeenCalledTimes(1)
  );
});
