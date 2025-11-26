import React from 'react';
import { motion } from 'framer-motion';

interface MechaSequenceVisualProps {
    variant: 'continuation' | 'reversal' | 'reversal-bearish' | 'aligned';
    className?: string;
}

export const MechaSequenceVisual: React.FC<MechaSequenceVisualProps> = ({ variant, className }) => {
    // Helper to render a candlestick
    const Candle = ({ x, open, close, high, low, label, color, opacity = 1, isGhost = false }: any) => {
        const isBullish = close < open; // SVG coords: smaller y is higher
        const bodyColor = color || (isBullish ? 'hsl(var(--bullish))' : 'hsl(var(--bearish))');
        const strokeColor = color || (isBullish ? 'hsl(var(--bullish))' : 'hsl(var(--bearish))');

        return (
            <g className="transition-all duration-500" style={{ opacity }}>
                {/* Wick */}
                <line x1={x + 10} y1={high} x2={x + 10} y2={low} stroke={strokeColor} strokeWidth="2" />
                {/* Body */}
                <rect
                    x={x}
                    y={Math.min(open, close)}
                    width={20}
                    height={Math.max(Math.abs(close - open), 2)}
                    fill={isGhost ? 'none' : bodyColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeDasharray={isGhost ? "4 4" : "none"}
                />
                {/* Label */}
                {label && (
                    <text x={x + 10} y={low + 20} textAnchor="middle" fill="currentColor" fontSize="10" className="font-mono opacity-70">
                        {label}
                    </text>
                )}
            </g>
        );
    };

    const renderReversal = () => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
                <linearGradient id="sweepGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="150" x2="400" y2="150" stroke="hsl(var(--border))" strokeDasharray="4 4" opacity="0.3" />

            {/* Liquidity Level */}
            <line x1="50" y1="200" x2="350" y2="200" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4 2" />
            <text x="360" y="205" fill="hsl(var(--destructive))" fontSize="10" className="font-mono">SSL (LIQUIDITY)</text>

            {/* C1: Swing Low */}
            <Candle x={100} open={150} close={180} high={140} low={200} label="C1" color="hsl(var(--muted-foreground))" />

            {/* C2: Sweep & Rejection */}
            {/* Opens, sweeps low (220), closes back inside range (170) */}
            <Candle x={160} open={180} close={160} high={150} low={230} label="C2 (SWEEP)" color="hsl(var(--bullish))" />

            {/* Sweep Highlight Zone */}
            <rect x={150} y={200} width={40} height={30} fill="url(#sweepGradient)" />
            <text x={170} y={245} textAnchor="middle" fill="hsl(var(--destructive))" fontSize="10" className="font-mono">SWEEP</text>

            {/* C3: Confirmation */}
            {/* Opens, expands up */}
            <Candle x={220} open={160} close={100} high={90} low={165} label="C3" color="hsl(var(--bullish))" />

            {/* CISD Level */}
            <line x1="220" y1={100} x2="350" y2={100} stroke="hsl(var(--primary))" strokeWidth="1" />
            <text x={360} y={105} fill="hsl(var(--primary))" fontSize="10" className="font-mono">CISD ENTRY</text>

            {/* Entry Arrow */}
            <path d="M 300 110 L 300 90 L 290 100 M 300 90 L 310 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
    );

    const renderContinuation = () => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* HTF Context (Ghost Candle) */}
            <rect x={50} y={50} width={300} height={200} fill="hsl(var(--primary))" fillOpacity="0.05" rx="8" />
            <text x={60} y={70} fill="hsl(var(--primary))" fontSize="10" className="font-mono opacity-50">HTF EXPANSION CONTEXT</text>

            {/* HTF Range High/Low */}
            <line x1="50" y1={50} x2="350" y2={50} stroke="hsl(var(--primary))" strokeDasharray="2 2" opacity="0.3" />
            <line x1="50" y1={250} x2="350" y2={250} stroke="hsl(var(--primary))" strokeDasharray="2 2" opacity="0.3" />

            {/* Impulse Up */}
            <Candle x={100} open={200} close={150} high={140} low={210} color="hsl(var(--bullish))" />
            <Candle x={130} open={150} close={120} high={110} low={160} color="hsl(var(--bullish))" />

            {/* Pullback (Retracement) */}
            <Candle x={160} open={120} close={140} high={115} low={145} color="hsl(var(--bearish))" />
            <Candle x={190} open={140} close={180} high={135} low={185} label="PULLBACK" color="hsl(var(--bearish))" />

            {/* Continuation Trigger (C2 Logic on LTF) */}
            <Candle x={220} open={180} close={130} high={125} low={185} label="TRIGGER" color="hsl(var(--bullish))" />

            {/* Expansion */}
            <Candle x={250} open={130} close={60} high={50} low={135} label="EXPANSION" color="hsl(var(--bullish))" />

            {/* Path indicating flow */}
            <path d="M 110 200 L 140 120 L 200 180 L 260 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        </svg>
    );

    const renderAligned = () => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* HTF Bias Arrow */}
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" opacity="0.5" />
                </marker>
            </defs>
            <line x1="30" y1="250" x2="30" y2="50" stroke="hsl(var(--primary))" strokeWidth="4" opacity="0.2" markerEnd="url(#arrowhead)" />
            <text x={40} y={150} fill="hsl(var(--primary))" fontSize="10" className="font-mono opacity-50" transform="rotate(-90 40 150)">HTF BIAS: BULLISH</text>

            {/* Initial Leg */}
            <Candle x={80} open={220} close={150} high={140} low={230} color="hsl(var(--bullish))" />
            <Candle x={110} open={150} close={100} high={90} low={160} color="hsl(var(--bullish))" />

            {/* Deep Retrace */}
            <Candle x={140} open={100} close={140} high={95} low={145} color="hsl(var(--bearish))" />
            <Candle x={170} open={140} close={180} high={135} low={185} color="hsl(var(--bearish))" />
            <Candle x={200} open={180} close={210} high={175} low={215} label="RETRACE" color="hsl(var(--bearish))" />

            {/* Realignment / Strength Switch */}
            <rect x={220} y={190} width={80} height={40} fill="hsl(var(--accent))" fillOpacity="0.1" rx="4" />
            <text x={260} y={245} textAnchor="middle" fill="hsl(var(--accent))" fontSize="10" className="font-mono">REALIGNMENT</text>

            <Candle x={230} open={210} close={190} high={185} low={215} color="hsl(var(--bullish))" />
            <Candle x={260} open={190} close={140} high={130} low={195} label="GO" color="hsl(var(--bullish))" />
            <Candle x={290} open={140} close={80} high={70} low={145} color="hsl(var(--bullish))" />

            {/* Alignment Icon */}
            <circle cx={350} cy={50} r={20} fill="hsl(var(--bullish))" fillOpacity="0.2" />
            <path d="M 340 50 L 348 58 L 360 42" stroke="hsl(var(--bullish))" strokeWidth="3" fill="none" />
            <text x={350} y={85} textAnchor="middle" fill="hsl(var(--bullish))" fontSize="10" className="font-mono">A+ SETUP</text>
        </svg>
    );

    const renderReversalBearish = () => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
                <linearGradient id="sweepGradientBearish" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="150" x2="400" y2="150" stroke="hsl(var(--border))" strokeDasharray="4 4" opacity="0.3" />

            {/* Liquidity Level (BSL) */}
            <line x1="50" y1="100" x2="350" y2="100" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4 2" />
            <text x="360" y="105" fill="hsl(var(--destructive))" fontSize="10" className="font-mono">BSL (LIQUIDITY)</text>

            {/* C1: Swing High */}
            <Candle x={100} open={150} close={120} high={100} low={160} label="C1" color="hsl(var(--muted-foreground))" />

            {/* C2: Sweep & Rejection */}
            {/* Opens, sweeps high (80), closes back inside range (130) */}
            <Candle x={160} open={120} close={140} high={70} low={150} label="C2 (SWEEP)" color="hsl(var(--bearish))" />

            {/* Sweep Highlight Zone */}
            <rect x={150} y={70} width={40} height={30} fill="url(#sweepGradientBearish)" />
            <text x={170} y={65} textAnchor="middle" fill="hsl(var(--destructive))" fontSize="10" className="font-mono">SWEEP</text>

            {/* C3: Confirmation */}
            {/* Opens, expands down */}
            <Candle x={220} open={140} close={200} high={135} low={210} label="C3" color="hsl(var(--bearish))" />

            {/* CISD Level */}
            <line x1="220" y1={200} x2="350" y2={200} stroke="hsl(var(--primary))" strokeWidth="1" />
            <text x={360} y={205} fill="hsl(var(--primary))" fontSize="10" className="font-mono">CISD ENTRY</text>

            {/* Entry Arrow */}
            <path d="M 300 190 L 300 210 L 290 200 M 300 210 L 310 200" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-card/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden ${className}`}
        >
            {variant === 'reversal' && renderReversal()}
            {variant === 'reversal-bearish' && renderReversalBearish()}
            {variant === 'continuation' && renderContinuation()}
            {variant === 'aligned' && renderAligned()}
        </motion.div>
    );
};
