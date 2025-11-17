import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BookOpen, X, ChevronRight, RefreshCw, ArrowUpRight, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';

const frameworkSteps = [
  { icon: TrendingUp, label: 'Continuation', path: '/sequences' },
  { icon: RefreshCw, label: 'Reversal', path: '/sequences' },
  { icon: ArrowUpRight, label: 'Aligned', path: '/sequences' },
  { icon: Search, label: 'Case Studies', path: '/case-studies' },
];

const quickGlossary = [
  { term: 'OHLC', path: '/glossary#ohlc' },
  { term: 'Liquidity Sweep', path: '/glossary#sweep' },
  { term: 'SMT', path: '/glossary#smt' },
  { term: 'CISD', path: '/glossary#cisd' },
  { term: 'HTF', path: '/glossary#htf' },
  { term: 'FVG', path: '/glossary#fvg' },
];

export const FloatingCandlestickAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'framework' | 'glossary'>('framework');
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button - Hidden on mobile to avoid conflicts with menu button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 floating-assistant hidden md:block"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Top Wick */}
          <motion.div
            className="w-1 h-6 mx-auto bg-primary rounded-full"
            animate={{ height: ['24px', '32px', '24px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Body */}
          <div className="relative px-4 py-4 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-2xl border-2 border-primary">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          {/* Bottom Wick */}
          <motion.div
            className="w-1 h-6 mx-auto bg-primary rounded-full"
            animate={{ height: ['24px', '32px', '24px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <div className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg text-sm border border-border">
              Quick Access
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-96 z-50 flex"
            >
              {/* Top Wick */}
              <div className="w-2 bg-primary/50 rounded-l-full" />

              {/* Body */}
              <Card className="flex-1 rounded-l-2xl rounded-r-none border-l-4 border-primary shadow-2xl bg-card/95 backdrop-blur-md">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Quick Access
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab('framework')}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                          activeTab === 'framework'
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Framework
                      </button>
                      <button
                        onClick={() => setActiveTab('glossary')}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                          activeTab === 'glossary'
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 inline mr-2" />
                        Glossary
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <ScrollArea className="flex-1 p-6">
                    {activeTab === 'framework' ? (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground mb-4">
                          Jump to any step in the trading sequence
                        </p>
                        {frameworkSteps.map((step, idx) => {
                          const Icon = step.icon;
                          return (
                            <motion.button
                              key={step.label}
                              onClick={() => handleNavigate(step.path)}
                              className="w-full group"
                              whileHover={{ x: 4 }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <div className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                                idx % 2 === 0
                                  ? 'border-bullish/20 bg-bullish/5 hover:border-bullish hover:bg-bullish/10'
                                  : 'border-bearish/20 bg-bearish/5 hover:border-bearish hover:bg-bearish/10'
                              }`}>
                                <Icon className="w-5 h-5" />
                                <div className="flex-1 text-left">
                                  <div className="font-medium text-foreground">
                                    {step.label}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Sequence {idx + 1}
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground mb-4">
                          Quick reference to key trading terms
                        </p>
                        {quickGlossary.map((item, idx) => (
                          <motion.button
                            key={item.term}
                            onClick={() => handleNavigate(item.path)}
                            className="w-full group"
                            whileHover={{ x: 4 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted hover:border-primary transition-all">
                              <span className="font-mono font-medium text-foreground">
                                {item.term}
                              </span>
                              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </motion.button>
                        ))}
                        <div className="pt-4 border-t border-border">
                          <Button
                            onClick={() => handleNavigate('/glossary')}
                            variant="outline"
                            className="w-full"
                          >
                            View Full Glossary
                          </Button>
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </Card>

              {/* Bottom Wick */}
              <div className="w-2 bg-primary/50 rounded-l-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
