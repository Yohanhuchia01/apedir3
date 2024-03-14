import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BusinessCard = ({ coverImageUrl, profileImageUrl, businessName }) => {
    return (
        <Card sx={{ position: 'relative', height: 300, width: 400, borderRadius: 1, overflow: 'hidden' }}>
            <CardMedia
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.5 }}
                image={coverImageUrl}
                title="Cover Image"
            />
            <img
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 100, height: 100, borderRadius: '50%', border: 2, borderColor: 'primary.main' }}
                src={profileImageUrl}
                alt="Profile Image"
            />
            <CardContent>
                <Typography variant="h6" sx={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: 'common.white', fontWeight: 'bold' }}>
                    {businessName}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BusinessCard;