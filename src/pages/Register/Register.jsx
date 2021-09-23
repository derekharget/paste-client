import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import { Redirect } from "react-router-dom";

import AuthService from "../../_services/Auth/AuthService";
import AuthAPI from '../../_api/Auth/Auth';



const Register = () => {
    const {register, handleSubmit} = useForm();
    const [isError, setIsError] = useState(false);

    const queryClient = useQueryClient();


    const {mutate, isLoading} = useMutation(AuthAPI.register_api, {
        onSuccess: data => {
            window.location.reload(false);
            setIsError(false);
        },
        onError: () => {
            setIsError(true);
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });


    const onSubmit = data => {
        mutate(data);
    }


    return (
        <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>

            {AuthService.handle_getCurrentUser() && <Redirect to="/dashboard" />}

            <Typography variant="h4">Register</Typography>

            <Box sx={{maxWidth: 'md', mt: 4}} component="form"
                 onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    {...register("email")}
                    label="Email"
                    autoComplete="off"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    {...register("username")}
                    label="Username"
                    autoComplete="off"
                />




                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    {...register("password")}
                    autoComplete="current-password"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    {...register("password_confirmation")}
                    autoComplete="current-password"
                />


                {isError && <Typography variant="subtitle2" sx={{ color: 'red'}}>Error Occurred Processing Your Request</Typography>}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2, maxWidth: {sm: '100%', md: '50%'}}}
                >

                    {!isLoading && (`Register`)}
                    {isLoading && (
                        <CircularProgress
                            sx={{color: 'white', alignItems: 'left'}}
                            size={20}
                        />
                    )}
                </Button>
            </Box>
        </Box>
    );
};

export default Register;
