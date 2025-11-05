import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Term {
  term: string;
  acronym?: string;
  category: "Concepts" | "Timeframes" | "Patterns" | "Zones" | "Execution";
  definition: string;
  example?: string;
}

const terms: Term[] = [
  {
    term: "Higher Timeframe",
    acronym: "HTF",
    category: "Timeframes",
    definition: "Larger timeframes (4H, Daily, Weekly) that show institutional positioning and major support/resistance levels. Smart money operates on these levels.",
    example: "Daily and 4H charts show where major liquidity pools sit."
  },
  {
    term: "Lower Timeframe",
    acronym: "LTF",
    category: "Timeframes",
    definition: "Smaller timeframes (5m, 15m, 1H) used for precise entry timing after HTF context is established.",
    example: "Use 5m chart to find exact entry after Daily sweep is confirmed."
  },
  {
    term: "Buy Side Liquidity",
    acronym: "BSL",
    category: "Zones",
    definition: "Stop losses and buy orders sitting above recent highs. Smart money sweeps these levels before reversing down.",
    example: "Price breaks above swing high to grab stops, then reverses sharply."
  },
  {
    term: "Sell Side Liquidity",
    acronym: "SSL",
    category: "Zones",
    definition: "Stop losses and sell orders sitting below recent lows. Smart money sweeps these levels before reversing up.",
    example: "Price breaks below swing low to grab stops, then reverses sharply."
  },
  {
    term: "Liquidity Sweep",
    category: "Patterns",
    definition: "When price briefly breaks a key level (BSL/SSL) with a wick to grab stops, then immediately reverses. This is your trigger.",
    example: "Candle wicks through high, closes back inside range = bullish sweep."
  },
  {
    term: "Change of Character",
    acronym: "C2",
    category: "Patterns",
    definition: "3-candle reversal pattern confirming a liquidity sweep held. Shows market structure shifted direction.",
    example: "After sweep: large reversal candle + follow-through = confirmed C2."
  },
  {
    term: "C3 Expansion",
    acronym: "C3",
    category: "Patterns",
    definition: "The continuation candle after C2. Confirms momentum in new direction. Often targets opposite liquidity.",
    example: "Strong expansion candle after C2 reversal moving toward target."
  },
  {
    term: "Change in State of Delivery",
    acronym: "CISD",
    category: "Zones",
    definition: "The exact zone where market structure changed from bearish to bullish (or vice versa). Your entry level.",
    example: "Mark the order block where price broke structure after sweep."
  },
  {
    term: "Order Block",
    acronym: "OB",
    category: "Zones",
    definition: "The last opposing candle before a strong move. Shows where institutions placed orders. Acts as support/resistance.",
    example: "Last down candle before rally = bullish order block for entries."
  },
  {
    term: "Fair Value Gap",
    acronym: "FVG",
    category: "Zones",
    definition: "Imbalance in price action showing 3 candles where candle 2 doesn't touch candles 1 and 3. Price often returns to fill these gaps.",
    example: "Gap between highs/lows of 3 consecutive candles = unfilled FVG."
  },
  {
    term: "Inverse Fair Value Gap",
    acronym: "iFVG",
    category: "Zones",
    definition: "FVG that's been partially filled but still acts as support/resistance. Often used for entries within CISD zones.",
    example: "Previously filled FVG now acting as entry zone after sweep."
  },
  {
    term: "Smart Money Technique",
    acronym: "SMT",
    category: "Patterns",
    definition: "Divergence between correlated assets (ES/NQ, EUR/GBP) revealing institutional manipulation. Increases setup probability.",
    example: "ES makes new high but NQ doesn't = bearish SMT divergence."
  },
  {
    term: "Premium Zone",
    category: "Zones",
    definition: "Upper half of HTF range (above 50% equilibrium). Institutional sellers dominate. Look for short setups here.",
    example: "Price in top 25% of Daily range = premium, expect shorts."
  },
  {
    term: "Discount Zone",
    category: "Zones",
    definition: "Lower half of HTF range (below 50% equilibrium). Institutional buyers dominate. Look for long setups here.",
    example: "Price in bottom 25% of Daily range = discount, expect longs."
  },
  {
    term: "Equilibrium",
    acronym: "EQ",
    category: "Zones",
    definition: "50% midpoint of a range. No directional bias. Avoid trading at equilibrium—wait for premium or discount.",
    example: "Price at 50% of Daily range = neutral, wait for clear zone."
  },
  {
    term: "Silver Bullet Hour",
    category: "Execution",
    definition: "9:30-10:30 AM EST and 3-4 PM EST. High-probability reversal windows where institutional sweeps occur most.",
    example: "Watch for sweeps during 9:30-10:30 AM window for best setups."
  },
  {
    term: "One Shot One Kill",
    acronym: "OSOK",
    category: "Execution",
    definition: "Execute once per setup. No averaging down, no second chances. Either it works immediately or you exit.",
    example: "Enter at CISD, if no reaction in 2-3 candles = exit cleanly."
  },
  {
    term: "Market Structure Shift",
    acronym: "MSS",
    category: "Patterns",
    definition: "When price breaks previous structure (breaks high in uptrend or low in downtrend), confirming trend change.",
    example: "Price makes lower low then breaks previous lower high = MSS up."
  },
  {
    term: "Macro Time",
    category: "Timeframes",
    definition: "Specific timing windows (2-5 AM, 8-11 AM, 1-3 PM EST) where institutional algorithms execute. Session models based on these.",
    example: "2-5 AM = London open manipulation, 9:30-12 = NYC reversal."
  },
  {
    term: "Distribution",
    category: "Concepts",
    definition: "Smart money selling into retail buying. Happens at premium levels. Precedes bearish moves.",
    example: "Price ranges at highs while volume increases = distribution phase."
  },
  {
    term: "Accumulation",
    category: "Concepts",
    definition: "Smart money buying into retail selling. Happens at discount levels. Precedes bullish moves.",
    example: "Price ranges at lows while volume increases = accumulation phase."
  }
];

const Glossary = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const categories = Array.from(new Set(terms.map(t => t.category)));
  
  const filteredTerms = terms.filter(term =>
    term.term.toLowerCase().includes(search.toLowerCase()) ||
    term.acronym?.toLowerCase().includes(search.toLowerCase()) ||
    term.definition.toLowerCase().includes(search.toLowerCase())
  );

  const groupedTerms = categories.reduce((acc, category) => {
    acc[category] = filteredTerms.filter(t => t.category === category);
    return acc;
  }, {} as Record<string, Term[]>);

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
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-medium">Trading Glossary</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Trading Terms
            </span>
            <br />
            <span className="text-foreground text-3xl md:text-5xl">Decoded</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
            Every term, every acronym, every concept—explained clearly with real examples.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms, acronyms, or definitions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 font-mono"
            />
          </div>
        </motion.div>

        {/* Terms by Category */}
        <div className="space-y-12">
          {Object.entries(groupedTerms).map(([category, categoryTerms], idx) => {
            if (categoryTerms.length === 0) return null;
            
            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 font-mono flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  {category}
                </h2>
                
                <div className="grid gap-4">
                  {categoryTerms.map((term, termIdx) => (
                    <motion.div
                      key={term.term}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + termIdx * 0.05 }}
                    >
                      <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg md:text-xl font-bold font-mono">
                                {term.term}
                              </h3>
                              {term.acronym && (
                                <Badge variant="secondary" className="font-mono text-xs">
                                  {term.acronym}
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                              {term.definition}
                            </p>
                            
                            {term.example && (
                              <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                                <p className="text-xs md:text-sm font-mono">
                                  <span className="font-bold text-accent">Example:</span> {term.example}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-muted-foreground font-mono">
              No terms found matching "{search}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Glossary;
