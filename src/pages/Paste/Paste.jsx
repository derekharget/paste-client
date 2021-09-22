import React from 'react';
import axios from 'axios';
import {useQuery} from "react-query";
import {useParams} from 'react-router-dom';
import NotFound from "../NotFound/NotFound";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import Highlight from 'react-highlight'

import PasteClass from './stackoverflow-light.css';
import {formatDistance} from "date-fns";

const Paste = () => {

    const {id} = useParams();


    const {
        data,
        isLoading,
        isError,
        isSuccess
    } = useQuery(['paste', id], async () => {
        const {data} = await axios.get(`http://localhost:8000/api/paste/${id}`);
        return data.data;
    }, {
        retry: false,
        refetchOnWindowFocus: false, // Disable reload on focus
        cacheTime: 1000 * 60 * 15 //Cache results for 15 Minutes
    });

    return (
        <>
            <Box sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                height: '300px',
                m: 2
            }}>

                {isLoading && (<Box
                    sx={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%'
                    }}><CircularProgress/></Box>)}
                {isError && (<NotFound/>)}
                {isSuccess && !isError && (
                    <Box sx={{ width: '100%'}}>
                        <Typography variant="h4">
                            {data.title}
                        </Typography>
                        <Typography variant="caption">
                            {formatDistance(new Date(data.created_at), new Date(), {
                                addSuffix: true
                            })}
                        </Typography>
                        <Box sx={{backgroundColor: '#f6f6f6', border: '1px solid black', overflow: 'auto', textAlign: 'left', p: 0, mt: 2}}>
                            <Highlight autodetect className={PasteClass}>
                                {data.paste}
                            </Highlight>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}

export default Paste;
