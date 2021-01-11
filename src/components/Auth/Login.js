import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';

import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";
import UsersService from "../../services/UsersService";

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

import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
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
    marginRight: theme.spacing(3)
  }
}));

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const {username, password} = formData;

  const dispatch = useDispatch();

  const classes = useStyles();

  const accountLogin = useSelector(state => state.AuthReducer);
  const { loading, error, account } = accountLogin;

  if(account) {
    return <Redirect to="/"/>
  }

  if(error) {
    dispatch(startSnackBar("error", error));
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const body = JSON.stringify({ username, password });
    UsersService.login(body);
  };

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

        <form className={classes.form} onSubmit={onSubmit} noValidate>
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            value={username}
            onChange={onChange}
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            autoComplete="current-password"
          />
          {loading ? 
              <div>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled
              >
                <CircularProgress className={classes.circularSpace} /> Entrar
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
              >
                Entrar
              </Button> 
            </div>
           }
          
          <Grid container>
            <Grid item>
            ¿No tienes cuenta? Regístrate {' '}
              <Link component={RouterLink} to="/customer-register" variant="body2">
                {"como customer"}
              </Link>
              {' '} o {' '}
              <Link component={RouterLink} to="/toaster-register" variant="body2">
                {"como toaster"}
              </Link>
              .
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;