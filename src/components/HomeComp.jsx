import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import SearchBar from './utils/SearchBar'; // Asegúrate de que la ruta sea correcta
import ProvinceSelected from './utils/ProvinceSelected'; // Asegúrate de que la ruta sea correcta
import { supabase } from '../services/client';
import ProductCard from './cards/Products';
import BusinessCard from './cards/Business';
import Category from './cards/Category';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const HomeComp = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('Todas las provincias');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const fetchData = async () => {
      let categories = [];
      let products = [];
      let businesses = [];

      if (selectedProvince === 'Todas las provincias') {
        ({ data: categories } = await supabase.from('cayegoryProducts').select('*'));
        ({ data: products } = await supabase.from('products').select('*'));
        ({ data: businesses } = await supabase.from('business').select('*'));
      } else {
        ({ data: categories } = await supabase.from('cayegoryProducts').select('*'));
        ({ data: products } = await supabase.from('products').select('*').filter('provincia', 'eq', selectedProvince));
        ({ data: businesses } = await supabase.from('business').select('*').filter('provincia', 'eq', selectedProvince));
      }

      setCategories(categories);
      console.log(categories)
      setProducts(products);
      console.log(products)
      setBusinesses(businesses);
      console.log(businesses)
    };

    fetchData();
  }, [selectedProvince]);



  const handleSearch = (searchTerm) => {
    // Aquí puedes manejar la lógica de búsqueda
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    // Aquí puedes manejar la lógica cuando la provincia seleccionada cambia
  };

  return (
    <Box sx={{ padding: '15px', display: 'flex', gap: '15px', flexDirection: 'column', width:'100vw' }}>
      <Box display="flex" justifyContent="space-between" flexDirection={'column'}>
        <ProvinceSelected value={selectedProvince} onChange={handleProvinceChange} />
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Typography variant="h5" >Categories</Typography>
      <Carousel showThumbs={false} showIndicators={false} centerMode centerSlidePercentage={isMobile ? 26 : 7} >
        {categories.map((category) => (
          <div key={category.id}>
            <Category categoryName={category.nameProduct} />
          </div>
        ))}
      </Carousel>

      <Typography variant="h5">Products</Typography>
      <Box sx={{ maXidth: '100%' }}>
        <Carousel showThumbs={false} showIndicators={false} centerMode centerSlidePercentage={isMobile ? 80 : 20}>
          {products.map((product) => (
            <Box m={2} key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Carousel>
      </Box>

      <Typography variant="h5">Businesses</Typography>
      <Box sx={{ maxWidth: '100%' }}>
        <Carousel showThumbs={false} showIndicators={false} centerMode centerSlidePercentage={isMobile ? 87 : 35}>
          {businesses.map((business) => (
            <Box m={2} key={business.id}>
              <BusinessCard business={business} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default HomeComp;