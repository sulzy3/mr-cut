'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Box, Container } from '@mui/material';
import ClientLayout from '@/components/ClientLayout';

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
    <ClientLayout currentPageName="Management">
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {children}
        </Box>
      </Container>
    </ClientLayout>
  );
} 