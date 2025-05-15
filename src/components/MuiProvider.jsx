'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './EmotionCache';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/he';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  direction:'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function MuiProvider({ children }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'he'}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
} 