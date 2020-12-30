import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, screen } from "@testing-library/react";
import MainGrid from "../MainGrid";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("empty render", () => {
    render(<MainGrid />);
});

it("with internal content", () => {
    render(
        <MainGrid>
            <div>Hello!</div>
        </MainGrid>
    );

    const elem = screen.getByText("Hello!");
    expect(elem).toBeInTheDocument();
});

it("matches snapshot", () => {
    const tree = renderer
        .create(<MainGrid attr="value"><h1>Hello!</h1></MainGrid>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
