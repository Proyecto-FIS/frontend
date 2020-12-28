import React, { Component } from "react";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Validators from "../../utils/Validators";

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
        this.state = this.getDefaultState();
    }

    clearForm() {
        this.setState(this.getDefaultState());
    }

    getDefaultState() {
        let state = { formCorrect: false };
        fields.forEach(field => state[field.name] = { value: "", error: "" });
        return state;
    }

    submitForm() {
        console.log("Submit");
    }

    setField(field, e) {
        let newState = {};
        newState[field.name] = {
            value: e.target.value,
            error: Validators.validate(field.validators, e.target.value)
        };
        this.setState(newState);
        this.setState((prevState) => ({
            formCorrect: fields.reduce((ac, v) => (prevState[v.name].error !== "" || prevState[v.name].value === "") ? false : ac, true)
        }));
    }

    render() {
        const { classes } = this.props;

        const formFields = fields.map((field, index) => (
            <Grid key={index} item xs={12}>
                <FormTextField label={field.label} error={this.state[field.name].error}
                    value={this.state[field.name].value}
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
                                        <Button variant="contained" color="secondary" disabled={!this.state.formCorrect} onClick={e => this.submitForm()}>Añadir</Button>
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

export default withStyles(styles, { withTheme: true })(BillingProfileForm);
