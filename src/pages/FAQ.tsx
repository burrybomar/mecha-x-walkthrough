import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
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
  category: "Getting Started" | "Framework" | "Execution" | "Risk" | "Technical";
}

const faqs: FAQItem[] = [
  {
    question: "Which timeframes should I use for HTF analysis?",
    answer: "For HTF context, use Daily and 4H charts. These show where major price structure is positioned and where key liquidity sits. Your entry timeframe (LTF) should be 5m, 15m, or 1H depending on your chart timeframe. If you're on 5m chart, your HTF is 1H/4H/Daily. The indicator's Auto Mode handles this automatically.",
    category: "Getting Started"
  },
  {
    question: "How do I know if I'm in premium or discount?",
    answer: "Find the HTF range (Daily high to Daily low). Calculate 50% (equilibrium). If price is above 50% = premium zone (look for shorts). If below 50% = discount zone (look for longs). Between 40-60% = neutral, avoid trading. The indicator marks these zones automatically with EQ lines.",
    category: "Framework"
  },
  {
    question: "What if there's no liquidity sweep?",
    answer: "NO SWEEP = NO TRADE. This is a strict rule. Without a liquidity sweep, you have no trigger and no confirmation that major participants are active. Wait patiently for a clear wick through BSL/SSL with immediate reversal. Don't force trades.",
    category: "Framework"
  },
  {
    question: "Can I enter without C2 sweep?",
    answer: "Not recommended. C2 is the sweep candle in the 3-candle model (C1→C2→C3). It must sweep C1's level and close back inside C1's range. Entering without a proper C2 sweep dramatically reduces win rate. The sweep confirmation is worth the wait—it filters out false signals.",
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
    answer: "Quality over quantity. 0-2 high-quality setups per day is ideal. Most profitable traders take 2-5 trades per WEEK. The Silver Bullet hours (especially 10:00 AM ET) provide your best setups. Don't force trades outside these windows. Being selective is your edge.",
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
    question: "What if sweep happens outside Silver Bullet hours?",
    answer: "You can still trade it if all other conditions are met, but probability is lower. Silver Bullet hours (10:00 AM ET primary, 03:00 AM and 14:00 PM secondary) are highest probability because that's when liquidity sweeps cluster based on OHLC patterns. Late-night or off-hours sweeps work but with reduced confidence. Be more selective.",
    category: "Framework"
  },
  {
    question: "How do I know when to move my stop to breakeven?",
    answer: "When price hits 1x CISD projection (meaning you're up by the momentum range amount), move stop to your entry price. This locks in a breakeven worst case. Then let your runner position work toward 2x projection (take 50%) and 4x projection (final exit) stress-free.",
    category: "Risk"
  },
  {
    question: "What's the #1 mistake beginners make with this framework?",
    answer: "Trading without confirmed sweep. Beginners see CISD zones or C2 patterns and enter prematurely without waiting for a proper liquidity sweep. Remember: HTF Context → Session Timing → SWEEP → C2 → CISD → Enter. Never skip the sweep. It's your trigger for everything.",
    category: "Framework"
  },
  {
    question: "What's the difference between C2 and CISD?",
    answer: "C2 is the sweep candle that breaks C1's high/low and closes back inside. After C2, momentum candles form moving in the reversal direction. CISD is the CLOSE of the last momentum candle in that series. So C2 triggers the move, CISD is where you enter on the pullback.",
    category: "Framework"
  },
  {
    question: "How many momentum candles do I need for valid CISD?",
    answer: "Minimum 2 consecutive candles moving in the reversal direction after C2 sweep. More momentum candles = stronger setup. Count them: if C2 sweeps low, count the green candles moving up until they stop. The close of the last one = CISD level.",
    category: "Framework"
  },
  {
    question: "What if a sweep breaks but then price comes back?",
    answer: "The strike system allows up to 3 breaks (default). If price closes back inside range after a break, the sweep recovers. After 3 strikes with no recovery, it's permanently invalidated (✗). This prevents you from abandoning valid setups due to temporary noise.",
    category: "Technical"
  },
  {
    question: "When should I use Triad mode vs Binary mode for SMT?",
    answer: "Binary is simpler (2 assets like ES vs NQ). Triad is advanced (3 assets, tracks correlation strength). Start with Binary for +10% confidence. Graduate to Triad once comfortable for +20% confidence when both secondary assets diverge (⟐⟐ full triad).",
    category: "Framework"
  },
  {
    question: "What's the difference between REV, SNAP, and EXP formation types?",
    answer: "Formation types show C2 reversal strength. REV = standard (C2 closes inside C1 range). SNAP = strongest (C2 closes near opposite extreme, within 30% of C1's opposite end). EXP = weak reversal, likely continuation (C2 body engulfs C1 and closes beyond). SNAP formations have highest probability.",
    category: "Framework"
  },
  {
    question: "Do I need SMT to take a trade?",
    answer: "No, SMT is OPTIONAL confluence. The core setup is: HTF context + Session timing + C1→C2→C3 pattern + CISD confirmation. SMT (Binary or Triad) adds confidence but is not required. Think of it as the cherry on top, not the foundation.",
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
                Questions
              </span>
              <br />
              <span className="text-foreground text-3xl md:text-5xl">Answered</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
              Everything you need to know about the framework, execution, and trading.
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
                        <CandlestickCard 
                          variant={faqIdx % 2 === 0 ? "bullish" : "bearish"}
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
