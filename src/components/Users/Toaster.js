import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import startSnackBar from "../../redux/actions/SnackBar/startSnackBar";

import {getToasterProfile, updateToasterProfile} from "../../redux/actions/authToaster";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputAdornment from '@material-ui/core/InputAdornment';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import CircularProgress from '@material-ui/core/CircularProgress';

import ToasterTemplate from "./ToasterTemplate";
import ToasterTemplateLogout from "./ToasterTemplateLogout";

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
  chip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gri: {
    marginTop: theme.spacing(3)
  }
}));

const Toaster = () => {

  const classes = useStyles();
  const params = useParams();

  const dispatch = useDispatch();

  const accountLogin = useSelector(state => state.AuthReducer);

  const toasterProfile = useSelector(state => state.ProfileReducer);
  const { loading, error, user } = toasterProfile;

  
  const {account: accFromUser} = user;

  const { account } = accountLogin || {};

  useEffect(() => {

    dispatch(getToasterProfile(params.accountId));

    if(accFromUser) {
        setEmail(user.account.email)
        setName(user.name)
        setDescription(user.description)
        setPhoneNumber(user.phoneNumber)
        setAddress(user.address)
        setInstagramUrl(user.instagramUrl)
        setFacebookUrl(user.facebookUrl)
        setTwitterUrl(user.twitterUrl)
        setPictureUrl(user.pictureUrl)
    }

  }, [dispatch, params, user.address]);
  
  if(error) {
    dispatch(startSnackBar("error", error));
  }


  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')


  const onSubmit = async (e) => {
    e.preventDefault();

    if(password !== password2) {
      dispatch(startSnackBar("error", "Las contraseñas no coinciden"));
    } else {
      dispatch(updateToasterProfile({id: params.accountId, email, name, description, phoneNumber, address, instagramUrl, facebookUrl, twitterUrl, pictureUrl, password}));
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
        <ToasterTemplateLogout user={user}/>
      </Container>
    )
  }


  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>

        {loading && <CircularProgress /> }

        <Grid container spacing={4}>

          {accFromUser._id === account._id ?
          <Fragment>
          <Grid item xs={3}>
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
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="phoneNumber"
                    label="Número de teléfono"
                    helperText="Formato: XXXXXXXXX"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="facebookUrl"
                    variant="outlined"
                    fullWidth
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
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
                    onChange={(e) => setInstagramUrl(e.target.value)}
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
                    autoComplete="fname"
                    name="twitterUrl"
                    variant="outlined"
                    fullWidth
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
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

                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Editar perfil
                </Button>

              </Grid>

            </form>
           
          </Grid>

          <Grid className={classes.gri} item xs={9}>
              <ToasterTemplate user={user}/>
          </Grid>

          </Fragment>
          
          : 
          
          <Container component="main" maxWidth="md">
            <ToasterTemplateLogout user={user}/>
          </Container>
        }
          
        </Grid>
      </div>
    </Container>
  );
};

export default Toaster;