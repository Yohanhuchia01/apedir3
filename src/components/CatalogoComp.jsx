import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { supabase } from '../services/client';
import EditCategory from './cards/EditCategory';

const Categories = ({ business }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data: categories, error } = await supabase
                .from('cayegoryProducts')
                .select('*')
                .eq('owner', business.name); // Asegúrate de cambiar 'business_id' y 'id' por los nombres reales de los campos en tu base de datos

            if (error) {
                console.log('Error fetching categories:', error);
            } else {
                setCategories(categories);
                console.log(categories)
            }
        };

        fetchCategories();
    }, []);



    return (
        <Box sx={{ m: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Categorías</Typography>
            {categories.map((category) => (
                <Box key={category.id} sx={{ mb: 5, m: 5 }}> {/* Agrega un margen inferior a cada EditCategory */}
                    <EditCategory category={category} />
                </Box>
            ))}
            <Button variant="contained" sx={{ mt: 2, bgcolor: 'rgb(20, 20, 20)', color: 'common.white' }}>Añadir categoría</Button>
        </Box>
    );
};

export default Categories;