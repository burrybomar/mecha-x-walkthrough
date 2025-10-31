import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, Target, TrendingUp, Crosshair } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const patternsSteps = [
  {
    step: 1,
    icon: Workflow,
    title: 'C1-C2-C3 Structure',
    subtitle: 'Reversal Pattern',
    description: 'Complete three-candle reversal sequence that marks sweep, reversal, and confirmation',
    details: [
      'C1: Candle that sweeps the liquidity (BSL/SSL)',
      'C2: Reversal candle - your entry signal',
      'C3: Expansion candle - confirms new direction',
      'C2 close triggers entry on next candle'
    ]
  },
  {
    step: 2,
    icon: Target,
    title: 'C2 Entry Strategy',
    subtitle: 'Precision Timing',
    description: 'C2 marks exact entry candle - wait for close confirmation before entering',
    details: [
      'Wait for C2 candle to close fully',
      'Enter at open of next candle',
      'Alternative: Enter on retest of C2 high/low',
      'Stop loss goes beyond C1 sweep point'
    ]
  },
  {
    step: 3,
    icon: TrendingUp,
    title: 'C3 Expectation',
    subtitle: 'Validation Box',
    description: 'Indicator draws box showing where C3 expansion should reach for valid setup',
    details: [
      'C3 box shows expected expansion zone',
      'Price must reach C3 box for valid pattern',
      'Failure to reach = invalid setup',
      'Use for confirmation and invalidation logic'
    ]
  },
  {
    step: 4,
    icon: Crosshair,
    title: 'SMT Confluence',
    subtitle: 'High Probability',
    description: 'C2 pattern with SMT divergence significantly increases success probability',
    details: [
      'Look for SMT label alongside C2',
      'Correlated pairs showing divergence',
      'Best during H2 Silver Bullet windows',
      'Combine with HTF sweep for maximum edge'
    ]
  }
];

export const PatternsSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % patternsSteps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = patternsSteps[currentIndex];
  const IconComponent = currentStep.icon;

  return (
    <div ref={elementRef} className="w-full max-w-5xl mx-auto px-4">
      <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-card shadow-lg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-full opacity-5"
            style={{ background: 'var(--gradient-primary)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 p-6 md:p-10 min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
            {patternsSteps.map((_, idx) => (
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
                    transition={{ duration: 2.5, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
