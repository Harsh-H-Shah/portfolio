'use client';

import Cursor from './Cursor';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <>
      <Cursor />
      {children}
    </>
  );
}
