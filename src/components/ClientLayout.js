"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@mui/material";
import LanguageToggle from "@/components/LanguageToggle";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ClientLayout({ children, currentPageName }) {
  const router = useRouter();
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
  console.log(`is current user ${currentUser?.name} a barber? ${isBarber}`);

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
      <div className="min-h-screen bg-[#F5F1E6] flex items-center justify-center">
        <Image
          src="/mrcut.png"
          alt="Mr. Cut"
          width={48}
          height={48}
          className="h-12 w-auto"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F5F1E6] ${isHebrew ? "rtl" : "ltr"}`}>
      <style>{`
        :root {
          --primary: #2D5043;
          --secondary: #8B5A2B;
          --accent: #B87333;
          --neutral: #B5B8BD;
          --background: #F5F1E6;
          --sage: #AFBFAD;
        }
      `}</style>

      <nav className="bg-[#2D5043] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <Image
                  src="/mrcut.png"
                  alt="Mr. Cut"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <LanguageToggle isHebrew={isHebrew} setIsHebrew={setIsHebrew} />

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium ${
                    currentPageName === item.name
                      ? "text-[#B87333]"
                      : "text-white hover:text-[#AFBFAD]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {currentUser && (
                <Button
                  onClick={handleLogout}
                  className="text-white hover:text-[#AFBFAD] flex items-center gap-2"
                  startIcon={<LogOut className="h-5 w-5" />}
                >
                  {t.logout}
                </Button>
              )}
            </div>

            <div className="md:hidden flex items-center gap-4">
              <LanguageToggle isHebrew={isHebrew} setIsHebrew={setIsHebrew} />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#2D5043]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    currentPageName === item.name
                      ? "text-[#B87333] bg-[#233D34]"
                      : "text-white hover:text-[#AFBFAD] hover:bg-[#233D34]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {currentUser && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#AFBFAD] hover:bg-[#233D34] flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  {t.logout}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="bg-[#2D5043] text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/mrcut.png"
              alt="Mr. Cut"
              width={48}
              height={48}
              className="h-16 w-auto"
              priority
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-[#AFBFAD] tracking-wider uppercase">
                {t.location}
              </h3>
              <p className="mt-4 text-base text-gray-300">
                123 Barber Street
                <br />
                New York, NY 10001
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#AFBFAD] tracking-wider uppercase">
                {t.hours}
              </h3>
              <p className="mt-4 text-base text-gray-300">
                Mon-Fri: 9am - 7pm
                <br />
                Sat: 10am - 6pm
                <br />
                Sun: Closed
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#AFBFAD] tracking-wider uppercase">
                {t.contact}
              </h3>
              <p className="mt-4 text-base text-gray-300">
                (555) 123-4567
                <br />
                info@mrcut.com
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#AFBFAD] tracking-wider uppercase">
                {t.followUs}
              </h3>
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#B87333] block"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#B87333] block"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#AFBFAD] pt-8 text-center">
            <p className="text-base text-gray-400">
              &copy; 2024 Mr. Cut. {t.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
