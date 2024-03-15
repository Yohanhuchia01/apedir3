import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EventsImagesUpload = ({ handleImageUpload }) => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (event) => {
        const file = event.target.files[0];
        handleImageUpload(URL.createObjectURL(file));
        setPreviewImage(URL.createObjectURL(file));
        toast.success("Imagen cargada correctamente. Puedes continuar creando el evento.");
    };

    return (
        <Box m={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,backgroundColor: 'white',width: '300px', height: '400px' }}>
            <ToastContainer />
            <label htmlFor="upload-button">
                <input
                    style={{ display: 'none' }}
                    id="upload-button"
                    name="upload-button"
                    type="file"
                    onChange={handleChange}
                />
                <Button color="primary" variant="contained" component="span">
                    Seleccionar imagen
                </Button>
            </label>
            {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />}
        </Box>
    );
};

export default EventsImagesUpload;