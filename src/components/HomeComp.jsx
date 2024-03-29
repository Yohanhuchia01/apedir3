import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import SearchBar from './utils/SearchBar'; // Asegúrate de que la ruta sea correcta
import ProvinceSelected from './utils/ProvinceSelected'; // Asegúrate de que la ruta sea correcta
import { supabase } from '../services/client';
import ProductCard from './cards/Products';
import BusinessCard from './cards/Business';
import Category from './cards/Category';

const HomeComp = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('Todas las provincias');


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
    <Box sx={{padding:'15px', display:'flex', gap:'15px', flexDirection:'column'}}>
      <Box display="flex" justifyContent="space-between" flexDirection={'column'}>
        <ProvinceSelected value={selectedProvince} onChange={handleProvinceChange} />
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Typography variant="h5" >Categories</Typography>
      <Box display="flex" gap={'10px'}>
        {categories.map((category) => (
          <Category key={category.id} categoryName={category.nameProduct} />
        ))}
      </Box>

      <Typography variant="h5">Products</Typography>
      <Box display="flex" flexWrap="wrap" gap={'10px'}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>

      <Typography variant="h5">Businesses</Typography>
      <Box display="flex" flexWrap="wrap">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </Box>
    </Box>
  );
};

export default HomeComp;