import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, Radar, Crosshair } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const tradingSteps = [
  {
    step: 1,
    icon: TrendingUp,
    title: 'HTF Analysis',
    subtitle: '4H/Daily Levels',
    description: 'Identify key support and resistance levels on Higher Time Frames (4H/Daily charts)',
    details: [
      'Mark institutional order blocks and fair value gaps',
      'Identify premium and discount zones',
      'Look for liquidity pools above highs and below lows',
      'Note previous day/week high and low levels'
    ]
  },
  {
    step: 2,
    icon: Target,
    title: 'Session Window',
    subtitle: 'H2 Silver Bullet',
    description: 'Focus on specific trading sessions with high probability setups',
    details: [
      'London Session: 2 AM - 5 AM EST (H2 window)',
      'New York Session: 9:30 AM - 12 PM EST (H2 window)',
      'Wait for price to reach HTF levels during these windows',
      'Watch for manipulation moves before true direction'
    ]
  },
  {
    step: 3,
    icon: Radar,
    title: 'Sweep + C2',
    subtitle: 'Reversal Signal',
    description: 'Liquidity sweep followed by Change of Character confirms reversal',
    details: [
      'Sweep: Price briefly breaks a level to grab liquidity',
      'C2 (Change of Character): Strong move in opposite direction',
      'Look for volume spike during the sweep',
      'Confirm with market structure break on lower timeframe'
    ]
  },
  {
    step: 4,
    icon: Crosshair,
    title: 'CISD Entry',
    subtitle: 'Target H3/H4',
    description: 'Enter on Consolidation, Inducement, Stop Hunt, Distribution pattern',
    details: [
      'Wait for consolidation after the sweep',
      'Inducement: False move to attract wrong-side traders',
      'Stop Hunt: Quick spike to trigger stops',
      'Distribution: Smart money exits, creating your entry',
      'Target: Opposite liquidity at H3 (1:3 RR) or H4 (1:4 RR)'
    ]
  }
];

export const TradingSequenceSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tradingSteps.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = tradingSteps[currentIndex];
  const IconComponent = currentStep.icon;

  return (
    <div ref={elementRef} className="w-full max-w-5xl mx-auto px-4">
      <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-card shadow-lg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-full opacity-5"
            style={{ background: 'var(--gradient-primary)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 p-6 md:p-10 min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-md bg-primary/10 border-2 border-primary/30">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground">
                    {currentStep.step}
                  </div>
                </motion.div>

                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-1">{currentStep.title}</h2>
                  <p className="text-lg md:text-xl text-muted-foreground">{currentStep.subtitle}</p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-primary/5 backdrop-blur-sm border border-primary/20">
                <p className="text-base md:text-lg leading-relaxed">{currentStep.description}</p>
              </div>

              <div className="space-y-2.5">
                {currentStep.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-background/80 border border-border/40"
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary" />
                    <p className="text-sm md:text-base leading-relaxed flex-1">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2.5 mt-10">
            {tradingSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                className="group relative"
              >
                <div
                  className={`rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'w-10 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-muted-foreground/40 hover:scale-125'
                  }`}
                />
                {idx === currentIndex && isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all text-sm font-medium"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
