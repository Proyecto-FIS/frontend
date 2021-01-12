import React, { Component } from "react";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Validators from "../utils/Validators";
import DeliveryService from "../services/DeliveryService";
import { withRouter } from "react-router-dom";
import MainGrid from "../components/Common/MainGrid";
import { connect } from "react-redux";
import setDelivery from "../redux/actions/Delivery/setDelivery";

const fields1 = [
    {
        label: "Nombre",
        name: "name",
        validators: [Validators.StringLength(1, 100)]
    },
    {
        label: "Apellidos",
        name: "surnames",
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
    }
});

const FormTextField = (props) => (
    <TextField label={props.label} error={props.error !== ""}
        variant="outlined" value={props.value}
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
        this.props.history.push("/delivery");
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
        const { classes, delivery } = this.props;

        const formFields1 = fields1.map((field, index) => (
            <Grid key={index} item xs={12}>
                <FormTextField label={field.label} error={this.state.errors[field.name]}
                    value={this.state.values[field.name]}
                    onChange={this.setField.bind(this, field)} />
            </Grid>
        ));

        const formFields2 = fields2.map((field, index) => (
            <Grid key={index} item xs={12}>
                <FormTextField label={field.label} error={this.state.errors[field.name]}
                    value={this.state.values[field.name]}
                    onChange={this.setField.bind(this, field)} />
            </Grid>
        ));

        const actionText = delivery ? "MODIFICAR" : "CONFIRMAR";

        return (
            <MainGrid>
                <Box border={1} borderRadius={10} boxShadow={3} padding={3}>
                    <h2 className={classes.titleText}>{actionText} ENTREGA</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={6} className={classes.form}>
                            <h3 className={classes.titleText}>DIRECCIÓN DE ENVÍO</h3>
                            {formFields1}
                        </Grid>
                        <Grid item xs={6} className={classes.form}>
                            <h3 className={classes.titleText}>ESTADO DE ENTREGA</h3>
                            {formFields2}
                        </Grid>
                    </Grid>
                    <Grid container item spacing={6} direction="row-reverse" justify="center">
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={e => this.clearForm()}>Limpiar</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" disabled={!this.state.formCorrect || this.state.isSubmitting} onClick={e => this.submitForm()}>{actionText}</Button>
                        </Grid>
                    </Grid>
                </Box>
            </MainGrid>
        );
    }
}

const mapDispatchToProps = {
    setDelivery
};

const mapStateToProps = (state) => {
    return {
        delivery: state.DeliveriesReducer.delivery
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DeliveryForm)));