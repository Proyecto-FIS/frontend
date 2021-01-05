import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";

import {getCustomerProfile, updateCustomerProfile} from "../../redux/actions/authCustomer";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
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
}));

const Customer = () => {

  const classes = useStyles();
  const params = useParams();

  const dispatch = useDispatch();

  const accountLogin = useSelector(state => state.AuthReducer);

  const customerProfile = useSelector(state => state.ProfileReducer);
  const { loading, error, user } = customerProfile;

  
  const {account: accFromUser} = user;

  const { account } = accountLogin || {};

  useEffect(() => {

    dispatch(getCustomerProfile(params.accountId));

    if(accFromUser) {
        setAddress(user.address)
        setEmail(user.account.email)
        setPictureUrl(user.pictureUrl)
    }

  }, [dispatch, params, user.address]);
  
  if(error) {
    dispatch(startSnackBar("error", error));
  }


  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')


  const onSubmit = async (e) => {
    e.preventDefault();

    if(password !== password2) {
      dispatch(startSnackBar("error", "Las contraseñas no coinciden"));
    } else {
      dispatch(updateCustomerProfile({id: params.accountId, email, address, pictureUrl, password}));
    }
  };


  
  if(!accFromUser) {
    return (
      <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>

        {user.pictureUrl ?
        <Avatar alt={user.account.username} src={user.pictureUrl} /> :
        <Avatar className={classes.avatar}>
        </Avatar>
        }
          </div>
       </Container>
    )
  }

  if(!account) {
    return (
      <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>

        {user.pictureUrl ?
        <Avatar alt={user.account.username} src={user.pictureUrl} /> :
        <Avatar className={classes.avatar}>
        </Avatar>
        }
          <Typography component="h1" variant="h5">
          {user.account.username }
        </Typography>
          </div>
       </Container>
    )
  }


  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>

        {user.pictureUrl ?
        <Avatar alt={user.account.username} src={user.pictureUrl} /> :
        <Avatar className={classes.avatar}>
        </Avatar>
        }
        
        <Typography component="h1" variant="h5">
          { accFromUser.username }
        </Typography>

        {loading && <CircularProgress /> }
          <Grid container spacing={2}>

            <Grid item xs={3}>
            {accFromUser._id === account._id &&

              <form className={classes.form} onSubmit={onSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <Typography component="h1" variant="h6">
                  Tu información
                </Typography> <br/>
                    <TextField
                      autoComplete="address"
                      name="address"
                      variant="outlined"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                      label="Dirección postal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="pictureUrl"
                      variant="outlined"
                      fullWidth
                      value={pictureUrl}
                      onChange={(e) => setPictureUrl(e.target.value)}
                      id="pictureUrl"
                      label="URL de una imagen"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Correo electrónico"
                      type="email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password2"
                      label="Repita la contraseña"
                      type="password"
                      id="password2"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Editar perfil
                </Button>

              </form>
            }
              
            </Grid>
            
          </Grid>
      </div>
    </Container>
  );
};

export default Customer;