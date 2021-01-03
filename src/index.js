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
import BillingProfileList from "./routes/BillingProfileList";
import BillingProfileForm from "./routes/BillingProfileForm";
import PurchaseHistory from "./routes/PurchaseHistory";
import CreateDelivery from "./routes/CreateDelivery";
import DeliveryForm from "./routes/DeliveryForm";

import NavBar from "./components/NavBar";
import SnackbarListener from "./components/Common/SnackBarListener";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/purchase-history" component={PurchaseHistory} />
                <Route exact path="/roasters" component={Roasters} />
                <Route exact path="/deliveries" component={Deliveries} />
                <Route exact path="/deliveries/add" component={DeliveryForm} />
                <Route exact path="/deliveries/:deliveryId" component={DeliveryForm}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/customer-register" component={RegisterCustomer} />
                <Route exact path="/toaster-register" component={RegisterToaster} />
                <Route exact path="/" component={Products} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/new" component={CreateProduct} />
                <Route exact path="/products/:productId" component={Product} />
                <Route exact path="/billingprofiles/add" component={BillingProfileForm} />
                <Route exact path="/billingprofiles" component={BillingProfileList} />
                <Route exact path="/roasters" component={Roasters} />
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
