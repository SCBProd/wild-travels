import AuthHeader from '@/components/layout/AuthHeader/AuthHeader';
import LoginForm from '@/components/LoginPage/LoginForm/LoginForm';
import LoginBar from '@/components/layout/LoginBar/LoginBar';
import css from './loginglobal.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вхід | Природні Мандри',
  description:
    'Увійдіть до свого облікового запису Природні Мандри, щоб керувати профілем, публікувати історії про подорожі, зберігати улюблені матеріали та відкривати нові маршрути Україною.',

  alternates: {
    canonical: '/login',
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
    title: 'Вхід | Природні Мандри',
    description:
      'Увійдіть до Природні Мандри, щоб публікувати історії про подорожі, знаходити нові маршрути та стати частиною спільноти мандрівників.',
    url: '/login',
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
    title: 'Вхід | Природні Мандри',
    description:
      'Увійдіть до Природні Мандри та відкривайте нові маршрути, публікуйте власні історії й знаходьте натхнення для наступних подорожей.',
    images: ['/og-image.jpg'],
  },
};

export default function Login() {
  return (
    <div className={css.wrapper}>
      <AuthHeader />

      <div className={css.main}>
        <div className={css.container}>
          <LoginBar />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
