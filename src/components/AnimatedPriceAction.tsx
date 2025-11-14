import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PriceLevel {
  price: number;
  time: number;
}

export const AnimatedPriceAction = () => {
  const [priceHistory, setPriceHistory] = useState<PriceLevel[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory(prev => {
        const newPrice = 50 + Math.sin(Date.now() / 1000) * 20 + Math.random() * 10;
        const newHistory = [...prev, { price: newPrice, time: Date.now() }];
        return newHistory.slice(-20); // Keep last 20 points
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
        {/* Price Line */}
        <motion.path
          d={priceHistory.length > 1 ? priceHistory.map((p, i) => 
            `${i === 0 ? 'M' : 'L'} ${(i / 20) * 800} ${200 - p.price * 2}`
          ).join(' ') : ''}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Candlesticks */}
        {priceHistory.map((point, idx) => {
          if (idx === 0) return null;
          const prev = priceHistory[idx - 1];
          const isBullish = point.price > prev.price;
          const high = Math.max(point.price, prev.price) + 2;
          const low = Math.min(point.price, prev.price) - 2;
          const open = prev.price;
          const close = point.price;
          
          const x = (idx / 20) * 800;
          const wickY = 200 - high * 2;
          const wickHeight = (high - low) * 2;
          const bodyY = 200 - Math.max(open, close) * 2;
          const bodyHeight = Math.abs(close - open) * 2;
          
          return (
            <g key={point.time}>
              {/* Wick */}
              <motion.line
                x1={x}
                y1={wickY}
                x2={x}
                y2={wickY + wickHeight}
                stroke="hsl(var(--candle-wick))"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
              {/* Body */}
              <motion.rect
                x={x - 4}
                y={bodyY}
                width="8"
                height={Math.max(bodyHeight, 1)}
                fill={isBullish ? 'hsl(var(--bullish))' : 'hsl(var(--bearish))'}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2 }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
