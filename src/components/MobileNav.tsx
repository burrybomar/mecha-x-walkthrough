import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, ListChecks, FileText, Settings, TrendingUp, BookText, HelpCircle, RefreshCw, ArrowUpRight, Search, ChartColumnIncreasing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const navItems = [
  { icon: TrendingUp, label: 'OHLC Tutorial', path: '/ohlc-tutorial', color: 'bullish' },
  { icon: BookOpen, label: 'Learn Framework', path: '/knowledge', color: 'primary' },
  { icon: RefreshCw, label: 'Fractal Model', path: '/fractal-model', color: 'bullish' },
  { icon: ArrowUpRight, label: 'Three Sequences', path: '/sequences', color: 'primary' },
  { icon: Search, label: 'Sequence Identifier', path: '/sequence-identifier', color: 'bullish' },
  { icon: FileText, label: 'Case Studies', path: '/case-studies', color: 'primary' },
  { icon: ChartColumnIncreasing, label: 'Chart Comparison', path: '/chart-comparison', color: 'bullish' },
  { icon: ListChecks, label: 'Pre-Trade Checklist', path: '/checklist', color: 'primary' },
  { icon: FileText, label: 'Trade Journal', path: '/trade-journal', color: 'bullish' },
  { icon: Settings, label: 'Setup Indicators', path: '/setup', color: 'primary' },
  { icon: TrendingUp, label: 'Chart Examples', path: '/chart-examples', color: 'bullish' },
  { icon: BookText, label: 'Glossary', path: '/glossary', color: 'primary' },
  { icon: HelpCircle, label: 'FAQ', path: '/faq', color: 'bullish' },
];

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card border-r border-border z-50 md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">MECHA-X</h2>
                  <p className="text-xs text-muted-foreground">Trading Intelligence</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-2" role="navigation" aria-label="Main navigation">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                      item.color === 'bullish'
                        ? 'border-bullish/20 bg-bullish/5 hover:border-bullish hover:bg-bullish/10 active:bg-bullish/20'
                        : 'border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10 active:bg-primary/20'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg ${
                      item.color === 'bullish' ? 'bg-bullish/20' : 'bg-primary/20'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        item.color === 'bullish' ? 'text-bullish' : 'text-primary'
                      }`} />
                    </div>
                    <span className="font-medium text-foreground text-left flex-1">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border p-6 mt-8">
                <p className="text-xs text-muted-foreground text-center">
                  Master the OHLC framework.<br />
                  Six steps. Complete edge.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
