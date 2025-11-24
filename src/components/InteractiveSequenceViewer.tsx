import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, RefreshCw, ArrowUpRight, Play, Pause, Terminal, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { SequenceDiagram } from './diagrams/SequenceDiagram';

const sequences = [
    {
        id: 'continuation',
        icon: TrendingUp,
        title: 'Continuation',
        subtitle: 'Inherited Turn',
        color: 'bullish',
        description: 'Trend following setup identifying pullbacks in established trends. Best executed during Key Session Phases (London Expansion / NY Continuation).',
        steps: [
            'Identify HTF directional bias (Premium/Discount)',
            'Wait for LTF C2 Sweep that aligns with HTF',
            'Ensure no major counter-trend structure exists',
            'Enter on CISD confirmation'
        ],
        rules: [
            'Trend must be clearly defined on HTF',
            'LTF sweep must close back inside range',
            'Focus on London Expansion / NY Continuation phases'
        ],
        when: 'Use when the prior 4H did the reversal work during a driver/key window.',
    },
    {
        id: 'reversal',
        icon: RefreshCw,
        title: 'Reversal',
        subtitle: 'Fresh Turn',
        color: 'bearish',
        description: 'Counter-trend setup catching market turning points. Requires strict C2 sweep and C3 expansion confirmation.',
        steps: [
            'Identify C1 Liquidity (Swing High/Low)',
            'Wait for C2 Sweep (Must close inside C1 range)',
            'Wait for C3 Expansion to confirm direction',
            'Enter at CISD (Change in State of Delivery)'
        ],
        rules: [
            'NO sweep = NO trade (C2 must sweep C1)',
            'C2 must close INSIDE the range (Rejection)',
            'Stop loss goes above/below C2 sweep wick'
        ],
        when: 'Use when today\'s 4H is expected to form the low/high of the day itself.',
    },
    {
        id: 'aligned',
        icon: ArrowUpRight,
        title: 'Aligned',
        subtitle: 'Re-Entry',
        color: 'primary',
        description: 'High probability setup where HTF and LTF align. Triple Timeframe Alignment (Daily + 4H + 1H).',
        steps: [
            'Daily/4H Bias is clearly defined',
            '1H/15m Structure aligns with HTF',
            'Price sweeps liquidity into HTF POI',
            'Triple Timeframe Alignment (Daily + 4H + 1H)'
        ],
        rules: [
            'Do not trade against HTF bias',
            'Wait for complete fractal alignment',
            'Highest probability setup type (A+)'
        ],
        when: 'Use when you missed the first leg or want to rejoin after retrace.',
    },
];

export const InteractiveSequenceViewer = () => {
    const [activeSequence, setActiveSequence] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveSequence((prev) => (prev + 1) % sequences.length);
        }, 8000); // Longer duration for reading

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const sequence = sequences[activeSequence];
    const Icon = sequence.icon;

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Sequence Selector */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
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
                            className={`relative flex flex-col items-center gap-2 p-4 md:p-6 rounded-xl border-2 transition-all min-w-[140px] ${isActive
                                ? seq.color === 'bullish'
                                    ? 'border-bullish bg-bullish/10 shadow-lg'
                                    : seq.color === 'bearish'
                                        ? 'border-bearish bg-bearish/10 shadow-lg'
                                        : 'border-primary bg-primary/10 shadow-lg'
                                : 'border-border bg-card hover:bg-muted/50'
                                }`}
                        >
                            <div className={`p-3 rounded-lg ${isActive
                                ? seq.color === 'bullish'
                                    ? 'bg-bullish/20'
                                    : seq.color === 'bearish'
                                        ? 'bg-bearish/20'
                                        : 'bg-primary/20'
                                : 'bg-muted'
                                }`}>
                                <SeqIcon className={`w-6 h-6 md:w-8 md:h-8 ${isActive
                                    ? seq.color === 'bullish'
                                        ? 'text-bullish'
                                        : seq.color === 'bearish'
                                            ? 'text-bearish'
                                            : 'text-primary'
                                    : 'text-muted-foreground'
                                    }`} />
                            </div>
                            <div className="text-center">
                                <div className={`font-bold text-base md:text-lg ${isActive ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                    {seq.title}
                                </div>
                                <div className="text-xs md:text-sm text-muted-foreground">{seq.subtitle}</div>
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 md:w-20 h-1 rounded-full ${seq.color === 'bullish'
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
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSequence}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className={`border-2 overflow-hidden ${sequence.color === 'bullish'
                        ? 'border-bullish/30 bg-bullish/5'
                        : sequence.color === 'bearish'
                            ? 'border-bearish/30 bg-bearish/5'
                            : 'border-primary/30 bg-primary/5'
                        }`}>
                        <CardContent className="p-0">
                            <div className="grid lg:grid-cols-2">
                                {/* Left: Content */}
                                <div className="p-6 md:p-10 space-y-8">
                                    <div>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${sequence.color === 'bullish'
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

                                    <div className="grid gap-6">
                                        {/* Execution Protocol */}
                                        <div className="bg-card/40 p-5 rounded-xl border border-white/5">
                                            <h4 className="text-sm font-mono text-primary mb-4 flex items-center gap-2">
                                                <Terminal className="w-4 h-4" /> EXECUTION PROTOCOL
                                            </h4>
                                            <ul className="space-y-3">
                                                {sequence.steps.map((step, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="text-foreground/90">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Critical Rules */}
                                        <div className="bg-card/40 p-5 rounded-xl border border-white/5">
                                            <h4 className="text-sm font-mono text-secondary mb-4 flex items-center gap-2">
                                                <AlertTriangle className="w-4 h-4" /> CRITICAL RULES
                                            </h4>
                                            <ul className="space-y-3">
                                                {sequence.rules.map((rule, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                                                        <span className="text-foreground/80">{rule}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Visual */}
                                <div className={`relative min-h-[400px] lg:min-h-full border-t lg:border-t-0 lg:border-l ${sequence.color === 'bullish'
                                    ? 'border-bullish/20 bg-bullish/5'
                                    : sequence.color === 'bearish'
                                        ? 'border-bearish/20 bg-bearish/5'
                                        : 'border-primary/20 bg-primary/5'
                                    }`}>
                                    <SequenceDiagram
                                        variant={sequence.id as "continuation" | "reversal" | "aligned"}
                                        className="w-full h-full absolute inset-0"
                                    />

                                    {/* Overlay UI */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-card/80 backdrop-blur border border-primary/30 rounded text-xs font-mono text-primary z-10">
                                        LIVE_FEED :: ACTIVE
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

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
                            Pause Rotation
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            Auto-Rotate
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};
