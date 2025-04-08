'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  Stack,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Person, Phone, AccountCircle } from '@mui/icons-material';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    phoneNumber: '',
  });

  useEffect(() => {
    // Check if user is already logged in
    const userData = Cookies.get('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.userType === 'barber' || parsedUserData.userType === 'admin') {
        router.push('/management');
      } else {
        router.push('/dashboard');
      }
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create user data object
    const userData = {
      id: Date.now().toString(), // Temporary ID
      userType: formData.userType,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      createdAt: new Date().toISOString(),
      language_preference: 'english' // Default language
    };

    // Store user data in cookies
    Cookies.set('userData', JSON.stringify(userData), { 
      expires: 7, // Expires in 7 days
      path: '/', // Available across the entire site
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'strict' // Prevent CSRF attacks
    });

    // if user is barber or admin, redirect to management page
    if (formData.userType === 'barber' || formData.userType === 'admin') {
      router.push('/management');
    } else {
      router.push('/dashboard');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Welcome to MRCCUT
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please enter your details to continue
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                select
                label="User Type"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              >
                <MenuItem value="">Select User Type</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="barber">Barber</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
