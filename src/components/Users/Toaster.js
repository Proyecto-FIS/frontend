import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../../redux/store";

import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";

import Validators from "../../utils/Validators";

import Skeleton from '@material-ui/lab/Skeleton';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";

import UsersService from "../../services/UsersService";

import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import CircularProgress from '@material-ui/core/CircularProgress';

import ToasterTemplate from "./ToasterTemplate";

const fields = {
  address: {
    label: "Dirección postal",
    fieldName: "address",
    validators: [Validators.TestRegex(/[\s\S]*/)]
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
    label: "URL de Imagen",
    fieldName: "pictureUrl",
    validators: [Validators.TestRegex(/^$|[\S\s]$/)],
  },

};

const fields2 = {
  email: {
    label: "Correo electrónico",
    fieldName: "email",
    validators: [Validators.NotEmptyString(), 
                Validators.TestRegex(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)],
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
  paper2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatar2: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  inputFile: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1",
},
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(7),
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gri: {
    marginTop: theme.spacing(4)
  },
  circularSpace: {
    marginRight: theme.spacing(1)
  }
});

class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      toasterProducts: null,
      accountId: this.props.match.params.accountId,
      isSubmitting: false
    }
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];

    // eslint-disable-next-line
    this.state.values["picture"] = image;

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function() {
        let preview = document.getElementById('preview'),
          image = document.createElement('img');
          image.className = 'MuiAvatar-img';
          image.src = reader.result;
          preview.innerHTML = '';
          preview.append(image);
    };
  }


  componentDidMount() {
    UsersService.getToasterProfile(this.props.match.params.accountId).then((response) => {
      this.setState({
      ...this.getDefaultState(response.data),
      user: response.data,
    })
    })

    UsersService.getToasterProducts(this.props.match.params.accountId).then((response) => {
      this.setState({
      toasterProducts: response.data,
    })
    })

  }
  getDefaultState(user) {
    let state = {
        values: {},
        errors: {},
        formCorrect: true
    };

    if(Object.keys(user).length === 0 && user.constructor === Object) {
      Object.values(fields).forEach((field) => {
        state.values[field.fieldName] = "";
        state.errors[field.fieldName] = "";
      });
    } else {
      Object.values(fields).forEach((field) => {
        state.values[field.fieldName] = user[field.fieldName];
        state.errors[field.fieldName] = "";
      });
      Object.values(fields2).forEach((field) => {
        if(field.fieldName === "password" || field.fieldName === "password2") {
          state.values[field.fieldName] = "";
          state.errors[field.fieldName] = "";
        } else {
          state.values[field.fieldName] = user.account[field.fieldName];
          state.errors[field.fieldName] = "";
        }
      });
    }
    return state;
}

submitDone() {
    this.setState({ isSubmitting: false });
    this.props.history.push(`/toasters/${this.state.accountId}`);
}

submitForm = (e) => {
    e.preventDefault();
    const accountId = this.state.accountId;
    const body = this.state.values;

    if(this.state.values["password"] !== "") {
      if(this.state.values["password"] !== this.state.values["password2"]) {
      store.dispatch(startSnackBar("error", "Las contraseñas no coinciden"));
      } else {
        this.setState({ isSubmitting: true });
        const action = UsersService.updateToasterProfile;
          
        action(accountId, body)
          .then(() => this.submitDone())
          .catch(() => this.submitDone());
      }
    } else {
      this.setState({ isSubmitting: true });
      const action = UsersService.updateToasterProfile;
      
      action(accountId, body)
        .then(() => this.submitDone())
        .catch(() => this.submitDone());
    }
}


checkFormCorrect(state) {
  let result1 = Object.values(fields).reduce((ac, v) => {
    return state.errors[v.fieldName] !== ""
      ? false
      : ac;
  }, true);
  let result2 = Object.values(fields2).reduce((ac, v) => {
    return state.errors[v.fieldName] !== ""
      ? false
      : ac;
  }, true);

  let res = true;

  if(result1 === false || result2 === false){
    res = false
  }
  console.log(state)
  return res;
}

setField(field, e) {
    this.setState(prevState => {
        let newState = prevState;
        newState.values[field.fieldName] = e.target.value;
        newState.errors[field.fieldName] = Validators.validate(field.validators, e.target.value);

        newState.formCorrect = this.checkFormCorrect(newState);
        return newState;
    });
}

render() {

  const { classes, account, loading } = this.props;

  return (
      <div>
      {this.state.user ?
        <Container component="main" maxWidth="lg">
          <div className={classes.paper}>
            <Grid container spacing={4}>

              {(this.state.user.account._id === account._id) ?
              <Fragment>
                <Grid item xs={3} className={classes.gri}>
                  <form className={classes.form} onSubmit={this.submitForm} encType="multipart/form-data" noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography component="h1" variant="h6">
                          Tu información
                        </Typography> <br/>
                        <TextField
                              variant="outlined"
                              autoComplete={fields.address.fieldName}
                              fullWidth
                              id={fields.address.fieldName}
                              label={fields.address.label}
                              name={fields.address.label}
                              value={this.state.values.address}
                              error={this.state.errors[fields.address.fieldName] !== ""}
                              helperText={this.state.errors[fields.address.fieldName]}
                              onChange={this.setField.bind(this, fields.address)}
                            />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id={fields2.email.fieldName}
                          label={fields2.email.label}
                          name={fields2.email.label}
                          value={this.state.values.email}
                          error={this.state.errors[fields2.email.fieldName] !== ""}
                          helperText={this.state.errors[fields2.email.fieldName]}
                          onChange={this.setField.bind(this, fields2.email)}
                          autoComplete={fields2.email.fieldName}
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
                          value={this.state.values.name}
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
                          value={this.state.values.description}
                          error={this.state.errors[fields.description.fieldName] !== ""}
                          helperText={this.state.errors[fields.description.fieldName] ? this.state.errors[fields.description.fieldName] : "20 caracteres como mínimo"}
                          onChange={this.setField.bind(this, fields.description)}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.paper2}>
                          <Avatar alt="avatar" src={this.state.values.pictureUrl} id="preview" className={classes.avatar2}/> 
                          <input
                            className={classes.inputFile}
                            accept="image/*"
                            id="picture"
                            name="picture"
                            type="file"
                            onChange={ this.handleImageChange }
                          />
                          <label htmlFor="picture">
                            <Button variant="contained" color="primary" component="span">
                              Elegir imagen
                            </Button>
                          </label>
                        </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id={fields.phoneNumber.fieldName}
                          label={fields.phoneNumber.label}
                          name={fields.phoneNumber.label}
                          value={this.state.values.phoneNumber}
                          error={this.state.errors[fields.phoneNumber.fieldName] !== ""}
                          helperText={this.state.errors[fields.phoneNumber.fieldName] ? this.state.errors[fields.phoneNumber.fieldName] : "Formato: XXXXXXXXX"}
                          onChange={this.setField.bind(this, fields.phoneNumber)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id={fields.facebookUrl.fieldName}
                          label={fields.facebookUrl.label}
                          name={fields.facebookUrl.label}
                          value={this.state.values.facebookUrl}
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
                          value={this.state.values.instagramUrl}
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
                          value={this.state.values.twitterUrl}
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
                          required
                          fullWidth
                          name={fields2.password.label}
                          label={fields2.password.label}
                          type="password"
                          id={fields2.password.fieldName}
                          value={this.state.values.password}
                          error={this.state.errors[fields2.password.fieldName] !== ""}
                          helperText="6 caracteres como mínimo"
                          onChange={this.setField.bind(this, fields2.password)}
                          autoComplete="current-password"
                        />
                      </Grid> 
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name={fields2.password2.label}
                          label={fields2.password2.label}
                          type="password"
                          id={fields2.password2.fieldName}
                          value={this.state.values.password2}
                          error={this.state.errors[fields2.password2.fieldName] !== ""}
                          helperText={this.state.errors[fields2.password2.fieldName]}
                          onChange={this.setField.bind(this, fields2.password2)}
                        />
                      </Grid>
                    </Grid>
                    <div className={classes.paper2}>
                      {this.state.isSubmitting ?
                        <div>
                          <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          disabled
                          >
                          <CircularProgress size="1.5rem" className={classes.circularSpace} /> <EditIcon/> Actualizando perfil
                          </Button> <br/>
                        </div>
                        :
                        <div>
                          <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          disabled={!this.state.formCorrect}
                          >
                          <EditIcon/> Actualizar perfil
                          </Button> <br/>
                        </div>
                      }
                      </div>
                  </form>             
                </Grid>
                
                <Grid item xs={9}>
                  <ToasterTemplate loading={loading} user={this.state.user} toasterProducts={this.state.toasterProducts}/>
                </Grid>
              </Fragment>
        
              : 
              
              <Container component="main" maxWidth="md">
                <ToasterTemplate loading={loading} user={this.state.user} toasterProducts={this.state.toasterProducts}/>
              </Container>
              }
              
            </Grid>
          </div>
        </Container>
      :
        <Skeleton variant="rect" height={"90vh"} />
      }
      </div>
          
    
  );
};

}

const mapStateToProps = state => {
  return {
    account: state.AuthReducer.account || {},
  }
};

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Toaster)));