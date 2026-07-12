import type { Metadata } from 'next';

import { GetSavedStoriesServer } from '@/lib/api/serverApi';
import SavedStoriesClient from './saved/SavedStoriesClient';

export const metadata: Metadata = {
  title: 'Збережені історії | Природні Мандри',
  description:
    'Переглядайте свої збережені історії та швидко повертайтеся до улюблених матеріалів у Природні Мандри.',

  alternates: {
    canonical: '/profile/saved',
  },

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    title: 'Збережені історії | Природні Мандри',
    description: 'Ваші збережені історії в Природні Мандри.',
    url: '/profile/saved',
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
    title: 'Збережені історії | Природні Мандри',
    description: 'Ваші збережені історії в Природні Мандри.',
    images: ['/og-image.jpg'],
  },
};

export default async function SavedStories() {
  const res = await GetSavedStoriesServer();  
  
  return (
    <SavedStoriesClient res={res}/>
  );
}
