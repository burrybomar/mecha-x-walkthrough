import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Layers, Target, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandlestickButton } from '@/components/CandlestickButton';
import { CandlestickCard } from '@/components/CandlestickCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FractalModel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <CandlestickButton
            variant="bullish"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </CandlestickButton>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold">Fractal Model</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-mono font-semibold">Core Concept</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Fractal Principle:<br />
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                4H Canvas + 1H Trigger
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Market truth: A durable directional move requires a swing point. 
              The market does not reverse from "nowhere". Mecha-X makes this a hard rule.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Principle Alert */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Alert className="border-bearish/30 bg-bearish/5">
            <AlertCircle className="h-5 w-5 text-bearish" />
            <AlertDescription className="text-lg font-medium">
              <strong className="text-bearish">Non-Negotiable Rule:</strong> No swing, no trade. 
              The 4H "small wick" must be validated by an LTF swing before you assume expansion.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* The Two Components */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Two Components, One System
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 4H Canvas */}
            <CandlestickCard variant="bullish" wickHeight="md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-bullish/20">
                    <Layers className="w-6 h-6 text-bullish" />
                  </div>
                  The 4H Canvas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div className="p-4 bg-bullish/10 rounded-lg border border-bullish/20">
                  <p className="text-sm font-medium text-foreground">
                    A clean, small opposing wick plus a strong body fits Mecha-X logic for expansion.
                  </p>
                </div>
              </CardContent>
            </CandlestickCard>

            {/* LTF Trigger */}
            <CandlestickCard variant="bearish" wickHeight="md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-lg bg-bearish/20">
                    <Target className="w-6 h-6 text-bearish" />
                  </div>
                  The LTF Trigger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The Lower Timeframe swing (typically 1H or 15m) is your mechanical confirmation. 
                  This is what gives you permission to enter.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Roles of the LTF Swing:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-bearish mt-1">•</span>
                      <span>Confirms the 4H high/low in a Reversal</span>
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

                <div className="p-4 bg-bearish/10 rounded-lg border border-bearish/20">
                  <p className="text-sm font-medium text-foreground">
                    Only after this swing prints do you have permission to attack the move.
                  </p>
                </div>
              </CardContent>
            </CandlestickCard>
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why The Fractal Model Works
            </h2>

            <div className="space-y-6">
              <Card className="border-primary/30 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    1. Structural Clarity
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The 4H gives you the "big picture" direction, while the LTF shows you exactly where 
                    the market is creating the mechanical turn. No guessing, no "vibes" - just structure.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    2. Risk Management Built-In
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The LTF swing automatically gives you your invalidation point. If the swing breaks, 
                    your thesis is wrong. This creates natural, logical stop placement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
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
          <Card className="border-2 border-bearish/30 bg-gradient-to-br from-bearish/5 to-background">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <div className="inline-block p-4 bg-bearish/20 rounded-full">
                  <AlertCircle className="w-12 h-12 text-bearish" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Apply This?</h2>
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
