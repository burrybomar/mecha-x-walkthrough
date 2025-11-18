import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const liquiditySteps = [
  {
    step: 1,
    icon: Target,
    title: 'BSL/SSL Basics',
    subtitle: 'Liquidity Pools',
    description: 'Buy-Side and Sell-Side Liquidity pools using ICT Pivot Detection (3-candle formation)',
    details: [
      'BSL: Stops above swing highs (3-candle pivot)',
      'SSL: Stops below swing lows (3-candle pivot)',
      'Price wicks through BSL/SSL to grab liquidity',
      'These levels MUST be swept to confirm reversals'
    ]
  },
  {
    step: 2,
    icon: CheckCircle,
    title: 'Valid Sweeps',
    subtitle: 'C2 Confirmation',
    description: 'Price sweeps liquidity and immediately reverses—your C2 pattern trigger',
    details: [
      'Sweep: Wick through BSL/SSL level',
      'C2: Body closes back inside range',
      'Valid sweep = C2 reversal pattern confirmed'
    ]
  },
  {
    step: 3,
    icon: TrendingDown,
    title: 'Invalid Sweeps',
    subtitle: 'Failed Patterns',
    description: 'Price continues through without reversing—skip the trade',
    details: [
      'No C2 reversal forms',
      'Body close beyond swept level = invalidation'
    ]
  },
  {
    step: 4,
    icon: TrendingUp,
    title: 'HTF Priority',
    subtitle: 'Timeframe Hierarchy',
    description: 'HTF sweeps (4H/Daily) are far more significant than LTF sweeps',
    details: [
      'HTF sweeps = higher probability',
      'Best: HTF sweep + H2 window + C2-SNAP'
    ]
  }
];

export const LiquiditySlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liquiditySteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = liquiditySteps[currentIndex];
  const IconComponent = currentStep.icon;

  return (
    <div ref={elementRef} className="w-full max-w-5xl mx-auto px-4">
      <div className="relative rounded-xl overflow-hidden border bg-card shadow-lg">
        <div className="relative z-10 p-6 md:p-10 min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-primary/10 border-2 border-primary/30">
                  <IconComponent className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-mono text-primary mb-1">{currentStep.subtitle}</div>
                  <h3 className="text-2xl md:text-3xl font-bold">{currentStep.title}</h3>
                </div>
              </div>
              <p className="text-muted-foreground">{currentStep.description}</p>
              <ul className="space-y-3">
                {currentStep.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary mt-1">→</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            <div className="flex gap-2">
              {liquiditySteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-primary/30'}`}
                />
              ))}
            </div>
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-xs font-mono text-muted-foreground">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
