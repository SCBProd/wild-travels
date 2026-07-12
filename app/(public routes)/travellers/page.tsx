import type { Metadata } from 'next';

import TravellersList from '@/components/TravellersPage/TravellersList/TravellersList';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

import css from './Page.module.css';

export const metadata: Metadata = {
  title: 'Мандрівники | Природні Мандри',
  description:
    'Знайомтеся з мандрівниками Природні Мандри, переглядайте їхні профілі, відкривайте історії подорожей та знаходьте натхнення для власних пригод.',

  keywords: [
    'мандрівники',
    'автори історій',
    'профілі мандрівників',
    'подорожі Україною',
    'туристи',
    'спільнота мандрівників',
    'Природні Мандри',
  ],

  alternates: {
    canonical: '/travellers',
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Мандрівники | Природні Мандри',
    description:
      'Переглядайте профілі мандрівників, знайомтеся з авторами та відкривайте нові історії про подорожі Україною.',
    url: '/travellers',
    siteName: 'Природні Мандри',
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Природні Мандри — Мандрівники',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Мандрівники | Природні Мандри',
    description:
      'Знайомтеся з мандрівниками та відкривайте нові історії про подорожі Україною.',
    images: ['/og-image.jpg'],
  },
};

export default async function TravellersPage() {
  return (
    <div className={css.travellersPage}>
      <div className="container travellers-page-container">
        <PageTitle className={css.pageTitleTravellers}>Мандрівники</PageTitle>

        <TravellersList />
      </div>
    </div>
  );
}
