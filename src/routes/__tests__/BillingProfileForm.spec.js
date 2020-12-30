import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, fireEvent } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import BillingProfileForm from "../BillingProfileForm";
import BillingProfileService from "../../services/BillingProfileService";
import BillingProfileReducer from "../../redux/reducers/BillingProfileReducer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("../../services/BillingProfileService");

const history = createMemoryHistory();

let store = null;
const renderComponent = () => renderRedux(<Router history={history}><BillingProfileForm /></Router>, store);

beforeAll(() => {
    history.push = jest.fn();
});

beforeEach(() => {
    store = createReduxStore({ BillingProfileReducer });
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

});

it("shows validation errors", () => {

});

it("edit profile", () => {

});

it("add profile", () => {

});
