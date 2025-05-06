'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material';
import { format, addDays, parseISO, isToday, isTomorrow } from 'date-fns';

const AvailableSlotsCard = ({ barberId, selectedDate, onSlotSelect }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [nextWorkingDay, setNextWorkingDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!barberId) return;
      
      setLoading(true);
      try {
        // Fetch barber's working hours
        const barberResponse = await fetch(`/api/barbers/${barberId}`);
        const barberData = await barberResponse.json();
        const workingHours = barberData.working_hours;

        // Get current date and time
        const today = new Date();
        const currentHour = today.getHours();

        // Generate available slots based on working hours
        const generateSlots = (startTime, endTime) => {
          const slots = [];
          const [startHour] = startTime.split(':').map(Number);
          const [endHour] = endTime.split(':').map(Number);
          
          for (let hour = startHour; hour < endHour; hour++) {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            // Only add future slots for today
            if (isToday(selectedDate) && hour <= currentHour) continue;
            slots.push(timeString);
          }
          return slots;
        };

        // Get the day of week for the selected date
        const selectedDateObj = selectedDate ? parseISO(selectedDate) : today;
        const dayOfWeek = format(selectedDateObj, 'EEEE').toLowerCase();
        const dayWorkingHours = workingHours[dayOfWeek];

        if (dayWorkingHours) {
          const slots = generateSlots(dayWorkingHours.start, dayWorkingHours.end);
          
          // Check for existing appointments
          const appointmentsResponse = await fetch(`/api/appointments?barberId=${barberId}&date=${format(selectedDateObj, 'yyyy-MM-dd')}`);
          const appointments = await appointmentsResponse.json();
          
          // Filter out booked slots
          const bookedTimes = appointments.map(apt => apt.time);
          const availableSlots = slots.filter(slot => !bookedTimes.includes(slot));
          
          setAvailableSlots(availableSlots);
        } else {
          setAvailableSlots([]);
        }

        // Find next working day
        let nextDay = today;
        let daysChecked = 0;
        while (!workingHours[format(nextDay, 'EEEE').toLowerCase()] && daysChecked < 14) {
          nextDay = addDays(nextDay, 1);
          daysChecked++;
        }
        setNextWorkingDay(nextDay);

      } catch (error) {
        console.error('Error fetching available slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [barberId, selectedDate]);

  const formatDateDisplay = (date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE, MMMM d');
  };

  if (!barberId) {
    return (
      <Card className="mb-6">
        <CardContent>
          <Typography>Please select a barber first</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader 
        title={selectedDate ? "Available Time Slots" : "Next Available Day"} 
      />
      <CardContent>
        {loading ? (
          <Typography>Loading available slots...</Typography>
        ) : (
          <Box>
            {!selectedDate && nextWorkingDay && (
              <Typography variant="h6" className="mb-4">
                Next available: {formatDateDisplay(nextWorkingDay)}
              </Typography>
            )}
            
            {availableSlots.length > 0 ? (
              <Box className="mt-6">
                <Grid container spacing={2}>
                  {availableSlots.map((slot) => (
                    <Grid item xs={4} key={slot}>
                      <Button
                        variant={selectedSlot === slot ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => {
                          setSelectedSlot(slot);
                          onSlotSelect(slot);
                        }}
                        sx={{
                          color: selectedSlot === slot ? 'white' : '#2D5043',
                          borderColor: '#2D5043',
                          '&:hover': {
                            backgroundColor: '#2D5043',
                            color: 'white',
                            borderColor: '#2D5043'
                          }
                        }}
                      >
                        {slot}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Typography>
                No available slots for the selected date. Please choose another date within the next two weeks.
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableSlotsCard; 