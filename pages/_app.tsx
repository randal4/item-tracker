import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('flowbite/dist/flowbite');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
