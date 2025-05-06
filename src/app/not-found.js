'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, Button, Container } from '@mui/material';

export default function NotFound() {
  return (
    <Container>
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          textAlign: 'center'
        }}
      >
        <Image
          src="/mrcut.png"
          alt="Mr. Cut Logo"
          width={96}
          height={96}
          style={{ margin: '0 auto 2rem' }}
        />
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: '#2D5043',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          404 - Page Not Found
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            mb: 4
          }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{
            bgcolor: '#2D5043',
            color: 'white',
            px: 3,
            py: 1.5,
            '&:hover': {
              bgcolor: '#233D34'
            }
          }}
        >
          Return Home
        </Button>
      </Box>
    </Container>
  );
} 