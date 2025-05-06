'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';

export default function TestCreatePage() {
  const [formData, setFormData] = useState({
    phone_number: '',
    first_name: '',
    last_name: '',
    specialties: '',
    working_hours: JSON.stringify({
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: { start: '09:00', end: '17:00' }
    }, null, 2),
    photo_url: '',
    bio: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateManager = async () => {
    try {
      const response = await fetch('/api/auth/create-manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: formData.phone_number,
          first_name: formData.first_name,
          last_name: formData.last_name
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage('Manager created successfully!');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  const handleCreateBarber = async () => {
    try {
      const response = await fetch('/api/auth/create-barber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: formData.phone_number,
          first_name: formData.first_name,
          last_name: formData.last_name,
          specialties: formData.specialties.split(',').map(s => s.trim()),
          working_hours: JSON.parse(formData.working_hours),
          photo_url: formData.photo_url,
          bio: formData.bio
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage('Barber created successfully!');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New User
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Specialties (comma-separated)"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Working Hours (JSON)"
          name="working_hours"
          value={formData.working_hours}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />

        <TextField
          fullWidth
          label="Photo URL"
          name="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateManager}
          >
            Create Manager
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateBarber}
          >
            Create Barber
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 