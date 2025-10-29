import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, Radar, Crosshair, Layers, Clock } from 'lucide-react';

const tradingSteps = [
  {
    step: 1,
    icon: TrendingUp,
    title: 'HTF Analysis',
    subtitle: '4H/Daily Levels',
    color: '#6bb0dd',
    gradient: 'from-[#6bb0dd]/20 to-[#5289AD]/20',
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
    icon: Clock,
    title: 'Session Window',
    subtitle: 'H2 Silver Bullet',
    color: '#abdbd6',
    gradient: 'from-[#abdbd6]/20 to-[#6bb0dd]/20',
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
    color: '#5289AD',
    gradient: 'from-[#5289AD]/20 to-[#698696]/20',
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
    color: '#698696',
    gradient: 'from-[#698696]/20 to-[#3a647f]/20',
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
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tradingSteps.length);
    }, 8000); // 8 seconds per slide for comfortable reading

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = tradingSteps[currentIndex];
  const IconComponent = currentStep.icon;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 bg-gradient-to-b from-background via-card to-background shadow-2xl">
        {/* Animated background */}
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

        {/* Main content */}
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
              {/* Step number and icon */}
              <div className="flex items-center gap-6">
                <motion.div
                  className="relative"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
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

              {/* Description */}
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

              {/* Details list */}
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

          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-3 mt-12">
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
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    idx === currentIndex 
                      ? 'w-12 h-3' 
                      : 'hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: idx === currentIndex 
                      ? currentStep.color 
                      : '#698696',
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

          {/* Play/Pause control */}
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

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-4 flex-wrap">
        <span>⏸️ Click dots to jump to any step</span>
        <span>•</span>
        <span>🔄 Auto-advances every 8 seconds</span>
        <span>•</span>
        <span>📱 Mobile friendly</span>
      </div>
    </div>
  );
};
