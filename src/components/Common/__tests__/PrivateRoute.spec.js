import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from "@testing-library/react";
import AuthReducer from "../../../redux/reducers/AuthReducer";
import { renderRedux, createReduxStore } from "../../../setupTests";
import { Router, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import { doLogin } from "../../../setupTests";
import { createMemoryHistory } from "history";

const loggedComponent = () => <h2>Logged</h2>;
const notLoggedComponent = () => <h2>Not logged</h2>;
const history = createMemoryHistory();

let store = null;
const renderComponent = () =>
    renderRedux(
        <Router history={history}>
            <PrivateRoute exact path="/protected" component={loggedComponent} />
            <Route exact path="/" component={notLoggedComponent} />
        </Router>, store);

beforeEach(() => {
    store = createReduxStore({ AuthReducer });
});

afterEach(() => {
    cleanup();
});

it("renders component if authenticated", () => {
    renderComponent();
    doLogin(store);
    history.push("/protected");

    expect(screen.queryByText("Logged")).not.toBeNull();
});

it("redirects if not authenticated", () => {
    renderComponent();
    history.push("/protected");

    expect(screen.queryByText("Not logged")).not.toBeNull();
});
