import React from 'react';
import Navbar from "./components/NavBar/NavBar.component";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Box from "@mui/material/Box";

//Imports for routing
import Index from './pages/Index/Index';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NewPaste from "./pages/NewPaste/NewPaste";
import Paste from "./pages/Paste/Paste";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";


const routes = [
    {path: '/', name: 'Home', Component: Index, exact: true},
    {path: '/register', name: 'Register', Component: Register, exact: false},
    {path: '/login', name: 'Login', Component: Login, exact: false},
    {path: '/dashboard', name: 'Dashboard', Component: Dashboard, exact: false},
    {path: '/new', name: 'NewPaste', Component: NewPaste, exact: true},
    {path: '/paste/:id', name: 'Paste', Component: Paste, exact: false},
    {path: '*', name: 'NotFound', Component: NotFound, exact: false},
];

function App() {
    return (

        <Box>
            <Router>
                <Navbar/>
                <Layout>
                    <Switch>
                        {
                            routes.map(({path, Component, exact}) => (
                                <Route key={path} path={path} exact={exact}>
                                    <Component/>
                                </Route>
                            ))
                        }
                    </Switch>
                </Layout>
            </Router>
        </Box>

    );
}

export default App;
