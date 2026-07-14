'use client';

import { useState } from 'react';
import Image from 'next/image';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { toast } from 'react-hot-toast';
import css from './userBar.module.css';

type UserBarProps = {
  user?: {
    name: string;
    avatar?: string;
  } | null;
};

export default function UserBar({ user }: UserBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const userName = user?.name || 'Користувач';
  const userAvatar = user?.avatar || '/Icons/avatar.svg';

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('Клік на кнопку виходу! Поточний стан модалки:', isModalOpen);

    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();

      clearIsAuthenticated();
      setIsModalOpen(false);

      window.location.href = '/';
    } catch {
      toast.error('Не вдалося вийти з системи');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.profileInfo}>
        <Image
          src={userAvatar}
          alt="Аватар"
          width={40}
          height={40}
          className={css.avatar}
          unoptimized
        />
        <span className={css.name}>{userName}</span>
      </div>

      <div className={css.divider}></div>

      <button
        type="button"
        className={css.logoutBtn}
        onClick={openModal}
        disabled={isLoggingOut}
      >
        <Image src="/Icons/logout.svg" alt="Вихід" width={24} height={24} />
      </button>

      {isModalOpen && (
        <div className={css.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={css.modalBox} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={css.closeBtn}
              onClick={() => setIsModalOpen(false)}
              disabled={isLoggingOut}
            >
              <Image
                src="/Icons/close.svg"
                alt="Закрити"
                width={20}
                height={20}
              />
            </button>

            <h2 className={css.modalTitle}>Ви точно хочете вийти?</h2>
            <p className={css.modalSubtitle}>Ми будемо сумувати за вами!</p>

            <div className={css.modalButtons}>
              <button
                type="button"
                className={css.cancelBtn}
                onClick={() => setIsModalOpen(false)}
                disabled={isLoggingOut}
              >
                Відмінити
              </button>
              <button
                type="button"
                className={css.confirmBtn}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Вихід...' : 'Вийти'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
