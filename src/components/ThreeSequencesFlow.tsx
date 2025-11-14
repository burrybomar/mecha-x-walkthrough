import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, ArrowUpRight, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const sequences = [
  {
    id: 'continuation',
    icon: TrendingUp,
    title: 'Continuation',
    subtitle: 'Inherited Turn',
    color: 'bullish',
    description: 'Prior 4H built the swing. Current 4H opens inside and pushes away from it.',
    points: [
      'HTF narrative already clear',
      'Prior 4H printed clean LTF swing',
      'Immediate entry at 4H open',
      'Use inherited swing as stop',
    ],
    when: 'Use when the prior 4H did the reversal work during a driver/key window.',
  },
  {
    id: 'reversal',
    icon: RefreshCw,
    title: 'Reversal',
    subtitle: 'Fresh Turn',
    color: 'bearish',
    description: 'Current 4H creates its own swing. Wait for LTF to engineer the turning point.',
    points: [
      'Prior 4H was noisy/no swing',
      'Current 4H forms the low/high',
      'Wait for LTF confirmation',
      'Trade expansion from new swing',
    ],
    when: 'Use when today\'s 4H is expected to form the low/high of the day itself.',
  },
  {
    id: 'aligned',
    icon: ArrowUpRight,
    title: 'Aligned',
    subtitle: 'Re-Entry',
    color: 'primary',
    description: '4H already expanded, then retraced. New LTF swing realigns with original direction.',
    points: [
      '4H proved direction first',
      'Retrace completed',
      'New swing points back',
      'Lower risk re-entry',
    ],
    when: 'Use when you missed the first leg or want to rejoin after retrace.',
  },
];

export const ThreeSequencesFlow = () => {
  const navigate = useNavigate();
  const [activeSequence, setActiveSequence] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveSequence((prev) => (prev + 1) % sequences.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const sequence = sequences[activeSequence];
  const Icon = sequence.icon;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Sequence Selector */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {sequences.map((seq, idx) => {
          const SeqIcon = seq.icon;
          const isActive = activeSequence === idx;
          
          return (
            <button
              key={seq.id}
              onClick={() => {
                setActiveSequence(idx);
                setIsAutoPlaying(false);
              }}
              className={`relative flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all ${
                isActive
                  ? seq.color === 'bullish'
                    ? 'border-bullish bg-bullish/10 shadow-lg'
                    : seq.color === 'bearish'
                    ? 'border-bearish bg-bearish/10 shadow-lg'
                    : 'border-primary bg-primary/10 shadow-lg'
                  : 'border-border bg-card hover:bg-muted/50'
              }`}
            >
              <div className={`p-3 rounded-lg ${
                isActive
                  ? seq.color === 'bullish'
                    ? 'bg-bullish/20'
                    : seq.color === 'bearish'
                    ? 'bg-bearish/20'
                    : 'bg-primary/20'
                  : 'bg-muted'
              }`}>
                <SeqIcon className={`w-8 h-8 ${
                  isActive
                    ? seq.color === 'bullish'
                      ? 'text-bullish'
                      : seq.color === 'bearish'
                      ? 'text-bearish'
                      : 'text-primary'
                    : 'text-muted-foreground'
                }`} />
              </div>
              <div className="text-center">
                <div className={`font-bold text-lg ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {seq.title}
                </div>
                <div className="text-sm text-muted-foreground">{seq.subtitle}</div>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full ${
                    seq.color === 'bullish'
                      ? 'bg-bullish'
                      : seq.color === 'bearish'
                      ? 'bg-bearish'
                      : 'bg-primary'
                  }`}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Sequence Display */}
      <motion.div
        key={activeSequence}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Card className={`border-2 ${
          sequence.color === 'bullish'
            ? 'border-bullish/30 bg-bullish/5'
            : sequence.color === 'bearish'
            ? 'border-bearish/30 bg-bearish/5'
            : 'border-primary/30 bg-primary/5'
        }`}>
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Description */}
              <div className="space-y-6">
                <div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                    sequence.color === 'bullish'
                      ? 'bg-bullish/20 text-bullish'
                      : sequence.color === 'bearish'
                      ? 'bg-bearish/20 text-bearish'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-mono font-semibold">{sequence.subtitle}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {sequence.title} Sequence
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {sequence.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Key Characteristics:</h4>
                  <ul className="space-y-2">
                    {sequence.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`mt-1 ${
                          sequence.color === 'bullish'
                            ? 'text-bullish'
                            : sequence.color === 'bearish'
                            ? 'text-bearish'
                            : 'text-primary'
                        }`}>
                          •
                        </span>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  sequence.color === 'bullish'
                    ? 'border-bullish/30 bg-bullish/10'
                    : sequence.color === 'bearish'
                    ? 'border-bearish/30 bg-bearish/10'
                    : 'border-primary/30 bg-primary/10'
                }`}>
                  <p className="text-sm font-medium">
                    <strong className="text-foreground">When to use:</strong><br />
                    {sequence.when}
                  </p>
                </div>
              </div>

              {/* Right: Visual/Actions */}
              <div className="flex flex-col justify-between space-y-6">
                <div className={`flex items-center justify-center p-12 rounded-xl border-2 ${
                  sequence.color === 'bullish'
                    ? 'border-bullish/30 bg-bullish/5'
                    : sequence.color === 'bearish'
                    ? 'border-bearish/30 bg-bearish/5'
                    : 'border-primary/30 bg-primary/5'
                }`}>
                  <Icon className={`w-32 h-32 ${
                    sequence.color === 'bullish'
                      ? 'text-bullish'
                      : sequence.color === 'bearish'
                      ? 'text-bearish'
                      : 'text-primary'
                  } opacity-20`} />
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/sequences')}
                    className="w-full"
                    size="lg"
                  >
                    Learn More About This Sequence
                  </Button>
                  <Button
                    onClick={() => navigate('/case-studies')}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    View Case Studies
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="gap-2"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Auto-Play
            </>
          )}
        </Button>
        <div className="flex gap-2">
          {sequences.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSequence(idx);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === activeSequence ? 'w-8 bg-primary' : 'w-2 bg-muted'
              }`}
              aria-label={`Go to sequence ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
