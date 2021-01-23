import React, { Component } from "react";
import { TextField, Button, Grid, Box, FormControl } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Validators from "../utils/Validators";
import DeliveryService from "../services/DeliveryService";
import { withRouter } from "react-router-dom";
import MainGrid from "../components/Common/MainGrid";
import { connect } from "react-redux";
import setDelivery from "../redux/actions/Delivery/setDelivery";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


const fields1 = [
    {
        label: "Nombre",
        name: "name",
        validators: [Validators.StringLength(1, 100)]
    },
    {
        label: "Apellidos",
        name: "surname",
        validators: [Validators.StringLength(1, 100)]
    },
    {
        label: "Dirección",
        name: "address",
        validators: [Validators.StringLength(1, 150)]
    },
    {
        label: "Ciudad",
        name: "city",
        validators: [Validators.StringLength(1, 100)]
    },
    {
        label: "Provincia",
        name: "province",
        validators: [Validators.StringLength(1, 100)]
    },
    {
        label: "País",
        name: "country",
        validators: [Validators.StringLength(1, 100)]
    },
    {
        label: "Código postal",
        name: "zipCode",
        validators: [Validators.CheckInteger(), Validators.TestRegex(/^([0-9]{5}$)/)]
    },
    {
        label: "Número de teléfono",
        name: "phoneNumber",
        validators: [Validators.TestRegex(/^([0-9]{1,15}$)/)]
    },
    {
        label: "Correo electrónico",
        name: "email",
        validators: [Validators.TestRegex(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)]
    }
];

const fields2 = [
    {
        label: "ESTADO",
        name: "statusType",
        validators: [Validators.StringLength(1, 50)]
    },
    {
        label: "Fecha de inicio",
        name: "createdDate",
        validators: [Validators.StringLength(1, 500)]
    },
    {
        label: "Fecha de entrega estimada",
        name: "deliveryDate",
        validators: [Validators.StringLength(1, 500)]
    },
    {
        label: "Comentarios",
        name: "comments",
        validators: [Validators.StringLength(1, 500)]
    },
];


const styles = (theme) => ({
    titleText: {
        textAlign: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    margin: {
        margin: theme.spacing(8),
    },
});

const FormTextField = (props) => (
    <TextField label={props.label} error={props.error !== ""}
        variant={props.variant} InputProps={props.InputProps} value={props.value}
        onChange={props.onChange} helperText={props.error} fullWidth={true} />
);


class DeliveryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.getDefaultState(props.delivery),
            isSubmitting: false
        };
    }

    clearForm() {
        this.setState(this.getDefaultState());
    }

    getDefaultState(delivery = null) {
        let state = {
            values: {},
            errors: {},
            formCorrect: false,
        };

        if (delivery) {
            fields1.forEach(field => {
                state.values[field.name] = delivery[field.name];
                state.errors[field.name] = "";
            });
            fields2.forEach(field => {
                state.values[field.name] = delivery[field.name];
                state.errors[field.name] = "";
            });
            state.values._id = delivery._id;
        } else {
            fields1.forEach(field => {
                state.values[field.name] = "";
                state.errors[field.name] = "";
            });
            fields2.forEach(field => {
                state.values[field.name] = "";
                state.errors[field.name] = "";
            });
        }
        return state;
    }

    submitDone() {
        this.setState({ isSubmitting: false });
        this.props.history.push("/deliveries");
    }

    submitForm() {
        this.setState({ isSubmitting: true });

        const action = this.props.delivery ? DeliveryService.editDelivery : DeliveryService.newDelivery;

        action(this.state.values)
            .then(() => this.submitDone())
            .catch(() => this.submitDone());
    }

    setField(field, e) {
        this.setState(prevState => {
            let newState = prevState;
            newState.values[field.name] = e.target.value;
            newState.errors[field.name] = Validators.validate(field.validators, e.target.value);
            newState.formCorrect = fields1.reduce((ac, v) => (newState.errors[v.name] !== "" || newState.values[v.name] === "") ? false : ac, true);
            newState.formCorrect = fields2.reduce((ac, v) => (newState.errors[v.name] !== "" || newState.values[v.name] === "") ? false : ac, true);
            return newState;
        });
    }

    render() {
        const { classes, delivery, account } = this.props;

        const formFields1 = fields1.map((field, index) => (
            <Grid key={index} item xs={12} >
                <FormTextField label={field.label} error={this.state.errors[field.name]}
                    value={this.state.values[field.name]}
                    onChange={this.setField.bind(this, field)} spacing={6}
                    variant="outlined"
                />
            </Grid>
        ));

        const formFields2 = fields2.map((field, index) => (
            <Grid key={index} item xs={12}>
                <FormTextField label={field.label} error={this.state.errors[field.name]}
                    value={this.state.values[field.name]}
                    onChange={this.setField.bind(this, field)}
                    InputProps={{ readOnly: true, }}
                    variant="filled"
                />
            </Grid>
        ));

        const actionText = delivery ? "MODIFICAR" : "CONFIRMAR";

        return (
            <MainGrid>
                <Box border={1} borderRadius={10} boxShadow={3} padding={3}>
                    <h2 className={classes.titleText}>{actionText} ENTREGA</h2>
                    <Grid container spacing={10}>
                        <Grid item xs={6} className={classes.form}>
                            <h3 className={classes.titleText}>DIRECCIÓN DE ENVÍO</h3>
                            <Grid container spacing={2}>
                                {formFields1}
                            </Grid>
                        </Grid>
                        <Grid item xs={5} className={classes.form}>
                            <h3 className={classes.titleText}>ESTADO DE ENTREGA</h3>
                            {account && !account.isCustomer ?
                                <FormControl className={classes.margin}>
                                    <InputLabel id="select-statusType">Seleccionar nuevo estado</InputLabel>
                                    <Select
                                        labelId="select-statusType"
                                        value={this.state.values.statusType}
                                        onChange={this.setField.bind(this, fields2[0])}
                                    >
                                        <MenuItem value="">
                                            <em>Seleccionar nuevo estado</em>
                                        </MenuItem>
                                        <MenuItem value="INICIADO">INICIADO</MenuItem>
                                        <MenuItem value="PREPARADO">PREPARADO</MenuItem>
                                        <MenuItem value="EN CAMINO">EN CAMINO</MenuItem>
                                        <MenuItem value="RETRASADO">RETRASADO</MenuItem>
                                        <MenuItem value="CANCELADO">CANCELADO</MenuItem>
                                        <MenuItem value="COMPLETADO">COMPLETADO</MenuItem>
                                    </Select>
                                </FormControl>
                                : null}
                            {formFields2}

                            <Grid container spacing={6} direction="row-reverse" justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={e => this.clearForm()}>Limpiar</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" disabled={!this.state.formCorrect || this.state.isSubmitting} onClick={e => this.submitForm()}>{actionText}</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </MainGrid >
        );
    }
}

const mapDispatchToProps = {
    setDelivery
};

const mapStateToProps = (state) => {
    return {
        delivery: state.DeliveriesReducer.delivery,
        account: state.AuthReducer.account
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DeliveryForm)));