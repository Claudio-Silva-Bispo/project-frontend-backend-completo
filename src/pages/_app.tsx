import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
/* 
Instalar:
npm install next-auth react
*/
import { SessionProvider, useSession } from "next-auth/react";
import '../globals.css';


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;