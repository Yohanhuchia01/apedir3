import React from 'react';
import { Card, Typography, CardContent, CardMedia } from '@mui/material';

const EventCard = ({ event }) => {
    return (
        <Card sx={{ width: '300px', height: '400px', position: 'relative' }}>
            <CardMedia
                sx={{ width: '100%', height: '100%' }}
                image={event.image}
                title="Cover Image"
            />
            <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 2, color: '#fff', zIndex: 1 }}>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 1 }}>{event.date} - {event.time}</Typography>
                <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 1 }}>{event.name}</Typography>
                <Typography variant="body2" sx={{ fontSize: '1rem' }}>Publico - Evento de {event.owner}</Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;