import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import Auth from "../../hooks/Auth/Auth";
import axios from "axios";
import {Redirect, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import { CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const EditPaste = () => {
    const {register, handleSubmit, setValue} = useForm();
    const [isError, setIsError] = useState(false);

    const [successPaste, setSuccessPaste] = useState(false);
    const [newPasteURL, setNewPasteURL] = useState('');
    const queryClient = useQueryClient();
    const {access_token: userToken} = Auth.getCurrentUser();

    const {id} = useParams();


    const {
        data: originalPaste,
        isLoading: originalLoading,
        isError: originalError,
        isSuccess: originalSuccess
    } = useQuery(['editPaste', id], async () => {
        const {data} = await axios.get(`http://localhost:8000/api/paste/${id}`);
        setValue('title', data.data.title);
        setValue('paste', data.data.paste);
        return data.data;
    }, {
        retry: false,
        refetchOnWindowFocus: false, // Disable reload on focus
        cacheTime: 0
    });


    const updatePaste = data => {
        return axios.patch(`http://localhost:8000/api/paste/${id}`, data, {
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
        }).then((response) => {
            return response.data;
        });
    };


    const {mutate, isLoading} = useMutation(updatePaste, {
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
        console.log(data);
    }

    return (
        <>
            {!Auth.getCurrentUser() && <Redirect to="/login"/>}
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


                        {originalError && isError && <Typography variant="subtitle2" sx={{color: 'red'}}>Error Occurred Processing Your
                            Request</Typography>}

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
            )}
        </>
    );
};

export default EditPaste;
