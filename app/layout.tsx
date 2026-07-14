import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import AppLayout from '@/components/layout/AppLayout/AppLayout';
import AuthProvider from '@/components/providers/AuthProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),

  title: {
    default: 'Природні Мандри',
    template: '%s | Природні Мандри',
  },

  description:
    'Спільнота мандрівників, де можна відкривати нові місця, ділитися власними історіями та знаходити натхнення для наступних подорожей.',

  applicationName: 'Природні Мандри',

  keywords: [
    'мандри',
    'подорожі',
    'туризм',
    'історії',
    'природа',
    'Україна',
    'гори',
    'ліс',
    'маршрути',
    'туристичні місця',
  ],

  authors: [
    {
      name: 'Природні Мандри',
    },
  ],

  creator: 'Природні Мандри',

  publisher: 'Природні Мандри',

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
    ],

    apple: [
      {
        url: '/apple-touch-icon.png',
      },
    ],

    shortcut: ['/favicon.ico'],
  },

  openGraph: {
    type: 'website',

    locale: 'uk_UA',

    siteName: 'Природні Мандри',

    title: 'Природні Мандри',

    description:
      'Спільнота мандрівників, де можна відкривати нові місця та ділитися власними історіями.',

    url: '/',

    images: [
      {
        url: '/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Природні Мандри',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Природні Мандри',

    description:
      'Спільнота мандрівників, де можна відкривати нові місця та ділитися власними історіями.',

    images: ['/Hero.webp'],
  },

  category: 'travel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${montserrat.className} green-bg`}>
        <ThemeProvider>
          <QueryProvider>
            <AppLayout>
              <AuthProvider>{children}</AuthProvider>
              <Toaster position="top-right" />
            </AppLayout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
