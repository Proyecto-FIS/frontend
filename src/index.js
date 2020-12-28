import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Products from "./routes/Products";
import Product from "./routes/Product";
import CreateProduct from "./routes/CreateProduct";
import Deliveries from "./routes/Deliveries";
import NavBar from "./components/NavBar";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <NavBar />
            <Switch>
                <Route path="/deliveries" component={Deliveries} />
                <Route path="/products/new" component={CreateProduct} />
                <Route path="/products/:productId" component={Product} />
                <Route path="/products" component={Products} />
                <Route path="/" component={Products} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
