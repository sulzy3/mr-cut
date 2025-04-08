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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Typography variant="h4" className="text-[#2D5043] font-bold mb-8 text-center">
        Our Location
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card className="h-[400px] w-[312px] mx-auto">
            <CardHeader 
              title="Address & Contact" 
              className="bg-[#F5F1E6] text-center"
            />
            <CardContent className="h-[calc(100%-64px)] flex items-center justify-center">
              <List className="w-full">
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <LocationOnIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="123 Barber Street"
                    secondary="Cityville, ST 12345"
                    className="text-center"
                  />
                </ListItem>
                <Divider />
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <PhoneIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText primary="(555) 123-4567" className="text-center" />
                </ListItem>
                <Divider />
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <EmailIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText primary="info@mrcut.com" className="text-center" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="h-[400px] w-[312px] mx-auto">
            <CardHeader 
              title="Parking Information" 
              className="bg-[#F5F1E6] text-center"
            />
            <CardContent className="h-[calc(100%-64px)] flex items-center justify-center">
              <List className="w-full">
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <DirectionsCarIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Free Parking"
                    secondary="Available in our private lot behind the building"
                    className="text-center"
                  />
                </ListItem>
                <Divider />
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <DirectionsCarIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Street Parking"
                    secondary="2-hour limit on Main Street"
                    className="text-center"
                  />
                </ListItem>
                <Divider />
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <DirectionsCarIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Parking Garage"
                    secondary="City Center Garage - 2 blocks away"
                    className="text-center"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="h-[400px] w-[312px] mx-auto">
            <CardHeader 
              title="Hours of Operation" 
              className="bg-[#F5F1E6] text-center"
            />
            <CardContent className="h-[calc(100%-64px)] flex items-center justify-center">
              <List className="w-full">
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <AccessTimeIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Monday - Friday"
                    secondary="9:00 AM - 8:00 PM"
                    className="text-center"
                  />
                </ListItem>
                <Divider />
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <AccessTimeIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Saturday"
                    secondary="9:00 AM - 6:00 PM"
                    className="text-center"
                  />
                </ListItem>
                <Divider />
                <ListItem className="justify-center">
                  <ListItemIcon className="min-w-0 mr-4">
                    <AccessTimeIcon className="text-[#2D5043]" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Sunday"
                    secondary="Closed"
                    className="text-center"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
} 