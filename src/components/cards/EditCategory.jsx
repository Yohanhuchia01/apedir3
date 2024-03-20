import { useEffect, useState } from 'react';
import { Grid, Typography, IconButton, Button, Modal } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import EditProducts from './EditProduct';
import CreateProduct from './CreateProducts';
import { Box, styled } from '@mui/system';
import { supabase } from '../../services/client';

const Root = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2)', // Sombra definida directamente
}));

const CategoryRow = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
}));

const CategoryName = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const AddButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'black',
    color: 'white',
    marginBottom: theme.spacing(1),
}));

const EditCategory = ({ category, onDelete, business }) => {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddProduct = async (product) => {
        const { data, error } = await supabase
            .from('products')
            .insert([{ 
                'name': product.name, 
                'owner': business.name, 
                'category': category.id,
                'provincia': business.provincia,
                'precio':product.price
            }]);

        if (error) {
            console.log('Error inserting product:', error);
        } else {
            // console.log(product.image)
            setProducts([...products, data]);
            // handleCloseModal();
             // Si la creación del producto fue exitosa, sube la imagen al bucket
             if (product.image) {
                const filePath = `${business.name}/${product.name}.jpg`;

                const { data: uploadData, error: uploadError } = await supabase
                    .storage
                    .from('feedImages')
                    .upload(filePath, product.image, { upsert: true });

                if (uploadError) {
                    console.error('Error uploading image:', uploadError.message);
                    toast.error('Error uploading image: ' + uploadError.message);
                } else {
                    console.log('Image uploaded successfully:', uploadData);
                    toast.success('Image uploaded successfully');

                    // Obtén la URL de la imagen
                    const { data: urlData, error: urlError } = await supabase
                        .storage
                        .from('feedImages')
                        .getPublicUrl(filePath);

                    if (urlError) {
                        console.error('Error getting image URL:', urlError.message);
                        toast.error('Error getting image URL: ' + urlError.message);
                    } else {
                        // Actualiza el evento con la URL de la imagen

                        const { data, error: updateError } = await supabase
                            .from('products')
                            .update({ 'image_url': urlData.publicUrl })
                            .eq('name', product.name)
                            .select()
                        if (updateError) {
                            console.error('Error updating event:', updateError.message);
                            // toast.error('Error updating event: ' + updateError.message);
                        } else {
                            console.log('Event updated successfully with image URL');
                            // toast.success('Event updated successfully with image URL');
                        }
                    }
                }
            }
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .eq('category', category.id); // Busca los productos que pertenecen a la categoría actual

            if (error) {
                console.log('Error fetching products:', error);
            } else {
                setProducts(products); // Guarda los productos en el estado
            }
        };

        fetchProducts();
    }, [category.id]); // Dependencia de useEffect

    return (
        <Root>
            <Grid container spacing={2}>
                <CategoryRow item xs={12}>
                    <Box display={'flex'}>
                        <CategoryName variant="h6">
                            {category.nameProduct}
                        </CategoryName>
                        <IconButton>
                            <Edit />
                        </IconButton>
                    </Box>
                    <IconButton onClick={() => onDelete(category.id)}>
                        <Delete color="error" />
                    </IconButton>

                </CategoryRow>
                <Grid item xs={12}>
                    <AddButton variant="contained" onClick={handleOpenModal}>
                        Agregar productos
                    </AddButton>
                </Grid>
                <Grid item xs={12}>
                    {/* <EditProducts products={products} />  */}
                </Grid>
            </Grid>
            <Modal open={openModal} onClose={handleCloseModal}>
                <CreateProduct closeModal={handleCloseModal} createProduct={handleAddProduct} />
            </Modal>
        </Root>
    );
};

export default EditCategory;