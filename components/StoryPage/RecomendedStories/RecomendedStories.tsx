'use client';

import { useRouter } from 'next/navigation';
import css from "./RecomendedStories.module.css";

import StoryCard from "@/components/UI/StoryCard/StoryCard";

import type { Story } from "@/types/story";

type Props = {
  stories: Story[];
};

export const RecommendedStories = ({
  stories,
}: Props) => {
  const router = useRouter();

  if (!stories.length) {
    return null;
  }

  return (
    <section>
      <h2>
        Вам також сподобається
      </h2>

      <div className={css.list}>
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            isSaved={story.isSaved}
            onOpen={(id) => router.push(`/stories/${id}`)}
          />
        ))}
      </div>
    </section>
  );
};
