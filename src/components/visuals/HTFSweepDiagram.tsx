import React from "react";

// A clean, watermark-free SVG diagram showing the HTF BSL/SSL sweep patterns
// Colors use the design system tokens via CSS variables
export const HTFSweepDiagram: React.FC = () => {
  const primary = "hsl(var(--primary))"; // used for blue line and accents
  const bull = "hsl(var(--primary))";    // bullish candles (brand primary)
  const bear = "hsl(var(--muted-foreground))"; // bearish candles
  const text = "hsl(var(--foreground))";
  const accent = "hsl(var(--accent))";   // orange arrow

  return (
    <figure className="w-full bg-card">
      <svg
        viewBox="0 0 1200 600"
        role="img"
        aria-labelledby="htf-title htf-desc"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="htf-title">Higher Time Frame Sweeps</title>
        <desc id="htf-desc">Left shows a BSL sweep with wick piercing above then closing below; right shows an SSL sweep with wick piercing below then closing above.</desc>

        {/* Title */}
        <text x="600" y="70" textAnchor="middle" fontSize="48" fontWeight="700" fill={text}>
          HIGHER TIME FRAME SWEEPS
        </text>

        {/* LEFT PANEL - BSL SWEEP */}
        <text x="300" y="140" textAnchor="middle" fontSize="28" fontWeight="700" fill={text}>
          BSL SWEEP
        </text>

        {/* BSL level line */}
        <line x1="120" y1="300" x2="480" y2="300" stroke={primary} strokeWidth="10" />

        {/* Candles (3) */}
        {/* Candle 1 - bullish touching the line */}
        <line x1="200" y1="200" x2="200" y2="340" stroke="black" strokeWidth="4" />
        <rect x="180" y="230" width="40" height="70" fill={bull} stroke="black" strokeWidth="2" />

        {/* Candle 2 - bullish with wick piercing above the line, body closes below the line */}
        <line x1="300" y1="160" x2="300" y2="330" stroke="black" strokeWidth="4" />
        <rect x="280" y="260" width="40" height="60" fill={bull} stroke="black" strokeWidth="2" />
        {/* Arrow pointing to the sweeping wick */}
        <line x1="330" y1="210" x2="360" y2="195" stroke={accent} strokeWidth="6" markerEnd="url(#arrow)" />

        {/* Candle 3 - bearish reversal */}
        <line x1="400" y1="210" x2="400" y2="360" stroke="black" strokeWidth="4" />
        <rect x="380" y="300" width="40" height="60" fill={bear} stroke="black" strokeWidth="2" />

        {/* RIGHT PANEL - SSL SWEEP */}
        <text x="900" y="140" textAnchor="middle" fontSize="28" fontWeight="700" fill={text}>
          SSL SWEEP
        </text>

        {/* SSL level line */}
        <line x1="720" y1="380" x2="1080" y2="380" stroke={primary} strokeWidth="10" />

        {/* Candle 1 - bearish touching the line */}
        <line x1="800" y1="260" x2="800" y2="420" stroke="black" strokeWidth="4" />
        <rect x="780" y="320" width="40" height="60" fill={bear} stroke="black" strokeWidth="2" />

        {/* Candle 2 - bearish with wick piercing below the line, body closes above the line */}
        <line x1="900" y1="300" x2="900" y2="460" stroke="black" strokeWidth="4" />
        <rect x="880" y="330" width="40" height="50" fill={bear} stroke="black" strokeWidth="2" />
        {/* Arrow pointing to the sweeping wick */}
        <line x1="930" y1="430" x2="960" y2="445" stroke={accent} strokeWidth="6" markerEnd="url(#arrow)" />

        {/* Candle 3 - bullish reversal */}
        <line x1="1000" y1="250" x2="1000" y2="420" stroke="black" strokeWidth="4" />
        <rect x="980" y="310" width="40" height="70" fill={bull} stroke="black" strokeWidth="2" />

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
          </marker>
        </defs>
      </svg>
      <figcaption className="sr-only">Illustration of BSL and SSL sweep patterns with three-candle examples.</figcaption>
    </figure>
  );
};

export default HTFSweepDiagram;
