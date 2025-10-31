import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, Target, TrendingUp, Crosshair } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const smtSteps = [
  {
    step: 1,
    icon: GitCompare,
    title: 'SMT Basics',
    subtitle: 'Smart Money Technique',
    description: 'Detects divergence between correlated assets at swing highs and lows signaling reversals',
    details: [
      'Compares ES, NQ, YM (or other correlating pairs)',
      'When one makes new high/low but others don\'t = divergence',
      'Shows smart money positioning for reversal',
      'Indicates institutional disagreement on direction'
    ]
  },
  {
    step: 2,
    icon: Target,
    title: 'Binary vs Triad',
    subtitle: 'Comparison Modes',
    description: 'Choose between 2-asset or 3-asset comparison for divergence detection',
    details: [
      'Binary Mode: Compares 2 correlated assets',
      'Triad Mode: Compares 3 assets simultaneously',
      'Triad provides more confirmation but stricter',
      'Algorithm picks strongest divergence signal'
    ]
  },
  {
    step: 3,
    icon: TrendingUp,
    title: 'Trading SMT',
    subtitle: 'High-Probability Setups',
    description: 'Look for SMT divergence at BSL/SSL sweeps for highest-confidence reversals',
    details: [
      'SMT label appears at divergence points',
      'Best when combined with liquidity sweep',
      'Significantly increases reversal probability',
      'Trade in direction of weaker correlated asset'
    ]
  },
  {
    step: 4,
    icon: Crosshair,
    title: 'Perfect Setup',
    subtitle: 'All Confluence',
    description: 'HTF sweep + H2 Silver Bullet + SMT divergence + C2 reversal = maximum edge',
    details: [
      '1. HTF liquidity sweep occurs',
      '2. During H2 Silver Bullet window',
      '3. SMT divergence with correlated pairs',
      '4. C2 reversal pattern forms → Enter'
    ]
  }
];

export const SMTSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % smtSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = smtSteps[currentIndex];
  const IconComponent = currentStep.icon;

  return (
    <div ref={elementRef} className="w-full max-w-5xl mx-auto px-4">
      <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-card shadow-lg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-full opacity-10"
            style={{ background: 'var(--gradient-primary)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
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
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
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
            {smtSteps.map((_, idx) => (
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
