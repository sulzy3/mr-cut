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

export default function ClientLayout({ children, currentPageName }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isHebrew, setIsHebrew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = Cookies.get("userData");
    if (!userData && window.location.pathname !== "/") {
      router.push("/");
      return;
    }

    try {
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData);
        setIsHebrew(parsedUserData.language_preference === "hebrew");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("userData");
    router.push("/");
  };

  const translations = {
    english: {
      home: "Home",
      services: "Services",
      bookNow: "Book Now",
      about: "About",
      management: "Management",
      serviceManagement: "Service Management",
      location: "Location",
      hours: "Hours",
      contact: "Contact",
      followUs: "Follow Us",
      rights: "All rights reserved.",
      logout: "Logout",
      appointmentManagement: "Appointment Management",
      customerManagement: "Customer Management",
      barberManagement: "Barber Management",
    },
    hebrew: {
      home: "דף הבית",
      services: "שירותים",
      bookNow: "הזמן תור",
      about: "אודות",
      management: "ניהול",
      serviceManagement: "ניהול שירותים",
      location: "מיקום",
      hours: "שעות פעילות",
      contact: "צור קשר",
      followUs: "עקבו אחרינו",
      rights: "כל הזכויות שמורות.",
      logout: "התנתק",
      appointmentManagement: "ניהול תורים",
      customerManagement: "ניהול לקוחות",
      barberManagement: "ניהול ברברים",
    },
  };

  const t = isHebrew ? translations.hebrew : translations.english;

  const isBarber =
    currentUser?.userType === "barber" || currentUser?.userType === "admin";

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
      { name: t.customerManagement, href: "/management/customers" },
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F1E6', direction: isHebrew ? 'rtl' : 'ltr' }}>
      <AppBar position="static" sx={{ bgcolor: '#2D5043', zIndex: 1200 }}>
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
              <LanguageToggle isHebrew={isHebrew} setIsHebrew={setIsHebrew} />
              
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

      <Box component="main">{children}</Box>

      <Box
        component="footer"
        sx={{
          bgcolor: '#2D5043',
          color: 'white',
          py: 6,
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
                123 Barber Street
                <br />
                New York, NY 10001
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#AFBFAD', textTransform: 'uppercase', mb: 2 }}>
                {t.hours}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Mon-Fri: 9:00 AM - 8:00 PM
                <br />
                Sat-Sun: 10:00 AM - 6:00 PM
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#AFBFAD', textTransform: 'uppercase', mb: 2 }}>
                {t.contact}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Phone: (555) 123-4567
                <br />
                Email: info@mrcut.com
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
    </Box>
  );
} 