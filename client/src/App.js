import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Overview = lazy(() => import("./routes/Overview"));
const Posts = lazy(() => import("./routes/Posts"));
const Settings = lazy(() => import("./routes/Settings"));

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="nav">
                    <NavLink className="nav__link" exact to="/">
                        Overview
                    </NavLink>

                    <NavLink className="nav__link" to="/posts">
                        Posts
                    </NavLink>

                    <NavLink className="nav__link" to="/settings">
                        Settings
                    </NavLink>
                </nav>

                <CssBaseline />
                <Container maxWidth="lg">
                    <Suspense fallback={<div>Carregando...</div>}>
                        <Switch>
                            <Route path="/posts">
                                <Posts />
                            </Route>
                            <Route path="/settings">
                                <Settings />
                            </Route>
                            <Route path="/">
                                <Overview test="" />
                            </Route>
                        </Switch>
                    </Suspense>
                </Container>
            </div>
        </Router>
    );
}

export default App;
