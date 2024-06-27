import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { StyleProvider } from '../context/StyleContext';
import { SessionProvider } from "next-auth/react";
import '../globals.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import VisitorTracker from '@/components/VisitorTracker';
import RightSidebar from '@/components/RightSidebar';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [hydrated, setHydrated] = useState(false);
  const [isReadingRulerActive, setIsReadingRulerActive] = useState(false);
  const [isTextZoomActive, setIsTextZoomActive] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  if (!hydrated) {
    return null; // ou um loader/spinner enquanto o componente não está hidratado
  }

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <StyleProvider>
          <Navbar />
          <div className="flex">
            <RightSidebar />
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
          </div>
          <VisitorTracker />
          <Footer />
        </StyleProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
