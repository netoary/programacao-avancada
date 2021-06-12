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
import { purple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  image: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[600] : theme.palette.grey[900],
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
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(10, 0, 1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(10),
  },
  title: {
    margin: theme.spacing.mx = "auto",
    color: theme.palette.grey[100],
  },
  main: {
    height: '77vh',
  },
  footertext: {
    color: theme.palette.grey[100],
  },
  footer: {
    padding: theme.spacing(3, 2),
    //marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? purple[700] : theme.palette.grey[900],
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container component="main" className={classes.main}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
          <Typography component="h1" variant="h1" className={classes.title}>
            Processa Processo
          </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Link
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            href="//localhost:3001/auth/google"
          >
            Sign in with Google
          </Link>
        </div>
      </Grid>
      </Grid>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" className={classes.footertext}>
              O Processa Processo é para advogados, estagiários e demais operadores do Direito,
                cuja carteira de processos para acompanhamento seja muito grande. <br />
              O PP automatiza as consultas da movimentação (ou “do andamento”) dos processos. 
               <br /> <br /> 
              Copyright © Processa Processo 2021.</Typography>
        </Container>
      </footer>
    </div>
  );
}