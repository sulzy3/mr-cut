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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#2D5043] mb-8">Book an Appointment</h1>
      
      <Card className="mb-6">
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

      <Card className="mb-6">
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

      <Card className="mb-6">
        <CardHeader title="Select Date and Time" />
        <CardContent>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Box className="space-y-4">
            <Typography><strong>Service:</strong> {getSelectedService()?.name}</Typography>
            <Typography><strong>Price:</strong> ${getSelectedService()?.price}</Typography>
            <Typography><strong>Barber:</strong> {getSelectedBarber()?.name}</Typography>
            <Typography><strong>Date:</strong> {formatDate(selectedDate)}</Typography>
            <Typography><strong>Time:</strong> {selectedTime}</Typography>
            <Typography><strong>Name:</strong> {name}</Typography>
            <Typography><strong>Phone:</strong> {phone}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmBooking} variant="contained" className="bg-[#2D5043] hover:bg-[#233D34]">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        onClick={handleSubmit}
        className="bg-[#2D5043] hover:bg-[#233D34]"
        fullWidth
      >
        Book Appointment
      </Button>
    </div>
  );
} 