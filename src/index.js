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
import Deliveries from "./routes/Deliveries";
import Customer from "./routes/Customer";

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
                    <Route path="/products/:productId" component={Product} />
                    <Route path="/products" component={Products} />
                    <Route path="/login" component={Login} />
                    <Route path="/customers/:accountId" component={Customer} />
                    <Route path="/customer-register" component={RegisterCustomer} />
                    <Route path="/toaster-register" component={RegisterToaster} />
                    <Route path="/" component={Products} />
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