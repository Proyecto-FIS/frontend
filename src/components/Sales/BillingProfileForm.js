import React, { Component } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    titleText: {
        textAlign: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        spacing: 2
    }
});

const FormTextField = (props) => {
    return <TextField label={props.label} error={props.errorFlag} variant="outlined" required value={props.value} onChange={props.onChange} />;
};

class BillingProfileForm extends Component {

    fields = [
        {
            label: "Nombre",
            name: "name",
            validate: (v) => { return true },
        },
        {
            label: "Apellidos",
            name: "surname",
            validate: (v) => { return true },
        },
        {
            label: "Dirección",
            name: "address",
            validate: (v) => { return true },
        },
        {
            label: "Ciudad",
            name: "city",
            validate: (v) => { return true },
        },
        {
            label: "Provincia",
            name: "province",
            validate: (v) => { return true },
        },
        {
            label: "País",
            name: "country",
            validate: (v) => { return true },
        },
        {
            label: "Código postal",
            name: "zipCode",
            validate: (v) => { return true },
        },
        {
            label: "Número de teléfono",
            name: "phoneNumber",
            validate: (v) => { return true },
        },
        {
            label: "Correo electrónico",
            name: "email",
            validate: (v) => { return true },
        },
    ];

    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    clearForm() {
        this.setState(this.getDefaultState());
    }

    getDefaultState() {
        let state = { formCorrect: false };
        this.fields.forEach(field => state[field.name] = { value: "", errorFlag: false });
        return state;
    }

    submitForm() {
        console.log("Submit");
    }

    setField(field, e) {
        let newState = {};
        newState[field.name] = {};
        newState[field.name].value = e.target.value;
        newState[field.name].errorFlag = !field.validate(e.target.value);
        newState.formCorrect = this.fields.reduce((ac, v) => this.state[v.name].errorFlag ? false : ac, true);
        this.setState(newState);
    }

    render() {
        const { classes } = this.props;

        const formFields = this.fields.map(field => <FormTextField label={field.label} errorFlag={this.state[field.name].errorFlag} value={this.state[field.name].value} onChange={this.setField.bind(this, field)} />);

        return (
            <Grid container>
                <Grid container item sm={2} xs={1}></Grid>
                <Grid item sm={8} xs={10}>
                    <h2 className={classes.titleText}>Añadir nuevo perfil de entrega</h2>
                    <form className={classes.form}>
                        {formFields}
                        <Button variant="contained" color="secondary" disabled={!this.state.formCorrect} onClick={e => this.submitForm()}>Añadir</Button>
                        <Button variant="contained" color="secondary" onClick={e => this.clearForm()}>Limpiar</Button>
                    </form>
                </Grid>
                <Grid container item sm={2} xs={1}></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BillingProfileForm);
