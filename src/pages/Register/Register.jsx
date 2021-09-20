import React from 'react';
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";

const Register = () => {
    return (
        <Box sx={{width: '100%', bgcolor: '#cfe8fc', }}>
            <TextField
                required
                id="outlined-required"
                label="Username"
            />

            <TextField
                required
                id="email"
                label="Email"
                type="email"
            />


            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
            />
        </Box>
    );
};

export default Register;
