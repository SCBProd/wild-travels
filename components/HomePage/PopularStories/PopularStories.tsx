'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './PopularStories.module.css';

type Story = {
  _id: string;
  img: string;
  title: string;
  article: string;
  savedCount: number;
  rate: number;
  date: string;
  ownerId?: {
    _id?: string;
    name?: string;
  } | string;
};

type StoriesResponse = {
  data: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

function StoryCard({ story }: { story: Story }) {
  const authorName =
    typeof story.ownerId === 'object' && story.ownerId?.name
      ? story.ownerId.name
      : 'Автор';

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={story.img} alt={story.title} className={styles.image} />
      </div>

      <div className={styles.metaRow}>
        <span className={styles.author}>{authorName}</span>
        <span className={styles.metaDot}>•</span>
        <span className={styles.saved}>{story.savedCount}</span>
        <span className={styles.bookmarkIcon}>⌑</span>
      </div>

      <h3 className={styles.cardTitle}>{story.title}</h3>

      <div className={styles.actionsRow}>
        <Link href={`/stories/${story._id}`} className={styles.readMore}>
          Переглянути статтю
        </Link>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Зберегти статтю"
        >
          ⌑
        </button>
      </div>
    </article>
  );
}

export default function PopularStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories?type=popular&page=1&perPage=10`);

        if (!res.ok) {
          throw new Error('Failed to fetch stories');
        }

        const json: StoriesResponse = await res.json();
        setStories(json.data ?? []);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>Популярні статті</h2>
            <Link href="/stories" className={styles.allLink}>
              Всі статті
            </Link>
          </div>

          <div className={styles.message}>Завантаження...</div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>Популярні статті</h2>
            <Link href="/stories" className={styles.allLink}>
              Всі статті
            </Link>
          </div>

          <div className={styles.message}>Не вдалося завантажити статті.</div>
        </div>
      </section>
    );
  }

  if (!stories.length) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>Популярні статті</h2>
            <Link href="/stories" className={styles.allLink}>
              Всі статті
            </Link>
          </div>

          <div className={styles.message}>Популярних статей поки немає.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Популярні статті</h2>

          <Link href="/stories" className={styles.allLink}>
            Всі статті
          </Link>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.popular-stories-prev',
              nextEl: '.popular-stories-next',
              disabledClass: styles.navDisabled,
            }}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={16}
            breakpoints={{
              768: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
            }}
          >
            {stories.map(story => (
              <SwiperSlide key={story._id} className={styles.slide}>
                <StoryCard story={story} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.nav}>
            <button
              type="button"
              className={`${styles.navBtn} popular-stories-prev`}
              aria-label="Попередні статті"
            >
              ←
            </button>

            <button
              type="button"
              className={`${styles.navBtn} popular-stories-next`}
              aria-label="Наступні статті"
            >
              →
            </button>
          </div>

          <Link href="/stories" className={styles.allLinkMobile}>
            Всі статті
          </Link>
        </div>
      </div>
    </section>
  );
}