import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
    const { name, image, rating, precio, hasDelivery } = product;

    const handleAddToCart = () => {
        // addToCart(product);
    };

    const navigate = useNavigate();

    return (
        <Card style={{ position: 'relative', borderRadius: '20px', width:'300px' }} onClick={()=>{navigate('/product')}}>
            <CardMedia component="img" image={image} alt={name} height="100" />
            <IconButton onClick={handleAddToCart} style={{ position: 'absolute', top: 10, right: 10 }}>
                <AddShoppingCart />
            </IconButton>
            <CardContent>
                <Box display='flex' alignItems='center' justifyContent='space-between' flexDirection={'row'}>
                    <Typography variant="h6" component="h2">
                        {name}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <StarIcon style={{ color: 'violet' }} />
                        <Typography variant="body2">
                            {rating}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2">
                    {precio} CUP
                </Typography>
                <Typography variant="body2" >
                    {hasDelivery ? 'Delivery available' : 'No delivery'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;