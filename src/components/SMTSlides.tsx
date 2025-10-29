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
    color: '#a855f7',
    gradient: 'from-[#a855f7]/20 to-[#9333ea]/20',
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
    color: '#9333ea',
    gradient: 'from-[#9333ea]/20 to-[#7e22ce]/20',
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
    color: '#7e22ce',
    gradient: 'from-[#7e22ce]/20 to-[#6b21a8]/20',
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
    color: '#6b21a8',
    gradient: 'from-[#6b21a8]/20 to-[#a855f7]/20',
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
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = smtSteps[currentIndex];
  const IconComponent = currentStep.icon;

  return (
    <div ref={elementRef} className="w-full max-w-6xl mx-auto px-4">
      <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 bg-gradient-to-b from-background via-card to-background shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{
                background: `radial-gradient(circle, ${currentStep.color} 0%, transparent 70%)`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 25}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-8 md:p-12 min-h-[600px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div className="flex items-center gap-6">
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${currentStep.color}40, ${currentStep.color}20)`,
                      border: `2px solid ${currentStep.color}60`
                    }}
                  >
                    <IconComponent className="w-12 h-12" style={{ color: currentStep.color }} />
                  </div>
                  <div 
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{
                      background: currentStep.color,
                      color: '#10212c'
                    }}
                  >
                    {currentStep.step}
                  </div>
                </motion.div>

                <div className="flex-1">
                  <motion.h2 
                    className="text-4xl md:text-5xl font-bold mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    {currentStep.title}
                  </motion.h2>
                  <motion.p 
                    className="text-xl md:text-2xl text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {currentStep.subtitle}
                  </motion.p>
                </div>
              </div>

              <motion.div
                className={`p-6 rounded-xl bg-gradient-to-br ${currentStep.gradient} backdrop-blur-sm border border-border/50`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p className="text-lg md:text-xl leading-relaxed">
                  {currentStep.description}
                </p>
              </motion.div>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {currentStep.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.8 + idx * 0.15, 
                      duration: 0.8,
                      ease: "easeOut" 
                    }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30"
                  >
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: currentStep.color }}
                    />
                    <p className="text-base md:text-lg leading-relaxed flex-1">
                      {detail}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-12">
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
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'w-12 h-3' : 'hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: idx === currentIndex ? currentStep.color : '#698696',
                    opacity: idx === currentIndex ? 1 : 0.4
                  }}
                />
                {idx === currentIndex && isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: currentStep.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
