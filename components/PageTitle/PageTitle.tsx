import React from 'react';
import css from './PageTitle.module.css';

interface PageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return <h1 className={css.title}>{children}</h1>;
}
