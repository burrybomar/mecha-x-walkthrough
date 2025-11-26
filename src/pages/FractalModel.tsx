import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Target, Clock, ArrowRight, GitMerge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandlestickButton } from '@/components/CandlestickButton';
import { HTFCanvasVisual } from '@/components/visuals/HTFCanvasVisual';
import { FractalNestingVisual } from '@/components/visuals/FractalNestingVisual';

const FractalModel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <CandlestickButton
            variant="bullish"
            onClick={() => navigate('/')}
            className="gap-2 text-sm md:text-base"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            Back to Home
          </CandlestickButton>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <h1 className="text-base md:text-xl font-bold text-glow">The Mechanical Model</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full mb-4 md:mb-6 border border-primary/20">
              <span className="text-primary font-mono font-semibold text-xs md:text-sm">The Logic</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 px-4 text-foreground">
              IRL <span className="text-muted-foreground mx-2">→</span> ERL
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed px-4 mb-8 max-w-3xl mx-auto">
              The market is a delivery engine. It moves from <strong className="text-foreground">Internal Range Liquidity (IRL)</strong> to <strong className="text-foreground">External Range Liquidity (ERL)</strong>.
              <br /><br />
              Mecha-X automates this by mapping the <span className="text-primary">1H Sweeps (The Bait)</span> that target the <span className="text-accent">4H/Daily Draws (The Target)</span>.
            </p>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-bearish/10 rounded-lg border border-bearish/20 mt-4">
                    <p className="text-sm font-medium text-foreground/90">
                      Only after this swing prints do you have permission to attack the move.
                    </p>
                  </div>
                </div >
              </div >
            </div >
          </div >
        </div >
      </section >

  {/* Visual Explainers */ }
  < section className = "py-8 md:py-16 px-4" >
    <div className="container mx-auto max-w-6xl space-y-8">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 px-4 text-glow"
      >
        Visual Breakdown
      </motion.h2>

      {/* HTF Canvas + LTF Trigger Visual */}
      <IndicatorExplainer
        title="HTF Canvas + LTF Trigger"
        what="The 4H candle provides your directional context while 1H swings give you mechanical confirmation"
        why="Trading without a higher timeframe canvas is like navigating without a map. The HTF shows where you're going, the LTF shows exactly when to go."
        howToRead={[
          {
            element: "4H CANVAS",
            meaning: "Your main unit of intraday work - provides structure and direction",
            action: "Analyze where it opens relative to key swings and HTF liquidity draws",
          },
          {
            element: "LTF HIGHS (H)",
            meaning: "Swing highs on 1H timeframe that confirm 4H high",
            action: "Permission to enter SHORT after sweep",
          },
          {
            element: "LTF LOWS (L)",
            meaning: "Swing lows on 1H timeframe that confirm 4H low",
            action: "Permission to enter LONG after sweep",
          },
          {
            element: "NESTED STRUCTURE",
            meaning: "LTF swings occur WITHIN the HTF candle formation",
            action: "Wait for both to align before assuming expansion",
          },
        ]}
        visualExample={<HTFCanvasVisual />}
      />

      {/* Fractal Nesting Visual */}
      <IndicatorExplainer
        title="Fractal Market Structure"
        what="Markets move in nested, self-similar patterns across all timeframes"
        why="What happens on 1H mirrors 4H, which mirrors Daily. By requiring alignment across timeframes, you trade WITH market structure, not against it."
        howToRead={[
          {
            element: "DAILY CANVAS",
            meaning: "Highest timeframe - sets overall market direction",
            action: "Know the daily trend before trading intraday",
          },
          {
            element: "4H CANVAS",
            meaning: "Main intraday canvas - your structural reference",
            action: "Identify key 4H swings and directional bias",
          },
          {
            element: "1H TRIGGER",
            meaning: "Lower timeframe confirmation - your entry mechanism",
            action: "Wait for 1H swing to confirm 4H structure",
          },
          {
            element: "FRACTAL ALIGNMENT",
            meaning: "All timeframes showing the same directional structure",
            action: "Only trade when HTF direction + LTF trigger align",
          },
        ]}
        visualExample={<FractalNestingVisual />}
      />
    </div>
      </section >

  {/* Why This Works */ }
  < section className = "py-16 px-4" >
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow">
          Why The Fractal Model Works
        </h2>

        <div className="space-y-6">
          <Card className="glass-panel border-primary/30 hover:bg-white/5 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                1. Structural Clarity
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The 4H gives you the "big picture" direction, while the LTF shows you exactly where
                the market is creating the mechanical turn. No guessing, no "vibes" - just structure.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-primary/30 hover:bg-white/5 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                2. Risk Management Built-In
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The LTF swing automatically gives you your invalidation point. If the swing breaks,
                your thesis is wrong. This creates natural, logical stop placement.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-primary/30 hover:bg-white/5 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                <Layers className="w-5 h-5" />
                3. Fractal Nature of Markets
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Markets move in nested patterns. What happens on the 1H scale mirrors what happens on the 4H.
                By requiring both to align, you're trading WITH market structure, not against it.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
      </section >

  {/* The Hard Rule */ }
  < section className = "py-16 px-4" >
    <div className="container mx-auto max-w-4xl">
      <Card className="glass-card border-2 border-bearish/30 bg-gradient-to-br from-bearish/10 to-transparent">
        <CardContent className="p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="inline-block p-4 bg-bearish/20 rounded-full">
              <AlertCircle className="w-12 h-12 text-bearish" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The Job Is Not To Guess
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your job as a trader is not to guess tops or bottoms. It's to <strong className="text-foreground">recognize when
                the market has printed the structural turn it needs to move</strong>.
            </p>
            <p className="text-lg font-medium text-bearish">
              The market cannot reverse from nowhere. So why wouldn't you require a swing point?
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
      </section >

  {/* Next Steps */ }
  < section className = "py-16 px-4" >
    <div className="container mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Ready to Apply This?</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Now that you understand the fractal model, learn how it plays out in the three core sequences.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CandlestickButton
          variant="bullish"
          onClick={() => navigate('/sequences')}
          className="gap-2"
        >
          Learn the 3 Sequences
          <TrendingUp className="w-4 h-4" />
        </CandlestickButton>
        <CandlestickButton
          variant="bearish"
          onClick={() => navigate('/case-studies')}
        >
          View Case Studies
        </CandlestickButton>
      </div>
    </div>
      </section >
    </div >
  );
};

export default FractalModel;
