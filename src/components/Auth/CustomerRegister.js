import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { connect } from "react-redux";
import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";
import store from "../../redux/store";
import UsersService from "../../services/UsersService";

import Validators from "../../utils/Validators";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from '@material-ui/core/CircularProgress';

const fields = {
  username: {
    label: "Nombre de usuario",
    name: "username",
    validators: [Validators.StringLength(3, 100)],
  },
  address: {
    label: "Dirección postal",
    name: "address",
    validators: [Validators.TestRegex(/[\s\S]*/)]
  },
  email: {
    label: "Correo electrónico",
    name: "email",
    validators: [Validators.NotEmptyString(), 
                Validators.TestRegex(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)],
  },
  pictureUrl: {
    label: "Imagen",
    name: "pictureUrl",
    validators: [Validators.TestRegex(/^$|(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/)],
  },
  password: {
    label: "Contraseña",
    name: "password",
    validators: [Validators.StringLength(6, 100)],
  },
  password2: {
    label: "Repita la contraseña",
    name: "password2",
    validators: [Validators.StringLength(6, 100)],
  }
};


const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  circularSpace: {
    marginRight: theme.spacing(1)
  }
});

class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getDefaultState(),
      isSubmitting: false,
    };
  }

  getDefaultState() {
    let state = {
      values: {},
      errors: {},
      formCorrect: false,
    };

    Object.values(fields).forEach((field) => {
      state.values[field.name] = "";
      state.errors[field.name] = "";
    });

    return state;
  }

  submitDone() {
    this.setState({ isSubmitting: false });

    this.props.history.push("/");
}

  submitForm = (e) => {
      e.preventDefault();

      if(this.state.values["password"] !== this.state.values["password2"]) {
        store.dispatch(startSnackBar("error", "Las contraseñas no coinciden"));
      } else {
        this.setState({ isSubmitting: true });
        const action = UsersService.registerCustomer;

        action(this.state.values)
          .then(() => this.submitDone())
          .catch(() => this.submitDone());
      }

  }

  setField(field, e) {
    this.setState(prevState => {
        let newState = prevState;
        newState.values[field.name] = e.target.value;
        newState.errors[field.name] = Validators.validate(field.validators, e.target.value);
        newState.formCorrect = Object.values(fields).reduce(
                                                        (ac, v) => (newState.errors[v.name] !== "" 
                                                        || newState.values["username"] === ""
                                                        || newState.values["email"] === ""
                                                        || newState.values["password"] === ""
                                                        || newState.values["password2"] === ""
                                                        ) ? false : ac, true);
        return newState;
    });
}

render() {
  const { classes, account } = this.props;

  if(account) {
    return <Redirect to="/"/>
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse como cliente
        </Typography>

        <form className={classes.form} onSubmit={this.submitForm} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={fields.username.name}
                label={fields.username.label}
                name={fields.username.label}
                value={this.state.values.name}
                error={this.state.errors[fields.username.name] !== ""}
                helperText={this.state.errors[fields.username.name]}
                onChange={this.setField.bind(this, fields.username)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoComplete={fields.address.name}
                fullWidth
                id={fields.address.name}
                label={fields.address.label}
                name={fields.address.label}
                value={this.state.values.name}
                error={this.state.errors[fields.address.name] !== ""}
                helperText={this.state.errors[fields.address.name]}
                onChange={this.setField.bind(this, fields.address)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id={fields.pictureUrl.name}
                label={fields.pictureUrl.label}
                name={fields.pictureUrl.label}
                value={this.state.values.name}
                error={this.state.errors[fields.pictureUrl.name] !== ""}
                helperText={this.state.errors[fields.pictureUrl.name]}
                onChange={this.setField.bind(this, fields.pictureUrl)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={fields.email.name}
                label={fields.email.label}
                name={fields.email.label}
                value={this.state.values.name}
                error={this.state.errors[fields.email.name] !== ""}
                helperText={this.state.errors[fields.email.name]}
                onChange={this.setField.bind(this, fields.email)}
                autoComplete={fields.email.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name={fields.password.label}
                label={fields.password.label}
                type="password"
                id={fields.password.name}
                value={this.state.values.name}
                error={this.state.errors[fields.password.name] !== ""}
                helperText="6 caracteres como mínimo"
                onChange={this.setField.bind(this, fields.password)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name={fields.password2.label}
                label={fields.password2.label}
                type="password"
                id={fields.password2.name}
                value={this.state.values.name}
                error={this.state.errors[fields.password2.name] !== ""}
                onChange={this.setField.bind(this, fields.password2)}
              />
            </Grid>
          </Grid>

          {this.props.loading ? 
              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled
                >
                 <CircularProgress size="1.5rem" className={classes.circularSpace} />  Registrarme
                </Button>
            </div>
            :
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.state.formCorrect}
              >
                Registrarme
              </Button> 
            </div>
           }


          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                ¿Tienes ya una cuenta? Identifícate
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

}

}

const mapStateToProps = state => {
  return {
  account: state.AuthReducer.account,
  loading: state.AuthReducer.loading,
  accError: state.AuthReducer.error
  }
};


export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CustomerRegister)));
