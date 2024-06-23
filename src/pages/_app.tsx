import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { StyleProvider } from '../context/StyleContext';
/* 
Instalar:
npm install next-auth react
*/
import { SessionProvider, useSession } from "next-auth/react";
import '../globals.css';
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <StyleProvider>
          <Navbar/>
          <Component {...pageProps} />
          <Footer/>
        </StyleProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;