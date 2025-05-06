'use client';

import React from 'react';
import { User } from '@/entities/User';
import { Button } from '@mui/material';

export default function LanguageToggle({ isHebrew, setIsHebrew }) {
  const toggleLanguage = async () => {
    const newLanguage = isHebrew ? 'english' : 'hebrew';
    setIsHebrew(!isHebrew);
    
    try {
      const currentUser = await User.me();
      await User.updateMyUserData({
        language_preference: newLanguage
      });
    } catch (error) {
      // Guest user, just update UI state
      console.log('Guest user, language preference not saved');
    }
  };

  return (
    <Button 
      variant="text" 
      size="small" 
      onClick={toggleLanguage}
      sx={{
        color: 'white',
        '&:hover': {
          color: '#B87333'
        }
      }}
    >
      {isHebrew ? 'English' : 'עברית'}
    </Button>
  );
} 