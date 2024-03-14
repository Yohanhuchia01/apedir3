import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, Modal, Box, Avatar } from '@mui/material';
import { Edit } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import img from '../../assets/images/img107.jpg'

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventImage, setEventImage] = useState('');
    const [eventDateTime, setEventDateTime] = useState('');
    const [ticketCount, setTicketCount] = useState(100);
    const [tableReservations, setTableReservations] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageUpload = (event) => {
        // Lógica para cargar la imagen
    };

    const handleCreateEvent = () => {
        // Lógica para crear el evento
    };

    return (
        

<Box sx={{ borderRadius: 3, m: 2 }}>
    <Box
        sx={{
            width: '100%', // Ajusta según tus necesidades
            height: '200px', // Ajusta según tus necesidades
            bgcolor: 'grey.500',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            mb: 2
        }}
    >
        {eventImage ? (
            <img src={eventImage} alt="Evento" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 3 }} />
        ) : (
            <IconButton onClick={() => setIsModalOpen(true)}>
                <Edit />
            </IconButton>
        )}
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={img} alt="Business" />
        <Typography sx={{ ml: 2 }}>Organizador del evento</Typography>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <TextField
            label="Nombre del evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            sx={{ borderRadius: 3, mb: 2 }}
            fullWidth
        />
        <TextField
            label="Descripción"
            multiline
            rows={4}
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            sx={{ borderRadius: 3, mb: 2 }}
            fullWidth
        />
        <TextField
            label="Fecha y hora del evento"
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)}
            sx={{ borderRadius: 3, mb: 2 }}
            fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
                variant="outlined"
                startIcon={<AccessTimeIcon />}
                // onClick={handleSetTime}
            >
                Establecer hora
            </Button>
            <Button
                variant="outlined"
                startIcon={<DateRangeIcon />}
                // onClick={handleSetDate}
            >
                Establecer fecha
            </Button>
        </Box>
    </Box>
    <Typography sx={{ borderRadius: 3, mb: 2 }}>Cantidad de entradas: {ticketCount}</Typography>
    <Typography sx={{ borderRadius: 3, mb: 2 }}>Reservas (mesas): {tableReservations}</Typography>
    <Button
        variant="contained"
        color="primary"
        onClick={handleCreateEvent}
        sx={{ borderRadius: 3, mb: 2 }}
        fullWidth
    >
        CREAR EVENTO
    </Button>
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>algo</p>
    </Modal>
</Box>
    );
};

export default CreateEvent;