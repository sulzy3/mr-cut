'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

export default function ManagementCard({ 
  title, 
  description, 
  icon: Icon, 
  href,
  details,
  onEdit,
  onDelete,
  workingHours
}) {
  const renderCardContent = () => (
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          color: '#B87333',
        }}
      >
        {Icon && <Icon size={24} />}
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {details && (
        <Box sx={{ mt: 2 }}>
          {details.map((detail, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {detail.label}: {detail.value}
            </Typography>
          ))}
        </Box>
      )}
      {(onEdit || onDelete) && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          {onEdit && (
            <Button size="small" onClick={onEdit}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button size="small" color="error" onClick={onDelete}>
              Delete
            </Button>
          )}
        </Box>
      )}
    </CardContent>
  );

  const cardProps = {
    sx: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 3,
      },
      bgcolor: '#F5F1E6',
      color: '#2D5043',
    }
  };

  if (!href) {
    return (
      <Card {...cardProps}>
        {renderCardContent()}
      </Card>
    );
  }

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Card {...cardProps}>
        {renderCardContent()}
      </Card>
    </Link>
  );
} 