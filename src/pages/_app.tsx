import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { StyleProvider } from '../context/StyleContext';
import { SessionProvider } from "next-auth/react";
import '../globals.css';
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer';
import VisitorTracker from '@/components/VisitorTracker';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // ou um loader/spinner
  }

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <StyleProvider>
          <Navbar/>
          <VisitorTracker />
          <Component {...pageProps} />
          <Footer/>
        </StyleProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
