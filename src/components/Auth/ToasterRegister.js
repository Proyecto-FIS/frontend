import React, {Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { connect } from "react-redux";

import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";
import store from "../../redux/store";
import UsersService from "../../services/UsersService";

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

import Validators from "../../utils/Validators";

import InputAdornment from '@material-ui/core/InputAdornment';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import CircularProgress from '@material-ui/core/CircularProgress';

  
const fields = {
  username: {
    label: "Nombre de usuario",
    fieldName: "username",
    validators: [Validators.StringLength(3, 100)],
  },
  name: {
    label: "Nombre profesional",
    fieldName: "name",
    validators: [Validators.StringLength(3, 100)],
  },
  description: {
    label: "Descripción",
    fieldName: "description",
    validators: [Validators.StringLength(20, 100)],
  },
  phoneNumber: {
    label: "Número de teléfono",
    fieldName: "phoneNumber",
    validators: [Validators.TestRegex(/^$|^[0-9]{9}$/)],
  },
  address: {
    label: "Dirección postal",
    fieldName: "address",
    validators: [Validators.TestRegex(/[\s\S]*/)]
  },
  email: {
    label: "Correo electrónico",
    fieldName: "email",
    validators: [Validators.NotEmptyString(), 
                Validators.TestRegex(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)],
  },
  instagramUrl: {
    label: "Perfil de Instagram",
    fieldName: "instagramUrl",
    //eslint-disable-next-line
    validators: [Validators.TestRegex(/^$|^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)],
  },
  facebookUrl: {
    label: "Perfil de Facebook",
    fieldName: "facebookUrl",
    //eslint-disable-next-line
    validators: [Validators.TestRegex(/^$|^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)],
  },
  twitterUrl: {
    label: "Perfil de Twitter",
    fieldName: "twitterUrl",
    //eslint-disable-next-line
    validators: [Validators.TestRegex(/^$|^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)],
  },
  pictureUrl: {
    label: "Imagen",
    fieldName: "pictureUrl",
    validators: [Validators.TestRegex(/^$|(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/)],
  },
  password: {
    label: "Contraseña",
    fieldName: "password",
    validators: [Validators.StringLength(6, 100)],
  },
  password2: {
    label: "Repita la contraseña",
    fieldName: "password2",
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

class ToasterRegister extends Component {
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
      state.values[field.fieldName] = "";
      state.errors[field.fieldName] = "";
    });

    return state;
  }

  submitDone() {
    this.setState({ isSubmitting: false });

    this.props.history.push("/toaster-register");
}

submitForm = (e) => {
  e.preventDefault();

  if(this.state.values["password"] !== this.state.values["password2"]) {
    store.dispatch(startSnackBar("error", "Las contraseñas no coinciden"));
  } else {
    this.setState({ isSubmitting: true });
    const action = UsersService.registerToaster;

    action(this.state.values)
      .then(() => this.submitDone())
      .catch(() => this.submitDone());
  }

}

setField(field, e) {
  this.setState(prevState => {
      let newState = prevState;
      newState.values[field.fieldName] = e.target.value;
      newState.errors[field.fieldName] = Validators.validate(field.validators, e.target.value);
      newState.formCorrect = Object.values(fields).reduce(
                                                      (ac, v) => (newState.errors[v.fieldName] !== "" 
                                                      || newState.values["username"] === ""
                                                      || newState.values["email"] === ""
                                                      || newState.values["name"] === ""
                                                      || newState.values["description"] === ""
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
          Registrarse como tostador
        </Typography>

        <form className={classes.form} onSubmit={this.submitForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={fields.username.fieldName}
                label={fields.username.label}
                name={fields.username.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.username.fieldName] !== ""}
                helperText={this.state.errors[fields.username.fieldName]}
                onChange={this.setField.bind(this, fields.username)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={fields.name.fieldName}
                label={fields.name.label}
                name={fields.name.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.name.fieldName] !== ""}
                helperText={this.state.errors[fields.name.fieldName]}
                onChange={this.setField.bind(this, fields.name)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={5}
                id={fields.description.fieldName}
                label={fields.description.label}
                name={fields.description.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.description.fieldName] !== ""}
                helperText={this.state.errors[fields.description.fieldName] ? this.state.errors[fields.description.fieldName] : "20 caracteres como mínimo"}
                onChange={this.setField.bind(this, fields.description)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id={fields.phoneNumber.fieldName}
                label={fields.phoneNumber.label}
                name={fields.phoneNumber.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.phoneNumber.fieldName] !== ""}
                helperText={this.state.errors[fields.phoneNumber.fieldName] ? this.state.errors[fields.phoneNumber.fieldName] : "Formato: XXXXXXXXX"}
                onChange={this.setField.bind(this, fields.phoneNumber)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id={fields.address.fieldName}
                label={fields.address.label}
                name={fields.address.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.address.fieldName] !== ""}
                helperText={this.state.errors[fields.address.fieldName]}
                onChange={this.setField.bind(this, fields.address)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id={fields.facebookUrl.fieldName}
                label={fields.facebookUrl.label}
                name={fields.facebookUrl.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.facebookUrl.fieldName] !== ""}
                helperText={this.state.errors[fields.facebookUrl.fieldName]}
                onChange={this.setField.bind(this, fields.facebookUrl)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                id={fields.instagramUrl.fieldName}
                label={fields.instagramUrl.label}
                name={fields.instagramUrl.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.instagramUrl.fieldName] !== ""}
                helperText={this.state.errors[fields.instagramUrl.fieldName]}
                onChange={this.setField.bind(this, fields.instagramUrl)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id={fields.twitterUrl.fieldName}
                label={fields.twitterUrl.label}
                name={fields.twitterUrl.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.twitterUrl.fieldName] !== ""}
                helperText={this.state.errors[fields.twitterUrl.fieldName]}
                onChange={this.setField.bind(this, fields.twitterUrl)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id={fields.pictureUrl.fieldName}
                label={fields.pictureUrl.label}
                name={fields.pictureUrl.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.pictureUrl.fieldName] !== ""}
                helperText={this.state.errors[fields.pictureUrl.fieldName]}
                onChange={this.setField.bind(this, fields.pictureUrl)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={fields.email.fieldName}
                label={fields.email.label}
                name={fields.email.label}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.email.fieldName] !== ""}
                helperText={this.state.errors[fields.email.fieldName]}
                onChange={this.setField.bind(this, fields.email)}
                autoComplete={fields.email.fieldName}
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
                id={fields.password.fieldName}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.password.fieldName] !== ""}
                helperText={this.state.errors[fields.password.fieldName] ? this.state.errors[fields.password.fieldName] : "6 caracteres como mínimo"}
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
                id={fields.password2.fieldName}
                value={this.state.values.fieldName}
                error={this.state.errors[fields.password2.fieldName] !== ""}
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
                ¿Tienes una cuenta? Identifícate
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


export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ToasterRegister)));
