import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Getting Started" | "Framework" | "Execution" | "Risk" | "Technical";
}

const faqs: FAQItem[] = [
  {
    question: "Which timeframes should I use for HTF analysis?",
    answer: "For HTF context, use Daily and 4H charts. These show where smart money is positioned and where major liquidity sits. Your entry timeframe (LTF) should be 5m, 15m, or 1H depending on your chart timeframe. If you're on 5m chart, your HTF is 1H/4H/Daily. The indicator's Auto Mode handles this automatically.",
    category: "Getting Started"
  },
  {
    question: "How do I know if I'm in premium or discount?",
    answer: "Find the HTF range (Daily high to Daily low). Calculate 50% (equilibrium). If price is above 50% = premium zone (look for shorts). If below 50% = discount zone (look for longs). Between 40-60% = neutral, avoid trading. The indicator marks these zones automatically with EQ lines.",
    category: "Framework"
  },
  {
    question: "What if there's no liquidity sweep?",
    answer: "NO SWEEP = NO TRADE. This is a strict rule. Without a liquidity sweep, you have no trigger and no confirmation that smart money is active. Wait patiently for a clear wick through BSL/SSL with immediate reversal. Don't force trades.",
    category: "Framework"
  },
  {
    question: "Can I enter without C2 confirmation?",
    answer: "Not recommended. C2 (3-candle reversal pattern) confirms the sweep held and structure shifted. Entering without C2 dramatically reduces win rate. The extra 2-3 candles of confirmation is worth the slight delay in entry—it filters out false sweeps.",
    category: "Execution"
  },
  {
    question: "Where exactly do I place my stop loss?",
    answer: "Stop loss goes just beyond the sweep level. If sweep was a high (BSL), stop goes slightly above that high. If sweep was a low (SSL), stop goes slightly below that low. This ensures you're out if the sweep fails. Never widen your stop—if hit, accept the loss.",
    category: "Execution"
  },
  {
    question: "What's a realistic win rate with this system?",
    answer: "With proper execution, expect 45-55% win rate with 1:3 to 1:5 risk/reward ratio. This makes you highly profitable. You don't need 80% win rate—you need high RR. Three 1:3 winners covers six losers. Focus on quality setups, not quantity.",
    category: "Risk"
  },
  {
    question: "How many trades should I take per day?",
    answer: "Quality over quantity. 0-2 high-quality setups per day is ideal. Most profitable traders take 2-5 trades per WEEK. The H2 window (9:30-12 PM EST) provides your best setups. Don't force trades outside this window. Being selective is your edge.",
    category: "Risk"
  },
  {
    question: "Can I use this on stocks or only futures/forex?",
    answer: "The framework works on any liquid market: ES/NQ futures, forex majors (EUR/USD, GBP/USD), Bitcoin, and liquid stocks. Avoid low-volume stocks or exotic pairs—liquidity is key. The more liquid the market, the cleaner the sweeps and patterns.",
    category: "Getting Started"
  },
  {
    question: "What's the minimum account size needed?",
    answer: "You can start with any size, but $1000-$5000 is practical for futures. With 1-2% risk per trade, this gives you proper risk management without overexposure. Focus on percentage gains, not dollar amounts. A 10% month on $2000 builds consistency same as 10% on $20,000.",
    category: "Risk"
  },
  {
    question: "How long does it take to become consistently profitable?",
    answer: "Realistically, 3-6 months of focused practice with proper journaling. First month: learn to identify setups. Second month: paper trade 50+ setups. Third month: small live positions. Months 4-6: build consistency. Don't rush—this is a career skill, not a get-rich-quick scheme.",
    category: "Getting Started"
  },
  {
    question: "Do I need SMT divergence for every trade?",
    answer: "No, SMT is optional but powerful. Think of it as +10-20% confidence boost. If you have HTF bias + sweep + C2 + CISD, that's enough. SMT (comparing ES vs NQ or correlated pairs) is the cherry on top, not a requirement. Use it when available.",
    category: "Framework"
  },
  {
    question: "What if price doesn't come back to my CISD zone?",
    answer: "Then you missed that trade—and that's okay. Never chase. If price doesn't pull back to your entry zone within reasonable time (4-6 candles), the setup is invalid. Wait for the next one. Chasing leads to poor entries and losses.",
    category: "Execution"
  },
  {
    question: "How do I handle multiple CISD zones on one sweep?",
    answer: "Choose the CISD zone closest to the sweep level. This is typically the highest probability entry because it's the most recent structure break. If that fails, you can watch the next zone down, but avoid overcomplicating with too many backup plans.",
    category: "Execution"
  },
  {
    question: "Should I trade both long and short setups?",
    answer: "Yes, but let HTF bias guide you. In a Daily uptrend, focus on long setups. In Daily downtrend, focus on shorts. You can take counter-trend trades (short in uptrend) but only at extreme premium with clear sweeps. Bias > personal preference.",
    category: "Framework"
  },
  {
    question: "What's the best way to practice without losing money?",
    answer: "1) Paper trade on TradingView with Replay feature. 2) Mark up 50+ historical examples to train your eye. 3) Trade micro contracts (MES/MNQ) for $50-$100 risk per trade. 4) Journal EVERY setup whether you take it or not. Consistent review builds pattern recognition.",
    category: "Getting Started"
  },
  {
    question: "My indicator shows too many or too few levels. How to fix?",
    answer: "In Auto Mode, the indicator adapts to your chart TF. If too cluttered, increase 'Bars' count in HTF Setup (reduces historical levels shown). If too sparse, decrease it. Manual Mode gives full control—choose your specific HTFs. Start with defaults and adjust gradually.",
    category: "Technical"
  },
  {
    question: "Can I scale into positions or add to winners?",
    answer: "Not recommended with this framework. OSOK (One Shot One Kill) principle means one entry per setup. Adding to winners sounds good but often leads to overtrading and giving back profits. Trust your initial entry—if it's right, your RR takes care of the rest.",
    category: "Execution"
  },
  {
    question: "What if sweep happens outside H2 session window?",
    answer: "You can still trade it if all other conditions are met, but probability is lower. H2 (9:30-12 PM EST) is highest probability because that's when institutional sweeps cluster. Late-night or off-hours sweeps work but with reduced confidence. Be more selective.",
    category: "Framework"
  },
  {
    question: "How do I know when to move my stop to breakeven?",
    answer: "When price hits 1:1 risk/reward (meaning you're up by the amount you risked), move stop to your entry price. This locks in a breakeven worst case. Then let your runner position work toward H3 (1:3) and H4 (1:4+) targets stress-free.",
    category: "Risk"
  },
  {
    question: "What's the #1 mistake beginners make with this framework?",
    answer: "Trading without confirmed sweep. Beginners see CISD zones or C2 patterns and enter prematurely without waiting for a proper liquidity sweep. Remember: HTF Context → Session Timing → SWEEP → C2 → CISD → Enter. Never skip the sweep. It's your trigger for everything.",
    category: "Framework"
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
    <div className="min-h-screen bg-trading-grid">{/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2 font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Questions
            </span>
            <br />
            <span className="text-foreground text-3xl md:text-5xl">Answered</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
            Everything you need to know about the framework, execution, and trading.
          </p>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono">{category}</h2>
                
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
                        <Card className="overflow-hidden">
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
          <h3 className="text-2xl font-bold mb-3 font-mono">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Review the full framework documentation for deeper understanding.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/knowledge')} size="lg">
              Read Framework
            </Button>
            <Button onClick={() => navigate('/setup')} variant="outline" size="lg">
              Setup Guide
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
