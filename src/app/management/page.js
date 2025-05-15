'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  CardActions,
  Chip,
  Divider
} from '@mui/material';
import { 
  Scissors, 
  Calendar, 
  Users, 
  Settings, 
  Clock, 
  User, 
  Phone 
} from 'lucide-react';
import { Appointment } from '@/entities/Appointment';
import { format } from 'date-fns';
import Cookies from 'js-cookie';

export default function ManagementDashboard() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      // Get user data from cookie
      const userData = JSON.parse(Cookies.get('userData') || '{}');
      
      if (!userData.id || userData.role !== 'BARBER') {
        throw new Error('Barber data not found');
      }

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch appointments with barber ID (which is the same as user ID in our schema)
      const response = await fetch(`/api/appointments?date=${today}&barberId=${userData.id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load appointments');
      }

      const appointments = await response.json();
      
      // Filter and sort upcoming appointments
      const upcoming = appointments
        .filter(app => new Date(app.dateTime) > new Date())
        .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
        .slice(0, 5); // Show only next 5 appointments
      setUpcomingAppointments(upcoming);
    } catch (error) {
      console.error('Error loading appointments:', error);
      setError(error.message || 'Failed to load appointments');
    }
  };

  const managementCards = [
    {
      title: 'Service Management',
      description: 'Manage your services, prices, and durations',
      icon: <Scissors size={24} />,
      href: '/management/services',
      color: '#2D5043'
    },
    {
      title: 'Appointment Management',
      description: 'View and manage all appointments',
      icon: <Calendar size={24} />,
      href: '/management/appointments',
      color: '#B87333'
    },
    {
      title: 'Barber Management',
      description: 'Manage barber schedules and profiles',
      icon: <User size={24} />,
      href: '/management/barbers',
      color: '#AFBFAD'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Management Dashboard
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}


      {/* Next Appointment */}
      {upcomingAppointments.length === 0 ? (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>No upcoming appointments</Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Next Appointment
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Card
            sx={{ 
              minWidth: '280px',
              width: '100%'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1">
                  {upcomingAppointments[0].customerName}
                </Typography>
                <Chip 
                  label={upcomingAppointments[0].status}
                  size="small"
                  color={upcomingAppointments[0].status === 'confirmed' ? 'success' : 'warning'}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Clock size={16} style={{ marginRight: 8 }} />
                <Typography variant="body2">
                  {new Date(upcomingAppointments[0].dateTime).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Scissors size={16} style={{ marginRight: 8 }} />
                <Typography variant="body2">
                  {upcomingAppointments[0].serviceName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <User size={16} style={{ marginRight: 8 }} />
                <Typography variant="body2">
                  {upcomingAppointments[0].barberName}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" href={`/management/appointments/${upcomingAppointments[0].id}`}>
                View Details
              </Button>
            </CardActions>
          </Card>
        </Paper>
      )}

      <Grid container spacing={3}>
        {/* Management Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {managementCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.title}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(145deg, ${card.color}20, ${card.color}10)`,
                    border: `1px solid ${card.color}30`,
                    minWidth: '280px',
                    width: '100%'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        p: 1, 
                        borderRadius: '50%', 
                        bgcolor: `${card.color}20`,
                        mr: 2
                      }}>
                        {card.icon}
                      </Box>
                      <Typography variant="h6" component="h2">
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      href={card.href}
                      sx={{ 
                        color: card.color,
                        '&:hover': {
                          bgcolor: `${card.color}10`
                        }
                      }}
                    >
                      Manage
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

      
      </Grid>
    </Box>
  );
} 