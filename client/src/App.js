import "./App.css";
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Cookies from 'js-cookie';
import axios from 'axios';

const Overview = lazy(() => import("./routes/Overview"));
const SignIn = lazy(() => import("./routes/SignIn"));

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: document.cookies ? true : false,
            currentUser: null,
        }
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

    render() {
        return (
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
        );
    }
}

export default App;
