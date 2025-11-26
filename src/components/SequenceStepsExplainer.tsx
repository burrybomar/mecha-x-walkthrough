import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';

interface SequenceStep {
  candle: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
  icon: 'bullish' | 'bearish' | 'neutral';
}

interface SequenceStepsExplainerProps {
  variant: 'bullish' | 'bearish';
  patternImage?: string; // User's candlestick pattern image
  visualComponent?: React.ReactNode; // Alternative to image
  className?: string;
}

export const SequenceStepsExplainer = ({
  variant,
  patternImage,
  visualComponent,
  className = '',
}: SequenceStepsExplainerProps) => {
  const bullishSteps: SequenceStep[] = [
    {
      candle: 'C1',
      title: 'Pre-Swing Candle (IRL)',
      description: 'Establishes the Internal Range Liquidity (IRL). This is the "Bait" that needs to be swept.',
      color: 'hsl(var(--muted))',
      textColor: 'hsl(var(--muted-foreground))',
      icon: 'neutral',
    },
    {
      candle: 'C2',
      title: 'Sweep Candle (Trigger)',
      description: 'Sweeps the IRL (C1 Low). This is the engagement of liquidity. Must close back INSIDE to confirm the reversal.',
      color: 'hsl(var(--bearish))',
      textColor: 'hsl(var(--bearish-foreground))',
      icon: 'bearish',
    },
    {
      candle: 'C3',
      title: 'Expansion Candle (Confirmation)',
      description: 'Momentum candle expanding towards External Range Liquidity (ERL). Confirms the C2 sweep was valid.',
      color: 'hsl(var(--bullish))',
      textColor: 'hsl(var(--bullish-foreground))',
      icon: 'bullish',
    },
    {
      candle: 'C4',
      title: 'Continuation (Delivery)',
      description: 'Price delivers to the ERL target (4H/Daily BSL). Trade runs to CISD projections.',
      color: 'hsl(var(--bullish))',
      textColor: 'hsl(var(--bullish-foreground))',
      icon: 'bullish',
    },
  ];

  const bearishSteps: SequenceStep[] = [
    {
      candle: 'C1',
      title: 'Pre-Swing Candle',
      description: 'Establishes the liquidity level (swing high). This creates the target for the sweep.',
      color: 'hsl(var(--muted))',
      textColor: 'hsl(var(--muted-foreground))',
      icon: 'neutral',
    },
    {
      candle: 'C2',
      title: 'Sweep Candle',
      description: 'Breaks above C1 high with its wick (liquidity sweep), then closes back INSIDE C1 range. This is the reversal signal.',
      color: 'hsl(var(--bullish))',
      textColor: 'hsl(var(--bullish-foreground))',
      icon: 'bullish',
    },
    {
      candle: 'C3',
      title: 'Expansion Candle',
      description: 'Momentum candle moving in the NEW direction (bearish). Confirms the reversal is legitimate.',
      color: 'hsl(var(--bearish))',
      textColor: 'hsl(var(--bearish-foreground))',
      icon: 'bearish',
    },
    {
      candle: 'C4',
      title: 'Continuation',
      description: 'Further expansion continuing the bearish move. Trade runs to CISD projections (2x, 2.5x, 4x).',
      color: 'hsl(var(--bearish))',
      textColor: 'hsl(var(--bearish-foreground))',
      icon: 'bearish',
    },
  ];

  const steps = variant === 'bullish' ? bullishSteps : bearishSteps;

  return (
    <div className={`relative ${className}`}>
      {/* Visual Pattern Display */}
      {(visualComponent || patternImage) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl max-w-4xl mx-auto bg-black/40 backdrop-blur-sm"
        >
          <div className="relative p-8">
            {/* Ensure text is visible over the image */}
            <div className="absolute top-4 left-4 z-20">
              <Badge
                className={`text-lg px-4 py-2 font-bold ${variant === 'bullish'
                  ? 'bg-bullish/90 text-bullish-foreground'
                  : 'bg-bearish/90 text-bearish-foreground'
                  }`}
              >
                {variant === 'bullish' ? (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" /> Bullish Sequence
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-5 h-5 mr-2" /> Bearish Sequence
                  </>
                )}
              </Badge>
            </div>

            {/* Pattern Display */}
            <div className="relative flex justify-center items-center min-h-[300px]">
              {visualComponent ? (
                <div className="w-full h-full">
                  {visualComponent}
                </div>
              ) : (
                <>
                  <img
                    src={patternImage}
                    alt={`${variant} C1-C2-C3-C4 Pattern`}
                    className="w-full h-auto rounded-lg"
                  />
                  {/* Subtle gradient overlay to improve label visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Step-by-Step Breakdown */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.candle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    className="text-2xl font-bold px-4 py-2"
                    style={{
                      backgroundColor: step.color,
                      color: step.textColor,
                    }}
                  >
                    {step.candle}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold leading-tight">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Key Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          Golden Rules for C1→C2→C3→C4
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span className="leading-relaxed">
              <strong className="text-foreground">NO SWEEP = NO TRADE:</strong> C2 MUST sweep IRL (C1).
              No engagement of liquidity = No reason to reverse.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span className="leading-relaxed">
              <strong className="text-foreground">CLOSE INSIDE:</strong> C2 must close back inside
              C1's range. A close beyond C1 = failed reversal (Expansion).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span className="leading-relaxed">
              <strong className="text-foreground">POI FILTER:</strong> High probability setups occur at
              Key Levels (NWOG, FVG, MWDR).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span className="leading-relaxed">
              <strong className="text-foreground">HTF ALIGNMENT:</strong> Ensure the 1H Sweep (IRL) aligns
              with the 4H/Daily Draw (ERL).
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
