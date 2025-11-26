import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CandlestickButton } from "@/components/CandlestickButton";
import { IndicatorExplainer } from "@/components/IndicatorExplainer";
import { FVGVisual } from "@/components/FVGVisual";
import { OrderBlockVisual } from "@/components/visuals/OrderBlockVisual";
import { MSSVisual } from "@/components/visuals/MSSVisual";
import { CandlestickCard } from "@/components/CandlestickCard"; // Keep this import if CandlestickCard is used elsewhere, otherwise remove.
import { Card } from "@/components/ui/card"; // Keep this import if Card is used elsewhere, otherwise remove.
import { Badge } from "@/components/ui/badge"; // Keep this import if Badge is used elsewhere, otherwise remove.


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
    definition: "Larger timeframes (4H, Daily, Weekly) that show key OHLC structure and major support/resistance levels. Price action at these levels guides trades.",
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
    definition: "Stop losses and buy orders sitting above recent highs. Major participants sweep these levels before reversing down.",
    example: "Price breaks above swing high to grab stops, then reverses sharply."
  },
  {
    term: "Sell Side Liquidity",
    acronym: "SSL",
    category: "Zones",
    definition: "Stop losses and sell orders sitting below recent lows. Major participants sweep these levels before reversing up.",
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
    example: "After C2 sweeps low, 3 green candles form moving up. These are momentum candles showing price delivery."
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
    definition: "The last opposing candle before a strong move. Shows where significant orders were placed via OHLC structure. Acts as support/resistance.",
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
    term: "Correlation Divergence",
    acronym: "SMT",
    category: "Patterns",
    definition: "Compares correlated assets to detect OHLC manipulation. Binary mode = 2 assets, PSP divergence. Triad mode = 3 assets, 2-Stage CIC correlation tracking.",
    example: "Binary: ES sweeps high but NQ doesn't = bearish SMT. Triad: Both NQ and RTY diverge from ES = full triad signal (⟐⟐)."
  },
  {
    term: "PSP (Precision Swing Point)",
    acronym: "PSP",
    category: "Patterns",
    definition: "Binary SMT concept. One asset sweeps an extreme (high/low) but the correlated asset doesn't follow, revealing divergence in price structure.",
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
    definition: "Upper half of HTF range (above 50% equilibrium). Look for short setups here based on OHLC structure.",
    example: "Price in top 25% of Daily range = premium, expect shorts."
  },
  {
    term: "Discount Zone",
    category: "Zones",
    definition: "Lower half of HTF range (below 50% equilibrium). Look for long setups here based on OHLC structure.",
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
    term: "Key Session Phases",
    category: "Execution",
    definition: "Specific timing windows with highest probability setups. London Expansion (02:00-05:00 ET) and NY Continuation/Reversal (08:00-11:00 ET).",
    example: "London Expansion phase often provides the cleanest C2 sweeps of Asia liquidity."
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
    definition: "02:00-05:00 ET. Expansion phase where sweeps begin. Focus on Asia High/Low sweeps.",
    example: "LONDON opens at 02:00 ET, often sweeps ASIA highs to induce shorts before reversing."
  },
  {
    term: "NYAM Session",
    category: "Timeframes",
    definition: "06:00-09:00 ET. New York AM session. Primary execution window for continuation or reversal models.",
    example: "NYAM session: 09:30-11:00 ET window produces high probability setups aligning with daily bias."
  },
  {
    term: "NYPM Session",
    category: "Timeframes",
    definition: "13:00-16:00 ET. New York PM session. Final push into targets or end-of-day reversals.",
    example: "NYPM session: Late day moves often target remaining liquidity pools."
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
    definition: "Refers to Higher Timeframe (Weekly/Monthly) context. In the settings, 'Macro' tooltips indicate features relevant to these longer-term cycles, distinct from intraday session timing.",
    example: "Weekly Open/Close lines are considered Macro structure."
  },
  {
    term: "Distribution",
    category: "Concepts",
    definition: "Major participants selling into retail buying. Happens at premium levels. Precedes bearish moves.",
    example: "Price ranges at highs while volume increases = distribution phase."
  },
  {
    term: "Accumulation",
    category: "Concepts",
    definition: "Major participants buying into retail selling. Happens at discount levels. Precedes bullish moves.",
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
    definition: "Multi-session patterns showing how sessions interact. 4H ASIA REVERSAL (Asia sweep + reverse), 4H LONDON REVERSAL (London sweep + reverse), 4H NY REVERSAL (NY continuation/reversal).",
    example: "4H ASIA REVERSAL: Price sweeps Asia High, then reverses lower during London/NY."
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
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate("/")}
              className="text-xs"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back
            </CandlestickButton>
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
          className="text-center mb-8 md:mb-12 relative"
        >
          {/* Background Candlestick Pattern */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none scale-150">
            {/* Background pattern removed to reduce visual noise */}
          </div>

          <div className="relative z-10">
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
          </div>
        </motion.div>

        {/* Visual Explainers Section */}
        <section className="py-8 mb-12">
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-center mb-8 px-4 text-glow"
            >
              Key Concepts Visualized
            </motion.h2>

            {/* FVG Visual */}
            <IndicatorExplainer
              title="Fair Value Gap (FVG)"
              what="Price imbalance created during quick moves where candle wicks don't overlap"
              why="FVGs act as magnets - price often returns to 'fill the gap' creating high-probability entry zones."
              howToRead={[
                {
                  element: "GAP ZONE",
                  meaning: "Space between candle 1's low and candle 3's high (or vice versa)",
                  action: "Mark this zone on your chart - price tends to return here",
                },
                {
                  element: "IMBALANCE",
                  meaning: "Area where no price discovery occurred during the move",
                  action: "Stronger FVGs have larger gaps - more powerful magnets",
                },
                {
                  element: "FILL",
                  meaning: "Price returning to trade within the gap zone",
                  action: "Enter when price reaches FVG and shows rejection",
                },
              ]}
              visualExample={<FVGVisual />}
            />

            {/* Order Block Visual */}
            <IndicatorExplainer
              title="Order Block"
              what="The last opposing candle before a strong directional move"
              why="This is where institutional orders were placed - price often returns to test these zones before continuing."
              howToRead={[
                {
                  element: "ORDER BLOCK CANDLE",
                  meaning: "Last bearish candle before bullish reversal (or vice versa)",
                  action: "Mark the entire candle body as a potential entry zone",
                },
                {
                  element: "INSTITUTIONAL ORDERS",
                  meaning: "Smart money placed large orders within this candle's range",
                  action: "These unfilled orders act as support/resistance",
                },
                {
                  element: "RETEST",
                  meaning: "Price returning to the order block zone after the initial move",
                  action: "Enter on the retest with tight stops below/above the OB",
                },
              ]}
              visualExample={<OrderBlockVisual />}
            />

            {/* MSS Visual */}
            <IndicatorExplainer
              title="Market Structure Shift (MSS)"
              what="When price breaks a key swing point, changing from bullish to bearish structure (or vice versa)"
              why="MSS signals a potential trend change - institutions switching from distribution to accumulation."
              howToRead={[
                {
                  element: "OLD STRUCTURE",
                  meaning: "Series of Higher Highs & Higher Lows (bullish) or Lower Highs & Lower Lows (bearish)",
                  action: "Identify the established swing pattern before the break",
                },
                {
                  element: "STRUCTURE BREAK",
                  meaning: "Price breaks below previous swing low (bullish→bearish) or above previous swing high (bearish→bullish)",
                  action: "This candle signals potential trend reversal",
                },
                {
                  element: "NEW STRUCTURE",
                  meaning: "Confirmation of new trend with fresh swing points",
                  action: "Look for C2 sweep setups aligned with the new structure",
                },
              ]}
              visualExample={<MSSVisual />}
            />
          </div>
        </section>

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

                <Accordion type="single" collapsible className="w-full">
                  {categoryTerms.map((term, termIdx) => (
                    <AccordionItem key={term.term} value={term.term} className="border-b border-white/10">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3 text-left">
                          <span className="text-lg font-mono font-semibold text-foreground/90">
                            {term.term}
                          </span>
                          {term.acronym && (
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                              {term.acronym}
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pb-4 pl-4 border-l-2 border-primary/20 ml-2 space-y-3">
                          <p className="text-muted-foreground leading-relaxed">
                            {term.definition}
                          </p>
                          {term.example && (
                            <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                              <p className="text-sm font-mono">
                                <span className="font-bold text-accent">Example:</span> {term.example}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
