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
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="md:hidden border-2 border-primary/40 bg-primary/10 hover:bg-primary/20 hover:border-primary"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6 text-foreground" />
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card border-r-2 border-border/50 z-[9999] md:hidden overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card border-b-2 border-border/50 p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl font-bold text-foreground">MECHA-X</h2>
                  <p className="text-xs text-muted-foreground">Trading Intelligence</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="border-2 hover:bg-destructive/20 hover:border-destructive"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-3" role="navigation" aria-label="Main navigation">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                      item.color === 'bullish'
                        ? 'border-bullish/40 bg-bullish/15 hover:border-bullish hover:bg-bullish/25 active:bg-bullish/30 shadow-lg shadow-bullish/10'
                        : 'border-primary/40 bg-primary/15 hover:border-primary hover:bg-primary/25 active:bg-primary/30 shadow-lg shadow-primary/10'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-3 rounded-xl ${
                      item.color === 'bullish' ? 'bg-bullish/30' : 'bg-primary/30'
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        item.color === 'bullish' ? 'text-bullish' : 'text-primary'
                      }`} />
                    </div>
                    <span className="font-semibold text-base text-foreground text-left flex-1">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <div className="sticky bottom-0 bg-card border-t-2 border-border/50 p-6 mt-8">
                <p className="text-sm text-muted-foreground text-center font-medium">
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
