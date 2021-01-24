import { Switch } from "@material-ui/core";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Route } from "react-router-dom";
import AddProduct from "../AddProduct";

const renderComponent = () =>
  render(
    <Switch>
      <Route>
        <AddProduct />
      </Route>
    </Switch>
  );

it("should render", () => {
  const res = renderComponent();
  expect(res).not.toBeNull();
});
