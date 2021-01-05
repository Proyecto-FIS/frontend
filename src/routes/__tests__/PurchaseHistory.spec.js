import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import LoaderReducer from "../../redux/reducers/LoaderReducer";
import startLoader from "../../redux/actions/Loader/startLoader";
import finishLoader from "../../redux/actions/Loader/finishLoader";
import PurchaseHistory from "../PurchaseHistory";
import { MemoryRouter } from "react-router-dom";

let store = null;
const renderComponent = () => renderRedux(<MemoryRouter><PurchaseHistory /></MemoryRouter>, store);

beforeEach(() => {
    store = createReduxStore({ LoaderReducer });
});

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});

it("shows skeleton", () => {
    renderComponent();

    store.dispatch(startLoader());

    const skeleton = screen.queryAllByLabelText("skeleton");
    expect(skeleton).not.toBeNull();
    expect(skeleton.length).toBe(4);
});

it("renders with no purchases", () => {
    renderComponent();

    store.dispatch(startLoader());
    store.dispatch(finishLoader());

    expect(screen.queryAllByLabelText("skeleton").length).toBe(0);
    expect(screen.queryAllByLabelText("purchase").length).toBe(0);
});

it("shows purchases", () => {

    const sampleData = [
        {
            userID: "userID",
            operationType: "payment",
            products: [
                {
                    _id: "1",
                    quantity: "20",
                    unitPriceEuros: "30",
                },
                {
                    _id: "2",
                    quantity: "20",
                    unitPriceEuros: "30",
                }
            ]
        }
    ];

    renderComponent();

    store.dispatch(startLoader());
    store.dispatch(finishLoader(sampleData));

    expect(screen.queryAllByLabelText("skeleton").length).toBe(0);
    expect(screen.queryAllByLabelText("purchase").length).toBe(1);
    expect(screen.queryAllByLabelText("purchaseProduct").length).toBe(2);
});
