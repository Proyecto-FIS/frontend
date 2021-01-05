import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, render, fireEvent, waitFor } from "@testing-library/react";
import Subscription from "../Subscription";
import SubscriptionService from "../../../services/SubscriptionService";

jest.mock("../../../services/SubscriptionService");

const history = { push: jest.fn() };
const subscription = {
    name: "name",
    surname: "surname",
    address: "address",
    city: "city",
    province: "province",
    country: "country",
    phoneNumber: "phoneNumber",
    zipCode: "zipCode",
    email: "email"
};
const setSubscription = jest.fn();
const renderComponent = () => render(<Subscription.WrappedComponent history={history} subscription={subscription} setSubscription={setSubscription} />);

beforeEach(() => {
    setSubscription.mockClear();
    history.push.mockClear();
    SubscriptionService.mockClear();
});

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});

it("should have subscription fields", () => {
    renderComponent();
    expect(screen.queryByText("name surname")).not.toBeNull();
    expect(screen.queryByText("address")).not.toBeNull();
    expect(screen.queryByText("[zipCode] city, province, country")).not.toBeNull();
    expect(screen.queryByText("phoneNumber")).not.toBeNull();
    expect(screen.queryByText("email")).not.toBeNull();
    expect(screen.queryByLabelText("Editar")).not.toBeNull();
});

it("fire edit button", () => {
    renderComponent();

    const editButton = screen.queryByLabelText("Editar");
    expect(editButton).not.toBeNull();

    fireEvent.click(editButton);
    expect(setSubscription).toHaveBeenCalledTimes(1);
    expect(setSubscription).toHaveBeenCalledWith(subscription);
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith("/subscriptions/add");
});

it("fire delete button", async () => {
    renderComponent();

    SubscriptionService.deleteSubscription = jest.fn().mockImplementation((subscription) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    });

    const deleteButton = screen.queryByLabelText("Borrar");
    expect(deleteButton).not.toBeNull();

    fireEvent.click(deleteButton);
    expect(SubscriptionService.deleteSubscription).toHaveBeenCalledTimes(1);
    expect(SubscriptionService.deleteSubscription).toHaveBeenCalledWith(subscription);
    await waitFor(() => expect(SubscriptionService.requestSubscriptions).toHaveBeenCalledTimes(1));
});
