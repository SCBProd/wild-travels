'use client';

import { Story } from '@/types/story';
import css from './MyStoriesClient.module.css';
import StoriesList from '@/components/ProfilePage/StoriesList/StoriesList';
import Link from 'next/link';

interface Props {
  stories: Story[];
}

export default function MyStoriesClient({ stories }: Props) {
  return (
    <>
      {stories && stories.length > 0 ? (
        <StoriesList stories={stories} />
      ) : (
        <div className={css.null_stories_div}>
          <h2 className={css.text}>
            Ви ще нічого не публікували, поділіться своєю першою історією!
          </h2>
          <Link href="/new-story" className={css.stories_link}>
            Опублікувати історію
          </Link>
        </div>
      )}
    </>
  );
}