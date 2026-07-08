"use client";

import Image from "next/image";
import { Button } from "@/components/UI/buttons/btn";
import SaveStoryButton from "@/components/UI/SaveStoryButton/SaveStoryButton";
import type { Story } from "@/types/story";
import styles from "./StoryCard.module.css";

type Props = {
  story: Story;
  isSaved?: boolean;
  isPriority?: boolean;
  onOpen?: (id: string) => void;
};

export default function StoryCard({
  story,
  isSaved = false,
  isPriority = false,
  onOpen,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          fill
          className={styles.image}
          priority={isPriority}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {story.ownerId.name}
          <span className={styles.metaSeparator}>·</span>
          {story.rate}
        </p>

        <h3 className={styles.title}>{story.title}</h3>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            className={styles.infoBtn}
            onClick={() => onOpen?.(story._id)}
          >
            Переглянути статтю
          </Button>

          <SaveStoryButton
            storyId={story._id}
            isSaved={isSaved}
            className={styles.iconBtn}
          />
        </div>
      </div>
    </div>
  );
}