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
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {formatDistance} from "date-fns";
import PasteAPI from "../../_api/Pastes/Paste";


const RecentPasteLink = styled(Link)({
    textDecoration: 'none',
    color: 'black',
});


const RecentPastes = () => {

    const {
        data: recentPastes,
        isLoading,
        isError,
        isSuccess
    } = useQuery('latestPastes', PasteAPI.getLatestPosts, {
        retry: false,
        refetchOnWindowFocus: false, // Disable reload on focus
        cacheTime: 1000 * 60 * 15 //Cache results for 15 Minutes
    });


    const cutTitleShort = (title) => {
        if(title.length < 12) return title;

        return title.substring(0, 12) + '...';
    }

    return (
        <Box sx={{width: '100%'}}>
            <Typography variant="h5">Recent Pastes</Typography>

            {isLoading && (<Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%'
                }}><CircularProgress/></Box>)}

            {isSuccess && !isError && (
                <TableContainer>
                    <Table sx={{minWidth: 250}} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Ago</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentPastes.map((paste) => (
                                <TableRow
                                    key={paste.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell>
                                        <RecentPasteLink
                                            to={`/paste/${paste.slug}`}
                                        >
                                            {cutTitleShort(paste.title)}
                                        </RecentPasteLink>
                                    </TableCell>
                                    <TableCell>{formatDistance(new Date(paste.updated_at), new Date(), {
                                        addSuffix: true
                                    })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
;

export default RecentPastes;
