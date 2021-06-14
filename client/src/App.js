import "./App.css";
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Overview = lazy(() => import("./routes/Overview"));
const SignIn = lazy(() => import("./routes/SignIn"));

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: document.cookies ? true : false,
            currentUser: null,
        };
    }

    fetchAuthenticatedUser() {
        return axios.get(
            '//localhost:3001/api/currentUser',
            {
                credentials: 'same-origin',
                withCredentials: true,
            }
        )
            .then(response => {
                this.setState({
                    currentUser: response.data,
                    isAuthenticated: true
                });
            })
            .catch(error => {
                console.log('User not authenticated');
            });
    }

    async componentDidMount() {
        await this.fetchAuthenticatedUser();
    }

    renderLoginButton() {
        if (!this.state.isAuthenticated) {
            return (
                <Button
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="inherit"
                    endIcon={<AccountCircleIcon />}
                >
                    Entrar com Google
                </Button>
            );
        }
        return (
            <div>
                <Button
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleLogout}
                    color="inherit"
                    endIcon={<ExitToAppIcon />}
                >
                    Sair
                </Button>
            </div>);
    }

    handleClick() {
        window.location = "//localhost:3001/auth/google";
    }

    handleLogout() {
        window.location = "//localhost:3001/logout";
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                            Processa Processos
                        </Typography>
                        {this.renderLoginButton()}
                    </Toolbar>
                </AppBar>
                <Container style={{ flex: 1 }}>
                    <Router>
                        <div className="App">
                            <CssBaseline />
                            <Container maxWidth="lg">
                                <Suspense fallback={<div>Carregando...</div>}>
                                    <Switch>
                                        <Route path="/login">
                                            <SignIn />
                                        </Route>
                                        <Route
                                            render={props => (
                                                this.state.isAuthenticated ?
                                                    <Overview rows={this.state.currentUser.lawsuits} /> :
                                                    <SignIn />
                                            )}
                                        />
                                    </Switch>
                                </Suspense>
                            </Container>
                        </div>
                    </Router>
                </Container>
            </div>
        );
    }
}

export default App;
