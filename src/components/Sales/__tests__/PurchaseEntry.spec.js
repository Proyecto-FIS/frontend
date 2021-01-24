import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, render } from "@testing-library/react";
import PurchaseEntry from "../PurchaseEntry";
import { MemoryRouter } from "react-router-dom";

const sampleData = {
    userID: "userID",
    operationType: "payment",
    products: [
        {
            _id: "1",
            quantity: "20",
            unitPriceEuros: "10",
            name: "product1",
            imageUrl: "image1"
        },
        {
            _id: "2",
            quantity: "30",
            unitPriceEuros: "40",
            name: "product2",
            imageUrl: "image2"
        }
    ]
};

const renderComponent = (data) => render(<MemoryRouter><PurchaseEntry purchase={data} /></MemoryRouter>);

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent(sampleData);
    expect(res).not.toBeNull();
});

it("renders complete payment", () => {
    renderComponent(sampleData);

    expect(screen.queryByText("Tipo de operación: Pago")).not.toBeNull();
    expect(screen.queryAllByLabelText("purchaseProduct").length).toBe(2);
    expect(screen.queryByText("Nombre del producto: product1")).not.toBeNull();
    expect(screen.queryByText("Nombre del producto: product2")).not.toBeNull();
    expect(screen.queryByText("Precio: 20x10 € = 200 €")).not.toBeNull();
    expect(screen.queryByText("Precio: 30x40 € = 1200 €")).not.toBeNull();
    expect(screen.queryAllByText("Referencia:").length).toBe(2);
    expect(screen.queryByText("1")).not.toBeNull();
    expect(screen.queryByText("2")).not.toBeNull();
    expect(screen.queryByText("Lista de productos (2)")).not.toBeNull();
    expect(screen.queryByAltText("product1")).not.toBeNull();
    expect(screen.queryByAltText("product2")).not.toBeNull();

    expect(screen.queryByLabelText("Borrar")).toBeNull();
});

it("renders subscriptions", () => {
    const subscriptionData = { ...sampleData };
    subscriptionData.operationType = "subscription";
    renderComponent(subscriptionData);

    expect(screen.queryByText("Tipo de operación: Suscripción")).not.toBeNull();

    expect(screen.queryByLabelText("Borrar")).not.toBeNull();
});
