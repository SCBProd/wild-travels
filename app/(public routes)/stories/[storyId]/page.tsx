import {
  getStoryById,
  getRecommendedStories,
} from '../../../../lib/api/storyApi';
import NotFound from './not-found';
import type { Story } from '../../../../types/story';
import StoryPageClient from './StoryClient';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ storyId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { storyId } = await params;

  try {
    const data = await getStoryById(storyId);
    const story = data.story ?? data;

    return {
      title: story.title,
      description: story.description,
    };
  } catch {
    return { title: 'Story not found', robots: { index: false } };
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { storyId } = await params;

  let storyData: Story | null = null;
  let recommendedStories: Story[] = [];

  try {
    const data = await getStoryById(storyId);
    storyData = data.story ?? data;

    if (storyData) {
      recommendedStories = await getRecommendedStories(storyData);
    }
  } catch (error) {
    console.error('Error loading story:', error);
    return <NotFound />;
  }

  if (!storyData) {
    return <NotFound />;
  }

  return (
    <StoryPageClient
      initialStory={storyData}
      initialRecommended={recommendedStories}
    />
  );
}
