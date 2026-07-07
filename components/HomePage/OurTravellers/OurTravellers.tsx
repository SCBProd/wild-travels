'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { SwiperOptions } from 'swiper/types';
import { Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

import styles from './OurTravellers.module.css';

type Traveller = {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
};

const travellers: Traveller[] = [
  {
    _id: '9',
    name: 'Анастасія Олійник',
    avatarUrl: '/Image/travellers/traveller-9.jpg',
    articlesAmount: 12,
  },
  {
    _id: '12',
    name: 'Назар Ткаченко',
    avatarUrl: '/Image/travellers/traveller-12.jpg',
    articlesAmount: 5,
  },
  {
    _id: '10',
    name: 'Єва Бондаренко',
    avatarUrl: '/Image/travellers/traveller-10.jpg',
    articlesAmount: 9,
  },
  {
    _id: '11',
    name: 'Дмитро Романенко',
    avatarUrl: '/Image/travellers/traveller-11.jpg',
    articlesAmount: 21,
  },
  {
    _id: '1',
    name: 'Олександра Бондаренко',
    avatarUrl: '/Image/travellers/traveller-1.jpg',
    articlesAmount: 32,
  },
  {
    _id: '2',
    name: 'Софія Мельник',
    avatarUrl: '/Image/travellers/traveller-2.jpg',
    articlesAmount: 12,
  },
  {
    _id: '3',
    name: 'Дарина Ковальчук',
    avatarUrl: '/Image/travellers/traveller-3.jpg',
    articlesAmount: 19,
  },
  {
    _id: '4',
    name: 'Олександр Шевчук',
    avatarUrl: '/Image/travellers/traveller-4.jpg',
    articlesAmount: 0,
  },
  {
    _id: '5',
    name: 'Владислав Поліщук',
    avatarUrl: '/Image/travellers/traveller-5.jpg',
    articlesAmount: 10,
  },
  {
    _id: '6',
    name: 'Софія Ковальчук',
    avatarUrl: '/Image/travellers/traveller-6.jpg',
    articlesAmount: 0,
  },
  {
    _id: '7',
    name: 'Поліна Романенко',
    avatarUrl: '/Image/travellers/traveller-7.jpg',
    articlesAmount: 4,
  },
  {
    _id: '8',
    name: 'Іван Ковальчук',
    avatarUrl: '/Image/travellers/traveller-8.jpg',
    articlesAmount: 12,
  },
];

function TravellerCard({
  traveller,
  className,
}: {
  traveller: Traveller;
  className?: string;
}) {
  return (
    <article className={className}>
      <div className={styles.avatarWrap}>
        {traveller.avatarUrl ? (
          <Image
            src={traveller.avatarUrl}
            alt={traveller.name}
            width={80}
            height={80}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder} aria-hidden="true" />
        )}
      </div>

      <h3 className={styles.cardTitle}>{traveller.name}</h3>
      <p className={styles.cardMeta}>Статей: {traveller.articlesAmount}</p>

      <Link href={`/travellers/${traveller._id}`} className={styles.profileLink}>
        Переглянути профіль
      </Link>
    </article>
  );
}

export default function OurTravellers() {
  const swiperOptions = {
  modules: [Grid, Navigation],
  navigation: {
    prevEl: '.our-travellers-prev',
    nextEl: '.our-travellers-next',
    disabledClass: styles.navDisabled,
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  grid: {
    rows: 3,
    fill: 'row',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    1440: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 24,
      grid: {
        rows: 1,
        fill: 'row',
      },
    },
  },
} as SwiperOptions;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Наші Мандрівники</h2>

          <Link href="/travellers" className={styles.allLink}>
            Всі мандрівники
          </Link>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper {...swiperOptions}>
            {travellers.map(traveller => (
              <SwiperSlide key={traveller._id} className={styles.slide}>
                <TravellerCard traveller={traveller} className={styles.card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.nav}>
            <button
              type="button"
              className={`${styles.navBtn} our-travellers-prev`}
              aria-label="Попередні мандрівники"
            >
              ←
            </button>

            <button
              type="button"
              className={`${styles.navBtn} our-travellers-next`}
              aria-label="Наступні мандрівники"
            >
              →
            </button>
          </div>

          <Link href="/travellers" className={styles.allLinkMobile}>
            Всі мандрівники
          </Link>
        </div>
      </div>
    </section>
  );
}