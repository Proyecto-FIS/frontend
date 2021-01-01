import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, fireEvent, waitFor } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import BillingProfileForm from "../BillingProfileForm";
import BillingProfileService from "../../services/BillingProfileService";
import setBillingProfile from "../../redux/actions/BillingProfile/setBillingProfile";
import BillingProfileReducer from "../../redux/reducers/BillingProfileReducer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ReactTestUtils from "react-dom/test-utils";

jest.mock("../../services/BillingProfileService");

const history = createMemoryHistory();

let store = null;
const renderComponent = () => renderRedux(<Router history={history}><BillingProfileForm /></Router>, store);

const profileValues = [
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

const profile = {
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
    store = createReduxStore({ BillingProfileReducer });
    BillingProfileService.mockClear();
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

it("add profile", () => {
    renderComponent();

    BillingProfileService.postNewProfile = jest.fn().mockImplementation((profile) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    });

    const fields = screen.getAllByRole("textbox");
    fields.forEach((field, i) => {
        field.value = profileValues[i];
        ReactTestUtils.Simulate.change(field);
        expect(field).toHaveValue(profileValues[i]);
    });

    const addButton = screen.queryByText("Añadir");
    expect(addButton).not.toBeNull();
    fireEvent.click(addButton);
    
    expect(BillingProfileService.postNewProfile).toHaveBeenCalledTimes(1);
    expect(BillingProfileService.postNewProfile).toHaveBeenCalledWith(profile);
});

it("edit profile", () => {
    
    store.dispatch(setBillingProfile(profile));

    renderComponent();

    BillingProfileService.editProfile = jest.fn().mockImplementation((profile) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    });

    expect(screen.queryByText("Editar perfil de entrega")).not.toBeNull();

    const newName = "new awesome name";
    const fields = screen.getAllByRole("textbox");
    fields[0].value = newName;
    ReactTestUtils.Simulate.change(fields[0]);
    expect(fields[0]).toHaveValue(newName);
    
    const editButton = screen.queryByText("Editar");
    expect(editButton).not.toBeNull();
    fireEvent.click(editButton);

    expect(BillingProfileService.editProfile).toHaveBeenCalledTimes(1);
    expect(BillingProfileService.editProfile).toHaveBeenCalledWith({ ...profile, name: newName});
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
