'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Box, Container, Typography } from '@mui/material';

export default function ManagementLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const userData = Cookies.get('userData');
    if (!userData) {
      router.push('/');
      return;
    }

    const { userType } = JSON.parse(userData);
    if (userType !== 'barber' && userType !== 'admin') {
      router.push('/dashboard');
      return;
    }
  }, [router]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {children}
      </Box>
    </Container>
  );
} 