import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Target, Zap, TrendingUp, Clock, Layers, ArrowRight } from 'lucide-react';

const frameworkSteps = [
  {
    id: 1,
    icon: BarChart3,
    title: 'HTF Context',
    subtitle: 'Daily/4H Analysis',
    description: 'Start by identifying key levels on higher timeframes',
    details: [
      'Mark 4H/Daily BSL & SSL liquidity pools',
      'Identify premium/discount zones',
      'Note previous day/week highs/lows',
      'Look for order blocks and fair value gaps',
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    icon: Clock,
    title: 'Session Timing',
    subtitle: 'H1-H4 Profiling',
    description: 'Wait for optimal trading windows',
    details: [
      'H1: Setup phase - range builds',
      'H2: Silver Bullet - sweep & reversal',
      'H3: Continuation - momentum builds',
      'H4: Delivery - final push to target'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    icon: Target,
    title: 'Sweep Signal',
    subtitle: 'BSL/SSL + C2',
    description: 'Liquidity sweep triggers the reversal',
    details: [
      'Price sweeps HTF liquidity (BSL/SSL)',
      'C2 pattern confirms reversal structure',
      'Volume spike during sweep',
      'Market structure break on LTF'
    ],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    icon: Zap,
    title: 'CISD Entry',
    subtitle: 'State Change',
    description: 'Enter on Change in State of Delivery',
    details: [
      'Wait for CISD confirmation',
      'Enter at iFVG or order block',
      'Stop loss beyond sweep level',
      'Target opposite HTF liquidity'
    ],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 5,
    icon: Layers,
    title: 'SMT Confluence',
    subtitle: 'Optional Edge',
    description: 'Add divergence for extra confirmation',
    details: [
      'Compare correlated assets (ES/NQ)',
      'SMT divergence = manipulation',
      'Confirms price direction via candle structure',
      'Increases probability of success'
    ],
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 6,
    icon: TrendingUp,
    title: 'Manage Trade',
    subtitle: 'OSOK Execution',
    description: 'One Shot One Kill - precision trading',
    details: [
      'One entry per setup - no averaging',
      'Move stop to breakeven at 1:1',
      'Partial profits at H3 (1:3 RR)',
      'Full target at H4+ (1:4+ RR)'
    ],
    color: 'from-green-500 to-emerald-500'
  }
];

export const TradingFrameworkFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % frameworkSteps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStep = frameworkSteps[activeStep];
  const IconComponent = currentStep.icon;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Flow Visualization */}
      <div className="mb-12 overflow-x-auto pb-4">
        <div className="flex items-center justify-center gap-2 min-w-max px-4">
          {frameworkSteps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlaying(false);
                }}
                className={`relative group transition-all duration-300 ${
                  idx === activeStep ? 'scale-110' : 'scale-90 opacity-60'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  {step.title}
                </div>
              </button>
              {idx < frameworkSteps.length - 1 && (
                <div className="relative w-12 h-0.5 mx-2">
                  <div className="absolute inset-0 bg-border" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: idx < activeStep ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                  <ArrowRight className="absolute top-1/2 -translate-y-1/2 -right-1 w-3 h-3 text-primary opacity-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Candlestick Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Candlestick Card */}
          <div className="flex flex-col items-center">
            {/* Top Wick */}
            <motion.div
              className="w-2 bg-candle-wick rounded-full"
              initial={{ height: 0 }}
              animate={{ height: '60px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            
            {/* Candlestick Body */}
            <motion.div
              className={`relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border-2`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                background: `linear-gradient(135deg, ${
                  activeStep % 2 === 0 
                    ? 'hsl(var(--bullish) / 0.15)' 
                    : 'hsl(var(--bearish) / 0.15)'
                })`,
                borderColor: activeStep % 2 === 0 
                  ? 'hsl(var(--bullish))' 
                  : 'hsl(var(--bearish))'
              }}
            >
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${
                    activeStep % 2 === 0 
                      ? 'hsl(var(--bullish))' 
                      : 'hsl(var(--bearish))'
                  } 0%, transparent 100%)`
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 p-12">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <motion.div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center text-white shadow-xl`}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <IconComponent className="w-10 h-10" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-mono text-muted-foreground mb-2">
                        STEP {activeStep + 1} / {frameworkSteps.length}
                      </div>
                      <h2 className="text-4xl font-bold mb-2">{currentStep.title}</h2>
                      <div className="text-lg font-mono text-primary">{currentStep.subtitle}</div>
                    </div>
                  </div>
                  
                  {/* Play/Pause */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="px-4 py-2 rounded-full border-2 border-border hover:border-primary transition-colors font-mono text-sm"
                  >
                    {isAutoPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                </div>

                {/* Description */}
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStep.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-background/50 backdrop-blur border border-border hover:border-primary transition-colors group"
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${
                            activeStep % 2 === 0 
                              ? 'hsl(var(--bullish))' 
                              : 'hsl(var(--bearish))'
                          } 0%, transparent 100%)`,
                          color: activeStep % 2 === 0 
                            ? 'hsl(var(--bullish))' 
                            : 'hsl(var(--bearish))'
                        }}
                      >
                        {idx + 1}
                      </div>
                      <p className="text-foreground leading-relaxed group-hover:text-primary transition-colors">
                        {detail}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Special Logic Sections */}
                {activeStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 p-6 rounded-xl border-2 border-dashed border-accent bg-accent/5"
                  >
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span className="text-accent">⚡</span> If/Then Logic
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>If</strong> SMT divergence present → increase position size (1.5x)</li>
                      <li><strong>If</strong> no SMT → standard position size</li>
                      <li><strong>If</strong> inverse SMT → skip setup (counter signal)</li>
                    </ul>
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-4 p-6 rounded-xl border-2 border-dashed border-primary bg-primary/5"
                  >
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span className="text-primary">✨</span> Optional Enhancement
                    </h3>
                    <p className="text-muted-foreground">
                      While SMT adds confluence, the framework works without it. Focus on HTF context + sweep + CISD as your core setup.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Bottom Wick */}
            <motion.div
              className="w-2 bg-candle-wick rounded-full"
              initial={{ height: 0 }}
              animate={{ height: '60px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="mt-12 flex justify-center gap-2">
        {frameworkSteps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveStep(idx);
              setIsAutoPlaying(false);
            }}
            className="group"
          >
            <div className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeStep 
                ? 'w-12 bg-primary' 
                : 'w-2 bg-border group-hover:bg-muted-foreground'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};
