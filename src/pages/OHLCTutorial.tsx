import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, ChevronLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useScrollPlayPause } from "@/hooks/use-scroll-play-pause";
import { CandlestickButton } from "@/components/CandlestickButton";

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  label?: string;
}

const OHLCTutorial = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);

  const lessons = [
    {
      title: "OHLC Basics - Large Body",
      description: "Understanding Open, High, Low, Close",
      candles: [
        { open: 45, high: 77, low: 42, close: 75, label: "Bullish" }
      ],
      explanation: "A candlestick shows four key prices: Open (where price started), High (highest price reached), Low (lowest price reached), and Close (where price ended). A bullish candle (green) closes above its open. This candle has a large body (45-75) with small wicks, showing strong buying momentum.",
      highlights: ["Open = 45", "High = 77 (small upper wick)", "Low = 42 (small lower wick)", "Close = 75 (strong close)"]
    },
    {
      title: "Large Body Bearish",
      description: "Price closes well below open",
      candles: [
        { open: 75, high: 78, low: 43, close: 45, label: "Bearish" }
      ],
      explanation: "A bearish candle (red) closes below its open. This candle has a large body (75-45) with small wicks, showing strong selling pressure. The small wicks indicate little fight from buyers.",
      highlights: ["Open = 75", "High = 78 (small upper wick)", "Low = 43 (small lower wick)", "Close = 45 (strong rejection)"]
    },
    {
      title: "Long Wick Rejection",
      description: "Small body with long wicks = rejection",
      candles: [
        { open: 58, high: 92, low: 28, close: 62, label: "Rejection" }
      ],
      explanation: "Long wicks with small body indicate strong rejection. This candle tried to reach 92 (upper wick) but was rejected. It also tested 28 (lower wick) and rejected. The small body (58-62) shows indecision but the wicks show sellers above and buyers below are defending levels.",
      highlights: ["Long upper wick = 92 rejected", "Long lower wick = 28 rejected", "Small body = 58-62 indecision", "Key reversal signal"]
    },
    {
      title: "Liquidity Sweep Pattern",
      description: "Wick through level, close back inside",
      candles: [
        { open: 50, high: 58, low: 47, close: 56, label: "C1" },
        { open: 56, high: 75, low: 54, close: 55, label: "C2 Sweep" },
        { open: 55, high: 57, low: 38, close: 40, label: "C3" }
      ],
      explanation: "C1 forms a high at 58. C2 sweeps above C1's high with a long upper wick to 75 (grabbing BSL), then closes back at 55 (inside C1's range). C3 confirms the reversal by expanding down to 38. This is the core bearish price action setup.",
      highlights: ["C1 high = 58 (liquidity level)", "C2 sweeps to 75, closes 55", "C3 drops to 38 (confirmation)", "Wick + rejection = valid sweep"]
    },
    {
      title: "Bullish Reversal Sweep",
      description: "Sweep low, then reverse up strongly",
      candles: [
        { open: 68, high: 72, low: 62, close: 64, label: "C1" },
        { open: 64, high: 66, low: 45, close: 65, label: "C2 Sweep" },
        { open: 65, high: 85, low: 63, close: 83, label: "C3" }
      ],
      explanation: "C1 forms a low at 62. C2 sweeps below with a long lower wick to 45 (grabbing SSL), then closes back at 65 (inside C1's range). C3 expands upward with a large bullish body to 83, confirming the reversal.",
      highlights: ["C1 low = 62 (liquidity level)", "C2 sweeps to 45, closes 65", "C3 rallies to 83 (large body)", "Sweep of SSL confirmed"]
    },
    {
      title: "Range & Equilibrium",
      description: "Premium vs discount zones from C1 range",
      candles: [
        { open: 40, high: 80, low: 40, close: 78, label: "C1 Range" },
        { open: 78, high: 80, low: 54, close: 58, label: "To EQ" },
        { open: 58, high: 65, low: 40, close: 43, label: "Discount" }
      ],
      explanation: "C1 establishes the range: Low=40, High=80. Equilibrium (EQ) = 60 (midpoint). C2 drops from premium to EQ at 58-60. C3 moves into discount zone (40-60). Below 60 = discount (look for longs). Above 60 = premium (look for shorts). At 60 = avoid trading.",
      highlights: ["Range: 40-80 from C1", "EQ = 60 (50% of range)", "40-60 = Discount zone", "60-80 = Premium zone"]
    }
  ];

  const currentLessonData = lessons[currentLesson];

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <div className="min-h-screen bg-trading-grid">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Interactive OHLC Tutorial</h1>
          <p className="text-xl text-muted-foreground">
            Master candlestick patterns through interactive animations
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Lesson {currentLesson + 1} of {lessons.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentLesson + 1) / lessons.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-bullish to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentLesson + 1) / lessons.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Visualization */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">{currentLessonData.title}</h2>
                    <p className="text-muted-foreground">{currentLessonData.description}</p>
                  </div>
                  
                  <InteractiveCandleChart candles={currentLessonData.candles} />
                </div>

                {/* Explanation */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-primary">Understanding the Pattern</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentLessonData.explanation}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-primary">Key Points</h3>
                    <div className="space-y-2">
                      {currentLessonData.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-background/80"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <p className="text-sm">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevLesson}
            disabled={currentLesson === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {lessons.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentLesson(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentLesson 
                    ? "bg-primary w-8" 
                    : i < currentLesson 
                    ? "bg-bullish" 
                    : "bg-border"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextLesson}
            disabled={currentLesson === lessons.length - 1}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Interactive Candle Chart Component
const InteractiveCandleChart = ({ candles }: { candles: CandleData[] }) => {
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

  const maxValue = Math.max(...candles.map(c => c.high));
  const minValue = Math.min(...candles.map(c => c.low));
  const range = maxValue - minValue;
  const chartHeight = 400;
  const chartWidth = 600;
  const candleWidth = 60;
  const spacing = 100;

  const getY = (value: number) => {
    return chartHeight - ((value - minValue) / range) * (chartHeight - 40) - 20;
  };

  return (
    <div ref={elementRef} className="relative">
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
          {/* Price Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const value = minValue + range * ratio;
            const y = getY(value);
            return (
              <g key={i}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
                <text
                  x={10}
                  y={y - 5}
                  fill="hsl(var(--muted-foreground))"
                  fontSize="12"
                  fontFamily="monospace"
                >
                  {value.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Candles */}
          {candles.map((candle, i) => {
            const x = spacing + i * (candleWidth + spacing);
            const isBullish = candle.close >= candle.open;
            const bodyTop = Math.min(candle.open, candle.close);
            const bodyBottom = Math.max(candle.open, candle.close);
            const bodyHeight = Math.abs(candle.close - candle.open);
            const isHovered = hoveredCandle === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredCandle(i)}
                onMouseLeave={() => setHoveredCandle(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Wick */}
                <motion.line
                  x1={x}
                  y1={getY(candle.low)}
                  x2={x}
                  y2={getY(candle.high)}
                  stroke="hsl(var(--candle-wick))"
                  strokeWidth={isHovered ? "4" : "3"}
                  strokeLinecap="round"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isPlaying ? 1 : 0 }}
                  transition={{ delay: i * 0.3, duration: 0.5 }}
                  style={{ transformOrigin: `${x}px ${getY((candle.high + candle.low) / 2)}px` }}
                />

                {/* Body */}
                <motion.rect
                  x={x - candleWidth / 2}
                  y={getY(bodyTop)}
                  width={candleWidth}
                  height={bodyHeight === 0 ? 2 : Math.abs(getY(bodyBottom) - getY(bodyTop))}
                  fill={isBullish ? "url(#bullishGradient)" : "url(#bearishGradient)"}
                  rx="4"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isPlaying ? 1 : 0 }}
                  transition={{ delay: i * 0.3 + 0.2, duration: 0.5 }}
                  style={{ transformOrigin: `${x}px ${getY((bodyTop + bodyBottom) / 2)}px` }}
                  opacity={isHovered ? 1 : 0.9}
                />

                {/* Label */}
                {candle.label && (
                  <motion.text
                    x={x}
                    y={getY(candle.low) + 25}
                    fill="hsl(var(--foreground))"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isPlaying ? 1 : 0 }}
                    transition={{ delay: i * 0.3 + 0.5 }}
                  >
                    {candle.label}
                  </motion.text>
                )}

                {/* OHLC Values on Hover */}
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <rect
                      x={x + 40}
                      y={getY(candle.high) - 60}
                      width="100"
                      height="80"
                      fill="hsl(var(--popover))"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                      rx="8"
                    />
                    <text x={x + 50} y={getY(candle.high) - 40} fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
                      O: {candle.open}
                    </text>
                    <text x={x + 50} y={getY(candle.high) - 25} fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
                      H: {candle.high}
                    </text>
                    <text x={x + 50} y={getY(candle.high) - 10} fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
                      L: {candle.low}
                    </text>
                    <text x={x + 50} y={getY(candle.high) + 5} fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
                      C: {candle.close}
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}

          {/* Gradients */}
          <defs>
            <linearGradient id="bullishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--bullish))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--bullish))" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="bearishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--bearish))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--bearish))" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Play/Pause Control */}
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Play Animation
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OHLCTutorial;
