import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '@/components/AppContext';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <AppProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </AppProvider>
  );
}

export default App;
