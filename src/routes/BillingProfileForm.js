import React, { Component } from "react";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Validators from "../utils/Validators";
import BillingProfileService from "../services/BillingProfileService";
import { withRouter } from "react-router-dom";
import MainGrid from "../components/Common/MainGrid";
import { connect } from "react-redux";
import setBillingProfile from "../redux/actions/BillingProfile/setBillingProfile";

const fields = [
  {
    label: "Nombre",
    name: "name",
    validators: [Validators.StringLength(1, 100)],
  },
  {
    label: "Apellidos",
    name: "surname",
    validators: [Validators.StringLength(1, 100)],
  },
  {
    label: "Dirección",
    name: "address",
    validators: [Validators.StringLength(1, 150)],
  },
  {
    label: "Ciudad",
    name: "city",
    validators: [Validators.StringLength(1, 100)],
  },
  {
    label: "Provincia",
    name: "province",
    validators: [Validators.StringLength(1, 100)],
  },
  {
    label: "País",
    name: "country",
    validators: [Validators.StringLength(1, 100)],
  },
  {
    label: "Código postal",
    name: "zipCode",
    validators: [
      Validators.CheckInteger(),
      Validators.TestRegex(/^([0-9]{5}$)/),
    ],
  },
  {
    label: "Número de teléfono",
    name: "phoneNumber",
    validators: [Validators.TestRegex(/^([0-9]{1,15}$)/)],
  },
  {
    label: "Correo electrónico",
    name: "email",
    validators: [Validators.TestRegex(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)],
  },
];

const styles = (theme) => ({
  titleText: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
});

const FormTextField = (props) => (
  <TextField
    label={props.label}
    error={props.error !== ""}
    variant="outlined"
    value={props.value}
    onChange={props.onChange}
    helperText={props.error}
    fullWidth={true}
  />
);

class BillingProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getDefaultState(props.profile),
      isSubmitting: false,
    };
  }

  clearForm() {
    this.setState(this.getDefaultState());
  }

  getDefaultState(profile = null) {
    let state = {
      values: {},
      errors: {},
      formCorrect: false,
    };

    if (profile) {
      fields.forEach((field) => {
        state.values[field.name] = profile[field.name];
        state.errors[field.name] = "";
      });
      state.values._id = profile._id;
    } else {
      fields.forEach((field) => {
        state.values[field.name] = "";
        state.errors[field.name] = "";
      });
    }
    return state;
  }

  submitDone() {
    this.setState({ isSubmitting: false });
    this.props.history.push("/billingprofiles");
  }

  submitForm() {
    this.setState({ isSubmitting: true });

    const action = this.props.profile
      ? BillingProfileService.editProfile
      : BillingProfileService.postNewProfile;

    action(this.state.values)
      .then(() => this.submitDone())
      .catch(() => this.submitDone());
  }

  setField(field, e) {
    this.setState((prevState) => {
      let newState = prevState;
      newState.values[field.name] = e.target.value;
      newState.errors[field.name] = Validators.validate(
        field.validators,
        e.target.value
      );
      newState.formCorrect = fields.reduce(
        (ac, v) =>
          newState.errors[v.name] !== "" || newState.values[v.name] === ""
            ? false
            : ac,
        true
      );
      return newState;
    });
  }

  render() {
    const { classes, profile } = this.props;

    const formFields = fields.map((field, index) => (
      <Grid key={index} item xs={12}>
        <FormTextField
          label={field.label}
          error={this.state.errors[field.name]}
          value={this.state.values[field.name]}
          onChange={this.setField.bind(this, field)}
        />
      </Grid>
    ));

    const actionText = profile ? "Editar" : "Añadir";

    return (
      <MainGrid>
        <Box border={1} borderRadius={10} boxShadow={3} padding={3}>
          <h2 className={classes.titleText}>{actionText} perfil de entrega</h2>
          <Grid container>
            <Grid item sm={2} xs={2}></Grid>
            <Grid
              container
              item
              xs={8}
              sm={8}
              spacing={3}
              className={classes.form}
            >
              {formFields}
              <Grid container item spacing={4} direction="row-reverse">
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => this.clearForm()}
                  >
                    Limpiar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={
                      !this.state.formCorrect || this.state.isSubmitting
                    }
                    onClick={(e) => this.submitForm()}
                  >
                    {actionText}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={2} xs={2}></Grid>
          </Grid>
        </Box>
      </MainGrid>
    );
  }
}

const mapDispatchToProps = {
  setBillingProfile,
};

const mapStateToProps = (state) => {
  return {
    profile: state.BillingProfileReducer.billingProfile,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(BillingProfileForm))
);
