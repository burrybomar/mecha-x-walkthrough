import { motion } from "framer-motion";

interface CandlestickPatternProps {
  variant?: "hero" | "inline" | "background";
  className?: string;
}

export const CandlestickPattern = ({ variant = "inline", className = "" }: CandlestickPatternProps) => {
  const candles = [
    { type: "bearish", high: 85, open: 75, close: 45, low: 40 },
    { type: "bullish", high: 60, open: 50, close: 70, low: 45 },
    { type: "bearish", high: 75, open: 70, close: 50, low: 45 },
    { type: "bullish", high: 65, open: 55, close: 80, low: 50 },
    { type: "bullish", high: 90, open: 82, close: 88, low: 78 },
  ];

  const sizeClasses = {
    hero: "h-48 w-full",
    inline: "h-32 w-48",
    background: "h-full w-full opacity-10"
  };

  return (
    <div className={`${sizeClasses[variant]} ${className}`}>
      <svg viewBox="0 0 500 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
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
        
        {candles.map((candle, i) => {
          const x = 50 + i * 90;
          const wickColor = "hsl(var(--candle-wick))";
          const isBullish = candle.type === "bullish";
          const fillColor = isBullish ? "url(#bullishGradient)" : "url(#bearishGradient)";
          
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Wick */}
              <motion.line
                x1={x}
                y1={candle.low}
                x2={x}
                y2={candle.high}
                stroke={wickColor}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                style={{ transformOrigin: `${x}px ${(candle.high + candle.low) / 2}px` }}
              />
              
              {/* Body */}
              <motion.rect
                x={x - 15}
                y={Math.min(candle.open, candle.close)}
                width="30"
                height={Math.abs(candle.close - candle.open)}
                fill={fillColor}
                rx="2"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{ transformOrigin: `${x}px ${(candle.open + candle.close) / 2}px` }}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
