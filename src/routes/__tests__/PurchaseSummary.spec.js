import '@testing-library/jest-dom/extend-expect';
import { cleanup } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import { MemoryRouter } from "react-router-dom";
import PurchaseSummary from "../PurchaseSummary";
import BillingProfileReducer from "../../redux/reducers/BillingProfileReducer";
import CartReducer from "../../redux/reducers/CartReducer";

let store = null;
const renderComponent = () => renderRedux(<MemoryRouter><PurchaseSummary /></MemoryRouter>, store);

beforeEach(() => {
    store = createReduxStore({ BillingProfileReducer, CartReducer });
});

afterEach(cleanup);

it("renders correctly", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});
