import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedCandlestickBackgroundProps {
  variant?: 'bullish' | 'bearish' | 'mixed';
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
  imageUrl?: string;
}

export const AnimatedCandlestickBackground = ({
  variant = 'mixed',
  opacity = 0.12,
  speed = 'slow',
  imageUrl,
}: AnimatedCandlestickBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation duration based on speed
  const duration = speed === 'slow' ? 60 : speed === 'medium' ? 40 : 20;

  // Stronger gradient overlay for cleaner text visibility
  const gradientOverlay = variant === 'bullish'
    ? 'linear-gradient(180deg, hsla(var(--background), 0.75) 0%, hsla(var(--background), 0.60) 50%, hsla(var(--background), 0.75) 100%)'
    : variant === 'bearish'
    ? 'linear-gradient(180deg, hsla(var(--background), 0.75) 0%, hsla(var(--background), 0.60) 50%, hsla(var(--background), 0.75) 100%)'
    : 'linear-gradient(180deg, hsla(var(--background), 0.75) 0%, hsla(var(--background), 0.65) 50%, hsla(var(--background), 0.75) 100%)';

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient overlay for text visibility */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: gradientOverlay }}
      />

      {/* Animated background image if provided */}
      {imageUrl && (
        <motion.div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'contain',
            opacity: opacity,
            filter: 'blur(0px)',
          }}
          initial={{ y: 0, scale: 1 }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Subtle radial gradient accents for depth */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background:
            variant === 'bullish'
              ? 'radial-gradient(circle, hsla(var(--bullish), 0.15) 0%, transparent 70%)'
              : variant === 'bearish'
              ? 'radial-gradient(circle, hsla(var(--bearish), 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsla(var(--primary), 0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{
          background:
            variant === 'bullish'
              ? 'radial-gradient(circle, hsla(var(--bullish), 0.15) 0%, transparent 70%)'
              : variant === 'bearish'
              ? 'radial-gradient(circle, hsla(var(--bearish), 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsla(var(--accent), 0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: duration / 4,
        }}
      />

      {/* Removed grid overlay - let the candlestick image be the main visual */}
    </div>
  );
};
