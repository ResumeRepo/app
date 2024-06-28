import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
// import PlausibleProvider from 'next-plausible';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/*<PlausibleProvider domain='nextrole.app'>*/}
      <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2'>
      <Header />
        <Component {...pageProps} />

      </div>
      <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2'>
      <Footer />
      </div>

      {/*</PlausibleProvider>*/}
    </SessionProvider>
  );
}

export default MyApp;
