import { useState } from 'react';
import {
  Menu,
  X,
  BookOpen,
  ListChecks,
  FileText,
  Settings,
  TrendingUp,
  BookText,
  HelpCircle,
  RefreshCw,
  ArrowUpRight,
  Search,
  ChartColumnIncreasing,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';

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
] as const;

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Floating Hamburger Button */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 md:hidden z-[9999] backdrop-blur-xl bg-background/80 border border-border/40 hover:bg-accent hover:text-accent-foreground shadow-2xl transition-all duration-300 rounded-2xl"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </Button>
      </SheetTrigger>

      {/* Left Drawer - mobile-first, full height, safe-area aware */}
      <SheetContent
        side="left"
        className="p-0 w-[88vw] max-w-[420px] md:max-w-[420px] bg-card/95 backdrop-blur-2xl border-border/30 z-[9999]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-5 border-b border-border/20 bg-card/80 backdrop-blur-xl">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              MECHA-X
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Trading Intelligence</p>
          </div>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-destructive/10 hover:text-destructive"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </SheetClose>
        </div>

        {/* Nav List */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="flex h-[calc(100dvh-64px)] flex-col overflow-y-auto px-3 py-4"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <SheetClose asChild>
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={
                        `w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl transition-colors text-left group ` +
                        `${active ? 'bg-accent text-accent-foreground ring-1 ring-border/50' : 'bg-transparent hover:bg-accent/50'}`
                      }
                    >
                      <span
                        className={`p-2.5 rounded-lg ${
                          item.color === 'bullish'
                            ? 'bg-bullish/10 text-bullish'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                      </span>
                      <span className="font-medium text-sm text-foreground">
                        {item.label}
                      </span>
                      <span className={`ml-auto ${active ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'} transition-opacity`}>
                        <ArrowUpRight className={`w-4 h-4 ${item.color === 'bullish' ? 'text-bullish' : 'text-primary'}`} />
                      </span>
                    </button>
                  </SheetClose>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="mt-auto pt-4 pb-[max(env(safe-area-inset-bottom),1rem)] text-center text-xs text-muted-foreground">
            Six steps. Complete edge.
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
