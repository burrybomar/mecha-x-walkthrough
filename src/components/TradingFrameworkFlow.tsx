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
                  className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    idx === activeStep
                      ? 'bg-gradient-to-br ' + step.color + ' shadow-lg'
                      : 'bg-card border border-border'
                  }`}
                >
                  <step.icon
                    className={`w-8 h-8 transition-colors ${
                      idx === activeStep ? 'text-white' : 'text-muted-foreground'
                    }`}
                  />
                </div>
                <div
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-opacity ${
                    idx === activeStep ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Step {step.id}
                </div>
              </button>
              {idx < frameworkSteps.length - 1 && (
                <ArrowRight
                  className={`w-6 h-6 mx-2 transition-colors ${
                    idx === activeStep ? 'text-primary' : 'text-muted-foreground/40'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Display */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute inset-0 opacity-10 bg-gradient-to-br ${currentStep.color}`}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-start gap-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Step {currentStep.id} of {frameworkSteps.length}
                  </div>
                  <h3 className="text-4xl font-bold mb-2">{currentStep.title}</h3>
                  <p className="text-xl text-muted-foreground">{currentStep.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-lg leading-relaxed">{currentStep.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStep.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-background/80 border border-border/40"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-relaxed flex-1">{detail}</p>
                  </motion.div>
                ))}
              </div>

              {/* If/Then Logic */}
              {activeStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-xl bg-accent/10 border-2 border-accent/30"
                >
                  <div className="text-sm font-bold text-accent mb-2">Decision Point:</div>
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">IF</span> BSL/SSL sweep occurs <span className="font-semibold">AND</span> C2 pattern confirms{' '}
                    <span className="font-semibold">→ THEN</span> proceed to Step 4 (CISD Entry)
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    No sweep = No trade. Wait for next session window.
                  </p>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-xl bg-accent/10 border-2 border-accent/30"
                >
                  <div className="text-sm font-bold text-accent mb-2">Optional Enhancement:</div>
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">IF</span> SMT divergence present{' '}
                    <span className="font-semibold">→ THEN</span> confidence increases (optional but powerful)
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Works without SMT, but divergence adds OHLC structure confirmation.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {frameworkSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlaying(false);
                }}
                className="relative group"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    idx === activeStep
                      ? 'w-12 h-3 bg-primary'
                      : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
                {idx === activeStep && isAutoPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    style={{ transformOrigin: 'left' }}
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
