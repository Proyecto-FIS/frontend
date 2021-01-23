import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../redux/store";

import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";

import UsersService from "../../services/UsersService";

import Validators from "../../utils/Validators";

import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import CircularProgress from '@material-ui/core/CircularProgress';

const fields = {
  address: {
    label: "Dirección postal",
    name: "address",
    validators: [Validators.TestRegex(/[\s\S]*/)]
  },
  pictureUrl: {
    label: "URL de Imagen",
    name: "pictureUrl",
    validators: [Validators.TestRegex(/^$|[\S\s]$/)],
  }
};

const fields2 = {
  email: {
    label: "Correo electrónico",
    name: "email",
    validators: [Validators.NotEmptyString(), 
                Validators.TestRegex(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)],
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
    width: theme.spacing(8),
    height: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  circularSpace: {
    marginRight: theme.spacing(1)
  }
});

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      accountId: this.props.match.params.accountId,
      isSubmitting: false,
      isSubmittingDelete: false,
      open: false
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
    UsersService.getCustomerProfile(this.props.match.params.accountId).then((response) => {
      
      this.setState({
      ...this.getDefaultState(response.data),
      user: response.data
  })
  })

  }

  componentDidUpdate() {
    if(this.state.user) {
      if(this.state.user.account._id !== this.props.match.params.accountId) {
        this.setState({ user:null, accountId:null })
        UsersService.getCustomerProfile(this.props.match.params.accountId).then((response) => {
          
          this.setState({
          ...this.getDefaultState(response.data),
          user: response.data,
          accountId: response.data.account._id
      })
      })
    }
  }
  }

  getDefaultState(user) {
    let state = {
        values: {},
        errors: {},
        formCorrect: true
    };

    if(Object.keys(user).length === 0 && user.constructor === Object) {
      Object.values(fields).forEach((field) => {
        state.values[field.name] = "";
        state.errors[field.name] = "";
      });
    } else {
      Object.values(fields).forEach((field) => {
        state.values[field.name] = user[field.name];
        state.errors[field.name] = "";
      });
      Object.values(fields2).forEach((field) => {
        if(field.name === "password" || field.name === "password2") {
          state.values[field.name] = "";
          state.errors[field.name] = "";
        } else {
          state.values[field.name] = user.account[field.name];
          state.errors[field.name] = "";
        }
      });
    }
    return state;
}

submitDone() {
    this.setState({ isSubmitting: false });
    
    this.setState(prevState => {
      let newState = prevState;

      newState.values.password = "";
      newState.values.password2 = "";

      return newState;

    });

    this.props.history.push(`/customers/${this.state.accountId}`);
}
deleteDone() {
  this.setState({open:false, isSubmittingDelete:false});
  UsersService.logOut();
  this.props.history.push("/");

}

handleDelete = () => {
  const accountId = this.state.accountId;
  const action = UsersService.deleteCustomer;
  this.setState({ isSubmittingDelete: true });
          
        action(accountId)
          .then(() => this.deleteDone())
          .catch(() => this.deleteDone());
};

submitForm = (e) => {
    e.preventDefault();
    const accountId = this.state.accountId;
    const body = this.state.values;

    if(this.state.values["password"] !== "") {
      if(this.state.values["password"] !== this.state.values["password2"]) {
      store.dispatch(startSnackBar("error", "Las contraseñas no coinciden"));
      } else {
        this.setState({ isSubmitting: true });
        const action = UsersService.updateCustomerProfile;
          
        action(accountId, body)
          .then(() => this.submitDone())
          .catch(() => this.submitDone());
      }
    } else {
      this.setState({ isSubmitting: true });
      const action = UsersService.updateCustomerProfile;
      
      action(accountId, body)
        .then(() => this.submitDone())
        .catch(() => this.submitDone());
    }
}


checkFormCorrect(state) {
  let result = Object.values(fields).reduce((ac, v) => {
    return state.errors[v.name] !== ""
      ? false
      : ac;
  }, true);
  result = Object.values(fields2).reduce((ac, v) => {
    return state.errors[v.name] !== ""
      ? false
      : ac;
  }, true);
  return result;
}

setField(field, e) {
    this.setState(prevState => {
        let newState = prevState;
        newState.values[field.name] = e.target.value;
        newState.errors[field.name] = Validators.validate(field.validators, e.target.value);

        if(newState.values["password"] === "") {
          newState.errors["password"] = "";
        }
        if(newState.errors["password"] === "" && newState.values["password2"] === "") {
          newState.errors["password2"] = "";
        }
        if(newState.errors["password"] === "" && newState.errors["password"] === "" && (newState.values["password"] !== newState.values["password2"])) {
          newState.errors["password2"] = "Las contraseñas no coinciden";
        }

        newState.formCorrect = this.checkFormCorrect(newState);
        return newState;
    });
}

handleClickOpen = () => {
  this.setState({open:true});
};

handleClose = () => {
  this.setState({open:false});
};


render() {

  const { classes, account, loading } = this.props;

  return (
    <Container component="main" maxWidth="md">

      {this.state.user ?
        <div>
          <div className={classes.paper}>
          <Avatar alt={this.state.user.account.username} src={this.state.user.pictureUrl} />

          <Typography component="h1" variant="h5">
            { this.state.user.account.username }
          </Typography>

          {loading && <CircularProgress /> }
          

              <Grid item xs={6}>

              {(this.state.user.account._id === account._id) &&
                
                <form className={classes.form} onSubmit={this.submitForm} encType="multipart/form-data" noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <br/><br/>
                      <Typography component="h1" variant="h6">
                        Tu información
                      </Typography> <br/>
                      <TextField
                        variant="outlined"
                        autoComplete={fields.address.name}
                        fullWidth
                        id={fields.address.name}
                        label={fields.address.label}
                        name={fields.address.label}
                        value={this.state.values.address}
                        error={this.state.errors[fields.address.name] !== ""}
                        helperText={this.state.errors[fields.address.name]}
                        onChange={this.setField.bind(this, fields.address)}
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
                        required
                        fullWidth
                        id={fields2.email.name}
                        label={fields2.email.label}
                        name={fields2.email.label}
                        value={this.state.values.email}
                        error={this.state.errors[fields2.email.name] !== ""}
                        helperText={this.state.errors[fields2.email.name]}
                        onChange={this.setField.bind(this, fields2.email)}
                        autoComplete={fields2.email.name}
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
                        id={fields2.password.name}
                        value={this.state.values.password}
                        error={this.state.errors[fields2.password.name] !== ""}
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
                        id={fields2.password2.name}
                        value={this.state.values.password2}
                        error={this.state.errors[fields2.password2.name] !== ""}
                        helperText={this.state.errors[fields2.password2.name]}
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

                  <Divider /> <br/>

                  <div className={classes.paper2}>
                    <Button
                    variant="contained"
                    color="secondary"
                    className={classes.delete}
                    onClick={this.handleClickOpen}
                    >
                     <DeleteIcon/> Borrar cuenta
                    </Button>
                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"¿Seguro que quieres eliminar tu cuenta?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Al eliminar tu cuenta se borrarán todos tus datos asociados y no podrás recuperarlos.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancelar
                        </Button>
                        <Button onClick={this.handleDelete} color="primary" disabled={this.state.isSubmittingDelete} autoFocus>
                          {this.state.isSubmittingDelete && 
                          <CircularProgress size="1.5rem" className={classes.circularSpace} />}
                            Sí, eliminar mi cuenta
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </form>
              }
                
              </Grid>
              
            
            </div>
        </div>

        :

        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
            <Skeleton variant="circle" width={40} height={40} />

            <Typography component="h1" variant="h5">
              <Skeleton variant="text" width="20vh" />
            </Typography>
          </div>
        </Container>
    }

    </Container>
  );

}
}

const mapStateToProps = state => {
  return {
    account: state.AuthReducer.account || {},
  }
};

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Customer)));