import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link} from "react-router-dom";
import {styled} from "@mui/styles";


const dummyPasteData = [
    {slug: 'ZCDLCYgW', name: 'PHP class', date: '3 Minutes Ago'},
    {slug: 'IEZoUu8w', name: 'Python class', date: '3 Minutes Ago'},
    {slug: 'v646nOVs', name: 'C class', date: '3 Minutes Ago'},
    {slug: 'Zh1uuMyl', name: 'hello class', date: '3 Minutes Ago'},
    {slug: '4bN1BV5k', name: 'C# class', date: '3 Minutes Ago'},
    {slug: '9fvJOIcN', name: 'React class', date: '3 Minutes Ago'},
    {slug: 'bAAKnals', name: 'Javascript class', date: '3 Minutes Ago'},
    {slug: 'FV5fGiJH', name: 'fd class', date: '3 Minutes Ago'},
    {slug: 'CZ6nu4Ca', name: 'sf class', date: '3 Minutes Ago'},
    {slug: '4yENlzys', name: '404 test', date: '3 Minutes Ago'}
];


const RecentPasteLink = styled(Link)({
    textDecoration: 'none',
    color: 'black',
});


const RecentPastes = () => {
    return (
        <Box sx={{width: '100%', bgcolor: '#cfe8fc'}}>
            <Typography variant="h5">Recent Pastes</Typography>

            <TableContainer>
                <Table sx={{minWidth: 250}} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Ago</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyPasteData.map((row) => (
                            <TableRow
                                key={row.slug}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>
                                    <RecentPasteLink
                                        to={`/paste/${row.slug}`}
                                    >
                                        {row.name}
                                    </RecentPasteLink>
                                </TableCell>
                                <TableCell>{row.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RecentPastes;
