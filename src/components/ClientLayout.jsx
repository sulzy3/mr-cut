"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut } from "lucide-react";
import { 
  Button, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Box, 
  Container, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import LanguageToggle from "@/components/LanguageToggle.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { getTranslations } from "@/translations";

export default function ClientLayout({ children, currentPageName }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isHebrew, setIsHebrew] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = Cookies.get("userData");
    const langPref = Cookies.get("langPref");
    
    if (!userData && window.location.pathname !== "/") {
      router.push("/");
      return;
    }

    try {
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData);
      }
      // Set language preference from cookie or default to false
      setIsHebrew(langPref === "hebrew");
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  // Add effect to update language preference cookie
  useEffect(() => {
    Cookies.set("langPref", isHebrew ? "hebrew" : "english");
  }, [isHebrew]);

  const handleLogout = () => {
    Cookies.remove("userData");
    router.push("/");
  };

  const t = getTranslations(isHebrew);

  const isBarber =
    currentUser?.role.toUpperCase() === "BARBER" || currentUser?.userType.toUpperCase() === "ADMIN";

  let navigation = [
    { name: t.home, href: "/dashboard" },
    { name: t.bookNow, href: "/book" },
    { name: t.about, href: "/about" },
  ];

  if (isBarber) {
    navigation = [
      { name: t.management, href: "/management" },
      { name: t.serviceManagement, href: "/management/services" },
      { name: t.appointmentManagement, href: "/management/appointments" },
      { name: t.barberManagement, href: "/management/barbers" },
    ];
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh', 
          bgcolor: '#F5F1E6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          src="/mrcut.png"
          alt="Mr. Cut"
          width={48}
          height={48}
          style={{ height: '48px', width: 'auto' }}
          priority
        />
      </Box>
    );
  }

  return (
    <Box
        className={"client layout"}

        sx={{
      minHeight: '100vh', 
      bgcolor: '#F5F1E6', 
      direction: isHebrew ? 'rtl' : 'ltr',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar position="fixed" sx={{ bgcolor: '#2D5043', zIndex: 1200 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/mrcut.png"
                alt="Mr. Cut"
                width={48}
                height={48}
                style={{ height: '48px', width: 'auto' }}
                priority
              />
            </Link>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/*<LanguageToggle isHebrew={isHebrew} setIsHebrew={setIsHebrew} />*/}
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    textDecoration: 'none',
                    color: currentPageName === item.name ? '#B87333' : 'white',
                    '&:hover': { color: '#AFBFAD' }
                  }}
                >
                  <Typography variant="body1">{item.name}</Typography>
                </Link>
              ))}

              <Button
                onClick={handleLogout}
                sx={{ 
                  color: 'white',
                  '&:hover': { color: '#AFBFAD' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
                startIcon={<LogOut style={{ height: '20px', width: '20px' }} />}
              >
                {t.logout}
              </Button>
            </Box>
          )}

          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LanguageToggle isHebrew={isHebrew} setIsHebrew={setIsHebrew} />
              <IconButton
                color="inherit"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X style={{ height: '24px', width: '24px' }} />
                ) : (
                  <Menu style={{ height: '24px', width: '24px' }} />
                )}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px', // Add margin top to account for fixed AppBar
          minHeight: 'calc(100vh - 64px)', // Subtract AppBar height
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          bgcolor: '#2D5043',
          color: 'white',
          py: 6,
          mt: 'auto' // Push footer to bottom
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Image
              src="/mrcut.png"
              alt="Mr. Cut"
              width={48}
              height={48}
              style={{ height: '64px', width: 'auto' }}
              priority
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#AFBFAD', textTransform: 'uppercase', mb: 2 }}>
                {t.location}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                קנאי הגליל 9
                <br />
                ירושלים
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#AFBFAD', textTransform: 'uppercase', mb: 2 }}>
                {t.hours}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                ראשון עד חמישי:<br/>
                09:00 - 20:00
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#AFBFAD', textTransform: 'uppercase', mb: 2 }}>
                {t.contact}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                טלפון: 053-7152798
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#AFBFAD', textTransform: 'uppercase', mb: 2 }}>
                {t.followUs}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Facebook
                <br />
                Instagram
                <br />
                Twitter
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © {new Date().getFullYear()} Mr. Cut. {t.rights}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: '#2D5043',
            width: 240,
          },
        }}
      >
        <List>
          {navigation.map((item) => (
            <ListItem
              key={item.name}
              component={Link}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                color: currentPageName === item.name ? '#B87333' : 'white',
                '&:hover': {
                  bgcolor: '#233D34',
                  color: '#AFBFAD',
                },
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem
            button
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: '#233D34',
                color: '#AFBFAD',
              },
            }}
          >
            <LogOut style={{ height: '20px', width: '20px', marginRight: '8px' }} />
            <ListItemText primary={t.logout} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
} 