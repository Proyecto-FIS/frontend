import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./components/Common/PrivateRoute";
import store from "./redux/store";

import Products from "./routes/Products";
import Toasters from "./routes/Toasters";
import Login from "./routes/Login";
import RegisterCustomer from "./routes/RegisterCustomer";
import RegisterToaster from "./routes/RegisterToaster";
import Product from "./routes/Product";
import CreateProduct from "./routes/CreateProduct";
import DeliveryList from "./routes/DeliveryList";
import Customer from "./routes/Customer";
import Toaster from "./routes/Toaster";
import BillingProfileList from "./routes/BillingProfileList";
import BillingProfileForm from "./routes/BillingProfileForm";
import PurchaseHistory from "./routes/PurchaseHistory";
import DeliveryForm from "./routes/DeliveryForm";
import PurchaseSummary from "./routes/PurchaseSummary";
import NavBar from "./components/NavBar";
import SnackbarListener from "./components/Common/SnackBarListener";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <NavBar />
            <Switch>
                <PrivateRoute exact path="/purchase" component={PurchaseSummary} />
                <PrivateRoute exact path="/purchase-history" component={PurchaseHistory} />
                <Route exact path="/toasters" component={Toasters} />
                <PrivateRoute exact path="/deliveries" component={DeliveryList} />
                <Route exact path="/deliveries/add" component={DeliveryForm} />
                <Route exact path="/deliveries/:deliveryId" component={DeliveryForm}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/customer-register" component={RegisterCustomer} />
                <Route exact path="/toaster-register" component={RegisterToaster} />
                <Route exact path="/customers/:accountId" component={Customer} />
                <Route exact path="/toasters/:accountId" component={Toaster} />
                <Route exact path="/" component={Products} />
                <Route exact path="/products" component={Products} />
                <PrivateRoute exact path="/products/new" component={CreateProduct} />
                <Route exact path="/products/:productId" component={Product} />
                <PrivateRoute exact path="/billingprofiles/add" component={BillingProfileForm} />
                <PrivateRoute exact path="/billingprofiles" component={BillingProfileList} />
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
