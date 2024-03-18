import React from 'react';
import { Card, Box, Avatar, Button, TextField } from '@mui/material';

const CreatePostCard = ({ post }) => {
    const { avatarSrc, onCancelClick, onPostClick } = post;

    return (
        <Card sx={{ p: 2 }}>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <Avatar src={avatarSrc} />
            </Box>
            <Box mb={2}>
                <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    placeholder="Escribe tu post aquí..."
                />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" onClick={onCancelClick} sx={{ color: 'black', bgcolor: 'white', border: 'none' }} size="small">Cancelar</Button>
                <Button variant="contained" onClick={onPostClick} sx={{ color: 'white', bgcolor: 'black' }} size="small">Postear</Button>
            </Box>
        </Card>
    );
};

export default CreatePostCard;