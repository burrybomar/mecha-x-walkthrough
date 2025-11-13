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
    term: "C1 Candle",
    acronym: "C1",
    category: "Patterns",
    definition: "Pre-swing candle in the 3-candle reversal model. Establishes the liquidity level (swing high or low) that will be swept by C2.",
    example: "C1 forms swing high at 4920. This becomes the BSL level for C2 to sweep."
  },
  {
    term: "C2 Candle",
    acronym: "C2",
    category: "Patterns",
    definition: "Sweep candle in the 3-candle reversal model. Breaks C1's high/low with a wick to grab stops, then CLOSES back inside C1's range. This is the reversal trigger.",
    example: "C2 wicks through C1 high at 4925, then closes back at 4915 (inside C1 range)."
  },
  {
    term: "C3 Candle",
    acronym: "C3",
    category: "Patterns",
    definition: "Expansion candle in the 3-candle reversal model. Moves away from C2, confirming the reversal direction. Often targets opposite liquidity.",
    example: "After C2 sweeps high, C3 expands down toward SSL target."
  },
  {
    term: "Formation Types",
    category: "Patterns",
    definition: "Categories of C2 reversal strength. REV = standard (close inside C1). SNAP = aggressive (close near opposite extreme within 30%). EXP = weak reversal, continuation likely (body engulfs C1).",
    example: "SNAP formation: C2 sweeps high at 4925, closes at 4905 near C1 low = strongest reversal signal."
  },
  {
    term: "Change in State of Delivery",
    acronym: "CISD",
    category: "Zones",
    definition: "After C2 sweep, price forms momentum candles. CISD = the CLOSE of the last momentum candle in the series. This becomes your entry level, NOT the sweep extreme.",
    example: "C2 sweeps low at 4900. 3 momentum candles form moving up. Last momentum candle closes at 4920. CISD level = 4920."
  },
  {
    term: "Momentum Candles",
    category: "Patterns",
    definition: "After C2 sweep, consecutive candles (minimum 2) moving in the reversal direction. The close of the last momentum candle = CISD level. More momentum candles = stronger setup.",
    example: "After C2 sweeps low, 3 green candles form moving up. These are momentum candles showing institutional delivery."
  },
  {
    term: "Momentum Range",
    category: "Zones",
    definition: "Distance from C2 sweep extreme to the extreme of the last momentum candle. Used to calculate CISD projections (targets).",
    example: "C2 sweeps low at 4900. Momentum candles reach 4935. Momentum range = 35 points."
  },
  {
    term: "CISD Projections",
    category: "Zones",
    definition: "Price targets calculated as multipliers of momentum range: 1x, 2x, 2.5x, 3.5x, 4x. Projected from the momentum extreme, NOT from CISD level itself.",
    example: "Momentum range = 35 points. 2x target = momentum high + (35 × 2) = projected 70 points above momentum extreme."
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
    definition: "Compares correlated assets to detect institutional manipulation. Binary mode = 2 assets, PSP divergence. Triad mode = 3 assets, 2-Stage CIC correlation tracking.",
    example: "Binary: ES sweeps high but NQ doesn't = bearish SMT. Triad: Both NQ and RTY diverge from ES = full triad signal (⟐⟐)."
  },
  {
    term: "PSP (Precision Swing Point)",
    acronym: "PSP",
    category: "Patterns",
    definition: "Binary SMT concept. One asset sweeps an extreme (high/low) but the correlated asset doesn't follow, revealing divergence and institutional positioning.",
    example: "ES sweeps 4950 high, but NQ fails to make new high = PSP bearish divergence."
  },
  {
    term: "2-Stage CIC",
    category: "Patterns",
    definition: "Triad SMT concept. CIC = Correlation in Correlation. Tracks when middle and lagging assets both crack correlation with the leading asset, indicating Algorithm-1 strength switch.",
    example: "ES leads higher, but both NQ (middle) and RTY (lagging) fail to follow = 2-Stage CIC breakdown."
  },
  {
    term: "Phase Detection",
    category: "Patterns",
    definition: "Identifies which phase price is in: REVERSAL (C2 sweep), EXPANSION (C3 momentum), CONSOLIDATION (range-bound), RETRACEMENT (pullback), CONTINUATION (trend extension).",
    example: "After C2 sweep forms, phase shifts from REVERSAL → EXPANSION as C3 moves away."
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
    definition: "Specific hours with highest probability setups. PRIMARY: 10:00 AM ET (NYAM H2). Secondary: 03:00 AM ET (LON H2) and 14:00 PM ET (NYPM H1). These are marked with ⚡.",
    example: "10:00 AM ET Silver Bullet hour: C2 sweep occurs, highest probability entry window."
  },
  {
    term: "ASIA Session",
    category: "Timeframes",
    definition: "20:00-23:59 ET. Manipulation phase where range builds and liquidity pools form. Not for trading, for observation and level marking.",
    example: "ASIA session: Price ranges 4900-4920, establishing BSL/SSL levels for London session."
  },
  {
    term: "LONDON Session",
    category: "Timeframes",
    definition: "02:00-05:00 ET. Expansion phase where sweeps begin. Silver Bullet at 03:00 ET ⚡.",
    example: "LONDON opens at 02:00 ET, sweeps ASIA highs at 03:00 Silver Bullet hour."
  },
  {
    term: "NYAM Session",
    category: "Timeframes",
    definition: "06:00-09:00 ET. New York AM session. PRIMARY Silver Bullet at 10:00 ET ⚡. Highest probability trading window.",
    example: "NYAM session: 10:00 AM Silver Bullet hour produces cleanest C2 sweeps."
  },
  {
    term: "NYPM Session",
    category: "Timeframes",
    definition: "13:00-16:00 ET. New York PM session. Afternoon Silver Bullet at 14:00 ET ⚡. Final push into targets.",
    example: "NYPM session: 14:00 PM Silver Bullet hour delivers final move to target."
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
  },
  {
    term: "Double Purge",
    acronym: "⟐",
    category: "Patterns",
    definition: "When both BSL and SSL liquidity levels are swept and rejected on the same HTF candle, creating a high-probability reversal setup. The ⟐ symbol indicates count of double purges detected.",
    example: "Price sweeps high, reverses to sweep low, then reverses again = ⟐ double purge."
  },
  {
    term: "SMR Entry",
    acronym: "✓",
    category: "Execution",
    definition: "Sweep, Mitigate, Reverse confirmed entry. When a liquidity sweep is followed by mitigation of the CISD zone and price reverses in the expected direction. The ✓ symbol tracks confirmed SMR entries.",
    example: "SSL swept → price returns to OB → reverses up = ✓ SMR entry confirmed."
  },
  {
    term: "HTF Interval Labels",
    category: "Zones",
    definition: "Timestamp labels displayed on HTF candles showing timeframe and exact time in America/New_York timezone. Helps identify specific candle opens/closes for session timing.",
    example: "Label reads '4H 09:30' = 4-hour candle opened at 9:30 AM EST."
  },
  {
    term: "Divider Hierarchy",
    category: "Zones",
    definition: "Auto-scaled line styling based on timeframe importance. Short-term (≤1H) = dotted, Intraday (4-8H) = dashed, Daily = solid gray, Weekly+ = solid orange.",
    example: "Solid orange line = Weekly open/close, Dotted line = 15m candle boundary."
  },
  {
    term: "Real-Time Sweep Detection",
    category: "Patterns",
    definition: "Live monitoring that identifies liquidity sweeps as they occur, not just on candle close. Updates sweep status intrabar for immediate awareness of potential reversals.",
    example: "Price wicks through SSL mid-candle, 'Live' detection flags potential sweep immediately."
  },
  {
    term: "Strike System",
    category: "Patterns",
    definition: "Allows sweeps to temporarily break without invalidation. Default: 3 strikes allowed. If price closes back inside range, sweep recovers. After max strikes = permanent death ✗.",
    example: "Sweep breaks temporarily, price closes back inside = strike 1. Recovers. After 3 strikes with no recovery = sweep permanently invalidated."
  },
  {
    term: "Session Models",
    category: "Timeframes",
    definition: "Multi-session patterns showing how sessions interact. ASIA→LON (manipulation → expansion), LON→NY (setup → delivery), NY 4H (New York-only patterns).",
    example: "ASIA→LON model: Asia builds range 4900-4920, London sweeps high at 03:00 Silver Bullet."
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
