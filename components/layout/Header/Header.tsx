'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import css from './header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isAuthorized = true; // Стан авторизації (true / false)

  const toggleBurger = () => setIsBurgerOpen(!isBurgerOpen);
  const closeBurger = () => setIsBurgerOpen(false);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBurgerOpen]);

  const currentLinks = [
    { name: 'Головна', href: '/' },
    { name: 'Статті', href: '/stories' },
    { name: 'Еко-Мандрівники', href: '/travellers' },
  ];

  // Рендер кнопок авторизації
  const renderAuthButtons = (isMobileBurger = false) => (
    <div
      className={
        isMobileBurger
          ? css.burgerMobileActionOnly
          : css.tabletDesktopAuthWrapper
      }
    >
      <Link
        href="/login"
        className={`${css.btnInverted} ${isMobileBurger ? css.fullWidthBtn : ''}`}
      >
        Вхід
      </Link>
      <Link
        href="/register"
        className={`${css.btnPrimary} ${isMobileBurger ? css.fullWidthBtn : ''}`}
      >
        Реєстрація
      </Link>
    </div>
  );

  // Рендер кнопки публікації статті
  const renderPublishButton = (isMobileBurger = false) => (
    <div
      className={
        isMobileBurger
          ? css.burgerMobileActionOnly
          : css.tabletDesktopPublishWrapper
      }
    >
      <Link
        href="/stories/new"
        className={`${css.btnPrimary} ${isMobileBurger ? css.fullWidthBtn : ''}`}
        onClick={closeBurger}
      >
        Опублікувати статтю
      </Link>
    </div>
  );

  return (
    <header className={css.header}>
      <div className={css.container}>
        {/* Логотип */}
        <Link href="/" className={css.logo} onClick={closeBurger}>
          <Image
            src="/Icons/logo.svg"
            alt="Природні Мандри"
            className={css.logoSvg}
            width={124}
            height={36}
            priority
          />
        </Link>

        {!isAuthPage && (
          <>
            {/* Навігація для Десктопу */}
            <nav className={css.desktopNav}>
              {currentLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${css.navLink} ${pathname === link.href ? css.activeLink : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthorized && (
                <Link
                  href="/profile"
                  className={`${css.navLink} ${pathname === '/profile' ? css.activeLink : ''}`}
                >
                  Мій Профіль
                </Link>
              )}
            </nav>

            {/* Блок дій у головній шапці (Десктоп + Планшет) */}
            <div className={css.headerActions}>
              {!isAuthorized ? (
                <div className={css.guestWrapper}>
                  {renderAuthButtons(false)}
                  <button
                    className={css.burgerButton}
                    onClick={toggleBurger}
                    aria-label="Меню"
                  >
                    <Image
                      src={
                        isBurgerOpen ? '/Icons/close.svg' : '/Icons/menu.svg'
                      }
                      alt="Меню"
                      className={css.burgerIcon}
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              ) : (
                <div className={css.userWrapper}>
                  {renderPublishButton(false)}

                  <div className={css.userProfileHeaderHiddenTablet}>
                    <div className={css.avatarContainer}>
                      <Image
                        src="/Icons/avatar.svg"
                        alt="Аватар"
                        className={css.avatarImg}
                        width={32}
                        height={32}
                      />
                      <span className={css.userName}>Ім&apos;я</span>
                    </div>
                    <div className={css.divider}></div>
                    <button className={css.logoutBtn} aria-label="Вийти">
                      <Image
                        src="/Icons/logout.svg"
                        alt="Вийти"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>

                  <button
                    className={css.burgerButton}
                    onClick={toggleBurger}
                    aria-label="Меню"
                  >
                    <Image
                      src={
                        isBurgerOpen ? '/Icons/close.svg' : '/Icons/menu.svg'
                      }
                      alt="Меню"
                      className={css.burgerIcon}
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Бокова панель (Бургер-меню) */}
            <div
              className={`${css.burgerMenu} ${isBurgerOpen ? css.burgerMenuOpen : ''}`}
            >
              <div className={css.burgerMenuContent}>
                <nav className={css.burgerNav}>
                  {currentLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeBurger}
                      className={pathname === link.href ? css.activeLink : ''}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className={css.burgerFooter}>
                  {/* Дії для телефонів усередині меню */}
                  {!isAuthorized
                    ? renderAuthButtons(true)
                    : renderPublishButton(true)}

                  {isAuthorized && (
                    <div className={css.burgerUserProfileCentered}>
                      <div className={css.avatarContainer}>
                        <Image
                          src="/Icons/avatar.svg"
                          alt="Аватар"
                          className={css.avatarImg}
                          width={32}
                          height={32}
                        />
                        <span className={css.userName}>Ім&apos;я</span>
                      </div>
                      <div className={css.divider}></div>
                      <button className={css.logoutBtn} aria-label="Вийти">
                        <Image
                          src="/Icons/logout.svg"
                          alt="Вийти"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
