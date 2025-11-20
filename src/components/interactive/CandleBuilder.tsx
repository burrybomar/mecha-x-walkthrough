import React from 'react';
import { motion } from 'framer-motion';

interface CandleBuilderProps {
    open: number;
    high: number;
    low: number;
    close: number;
    showWicks?: boolean;
    showBody?: boolean;
    className?: string;
}

export const CandleBuilder: React.FC<CandleBuilderProps> = ({
    open,
    high,
    low,
    close,
    showWicks = true,
    showBody = true,
    className = ''
}) => {
    // Dimensions
    const width = 300;
    const height = 400;
    const padding = 40;
    const plotHeight = height - padding * 2;

    // Scale values (assuming 0-100 input range)
    const scaleY = (value: number) => {
        return height - padding - (value / 100) * plotHeight;
    };

    const isBullish = close >= open;
    const color = isBullish ? 'var(--bullish)' : 'var(--bearish)';
    const gradientId = isBullish ? 'bullishGradientBuilder' : 'bearishGradientBuilder';

    // Coordinates
    const yOpen = scaleY(open);
    const yClose = scaleY(close);
    const yHigh = scaleY(high);
    const yLow = scaleY(low);

    const bodyTop = Math.min(yOpen, yClose);
    const bodyHeight = Math.abs(yClose - yOpen);
    const effectiveBodyHeight = Math.max(bodyHeight, 2); // Min height for visibility

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg width={width} height={height} className="overflow-visible">
                <defs>
                    <linearGradient id="bullishGradientBuilder" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--bullish))" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="hsl(var(--bullish))" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="bearishGradientBuilder" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--bearish))" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="hsl(var(--bearish))" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Grid Lines (Optional, subtle) */}
                <line x1="0" y1={padding} x2={width} y2={padding} stroke="hsl(var(--border))" strokeDasharray="4 4" opacity="0.2" />
                <line x1="0" y1={height - padding} x2={width} y2={height - padding} stroke="hsl(var(--border))" strokeDasharray="4 4" opacity="0.2" />

                {/* Wicks */}
                {showWicks && (
                    <motion.line
                        x1={width / 2}
                        y1={yHigh}
                        x2={width / 2}
                        y2={yLow}
                        stroke={`hsl(${color})`}
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={false}
                        animate={{ y1: yHigh, y2: yLow, stroke: `hsl(${color})` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* Body */}
                {showBody && (
                    <motion.rect
                        x={width / 2 - 40}
                        y={bodyTop}
                        width={80}
                        height={effectiveBodyHeight}
                        rx={4}
                        fill={`url(#${gradientId})`}
                        stroke={`hsl(${color})`}
                        strokeWidth="2"
                        filter="url(#glow)"
                        initial={false}
                        animate={{
                            y: bodyTop,
                            height: effectiveBodyHeight,
                            fill: `url(#${gradientId})`,
                            stroke: `hsl(${color})`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* Dynamic Labels */}
                <AnimatePresence>
                    {/* High Label */}
                    <motion.g
                        initial={false}
                        animate={{ y: yHigh }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <text x={width / 2 + 60} y={5} fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">High: {high}</text>
                        <line x1={width / 2 + 10} y1={0} x2={width / 2 + 50} y2={0} stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" />
                    </motion.g>

                    {/* Low Label */}
                    <motion.g
                        initial={false}
                        animate={{ y: yLow }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <text x={width / 2 + 60} y={5} fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace">Low: {low}</text>
                        <line x1={width / 2 + 10} y1={0} x2={width / 2 + 50} y2={0} stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" />
                    </motion.g>

                    {/* Open Label */}
                    <motion.g
                        initial={false}
                        animate={{ y: yOpen }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <text x={width / 2 - 100} y={5} fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace" textAnchor="end">Open: {open}</text>
                        <line x1={width / 2 - 50} y1={0} x2={width / 2 - 10} y2={0} stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
                    </motion.g>

                    {/* Close Label */}
                    <motion.g
                        initial={false}
                        animate={{ y: yClose }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <text x={width / 2 - 100} y={5} fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="end">Close: {close}</text>
                        <line x1={width / 2 - 50} y1={0} x2={width / 2 - 10} y2={0} stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
                    </motion.g>
                </AnimatePresence>

            </svg>
        </div>
    );
};
