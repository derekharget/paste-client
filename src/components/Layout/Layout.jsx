import React from 'react';
import {Grid} from "@mui/material";
//import { styled } from '@mui/material/styles';
import RecentPastes from "../RecentPastes/RecentPastes";
import Box from "@mui/material/Box";


// const p = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Layout = (props) => {
    return (
        <>
            <Box sx={{backgroundColor: '#f5fdfe', mt: 2, height: '100vh'}}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8} lg={9}>
                        {props.children}
                    </Grid>
                    <Grid item sx={{display: {xs: 'none', sm: 'none', md: 'block'}}} md={4} lg={3}>
                        <RecentPastes/>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Layout;
