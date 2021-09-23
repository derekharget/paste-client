import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Redirect, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AuthService from "../../_services/Auth/AuthService";
import PasteAPI from "../../_api/Pastes/Paste";

const EditPaste = () => {
    const {register, handleSubmit, setValue} = useForm();
    const [isError, setIsError] = useState(false);

    const [successPaste, setSuccessPaste] = useState(false);
    const [newPasteURL, setNewPasteURL] = useState('');
    const queryClient = useQueryClient();
    const {id} = useParams();


    const {
        data: originalPaste,
        isLoading: originalLoading,
        isError: originalError,
        isSuccess: originalSuccess
    } = useQuery(['editPaste', id], async () => {
        const data = await PasteAPI.getPaste(id);
        console.log(data);
        setValue('title', data.title);
        setValue('paste', data.paste);
        return data;
    }, {
        retry: false,
        refetchOnWindowFocus: false, // Disable reload on focus
        cacheTime: 0
    });


    const {mutate, isLoading} = useMutation(async (pasteData) => {
        return await PasteAPI.updatePaste(id, pasteData);
    }, {
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
            {!AuthService.handle_getCurrentUser() && <Redirect to="/login"/>}
            {successPaste && <Redirect to={`/paste/${newPasteURL}`}/>}


            {originalLoading && <p>Loading</p>}
            {originalSuccess && (
                <Box sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>

                    <Typography variant="h4">Edit Paste - ID: {originalPaste.slug}</Typography>


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


                        {originalError && isError &&
                        <Typography variant="subtitle2" sx={{color: 'red'}}>Error Occurred Processing Your
                            Request</Typography>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, maxWidth: {sm: '100%', md: '50%'}}}
                        >
                            {!isLoading && (`Edit Paste`)}
                            {isLoading && (
                                <CircularProgress
                                    sx={{color: 'white', alignItems: 'left'}}
                                    size={20}
                                />
                            )}
                        </Button>
                    </Box>

                </Box>
            )}
        </>
    );
};

export default EditPaste;
