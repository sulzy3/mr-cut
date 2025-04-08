'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Image
          src="/mrcut.png"
          alt="Mr. Cut Logo"
          width={96}
          height={96}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-[#2D5043] mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/"
          className="inline-block bg-[#2D5043] text-white px-6 py-3 rounded-md hover:bg-[#233D34] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 