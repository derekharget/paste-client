import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/PlaylistAddCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

import {Link} from 'react-router-dom';
import {styled} from '@mui/styles';
import Auth from "../../hooks/Auth/Auth";


const Logo = styled(Link)({
    textDecoration: 'none',
    color: 'white',
});


const Navbar = () => {
    //const [isLoggedIn, setIsLoggedIn, ] = useState(false);

    // useEffect(() => {
    //     if(Auth.getCurrentUser()){
    //         setIsLoggedIn(true);
    //     } else {
    //         setIsLoggedIn(false);
    //     }
    //     console.log('data');
    // }, );

    return (
        <>
            <div>
                <header>
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position="static">
                            <Toolbar>
                                {/*<IconButton*/}
                                {/*    size="large"*/}
                                {/*    edge="start"*/}
                                {/*    color="inherit"*/}
                                {/*    aria-label="menu"*/}
                                {/*    sx={{mr: 2}}*/}
                                {/*>*/}
                                {/*    <MenuIcon/>*/}
                                {/*</IconButton>*/}
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    <Logo to="/">
                                        Pastebin
                                    </Logo>

                                </Typography>

                                {Auth.getCurrentUser() ? (
                                    <>
                                        <Button to="/dashboard" component={Link} color="inherit"
                                                startIcon={<DashboardIcon/>} sx={{mr: 3}}>Dashboard</Button>
                                        <Button to="/register" component={Link} color="inherit" variant="outlined"
                                                startIcon={<LogoutIcon/>}>Logout</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button to="/login" component={Link} color="inherit"
                                                startIcon={<LoginIcon/>} sx={{mr: 3}}>Login</Button>
                                        <Button to="/register" component={Link} color="inherit" variant="outlined"
                                                startIcon={<RegisterIcon/>}>Register</Button>
                                    </>
                                )}
                            </Toolbar>
                        </AppBar>
                    </Box>
                </header>
            </div>
        </>
    );
};

export default Navbar;
