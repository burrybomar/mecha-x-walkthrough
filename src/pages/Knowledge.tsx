import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, BarChart3, Clock, Target, Zap, Layers, TrendingUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CandlestickScroll } from "@/components/CandlestickScroll";
import { CandlestickPattern } from "@/components/CandlestickPattern";
import { AnimatedPriceAction } from "@/components/AnimatedPriceAction";
import { CandlestickCard } from "@/components/CandlestickCard";
import { CandlestickButton } from "@/components/CandlestickButton";

const Knowledge = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const steps = [
    {
      id: 1,
      icon: Target,
      title: "Reversal Sequence",
      subtitle: "C2 Pattern: Sweep + Close Inside",
      color: "from-orange-500 to-red-500",
      content: {
        concept: "The core mechanical pattern. C1 establishes liquidity, C2 sweeps it and closes back inside, C3 expands away confirming reversal.",
        why: "This is how institutions operate: sweep retail stops at key levels, then reverse direction. The most common sequence.",
        how: [
          "C1: Pre-swing candle forming the liquidity level (swing high/low)",
          "C2: Sweep candle that breaks C1's high/low with wick, closes back inside C1's range",
          "C3: Expansion candle confirming reversal direction",
          "Three formation types: C2-REV (standard), C2-SNAP (aggressive close), C2-EXP (continuation bias)"
        ],
        rule: "NO sweep = NO trade. C2 must close back inside C1's range. Entry at CISD zone (order block or iFVG where structure broke)."
      }
    },
    {
      id: 2,
      icon: Layers,
      title: "Continuation Sequence",
      subtitle: "Aligned Structure Following HTF",
      color: "from-emerald-500 to-teal-500",
      content: {
        concept: "Price maintains directional bias with HTF, showing aligned momentum without major reversals. Cleaner, faster moves.",
        why: "When lower timeframes align with higher timeframes, institutional money flows in one direction with less resistance.",
        how: [
          "HTF shows clear directional bias (premium for shorts, discount for longs)",
          "LTF creates sweep setups that align with HTF direction",
          "No major counter-trend structure on intermediate timeframes",
          "Targets reached faster with less pullback"
        ],
        rule: "Best during Silver Bullet hours when HTF and LTF are aligned. Less risk, cleaner execution, faster targets."
      }
    },
    {
      id: 3,
      icon: ArrowDown,
      title: "Aligned Sequence (C3)",
      subtitle: "Triple Timeframe Confluence",
      color: "from-blue-500 to-cyan-500",
      content: {
        concept: "All three timeframes (HTF, ITF, LTF) show aligned structure in the same direction. The highest probability setup.",
        why: "When Daily, 4H, and 1H all align, institutional flows compound. These are the A+ setups worth waiting for.",
        how: [
          "Daily: Clear premium/discount positioning",
          "4H: Sweep + CISD zone established in HTF direction",
          "1H/15M: LTF sweep confirming HTF bias",
          "All timeframes aligned = maximum confluence"
        ],
        rule: "Wait for complete alignment. Don't force trades when timeframes conflict. Patience = higher win rate."
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
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate("/")}
              className="text-xs"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back to Overview
            </CandlestickButton>
            <div className="text-sm font-mono text-muted-foreground">
              3-Sequence Framework
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
            Apply The Framework
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Master the three sequences. See them in action on real charts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/c2-patterns')}
              className="text-lg px-10 py-6 rounded-full"
            >
              C2 Pattern Types
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/chart-examples')}
              className="text-lg px-10 py-6 rounded-full"
            >
              Chart Examples
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/setup')}
              className="text-lg px-10 py-6 rounded-full"
            >
              Setup Guide
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Knowledge;
