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

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!barberId) return;
      
      setLoading(true);
      try {
        // TODO: Replace with actual API call to get barber's working days and available slots
        // This is a mock implementation
        const today = new Date();
        const mockWorkingDays = ['Monday', 'Wednesday', 'Friday', 'Saturday'];
        const mockSlots = [
          '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
          '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
        ];

        // Find next working day
        let nextDay = today;
        let daysChecked = 0;
        while (!mockWorkingDays.includes(format(nextDay, 'EEEE')) && daysChecked < 14) {
          nextDay = addDays(nextDay, 1);
          daysChecked++;
        }
        setNextWorkingDay(nextDay);

        // If a date is selected, show slots for that date
        if (selectedDate) {
          const selectedDateObj = parseISO(selectedDate);
          const selectedDayName = format(selectedDateObj, 'EEEE');
          
          // Check if the selected date is within the next two weeks
          const daysDifference = Math.ceil((selectedDateObj - today) / (1000 * 60 * 60 * 24));
          
          if (daysDifference >= 0 && daysDifference <= 14 && mockWorkingDays.includes(selectedDayName)) {
            setAvailableSlots(mockSlots);
          } else {
            setAvailableSlots([]);
          }
        } else {
          setAvailableSlots(mockSlots);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
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
                        variant="outlined"
                        fullWidth
                        onClick={() => onSlotSelect(slot)}
                        className="border-[#2D5043] text-[#2D5043] hover:bg-[#2D5043] hover:text-white"
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