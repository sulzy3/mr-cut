import MuiProvider from '@/components/MuiProvider.jsx';
import ClientLayout from '@/components/ClientLayout.jsx';
import './globals.css';

export const metadata = {
  title: 'Mr. Cut',
  description: 'Professional barber shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <MuiProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </MuiProvider>
      </body>
    </html>
  );
} 