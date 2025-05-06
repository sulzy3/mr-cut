'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (phone) => {
    // This regex allows for:
    // - Optional country code starting with +
    // - 10 digits for the main number
    // - Optional spaces, dashes, or dots as separators
    const phoneRegex = /^\+?[\d\s.-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate phone number format
    if (!validatePhoneNumber(phone_number)) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      Cookies.set('userData', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          src="/mrcut.png"
          alt="Mr. Cut"
          width={120}
          height={120}
          priority
        />
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Sign in to Mr. Cut
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            autoComplete="tel"
            autoFocus
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#2D5043',
              '&:hover': {
                bgcolor: '#1A3028',
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 