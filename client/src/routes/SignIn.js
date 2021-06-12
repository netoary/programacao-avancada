import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import GoogleButton from 'react-google-button';
import background from "./../assets/bg.jpeg"
import { ReactComponent as Logo } from './../assets/logo_pa.svg';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // margin: 0,
    backgroundRepeat: 'no-repeat',
    opacity: 1,
  },
  image: {
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[600] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,  
    // elevation: 5

  },
  avatar: {
    margin: theme.spacing(10, 0, 1),
    backgroundColor: theme.palette.secondary.main,
  },
  logo: {
    margin: theme.spacing(5, 0, 3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(10),
  },
  google: {
    margin: theme.spacing.mx = "auto",
  },
  title: {
    margin: theme.spacing.mx = "auto",
    color: theme.palette.grey[900],
  },
  main: {
    height: '77vh',
  },
  footertext: {
    color: theme.palette.grey[900],
  },
  footer: {
    padding: theme.spacing(5, 3),
    //marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? green[300] : theme.palette.grey[900],
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const handleClick = () => {
      window.location = "//localhost:3001/auth/google";
  }

  return (
    <div className={classes.root} >
    <Grid container component="main" className={classes.main} >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
          {/* <Typography component="h1" variant="h1" className={classes.title} >
            Processa Processo
          </Typography> */}
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <div className={classes.logo}>
            <Logo />
            <Typography component="h1" variant="h1" className={classes.title} >
            Processa Processo
          </Typography>
            </div>
            <div className={classes.google}>
          <GoogleButton id="loginBttn "
            onClick={() => {handleClick()}}
          />
            </div>   
        </div>
      </Grid>
      </Grid>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Typography variant="body1" className={classes.footertext}>
              O Processa Processo é feito para advogados, estagiários e demais operadores do Direito,
                cuja carteira de processos para acompanhamento seja muito grande. <br />
              O PP automatiza as consultas da movimentação (ou “do andamento”) dos processos. 
               <br /> <br /> 
              Copyright © Processa Processo 2021.</Typography>
        </Container>
      </footer>
    </div>
  );
}