'use client';

import React from 'react';
import { Service } from '@/entities/Service';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@mui/material';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await Service.getAll();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
      }
    };

    loadServices();
  }, []);

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          color: '#2D5043',
          fontWeight: 'bold',
          mb: 4
        }}
      >
        Our Services
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={10} md={6} lg={4} key={service.id}>
            <Card sx={{ 
              height: 200,
              width: 300,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ color: '#2D5043' }}
                >
                  {service.name}
                </Typography>
                <Typography 
                  color="textSecondary" 
                  sx={{ mt: 2, flexGrow: 1 }}
                >
                  {service.description}
                </Typography>
                <Box sx={{ 
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" color="textSecondary">
                    Duration: {service.duration} minutes
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ color: '#8B5A2B' }}
                  >
                    ${service.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 