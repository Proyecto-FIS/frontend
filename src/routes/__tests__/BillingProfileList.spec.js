import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, fireEvent } from "@testing-library/react";
import { createReduxStore, renderRedux } from "../../setupTests";
import LoaderReducer from "../../redux/reducers/LoaderReducer";
import BillingProfileReducer from "../../redux/reducers/BillingProfileReducer";
import startLoader from "../../redux/actions/Loader/startLoader";
import finishLoader from "../../redux/actions/Loader/finishLoader";
import BillingProfileList from "../BillingProfileList";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("../../services/BillingProfileService");

const history = createMemoryHistory();

let store = null;
const renderComponent = () => renderRedux(<Router history={history}><BillingProfileList /></Router>, store);

beforeAll(() => {
    history.push = jest.fn();
});

beforeEach(() => {
    store = createReduxStore({ LoaderReducer, BillingProfileReducer });
});

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});

it("has add profile button", () => {
    renderComponent();
    const addButton = screen.queryByText("Añadir perfil");
    expect(addButton).not.toBeNull();
});

it("fires click on add profile button", () => {
    renderComponent();
    const addButton = screen.queryByText("Añadir perfil");
    fireEvent.click(addButton);
    expect(store.getState().BillingProfileReducer.billingProfile).toBeNull();
    expect(history.push).toHaveBeenCalledWith('/billingprofiles/add');
});

it("shows skeleton on load", () => {
    renderComponent();

    store.dispatch(startLoader());

    const skeleton = screen.queryAllByLabelText("skeleton");
    expect(skeleton.length).toBe(8);
});

it("shows profiles", () => {
    renderComponent();

    let profiles = [];
    const numProfiles = 3;
    for(let i = 0; i < numProfiles; i++) {
        profiles.push({
            name: `name${i}`,
            surname: `surname${i}`,
            address: `address${i}`,
            city: `city${i}`,
            province: `province${i}`,
            country: `country${i}`,
            zipCode: `zipCode${i}`,
            phoneNumber: `phoneNumber${i}`,
            email: `email${i}`
        });
    }

    store.dispatch(startLoader());
    store.dispatch(finishLoader(profiles));

    profiles.forEach((v, i) => {
        expect(screen.queryByText(`name${i} surname${i}`)).not.toBeNull();
        expect(screen.queryByText(`address${i}`)).not.toBeNull();
        expect(screen.queryByText(`[zipCode${i}] city${i}, province${i}, country${i}`)).not.toBeNull();
        expect(screen.queryByText(`phoneNumber${i}`)).not.toBeNull();
        expect(screen.queryByText(`email${i}`)).not.toBeNull();
    });
});
