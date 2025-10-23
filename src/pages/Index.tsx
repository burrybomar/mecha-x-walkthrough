import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, TrendingDown, 
  Zap, Target, Clock, BarChart3, MessageCircle,
  Activity, Book, Eye, Layers, GitCompare, Workflow,
  ArrowUpDown, CheckCircle2, AlertCircle, Info, RotateCcw,
  ArrowRight, Circle, ChevronRight, TrendingUpDown, Search, Crosshair,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AITooltip } from '@/components/AITooltip';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';
import mechaxLogo from '@/assets/mecha-x-logo.gif';
import bslSslChart from '@/assets/bsl-ssl-chart.png';
import htfEdgeCandles from '@/assets/htf-chart-edge.png';
import cisdChart from '@/assets/cisd-chart.png';
import c2LabelsChart from '@/assets/c2-labels-chart.png';

type TabKey = 'overview' | 'visual' | 'pattern' | 'phases' | 'smt' | 'models' | 'tooltips' | 'terms';

interface TabConfig {
  title: string;
  icon: JSX.Element;
  color: string;
  desc: string;
}

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>('overview');
  const [userProgress, setUserProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set<string>());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const fullContentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get current trading session
  const getCurrentSession = () => {
    const hour = currentTime.getHours();
    if (hour >= 18 || hour < 2) return { name: 'Asia', color: 'bg-purple-500', active: true };
    if (hour >= 2 && hour < 6) return { name: 'London', color: 'bg-blue-500', active: true };
    if (hour >= 6 && hour < 18) return { name: 'NY', color: 'bg-emerald-500', active: true };
    return { name: 'Closed', color: 'bg-slate-500', active: false };
  };

  // Progress tracking
  const markComplete = (section: string) => {
    if (!completedSections.has(section)) {
      setCompletedSections(prev => new Set([...prev, section]));
      setUserProgress(prev => Math.min(prev + 12, 100));
    }
  };

  // PDF Export function - exports ALL tabs
  const exportToPDF = async () => {
    if (!fullContentRef.current) return;
    
    setIsExporting(true);
    toast({
      title: "Generating Complete PDF...",
      description: "Please wait while we prepare your full guide with all sections.",
    });

    try {
      const element = fullContentRef.current;
      const opt = {
        margin: 10,
        filename: `MECHA-X-Complete-Guide.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "PDF Downloaded!",
        description: "Complete MECHA-X guide with all sections saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };


  // Tab configuration
  const tabConfig: Record<TabKey, TabConfig> = {
    overview: {
      title: "Overview",
      icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-slate-600 to-slate-800",
      desc: "What is MECHA-X?"
    },
    visual: {
      title: "Visual Guide",
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-blue-500 to-blue-700",
      desc: "Chart components"
    },
    pattern: {
      title: "C1→C2→C3",
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-emerald-500 to-emerald-700",
      desc: "Core pattern"
    },
    phases: {
      title: "Phase System",
      icon: <Workflow className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-cyan-500 to-cyan-700",
      desc: "Market cycles"
    },
    smt: {
      title: "SMT Logic",
      icon: <GitCompare className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-orange-500 to-orange-700",
      desc: "Divergence detection"
    },
    models: {
      title: "4H Models",
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-indigo-500 to-indigo-700",
      desc: "Session setups"
    },
    tooltips: {
      title: "Tooltips",
      icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-purple-500 to-purple-700",
      desc: "Reading intelligence"
    },
    terms: {
      title: "Terms",
      icon: <Book className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "from-pink-500 to-pink-700",
      desc: "Key definitions"
    }
  };

  // Content
  const content = {
    overview: {
      title: "What is MECHA-X?",
      subtitle: "Multi-timeframe analysis without switching timeframes",
      features: [
        { icon: <Layers />, text: "HTF candles on chart edge", detail: "See 4H/Daily structure while on 5min chart" },
        { icon: <Target />, text: "Liquidity zones (BSL/SSL)", detail: "Where stops cluster and smart money hunts" },
        { icon: <Zap />, text: "C1→C2→C3 detection", detail: "Automated sweep pattern identification" },
        { icon: <TrendingUp />, text: "CISD momentum shifts", detail: "Change in State of Delivery patterns" },
        { icon: <GitCompare />, text: "SMT divergence", detail: "Correlated asset structural comparison" },
        { icon: <Clock />, text: "Session-based models", detail: "ASIA-REV, LON-REV, NYAM-SB profiling" }
      ]
    },
    visual: {
      title: "Chart Visual Guide",
      subtitle: "Understanding what you see",
      elements: [
        {
          name: "HTF Candles",
          icon: <BarChart3 className="w-5 h-5" />,
          what: "Small candlesticks on right edge",
          why: "Shows bigger picture without switching TF",
          how: "Green fill = bull, Black fill = bear"
        },
        {
          name: "BSL/SSL Lines",
          icon: <ArrowUpDown className="w-5 h-5" />,
          what: "Horizontal lines at highs/lows",
          why: "Liquidity zones institutions target",
          how: "BSL above highs, SSL below lows"
        },
        {
          name: "C2 Labels",
          icon: <Target className="w-5 h-5" />,
          what: "Pattern markers on chart",
          why: "Shows validated sweep formations",
          how: "C2-4H = sweep on 4H timeframe"
        },
        {
          name: "CISD Lines",
          icon: <Zap className="w-5 h-5" />,
          what: "Horizontal line + shaded zone",
          why: "Momentum shift confirmation",
          how: "Line = open, Zone = to EQ"
        },
        {
          name: "iFVG Zones",
          icon: <Layers className="w-5 h-5" />,
          what: "Shaded rectangles with borders",
          why: "Imbalance areas after sweep",
          how: "Solid top, dotted bottom, thick right"
        },
        {
          name: "Retest Arrows",
          icon: <CheckCircle2 className="w-5 h-5" />,
          what: "▲/▼ with count (e.g., ▲(2))",
          why: "Entry confirmation signals",
          how: "Darker = deeper penetration = stronger"
        },
        {
          name: "SMT Labels",
          icon: <GitCompare className="w-5 h-5" />,
          what: "SMT-[ES] or SMT+[ES·NQ]",
          why: "Divergence between correlated assets",
          how: "- = bearish, + = bullish, · = triad"
        }
      ]
    },
    pattern: {
      title: "C1→C2→C3 Pattern",
      subtitle: "The foundation of every setup",
      steps: [
        {
          name: "C1 Setup",
          emoji: "🎯",
          what: "First candle touching POI",
          rule: "Left candle touches FVG, iFVG, or OB",
          example: "C1 high touches order block above"
        },
        {
          name: "C2 Swing",
          emoji: "⚡",
          what: "Middle candle = THE SWING",
          rule: "BULLISH: C2 lower than C1 & C3 (swing low). BEARISH: C2 higher than C1 & C3 (swing high)",
          example: "Bullish: C2 sweeps SSL below with wick, middle candle is the swing point"
        },
        {
          name: "C3 Confirmation",
          emoji: "✅",
          what: "Right candle confirms reversal",
          rule: "Closes opposite direction from sweep",
          example: "C3 higher than C2 = bullish reversal confirmed"
        }
      ],
      critical: "C2 is ALWAYS the middle candle and THE SWING POINT. 3 candles total: C1→C2 (swing)→C3"
    },
    phases: {
      title: "Phase System",
      subtitle: "How price moves in cycles",
      phases: [
        {
          name: "REVERSAL",
          icon: <RotateCcw className="w-6 h-6" />,
          color: "from-red-500 to-orange-500",
          what: "Change in direction",
          next: "EXPANSION",
          signal: "Sweep + close inside + CISD"
        },
        {
          name: "EXPANSION",
          icon: <TrendingUp className="w-6 h-6" />,
          color: "from-emerald-500 to-teal-500",
          what: "Momentum acceleration",
          next: "CONTINUATION",
          signal: "Large range candles, breaking structure"
        },
        {
          name: "CONTINUATION",
          icon: <ArrowUpDown className="w-6 h-6" />,
          color: "from-blue-500 to-cyan-500",
          what: "Sustained directional move",
          next: "CONSOLIDATION or RETRACEMENT",
          signal: "Higher highs/lower lows maintained"
        },
        {
          name: "CONSOLIDATION",
          icon: <Activity className="w-6 h-6" />,
          color: "from-slate-500 to-gray-500",
          what: "Range formation",
          next: "REVERSAL or EXPANSION",
          signal: "Equal highs/lows, low volatility"
        },
        {
          name: "RETRACEMENT",
          icon: <TrendingDown className="w-6 h-6" />,
          color: "from-yellow-500 to-amber-500",
          what: "Pullback to key level",
          next: "CONTINUATION or REVERSAL",
          signal: "Retest of CISD, iFVG, or EQ"
        }
      ],
      strength: {
        title: "Validation Strength [X/3]",
        levels: [
          { score: "[1/3]", name: "STANDARD", desc: "Phase only", color: "text-slate-600" },
          { score: "[2/3]", name: "CONFIRMED", desc: "Phase + Bias aligned", color: "text-blue-600" },
          { score: "[3/3]", name: "STRONG", desc: "Phase + Bias + SMT", color: "text-emerald-600" }
        ]
      }
    },
    smt: {
      title: "SMT Divergence",
      subtitle: "Structural comparison, not price comparison",
      modes: [
        {
          name: "Binary",
          setup: "1 primary + 1 correlated",
          example: "ES vs NQ",
          detection: "PSP (Precision Swing Point)",
          logic: "ES makes HH, NQ makes LH + closes opposite"
        },
        {
          name: "Triad",
          setup: "1 primary + 2 correlated",
          example: "ES vs NQ + YM",
          detection: "CIC (Correlated Intermarket Convergence)",
          logic: "ES makes HH, both NQ & YM make LH"
        }
      ],
      types: [
        {
          label: "PSP-REV",
          name: "Reversal PSP",
          strength: "🔴🔴🔴 STRONG",
          condition: "Primary swept + closed inside + correlated failed + closed opposite",
          bias: "Bias confirms reversal"
        },
        {
          label: "PSP-CONT",
          name: "Conflict PSP",
          strength: "🟡 WEAK",
          condition: "Divergence present but bias conflicts",
          bias: "Primary closed outside (continuation)"
        },
        {
          label: "CIC-REV",
          name: "2-Stage Reversal",
          strength: "🔴🔴🔴 STRONG",
          condition: "2 assets diverged + bias confirms",
          bias: "Full triad reversal confirmation"
        },
        {
          label: "CIC-PARTIAL",
          name: "Partial Divergence",
          strength: "🟡 MONITOR",
          condition: "Only 1 of 2 correlated failed",
          bias: "Other asset still aligned"
        }
      ],
      key: "Each asset compared to ITS OWN previous bar (not cross-asset price comparison)"
    },
    models: {
      title: "4H Session Models",
      subtitle: "Time-based institutional patterns",
      framework: {
        title: "4-Layer Framework",
        layers: [
          { num: "1", name: "Directional Thesis", desc: "4H structure + session model" },
          { num: "2", name: "Timing Windows", desc: "Silver Bullet + Macro windows" },
          { num: "3", name: "Pattern Confirmation", desc: "1H micro profiling (H1-H4)" },
          { num: "4", name: "Entry Precision", desc: "Macro window + FVG retest" }
        ]
      },
      sessions: [
        {
          name: "4H ASIA REVERSAL",
          time: "6p→2a sweep",
          setup: "22:00 (ASIA) sweeps 18:00 (Pre-ASIA)",
          target: "London expansion 2-6am",
          entry: "LON-SB window (3-4am)",
          hours: "H1(2a) setup → H2(3a) quiet → H3(4a) delivery → H4(5a) continuation"
        },
        {
          name: "4H LONDON REVERSAL",
          time: "2a→10p sweep",
          setup: "02:00 (LON) sweeps 22:00 (ASIA) = TRAP",
          target: "NY reverses London fake move",
          entry: "NYAM-SB window (10-11am)",
          hours: "Real move happens 6-10am"
        },
        {
          name: "1H NYAM-SB",
          time: "10-11am window",
          setup: "Optimal NY entry during 10am hour",
          target: "Session high/low",
          entry: "FVG retest + macro (10:10-10:15)",
          hours: "Most reliable 1H setup of the day"
        }
      ],
      futuresTimes: "6p-10p | 10p-2a | 2a-6a | 6a-10a | 10a-2p | 2p-4p (2H close)"
    },
    tooltips: {
      title: "Reading Tooltips",
      subtitle: "Understanding the intelligence",
      anatomy: [
        {
          section: "Header",
          shows: "Model @ Price | Status | Strength",
          example: "ASIA-REV @ 19875 | ✓ Held | [3/3] STRONG"
        },
        {
          section: "Pattern",
          shows: "C1 time + direction → C2 time",
          example: "PATTERN: 10p High swept → C2 2a"
        },
        {
          section: "Validation",
          shows: "Phase + Bias + SMT alignment",
          example: "Phase:REV + Bias:REV + SMT:PSP-REV ✓✓✓"
        },
        {
          section: "HTF Context",
          shows: "Historical phases at sweep formation",
          example: "✓ 2 HTFs delivering: 7a:EXP ASIA:EXP MON:CONS"
        },
        {
          section: "Outcome",
          shows: "Expected vs actual result",
          example: "→ Reversal held ✓ Pattern played correctly"
        },
        {
          section: "4-Layer",
          shows: "Framework narrative",
          example: "LAYER 1: 4H BEARISH REVERSAL..."
        }
      ],
      htfLabels: {
        title: "Contextual Time Labels",
        examples: [
          { label: "7a:EXP", means: "1H candle at 7am in EXPANSION" },
          { label: "ASIA:REV", means: "4H ASIA session in REVERSAL" },
          { label: "MON:CONS", means: "Daily Monday in CONSOLIDATION" },
          { label: "W12:CONT", means: "Weekly (week 12) in CONTINUATION" }
        ]
      }
    },
    terms: {
      title: "Essential Terms",
      subtitle: "Quick reference guide",
      core: [
        { term: "BSL", def: "Buy Side Liquidity", use: "Highs where buy stops cluster" },
        { term: "SSL", def: "Sell Side Liquidity", use: "Lows where sell stops cluster" },
        { term: "CISD", def: "Change in State of Delivery", use: "Momentum shift confirmation" },
        { term: "iFVG", def: "Inverted Fair Value Gap", use: "Gap inverted by sweep = S/R zone" },
        { term: "EQ", def: "Equilibrium", use: "50% level of range/candle" },
        { term: "HTF", def: "Higher Timeframe", use: "4H/Daily/Weekly context" },
        { term: "LTF", def: "Lower Timeframe", use: "5min/15min/1H entries" },
        { term: "POI", def: "Point of Interest", use: "FVG, OB, iFVG, key level" }
      ],
      advanced: [
        { term: "PSP", def: "Precision Swing Point", use: "Binary SMT divergence signal" },
        { term: "CIC", def: "Correlated Intermarket Convergence", use: "Triad SMT 2-stage signal" },
        { term: "SB", def: "Silver Bullet", use: "Optimal entry windows (3-4am, 10-11am, 2-3pm)" },
        { term: "H1-H4", def: "Hourly Progression", use: "6-7am setup, 7-8am quiet, 8-9am news, 9-10am delivery" }
      ]
    }
  };

  const session = getCurrentSession();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-primary/20 bg-card backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                <img src={mechaxLogo} alt="MECHA-X Logo" className="w-12 h-12 sm:w-14 sm:h-14 relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  MECHA-X
                </h1>
                <p className="text-xs text-primary font-bold">Trading Guide v3.0</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full border-2 border-accent/50 hover:border-accent hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-bold hidden sm:inline">
                  {isExporting ? 'Exporting...' : 'PDF'}
                </span>
              </motion.button>
              
              <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full border border-primary/30">
                <div className={`w-2 h-2 rounded-full ${session.color} ${session.active ? 'animate-pulse' : ''}`}></div>
                <span className="text-sm font-bold text-foreground">{session.name}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' })}
                </span>
              </div>
              <Badge className="bg-primary text-primary-foreground font-bold border-0">OxQQQ</Badge>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-foreground">Guide Progress</span>
              <span className="text-sm font-bold text-primary">{userProgress}%</span>
            </div>
            <div className="relative h-3 bg-secondary rounded-full overflow-hidden border border-primary/30">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${userProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl -z-10"></div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Complete MECHA-X Guide
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master every component, pattern, and signal with interactive AI-powered tooltips
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge className="bg-primary text-primary-foreground border-0 px-4 py-2 text-sm">Multi-Timeframe Analysis</Badge>
            <Badge className="bg-accent text-accent-foreground border-0 px-4 py-2 text-sm">AI Tooltips</Badge>
          </div>
        </motion.div>

        {/* Tabs */}
        <nav className="mb-8" aria-label="Guide sections">
          <div className="bg-card rounded-2xl border-2 border-primary/20 shadow-xl p-3 backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {(Object.entries(tabConfig) as [TabKey, TabConfig][]).map(([key, config]) => (
                <motion.button
                  key={key}
                  onClick={() => {
                    setSelectedTab(key);
                    markComplete(key);
                  }}
                  className={`p-4 rounded-xl transition-all relative overflow-hidden group ${
                    selectedTab === key 
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105 border-2 border-primary' 
                      : 'bg-secondary/50 hover:bg-secondary text-foreground border-2 border-transparent hover:border-primary/30'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: selectedTab === key ? 1.05 : 1.03 }}
                  aria-label={`View ${config.title} section`}
                >
                  {selectedTab === key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <div className={`${selectedTab === key ? 'scale-110' : ''} transition-transform`}>
                      {config.icon}
                    </div>
                    <span className="font-bold text-xs leading-tight">{config.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            ref={contentRef}
          >
            <Card className="shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6 bg-gradient-to-r from-secondary to-accent/30 border-b-2 border-primary/20">
                <div className="flex items-center space-x-4">
                  <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-xl">
                    {tabConfig[selectedTab].icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-foreground">{content[selectedTab].title}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">{content[selectedTab].subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {/* OVERVIEW */}
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-primary text-primary-foreground p-6 rounded-2xl border-2">
                      <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                        💡 <Zap className="w-6 h-6" /> Hover over any underlined term for AI explanations!
                      </h3>
                      <p className="text-primary-foreground/80 text-center">Interactive tooltips powered by your knowledge base</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.overview.features.map((feat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.03, y: -5 }}
                          className="bg-card p-4 rounded-xl border-2 border-border hover:border-primary hover:shadow-md transition-all cursor-pointer group relative"
                        >
                          <div className="absolute top-0 left-0 w-2 h-full bg-primary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-primary text-primary-foreground rounded-lg group-hover:scale-110 transition-transform">
                              {feat.icon}
                            </div>
                            <div>
                              <AITooltip term={feat.text}>
                                <h3 className="font-bold text-foreground">{feat.text}</h3>
                              </AITooltip>
                              <p className="text-sm text-muted-foreground mt-1">{feat.detail}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VISUAL */}
                {selectedTab === 'visual' && (
                  <div className="space-y-8">
                    {/* Image Gallery Section */}
                    <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-6 rounded-2xl">
                      <h3 className="text-white text-xl font-bold mb-4 text-center">Visual Reference Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white/10 backdrop-blur rounded-xl overflow-hidden hover:bg-white/20 transition-all">
                          <div className="aspect-[4/3] overflow-hidden bg-white/5">
                            <img 
                              src={htfEdgeCandles} 
                              alt="HTF Candles"
                              loading="lazy"
                              className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 text-center">
                            <p className="text-white text-sm font-semibold">HTF Candles</p>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl overflow-hidden hover:bg-white/20 transition-all">
                          <div className="aspect-[4/3] overflow-hidden bg-white/5">
                            <img 
                              src={bslSslChart} 
                              alt="BSL/SSL Lines"
                              loading="lazy"
                              className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 text-center">
                            <p className="text-white text-sm font-semibold">BSL/SSL Lines</p>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl overflow-hidden hover:bg-white/20 transition-all">
                          <div className="aspect-[4/3] overflow-hidden bg-white/5">
                            <img 
                              src={c2LabelsChart} 
                              alt="C2 Labels"
                              loading="lazy"
                              className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 text-center">
                            <p className="text-white text-sm font-semibold">C2 Labels</p>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl overflow-hidden hover:bg-white/20 transition-all">
                          <div className="aspect-[4/3] overflow-hidden bg-white/5">
                            <img 
                              src={cisdChart} 
                              alt="CISD Lines"
                              loading="lazy"
                              className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 text-center">
                            <p className="text-white text-sm font-semibold">CISD Lines</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Element Details Section */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-center">Component Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {content.visual.elements.map((el, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-white rounded-xl border-2 border-slate-200 p-5 hover:border-blue-400 hover:shadow-xl transition-all"
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg">
                              {el.icon}
                            </div>
                            <h3 className="font-bold text-lg">{el.name}</h3>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <strong className="text-blue-700">What:</strong>
                              <p className="text-slate-700 mt-1">{el.what}</p>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-lg">
                              <strong className="text-emerald-700">Why:</strong>
                              <p className="text-slate-700 mt-1">{el.why}</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <strong className="text-purple-700">How:</strong>
                              <p className="text-slate-700 mt-1">{el.how}</p>
                            </div>
                          </div>
                        </motion.div>
                       ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* PATTERN */}
                {selectedTab === 'pattern' && (
                  <div className="space-y-6">
                    {/* Flow Diagram */}
                    <div className="bg-muted p-6 rounded-xl border-2 border-primary">
                      <h3 className="text-lg font-bold mb-4 text-center">C1 → C2 → C3 Flow</h3>
                      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                        <motion.div 
                          className="flex-1 min-w-[100px] max-w-[200px] bg-card p-4 rounded-xl border-2 border-primary shadow-lg hover:scale-105 transition-transform"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl mb-2 font-bold">
                              C1
                            </div>
                            <p className="text-xs font-bold mb-1">Touch POI</p>
                            <p className="text-xs text-muted-foreground">Setup candle</p>
                          </div>
                        </motion.div>
                        
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" />
                        
                        <motion.div 
                          className="flex-1 min-w-[100px] max-w-[200px] bg-card p-4 rounded-xl border-2 border-primary shadow-lg hover:scale-105 transition-transform"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl mb-2 font-bold">
                              C2
                            </div>
                            <p className="text-xs font-bold mb-1">Sweep & Return</p>
                            <p className="text-xs text-muted-foreground">Must close inside C1-C2 range</p>
                          </div>
                        </motion.div>
                        
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" />
                        
                        <motion.div 
                          className="flex-1 min-w-[100px] max-w-[200px] bg-card p-4 rounded-xl border-2 border-primary shadow-lg hover:scale-105 transition-transform"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl mb-2 font-bold">
                              C3
                            </div>
                            <p className="text-xs font-bold mb-1">Expectation</p>
                            <p className="text-xs text-muted-foreground">Continuation candle</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    <div className="bg-secondary/30 p-6 rounded-2xl border">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {content.pattern.steps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="p-5 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all cursor-pointer group relative"
                          >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                {step.emoji}
                              </div>
                              <AITooltip term={step.name}>
                                <h3 className="font-bold flex items-center gap-1">
                                  <Target className="w-4 h-4" />
                                  {step.name}
                                </h3>
                              </AITooltip>
                            </div>
                            <p className="text-sm mb-2 text-muted-foreground">{step.what}</p>
                            <div className="bg-secondary p-2 rounded text-xs border-l-2 border-primary">
                              <strong className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Rule:
                              </strong> {step.rule}
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <strong className="flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                Example:
                              </strong> {step.example}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 bg-destructive/10 border-2 border-destructive p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-destructive" />
                          <strong className="text-destructive">Critical:</strong>
                        </div>
                        <p className="text-destructive text-sm">{content.pattern.critical}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PHASES */}
                {selectedTab === 'phases' && (
                  <div className="space-y-6">
                    <div className="bg-secondary/30 p-6 rounded-2xl border">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {content.phases.phases.map((phase, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                            className="p-4 rounded-xl border-2 border-border bg-card hover:bg-primary hover:text-primary-foreground hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-2 rounded-lg mb-2 bg-muted group-hover:bg-background/20 transition-colors">
                              {phase.icon}
                            </div>
                            <AITooltip term={phase.name}>
                              <h3 className="font-bold mb-1 flex items-center gap-1">
                                <Circle className="w-3 h-3" />
                                {phase.name}
                              </h3>
                            </AITooltip>
                            <p className="text-xs mb-2 text-muted-foreground group-hover:text-primary-foreground/90 transition-colors">{phase.what}</p>
                            <div className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                              <strong className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                Signal:
                              </strong> {phase.signal}
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 mt-1 transition-colors">
                              <strong className="flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" />
                                Next:
                              </strong> {phase.next}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Strength Indicators */}
                    <div className="bg-primary text-primary-foreground p-6 rounded-xl border-2">
                      <h3 className="text-xl font-bold mb-4 text-center">Validation Strength System</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {content.phases.strength.levels.map((lvl, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card p-4 rounded-xl border-2 shadow-sm hover:shadow-lg hover:border-primary transition-all group cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Badge className={`${lvl.color} border-0`}>{lvl.score}</Badge>
                              <div className="flex gap-1">
                                {[...Array(3)].map((_, idx) => (
                                  <div 
                                    key={idx} 
                                    className={`w-2 h-8 rounded ${idx < (i + 1) ? 'bg-primary' : 'bg-muted'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <h3 className="font-bold mb-1 flex items-center gap-2">
                              <Activity className="w-4 h-4 text-primary" />
                              {lvl.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{lvl.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SMT */}
                {selectedTab === 'smt' && (
                  <div className="space-y-6">
                    <div className="bg-primary text-primary-foreground p-6 rounded-2xl border-2">
                      <h3 className="text-xl font-bold mb-2 text-center flex items-center justify-center gap-2">
                        <GitCompare className="w-6 h-6" />
                        SMT Divergence Detection
                      </h3>
                      <p className="text-sm text-primary-foreground/80 text-center mb-4">Structural comparison between correlated assets</p>
                    </div>
                    
                    <div className="bg-secondary/30 p-6 rounded-2xl border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {content.smt.modes.map((mode, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="p-5 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all cursor-pointer group relative"
                          >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <AITooltip term={mode.detection}>
                              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <TrendingUpDown className="w-5 h-5 text-primary" />
                                {mode.name}
                              </h3>
                            </AITooltip>
                            <div className="space-y-2 text-sm">
                              <div className="bg-muted p-2 rounded border-l-2 border-primary">
                                <strong className="flex items-center gap-1">
                                  <Crosshair className="w-3 h-3" />
                                  Setup:
                                </strong> {mode.setup}
                              </div>
                              <div className="bg-muted p-2 rounded border-l-2 border-accent">
                                <strong className="flex items-center gap-1">
                                  <Info className="w-3 h-3" />
                                  Example:
                                </strong> {mode.example}
                              </div>
                              <div className="bg-muted p-2 rounded border-l-2 border-accent">
                                <strong className="flex items-center gap-1">
                                  <Search className="w-3 h-3" />
                                  Detection:
                                </strong> {mode.detection}
                              </div>
                              <div className="bg-secondary p-2 rounded border-l-2 border-primary">
                                <strong>Logic:</strong> {mode.logic}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="bg-accent border-2 border-primary p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Info className="w-5 h-5 text-accent-foreground" />
                          <strong className="text-accent-foreground">Key Concept:</strong>
                        </div>
                        <p className="text-muted-foreground text-sm">{content.smt.key}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.smt.types.map((type, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-card p-4 rounded-xl border-2 border-border shadow-sm hover:shadow-lg hover:border-primary transition-all group cursor-pointer relative"
                        >
                          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" />
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-primary text-primary-foreground border-0">{type.label}</Badge>
                            <span className="text-xs font-bold text-muted-foreground">{type.strength}</span>
                          </div>
                          <AITooltip term={type.label}>
                            <h3 className="font-bold mb-1 flex items-center gap-1">
                              <Target className="w-4 h-4 text-primary" />
                              {type.name}
                            </h3>
                          </AITooltip>
                          <p className="text-xs text-muted-foreground mb-2">{type.condition}</p>
                          <p className="text-xs text-foreground font-bold flex items-center gap-1">
                            <ArrowRight className="w-3 h-3" />
                            {type.bias}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MODELS */}
                {selectedTab === 'models' && (
                  <div className="space-y-6">
                    {/* Framework */}
                    <div className="bg-primary text-primary-foreground p-6 rounded-2xl border-2">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 justify-center">
                        <BarChart3 className="w-6 h-6" />
                        {content.models.framework.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {content.models.framework.layers.map((layer, i) => (
                          <motion.div 
                            key={i} 
                            className="bg-background/10 p-4 rounded-xl border border-background/20 hover:bg-background/20 transition-all cursor-pointer"
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            <div className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center font-bold text-lg mb-2">
                              {layer.num}
                            </div>
                            <h4 className="font-bold text-sm mb-1">{layer.name}</h4>
                            <p className="text-xs text-primary-foreground/80">{layer.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Session Timeline */}
                    <div className="bg-muted p-6 rounded-xl border-2">
                      <h3 className="font-bold text-lg mb-4 text-center flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5" />
                        Trading Session Timeline
                      </h3>
                      <div className="flex items-center justify-between mb-6 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary -translate-y-1/2" />
                        {content.models.sessions.map((sess, i) => (
                          <div key={i} className="relative z-10 flex flex-col items-center">
                            <motion.div 
                              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg mb-2 cursor-pointer"
                              whileHover={{ scale: 1.2 }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.2 }}
                            >
                              {i + 1}
                            </motion.div>
                            <span className="text-xs font-bold bg-card px-2 py-1 rounded shadow">{sess.time.split(' ')[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Session Details */}
                    {content.models.sessions.map((sess, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card p-5 rounded-xl border-2 border-border shadow-lg hover:border-primary transition-all group relative"
                      >
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <AITooltip term={sess.name}>
                          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            {sess.name}
                          </h3>
                        </AITooltip>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2 text-sm">
                            <div className="bg-secondary p-2 rounded border-l-2 border-primary">
                              <strong className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Time:
                              </strong> {sess.time}
                            </div>
                            <div className="bg-secondary p-2 rounded border-l-2 border-accent">
                              <strong className="flex items-center gap-1">
                                <Crosshair className="w-3 h-3" />
                                Setup:
                              </strong> {sess.setup}
                            </div>
                            <div className="bg-secondary p-2 rounded border-l-2 border-primary">
                              <strong className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Target:
                              </strong> {sess.target}
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="bg-muted p-2 rounded border-l-2 border-accent">
                              <strong className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                Entry:
                              </strong> {sess.entry}
                            </div>
                            <div className="bg-muted p-2 rounded border-l-2 border-primary">
                              <strong className="flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                Hours:
                              </strong> {sess.hours}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <div className="bg-secondary p-4 rounded-xl border-2">
                      <strong className="text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Futures Times (NYC):
                      </strong>
                      <p className="text-sm text-muted-foreground font-mono mt-1">{content.models.futuresTimes}</p>
                    </div>
                  </div>
                )}

                {/* TOOLTIPS */}
                {selectedTab === 'tooltips' && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      {content.tooltips.anatomy.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border"
                        >
                          <div className="flex items-start space-x-3">
                            <Badge className="bg-purple-500 text-white border-0">{item.section}</Badge>
                            <div className="flex-1">
                              <p className="text-sm mb-1"><strong>Shows:</strong> {item.shows}</p>
                              <div className="bg-white/80 p-2 rounded text-xs font-mono text-slate-700">
                                {item.example}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border">
                      <h3 className="font-bold mb-3">{content.tooltips.htfLabels.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.tooltips.htfLabels.examples.map((ex, i) => (
                          <div key={i} className="bg-white p-3 rounded-lg border text-sm">
                            <Badge className="bg-blue-500 text-white border-0 mb-1 font-mono">{ex.label}</Badge>
                            <p className="text-slate-700">{ex.means}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TERMS */}
                {selectedTab === 'terms' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-bold text-2xl mb-6 text-foreground flex items-center gap-2">
                        <Book className="w-6 h-6 text-primary" />
                        Core Terminology
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.terms.core.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ scale: 1.02, y: -3 }}
                            className="bg-card p-4 rounded-xl border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-full" />
                            <div className="flex items-start space-x-3 relative z-10">
                              <Badge className="bg-primary text-primary-foreground border-0 font-mono text-xs shrink-0">{item.term}</Badge>
                              <div className="flex-1">
                                <AITooltip term={item.term}>
                                  <h4 className="font-bold text-base mb-1 text-foreground">{item.def}</h4>
                                </AITooltip>
                                <p className="text-sm text-muted-foreground">{item.use}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-2xl mb-6 text-foreground flex items-center gap-2">
                        <Target className="w-6 h-6 text-accent" />
                        Advanced Terms
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.terms.advanced.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ scale: 1.02, y: -3 }}
                            className="bg-gradient-to-br from-secondary to-accent/30 p-4 rounded-xl border-2 border-accent/30 hover:border-accent hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-start space-x-3 relative z-10">
                              <Badge className="bg-accent text-accent-foreground border-0 font-mono text-xs shrink-0">{item.term}</Badge>
                              <div className="flex-1">
                                <AITooltip term={item.term}>
                                  <h4 className="font-bold text-base mb-1 text-foreground">{item.def}</h4>
                                </AITooltip>
                                <p className="text-sm text-muted-foreground">{item.use}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Hidden Full Content for PDF Export */}
      <div ref={fullContentRef} className="hidden print:block">
        <div className="space-y-8 p-8">
          {/* Overview Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.overview.title}</h1>
            <p className="text-xl mb-6">{content.overview.subtitle}</p>
            <div className="space-y-4">
              {content.overview.features.map((feat, i) => (
                <div key={i} className="p-4 border-2 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{feat.text}</h3>
                  <p>{feat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Guide Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.visual.title}</h1>
            <p className="text-xl mb-6">{content.visual.subtitle}</p>
            <div className="space-y-4">
              {content.visual.elements.map((el, i) => (
                <div key={i} className="p-4 border-2 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{el.name}</h3>
                  <p className="mb-2"><strong>What:</strong> {el.what}</p>
                  <p className="mb-2"><strong>Why:</strong> {el.why}</p>
                  <p><strong>How:</strong> {el.how}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.pattern.title}</h1>
            <p className="text-xl mb-6">{content.pattern.subtitle}</p>
            <div className="space-y-4">
              {content.pattern.steps.map((step, i) => (
                <div key={i} className="p-4 border-2 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{step.emoji} {step.name}</h3>
                  <p className="mb-2"><strong>What:</strong> {step.what}</p>
                  <p className="mb-2"><strong>Rule:</strong> {step.rule}</p>
                  <p><strong>Example:</strong> {step.example}</p>
                </div>
              ))}
              <div className="p-4 bg-gray-100 rounded-lg mt-4">
                <p className="font-bold">{content.pattern.critical}</p>
              </div>
            </div>
          </div>

          {/* Phases Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.phases.title}</h1>
            <p className="text-xl mb-6">{content.phases.subtitle}</p>
            <div className="space-y-4">
              {content.phases.phases.map((phase, i) => (
                <div key={i} className="p-4 border-2 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{phase.name}</h3>
                  <p className="mb-2"><strong>What:</strong> {phase.what}</p>
                  <p className="mb-2"><strong>Next:</strong> {phase.next}</p>
                  <p><strong>Signal:</strong> {phase.signal}</p>
                </div>
              ))}
              <div className="mt-6">
                <h3 className="font-bold text-xl mb-4">{content.phases.strength.title}</h3>
                {content.phases.strength.levels.map((level, i) => (
                  <div key={i} className="p-3 border rounded-lg mb-2">
                    <p><strong>{level.score} {level.name}:</strong> {level.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SMT Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.smt.title}</h1>
            <p className="text-xl mb-6">{content.smt.subtitle}</p>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-4">Modes</h3>
                {content.smt.modes.map((mode, i) => (
                  <div key={i} className="p-4 border-2 rounded-lg mb-4">
                    <h4 className="font-bold text-lg mb-2">{mode.name}</h4>
                    <p className="mb-2"><strong>Setup:</strong> {mode.setup}</p>
                    <p className="mb-2"><strong>Example:</strong> {mode.example}</p>
                    <p className="mb-2"><strong>Detection:</strong> {mode.detection}</p>
                    <p><strong>Logic:</strong> {mode.logic}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4">Types</h3>
                {content.smt.types.map((type, i) => (
                  <div key={i} className="p-4 border-2 rounded-lg mb-4">
                    <h4 className="font-bold text-lg mb-2">{type.label} - {type.name}</h4>
                    <p className="mb-2"><strong>Strength:</strong> {type.strength}</p>
                    <p className="mb-2"><strong>Condition:</strong> {type.condition}</p>
                    <p><strong>Bias:</strong> {type.bias}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-bold">{content.smt.key}</p>
              </div>
            </div>
          </div>

          {/* Models Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.models.title}</h1>
            <p className="text-xl mb-6">{content.models.subtitle}</p>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-4">{content.models.framework.title}</h3>
                {content.models.framework.layers.map((layer, i) => (
                  <div key={i} className="p-3 border rounded-lg mb-2">
                    <p><strong>Layer {layer.num} - {layer.name}:</strong> {layer.desc}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4">Session Models</h3>
                {content.models.sessions.map((session, i) => (
                  <div key={i} className="p-4 border-2 rounded-lg mb-4">
                    <h4 className="font-bold text-lg mb-2">{session.name}</h4>
                    <p className="mb-2"><strong>Time:</strong> {session.time}</p>
                    <p className="mb-2"><strong>Setup:</strong> {session.setup}</p>
                    <p className="mb-2"><strong>Target:</strong> {session.target}</p>
                    <p className="mb-2"><strong>Entry:</strong> {session.entry}</p>
                    <p><strong>Hours:</strong> {session.hours}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-bold">Futures Times: {content.models.futuresTimes}</p>
              </div>
            </div>
          </div>

          {/* Tooltips Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.tooltips.title}</h1>
            <p className="text-xl mb-6">{content.tooltips.subtitle}</p>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-4">Tooltip Anatomy</h3>
                {content.tooltips.anatomy.map((item, i) => (
                  <div key={i} className="p-4 border-2 rounded-lg mb-4">
                    <h4 className="font-bold text-lg mb-2">{item.section}</h4>
                    <p className="mb-2"><strong>Shows:</strong> {item.shows}</p>
                    <p><strong>Example:</strong> {item.example}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4">{content.tooltips.htfLabels.title}</h3>
                {content.tooltips.htfLabels.examples.map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg mb-2">
                    <p><strong>{item.label}:</strong> {item.means}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terms Section */}
          <div className="break-after-page">
            <h1 className="text-4xl font-bold mb-4">{content.terms.title}</h1>
            <p className="text-xl mb-6">{content.terms.subtitle}</p>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-4">Core Terminology</h3>
                {content.terms.core.map((item, i) => (
                  <div key={i} className="p-4 border-2 rounded-lg mb-3">
                    <h4 className="font-bold text-lg mb-2">{item.term} - {item.def}</h4>
                    <p><strong>Use:</strong> {item.use}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4">Advanced Terms</h3>
                {content.terms.advanced.map((item, i) => (
                  <div key={i} className="p-4 border-2 rounded-lg mb-3">
                    <h4 className="font-bold text-lg mb-2">{item.term} - {item.def}</h4>
                    <p><strong>Use:</strong> {item.use}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-foreground via-primary to-foreground text-primary-foreground py-12 px-4 mt-16 border-t-4 border-primary">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/30 blur-lg rounded-full"></div>
                <img src={mechaxLogo} alt="MECHA-X Logo" className="w-12 h-12 relative z-10" />
              </div>
              <span className="text-3xl font-bold tracking-tight">MECHA-X v3.0</span>
            </div>
            <div className="h-0.5 w-24 bg-accent rounded-full"></div>
            <p className="text-lg">
              Created by <span className="text-accent font-bold">OxQQQ</span>
            </p>
            <p className="text-sm opacity-75 max-w-2xl">
              Trading concepts from ICT, TTrades, GxT, ElevenTrades, Afyz, AMtrades
            </p>
            <div className="flex gap-3 mt-4">
              <Badge className="bg-accent/20 text-primary-foreground border border-accent">Multi-Timeframe</Badge>
              <Badge className="bg-accent/20 text-primary-foreground border border-accent">AI-Powered</Badge>
              <Badge className="bg-accent/20 text-primary-foreground border border-accent">Interactive</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
