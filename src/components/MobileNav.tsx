import { useState } from 'react';
import { Menu, X, BookOpen, ListChecks, FileText, Settings, TrendingUp, BookText, HelpCircle, RefreshCw, ArrowUpRight, Search, ChartColumnIncreasing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './ui/sheet';

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
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Hamburger Button - mobile only */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 md:hidden z-[2147483647] border-2 border-primary/40 bg-primary/10 hover:bg-primary/20 hover:border-primary shadow-lg"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </Button>
      </SheetTrigger>

      {/* Drawer Menu */}
      <SheetContent
        side="left"
        className="w-[90vw] max-w-sm p-0 bg-card border-r-2 border-border/50 z-[2147483647]"
      >
        <header className="sticky top-0 bg-card border-b-2 border-border/50 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">MECHA-X</h2>
            <p className="text-xs text-muted-foreground">Trading Intelligence</p>
          </div>
          <SheetClose asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Close navigation menu"
              className="border-2 hover:bg-destructive/20 hover:border-destructive"
            >
              <X className="w-5 h-5" />
            </Button>
          </SheetClose>
        </header>

        <nav className="p-4 space-y-3" role="navigation" aria-label="Main navigation">
          {navItems.map((item, idx) => (
            <SheetClose asChild key={item.path}>
              <button
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  ${
                    item.color === 'bullish'
                      ? 'border-bullish/40 bg-bullish/15 hover:border-bullish hover:bg-bullish/25 active:bg-bullish/30 shadow-lg shadow-bullish/10'
                      : 'border-primary/40 bg-primary/15 hover:border-primary hover:bg-primary/25 active:bg-primary/30 shadow-lg shadow-primary/10'
                  }
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className={`${item.color === 'bullish' ? 'bg-bullish/30' : 'bg-primary/30'} p-3 rounded-xl`}>
                  <item.icon className={`w-6 h-6 ${item.color === 'bullish' ? 'text-bullish' : 'text-primary'}`} />
                </div>
                <span className="font-semibold text-base text-foreground flex-1">{item.label}</span>
              </button>
            </SheetClose>
          ))}
        </nav>

        <footer className="sticky bottom-0 bg-card border-t-2 border-border/50 px-6 py-5 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <p className="text-sm text-muted-foreground text-center font-medium">
            Master the OHLC framework.<br />
            Six steps. Complete edge.
          </p>
        </footer>
      </SheetContent>
    </Sheet>
  );
};
