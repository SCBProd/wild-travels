'use client';

import { useEffect, useState } from 'react';

import StoryCard from '@/components/ui/StoryCard/StoryCard';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import type { Story } from '@/types/story';
import css from './RecommendedStories.module.css';

type Props = {
  stories: Story[];
  onSave?: (id: string) => void;
};

export const RecommendedStories = ({ stories, onSave }: Props) => {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!stories.length) {
    return null;
  }

  return (
    <section className={css.section}>
      <PageTitle className={css.title}>Вам також сподобається</PageTitle>

      <div className={css.list}>
        {stories.slice(0, visibleCount).map((story) => (
          <StoryCard key={story._id} story={story} onSave={onSave} />
        ))}
      </div>
    </section>
  );
};
