import React from 'react';
import { CleanCandlestick } from './CleanCandlestick';

interface SequenceDiagramProps {
    variant: 'continuation' | 'reversal' | 'aligned' | 'continuation-failed' | 'reversal-failed' | 'aligned-failed';
    className?: string;
}

export const SequenceDiagram: React.FC<SequenceDiagramProps> = ({ variant, className }) => {
    // Define sequence data based on variant
    // Coordinates are relative to a 400x400 SVG viewbox

    const renderSequence = () => {
        switch (variant) {
            case 'continuation':
                return (
                    <>
                        {/* HTF Context - Ghost Candle */}
                        <CleanCandlestick x={50} y={50} width={40} open={300} close={100} high={80} low={320} color="hsl(var(--muted))" opacity={0.2} showWick={true} />

                        {/* Sequence Candles */}
                        {/* 1. Impulse */}
                        <CleanCandlestick x={120} y={150} width={40} open={250} close={150} high={140} low={260} number={1} />

                        {/* 2. Retracement */}
                        <CleanCandlestick x={180} y={150} width={40} open={150} close={200} high={140} low={210} number={2} />

                        {/* 3. Continuation */}
                        <CleanCandlestick x={240} y={200} width={40} open={200} close={100} high={90} low={210} number={3} />

                        {/* Annotations */}
                        <line x1={50} y1={100} x2={350} y2={100} stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" />
                        <text x={360} y={105} fill="hsl(var(--primary))" fontSize="10" fontFamily="monospace">HTF HIGH</text>
                    </>
                );
            case 'reversal':
                return (
                    <>
                        {/* 1. Sweep */}
                        <CleanCandlestick x={100} y={100} width={40} open={200} close={150} high={80} low={210} number={1} />

                        {/* 2. Shift */}
                        <CleanCandlestick x={160} y={150} width={40} open={150} close={250} high={140} low={260} number={2} />

                        {/* 3. Return */}
                        <CleanCandlestick x={220} y={250} width={40} open={250} close={200} high={190} low={260} number={3} />

                        {/* 4. Entry */}
                        <CleanCandlestick x={280} y={200} width={40} open={200} close={300} high={190} low={310} number={4} />

                        {/* Annotations */}
                        <line x1={80} y1={80} x2={350} y2={80} stroke="hsl(var(--destructive))" strokeWidth="1" />
                        <text x={360} y={85} fill="hsl(var(--destructive))" fontSize="10" fontFamily="monospace">LIQUIDITY</text>
                    </>
                );
            case 'continuation-failed':
                return (
                    <>
                        {/* 1. Impulse */}
                        <CleanCandlestick x={120} y={150} width={40} open={250} close={150} high={140} low={260} number={1} />

                        {/* 2. Retracement (Too Deep) */}
                        <CleanCandlestick x={180} y={150} width={40} open={150} close={240} high={140} low={250} number={2} color="hsl(var(--destructive))" />

                        {/* 3. Failure */}
                        <CleanCandlestick x={240} y={240} width={40} open={240} close={260} high={230} low={270} number={3} color="hsl(var(--destructive))" />

                        {/* Annotations */}
                        <line x1={120} y1={140} x2={300} y2={140} stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4 4" />
                        <text x={310} y={145} fill="hsl(var(--destructive))" fontSize="10" fontFamily="monospace">INVALID</text>
                    </>
                );
            case 'reversal-failed':
                return (
                    <>
                        {/* 1. No Sweep */}
                        <CleanCandlestick x={100} y={120} width={40} open={200} close={160} high={150} low={210} number={1} />

                        {/* 2. Weak Shift */}
                        <CleanCandlestick x={160} y={160} width={40} open={160} close={190} high={150} low={200} number={2} color="hsl(var(--destructive))" />

                        {/* 3. Continuation (Failure) */}
                        <CleanCandlestick x={220} y={190} width={40} open={190} close={140} high={130} low={200} number={3} color="hsl(var(--destructive))" />

                        {/* Annotations */}
                        <text x={100} y={80} fill="hsl(var(--destructive))" fontSize="10" fontFamily="monospace">NO LIQUIDITY SWEEP</text>
                    </>
                );
            case 'aligned-failed':
                return (
                    <>
                        {/* 1. Setup */}
                        <CleanCandlestick x={100} y={150} width={40} open={250} close={150} high={140} low={260} number={1} />

                        {/* 2. Counter-Trend */}
                        <CleanCandlestick x={160} y={150} width={40} open={150} close={280} high={140} low={290} number={2} color="hsl(var(--destructive))" />

                        {/* Annotations */}
                        <text x={160} y={130} fill="hsl(var(--destructive))" fontSize="10" fontFamily="monospace">HTF MISALIGNMENT</text>
                    </>
                );
            default: // Aligned
                return (
                    <>
                        {/* 1. Setup */}
                        <CleanCandlestick x={100} y={150} width={40} open={250} close={150} high={140} low={260} number={1} />

                        {/* 2. Trigger */}
                        <CleanCandlestick x={160} y={150} width={40} open={150} close={180} high={140} low={190} number={2} />

                        {/* 3. Execution */}
                        <CleanCandlestick x={220} y={180} width={40} open={180} close={80} high={70} low={190} number={3} />

                        {/* Annotations */}
                        <rect x={90} y={140} width={200} height={130} fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="2 2" rx="4" />
                        <text x={100} y={290} fill="hsl(var(--accent))" fontSize="10" fontFamily="monospace">EXECUTION BOX</text>
                    </>
                );
        }
    };

    return (
        <div className={`tech-panel p-4 rounded-lg bg-card/50 backdrop-blur-sm flex items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full drop-shadow-xl max-h-[500px]"
            >
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsla(var(--border), 0.3)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {renderSequence()}

                {/* Watermark/Label */}
                <text x="20" y="380" fill="hsl(var(--muted-foreground))" fontSize="12" fontFamily="monospace" opacity="0.5">
                    MECHA-X // {variant.toUpperCase()}
                </text>
            </svg>
        </div>
    );
};
