'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#2D5043', 
          fontWeight: 'bold', 
          mb: 4, 
          textAlign: 'center' 
        }}
      >
        Our Location
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: 400, width: 312, mx: 'auto' }}>
            <CardHeader 
              title="Address & Contact" 
              sx={{ bgcolor: '#F5F1E6', textAlign: 'center' }}
            />
            <CardContent sx={{ height: 'calc(100% - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <List sx={{ width: '100%' }}>
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <LocationOnIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="123 Barber Street"
                    secondary="Cityville, ST 12345"
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <PhoneIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText primary="(555) 123-4567" sx={{ textAlign: 'center' }} />
                </ListItem>
                <Divider />
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <EmailIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText primary="info@mrcut.com" sx={{ textAlign: 'center' }} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: 400, width: 312, mx: 'auto' }}>
            <CardHeader 
              title="Parking Information" 
              sx={{ bgcolor: '#F5F1E6', textAlign: 'center' }}
            />
            <CardContent sx={{ height: 'calc(100% - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <List sx={{ width: '100%' }}>
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <DirectionsCarIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Free Parking"
                    secondary="Available in our private lot behind the building"
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <DirectionsCarIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Street Parking"
                    secondary="2-hour limit on Main Street"
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <DirectionsCarIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Parking Garage"
                    secondary="City Center Garage - 2 blocks away"
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: 400, width: 312, mx: 'auto' }}>
            <CardHeader 
              title="Hours of Operation" 
              sx={{ bgcolor: '#F5F1E6', textAlign: 'center' }}
            />
            <CardContent sx={{ height: 'calc(100% - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <List sx={{ width: '100%' }}>
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <AccessTimeIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Monday - Friday"
                    secondary="9:00 AM - 8:00 PM"
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <AccessTimeIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Saturday"
                    secondary="9:00 AM - 6:00 PM"
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <AccessTimeIcon sx={{ color: '#2D5043' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Sunday"
                    secondary="Closed"
                    sx={{ textAlign: 'center' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 