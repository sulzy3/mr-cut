import { Box, Typography, TextField, Grid, FormControlLabel, Checkbox } from '@mui/material';

export default function WorkingHoursEditor({ 
  workingHours, 
  onChange,
  isMobile = false
}) {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleTimeChange = (day, field, value) => {
    const newWorkingHours = {
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [field]: value
      }
    };
    onChange(newWorkingHours);
  };

  const handleWorkingDayChange = (day, isWorking) => {
    const newWorkingHours = {
      ...workingHours,
      [day]: {
        ...workingHours[day],
        isWorking,
        start: isWorking ? workingHours[day]?.start || '09:00' : null,
        end: isWorking ? workingHours[day]?.end || '17:00' : null
      }
    };
    onChange(newWorkingHours);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Working Hours
      </Typography>
      <Grid container spacing={2}>
        {days.map((day) => (
          <Grid item xs={12} key={day.key}>
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={workingHours[day.key]?.isWorking !== false}
                    onChange={(e) => handleWorkingDayChange(day.key, e.target.checked)}
                  />
                }
                label={
                  <Typography variant="subtitle1">
                    {day.label}
                  </Typography>
                }
              />
              {workingHours[day.key]?.isWorking !== false && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Start Time"
                      type="time"
                      value={workingHours[day.key]?.start || '09:00'}
                      onChange={(e) => handleTimeChange(day.key, 'start', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      size={isMobile ? "medium" : "small"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="End Time"
                      type="time"
                      value={workingHours[day.key]?.end || '17:00'}
                      onChange={(e) => handleTimeChange(day.key, 'end', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      size={isMobile ? "medium" : "small"}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 