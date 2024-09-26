import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
      <div>
        <div className='flex max-w-6xl mx-auto flex-col items-center justify-center'>
        <Header />
          <div className="p-4">
          <Component {...pageProps} />
          </div>
        </div>
        <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2'>
        <Footer />
        </div>
      </div>
  );
}

export default MyApp;
