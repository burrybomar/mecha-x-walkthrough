import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Layers, Target, Zap } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const htfSteps = [
  {
    step: 1,
    icon: BarChart3,
    title: 'HTF Sweeps',
    subtitle: 'Institutional Liquidity',
    description: 'HTF sweeps (4H, Daily, Weekly) represent institutional-level liquidity at major reversal zones',
    details: [
      'Daily/4H highs and lows mark institutional liquidity pools',
      'HTF sweeps are much more reliable than LTF sweeps',
      'HTF provides direction, LTF provides timing',
      'Best during H2 Silver Bullet windows of major sessions'
    ]
  },
  {
    step: 2,
    icon: Layers,
    title: 'Chart Mapping',
    subtitle: 'Multi-Timeframe View',
    description: 'HTF candles are mapped onto your LTF chart so you see both timeframes simultaneously',
    details: [
      'See 4H/Daily candles overlaid on your 5min chart',
      'Divider lines show HTF candle boundaries',
      'Different line styles indicate timeframe importance',
      'BSL/SSL lines mark where HTF liquidity sits'
    ]
  },
  {
    step: 3,
    icon: Target,
    title: 'Auto vs Manual',
    subtitle: 'Configuration Modes',
    description: 'Choose automatic smart HTF selection or manual control over displayed timeframes',
    details: [
      'Auto Mode: 5m→1H/4H/Daily, 15m→4H/Daily/Weekly',
      'Manual Mode: Configure up to 4 custom timeframes',
      'Set candle count, enable/disable mapping',
      'Adjust offset from current price'
    ]
  },
  {
    step: 4,
    icon: Zap,
    title: 'Trading Flow',
    subtitle: 'Step-by-Step Process',
    description: 'Follow the complete HTF sweep trading workflow from identification to entry',
    details: [
      '1. Mark key 4H/Daily BSL/SSL levels',
      '2. Wait for H2 Silver Bullet session window',
      '3. Watch for price sweep + reversal',
      '4. Confirm with C2 label, enter on CISD retest'
    ]
  }
];

export const HTFSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % htfSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = htfSteps[currentIndex];
  const IconComponent = currentStep.icon;

  return (
    <div ref={elementRef} className="w-full max-w-5xl mx-auto px-4">
      <div className="relative rounded-xl overflow-hidden border border-primary/20 bg-card shadow-lg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-full opacity-10"
            style={{
              background: 'var(--gradient-primary)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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
            {htfSteps.map((_, idx) => (
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
                    transition={{ duration: 4, ease: "linear" }}
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
