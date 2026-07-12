import type { Metadata } from 'next';

import AuthFooter from '@/components/layout/AuthFooter/AuthFooter';
import AuthHeader from '@/components/layout/AuthHeader/AuthHeader';
import RegistrationForm from '@/components/RegisterPage/RegistrationForm/RegistrationForm';
import LoginBar from '@/components/layout/LoginBar/LoginBar';

import css from './registrationglobal.module.css';

export const metadata: Metadata = {
  title: 'Реєстрація | Природні Мандри',
  description:
    'Створіть обліковий запис Природні Мандри, щоб ділитися історіями про подорожі, відкривати нові маршрути та приєднатися до спільноти мандрівників.',

  alternates: {
    canonical: '/register',
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
    title: 'Реєстрація | Природні Мандри',
    description:
      'Створіть обліковий запис Природні Мандри, щоб ділитися історіями про подорожі, відкривати нові маршрути та приєднатися до спільноти мандрівників.',
    url: '/register',
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
    title: 'Реєстрація | Природні Мандри',
    description:
      'Приєднуйтеся до Природні Мандри та діліться своїми історіями про подорожі Україною.',
    images: ['/og-image.jpg'],
  },
};

export default function Register() {
  return (
    <div className={css.wrapper}>
      <AuthHeader />

      <div className={css.main}>
        <div className={css.container}>
          <LoginBar />
          <RegistrationForm />
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
