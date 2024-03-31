import React, { useState } from 'react';
import { Card, Box, Avatar, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PostCard = ({ post }) => {
    const { avatarSrc, negocioNombre, contenido, onEditarClick, onEliminarClick } = post;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const displayContent = isExpanded ? contenido : `${contenido.substring(0, 80)}...`;

    return (
        <Card sx={{ p: 2, width: '300px', overflowX: 'hidden' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    <Avatar src={avatarSrc} />
                    <Typography variant="h6" sx={{ mr: 1 }}>{negocioNombre}</Typography>
                    <CheckCircleIcon color="primary" />
                </Box>
                <Button variant="outlined" onClick={onEditarClick} sx={{ color: 'violet', bgcolor: 'white', border: 'none' }} size="small">Editar</Button>
            </Box>
            <Box mt={2}>
                <Typography variant="body1">
                    {displayContent}
                </Typography>
                {contenido.length > 80 && (
                    <Button color="primary" onClick={toggleExpand}>
                        {isExpanded ? 'Mostrar menos' : 'Ver más'}
                    </Button>
                )}
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={onEliminarClick} sx={{ color: 'white', bgcolor: 'black' }} size="small">Eliminar</Button>
            </Box>
        </Card>
    );
};

export default PostCard;