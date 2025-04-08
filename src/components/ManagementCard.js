import { Card, CardContent, CardActions, Typography, IconButton, Box, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function ManagementCard({ 
  title, 
  description, 
  details = [], 
  onEdit, 
  onDelete,
  actions = true,
  workingHours
}) {
  const formatWorkingHours = (hours) => {
    if (!hours) return null;
    return Object.entries(hours).map(([day, times]) => (
      <Typography key={day} variant="body2" sx={{ mt: 0.5 }}>
        {day.charAt(0).toUpperCase() + day.slice(1)}: {times.isWorking === false ? 'Not working' : `${times.start} - ${times.end}`}
      </Typography>
    ));
  };

  return (
    <Card style={{ minWidth: '280px', width: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
        )}
        {details.map((detail, index) => (
          <Typography key={index} variant="body1">
            {detail.label}: {detail.value}
          </Typography>
        ))}
        {workingHours && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Working Hours:
            </Typography>
            {formatWorkingHours(workingHours)}
          </Box>
        )}
      </CardContent>
      {actions && (
        <CardActions style={{ justifyContent: 'space-between' }}>
          <IconButton onClick={onEdit} size="small">
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete} size="small">
            <Delete />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
} 