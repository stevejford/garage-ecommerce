import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Geelong Garage Doors',
  description: 'Quality garage doors and accessories for your home',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'material-button-primary',
          footerActionLink: 'font-medium text-blue-500 hover:text-blue-600',
          card: 'material-card',
          navbar: 'bg-white border-b border-gray-200',
        }
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} antialiased bg-stone-100`}>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                fontFamily: 'Geist, sans-serif',
              },
              success: {
                iconTheme: {
                  primary: '#2196f3',
                  secondary: '#fff',
                },
              },
            }}
          />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
