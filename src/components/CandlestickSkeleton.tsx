import { motion } from 'framer-motion';

interface CandlestickSkeletonProps {
  count?: number;
  variant?: 'card' | 'button';
}

export const CandlestickSkeleton = ({ 
  count = 3, 
  variant = 'card' 
}: CandlestickSkeletonProps) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col items-center">
          {/* Top Wick */}
          <motion.div
            className="w-2 bg-muted rounded-full"
            animate={{ 
              height: ['30px', '50px', '30px'],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: idx * 0.2
            }}
          />
          
          {/* Body */}
          {variant === 'card' ? (
            <div className="w-full max-w-2xl my-4 p-8 rounded-lg border-2 border-muted bg-muted/20 animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            </div>
          ) : (
            <div className="px-8 py-4 my-2 rounded-lg bg-muted/50 animate-pulse">
              <div className="h-5 bg-muted rounded w-32" />
            </div>
          )}
          
          {/* Bottom Wick */}
          <motion.div
            className="w-2 bg-muted rounded-full"
            animate={{ 
              height: ['30px', '50px', '30px'],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: idx * 0.2 + 0.3
            }}
          />
        </div>
      ))}
    </div>
  );
};
