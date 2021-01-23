import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../../setupTests";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PurchaseSummary from "../../../routes/PurchaseSummary";  // PurchaseForm needs it to work
import BillingProfileReducer from "../../../redux/reducers/BillingProfileReducer";
import CartReducer from "../../../redux/reducers/CartReducer";
import SnackbarReducer from "../../../redux/reducers/SnackbarReducer";
import updateCart from "../../../redux/actions/Cart/updateCart";
import bpLoad from "../../../redux/actions/BillingProfile/done";
import PaymentService from "../../../services/PaymentService";
import SubscriptionService from "../../../services/SubscriptionService";

jest.mock("../../../services/PaymentService");
jest.mock("../../../services/SubscriptionService");

const history = createMemoryHistory();

let store = null;
const renderComponent = () => renderRedux(<Router history={history}><PurchaseSummary /></Router>, store);

const sampleCart = [
    {
        name: "name",
        imageUrl: "imageUrl",
        quantity: 10,
        unitPriceEuros: 5,
    },
    {
        name: "name2",
        imageUrl: "imageUrl",
        quantity: 10,
        unitPriceEuros: 5,
    }
];

const sampleBillingProfiles = [
    {
        name: "someName",
        surname: "someSurname",
        address: "someAddress",
        city: "someCity",
        province: "someProvince",
        country: "someCountry",
        zipCode: 12345,
        phoneNumber: 123456789,
        email: "email@email.com",
    },
    {
        name: "someName2",
        surname: "someSurname2",
        address: "someAddress2",
        city: "someCity2",
        province: "someProvince2",
        country: "someCountry2",
        zipCode: 12345,
        phoneNumber: 123456789,
        email: "email@emai2l.com",
    }
];

beforeAll(() => {
    history.push = jest.fn();
});

beforeEach(() => {
    store = createReduxStore({ BillingProfileReducer, CartReducer, SnackbarReducer });
});

afterEach(cleanup);

it("renders correctly", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});

it("shows cart summary", () => {

    store.dispatch(updateCart(sampleCart));

    renderComponent();

    expect(screen.queryByText("name")).not.toBeNull();
    expect(screen.queryByText("name2")).not.toBeNull();
});

it("selects billing profile", () => {

    const bpText = "someName, someAddress, someCity, someProvince, someCountry";
    const bpText2 = "someName2, someAddress2, someCity2, someProvince2, someCountry2";

    store.dispatch(bpLoad(sampleBillingProfiles));

    renderComponent();

    fireEvent.mouseDown(screen.getAllByRole("button")[0]);
    expect(screen.queryByText(bpText)).not.toBeNull();
    expect(screen.queryByText(bpText2)).not.toBeNull();

    const listBox = within(screen.getAllByRole("listbox")[0]);

    fireEvent.click(listBox.getByText(bpText));

    expect(listBox.queryByText(bpText)).not.toBeNull();
});

it("selects payment type", () => {

    store.dispatch(updateCart(sampleCart));
    store.dispatch(bpLoad(sampleBillingProfiles));

    renderComponent();
    fireEvent.mouseDown(screen.getAllByRole("button")[3]);

    expect(screen.queryByText("Pago normal (100 €)")).not.toBeNull();
    expect(screen.queryByText("Suscripción mensual (100 €/mes)")).not.toBeNull();

    const listBox = within(screen.getAllByRole("listbox")[0]);

    fireEvent.click(listBox.getByText("Pago normal (100 €)"));

    expect(listBox.queryByText("Pago normal (100 €)")).not.toBeNull();
});

it("form errors", () => {

    renderComponent();

    fireEvent.mouseDown(screen.getAllByRole("button")[2]);

    waitFor(() => {
        expect(store.getState().SnackbarReducer.severity).toBe("warning");
        expect(store.getState().SnackbarReducer.message).toBe("El carrito está vacío");
    });

    store.dispatch(updateCart(sampleCart));
    store.dispatch(bpLoad(sampleBillingProfiles));
    fireEvent.mouseDown(screen.getAllByRole("button")[4]);

    waitFor(() => {
        expect(store.getState().SnackbarReducer.severity).toBe("warning");
        expect(store.getState().SnackbarReducer.message).toBe("Hay campos sin rellenar");
    });

    fireEvent.mouseDown(screen.getAllByRole("button")[2]);
    let listBox = within(screen.getAllByRole("listbox")[0]);
    fireEvent.click(listBox.getByText("someName, someAddress, someCity, someProvince, someCountry"));

    fireEvent.mouseDown(screen.getAllByRole("button")[4]);

    waitFor(() => {
        expect(store.getState().SnackbarReducer.severity).toBe("warning");
        expect(store.getState().SnackbarReducer.message).toBe("Hay campos sin rellenar");
    });

    fireEvent.mouseDown(screen.getAllByRole("button")[3]);
    listBox = within(screen.getAllByRole("listbox")[0]);
    fireEvent.click(listBox.getByText("Pago normal (100 €)"));

    fireEvent.mouseDown(screen.getAllByRole("button")[4]);

    waitFor(() => {
        expect(store.getState().SnackbarReducer.severity).toBe("error");
        expect(store.getState().SnackbarReducer.message).toBe("La información de la tarjeta no es válida");
    });
});
