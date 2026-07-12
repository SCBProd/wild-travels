import type { Metadata } from 'next';

import Hero from '../../components/HomePage/Hero/hero';
import PopularStories from '../../components/HomePage/PopularStories/PopularStories';
import About from '../../components/HomePage/About/about';
import OurTravellers from '../../components/HomePage/OurTravellers/OurTravellers';
import Join from '@/components/HomePage/Join/join';

export const metadata: Metadata = {
  title: 'Природні Мандри — Платформа для історій про подорожі Україною',
  description:
    'Природні Мандри — платформа для мандрівників, де можна ділитися власними історіями, відкривати нові маршрути, знаходити натхнення та досліджувати найкрасивіші куточки України.',

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
    title: 'Природні Мандри — Платформа для історій про подорожі Україною',
    description:
      'Діліться власними історіями, відкривайте нові маршрути та знаходьте натхнення для наступної подорожі Україною.',

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
    title: 'Природні Мандри — Платформа для історій про подорожі Україною',
    description:
      'Діліться історіями про подорожі, відкривайте нові маршрути та надихайте інших мандрівників.',

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
