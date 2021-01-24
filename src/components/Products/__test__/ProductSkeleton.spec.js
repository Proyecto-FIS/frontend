import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ProductSkeleton from "../ProductSkeleton";

const renderComponent = () => render(<ProductSkeleton />);

it("should render", () => {
  const res = renderComponent();
  expect(res).not.toBeNull();
});
