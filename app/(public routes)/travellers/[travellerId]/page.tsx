import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import TravelerClient from './TravelerClient';

import type { Story } from '@/types/story';

interface PageProps {
  params: Promise<{
    travellerId: string;
  }>;
}

async function getTraveller(travellerId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/travellers/${travellerId}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { travellerId } = await params;

  const data = await getTraveller(travellerId);

  if (!data) {
    return {
      title: 'Мандрівника не знайдено | Природні Мандри',
    };
  }

  const image =
    data.user.avatarUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.jpg`;

  return {
    title: `${data.user.name} | Природні Мандри`,
    description: `Перегляньте профіль мандрівника ${data.user.name}, ознайомтеся з його історіями та відкрийте нові маршрути для подорожей Україною.`,

    alternates: {
      canonical: `/travellers/${travellerId}`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${data.user.name} | Природні Мандри`,
      description: `Перегляньте профіль мандрівника ${data.user.name} та його історії про подорожі.`,
      url: `/travellers/${travellerId}`,
      siteName: 'Природні Мандри',
      locale: 'uk_UA',
      type: 'profile',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: data.user.name,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${data.user.name} | Природні Мандри`,
      description: `Історії подорожей від ${data.user.name}.`,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { travellerId } = await params;

  const data = await getTraveller(travellerId);

  if (!data) {
    notFound();
  }

  const stories = (data.stories as Story[]).map((story) => ({
    ...story,
    ownerId: {
      _id: String(data.user._id),
      name: data.user.name,
      avatarUrl: data.user.avatarUrl,
    },
    author: {
      name: data.user.name,
    },
  }));

  return (
    <TravelerClient
      travellerId={travellerId}
      user={data.user}
      stories={stories}
    />
  );
}
