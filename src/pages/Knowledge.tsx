import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, BarChart3, Clock, Target, Zap, Layers, TrendingUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
          "Identify premium vs discount zones relative to range",
          "Look for order blocks and fair value gaps on HTF",
          "Note previous week/day high/low as magnets"
        ],
        rule: "If price is in premium → look for shorts. If in discount → look for longs. No trade in the middle (equilibrium)."
      }
    },
    {
      id: 2,
      icon: Clock,
      title: "Session Timing",
      subtitle: "When to Watch: H1-H4 Model",
      color: "from-purple-500 to-pink-500",
      content: {
        concept: "Not all hours are equal. The 4H/1H profiling model tells you WHEN reversals and expansions happen within the trading day.",
        why: "Institutional moves happen during specific session windows. Trading outside these windows = low probability.",
        how: [
          "H1 (Setup): 2-6 AM EST — Range builds, liquidity forms",
          "H2 (Reversal): 6-10 AM EST — Silver Bullet window, sweeps occur",
          "H3 (Continuation): 10 AM-2 PM EST — Momentum follows through",
          "H4 (Delivery): 2-6 PM EST — Final push into target"
        ],
        rule: "Focus on H2 window (2-6 AM or 9:30-12 PM). This is where sweeps happen and trades trigger."
      }
    },
    {
      id: 3,
      icon: Target,
      title: "Liquidity Sweep",
      subtitle: "The Trigger: BSL/SSL Sweep + C2",
      color: "from-orange-500 to-red-500",
      content: {
        concept: "A liquidity sweep is when price briefly breaks a key level (BSL/SSL) to grab stops, then reverses sharply. C2 (Change of Character) confirms the reversal.",
        why: "Smart money needs liquidity to enter large positions. They sweep retail stops before moving in their true direction.",
        how: [
          "Price breaks HTF high/low with a wick (sweep)",
          "Immediate strong reversal candle closes back inside range",
          "C2 pattern: 3-candle reversal structure confirms",
          "Volume spike during sweep confirms institutional activity"
        ],
        rule: "NO sweep = NO trade. Wait for clean sweep + C2 confirmation before proceeding."
      }
    },
    {
      id: 4,
      icon: Zap,
      title: "CISD Entry",
      subtitle: "Where to Enter: Change in State of Delivery",
      color: "from-emerald-500 to-teal-500",
      content: {
        concept: "CISD marks the exact zone where price structure changed—from making lower lows to higher lows (or vice versa). This is your entry zone.",
        why: "CISD zones act as support/resistance because institutional orders were placed there. Price respects these levels.",
        how: [
          "After sweep + C2, identify the candle that broke structure",
          "Mark the order block or iFVG within that candle",
          "Wait for price to pull back into this zone",
          "Enter when price taps the CISD level and shows rejection"
        ],
        rule: "Stop loss goes just beyond the sweep level. Target is opposite HTF liquidity (H3 = 1:3 RR, H4 = 1:4+ RR)."
      }
    },
    {
      id: 5,
      icon: Layers,
      title: "SMT Confluence",
      subtitle: "Optional: Smart Money Technique",
      color: "from-violet-500 to-purple-500",
      content: {
        concept: "SMT (Smart Money Technique) compares correlated assets (e.g., ES vs NQ, EUR vs GBP). Divergence = manipulation, increases probability.",
        why: "When one asset makes a new high/low but the correlated asset doesn't, it reveals institutional positioning.",
        how: [
          "Compare ES and NQ during your setup",
          "If ES sweeps high but NQ doesn't = bearish SMT divergence",
          "If NQ sweeps low but ES doesn't = bullish SMT divergence",
          "Use as confirmation, not requirement"
        ],
        rule: "SMT is optional but powerful. It adds 10-20% confidence to your setup when present."
      }
    },
    {
      id: 6,
      icon: TrendingUp,
      title: "Trade Management",
      subtitle: "Execution: OSOK (One Shot One Kill)",
      color: "from-green-500 to-emerald-500",
      content: {
        concept: "OSOK means one entry per setup. No averaging, no hoping. Either it works immediately or you're wrong.",
        why: "Precision execution prevents overtrading and emotional decisions. Trust your analysis or exit cleanly.",
        how: [
          "Enter at CISD zone when price taps and rejects",
          "Move stop to breakeven at 1:1 risk/reward",
          "Take 50% profits at H3 (1:3 RR)",
          "Let remaining position run to H4+ (1:4-1:6 RR)"
        ],
        rule: "If price doesn't react at CISD within 2-3 candles, exit. No second chances on same setup."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-retro-digital relative">
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
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
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
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="p-8 rounded-2xl bg-card border border-border shadow-lg"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
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
                      <div className="space-y-6">
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
