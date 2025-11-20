import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Layers, Target, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandlestickButton } from '@/components/CandlestickButton';
import { CandlestickCard } from '@/components/CandlestickCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IndicatorExplainer } from '@/components/IndicatorExplainer';
import { HTFCanvasVisual } from '@/components/HTFCanvasVisual';
import { FractalNestingVisual } from '@/components/FractalNestingVisual';

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
            <h1 className="text-base md:text-xl font-bold text-glow">Fractal Model</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full mb-4 md:mb-6 border border-primary/20">
              <span className="text-primary font-mono font-semibold text-xs md:text-sm">Core Concept</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 px-4 text-foreground">
              The Fractal Principle:<br />
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                4H Canvas + 1H Trigger
              </span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed px-4 mb-4">
              Market truth: A durable directional move requires a swing point.
              The market does not reverse from "nowhere". Mecha-X makes this a hard rule.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm hover:bg-accent/20 transition-colors cursor-pointer">
              <span className="text-accent font-semibold">Deep Dive</span>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => navigate('/knowledge')}
                className="text-accent hover:underline font-medium"
              >
                See Full Framework →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Principle Alert */}
      <section className="py-4 md:py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Alert className="border-bearish/30 bg-bearish/10 glass-panel">
            <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-bearish" />
            <AlertDescription className="text-sm md:text-lg font-medium text-foreground/80">
              <strong className="text-bearish">Non-Negotiable Rule:</strong> No swing, no trade.
              The 4H "small wick" must be validated by an LTF swing before you assume expansion.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* The Two Components */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 px-4 text-glow"
          >
            Two Components, One System
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* 4H Canvas */}
            <div className="glass-card p-6 rounded-xl border border-bullish/20 relative overflow-hidden group hover:border-bullish/40 transition-all">
              <div className="absolute inset-0 bg-bullish/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-bullish/20">
                    <Layers className="w-6 h-6 text-bullish" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">The 4H Canvas</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    The 4H candle is your main unit of intraday work. It provides the structure and context for everything you do.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">You Care About:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-bullish mt-1">•</span>
                        <span>Where it opens relative to key swings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-bullish mt-1">•</span>
                        <span>Whether it's likely to print a small wick (clean expansion)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-bullish mt-1">•</span>
                        <span>Its relationship to HTF narrative and liquidity draws</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-bullish/10 rounded-lg border border-bullish/20 mt-4">
                    <p className="text-sm font-medium text-foreground/90">
                      A clean, small opposing wick plus a strong body fits Mecha-X logic for expansion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LTF Trigger */}
            <div className="glass-card p-6 rounded-xl border border-bearish/20 relative overflow-hidden group hover:border-bearish/40 transition-all">
              <div className="absolute inset-0 bg-bearish/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-bearish/20">
                    <Target className="w-6 h-6 text-bearish" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">The LTF Trigger</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    The Lower Timeframe swing (typically 1H or 15m) is your mechanical confirmation.
                    This is what gives you permission to enter.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Roles of the LTF Swing (C2):</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-bearish mt-1">•</span>
                        <span>Confirms the 4H high/low with a mechanical C2 Sweep</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-bearish mt-1">•</span>
                        <span>Defines the inherited structure in a Continuation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-bearish mt-1">•</span>
                        <span>Caps the retrace and realigns flow in Aligned sequence</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-bearish/10 rounded-lg border border-bearish/20 mt-4">
                    <p className="text-sm font-medium text-foreground/90">
                      Only after this swing prints do you have permission to attack the move.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Explainers */}
      <section className="py-8 md:py-16 px-4">
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
      </section>

      {/* Why This Works */}
      <section className="py-16 px-4">
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
      </section>

      {/* The Hard Rule */}
      <section className="py-16 px-4">
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
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4">
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
      </section>
    </div>
  );
};

export default FractalModel;
