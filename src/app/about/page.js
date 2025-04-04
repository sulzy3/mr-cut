'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#2D5043] mb-8">About Mr. Cut</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/mrcut.png"
            alt="Mr. Cut Logo"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-[#8B5A2B] mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Mr. Cut has been serving the community with exceptional haircuts and grooming services since 2010. 
            Our mission is to provide a premium barbering experience in a comfortable and welcoming environment.
          </p>
          <p className="text-gray-700">
            We take pride in our skilled barbers who are trained in the latest techniques and styles, 
            ensuring you leave our shop looking and feeling your best.
          </p>
        </div>
      </div>

      <div className="bg-[#F5F1E6] p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-[#8B5A2B] mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Quality service and attention to detail</li>
          <li>Clean and professional environment</li>
          <li>Skilled and experienced barbers</li>
          <li>Customer satisfaction guaranteed</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-[#8B5A2B] mb-4">Visit Us</h2>
        <p className="text-gray-700 mb-2">
          123 Barber Street, Cityville, ST 12345
        </p>
        <p className="text-gray-700 mb-2">
          Phone: (555) 123-4567
        </p>
        <p className="text-gray-700">
          Email: info@mrcut.com
        </p>
      </div>
    </div>
  );
} 