import '../styles/globals.css';
import Script from 'next/script';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('flowbite/dist/flowbite');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
