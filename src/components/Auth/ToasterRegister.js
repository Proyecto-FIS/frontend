import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";
import { registerToaster } from "../../redux/actions/authToaster";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputAdornment from '@material-ui/core/InputAdornment';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

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

const ToasterRegister = () => {
  
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    description: '',
    phoneNumber: '',
    address: '',
    instagramUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    pictureUrl: '',
    password: '',
    password2: ''
  });

  const dispatch = useDispatch();

  const accountLogin = useSelector(state => state.AuthReducer);

  const { loading, error, account } = accountLogin;

  const {username, email, name, description, phoneNumber, address,
     instagramUrl, facebookUrl, twitterUrl, pictureUrl, password, password2} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if(password !== password2) {
      dispatch(startSnackBar("error", "Las contraseñas no coinciden"));

     } else {
      dispatch(registerToaster({ username, email, name, description, phoneNumber, address, instagramUrl, facebookUrl, twitterUrl, pictureUrl, password }));
    }
  };

  if(account) {
    return <Redirect to="/"/>
  }

  if(error) {
    dispatch(startSnackBar("error", error));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse como toaster
        </Typography>

        <form className={classes.form} onSubmit={onSubmit} noValidate>
        {loading && <CircularProgress /> }
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                value={username}
                onChange={onChange}
                id="username"
                label="Nombre de usuario"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={onChange}
                id="name"
                label="Nombre profesional"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="description"
                name="description"
                variant="outlined"
                required
                multiline
                rows={5}
                fullWidth
                value={description}
                onChange={onChange}
                id="description"
                label="Descripción"
                helperText="20 palabras como mínimo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="phoneNumber"
                name="phoneNumber"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={onChange}
                id="phoneNumber"
                label="Número de teléfono"
                helperText="Formato: XXXXXXXXX"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={onChange}
                id="address"
                label="Dirección postal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="facebookUrl"
                variant="outlined"
                fullWidth
                value={facebookUrl}
                onChange={onChange}
                id="facebookUrl"
                label="Perfil de Facebook"
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
                name="instagramUrl"
                variant="outlined"
                fullWidth
                value={instagramUrl}
                onChange={onChange}
                id="instagramUrl"
                label="Perfil de Instagram"
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
                name="twitterUrl"
                variant="outlined"
                fullWidth
                value={twitterUrl}
                onChange={onChange}
                id="twitterUrl"
                label="Perfil de Twitter"
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
                autoComplete="fname"
                name="pictureUrl"
                variant="outlined"
                fullWidth
                value={pictureUrl}
                onChange={onChange}
                id="pictureUrl"
                label="URL de una imagen"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange={onChange}
                id="email"
                label="Correo electrónico"
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
                value={password}
                onChange={onChange}
                id="password"
                autoComplete="current-password"
                helperText="6 caracteres como mínimo"
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
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarme
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Tienes una cuenta? Identifícate
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default ToasterRegister;