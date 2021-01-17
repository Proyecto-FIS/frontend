import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import UsersService from "../../services/UsersService";

import Validators from "../../utils/Validators";

import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import CircularProgress from '@material-ui/core/CircularProgress';

const fields = {
  username: {
    label: "Nombre de usuario",
    name: "username",
    validators: [Validators.StringLength(3, 100)],
  },
  password: {
    label: "Contraseña",
    name: "password",
    validators: [Validators.StringLength(6, 100)],
  }
};

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  circularSpace: {
    marginRight: theme.spacing(1)
  }
});


class Login extends Component {
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

    this.props.history.push("/login");
}

  submitForm = (e) => {
      e.preventDefault();

      this.setState({ isSubmitting: true });
      const action = UsersService.login;

      action(this.state.values)
          .then(() => this.submitDone())
          .catch(() => this.submitDone());
  }

  setField(field, e) {
      this.setState(prevState => {
          let newState = prevState;
          newState.values[field.name] = e.target.value;
          newState.errors[field.name] = Validators.validate(field.validators, e.target.value);
          newState.formCorrect = Object.values(fields).reduce((ac, v) => (newState.errors[v.name] !== "" || newState.values[v.name] === "") ? false : ac, true);
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
            Iniciar sesión
          </Typography>

          <form className={classes.form} onSubmit={this.submitForm} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={fields.username.name}
              label={fields.username.label}
              name={fields.username.label}
              value={this.state.values.name}
              placeholder={fields.username.label}
              error={this.state.errors[fields.username.name] !== ""}
              helperText={this.state.errors[fields.username.name]}
              onChange={this.setField.bind(this, fields.username)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={fields.password.label}
              label={fields.password.label}
              type="password"
              id={fields.password.name}
              value={this.state.values.name}
              error={this.state.errors[fields.password.name] !== ""}
              helperText={this.state.errors[fields.password.name]}
              onChange={this.setField.bind(this, fields.password)}
              autoComplete="current-password"
            />
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
                  <CircularProgress size="1.5rem" className={classes.circularSpace} /> Entrar
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
                  Entrar
                </Button> 
              </div>
            }
            
            <Grid container>
              <Grid item>
              ¿No tienes cuenta? Regístrate {' '}
                <Link component={RouterLink} to="/customer-register" variant="body2">
                  {"como cliente"}
                </Link>
                {' '} o {' '}
                <Link component={RouterLink} to="/toaster-register" variant="body2">
                  {"como tostador"}
                </Link>
                .
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


export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Login)));
