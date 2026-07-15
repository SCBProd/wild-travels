import type { Metadata } from 'next';
import StoryPage from './StoryPage';

type Props = {
  params: Promise<{
    storyId: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { storyId } = await params;

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/stories/${storyId}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Story not found');
    }

 const data = await response.json();

const story = data.story ?? data;

const article = story.article ?? '';

const description =
  article.length > 160
    ? `${article.slice(0, 157)}...`
    : article;

return {
  title: story.title,
  description,

  openGraph: {
    title: story.title,
    description,
    type: 'article',
    url: `${process.env.NEXT_PUBLIC_API_URL }/stories/${storyId}`,

    images: [
      {
        url: story.img,
        width: 1200,
        height: 630,
        alt: story.title,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: story.title,
    description,
    images: [story.img],
  },
};
  } catch {
    return {
      title: 'Стаття не знайдена',
      description: 'Стаття не знайдена.',
    };
  }
}

export default function Page() {
  return <StoryPage />;
}