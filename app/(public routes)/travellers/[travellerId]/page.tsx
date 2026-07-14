import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TravelerClient from './TravelerClient';
import type { Story } from '@/types/story';

interface PageProps {
  params: Promise<{
    travellerId: string;
  }>;
}

async function getTravellerData(travellerId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/travellers/${travellerId}`,
    { cache: 'no-store' },
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { travellerId } = await params;
  const data = await getTravellerData(travellerId);

  if (!data || !data.user) {
    return { title: 'Мандрівника не знайдено | Природні Мандри' };
  }

  return {
    title: `${data.user.name} | Природні Мандри`,
    description: `Профіль мандрівника ${data.user.name}. Читайте історії подорожей та відкривайте нові маршрути.`,
  };
}

export default async function TravelerPage({ params }: PageProps) {
  const { travellerId } = await params;
  const data = await getTravellerData(travellerId);

  if (!data || !data.user) {
    notFound();
  }

  const enrichedStories =
    data.stories?.map((story: Story) => ({
      ...story,
      ownerId: {
        _id: String(data.user._id),
        name: data.user.name,
        avatarUrl: data.user.avatarUrl,
      },
      author: {
        name: data.user.name,
      },
    })) || [];

  return (
    <TravelerClient
      travellerId={travellerId}
      user={data.user}
      stories={enrichedStories}
    />
  );
}
