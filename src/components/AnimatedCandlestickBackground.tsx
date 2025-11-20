import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import candlestickTheme from '@/assets/candlestick-theme.jpg';

interface AnimatedCandlestickBackgroundProps {
  variant?: 'bullish' | 'bearish' | 'mixed';
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
  imageUrl?: string;
}

export const AnimatedCandlestickBackground = ({
  variant = 'mixed',
  opacity = 0.35,
  speed = 'slow',
  imageUrl,
}: AnimatedCandlestickBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation duration based on speed
  const duration = speed === 'slow' ? 60 : speed === 'medium' ? 40 : 20;

  // Use the candlestick theme image by default
  const backgroundImage = imageUrl || candlestickTheme;

  // Very light gradient overlay - make the image the star
  const gradientOverlay = variant === 'bullish'
    ? 'linear-gradient(180deg, hsla(var(--background), 0.25) 0%, hsla(var(--background), 0.10) 50%, hsla(var(--background), 0.25) 100%)'
    : variant === 'bearish'
      ? 'linear-gradient(180deg, hsla(var(--background), 0.25) 0%, hsla(var(--background), 0.10) 50%, hsla(var(--background), 0.25) 100%)'
      : 'linear-gradient(180deg, hsla(var(--background), 0.25) 0%, hsla(var(--background), 0.15) 50%, hsla(var(--background), 0.25) 100%)';

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Light gradient overlay - barely there */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: gradientOverlay }}
      />

      {/* Static background image - Stable and high quality */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: opacity,
          filter: 'blur(0px) brightness(1.1)',
        }}
      />


      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle radial accents - don't overpower the main image */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background:
            variant === 'bullish'
              ? 'radial-gradient(circle, hsla(var(--bullish), 0.15) 0%, transparent 70%)'
              : variant === 'bearish'
                ? 'radial-gradient(circle, hsla(var(--bearish), 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, hsla(var(--primary), 0.12) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background:
            variant === 'bullish'
              ? 'radial-gradient(circle, hsla(var(--bullish), 0.15) 0%, transparent 70%)'
              : variant === 'bearish'
                ? 'radial-gradient(circle, hsla(var(--bearish), 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, hsla(var(--accent), 0.12) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: duration / 4,
        }}
      />
    </div>
  );
};
