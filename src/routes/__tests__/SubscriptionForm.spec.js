import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, fireEvent } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import SubscriptionForm from "../SubscriptionForm";
import SubscriptionService from "../../services/SubscriptionService";
import setSubscription from "../../redux/actions/Payment/setSubscription";
import SubscriptionReducer from "../../redux/reducers/SubscriptionReducer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ReactTestUtils from "react-dom/test-utils";

jest.mock("../../services/SubscriptionService");

const history = createMemoryHistory();

let store = null;
const renderComponent = () => renderRedux(<Router history={history}><SubscriptionForm /></Router>, store);

const subscriptionValues = [
    "name",
    "surname",
    "address",
    "city",
    "province",
    "country",
    "11111",
    "123",
    "a@a.com"
];

const subscription = {
    name: "name",
    surname: "surname",
    address: "address",
    city: "city",
    province: "province",
    country: "country",
    phoneNumber: "123",
    zipCode: "11111",
    email: "a@a.com"
}

beforeEach(() => {
    store = createReduxStore({ SubscriptionReducer });
    SubscriptionService.mockClear();
});

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});

it("has clear and submit buttons", () => {
    renderComponent();

    const clearButton = screen.queryByText("Limpiar");
    expect(clearButton).not.toBeNull();

    const submitButton = screen.queryByText("Añadir");
    expect(submitButton).not.toBeNull();
});

it("has all form fields", () => {
    renderComponent();

    const fields = ["Nombre", "Apellidos", "Dirección", "Ciudad", "Provincia", "País", "Código postal",
                    "Número de teléfono", "Correo electrónico"];
    fields.forEach((field, i) => expect(screen.queryAllByText(field).length).toBe(2));
});

it("clears form", () => {
    renderComponent();

    const fields = screen.getAllByRole("textbox");
    fields.forEach((field, i) => {
        field.value = `text${i}`;
        ReactTestUtils.Simulate.change(field);
        expect(field).toHaveValue(`text${i}`);
    });

    fireEvent.click(screen.queryByText("Limpiar"));
    screen.getAllByRole("textbox").forEach((field, i) => expect(field).toHaveValue(""));
});

it("add subscription", () => {
    renderComponent();

    SubscriptionService.postNewSubscription = jest.fn().mockImplementation((subscription) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    });

    const fields = screen.getAllByRole("textbox");
    fields.forEach((field, i) => {
        field.value = subscriptionValues[i];
        ReactTestUtils.Simulate.change(field);
        expect(field).toHaveValue(subscriptionValues[i]);
    });

    const addButton = screen.queryByText("Añadir");
    expect(addButton).not.toBeNull();
    fireEvent.click(addButton);
    
    expect(SubscriptionService.postNewSubscription).toHaveBeenCalledTimes(1);
    expect(SubscriptionService.postNewSubscription).toHaveBeenCalledWith(subscription);
});

it("edit subscription", () => {
    
    store.dispatch(setSubscription(subscription));

    renderComponent();

    SubscriptionService.editSubscription = jest.fn().mockImplementation((subscription) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    });

    expect(screen.queryByText("Editar subscripcion de entrega")).not.toBeNull();

    const newName = "new awesome name";
    const fields = screen.getAllByRole("textbox");
    fields[0].value = newName;
    ReactTestUtils.Simulate.change(fields[0]);
    expect(fields[0]).toHaveValue(newName);
    
    const editButton = screen.queryByText("Editar");
    expect(editButton).not.toBeNull();
    fireEvent.click(editButton);

    expect(SubscriptionService.editSubscription).toHaveBeenCalledTimes(1);
    expect(SubscriptionService.editSubscription).toHaveBeenCalledWith({ ...subscription, name: newName});
});

it("should show validation errors", () => {
    renderComponent();

    const errorText = "El valor no cumple el formato solicitado";
    expect(screen.queryByText(errorText)).toBeNull();

    const wrongEmail = "wrongEmail";
    const fields = screen.getAllByRole("textbox");
    const emailField = fields[8];
    emailField.value = wrongEmail;
    ReactTestUtils.Simulate.change(emailField);
    expect(emailField).toHaveValue(wrongEmail);

    expect(screen.queryByText(errorText)).not.toBeNull();
});
