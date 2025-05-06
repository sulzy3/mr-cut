'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function ManagementCard({ title, description, icon: Icon, href }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3,
          },
          bgcolor: '#F5F1E6',
          color: '#2D5043',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              color: '#B87333',
            }}
          >
            <Icon size={24} />
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
} 