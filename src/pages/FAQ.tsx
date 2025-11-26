import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, ChevronDown, AlertTriangle, BookOpen, Target, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { CandlestickPattern } from "@/components/CandlestickPattern";
import { CandlestickButton } from "@/components/CandlestickButton";
import { CandlestickCard } from "@/components/CandlestickCard";

interface FAQItem {
  question: string;
  answer: string;
  category: "Logic & Framework" | "Execution & Rules" | "Risk & Reality";
}

const faqs: FAQItem[] = [
  {
    question: "Does this system guarantee profits?",
    answer: "Absolutely not. No system, indicator, or framework guarantees profits. Mecha-X provides a structured, logical way to interpret market data and identify high-probability conditions. Profitability is a result of your personal execution, risk management, and psychological discipline, not the tool itself.",
    category: "Risk & Reality"
  },
  {
    question: "What is the core logic of the Mecha-X Framework?",
    answer: "The framework is built on the logic that price moves from a Key Level (KL) to a Draw on Liquidity (DL). We do not guess reversals; we wait for price to engage a Key Level (Sweep) and then confirm a reversal via mechanical candle formations (C1-C2-C3).",
    category: "Logic & Framework"
  },
  {
    question: "Why is 'waiting for a sweep' non-negotiable?",
    answer: "A sweep of liquidity (BSL/SSL) represents the engagement of a Key Level. Without this engagement, there is no logical reason to anticipate a reversal. Entering without a sweep is guessing. The sweep is the initiation of the sequence.",
    category: "Logic & Framework"
  },
  {
    question: "What does 'Mechanical' actually mean?",
    answer: "'Mechanical' means the rules for identification are binary: either a condition is met, or it is not. For example, a C2 candle either closes inside the range (confirmed) or it doesn't (unconfirmed). This removes subjective guessing from the analysis, but you must still execute the trade.",
    category: "Logic & Framework"
  },
  {
    question: "Is this a signal service?",
    answer: "No. Mecha-X is a market analysis tool. It highlights when mechanical conditions are present on the chart. It does not tell you to buy or sell. You are responsible for your own entry, stop loss, and take profit decisions based on your trading plan.",
    category: "Risk & Reality"
  },
  {
    question: "What if a confirmed setup fails?",
    answer: "Setups will fail. The market is probabilistic, not deterministic. A confirmed C2 reversal can still be invalidated. This is why we use stop losses. A failed setup is simply information—it often indicates the market is seeking liquidity at a different level.",
    category: "Risk & Reality"
  },
  {
    question: "How does Time/Session impact the logic?",
    answer: "Time provides the 'when'. The framework aligns price action with specific session characteristics (e.g., Asia setting the range, London creating the reversal, New York providing continuation). Trading mechanically means waiting for the right setup at the right time.",
    category: "Execution & Rules"
  },
  {
    question: "What is the 'Invalidation' point?",
    answer: "Every trade idea must have a point where it is proven wrong. In this framework, invalidation is typically the Equilibrium (EQ) of the expansion candle or the sweep level itself. If price violates these levels, the logic for the trade is broken, and the position should be closed.",
    category: "Execution & Rules"
  },
  {
    question: "Can I use this on any timeframe?",
    answer: "Yes, the logic is fractal. A sweep and reversal on a 1-minute chart follows the same mechanics as on a Weekly chart. However, higher timeframes (Daily/4H) generally carry more weight and are less susceptible to noise.",
    category: "Logic & Framework"
  },
  {
    question: "Do I need to use SMT Divergence?",
    answer: "SMT (Smart Money Technique) is a powerful confluence, but it is not strictly required for every setup. The core mechanical sequence (Sweep + C2 Closure + CISD) is the primary driver. SMT adds probability but should not be used as a standalone trigger.",
    category: "Execution & Rules"
  },
  {
    question: "What is the difference between this and standard Price Action?",
    answer: "Standard price action can be subjective (e.g., 'that looks like a pin bar'). Mecha-X defines specific criteria for every candle in the sequence (C1, C2, C3) and their relationship to the previous candle's range. It quantifies the price action.",
    category: "Logic & Framework"
  },
  {
    question: "Why do you focus on 'Inaction'?",
    answer: "Because the market is not always in a high-probability state. Most of the time, price is in a 'seek' phase (moving between levels). The 'destroy' phase (reversal/expansion) happens less often. Waiting for the clear mechanical setup is how you protect your capital.",
    category: "Risk & Reality"
  }
];

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(f => f.category)));

  const filteredFAQs = filterCategory
    ? faqs.filter(f => f.category === filterCategory)
    : faqs;

  const groupedFAQs = categories.reduce((acc, category) => {
    acc[category] = filteredFAQs.filter(f => f.category === category);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <div className="min-h-screen bg-trading-grid">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate("/")}
              className="text-xs"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back
            </CandlestickButton>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-medium">FAQ</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-4xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          {/* Background Candlestick Pattern */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none scale-150">
            <CandlestickPattern variant="background" />
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Logic &
              </span>
              <br />
              <span className="text-foreground text-3xl md:text-5xl">Reality</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
              No false promises. Just the mechanics of the framework.
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          <Button
            variant={filterCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory(null)}
            className="font-mono"
          >
            All
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={filterCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(cat)}
              className="font-mono"
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        {/* FAQs */}
        <div className="space-y-8">
          {Object.entries(groupedFAQs).map(([category, categoryFAQs], catIdx) => {
            if (categoryFAQs.length === 0) return null;

            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + catIdx * 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono flex items-center gap-2">
                  {category === "Logic & Framework" && <Target className="w-6 h-6 text-primary" />}
                  {category === "Execution & Rules" && <Zap className="w-6 h-6 text-yellow-500" />}
                  {category === "Risk & Reality" && <Shield className="w-6 h-6 text-red-500" />}
                  {category}
                </h2>

                <div className="space-y-3">
                  {categoryFAQs.map((faq, faqIdx) => {
                    const globalIdx = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIdx;

                    return (
                      <motion.div
                        key={globalIdx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + faqIdx * 0.05 }}
                      >
                        <CandlestickCard
                          variant="neutral"
                          wickHeight="sm"
                        >
                          <Card className="overflow-hidden border-0">
                            <button
                              onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                              className="w-full p-4 md:p-5 text-left hover:bg-muted/30 transition-colors flex items-start justify-between gap-4"
                            >
                              <div className="flex items-start gap-3 flex-1">
                                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <h3 className="font-bold text-sm md:text-base leading-relaxed">
                                  {faq.question}
                                </h3>
                              </div>
                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              </motion.div>
                            </button>

                            <motion.div
                              initial={false}
                              animate={{
                                height: isOpen ? "auto" : 0,
                                opacity: isOpen ? 1 : 0
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-8">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          </Card>
                        </CandlestickCard>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 rounded-2xl bg-muted/30 border border-border"
        >
          <h3 className="text-2xl font-bold mb-3 font-mono">Dive Deeper</h3>
          <p className="text-muted-foreground mb-6">
            Understand the logic before you trade the setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/fractal-model')} size="lg">
              Read Framework
            </Button>
            <Button onClick={() => navigate('/knowledge')} variant="outline" size="lg">
              Learn Sequences
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
