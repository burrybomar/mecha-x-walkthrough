import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCcw, Play, Pause, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CandleBuilder } from "@/components/interactive/CandleBuilder";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CandleState {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  preset: CandleState;
  explanation: string;
  check: (state: CandleState) => boolean;
}

const OHLCTutorial = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  // Default State
  const [candle, setCandle] = useState<CandleState>({
    open: 50,
    high: 80,
    low: 20,
    close: 60
  });

  const lessons: Lesson[] = [
    {
      id: "bullish-expansion",
      title: "Bullish Expansion",
      description: "Create a strong bullish candle",
      preset: { open: 40, high: 85, low: 35, close: 80 },
      explanation: "A strong bullish candle opens low and closes near its high, showing buyers were in control for the entire session.",
      check: (s) => s.close > s.open && (s.close - s.open) > 30
    },
    {
      id: "bearish-rejection",
      title: "Bearish Rejection",
      description: "Create a shooting star / rejection",
      preset: { open: 40, high: 90, low: 35, close: 45 },
      explanation: "Price tried to push high (long upper wick) but was rejected aggressively, closing near the open. This signals sellers are defending higher prices.",
      check: (s) => (s.high - Math.max(s.open, s.close)) > 30 && Math.abs(s.open - s.close) < 15
    },
    {
      id: "doji",
      title: "Indecision (Doji)",
      description: "Create a doji candle",
      preset: { open: 50, high: 70, low: 30, close: 50 },
      explanation: "Open and Close are almost identical. Buyers and sellers fought (high/low wicks) but neither side won. The market is undecided.",
      check: (s) => Math.abs(s.open - s.close) < 2
    },
    {
      id: "hammer",
      title: "Bullish Hammer",
      description: "Create a hammer candle",
      preset: { open: 60, high: 65, low: 20, close: 62 },
      explanation: "Sellers pushed price down hard (long lower wick), but buyers stepped in and pushed it all the way back up. A strong reversal signal.",
      check: (s) => (Math.min(s.open, s.close) - s.low) > 30 && (s.high - Math.max(s.open, s.close)) < 10
    }
  ];

  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  // Update state when lesson changes
  useEffect(() => {
    setCandle(activeLesson.preset);
    setIsPlaying(true);
    const timer = setTimeout(() => setIsPlaying(false), 1000);
    return () => clearTimeout(timer);
  }, [activeLessonId]);

  // Handlers for sliders
  const updateCandle = (key: keyof CandleState, value: number[]) => {
    const val = value[0];
    setCandle(prev => {
      const newState = { ...prev, [key]: val };

      // Enforce Logic: High >= Low, High >= Open/Close, Low <= Open/Close
      if (key === 'high') {
        if (val < newState.low) newState.low = val;
        if (val < newState.open) newState.open = val;
        if (val < newState.close) newState.close = val;
      }
      if (key === 'low') {
        if (val > newState.high) newState.high = val;
        if (val > newState.open) newState.open = val;
        if (val > newState.close) newState.close = val;
      }
      if (key === 'open' || key === 'close') {
        if (val > newState.high) newState.high = val;
        if (val < newState.low) newState.low = val;
      }

      return newState;
    });
  };

  // Derived metrics
  const bodySize = Math.abs(candle.close - candle.open);
  const totalRange = candle.high - candle.low;
  const isBullish = candle.close >= candle.open;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Candlestick Lab</h1>
            <p className="text-muted-foreground text-sm">Interactive OHLC Playground</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCandle(activeLesson.preset)}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset Lesson
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">

        {/* LEFT PANEL: Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Lesson Selector */}
          <Card className="p-4 glass-panel border-primary/20">
            <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Select Scenario</h3>
            <div className="grid grid-cols-2 gap-2">
              {lessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`text-left p-3 rounded-lg text-sm transition-all border ${activeLessonId === lesson.id
                      ? 'bg-primary/20 border-primary text-primary font-medium'
                      : 'bg-card/50 border-transparent hover:bg-card hover:border-white/10'
                    }`}
                >
                  {lesson.title}
                </button>
              ))}
            </div>
          </Card>

          {/* Sliders */}
          <Card className="p-6 glass-panel">
            <div className="space-y-8">
              {/* High */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">HIGH</span>
                  <span className="font-mono font-bold">{candle.high}</span>
                </div>
                <Slider
                  value={[candle.high]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(v) => updateCandle('high', v)}
                  className="cursor-pointer"
                />
              </div>

              {/* Open */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">OPEN</span>
                  <span className="font-mono font-bold">{candle.open}</span>
                </div>
                <Slider
                  value={[candle.open]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(v) => updateCandle('open', v)}
                />
              </div>

              {/* Close */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">CLOSE</span>
                  <span className="font-mono font-bold">{candle.close}</span>
                </div>
                <Slider
                  value={[candle.close]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(v) => updateCandle('close', v)}
                />
              </div>

              {/* Low */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">LOW</span>
                  <span className="font-mono font-bold">{candle.low}</span>
                </div>
                <Slider
                  value={[candle.low]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(v) => updateCandle('low', v)}
                />
              </div>
            </div>
          </Card>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-card/30 border-white/5">
              <div className="text-xs text-muted-foreground mb-1">BODY SIZE</div>
              <div className="text-xl font-mono font-bold">{bodySize}</div>
            </Card>
            <Card className="p-4 bg-card/30 border-white/5">
              <div className="text-xs text-muted-foreground mb-1">TOTAL RANGE</div>
              <div className="text-xl font-mono font-bold">{totalRange}</div>
            </Card>
          </div>
        </div>

        {/* RIGHT PANEL: Visualization */}
        <div className="lg:col-span-8">
          <Card className="h-full min-h-[500px] glass-card border-primary/10 relative overflow-hidden flex flex-col">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Header Info */}
            <div className="relative z-10 p-6 flex justify-between items-start border-b border-white/5 bg-black/20 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">{activeLesson.title}</h2>
                <p className="text-muted-foreground max-w-md">{activeLesson.explanation}</p>
              </div>
              <div className={`px-4 py-2 rounded-full border ${isBullish ? 'bg-bullish/10 border-bullish/30 text-bullish' : 'bg-bearish/10 border-bearish/30 text-bearish'}`}>
                <span className="font-bold uppercase tracking-wider text-sm">
                  {isBullish ? 'BULLISH' : 'BEARISH'}
                </span>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-grow flex items-center justify-center relative z-10 p-8">
              <CandleBuilder
                open={candle.open}
                high={candle.high}
                low={candle.low}
                close={candle.close}
                className="transform scale-110"
              />
            </div>

            {/* Footer Hint */}
            <div className="relative z-10 p-4 bg-primary/5 border-t border-primary/10 flex items-center gap-3">
              <Info className="w-5 h-5 text-primary" />
              <p className="text-sm text-primary/80">
                Drag the sliders on the left to manipulate the candle structure and see how it changes.
              </p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default OHLCTutorial;
