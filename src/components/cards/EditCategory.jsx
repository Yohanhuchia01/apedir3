import React from 'react';
import { Grid, Typography, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
// import EditProducts from './EditProduct';
import { Box, styled } from '@mui/system';

const Root = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2)', // Sombra definida directamente
}));

const CategoryRow = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
}));

const CategoryName = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const AddButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'black',
    color: 'white',
    marginBottom: theme.spacing(1),
}));

const EditCategory = ({ category }) => {
    return (
        <Root>
            <Grid container spacing={2}>
                <CategoryRow item xs={12}>
                    <Box display={'flex'}>
                        <CategoryName variant="h6">
                            {category.nameProduct}
                        </CategoryName>
                        <IconButton>
                            <Edit />
                        </IconButton>
                    </Box>
                    <IconButton>
                        <Delete color="error" />
                    </IconButton>

                </CategoryRow>
                <Grid item xs={12}>
                    <AddButton variant="contained">
                        Agregar productos
                    </AddButton>
                </Grid>
                <Grid item xs={12}>
                    {/* <EditProducts /> */}
                </Grid>
            </Grid>
        </Root>
    );
};

export default EditCategory;