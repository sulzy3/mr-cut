'use client';

import React, { useState, useEffect } from 'react';
import { Appointment } from '@/entities/Appointment';
import { Service } from '@/entities/Service';
import { Barber } from '@/entities/Barber';
import { format } from 'date-fns';
import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Stack,
} from '@mui/material';
import AvailableSlotsCard from '@/components/AvailableSlotsCard';
import Cookies from 'js-cookie';

export default function BookPage() {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicesData = await Service.getAll();
        const barbersData = await Barber.getAll();
        setServices(servicesData);
        setBarbers(barbersData);

        // Get user data from cookies
        const userData = Cookies.get('userData');
        if (userData) {
          const { name, phoneNumber } = JSON.parse(userData);
          setName(name);
          setPhone(phoneNumber);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const appointment = new Appointment({
        serviceId: selectedService,
        barberId: selectedBarber,
        date: selectedDate,
        time: selectedTime,
        customerName: name,
        customerPhone: phone,
      });

      await appointment.save();
      setShowConfirmation(false);
      // Handle success (e.g., show confirmation, redirect)
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle error
    }
  };

  const getSelectedService = () => services.find(s => s.id === selectedService);
  const getSelectedBarber = () => barbers.find(b => b.id === selectedBarber);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ color: '#2D5043', fontWeight: 'bold', mb: 4 }}>
        Book an Appointment
      </Typography>
      
      <Stack spacing={3}>
        <Card>
          <CardHeader title="Select Service" />
          <CardContent>
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {services.map((service) => (
                  <FormControlLabel
                    key={service.id}
                    value={service.id}
                    control={<Radio />}
                    label={`${service.name} - $${service.price}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Select Barber" />
          <CardContent>
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedBarber}
                onChange={(e) => setSelectedBarber(e.target.value)}
              >
                {barbers.map((barber) => (
                  <FormControlLabel
                    key={barber.id}
                    value={barber.id}
                    control={<Radio />}
                    label={barber.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Select Date and Time" />
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                type="date"
                label="Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            
            <AvailableSlotsCard 
              barberId={selectedBarber}
              selectedDate={selectedDate}
              onSlotSelect={(time) => setSelectedTime(time)}
            />
          </CardContent>
        </Card>

        <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
          <DialogTitle>Confirm Your Appointment</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Typography><strong>Service:</strong> {getSelectedService()?.name}</Typography>
              <Typography><strong>Price:</strong> ${getSelectedService()?.price}</Typography>
              <Typography><strong>Barber:</strong> {getSelectedBarber()?.name}</Typography>
              <Typography><strong>Date:</strong> {formatDate(selectedDate)}</Typography>
              <Typography><strong>Time:</strong> {selectedTime}</Typography>
              <Typography><strong>Name:</strong> {name}</Typography>
              <Typography><strong>Phone:</strong> {phone}</Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
            <Button 
              onClick={handleConfirmBooking} 
              variant="contained" 
              sx={{
                bgcolor: '#2D5043',
                '&:hover': {
                  bgcolor: '#233D34'
                }
              }}
            >
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: '#2D5043',
            '&:hover': {
              bgcolor: '#233D34'
            }
          }}
          fullWidth
        >
          Book Appointment
        </Button>
      </Stack>
    </Container>
  );
} 