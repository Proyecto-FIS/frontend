import React, { Component } from "react";
import { Button, Select, MenuItem, InputLabel, FormControl, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import BillingProfileService from "../services/BillingProfileService";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import MainGrid from "../components/Common/MainGrid";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    form: {
        display: "flex",
        flexDirection: "column",
    }
});

class PurchaseSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            billingProfile: "",
            operationType: "",
        };

        BillingProfileService.requestProfiles();
    }

    changeBillingProfile(ev) {
        this.setState({
            billingProfile: ev.target.value
        });
    }

    changeOperationType(ev) {
        this.setState({
            operationType: ev.target.value
        });
    }

    pay() {
        if (this.state.billingProfile === "" || this.state.operationType === "") {
            this.props.startSnackBar("warning", "Hay campos sin rellenar");
            return;
        }

        // TODO with tests
    }

    render() {

        const { products, totalPrice, billingProfiles, classes } = this.props;

        const profileList = billingProfiles === null ? null : billingProfiles.map((profile, i) => (
            <MenuItem key={i} value={i}>
                {`${profile.name}, ${profile.address}, ${profile.city}, ${profile.province}, ${profile.country}`}
            </MenuItem>
        ));

        const defaultProfile = <MenuItem value={""}><em>{billingProfiles === null ? "Cargando perfiles..." : "No seleccionado"}</em></MenuItem>

        return (
            <MainGrid container className={classes.form}>
                <Grid item>
                    <Typography variant="h3" align="center">Resumen del pedido</Typography>
                </Grid>
                <Grid item xs={8}>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                        <InputLabel id="billing-profile-label">Perfil de entrega</InputLabel>
                        <Select
                            className={classes.selectEmpty}
                            labelId="billing-profile-label"
                            value={this.state.billingProfile}
                            onChange={ev => this.changeBillingProfile(ev)}>
                            {defaultProfile}
                            {profileList}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
                        <InputLabel id="operation-type-label">Tipo de operación</InputLabel>
                        <Select
                            className={classes.selectEmpty}
                            labelId="operation-type-label"
                            value={this.state.operationType}
                            onChange={ev => this.changeOperationType(ev)}>
                            <MenuItem value={""}>
                                <em>No seleccionado</em>
                            </MenuItem>
                            <MenuItem value={"payment"}>
                                Pago normal ({totalPrice} €)
                        </MenuItem>
                            <MenuItem value={"subscription"}>
                                Suscripción mensual ({totalPrice} €/mes)
                        </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item direction="row-reverse">
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={ev => this.pay()}>Pagar</Button>
                    </Grid>
                </Grid>
            </MainGrid>
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

const mapDispatchToProps = {
    startSnackBar,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PurchaseSummary));
