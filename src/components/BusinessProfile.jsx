import React, { useEffect, useState } from 'react';
import { supabase } from '../services/client';
import { Box, Grid,Container, Typography, Avatar, BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import { styled } from '@mui/system';


const StyledBottomNavigation = styled(BottomNavigation)({
  backgroundColor: '#555',
  height: '35px',
});

const StyledBottomNavigationAction = styled(BottomNavigationAction)({
  color: '#fff',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  padding: '6px 12px',
  '&.Mui-selected': {
    color: '#555',
    backgroundColor: '#fff',
  },
});

const BusinessProfile = () => {
  const [value, setValue] = React.useState(0);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      // Aquí debes hacer una solicitud a tu base de datos para obtener los negocios asociados al perfil del usuario
      // Puedes usar supabase para hacer la solicitud
      const { data, error } = await supabase
        .from('business')
        .select('*')
        .eq('owner', (await supabase.auth.getUser()).data.user.email);
      if (error) {
        console.error('Error fetching business:', error.message);
      } else {
        setBusiness(data[0]);
        console.log(data[0])
      }
    };
    fetchBusiness();
  }, []);

  const handleCreateBusiness = () => {
    // Aquí debes implementar la lógica para crear un nuevo negocio
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 2, backgroundColor: '#555', color: '#fff', display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>Logo</Avatar>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar sx={{ bgcolor: 'secondary.main' }}>{business?.owner}</Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{business?.name}</Typography>
            <Typography variant="body2">Plan Premium</Typography>
          </Box>
        </Box>
        <StyledBottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <StyledBottomNavigationAction label="Dashboard" />
          <StyledBottomNavigationAction label="Negocio" />
          <StyledBottomNavigationAction label="Catálogo" />
          <StyledBottomNavigationAction label="Eventos" />
          <StyledBottomNavigationAction label="Novedades" />
        </StyledBottomNavigation>
      </Box>
    </Container>
  );
};

export default BusinessProfile;