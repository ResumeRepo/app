import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2'>
      <Header />
        <Component {...pageProps} />

      </div>
      <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2'>
      <Footer />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
