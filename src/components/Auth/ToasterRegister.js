import React from 'react';
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

export default function ToasterRegister() {
  const classes = useStyles();

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
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
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
                id="description"
                label="Descripción"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="phoneNumber"
                name="phoneNumber"
                variant="outlined"
                fullWidth
                id="phoneNumber"
                label="Número de teléfono"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                fullWidth
                id="address"
                label="Dirección postal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="socialNetworks"
                variant="outlined"
                fullWidth
                id="socialNetworks"
                label="Redes sociales"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="pictureUrl"
                variant="outlined"
                fullWidth
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
                id="password"
                autoComplete="current-password"
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