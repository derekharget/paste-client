import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import Box from "@mui/material/Box";
import {CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import AuthService from "../../_services/Auth/AuthService";
import PasteAPI from "../../_api/Pastes/Paste";

const NewPaste = () => {
    const {register, handleSubmit} = useForm();
    const [isError, setIsError] = useState(false);

    const [successPaste, setSuccessPaste] = useState(false);
    const [newPasteURL, setNewPasteURL] = useState('');
    const queryClient = useQueryClient();


    const {mutate, isLoading} = useMutation(PasteAPI.newPaste, {
        onSuccess: data => {
            setIsError(false);
            setNewPasteURL(data.data.slug);
            setSuccessPaste(true);
        },
        onError: () => {
            setIsError(true);
            setSuccessPaste(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });


    const onSubmit = data => {
        mutate(data);
    }

    return (
        <>
            {!AuthService.handle_getCurrentUser() && <Redirect to="/login" />}
            {successPaste && <Redirect to={`/paste/${newPasteURL}`} />}
            <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>

                <Typography variant="h4">New Paste</Typography>


                <Box sx={{maxWidth: 'md', mt: 4}} component="form"
                     onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        {...register("title")}
                        label="Title"
                        autoComplete="off"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Paste"
                        required
                        multiline
                        fullWidth
                        {...register("paste")}
                        rows={4}
                    />




                    {isError && <Typography variant="subtitle2" sx={{ color: 'red'}}>Error Occurred Processing Your Request</Typography>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, maxWidth: {sm: '100%', md: '50%'}}}
                    >
                        {!isLoading && (`Make New Paste`)}
                        {isLoading && (
                            <CircularProgress
                                sx={{color: 'white', alignItems: 'left'}}
                                size={20}
                            />
                        )}
                    </Button>
                </Box>

            </Box>
        </>
    );
};

export default NewPaste;
