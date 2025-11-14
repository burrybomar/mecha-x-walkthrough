import { useState } from 'react';
import { Menu, X, BookOpen, ListChecks, FileText, Settings, TrendingUp, BookText, HelpCircle, RefreshCw, ArrowUpRight, Search, ChartColumnIncreasing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Floating Hamburger Button */}
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 md:hidden z-[100] backdrop-blur-xl bg-background/80 border border-border/40 hover:bg-primary/10 hover:border-primary/60 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </Button>

      {/* Animated Overlay & Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-md z-[99] md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Sliding Menu Panel */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-[85vw] max-w-sm bg-card/95 backdrop-blur-2xl border-r border-border/30 shadow-2xl z-[100] md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-border/20">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    MECHA-X
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Trading Intelligence</p>
                </div>
                <Button
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2" role="navigation" aria-label="Main navigation">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 text-left group relative overflow-hidden
                      ${
                        item.color === 'bullish'
                          ? 'hover:bg-bullish/10 active:bg-bullish/20'
                          : 'hover:bg-primary/10 active:bg-primary/20'
                      }
                    `}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {/* Animated background gradient on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${
                      item.color === 'bullish' 
                        ? 'bg-gradient-to-r from-bullish/5 to-bullish/10' 
                        : 'bg-gradient-to-r from-primary/5 to-primary/10'
                    }`} />
                    
                    {/* Icon */}
                    <div className={`relative z-10 p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      item.color === 'bullish' 
                        ? 'bg-bullish/10 group-hover:bg-bullish/20' 
                        : 'bg-primary/10 group-hover:bg-primary/20'
                    }`}>
                      <item.icon className={`w-5 h-5 ${item.color === 'bullish' ? 'text-bullish' : 'text-primary'}`} />
                    </div>
                    
                    {/* Label */}
                    <span className="relative z-10 font-semibold text-sm text-foreground group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                    
                    {/* Arrow indicator */}
                    <div className={`relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 ${
                      item.color === 'bullish' ? 'text-bullish' : 'text-primary'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-6 py-6 border-t border-border/20 pb-[max(env(safe-area-inset-bottom),1.5rem)]"
              >
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Master the OHLC framework
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Six steps. Complete edge.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
