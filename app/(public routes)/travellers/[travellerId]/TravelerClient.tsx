'use client';

import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import MessageNoStories from '@/components/ui/MessageNoStories/MessageNoStories';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';

import type { Story } from '@/types/story';
import type { Traveller } from '@/types/traveller';
import styles from './Page.module.css';

interface TravelerClientProps {
  travellerId: string;
  user: Traveller;
  stories: Story[];
}

export default function TravelerClient({
  travellerId,
  user,
  stories,
}: TravelerClientProps) {
  const hasStories = stories.length > 0;

  return (
    <main className={`container ${styles.pageContainer}`}>
      <TravellerInfo traveller={user} />

      <PageTitle tag="h2" className={styles.title}>
        Статті Мандрівника
      </PageTitle>

      {hasStories ? (
        <TravellersStories ownerId={travellerId} perPage={6} />
      ) : (
        <div className={styles.messageWrapper}>
          <MessageNoStories
            text="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            linkTo="/stories"
          />
        </div>
      )}
    </main>
  );
}
