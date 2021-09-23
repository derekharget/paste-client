import React from 'react';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";

const index = () => {
    return (
        <React.Fragment>
            <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>

                <Typography variant="h4">Free and open paste service</Typography>
            </Box>
        </React.Fragment>
    );
};

export default index;
