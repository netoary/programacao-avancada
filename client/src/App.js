import logo from "./logo.svg";
import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

const Dashboard = lazy(() => import("./routes/Dashboard"));
const Posts = lazy(() => import("./routes/Posts"));
const Settings = lazy(() => import("./routes/Settings"));

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="nav">
                    <NavLink className="nav__link" exact to="/">
                        Dashboard
                    </NavLink>

                    <NavLink className="nav__link" to="/posts">
                        Posts
                    </NavLink>

                    <NavLink className="nav__link" to="/settings">
                        Settings
                    </NavLink>
                </nav>

                <Suspense fallback={<div>carregando...</div>}>
                    <Switch>
                        <Route path="/posts">
                            <Posts />
                        </Route>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
