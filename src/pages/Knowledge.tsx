import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, BarChart3, Clock, Target, Zap, Layers, TrendingUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CandlestickScroll } from "@/components/CandlestickScroll";
import { CandlestickPattern } from "@/components/CandlestickPattern";
import { AnimatedPriceAction } from "@/components/AnimatedPriceAction";
import { CandlestickCard } from "@/components/CandlestickCard";

const Knowledge = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const steps = [
    {
      id: 1,
      icon: BarChart3,
      title: "HTF Context",
      subtitle: "Start Here: The Big Picture",
      color: "from-blue-500 to-cyan-500",
      content: {
        concept: "Before entering any trade, you need to know WHERE price is relative to institutional levels on higher timeframes (Daily/4H).",
        why: "Smart money operates on HTF levels. These are your guardrails—trade with them, not against them.",
        how: [
          "Mark Daily/4H highs and lows (BSL/SSL liquidity pools)",
          "Identify premium vs discount zones: Premium = above 50% of range (equilibrium), Discount = below 50%",
          "Look for order blocks (opposing candles) and fair value gaps on HTF",
          "Note previous week/day high/low as liquidity magnets"
        ],
        rule: "If price is in premium (above 50% EQ) → look for shorts. If in discount (below 50% EQ) → look for longs. Avoid trading at equilibrium (40-60% range)."
      }
    },
    {
      id: 2,
      icon: Clock,
      title: "Session Timing",
      subtitle: "When to Watch: Session Profiling",
      color: "from-purple-500 to-pink-500",
      content: {
        concept: "Not all hours are equal. Understanding session flow tells you WHEN reversals and expansions happen during the trading day.",
        why: "Institutional moves happen during specific session windows. Each session has a distinct character and purpose.",
        how: [
          "ASIA (20:00-23:59 ET): Manipulation phase, range building, liquidity forms",
          "LONDON (02:00-05:00 ET): Expansion phase, sweeps occur, Silver Bullet at 03:00 ET ⚡",
          "NYAM (06:00-09:00 ET): New York AM session, PRIMARY Silver Bullet at 10:00 ET ⚡",
          "NYPM (13:00-16:00 ET): New York PM session, afternoon Silver Bullet at 14:00 ET ⚡"
        ],
        rule: "Focus on Silver Bullet hours: 10:00 AM ET (NYAM H2) is PRIMARY window. 03:00 AM ET (LON H2) and 14:00 PM ET (NYPM H1) are secondary."
      }
    },
    {
      id: 3,
      icon: Target,
      title: "3-Candle Reversal",
      subtitle: "The Trigger: C1 → C2 → C3 Pattern",
      color: "from-orange-500 to-red-500",
      content: {
        concept: "The 3-candle reversal model is the core setup. C1 establishes liquidity. C2 sweeps that level and closes back inside. C3 expands away, confirming the reversal.",
        why: "This is how smart money operates: sweep retail stops (C2), then move in their true direction (C3). Understanding this pattern is everything.",
        how: [
          "C1: Pre-swing candle that forms the liquidity level (swing high or low)",
          "C2: Sweep candle that breaks C1's high/low with a wick, then CLOSES back inside C1's range",
          "C3: Expansion candle that moves away from C2, confirming the reversal direction",
          "Formation types: REV (standard), SNAP (aggressive close near opposite extreme), EXP (strong continuation)"
        ],
        rule: "NO sweep = NO trade. Wait for complete C1 → C2 → C3 formation. C2 must close back inside C1's range to be valid."
      }
    },
    {
      id: 4,
      icon: Zap,
      title: "CISD Entry",
      subtitle: "Where to Enter: Change in State of Delivery",
      color: "from-emerald-500 to-teal-500",
      content: {
        concept: "After C2 sweep, price forms momentum candles moving in the reversal direction. CISD = the CLOSE of the last momentum candle. This becomes your entry level.",
        why: "CISD marks where institutional momentum began. It's where smart money orders were placed, making it a high-probability entry zone.",
        how: [
          "After C2 sweep, count consecutive candles moving in reversal direction (minimum 2 required)",
          "CISD level = close price of the LAST momentum candle in the series",
          "Momentum range = distance from C2 sweep extreme to momentum candle extreme",
          "Targets = CISD projections: 1x, 2x, 2.5x, 3.5x, 4x multipliers of momentum range"
        ],
        rule: "Stop loss goes just beyond C2 sweep extreme. Take 50% at 2x projection, let rest run to 4x. Enter when price pulls back to CISD and shows rejection."
      }
    },
    {
      id: 5,
      icon: Layers,
      title: "SMT Confluence",
      subtitle: "Optional: Smart Money Technique",
      color: "from-violet-500 to-purple-500",
      content: {
        concept: "SMT compares correlated assets to detect institutional manipulation. Binary mode (2 assets) looks for PSP divergence. Triad mode (3 assets) tracks correlation strength shifts.",
        why: "When one asset makes a new high/low but correlated assets don't follow, it reveals institutional positioning and increases setup probability.",
        how: [
          "Binary Mode: Compare 2 assets (ES vs NQ). Look for PSP (Precision Swing Point) - one sweeps, other doesn't",
          "Triad Mode (Advanced): Compare 3 assets (ES vs NQ vs RTY). Look for 2-Stage CIC (Correlation in Correlation)",
          "PSP Divergence: ES sweeps high but NQ doesn't = bearish SMT. NQ sweeps low but ES doesn't = bullish SMT",
          "Full Triad (⟐⟐): Both secondary assets diverge = strongest signal"
        ],
        rule: "SMT is optional but powerful. Binary adds +10% confidence. Full Triad adds +20%. Start with Binary, graduate to Triad once comfortable."
      }
    },
    {
      id: 6,
      icon: TrendingUp,
      title: "Trade Management",
      subtitle: "Execution: OSOK (One Shot One Kill)",
      color: "from-green-500 to-emerald-500",
      content: {
        concept: "OSOK means one entry per setup. No averaging, no hoping. Either it works immediately or you're wrong. This comes from the TTrades methodology.",
        why: "Precision execution prevents overtrading and emotional decisions. Trust your analysis or exit cleanly. Avoid news days and Mondays.",
        how: [
          "Enter at CISD zone when price taps and rejects",
          "Stop loss: Just beyond C2 sweep extreme",
          "Move stop to breakeven at 1x CISD projection",
          "Take 50% profits at 2x CISD projection, let rest run to 4x projection"
        ],
        rule: "If price doesn't react at CISD within 2-3 candles, exit. Trail stops at opposing candle levels. Use CISD projections as targets, not arbitrary RR ratios."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-chart-dots relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Button>
            <div className="text-sm font-mono text-muted-foreground">
              6-Step Framework
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Animated Price Action Background */}
        <AnimatedPriceAction />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Complete
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Knowledge Base
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Everything flows together. Each step builds on the previous. 
            Read this once, linearly, to understand how the entire system connects.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Scroll to begin</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const IconComponent = step.icon;

          return (
            <motion.section
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative py-16 px-4"
            >
              <div className="container mx-auto max-w-6xl">
                <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  {/* Animated Candlestick */}
                  <div className="hidden lg:block flex-shrink-0 relative w-32 h-64">
                    <CandlestickScroll 
                      stepNumber={step.id} 
                      isBullish={step.id % 2 !== 0}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="p-8 rounded-2xl bg-card border border-border shadow-lg relative overflow-hidden"
                    >
                      {/* Background candlestick pattern */}
                      <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none">
                        <CandlestickPattern variant="background" />
                      </div>

                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-mono text-muted-foreground mb-1">
                            Step {step.id} of {steps.length}
                          </div>
                          <h2 className="text-3xl font-bold">{step.title}</h2>
                          <p className="text-lg text-muted-foreground">{step.subtitle}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-6 relative z-10">
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-primary">What Is It?</h3>
                          <p className="text-muted-foreground leading-relaxed">{step.content.concept}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-2 text-primary">Why It Matters</h3>
                          <p className="text-muted-foreground leading-relaxed">{step.content.why}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-3 text-primary">How To Apply</h3>
                          <div className="space-y-2">
                            {step.content.how.map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/80">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <p className="text-sm leading-relaxed">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-accent/10 border-2 border-accent/30">
                          <h3 className="text-sm font-bold mb-2 text-accent">Golden Rule:</h3>
                          <p className="text-sm leading-relaxed">{step.content.rule}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Step Number (Desktop Only) */}
                  <div className="hidden md:block relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-background border-4 border-primary flex items-center justify-center"
                    >
                      <span className="text-3xl font-bold text-primary">{step.id}</span>
                    </motion.div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>

                {/* Arrow to next step */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-12"
                  >
                    <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
                  </motion.div>
                )}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Final CTA */}
      <section className="py-32 px-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Now You Understand the System
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Every piece connects. HTF → Sessions → Sweep → CISD → SMT → Execute. 
            Nothing is random. Nothing is disconnected.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/')}
            className="text-lg px-10 py-6 rounded-full"
          >
            Back to Overview
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Knowledge;
