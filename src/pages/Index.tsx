import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, TrendingDown, 
  Zap, Target, Clock, BarChart3, MessageCircle,
  Activity, Book, Eye, Layers, GitCompare, Workflow,
  ArrowUpDown, CheckCircle2, AlertCircle, Info, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AITooltip } from '@/components/AITooltip';
import { DiagramViewer } from '@/components/DiagramViewer';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={mechaxLogo} alt="MECHA-X Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">
                  MECHA-X Guide
                </h1>
                <p className="text-xs text-slate-600 font-mono">v3.0</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${session.color} ${session.active ? 'animate-pulse' : ''}`}></div>
                <span className="text-xs sm:text-sm font-mono">{session.name}</span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' })} EST
                </span>
              </div>
              <Badge variant="outline" className="font-mono text-xs">OxQQQ</Badge>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-600">Progress</span>
              <span className="text-xs text-slate-600">{userProgress}%</span>
            </div>
            <Progress value={userProgress} className="h-1.5" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-2">
            Complete MECHA-X Guide
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Master every component, pattern, and signal. Interactive demos included.
          </p>
        </motion.div>

        {/* Tabs */}
        <nav className="mb-6" aria-label="Guide sections">
          <div className="bg-white rounded-xl border shadow-lg p-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {(Object.entries(tabConfig) as [TabKey, TabConfig][]).map(([key, config]) => (
                <motion.button
                  key={key}
                  onClick={() => {
                    setSelectedTab(key);
                    markComplete(key);
                  }}
                  className={`p-2 sm:p-3 rounded-lg transition-all ${
                    selectedTab === key 
                      ? `bg-gradient-to-br ${config.color} text-white shadow-lg` 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View ${config.title} section`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    {config.icon}
                    <span className="font-medium text-xs">{config.title}</span>
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
          >
            <Card className="shadow-xl border-0 bg-white/95">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${tabConfig[selectedTab].color} text-white shadow-lg`}>
                    {tabConfig[selectedTab].icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{content[selectedTab].title}</CardTitle>
                    <CardDescription className="text-base">{content[selectedTab].subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* OVERVIEW */}
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-2">💡 Hover over any underlined term for AI explanations!</h3>
                      <p className="text-blue-100">Interactive tooltips powered by your knowledge base</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.overview.features.map((feat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-blue-500 text-white rounded-lg">
                              {feat.icon}
                            </div>
                            <div>
                              <AITooltip term={feat.text}>
                                <h3 className="font-bold text-slate-900">{feat.text}</h3>
                              </AITooltip>
                              <p className="text-sm text-slate-600 mt-1">{feat.detail}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VISUAL */}
                {selectedTab === 'visual' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.visual.elements.map((el, i) => {
                        // Determine which image to show based on element name
                        let elementImage = null;
                        if (el.name === "HTF Candles") {
                          elementImage = htfEdgeCandles;
                        } else if (el.name === "BSL/SSL Lines") {
                          elementImage = bslSslChart;
                        } else if (el.name === "CISD Lines") {
                          elementImage = cisdChart;
                        } else if (el.name === "C2 Labels") {
                          elementImage = c2LabelsChart;
                        }

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border overflow-hidden"
                          >
                            {elementImage && (
                              <div className="h-48 overflow-hidden border-b bg-slate-100">
                                <img 
                                  src={elementImage} 
                                  alt={el.name}
                                  loading="lazy"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="text-blue-600">{el.icon}</div>
                                <h3 className="font-bold">{el.name}</h3>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div><strong className="text-blue-700">What:</strong> {el.what}</div>
                                <div><strong className="text-emerald-700">Why:</strong> {el.why}</div>
                                <div><strong className="text-purple-700">How:</strong> {el.how}</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* PATTERN */}
                {selectedTab === 'pattern' && (
                  <div className="space-y-6">
                    <DiagramViewer 
                      diagramType="pattern"
                      title="C1→C2→C3 Visual Pattern"
                      description="The core sweep pattern showing liquidity manipulation"
                    />
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {content.pattern.steps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-5 rounded-xl border-2 border-emerald-200 bg-white/90 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer"
                          >
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl">
                                {step.emoji}
                              </div>
                              <AITooltip term={step.name}>
                                <h3 className="font-bold">{step.name}</h3>
                              </AITooltip>
                            </div>
                            <p className="text-sm mb-2">{step.what}</p>
                            <div className="bg-emerald-50 p-2 rounded text-xs">
                              <strong>Rule:</strong> {step.rule}
                            </div>
                            <div className="mt-2 text-xs text-slate-600">
                              <strong>Example:</strong> {step.example}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <strong className="text-red-900">Critical:</strong>
                        </div>
                        <p className="text-red-800 text-sm">{content.pattern.critical}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PHASES */}
                {selectedTab === 'phases' && (
                  <div className="space-y-6">
                    <DiagramViewer 
                      diagramType="phases"
                      title="5-Phase Market Cycle"
                      description="How price moves through reversal, expansion, continuation, consolidation, and retracement"
                    />
                    
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {content.phases.phases.map((phase, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            className={`p-4 rounded-xl border-2 border-slate-200 bg-white hover:bg-gradient-to-br ${phase.color} hover:text-white hover:shadow-xl transition-all cursor-pointer group`}
                          >
                            <div className="p-2 rounded-lg mb-2 bg-cyan-100 group-hover:bg-white/20 transition-colors">
                              {phase.icon}
                            </div>
                            <AITooltip term={phase.name}>
                              <h3 className="font-bold mb-1">{phase.name}</h3>
                            </AITooltip>
                            <p className="text-xs mb-2 text-slate-600 group-hover:text-white/90 transition-colors">{phase.what}</p>
                            <div className="text-xs text-slate-500 group-hover:text-white/80 transition-colors">
                              <strong>Signal:</strong> {phase.signal}
                            </div>
                            <div className="text-xs text-slate-500 group-hover:text-white/80 mt-1 transition-colors">
                              Next: {phase.next}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.phases.strength.levels.map((lvl, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-lg transition-shadow"
                        >
                          <Badge className={`${lvl.color} border-0 mb-2`}>{lvl.score}</Badge>
                          <h3 className="font-bold mb-1">{lvl.name}</h3>
                          <p className="text-sm text-slate-600">{lvl.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SMT */}
                {selectedTab === 'smt' && (
                  <div className="space-y-6">
                    <DiagramViewer 
                      diagramType="smt"
                      title="SMT Divergence Detection"
                      description="Structural comparison between correlated assets (ES vs NQ)"
                    />
                    
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {content.smt.modes.map((mode, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.03 }}
                            className="p-5 rounded-xl border-2 border-orange-200 bg-white hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer"
                          >
                            <AITooltip term={mode.detection}>
                              <h3 className="font-bold text-lg mb-2 text-orange-900">{mode.name}</h3>
                            </AITooltip>
                            <div className="space-y-2 text-sm">
                              <div className="bg-orange-50 p-2 rounded"><strong>Setup:</strong> {mode.setup}</div>
                              <div className="bg-orange-50 p-2 rounded"><strong>Example:</strong> {mode.example}</div>
                              <div className="bg-orange-50 p-2 rounded"><strong>Detection:</strong> {mode.detection}</div>
                              <div className="bg-orange-100 p-2 rounded"><strong>Logic:</strong> {mode.logic}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Info className="w-5 h-5 text-yellow-600" />
                          <strong className="text-yellow-900">Key Concept:</strong>
                        </div>
                        <p className="text-yellow-800 text-sm">{content.smt.key}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.smt.types.map((type, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-orange-500 text-white border-0">{type.label}</Badge>
                            <span className="text-xs">{type.strength}</span>
                          </div>
                          <AITooltip term={type.label}>
                            <h3 className="font-bold mb-1">{type.name}</h3>
                          </AITooltip>
                          <p className="text-xs text-slate-600 mb-2">{type.condition}</p>
                          <p className="text-xs text-orange-700">→ {type.bias}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MODELS */}
                {selectedTab === 'models' && (
                  <div className="space-y-6">
                    <DiagramViewer 
                      diagramType="sessions"
                      title="24-Hour Session Timeline"
                      description="Asia, London, and NY session windows with key timing"
                    />
                    
                    <DiagramViewer 
                      diagramType="framework"
                      title="4-Layer Trading Framework"
                      description="From directional thesis to precise entry execution"
                    />
                    
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border">
                      <h3 className="font-bold text-lg mb-4">{content.models.framework.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {content.models.framework.layers.map((layer, i) => (
                          <div key={i} className="bg-white p-4 rounded-xl border shadow-sm">
                            <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                              {layer.num}
                            </div>
                            <h4 className="font-bold text-sm mb-1">{layer.name}</h4>
                            <p className="text-xs text-slate-600">{layer.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {content.models.sessions.map((sess, i) => {
                      const diagramType = sess.name === "4H ASIA REVERSAL" ? "asiaRev" 
                        : sess.name === "4H LONDON REVERSAL" ? "londonRev" 
                        : "nyamSB";
                      
                      return (
                        <div key={i} className="space-y-4">
                          <DiagramViewer 
                            diagramType={diagramType}
                            title={sess.name}
                            description={sess.setup}
                          />
                          
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-5 rounded-xl border shadow-lg"
                          >
                            <AITooltip term={sess.name}>
                              <h3 className="font-bold text-lg mb-3 text-indigo-900">{sess.name}</h3>
                            </AITooltip>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-2 text-sm">
                                <div className="bg-indigo-50 p-2 rounded"><strong>Time:</strong> {sess.time}</div>
                                <div className="bg-indigo-50 p-2 rounded"><strong>Setup:</strong> {sess.setup}</div>
                                <div className="bg-indigo-50 p-2 rounded"><strong>Target:</strong> {sess.target}</div>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="bg-purple-50 p-2 rounded"><strong>Entry:</strong> {sess.entry}</div>
                                <div className="bg-purple-50 p-2 rounded"><strong>Hours:</strong> {sess.hours}</div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}

                    <div className="bg-slate-100 p-4 rounded-xl border">
                      <strong className="text-slate-800">Futures Times (NYC):</strong>
                      <p className="text-sm text-slate-700 font-mono mt-1">{content.models.futuresTimes}</p>
                    </div>
                  </div>
                )}

                {/* TOOLTIPS */}
                {selectedTab === 'tooltips' && (
                  <div className="space-y-6">
                    <DiagramViewer 
                      diagramType="tooltipAnatomy"
                      title="Tooltip Structure Breakdown"
                      description="Understanding each section of MECHA-X intelligence tooltips"
                    />
                    
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
                  <div className="space-y-6">
                    <DiagramViewer 
                      diagramType="terms"
                      title="Essential Trading Terms Visual Guide"
                      description="Quick visual reference for key MECHA-X terminology"
                    />
                    
                    <div>
                      <h3 className="font-bold text-lg mb-3">Core Terms</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.terms.core.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-xl border"
                          >
                             <div className="flex items-start space-x-2">
                              <Badge className="bg-pink-500 text-white border-0 font-mono text-xs">{item.term}</Badge>
                              <div className="flex-1">
                                <AITooltip term={item.term}>
                                  <h4 className="font-bold text-sm">{item.def}</h4>
                                </AITooltip>
                                <p className="text-xs text-slate-600 mt-1">{item.use}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-3">Advanced Terms</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.terms.advanced.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-xl border"
                          >
                             <div className="flex items-start space-x-2">
                              <Badge className="bg-indigo-500 text-white border-0 font-mono text-xs">{item.term}</Badge>
                              <div className="flex-1">
                                <AITooltip term={item.term}>
                                  <h4 className="font-bold text-sm">{item.def}</h4>
                                </AITooltip>
                                <p className="text-xs text-slate-600 mt-1">{item.use}</p>
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

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 to-indigo-800 text-white py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={mechaxLogo} alt="MECHA-X Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">MECHA-X v3.0</span>
          </div>
          <p className="text-slate-300 text-sm mb-2">
            Created by <span className="text-emerald-400 font-semibold">OxQQQ</span>
          </p>
          <p className="text-xs text-slate-400">
            Concepts from ICT, TTrades, GxT, ElevenTrades, Afyz, AMtrades
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
