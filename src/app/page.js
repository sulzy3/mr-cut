'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPageUrl } from '@/utils';
import { Button, Card, CardContent } from '@mui/material';
import { Calendar, Clock, MapPin, Scissors } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80"
            alt="Barber Shop"
            fill
            priority
          />
          <div className="absolute inset-0 bg-[#2D5043]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <Image 
            src="/mrcut.png"
            alt="Mr. Cut"
            width={128}
            height={128}
            className="h-32 mx-auto mb-6"
          />
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white">
            OLD SCHOOL - NEW STYLE
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-[#F5F1E6]">
            Experience precision haircuts and grooming services from expert barbers who understand your style.
          </p>
          <div className="mt-10">
            <Link href={createPageUrl('Book')}>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  bgcolor: '#B87333',
                  '&:hover': {
                    bgcolor: '#8B5A2B',
                  },
                  color: 'white',
                }}
              >
                Book Your Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-[#F5F1E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2D5043]">Why Choose Us</h2>
            <div className="w-24 h-1 bg-[#B87333] mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', borderColor: '#AFBFAD' }}>
              <CardContent>
                <Scissors className="h-8 w-8 text-[#2D5043] mb-4" />
                <h3 className="text-lg font-medium text-[#2D5043]">Expert Barbers</h3>
                <p className="mt-2 text-[#8B5A2B]">
                  Skilled professionals with years of experience
                </p>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', borderColor: '#AFBFAD' }}>
              <CardContent>
                <Calendar className="h-8 w-8 text-[#2D5043] mb-4" />
                <h3 className="text-lg font-medium text-[#2D5043]">Easy Booking</h3>
                <p className="mt-2 text-[#8B5A2B]">
                  Book your appointment online anytime
                </p>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', borderColor: '#AFBFAD' }}>
              <CardContent>
                <Clock className="h-8 w-8 text-[#2D5043] mb-4" />
                <h3 className="text-lg font-medium text-[#2D5043]">Flexible Hours</h3>
                <p className="mt-2 text-[#8B5A2B]">
                  Open 6 days a week for your convenience
                </p>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', borderColor: '#AFBFAD' }}>
              <CardContent>
                <MapPin className="h-8 w-8 text-[#2D5043] mb-4" />
                <h3 className="text-lg font-medium text-[#2D5043]">Prime Location</h3>
                <p className="mt-2 text-[#8B5A2B]">
                  Easily accessible in the heart of the city
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2D5043]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready for a fresh look?</span>
            <span className="block text-[#AFBFAD] text-xl mt-2">
              Book your appointment today and experience the difference.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <Link href={createPageUrl('Book')}>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  bgcolor: '#B87333',
                  '&:hover': {
                    bgcolor: '#8B5A2B',
                  },
                  color: 'white',
                }}
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}