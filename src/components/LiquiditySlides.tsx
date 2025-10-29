import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const liquiditySteps = [
  {
    step: 1,
    icon: Target,
    title: 'Liquidity Pools',
    subtitle: 'BSL & SSL Basics',
    description: 'Stop-loss clusters at key levels that smart money targets for filling large orders',
    details: [
      'BSL (Buy-Side Liquidity): Stops above swing highs',
      'SSL (Sell-Side Liquidity): Stops below swing lows',
      'Smart money sweeps these levels before reversing',
      'Liquidity hunting is institutional manipulation'
    ]
  },
  {
    step: 2,
    icon: CheckCircle,
    title: 'Valid Sweeps',
    subtitle: 'Entry Signals',
    description: 'Price taps liquidity and immediately reverses with rejection - this is your trade signal',
    details: [
      'Price sweeps BSL/SSL and reverses sharply',
      'Forms a wick/rejection candle at the level',
      'Holds the level - no continuation through',
      'Valid sweep = entry opportunity with C2 confirmation'
    ]
  },
  {
    step: 3,
    icon: TrendingDown,
    title: 'Invalid Sweeps',
    subtitle: 'Avoid These',
    description: 'Price continues through the level without reversing - means deeper liquidity exists',
    details: [
      'Sweep occurs but no immediate reversal',
      'Price continues in sweep direction',
      'No rejection or wick formation',
      'Skip the trade - wait for next valid setup'
    ]
  },
  {
    step: 4,
    icon: TrendingUp,
    title: 'HTF vs LTF',
    subtitle: 'Timeframe Priority',
    description: 'HTF sweeps (4H/Daily) are far more significant and reliable than LTF sweeps',
    details: [
      'HTF sweeps = higher probability reversals',
      'LTF sweeps = timing within HTF direction',
      'Best setup: HTF sweep + H2 window + SMT + C2',
      'Count settings: 1-20 historical levels for context'
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
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = liquiditySteps[currentIndex];
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
            {liquiditySteps.map((_, idx) => (
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
