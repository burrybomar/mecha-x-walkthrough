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
  GraduationCap,
  Wrench,
  Info,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

// Organized nav sections for better mobile UX
const navSections = [
  {
    id: 'learn',
    icon: GraduationCap,
    label: 'Learn',
    items: [
      { icon: TrendingUp, label: 'OHLC Tutorial', path: '/ohlc-tutorial', color: 'bullish' },
      { icon: BookOpen, label: 'Framework Guide', path: '/knowledge', color: 'primary' },
      { icon: RefreshCw, label: 'Fractal Model', path: '/fractal-model', color: 'bullish' },
    ],
  },
  {
    id: 'sequences',
    icon: ArrowUpRight,
    label: 'Sequences',
    items: [
      { icon: ArrowUpRight, label: 'Three Sequences', path: '/sequences', color: 'primary' },
      { icon: Search, label: 'Sequence Identifier', path: '/sequence-identifier', color: 'bullish' },
      { icon: FileText, label: 'Case Studies', path: '/case-studies', color: 'primary' },
      { icon: ChartColumnIncreasing, label: 'Chart Comparison', path: '/chart-comparison', color: 'bullish' },
    ],
  },
  {
    id: 'tools',
    icon: Wrench,
    label: 'Tools',
    items: [
      { icon: ListChecks, label: 'Pre-Trade Checklist', path: '/checklist', color: 'primary' },
      { icon: FileText, label: 'Trade Journal', path: '/trade-journal', color: 'bullish' },
      { icon: Settings, label: 'Setup Indicators', path: '/setup', color: 'primary' },
      { icon: TrendingUp, label: 'Chart Examples', path: '/chart-examples', color: 'bullish' },
    ],
  },
  {
    id: 'reference',
    icon: Info,
    label: 'Reference',
    items: [
      { icon: BookText, label: 'Glossary', path: '/glossary', color: 'primary' },
      { icon: HelpCircle, label: 'FAQ', path: '/faq', color: 'bullish' },
    ],
  },
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
          className="fixed top-4 right-4 md:hidden z-[9999] backdrop-blur-xl bg-background/95 border-2 border-primary/40 hover:bg-accent hover:border-primary/70 hover:text-accent-foreground shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-all duration-300 rounded-2xl"
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

        {/* Nav List with Grouped Accordion */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="flex h-[calc(100dvh-64px)] flex-col overflow-y-auto px-3 py-4"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Accordion type="multiple" defaultValue={['learn', 'sequences', 'tools', 'reference']} className="space-y-2">
            {navSections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <AccordionItem key={section.id} value={section.id} className="border-none">
                  <AccordionTrigger className="hover:no-underline py-2 px-2 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <SectionIcon className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">{section.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="space-y-1 mt-1">
                      {section.items.map((item) => {
                        const active = location.pathname === item.path;
                        const ItemIcon = item.icon;
                        return (
                          <li key={item.path}>
                            <SheetClose asChild>
                              <button
                                onClick={() => handleNavigate(item.path)}
                                className={
                                  `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left group ` +
                                  `${active ? 'bg-accent text-accent-foreground ring-1 ring-border/50 shadow-sm' : 'bg-transparent hover:bg-accent/50'}`
                                }
                              >
                                <span
                                  className={`p-1.5 rounded-md ${
                                    item.color === 'bullish'
                                      ? 'bg-bullish/10 text-bullish'
                                      : 'bg-primary/10 text-primary'
                                  }`}
                                >
                                  <ItemIcon className="w-4 h-4" />
                                </span>
                                <span className="font-medium text-sm text-foreground flex-1">
                                  {item.label}
                                </span>
                                {active && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                )}
                              </button>
                            </SheetClose>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Footer */}
          <div className="mt-auto pt-4 pb-[max(env(safe-area-inset-bottom),1rem)] text-center text-xs text-muted-foreground">
            Six steps. Complete edge.
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
