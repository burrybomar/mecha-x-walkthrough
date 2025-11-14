import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, TrendingUp, BookOpen, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon: any;
  highlightColor: 'bullish' | 'bearish' | 'primary';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to MECHA-X! 🎯',
    description: 'Let\'s take a quick tour to help you master the OHLC framework. This will only take a minute.',
    target: 'body',
    position: 'center',
    icon: Sparkles,
    highlightColor: 'primary',
  },
  {
    id: 'floating-assistant',
    title: 'Your Quick Access Assistant',
    description: 'Click this floating candlestick anytime to jump to framework steps or glossary terms instantly.',
    target: '.floating-assistant', // Will target the floating assistant button
    position: 'left',
    icon: TrendingUp,
    highlightColor: 'bullish',
  },
  {
    id: 'framework',
    title: '6-Step Trading Framework',
    description: 'Everything flows together: HTF analysis → Session timing → Liquidity sweeps → SMT → CISD → Entry. Click any step to explore.',
    target: '.framework-flow', // Will target the framework section
    position: 'top',
    icon: TrendingUp,
    highlightColor: 'primary',
  },
  {
    id: 'navigation',
    title: 'Easy Navigation',
    description: 'Access learning materials, tools, and references from the top menu. On mobile, use the hamburger menu.',
    target: 'header',
    position: 'bottom',
    icon: BookOpen,
    highlightColor: 'bearish',
  },
  {
    id: 'ready',
    title: 'You\'re All Set! 🚀',
    description: 'Start by exploring the framework or jump to any section using the floating assistant. Happy trading!',
    target: 'body',
    position: 'center',
    icon: Sparkles,
    highlightColor: 'bullish',
  },
];

export const OnboardingTour = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(true);

  useEffect(() => {
    // Check if user has seen the tour
    const tourCompleted = localStorage.getItem('mecha-x-tour-completed');
    if (!tourCompleted) {
      // Delay tour start for better UX
      const timer = setTimeout(() => {
        setHasSeenTour(false);
        setIsActive(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handleSkip = () => {
    completeTour();
  };

  const completeTour = () => {
    setIsActive(false);
    localStorage.setItem('mecha-x-tour-completed', 'true');
  };

  const getCurrentStepElement = () => {
    const step = tourSteps[currentStep];
    if (step.target === 'body') return null;
    
    const element = document.querySelector(step.target);
    if (!element) return null;
    
    return element.getBoundingClientRect();
  };

  const getTooltipPosition = () => {
    const rect = getCurrentStepElement();
    const step = tourSteps[currentStep];
    
    if (!rect || step.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const spacing = 20;
    let position: any = {};

    switch (step.position) {
      case 'top':
        position = {
          top: `${rect.top - spacing}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)',
        };
        break;
      case 'bottom':
        position = {
          top: `${rect.bottom + spacing}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
        break;
      case 'left':
        position = {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - spacing}px`,
          transform: 'translate(-100%, -50%)',
        };
        break;
      case 'right':
        position = {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + spacing}px`,
          transform: 'translateY(-50%)',
        };
        break;
    }

    return position;
  };

  const getHighlightStyle = () => {
    const rect = getCurrentStepElement();
    if (!rect) return null;

    return {
      top: `${rect.top - 8}px`,
      left: `${rect.left - 8}px`,
      width: `${rect.width + 16}px`,
      height: `${rect.height + 16}px`,
    };
  };

  if (!isActive || hasSeenTour) return null;

  const step = tourSteps[currentStep];
  const Icon = step.icon;
  const tooltipPosition = getTooltipPosition();
  const highlightStyle = getHighlightStyle();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100]" role="dialog" aria-label="Onboarding tour">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-sm"
          onClick={handleSkip}
        />

        {/* Highlight spotlight */}
        {highlightStyle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`absolute rounded-xl border-4 ${
              step.highlightColor === 'bullish'
                ? 'border-bullish shadow-[0_0_30px_rgba(var(--bullish),0.3)]'
                : step.highlightColor === 'bearish'
                ? 'border-bearish shadow-[0_0_30px_rgba(var(--bearish),0.3)]'
                : 'border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)]'
            }`}
            style={highlightStyle}
          >
            {/* Animated border pulse */}
            <motion.div
              className={`absolute inset-0 rounded-xl ${
                step.highlightColor === 'bullish'
                  ? 'bg-bullish/10'
                  : step.highlightColor === 'bearish'
                  ? 'bg-bearish/10'
                  : 'bg-primary/10'
              }`}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Tooltip Card */}
        <motion.div
          key={step.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute z-[101] max-w-md"
          style={tooltipPosition}
        >
          <Card className="p-6 border-2 border-primary/30 shadow-2xl bg-card/95 backdrop-blur-md">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  step.highlightColor === 'bullish'
                    ? 'bg-bullish/20 text-bullish'
                    : step.highlightColor === 'bearish'
                    ? 'bg-bearish/20 text-bearish'
                    : 'bg-primary/20 text-primary'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Step {currentStep + 1} of {tourSteps.length}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="hover:bg-muted"
                aria-label="Skip tour"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {step.description}
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {tourSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentStep
                        ? 'w-8 bg-primary'
                        : idx < currentStep
                        ? 'w-2 bg-primary/50'
                        : 'w-2 bg-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="gap-2"
                >
                  {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Pointer arrow for non-center tooltips */}
          {step.position !== 'center' && (
            <div
              className={`absolute w-4 h-4 bg-card border-2 border-primary/30 rotate-45 ${
                step.position === 'top'
                  ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                  : step.position === 'bottom'
                  ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : step.position === 'left'
                  ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
                  : 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
              }`}
            />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
