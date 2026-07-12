// app/story/[storyId]/StoryPageClient.tsx
'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../../../lib/store/useAuthStore';

import StoryDetails from '../../../../components/StoryPage/StoryDetails/StoryDetails';
import SaveStory from '../../../../components/StoryPage/SaveStory/SaveStory';
import { RecommendedStories } from '../../../../components/StoryPage/RecomendedStories/RecommendedStories';
import ErrorWhileSavingModal from '../../../../components/ui/ErrorWhileSavingModal/ErrorWhileSavingModal';

import {
  addSavedArticle,
  removeSavedArticle,
} from '../../../../lib/api/storyApi';
import type { Story } from '../../../../types/story';

import css from './page.module.css';

interface Props {
  initialStory: Story;
  initialRecommended: Story[];
}

export default function StoryPageClient({
  initialStory,
  initialRecommended,
}: Props) {
  const [story, setStory] = useState<Story>(initialStory);
  const [recommended, setRecommended] = useState<Story[]>(initialRecommended);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleRecommendedSave = async (id: string) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    try {
      const current = recommended.find((s) => s._id === id);
      if (!current) return;

      if (current.isSaved) {
        await removeSavedArticle(id);
        toast.success('Історію видалено зі збережених');
      } else {
        await addSavedArticle(id);
        toast.success('Історію збережено');
      }

      setRecommended((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isSaved: !item.isSaved,
                savedCount: item.savedCount + (item.isSaved ? -1 : 1),
              }
            : item,
        ),
      );
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      if (err.response?.status === 409) {
        toast.success('Історія вже збережена');
        setRecommended((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isSaved: true } : item,
          ),
        );
        return;
      }
      toast.error(err.response?.data?.error ?? 'Помилка збереження');
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    setSaveLoading(true);
    try {
      if (story.isSaved) {
        await removeSavedArticle(story._id);
        setStory((prev) => ({
          ...prev,
          isSaved: false,
          savedCount: prev.savedCount - 1,
        }));
        toast.success('Історію видалено зі збережених');
      } else {
        await addSavedArticle(story._id);
        setStory((prev) => ({
          ...prev,
          isSaved: true,
          savedCount: prev.savedCount + 1,
        }));
        toast.success('Історію збережено');
      }
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      if (err.response?.status === 409) {
        setStory((prev) => ({ ...prev, isSaved: true }));
        toast.success('Історія вже була збережена');
        return;
      }
      toast.error(err.response?.data?.error ?? 'Помилка збереження');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <main className={css.page}>
      <StoryDetails story={story} />
      <SaveStory
        isSaved={story.isSaved}
        isLoading={saveLoading}
        onSave={handleSave}
      />
      <RecommendedStories
        stories={recommended}
        onSave={handleRecommendedSave}
      />
      {showModal && (
        <ErrorWhileSavingModal onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
