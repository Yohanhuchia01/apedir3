import { Routes, Route, useNavigate } from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import { supabase } from './services/client';
import img from './assets/images/img107.jpg';
// import { Home } from './components/';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Verification from './components/pages/Verification';
import Pruebas from './components/pages/Pruebas';
import Register from './components/pages/Register';
import BusinesNotFound from './components/adminPanel/BusinesNotFound';
import PersonalProfile from './components/PersonalProfile';
import BusinessProfile from './components/BusinessProfile';
import CrearNegocio from './components/adminPanel/CrearNegocio';
import Planes from './components/adminPanel/Planes';
import { useEffect } from 'react';
import TablaVentas from './components/adminPanel/tableVentas';
import ProductCard from './components/cards/Products';
import BusinessCard from './components/cards/Business';
import Category from './components/cards/Category';
import CreateEvent from './components/adminPanel/CreateEvent';
import EventCard from './components/cards/Events';
import EventClient from './components/cards/EventClient';
import PostCard from './components/cards/Novedades';
import CreatePostCard from './components/cards/NovedadesCreate';
import './App.css';

function App() {

  const navigate = useNavigate();

  const post = {
    avatarSrc: img, // Reemplaza esto con la ruta a la imagen del avatar
    negocioNombre: 'Nombre del negocio', // Reemplaza esto con el nombre del negocio
    contenido: 'Contenido del post loreasljdb diasgduias diuasgd asiudg asiudg asiudg aisudg iausdg asuid gaisgd uiasg diasgd uia gdia gsdiagsidg asid g', // Reemplaza esto con el contenido del post
    onEditarClick: () => {
        // Aquí va el código para manejar el clic en el botón de editar
    },
    onEliminarClick: () => {
        // Aquí va el código para manejar el clic en el botón de eliminar
    },
};

const post2 = {
  avatarSrc: img, // Reemplaza esto con la ruta a la imagen del avatar
  onCancelClick: () => {
      // Aquí va el código para manejar el clic en el botón de cancelar
  },
  onPostClick: () => {
      // Aquí va el código para manejar el clic en el botón de postear
  },
};

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        console.log('no hay sesión');
        navigate('/login');
      }else{
        console.log('hay sesión');    
        // navigate('/');
      }
    })
    // navigate('/pruebas');

  }, []);

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/plans" element={<Planes />} />
        <Route path="/profile/business" element={<BusinesNotFound />} />
        <Route path="/profile/business/create" element={<CrearNegocio />} />
        <Route path="/products" element={<Planes />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pruebas" element={<ProductCard product={{
              name: 'Nombre del producto',
              image: img,
              rating: 4.5,
              price: 100,
              hasDelivery: true
            }}/>} />
            <Route path="/pruebas2" element={<BusinessCard business={{
              coverImageUrl: img,
              profileImageUrl: img,
              businessName: 'Nombre del negocio'
            }}/>} />
            <Route path="/pruebas4" element={<CreateEvent />} />
            <Route path="/pruebas5" element={<EventCard event={{
              name: 'Nombre del evento',
              image_url: img,
              fecha: 'Fecha del evento',
              hora: 'Hora del evento',
              owner: 'Nombre del dueño'
            }}/>} />
            <Route path="/pruebas6/:eventName" element={<EventClient></EventClient>}></Route>
            <Route  path="/pruebas7"  element={<PostCard post={post} />}></Route>
            <Route  path="/pruebas8"  element={<CreatePostCard post={post2} />}></Route>
      </Routes>
    </>
  );
}

export default App;
