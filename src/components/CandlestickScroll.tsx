import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CandlestickScrollProps {
  stepNumber: number;
  isBullish: boolean;
}

export const CandlestickScroll = ({ stepNumber, isBullish }: CandlestickScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const wickHeight = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 100]);
  const bodyHeight = useTransform(scrollYProgress, [0.2, 0.6, 1], [0, 70, 70]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-48"
      style={{ opacity }}
    >
      <svg viewBox="0 0 60 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`gradient-${stepNumber}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isBullish ? "hsl(var(--bullish))" : "hsl(var(--bearish))"} stopOpacity="1" />
            <stop offset="100%" stopColor={isBullish ? "hsl(var(--bullish))" : "hsl(var(--bearish))"} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        
        {/* Wick */}
        <motion.line
          x1="30"
          y1="20"
          x2="30"
          y2="180"
          stroke="hsl(var(--candle-wick))"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: useTransform(wickHeight, [0, 100], [0, 1]) }}
        />
        
        {/* Body */}
        <motion.rect
          x="15"
          y={isBullish ? "100" : "30"}
          width="30"
          rx="3"
          fill={`url(#gradient-${stepNumber})`}
          style={{ height: bodyHeight }}
        />
        
        {/* OHLC Labels */}
        <motion.text
          x="50"
          y="25"
          fill="hsl(var(--muted-foreground))"
          fontSize="10"
          fontFamily="monospace"
          style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
        >
          H
        </motion.text>
        <motion.text
          x="50"
          y="110"
          fill="hsl(var(--muted-foreground))"
          fontSize="10"
          fontFamily="monospace"
          style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
        >
          {isBullish ? "C" : "O"}
        </motion.text>
        <motion.text
          x="50"
          y="185"
          fill="hsl(var(--muted-foreground))"
          fontSize="10"
          fontFamily="monospace"
          style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
        >
          L
        </motion.text>
      </svg>
    </motion.div>
  );
};
