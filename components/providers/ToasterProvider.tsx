"use client";

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#6bcb77',
              color: 'white',
              transition: 'all 1.5s ease-out',
            },
          },
          error: {
            style: {
              background: '#ff2727',
              color: 'white',
              transition: 'all 1.5s ease-out',
            },
          },
        }}
      />
    </>
  );
}
