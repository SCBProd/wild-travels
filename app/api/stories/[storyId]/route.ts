import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

type RawCategory = { _id: string; category: string } | string;

type RawStory = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: RawCategory;
  date: string;
  rate: number;
  savedCount: number;
  ownerId: { _id: string; name: string } | string;
  isSaved?: boolean;
};

function toStory(raw: RawStory) {
  return {
    ...raw,
    category:
      typeof raw.category === 'object' ? raw.category.category : raw.category,
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ storyId: string }> },
) {
  try {
    const { storyId } = await params;
    const cookieStore = await cookies();

    const storyRes = await api.get<RawStory>(`/stories/${storyId}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    const story = toStory(storyRes.data);
    const categoryId =
      typeof storyRes.data.category === 'object'
        ? storyRes.data.category._id
        : undefined;

    let recommendedStories: ReturnType<typeof toStory>[] = [];
    if (categoryId) {
      const recommendedRes = await api.get<{
        data: { stories: RawStory[] };
      }>('/stories/recommended', {
        params: { category: categoryId, perPage: 4 },
      });

      recommendedStories = recommendedRes.data.data.stories
        .filter((s) => s._id !== story._id)
        .map(toStory);
    }

    return NextResponse.json({ story, recommendedStories });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          message: error.response?.data?.message || 'Статтю не знайдено',
        },
        { status: error.response?.status || 404 },
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
