import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from './ui/card';

interface CandlestickCardProps {
  children: ReactNode;
  variant?: 'bullish' | 'bearish';
  className?: string;
  wickHeight?: 'sm' | 'md' | 'lg';
}

export const CandlestickCard = ({ 
  children, 
  variant = 'bullish',
  className = '',
  wickHeight = 'md'
}: CandlestickCardProps) => {
  const isBullish = variant === 'bullish';
  const wickHeights = {
    sm: '30px',
    md: '50px',
    lg: '80px'
  };
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Top Wick */}
      <motion.div
        className={`w-2 ${isBullish ? 'bg-bullish' : 'bg-bearish'} rounded-full`}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: wickHeights[wickHeight], opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />
      
      {/* Card Body */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <Card className={`
          border-2 
          ${isBullish ? 'border-bullish bg-bullish/5' : 'border-bearish bg-bearish/5'}
          backdrop-blur-sm
          hover:shadow-2xl transition-shadow
        `}>
          {children}
        </Card>
      </motion.div>
      
      {/* Bottom Wick */}
      <motion.div
        className={`w-2 ${isBullish ? 'bg-bullish' : 'bg-bearish'} rounded-full`}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: wickHeights[wickHeight], opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      />
    </div>
  );
};
