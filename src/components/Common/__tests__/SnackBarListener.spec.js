import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen } from "@testing-library/react";
import SnackBarListener from "../SnackBarListener";
import SnackbarReducer from "../../../redux/reducers/SnackbarReducer";
import startSnackBar from "../../../redux/actions/SnackBar/startSnackBar";
import { renderRedux, createReduxStore } from "../../../setupTests";
import { act } from "react-dom/test-utils";

let store = null;

beforeEach(() => {
    store = createReduxStore({ SnackbarReducer });
    jest.useFakeTimers();
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
});

it("should render", () => {
    const res = renderRedux(<SnackBarListener />, store);
    expect(res).not.toBeNull();
});

it("shows message", () => {
    const res = renderRedux(<SnackBarListener />, store);
    expect(res).not.toBeNull();

    store.dispatch(startSnackBar("success", "Sample message"));

    const alert = screen.queryByText("Sample message");
    expect(alert).not.toBeNull();
});

it("hides after 5 seconds", () => {

    renderRedux(<SnackBarListener />, store);
    store.dispatch(startSnackBar("success", "Sample message"));

    let alert = screen.queryByText("Sample message");
    expect(alert).not.toBeNull();

    act(() => jest.advanceTimersByTime(5000));

    alert = screen.queryByText("Sample message");
    expect(alert).toBeNull();

    expect(store.getState().SnackbarReducer.message).toBe("");
});
