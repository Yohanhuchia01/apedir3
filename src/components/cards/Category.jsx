import React from 'react';
import { Box } from '@mui/material';

const Category = ({ categoryName }) => {
    return (
        <Box
            sx={{
                borderRadius: 5, // Ajusta según tus necesidades
                bgcolor: 'grey.800',
                color: 'common.white',
                p: 2, // Ajusta según tus necesidades
            }}
        >
            {categoryName}
        </Box>
    );
};

export default Category;