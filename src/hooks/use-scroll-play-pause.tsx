import { useEffect, useState, useRef } from 'react';

export const useScrollPlayPause = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Play when element is 50% visible
        setIsPlaying(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: [0.5] }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { isPlaying, setIsPlaying, elementRef };
};
