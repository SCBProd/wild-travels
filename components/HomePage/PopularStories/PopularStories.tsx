'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getPopularStories } from '@/lib/api/clientApi';
import StoryCard from '@/components/UI/StoryCard/StoryCard';

import { CustomLink } from '@/components/UI/Link/Link';
import { PageTitle } from '@/components/UI/PageTitle/PageTitle';
import LoaderComponent from '@/components/Loader/Loader';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './PopularStories.module.css';

const swiperOptions = {
  modules: [Navigation],
  navigation: {
    prevEl: '.popular-stories-prev',
    nextEl: '.popular-stories-next',
    disabledClass: styles.navDisabled,
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 24,
    },
  },
} as SwiperOptions;

export default function PopularStories() {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popular-stories'],
    queryFn: () => getPopularStories(6),
  });

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error
          ? error.message
          : 'Помилка при завантаженні популярних статей';

      toast.error(message);
    }
  }, [isError, error]);

  if (isLoading) return <LoaderComponent />;

  const stories = data?.data ?? [];

  if (!stories.length) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <PageTitle tag="h2" className={styles.title}>
            Популярні статті
          </PageTitle>

          <CustomLink
            href="/stories"
            variant="button"
            className={styles.desktopLink}
          >
            Всі статті
          </CustomLink>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper {...swiperOptions} className={styles.slider}>
            {stories.map((story, index) => (
              <SwiperSlide key={story._id} className={styles.slide}>
                <StoryCard
                  story={story}
                  isPriority={index === 0}
                  onOpen={(id) => router.push(`/stories/${id}`)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.bottomRow}>
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

          <CustomLink
            href="/stories"
            variant="button"
            className={styles.mobileLink}
          >
            Всі статті
          </CustomLink>
        </div>
      </div>
    </section>
  );
}
