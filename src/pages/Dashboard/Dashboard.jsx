import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import Box from "@mui/material/Box";
import {CircularProgress, IconButton, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from "@mui/material/TableHead";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {red} from "@mui/material/colors";
import {useQuery} from "react-query";
import {formatDistance} from "date-fns";
import AuthService from '../../_services/Auth/AuthService';
import PasteAPI from "../../_api/Pastes/Paste";

const Dashboard = () => {
        const [pastes, setPastes] = useState([])


        const {
            isLoading,
            isError,
            isSuccess
        } = useQuery('usersPastes', async () => {
            const data = await PasteAPI.getLoggedInUsersPaste();
            setPastes(data);
        }, {
            retry: false,
            refetchOnWindowFocus: false, // Disable reload on focus
            cacheTime: 30 //Cache results for 30s
        });


        const deletePaste = async (pasteSlug) => {
            const response = await PasteAPI.deletePaste(pasteSlug);
            if (response.status === 200) {
                setPastes(pastes.filter(p => p.slug !== pasteSlug));
            }
        }


        return (
            <>
                {!AuthService.handle_getCurrentUser() && <Redirect to="/login"/>}

                <Box sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Typography variant="h4" sx={{mb: 2}}>Your Pastes</Typography>

                    {isLoading && (<Box
                        sx={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%'
                        }}><CircularProgress/></Box>)}

                    {isError && <p>Error Loading Pastes</p>}
                    {isSuccess && (
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 400, p: 4}} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Paste</TableCell>
                                        <TableCell align="right">When</TableCell>
                                        <TableCell align="right">Edit</TableCell>
                                        <TableCell align="right">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pastes.map((paste) => (
                                        <TableRow
                                            key={paste.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {paste.title}
                                            </TableCell>
                                            <TableCell
                                                align="right">{formatDistance(new Date(paste.updated_at), new Date(), {
                                                addSuffix: true
                                            })}</TableCell>
                                            <TableCell align="right"><IconButton component={Link}
                                                                                 to={`/edit/${paste.slug}`}>
                                                <EditIcon sx={{color: red[500]}}/>
                                            </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => {
                                                    deletePaste(paste.slug)
                                                }}>
                                                    <DeleteIcon sx={{color: red[500], cursor: 'pointer'}}/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </>
        );
    }
;

export default Dashboard;
