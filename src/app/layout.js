import MuiProvider from '@/components/MuiProvider';
import ClientLayout from '@/components/ClientLayout';
import './globals.css';

export const metadata = {
  title: 'Mr. Cut',
  description: 'Professional barber shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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