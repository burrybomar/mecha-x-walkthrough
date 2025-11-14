import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CandlestickPattern } from "@/components/CandlestickPattern";
import { CandlestickButton } from "@/components/CandlestickButton";
import { CandlestickCard } from "@/components/CandlestickCard";

// Import chart images
import htfChart from "@/assets/htf-chart-edge.png";
import htfLevel from "@/assets/htf-level-clean.png";
import htfSweeps from "@/assets/htf-sweeps-chart.png";
import htfKeyLevel from "@/assets/htf-key-level-diagram.png";
import liquiditySweep from "@/assets/liquidity-sweep-clean.png";
import bslSslChart from "@/assets/bsl-ssl-chart.png";
import c2Chart from "@/assets/c2-labels-chart.png";
import swingPattern from "@/assets/swing-low-confirmation-new.jpg";
import cisdChart from "@/assets/cisd-chart.png";
import cisdLtf from "@/assets/ltf-entry-confirmation.jpg";
import setupZones from "@/assets/trade-setups-h4.jpg";
import distributionSetups from "@/assets/distribution-setups.png";
import h4Distribution from "@/assets/h4-distribution-formations.jpg";
import smtLtf from "@/assets/smt-ltf-chart.png";
import candleClosure from "@/assets/closing-within-pattern.jpg";
import closingComplete from "@/assets/closing-within-complete.jpg";
import h1M15WithinH4 from "@/assets/h1-m15-within-h4.jpg";
import scalperObjective from "@/assets/scalper-objective.jpg";

interface ChartExample {
  title: string;
  category: "HTF Analysis" | "Liquidity" | "Patterns" | "Entry Zones" | "Sessions";
  image: string;
  description: string;
  keyPoints: string[];
  frameworkStep: string;
}

const examples: ChartExample[] = [
  {
    title: "HTF Context & Bias",
    category: "HTF Analysis",
    image: htfChart,
    description: "Higher timeframe showing premium/discount zones and key liquidity levels that guide our directional bias.",
    keyPoints: [
      "Daily high = BSL target for bearish setups",
      "Price in premium zone → look for shorts",
      "Previous week low = discount zone for longs",
      "HTF order blocks marked for reversal areas"
    ],
    frameworkStep: "Step 1: HTF Context"
  },
  {
    title: "Clean HTF Level",
    category: "HTF Analysis",
    image: htfLevel,
    description: "Identifying untouched HTF levels that act as magnets for price and reversal zones.",
    keyPoints: [
      "Horizontal level shows key HTF resistance",
      "Multiple touches = strong level",
      "Gap between current price and level = target",
      "Await sweep of this level for reversal setup"
    ],
    frameworkStep: "Step 1: HTF Context"
  },
  {
    title: "HTF Sweep Pattern",
    category: "Liquidity",
    image: htfSweeps,
    description: "Price sweeping HTF highs/lows to grab liquidity before reversing in true direction.",
    keyPoints: [
      "Wick through HTF high grabs BSL",
      "Immediate strong reversal candle",
      "Close back inside range confirms sweep",
      "This is your trigger to look for entries"
    ],
    frameworkStep: "Step 3: Liquidity Sweep"
  },
  {
    title: "Key Level Diagram",
    category: "HTF Analysis",
    image: htfKeyLevel,
    description: "Visual breakdown of how price interacts with key HTF levels and creates trading opportunities.",
    keyPoints: [
      "Structure of highs and lows",
      "Where liquidity sits (BSL/SSL)",
      "Expected sweep zones",
      "Reversal areas after sweep"
    ],
    frameworkStep: "Step 1: HTF Context"
  },
  {
    title: "Perfect Liquidity Sweep",
    category: "Liquidity",
    image: liquiditySweep,
    description: "Clean example of liquidity sweep with clear wick through level and immediate reversal.",
    keyPoints: [
      "Sharp wick grabs stops above high",
      "Body closes back inside range",
      "Strong rejection = valid sweep",
      "Next step: find C2 confirmation"
    ],
    frameworkStep: "Step 3: Liquidity Sweep"
  },
  {
    title: "BSL/SSL Levels",
    category: "Liquidity",
    image: bslSslChart,
    description: "Identifying both Buy Side and Sell Side Liquidity pools for potential sweep targets.",
    keyPoints: [
      "BSL = stops above recent highs",
      "SSL = stops below recent lows",
      "Price seeks these levels before reversing",
      "Higher TF liquidity more significant"
    ],
    frameworkStep: "Step 1: HTF Context"
  },
  {
    title: "C2 Pattern Labels",
    category: "Patterns",
    image: c2Chart,
    description: "C2 (Change of Character) patterns labeled on chart showing confirmed reversals after sweeps.",
    keyPoints: [
      "3-candle reversal pattern",
      "Confirms sweep held",
      "Shows structure break",
      "Entry signal to find CISD"
    ],
    frameworkStep: "Step 3: Sweep Detection"
  },
  {
    title: "Swing Low Pattern",
    category: "Patterns",
    image: swingPattern,
    description: "Structure of swing lows and how they form SSL that gets swept for long setups.",
    keyPoints: [
      "Series of lower lows builds SSL",
      "Sweep of final low triggers reversal",
      "Structure shift after sweep",
      "Entry zone forms at breakdown point"
    ],
    frameworkStep: "Step 3: Sweep Detection"
  },
  {
    title: "CISD Entry Zone",
    category: "Entry Zones",
    image: cisdChart,
    description: "Change in State of Delivery zone marked—where price broke structure and your entry forms.",
    keyPoints: [
      "Mark where structure broke",
      "Order block or iFVG within zone",
      "Wait for pullback to this level",
      "Enter on rejection wick"
    ],
    frameworkStep: "Step 4: CISD Entry"
  },
  {
    title: "CISD on LTF",
    category: "Entry Zones",
    image: cisdLtf,
    description: "Lower timeframe view of CISD zone showing precise entry wick and rejection.",
    keyPoints: [
      "Zoom to 5m/15m for precision",
      "Entry wick taps CISD level",
      "Strong rejection confirms",
      "Stop loss just beyond sweep"
    ],
    frameworkStep: "Step 4: CISD Entry"
  },
  {
    title: "Setup Zones Clean",
    category: "Entry Zones",
    image: setupZones,
    description: "Multiple CISD setup zones marked showing optimal entry levels after different sweeps.",
    keyPoints: [
      "Multiple valid zones after each sweep",
      "Choose zone closest to sweep",
      "Respect HTF bias for direction",
      "Each zone offers entry opportunity"
    ],
    frameworkStep: "Step 4: CISD Entry"
  },
  {
    title: "Distribution Setup",
    category: "Sessions",
    image: distributionSetups,
    description: "How major participants distribute at premium levels during specific session windows.",
    keyPoints: [
      "Price ranges at highs = distribution",
      "Volume increases during consolidation",
      "Sweep of high triggers reversal",
      "Targets discount zone below"
    ],
    frameworkStep: "Step 2: Session Timing"
  },
  {
    title: "H4 Distribution Candle",
    category: "Sessions",
    image: h4Distribution,
    description: "H4 session window showing distribution phase and final delivery move.",
    keyPoints: [
      "2-6 PM EST = H4 delivery window",
      "Final push into target",
      "Distribution before move",
      "Session-based timing critical"
    ],
    frameworkStep: "Step 2: Session Timing"
  },
  {
    title: "SMT Divergence (LTF)",
    category: "Patterns",
    image: smtLtf,
    description: "Correlation divergence between assets revealing OHLC manipulation.",
    keyPoints: [
      "Compare ES vs NQ during setup",
      "One makes new high, other doesn't",
      "Divergence = manipulation confirmed",
      "Adds 10-20% confidence to trade"
    ],
    frameworkStep: "Step 5: SMT Confluence"
  },
  {
    title: "Candle Closure Confirmation",
    category: "Patterns",
    image: candleClosure,
    description: "How candle body closes relative to sweep levels determines setup validity.",
    keyPoints: [
      "Wick sweeps HTF level",
      "Body must close back inside range",
      "Closure confirms rejection",
      "Validates sweep and reversal"
    ],
    frameworkStep: "Step 3: Sweep Detection"
  },
  {
    title: "Complete Closing Within Pattern",
    category: "Patterns",
    image: closingComplete,
    description: "Full pattern showing closing within behavior after H4 distribution candle sweep.",
    keyPoints: [
      "H4 distribution candle closes above sweep",
      "Next candle must close back inside",
      "This confirms the reversal",
      "Entry zone now valid"
    ],
    frameworkStep: "Step 3: Sweep Detection"
  },
  {
    title: "Multi-Timeframe Confluence",
    category: "Entry Zones",
    image: h1M15WithinH4,
    description: "H1 previous candle run, M15 stop hunt, and M15 FVG all within the H4 distribution candle.",
    keyPoints: [
      "H1 run establishes larger context",
      "M15 stop hunt provides entry precision",
      "M15 FVG marks optimal fill zone",
      "All align within H4 candle body"
    ],
    frameworkStep: "Step 4: CISD Entry"
  },
  {
    title: "Scalper's Primary Objective",
    category: "Sessions",
    image: scalperObjective,
    description: "The ultimate scalping target: catching the very next H4 candle distribution move.",
    keyPoints: [
      "Previous H4 sets up next move",
      "Target is immediate next H4 candle",
      "Highest probability scalp",
      "Quick execution, tight stops"
    ],
    frameworkStep: "Step 6: Trade Management"
  }
];

const ChartExamples = () => {
  const navigate = useNavigate();
  const categories = Array.from(new Set(examples.map(e => e.category)));

  return (
    <div className="min-h-screen bg-chart-dots">{/* Header */}
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
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-medium">Chart Examples</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          {/* Background Candlestick Pattern */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none scale-125">
            <CandlestickPattern variant="background" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Real Charts
              </span>
              <br />
              <span className="text-foreground text-3xl md:text-5xl">Real Setups</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-mono">
              See the framework in action. Every concept visualized with actual chart examples.
            </p>
          </div>
        </motion.div>

        {/* Examples by Category */}
        <div className="space-y-16">
          {categories.map((category, catIdx) => {
            const categoryExamples = examples.filter(e => e.category === category);
            
            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8 font-mono flex items-center gap-3">
                  <Layers className="w-8 h-8 text-primary" />
                  {category}
                </h2>
                
                <div className="grid gap-8 md:grid-cols-2">
                  {categoryExamples.map((example, idx) => (
                    <motion.div
                      key={example.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CandlestickCard 
                        variant={idx % 2 === 0 ? "bullish" : "bearish"}
                        wickHeight="md"
                        className="h-full"
                      >
                        <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-0">
                          {/* Image */}
                          <div className="relative aspect-video bg-muted overflow-hidden group">
                            <img 
                              src={example.image} 
                              alt={example.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <Badge 
                              className="absolute top-3 right-3 font-mono text-xs"
                              variant="secondary"
                            >
                              {example.frameworkStep}
                            </Badge>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 font-mono">
                              {example.title}
                            </h3>
                            
                            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                              {example.description}
                            </p>
                            
                            <div className="space-y-2">
                              {example.keyPoints.map((point, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Target className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                  <p className="text-xs md:text-sm leading-relaxed">{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </CandlestickCard>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChartExamples;
