'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Cursor from './Cursor';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Check if user has seen the intro before (this session)
  // Check removed to force loading screen every time
  /*
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenLokiIntro');
    if (hasSeenIntro) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);
  */

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLokiIntro', 'true');
    setIsLoading(false);
    // Small delay before showing content for smoother transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <>
      <Cursor />
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div style={{ 
        opacity: showContent ? 1 : 0, 
        transition: 'opacity 0.5s ease-out',
        visibility: showContent ? 'visible' : 'hidden'
      }}>
        {children}
      </div>
    </>
  );
}
