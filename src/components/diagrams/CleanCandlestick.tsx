import React from 'react';

interface CleanCandlestickProps {
    x: number;
    y: number;
    width: number;
    open: number;
    close: number;
    high: number;
    low: number;
    color?: string;
    label?: string;
    number?: number;
    opacity?: number;
    showWick?: boolean;
}

export const CleanCandlestick: React.FC<CleanCandlestickProps> = ({
    x,
    y,
    width,
    open,
    close,
    high,
    low,
    color = 'hsl(var(--primary))',
    label,
    number,
    opacity = 1,
    showWick = true,
}) => {
    // Calculate pixel coordinates based on price (0-100 scale assumed for simplicity in this diagram component)
    // In a real chart, we'd map price to pixels. Here, we assume inputs are already relative pixel heights or percentages.
    // Let's assume inputs are 0-100 relative to the container height.

    const bodyTop = Math.min(open, close);
    const bodyBottom = Math.max(open, close);
    const bodyHeight = Math.abs(close - open);

    const isBullish = close < open; // In SVG coords, lower Y is higher up
    const fillColor = isBullish ? 'hsl(var(--bullish))' : 'hsl(var(--bearish))';
    const strokeColor = isBullish ? 'hsl(var(--bullish))' : 'hsl(var(--bearish))';

    return (
        <g transform={`translate(${x}, ${y})`} style={{ opacity }}>
            {/* Wick */}
            {showWick && (
                <line
                    x1={width / 2}
                    y1={high}
                    x2={width / 2}
                    y2={low}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                />
            )}

            {/* Body */}
            <rect
                x={0}
                y={bodyTop}
                width={width}
                height={Math.max(bodyHeight, 1)} // Ensure at least 1px height
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth="1.5"
                className="transition-all duration-300 hover:opacity-80"
            />

            {/* Number Annotation */}
            {number && (
                <g transform={`translate(${width / 2}, ${bodyTop + bodyHeight / 2})`}>
                    <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="pointer-events-none select-none"
                    >
                        {number}
                    </text>
                </g>
            )}

            {/* Label Annotation */}
            {label && (
                <g transform={`translate(${width + 8}, ${bodyTop + bodyHeight / 2})`}>
                    <text
                        dominantBaseline="middle"
                        fill="hsl(var(--muted-foreground))"
                        fontSize="10"
                        fontFamily="monospace"
                        className="uppercase tracking-wider"
                    >
                        {label}
                    </text>
                </g>
            )}
        </g>
    );
};
