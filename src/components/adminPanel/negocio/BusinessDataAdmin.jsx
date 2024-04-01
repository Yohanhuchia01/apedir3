// src/components/adminPanel/negocio/BusinessDataAdmin.jsx
import { Box, MenuItem, Checkbox, IconButton, Button, Select, TextField, Divider, Avatar, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { supabase } from '../../../services/client';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import BusinessMap from './BusinessMap';
import LoadingAnimation from '../../utils/LoadingAnimation';
import { styled } from '@mui/system';
import { FaExclamationCircle, FaMapMarkerAlt, FaRegListAlt, FaTruck, FaPhoneAlt, FaEdit, FaCheck, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';


const BusinessDataAdmin = ({ business }) => {
    const [position, setPosition] = useState([business?.lat, business?.lng]);
    const [address, setAddress] = useState(business?.address || '');
    const [hasChanges, setHasChanges] = useState(false);

    const [schedules, setSchedules] = useState({
        Lunes: { opening: '', closing: '' },
        Martes: { opening: '', closing: '' },
        Miércoles: { opening: '', closing: '' },
        Jueves: { opening: '', closing: '' },
        Viernes: { opening: '', closing: '' },
        Sábado: { opening: '', closing: '' },
        Domingo: { opening: '', closing: '' },
    });

    const [socialLinks, setSocialLinks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const socialOptions = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'];
    const [selectedSocial, setSelectedSocial] = useState('Facebook');
    const [username, setUsername] = useState('');
    const [link, setLink] = useState('');

    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState(business?.name || '');
    const [province, setProvince] = useState(business?.province || 'Granma');
    const [category, setCategory] = useState(business?.category || '');
    const [delivery, setDelivery] = useState(business?.delivery || false);
    const [phone, setPhone] = useState(business?.phone || '');
    const provinces = ['Pinar del Río', 'La Habana', 'Matanzas', 'Villa Clara', 'Cienfuegos', 'Sancti Spíritus', 'Ciego de Ávila', 'Camagüey', 'Las Tunas', 'Holguìn', 'Granma', 'Santiago de Cuba', 'Guantánamo'];





    const BlackDivider = (props) => <Divider sx={{ backgroundColor: 'black', margin: '10px' }} {...props} />;
    const StyledButton = styled(Button)({
        color: 'white',
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: 'gray',
        },
    });

    useEffect(() => {
        const fetchSchedules = async () => {
            const { data, error } = await supabase
                .from('business') // reemplaza 'businesses' con el nombre de tu tabla
                .select('schedules')
                .eq('id', business.id); // asumiendo que 'id' es la clave primaria de tu tabla
            if (error) {
                console.error('Error obteniendo los horarios:', error);
            } else if (data && data.length > 0) {
                setSchedules(data[0].schedules);
                console.log(data[0].schedules)
            }
        };

        const fetchSocialLinks = async () => {
            const { data, error } = await supabase
                .from('social_links') // reemplaza 'social_links' con el nombre de tu tabla
                .select('*')
                .eq('business_id', business.id); // asumiendo que 'business_id' es la clave foránea de tu tabla
            if (error) {
                console.error('Error obteniendo los enlaces de las redes sociales:', error);
            } else {
                setSocialLinks(data);
            }
        };

        fetchSocialLinks();
        fetchSchedules();
    }, []);

    // parte de los detalles
    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    //la parte de las redes sociales
    const handleAddSocialLink = async (socialName, username, profileLink) => {
        // Verificar si ya existe un enlace para la misma red social
        const existingLink = socialLinks.find(link => link.socialName === socialName);
        if (existingLink) {
            console.error(`Ya existe un enlace para la red social ${socialName}.`);
            return;
        }

        const newLink = { business_id: business.id, socialName, username, profileLink };
        const { error } = await supabase
            .from('social_links') // reemplaza 'social_links' con el nombre de tu tabla
            .insert(newLink);
        if (error) {
            console.error('Error añadiendo el enlace de la red social:', error);
        } else {
            setSocialLinks(prevLinks => [...prevLinks, newLink]);
        }
    };

    const handleChange = (event) => {
        setSelectedSocial(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleClick = () => {
        console.log('entro bien')
        handleAddSocialLink(selectedSocial, username, link);
    };

    const handleDeleteSocialLink = async (linkId) => {
        const { error } = await supabase
            .from('social_links') // reemplaza 'social_links' con el nombre de tu tabla
            .delete()
            .eq('id', linkId);
        if (error) {
            console.error('Error eliminando el enlace de la red social:', error);
        } else {
            setSocialLinks(prevLinks => prevLinks.filter(link => link.id !== linkId));
        }
    };


    //la parte del mapa
    const handleAddressChange = async (event) => {
        const newAddress = event.target.value;
        setAddress(newAddress);

        // Aquí actualizamos la dirección en la base de datos
        const { error } = await supabase
            .from('business') // reemplaza 'businesses' con el nombre de tu tabla
            .update({ 'address': newAddress })
            .eq('id', business.id); // asumiendo que 'id' es la clave primaria de tu tabla
        if (error) {
            console.error('Error actualizando la dirección:', error);
        }
    };


    const handleMarkerDragEnd = async (newPosition) => {
        // Aquí actualizamos la ubicación en la base de datos
        const { error } = await supabase
            .from('business') // reemplaza 'businesses' con el nombre de tu tabla
            .update({ 'lat': newPosition.lat, 'lng': newPosition.lng })
            .eq('id', business.id); // asumiendo que 'id' es la clave primaria de tu tabla
        if (error) {
            console.error('Error actualizando la ubicación:', error);
        } else {
            setPosition([newPosition.lat, newPosition.lng]);

            // Aquí obtenemos la dirección legible
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${newPosition.lat}+${newPosition.lng}&key=7f284513855f4180bb77123b958251cb`);
            if (response.data.results && response.data.results.length > 0) {
                const newAddress = response.data.results[0].formatted;
                setAddress(newAddress);
                console.log(newAddress);

                // Aquí actualizamos la dirección en la base de datos
                const { error } = await supabase
                    .from('business') // reemplaza 'businesses' con el nombre de tu tabla
                    .update({ 'address': newAddress })
                    .eq('id', business.id); // asumiendo que 'id' es la clave primaria de tu tabla
                if (error) {
                    console.error('Error actualizando la dirección:', error);
                }
            } else {
                console.log('No se encontró ninguna dirección para estas coordenadas.');
            }
        }
    };

    //la parte de lo horarios
    const handleOpeningTimeChange = (day, time) => {
        setSchedules(prevSchedules => ({
            ...prevSchedules,
            [day]: { ...prevSchedules[day], opening: time },
        }));
        setHasChanges(true);
    };

    const handleClosingTimeChange = (day, time) => {
        setSchedules(prevSchedules => ({
            ...prevSchedules,
            [day]: { ...prevSchedules[day], closing: time },
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        const { error } = await supabase
            .from('business') // reemplaza 'businesses' con el nombre de tu tabla
            .update({ 'schedules': schedules })
            .eq('id', business.id); // asumiendo que 'id' es la clave primaria de tu tabla
        if (error) {
            console.error('Error actualizando los horarios:', error);
        } else {
            console.log('Horarios actualizados con éxito');
        }
    };

    return (
        <Box sx={{ p: 2, width: '500px' }}>
            {/* la parte de la foto de perfil */}
            <>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Foto de perfil</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={business.profileImageUrl || ''} sx={{ width: 60, height: 60, mr: 2 }} />
                    <Button variant="outlined">Editar foto de perfil</Button>
                </Box>
                <BlackDivider />
            </>

            {/* la parte de la foto de portada */}
            <>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Foto de portada</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                    {/* Aquí irá el código para la foto de portada */}
                </Box>
                <BlackDivider />
            </>

            {/* la parte de la presentacion */}
            <>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Presentación</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                    {/* Aquí irá el código para la presentación */}
                </Box>
                <BlackDivider />
            </>

            {/* la parte de los detalles */}
            <>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Detalles</Typography>
                    <Box>
                        <IconButton onClick={handleEditClick}>
                            {isEditable ? 'Aceptar' : 'Editar'}
                        </IconButton>

                    </Box>
                </Box>
                <Box sx={{ mt: 2, mb: 2 }}>

                    <Box display="flex" alignItems="center">
                        <FaExclamationCircle size={24} style={{ marginRight: '10px' }} />
                        <Typography variant="body1" mr={2}>Nombre:</Typography>
                        <TextField
                            value={name}
                            disabled={!isEditable}
                            variant="standard"
                            onChange={(e) => setName(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { padding: '10px' } }}
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <FaMapMarkerAlt size={24} style={{ marginRight: '10px' }} />
                        <Typography variant="body1" mr={2}>Provincia:</Typography>
                        <Select
                            value={province}
                            disabled={!isEditable}
                            variant="standard"
                            sx={{ '& .MuiInputBase-input': { padding: '10px' } }}
                            onChange={(e) => setProvince(e.target.value)}
                        >
                            {provinces.map((province) => (
                                <MenuItem key={province} value={province}>{province}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <FaRegListAlt size={24} style={{ marginRight: '10px' }} />
                        <Typography variant="body1" mr={2}>Categoría:</Typography>
                        <TextField
                            value={category}
                            disabled={!isEditable}
                            variant="standard"
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { padding: '10px' } }}
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <FaTruck size={24} style={{ marginRight: '10px' }} />
                        <Typography variant="body1" mr={2}>Delivery:</Typography>
                        <Checkbox checked={business.delivery} disabled={!isEditable} />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <FaPhoneAlt size={24} style={{ marginRight: '10px' }} />
                        <Typography variant="body1" mr={2}>Teléfono:</Typography>
                        <TextField
                            value={phone}
                            disabled={!isEditable}
                            variant="standard"
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { padding: '10px' } }}
                        />
                    </Box>
                </Box>
                <BlackDivider />
            </>

            {/* la parte de las redes sociales */}
            <>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Redes sociales</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                    <StyledButton onClick={() => setShowForm(true)}>Agregar un enlace social</StyledButton>
                    {showForm && (
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
                            <Select value={selectedSocial} onChange={handleChange}>
                                {socialOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField placeholder='Nombre de usuario' onChange={handleUsernameChange} />
                            <TextField placeholder="Enlace al perfil" onChange={handleLinkChange} />
                            <StyledButton onClick={handleClick}>Guardar</StyledButton>
                        </Box>
                    )}
                </Box>
                {socialLinks.map((link, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        {link.socialName === 'Facebook' && <FaFacebook size={32} style={{ marginRight: '10px' }} />}
                        {link.socialName === 'Twitter' && <FaTwitter size={32} style={{ marginRight: '10px' }} />}
                        {link.socialName === 'Instagram' && <FaInstagram size={32} style={{ marginRight: '10px' }} />}
                        {link.socialName === 'YouTube' && <FaYoutube size={32} style={{ marginRight: '10px' }} />}
                        {link.socialName === 'LinkedIn' && <FaLinkedin size={32} style={{ marginRight: '10px' }} />}
                        <Typography variant="body1" sx={{ flex: 1 }}>{link.username}</Typography>
                        <StyledButton onClick={() => handleDeleteSocialLink(link.id)}>Eliminar</StyledButton>
                    </Box>
                ))}
                <BlackDivider />
            </>

            {/* la parte del mapa */}
            <>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Ubicación</Typography>
                <TextField
                    label="Dirección"
                    value={address}
                    onChange={handleAddressChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2, mb: 2 }}>
                    {position[0] && position[1] ? (
                        <BusinessMap initialPosition={position} onPositionChange={handleMarkerDragEnd} />
                    ) : (
                        <div>Cargando mapa...</div>
                    )}
                </Box>
                <BlackDivider />
            </>

            {/* la parte de los horarios */}
            <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Horarios</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body1" sx={{ flex: 1, fontWeight: 'bold' }}>Día</Typography>
                    <Typography variant="body1" sx={{ flex: 1, fontWeight: 'bold', mr: 2, color: 'green' }}>Apertura</Typography>
                    <Typography variant="body1" sx={{ flex: 1, fontWeight: 'bold', color: 'red' }}>Cierre</Typography>
                </Box>
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                    <Box key={day} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Typography variant="body1" sx={{ flex: 1 }}>{day}</Typography>
                        <TextField
                            type="time"
                            value={schedules[day].opening}
                            sx={{ mr: 10, '& .MuiInputBase-input': { padding: '10px' } }}
                            inputProps={{ style: { color: 'green' } }}
                            onChange={(event) => handleOpeningTimeChange(day, event.target.value)}
                        />
                        <TextField
                            type="time"
                            value={schedules[day].closing}
                            sx={{ mr: 10, '& .MuiInputBase-input': { padding: '10px' } }}
                            inputProps={{ style: { color: 'red' } }}
                            onChange={(event) => handleClosingTimeChange(day, event.target.value)}
                        />
                    </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <StyledButton variant="contained" onClick={handleSave} disabled={!hasChanges}>Guardar</StyledButton>
                </Box>
            </Box>
        </Box>
    );
};

export default BusinessDataAdmin;