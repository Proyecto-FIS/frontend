import React, { Component } from "react";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Validators from "../../utils/Validators";
import BillingProfileService from "../../services/BillingProfileService";
import { withRouter } from "react-router-dom";

const fields = [
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
    },
];

const styles = (theme) => ({
    titleText: {
        textAlign: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
    }
});

const FormTextField = (props) => (
    <TextField label={props.label} error={props.error !== ""}
        variant="outlined" value={props.value}
        onChange={props.onChange} helperText={props.error} fullWidth={true} />
);

class BillingProfileForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.getDefaultState(),
            isSubmitting: false
        };
    }

    clearForm() {
        this.setState(this.getDefaultState());
    }

    getDefaultState() {
        let state = {
            values: {},
            errors: {},
            formCorrect: false
        };
        fields.forEach(field => {
            state.values[field.name] = "";
            state.errors[field.name] = "";
        });
        return state;
    }

    submitForm() {
        this.setState({ isSubmitting: true });
        BillingProfileService.postNewProfile(this.state.values)
            .then(() => {
                this.setState({ isSubmitting: false });
                this.props.history.push("/billingprofiles");
            });
    }

    setField(field, e) {
        this.setState(prevState => {
            let newState = prevState;
            newState.values[field.name] = e.target.value;
            newState.errors[field.name] = Validators.validate(field.validators, e.target.value);
            newState.formCorrect = fields.reduce((ac, v) => (newState.errors[v.name] !== "" || newState.values[v.name] === "") ? false : ac, true);
            return newState;
        });
    }

    render() {
        const { classes } = this.props;

        const formFields = fields.map((field, index) => (
            <Grid key={index} item xs={12}>
                <FormTextField label={field.label} error={this.state.errors[field.name]}
                    value={this.state.values[field.name]}
                    onChange={this.setField.bind(this, field)} />
            </Grid>
        ));

        return (
            <Grid container>
                <Grid item sm={2} xs={1}></Grid>
                <Grid item sm={8} xs={10}>
                    <Box border={1} borderRadius={10} boxShadow={3} padding={3}>
                        <h2 className={classes.titleText}>Añadir nuevo perfil de entrega</h2>
                        <Grid container>
                            <Grid item sm={2} xs={2}></Grid>
                            <Grid container item xs={8} sm={8} spacing={3} className={classes.form}>
                                {formFields}
                                <Grid container item spacing={4} direction="row-reverse">
                                    <Grid item>
                                        <Button variant="contained" color="secondary" onClick={e => this.clearForm()}>Limpiar</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="secondary" disabled={!this.state.formCorrect || this.state.isSubmitting} onClick={e => this.submitForm()}>Añadir</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={2} xs={2}></Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item sm={2} xs={1}></Grid>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(BillingProfileForm));
