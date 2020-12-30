import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Products from "./routes/Products";
import Roasters from "./routes/Roasters";
import Login from "./routes/Login";
import RegisterCustomer from "./routes/RegisterCustomer";
import RegisterToaster from "./routes/RegisterToaster";
import Product from "./routes/Product";
import CreateProduct from "./routes/CreateProduct";
import Deliveries from "./routes/Deliveries";

import NavBar from "./components/NavBar";
import AlertComp from "./components/AlertComp";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <NavBar />
                <AlertComp />
                <Switch>
                    <Route path="/roasters" component={Roasters} />
                    <Route path="/deliveries" component={Deliveries} />
                    <Route path="/login" component={Login} />
                    <Route path="/customer-register" component={RegisterCustomer} />
                    <Route path="/toaster-register" component={RegisterToaster} />
                    <Route path="/" component={Products} />
                    <Route path="/products" component={Products} />
                    <Route path="/products/new" component={CreateProduct} />
                    <Route path="/products/:productId" component={Product} />
                </Switch>
            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();