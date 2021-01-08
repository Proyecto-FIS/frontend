import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import BillingProfileService from "../services/BillingProfileService";

const notSelectedText = "No seleccionado";

class PurchaseSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            billingProfile: notSelectedText
        };

        BillingProfileService.requestProfiles();
    }

    changeBillingProfile(ev) {
        this.setState({
            billingProfile: ev.target.value
        });
    }

    render() {

        const { products, totalPrice, billingProfiles } = this.props;

        const profileList = billingProfiles === null ? null : billingProfiles.map((profile, i) => (
            <MenuItem key={i} value={profile.name}>
                {profile.name}
            </MenuItem>
        ));

        const defaultProfile = billingProfiles === null ? (
            <MenuItem value={notSelectedText}>
                <em>Cargando perfiles...</em>
            </MenuItem>
        ) : (
                <MenuItem value={notSelectedText}>
                    <em>No seleccionado</em>
                </MenuItem>
            );

        return (
            <div>
                <Select
                    value={this.state.billingProfile}
                    onChange={ev => this.changeBillingProfile(ev)}
                    label="Perfil de entrega">
                    {defaultProfile}
                    {profileList}
                </Select>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.CartReducer.productList,
        totalPrice: state.CartReducer.totalPrice,
        billingProfiles: state.LoaderReducer.elements
    };
};

export default connect(mapStateToProps)(PurchaseSummary);
