import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, render, fireEvent, waitFor } from "@testing-library/react";
import BillingProfile from "../BillingProfile";
import BillingProfileService from "../../../services/BillingProfileService";

jest.mock("../../../services/BillingProfileService");

const history = { push: jest.fn() };
const profile = {
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
const setBillingProfile = jest.fn();
const renderComponent = () => render(<BillingProfile.WrappedComponent history={history} profile={profile} setBillingProfile={setBillingProfile} />);

beforeEach(() => {
    setBillingProfile.mockClear();
    history.push.mockClear();
    BillingProfileService.mockClear();
});

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});

it("should have profile fields", () => {
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
    expect(setBillingProfile).toHaveBeenCalledTimes(1);
    expect(setBillingProfile).toHaveBeenCalledWith(profile);
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith("/billingprofiles/add");
});

it("fire delete button", async () => {
    renderComponent();

    BillingProfileService.deleteProfile = jest.fn().mockImplementation((profile) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    });

    const deleteButton = screen.queryByLabelText("Borrar");
    expect(deleteButton).not.toBeNull();

    fireEvent.click(deleteButton);
    expect(BillingProfileService.deleteProfile).toHaveBeenCalledTimes(1);
    expect(BillingProfileService.deleteProfile).toHaveBeenCalledWith(profile);
    await waitFor(() => expect(BillingProfileService.requestProfiles).toHaveBeenCalledTimes(1));
});
