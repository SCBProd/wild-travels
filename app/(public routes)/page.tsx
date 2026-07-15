import Hero from '../../components/HomePage/Hero/hero';
import PopularStories from '../../components/HomePage/PopularStories/PopularStories';
import About from '../../components/HomePage/About/about';
import OurTravellers from '../../components/HomePage/OurTravellers/OurTravellers';
import Join from '@/components/HomePage/Join/join';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Еко-мандри Україною',
  description: 'Відкрий Україну заново — еко-мандри для натхнення',

  keywords: [
    'Природні Мандри',
    'подорожі Україною',
    'історії подорожей',
    'маршрути Україною',
    'мандрівники',
    'туризм',
    'відпочинок в Україні',
    'екотуризм',
    'природа України',
    'туристичні маршрути',
  ],

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  applicationName: 'Природні Мандри',

  category: 'travel',

  creator: 'Природні Мандри',

  publisher: 'Природні Мандри',

  authors: [
    {
      name: 'Природні Мандри',
    },
  ],

  referrer: 'origin-when-cross-origin',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: 'Еко-мандри Україною',
    description: 'Подорожуй екологічно та відкривай красу України',

    url: '/',
    siteName: 'Природні Мандри',
    locale: 'uk_UA',
    type: 'website',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Природні Мандри',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Еко-мандри Україною',
    description: 'Подорожуй екологічно та відкривай красу України',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularStories />
      <About />
      <OurTravellers />
      <Join />
    </>
  );
}
