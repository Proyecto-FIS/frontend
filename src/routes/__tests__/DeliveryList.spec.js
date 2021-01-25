import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import DeliveriesReducer from "../../redux/reducers/DeliveriesReducer";
import startLoader from "../../redux/actions/Delivery/load";
import finishLoader from "../../redux/actions/Delivery/done";
import DeliveryList from "../DeliveryList";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("../../services/DeliveryService");

const history = createMemoryHistory();

let store = null;
const renderComponent = () => renderRedux(<Router history={history}><DeliveryList /></Router>, store);

beforeAll(() => {
    history.push = jest.fn();
});

beforeEach(() => {
    store = createReduxStore({ DeliveriesReducer });
});

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});


it("shows skeleton on load", () => {
    renderComponent();

    store.dispatch(startLoader());

    const skeleton = screen.queryAllByLabelText("skeleton");
    expect(skeleton.length).toBe(8);
});

it("shows deliveries", () => {
    renderComponent();

    let deliveries = [{
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
        phoneNumber: "666666999",
        zipCode: "57000",
        email: "johndoe1@deliveries.com",
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
    }, {
        statusType: "PREPARADO",
        createdDate: "29/02/2021 00:00",
        deliveryDate: "29/02/2021 00:00",
        comments: "comments2",
        name: "John2",
        surname: "Doe2",
        address: "Springfield Deliveries, 50",
        city: "Springfield",
        province: "Connecticut",
        country: "EEUU",
        phoneNumber: "666999666",
        zipCode: "67000",
        email: "johndoe2@deliveries.com",
        products: [{
            name: "Product3",
            quantity: "3",
            unitPriceEuros: "1"
        },
        {
            name: "Product4",
            quantity: "4",
            unitPriceEuros: "2"
        }]
    }, {
        statusType: "EN CAMINO",
        createdDate: "30/03/2021 00:00",
        deliveryDate: "30/03/2021 00:00",
        comments: "comments3",
        name: "John3",
        surname: "Doe3",
        address: "Harrisburg Deliveries, 50",
        city: "Harrisburg",
        province: "Pensilvania",
        country: "EEUU",
        phoneNumber: "666000666",
        zipCode: "77000",
        email: "johndoe3@deliveries.com",
        products: [{
            name: "Product5",
            quantity: "5",
            unitPriceEuros: "1"
        },
        {
            name: "Product6",
            quantity: "6",
            unitPriceEuros: "2"
        }]
    }];

    store.dispatch(startLoader());
    store.dispatch(finishLoader(deliveries));

    expect(screen.queryByText("INICIADO")).not.toBeNull();
    expect(screen.queryByText("Entrega estimada: 28/01/2021 00:00")).not.toBeNull();
    expect(screen.queryByText("John1 Doe1")).not.toBeNull();
    expect(screen.queryByText("Michigan Deliveries, 47")).not.toBeNull();
    expect(screen.queryByText("57000, Michigan [EEUU]")).not.toBeNull();
    expect(screen.queryByText("TLF contacto: 666666999")).not.toBeNull();
    expect(screen.queryByText("Product1")).not.toBeNull();
    expect(screen.queryByText("2€ [2 unid.]")).not.toBeNull();
    expect(screen.queryByText("Product2")).not.toBeNull();
    expect(screen.queryByText("6€ [3 unid.]")).not.toBeNull();

    expect(screen.queryByText("PREPARADO")).not.toBeNull();
    expect(screen.queryByText("Entrega estimada: 29/02/2021 00:00")).not.toBeNull();
    expect(screen.queryByText("John2 Doe2")).not.toBeNull();
    expect(screen.queryByText("Springfield Deliveries, 50")).not.toBeNull();
    expect(screen.queryByText("67000, Springfield [EEUU]")).not.toBeNull();
    expect(screen.queryByText("TLF contacto: 666999666")).not.toBeNull();
    expect(screen.queryByText("Product3")).not.toBeNull();
    expect(screen.queryByText("3€ [3 unid.]")).not.toBeNull();
    expect(screen.queryByText("Product4")).not.toBeNull();
    expect(screen.queryByText("8€ [4 unid.]")).not.toBeNull();

    expect(screen.queryByText("EN CAMINO")).not.toBeNull();
    expect(screen.queryByText("Entrega estimada: 30/03/2021 00:00")).not.toBeNull();
    expect(screen.queryByText("John3 Doe3")).not.toBeNull();
    expect(screen.queryByText("Harrisburg Deliveries, 50")).not.toBeNull();
    expect(screen.queryByText("77000, Harrisburg [EEUU]")).not.toBeNull();
    expect(screen.queryByText("TLF contacto: 666000666")).not.toBeNull();
    expect(screen.queryByText("Product5")).not.toBeNull();
    expect(screen.queryByText("5€ [5 unid.]")).not.toBeNull();
    expect(screen.queryByText("Product6")).not.toBeNull();
    expect(screen.queryByText("12€ [6 unid.]")).not.toBeNull();
});
