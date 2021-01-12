import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, render } from "@testing-library/react";
import Delivery from "../Delivery";
import DeliveryService from "../../../services/DeliveryService";

jest.mock("../../../services/DeliveryService");

const history = { push: jest.fn() };
const delivery = {
    name: "name",
    surname: "surname",
    address: "address",
    city: "city",
    province: "province",
    country: "country",
    phoneNumber: "phoneNumber",
    zipCode: "zipCode",
    email: "email",
    comments: "comments",
    statusType: "statusType",
    createDate: "12/01/2021",
    deliveryDate: "14/01/2021"
};
const setDelivery = jest.fn();
const renderComponent = () => render(<Delivery.WrappedComponent history={history} delivery={delivery} setDelivery={setDelivery} />);

beforeEach(() => {
    setDelivery.mockClear();
    history.push.mockClear();
    DeliveryService.mockClear();
});

afterEach(cleanup);

it("should render", () => {
    const res = renderComponent();
    expect(res).not.toBeNull();
});

it("should have delivery fields", () => {
    renderComponent();
    expect(screen.queryByText("name surname")).not.toBeNull();
    expect(screen.queryByText("address")).not.toBeNull();
    expect(screen.queryByText("[zipCode] city, province, country")).not.toBeNull();
    expect(screen.queryByText("phoneNumber")).not.toBeNull();
    expect(screen.queryByText("comments")).not.toBeNull();
    expect(screen.queryByText("statusType")).not.toBeNull();
    expect(screen.queryByText("createdDate")).not.toBeNull();
    expect(screen.queryByText("deliveryDate")).not.toBeNull();
});
