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
import BillingProfileList from "./routes/BillingProfileList";
import BillingProfileForm from "./routes/BillingProfileForm";
import PurchaseHistory from "./routes/PurchaseHistory";

import NavBar from "./components/NavBar";
import SnackbarListener from "./components/Common/SnackBarListener";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <NavBar />
            <Switch>
                <Route path="/purchase-history" component={PurchaseHistory} />
                <Route path="/billingprofiles/add" component={BillingProfileForm} />
                <Route path="/billingprofiles" component={BillingProfileList} />
                <Route path="/roasters" component={Roasters} />
                <Route path="/deliveries" component={Deliveries} />
                <Route path="/products/:productId" component={Product} />
                <Route path="/products" component={Products} />
                <Route path="/login" component={Login} />
                <Route path="/customer-register" component={RegisterCustomer} />
                <Route path="/toaster-register" component={RegisterToaster} />
                <Route path="/" component={Products} />
            </Switch>
        </Router>
        <SnackbarListener />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
