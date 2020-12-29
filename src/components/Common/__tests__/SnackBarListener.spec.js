import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from "@testing-library/react";
import SnackBarListener from "../SnackBarListener";
import SnackbarReducer from "../../../redux/reducers/SnackbarReducer";
import { renderRedux, createReduxStore } from "../../../setupTests";

let store = null;

beforeEach(() => {
    store = createReduxStore({ SnackbarReducer });
});

afterEach(cleanup);

it("should render", () => {
    const res = renderRedux(<SnackBarListener />, store);
    expect(res).not.toBeNull();
});
