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
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'ep-cool-forest-a5q1g1g1.us-east-2.aws.neon.tech',
    POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
    POSTGRES_USER: process.env.POSTGRES_USER || 'default',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'npg_8eruKvscO9dB',
    POSTGRES_DB: process.env.POSTGRES_DB || 'neondb',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://default:npg_8eruKvscO9dB@ep-cool-forest-a5q1g1g1.us-east-2.aws.neon.tech:5432/neondb?sslmode=require',
    DIRECT_URL: process.env.DIRECT_URL || 'postgresql://default:npg_8eruKvscO9dB@ep-cool-forest-a5q1g1g1.us-east-2.aws.neon.tech:5432/neondb?sslmode=require',
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
