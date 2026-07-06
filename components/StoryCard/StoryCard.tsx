"use client";

import React from "react";
import styles from "./StoryCard.module.css";

export type Story = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  author: {
    name: string;
  };
  createdAt: string;
  savedCount: number;
};

type Props = {
  story: Story;
  isSaved?: boolean;
  onOpen?: (id: string) => void;
  onSave?: (id: string) => void;
};

export const StoryCard: React.FC<Props> = ({
  story,
  isSaved = false,
  onOpen,
  onSave,
}) => {
  return (
    <div className={styles.CC}>
      <img
        className={styles.cover}
        src={story.coverUrl}
        alt={story.title}
      />

      <div className={styles.CCDescription}>
      <div className={styles.autorname} >        
          <span>{story.author.name}</span>
          <span>{story.savedCount} 💾 </span>
      </div>
      
        <div className={styles.PCard}>
          
        <h3 className={styles.CTitle}>{story.title.length > 120
            ? story.title.slice(0, 120) + "..."
            : story.title}</h3>
 
            </div>

        <div className={styles.actions}>
          <button
            className={styles.openBtn}
            onClick={() => onOpen?.(story.id)}
          >
            Переглянути статтю
          </button>

          
          </button>
        </div>
      </div>
    </div>
  );
};