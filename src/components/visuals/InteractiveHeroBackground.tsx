import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Candle {
  id: number;
  x: number;
  y: number;
  isBullish: boolean;
  size: number;
}

export const InteractiveHeroBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [candles] = useState<Candle[]>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      isBullish: Math.random() > 0.5,
      size: 20 + Math.random() * 40,
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateDistance = (candleX: number, candleY: number) => {
    const dx = mousePosition.x - candleX;
    const dy = mousePosition.y - candleY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {candles.map((candle) => {
        const distance = calculateDistance(candle.x, candle.y);
        const influence = Math.max(0, 1 - distance / 50);
        const scale = 1 + influence * 0.5;
        const offsetX = (mousePosition.x - candle.x) * influence * 0.3;
        const offsetY = (mousePosition.y - candle.y) * influence * 0.3;

        return (
          <motion.div
            key={candle.id}
            className="absolute"
            style={{
              left: `${candle.x}%`,
              top: `${candle.y}%`,
            }}
            animate={{
              scale,
              x: offsetX,
              y: offsetY,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
            }}
          >
            <div
              className={`relative ${candle.isBullish ? 'text-bullish' : 'text-bearish'}`}
              style={{
                width: `${candle.size}px`,
                height: `${candle.size * 2}px`,
                opacity: 0.15,
              }}
            >
              {/* Wick */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-current opacity-60"
              />
              {/* Body */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-current rounded-sm`}
                style={{
                  height: `${candle.size * 1.2}px`,
                  border: '1px solid currentColor',
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
