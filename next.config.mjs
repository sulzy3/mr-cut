import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qtrypzzcjebvfcihiynt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://neondb_owner:npg_8eruKvscO9dB@ep-twilight-art-a2s6af2z-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    DIRECT_URL: process.env.DIRECT_URL || 'postgresql://neondb_owner:npg_8eruKvscO9dB@ep-twilight-art-a2s6af2z.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;
