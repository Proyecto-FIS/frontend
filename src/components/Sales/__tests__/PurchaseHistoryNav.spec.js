import '@testing-library/jest-dom/extend-expect';
import { cleanup, screen, render, fireEvent, waitFor } from "@testing-library/react";
import PurchaseHistoryNav from "../PurchaseHistoryNav";
import PurchaseHistoryService from "../../../services/PurchaseHistoryService";

jest.mock("../../../services/PurchaseHistoryService");

beforeEach(() => {
    PurchaseHistoryService.getHistory = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => { resolve(); });
    });
});

afterEach(cleanup);

it("should render", () => {
    const res = render(<PurchaseHistoryNav loaded={false} isEmpty={true} pageSize={4} beforeTimestamp={new Date()} />);
    expect(res).not.toBeNull();
});

it("has page number and buttons", () => {
    render(<PurchaseHistoryNav loaded={false} isEmpty={true} pageSize={4} beforeTimestamp={new Date()} />);

    expect(screen.queryByText("Página 1")).not.toBeNull();
    expect(screen.queryByLabelText("prevPage")).not.toBeNull();
    expect(screen.queryByLabelText("nextPage")).not.toBeNull();
});

it("can't hit buttons when not loaded", async () => {
    render(<PurchaseHistoryNav loaded={false} isEmpty={true} pageSize={4} beforeTimestamp={new Date()} />);

    const prevPageButton = screen.getByLabelText("prevPage");
    const nextPageButton = screen.getByLabelText("nextPage");

    expect(prevPageButton).toHaveAttribute("disabled");
    expect(nextPageButton).toHaveAttribute("disabled");
});

it("move forward & back", async () => {
    render(<PurchaseHistoryNav loaded={true} isEmpty={false} pageSize={4} beforeTimestamp={new Date()} />);

    const prevPageButton = screen.getByLabelText("prevPage");
    const nextPageButton = screen.getByLabelText("nextPage");

    fireEvent.click(nextPageButton);
    await waitFor(() => expect(screen.queryByText("Página 2")).not.toBeNull());

    fireEvent.click(nextPageButton);
    await waitFor(() => expect(screen.queryByText("Página 3")).not.toBeNull());

    fireEvent.click(prevPageButton);
    await waitFor(() => expect(screen.queryByText("Página 2")).not.toBeNull());

    fireEvent.click(prevPageButton);
    await waitFor(() => expect(screen.queryByText("Página 1")).not.toBeNull());

    expect(prevPageButton).toHaveAttribute("disabled");
});

it("can't move forward if list is empty", async () => {
    render(<PurchaseHistoryNav loaded={true} isEmpty={true} pageSize={4} beforeTimestamp={new Date()} />);

    const nextPageButton = screen.getByLabelText("nextPage");
    expect(nextPageButton).toHaveAttribute("disabled");
});
