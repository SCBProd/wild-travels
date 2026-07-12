import type { Metadata } from 'next';
import Link from 'next/link';

import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: '404 — Сторінку не знайдено',

  description:
    'Сторінку, яку ви шукаєте, не знайдено. Поверніться на головну сторінку та продовжуйте відкривати нові місця разом із «Природні Мандри».',

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: '/404',
  },

  openGraph: {
    title: '404 — Сторінку не знайдено',
    description:
      'Сторінку, яку ви шукаєте, не знайдено. Поверніться на головну сторінку «Природні Мандри».',
    url: '/404',
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
    title: '404 — Сторінку не знайдено',
    description: 'Сторінку, яку ви шукаєте, не знайдено.',
    images: ['/og-image.jpg'],
  },
};

export default function NotFound() {
  return (
    <div className="container">
      <div className={css.wrapper}>
        <h1 className={css.title}>404 — Сторінку не знайдено</h1>

        <p className={css.description}>
          На жаль, сторінка, яку ви шукаєте, не існує або її було переміщено.
        </p>

        <Link className={css.link} href="/">
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}
