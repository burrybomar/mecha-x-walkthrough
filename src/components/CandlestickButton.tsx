import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CandlestickButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'bullish' | 'bearish';
  className?: string;
}

export const CandlestickButton = ({ 
  children, 
  onClick, 
  variant = 'bullish',
  className = '' 
}: CandlestickButtonProps) => {
  const isBullish = variant === 'bullish';
  
  return (
    <motion.button
      onClick={onClick}
      className={`relative group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Top Wick */}
      <motion.div
        className={`w-1 h-4 mx-auto ${isBullish ? 'bg-bullish' : 'bg-bearish'} rounded-full`}
        initial={{ height: 0 }}
        animate={{ height: '16px' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Body */}
      <div className={`
        px-6 py-3 rounded-lg font-mono text-sm font-medium
        ${isBullish 
          ? 'bg-bullish text-bullish-foreground' 
          : 'bg-bearish text-bearish-foreground'
        }
        shadow-lg group-hover:shadow-xl transition-shadow
        border-2 ${isBullish ? 'border-bullish' : 'border-bearish'}
      `}>
        {children}
      </div>
      
      {/* Bottom Wick */}
      <motion.div
        className={`w-1 h-4 mx-auto ${isBullish ? 'bg-bullish' : 'bg-bearish'} rounded-full`}
        initial={{ height: 0 }}
        animate={{ height: '16px' }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.button>
  );
};
