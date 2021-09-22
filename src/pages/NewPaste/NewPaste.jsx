import React, {useState} from 'react';
import Auth from "../../hooks/Auth/Auth";
import {Redirect} from "react-router-dom";
import Box from "@mui/material/Box";
import {CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

const NewPaste = () => {
    const {register, handleSubmit} = useForm();
    const [isError, setIsError] = useState(false);

    const [successPaste, setSuccessPaste] = useState(false);
    const [newPasteURL, setNewPasteURL] = useState('');
    const queryClient = useQueryClient();

    const { access_token: userToken} = Auth.getCurrentUser();

    const newPaste = data => {
        return axios.post("http://localhost:8000/api/paste", data, { headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }}).then((response) => {
            return response.data;
        });
    };


    const {mutate, isLoading} = useMutation(newPaste, {
        onSuccess: data => {
            //console.log(data);
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
        //console.log(data);
    }

    return (
        <>
            {!Auth.getCurrentUser() && <Redirect to="/login" />}
            {successPaste && <Redirect to={`/paste/${newPasteURL}`} />}
            <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>

                <Typography variant="h4">New Paste</Typography>


                <Box sx={{maxWidth: 'md', bgcolor: '#cfe8fc', mt: 4}} component="form"
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
                        {!isLoading && (`Sign In`)}
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
