import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Overview = lazy(() => import("./routes/Overview"));

function App() {
    return (
        <Router>
            <div className="App">
                <CssBaseline />
                <Container maxWidth="lg">
                    <Suspense fallback={<div>Carregando...</div>}>
                        <Switch>
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
