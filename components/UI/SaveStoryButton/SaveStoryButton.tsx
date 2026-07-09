'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/buttons/btn';
import { Icon } from '@/components/UI/Icon/Icon';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { saveStory, unsaveStory } from '@/lib/api/clientApi';
import styles from './SaveStoryButton.module.css';

type Props = {
  storyId: string;
  isSaved?: boolean;
  onToggle?: (isSaved: boolean) => void;
  className?: string;
};

export default function SaveStoryButton({
  storyId,
  isSaved = false,
  onToggle,
  className = '',
}: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [saved, setSaved] = useState(isSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.error('Увійдіть, щоб зберігати статті');
      return;
    }

    setIsLoading(true);
    try {
      if (saved) {
        await unsaveStory(storyId);
      } else {
        await saveStory(storyId);
      }
      const nextSaved = !saved;
      setSaved(nextSaved);
      onToggle?.(nextSaved);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Не вдалося зберегти статтю';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="tertiary"
      className={`${saved ? styles.savedIcon : ''} ${className}`.trim()}
      onClick={handleClick}
      disabled={isLoading}
      aria-pressed={saved}
      aria-label={saved ? 'Прибрати зі збереженого' : 'Зберегти статтю'}
    >
      <Icon
        name="icon-bookmark"
        className={isLoading ? styles.loadingIcon : ''}
        width={20}
        height={20}
      />
    </Button>
  );
}
