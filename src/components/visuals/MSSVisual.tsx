import { motion } from "framer-motion";

export const MSSVisual = () => {
  return (
    <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Downtrend structure (Higher Highs, Higher Lows becoming Lower Lows) */}

        {/* Old structure swing points */}
        <motion.line
          x1="50"
          y1="140"
          x2="350"
          y2="140"
          stroke="rgba(150, 150, 150, 0.3)"
          strokeWidth="1"
          strokeDasharray="3,3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Downtrend (bearish structure) */}
        {[
          { x: 70, y: 70, h: 30, label: "HH" },
          { x: 110, y: 90, h: 25, label: "HL" },
          { x: 150, y: 85, h: 35, label: "HH" },
          { x: 190, y: 105, h: 30, label: "HL" },
        ].map((candle, i) => (
          <motion.g key={i}>
            <motion.line
              x1={candle.x}
              y1={candle.y}
              x2={candle.x}
              y2={candle.y + candle.h + 20}
              stroke={i % 2 === 0 ? "rgba(0, 255, 100, 0.5)" : "rgba(255, 0, 100, 0.5)"}
              strokeWidth="1.5"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            />
            <motion.rect
              x={candle.x - 7}
              y={candle.y}
              width="14"
              height={candle.h}
              fill={i % 2 === 0 ? "rgba(0, 255, 100, 0.2)" : "rgba(255, 0, 100, 0.2)"}
              stroke={i % 2 === 0 ? "rgba(0, 255, 100, 0.6)" : "rgba(255, 0, 100, 0.6)"}
              strokeWidth="2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4 + i * 0.15 }}
            />

            {/* Swing labels */}
            <motion.text
              x={candle.x}
              y={candle.y - 8}
              fill="rgba(150, 150, 150, 0.8)"
              fontSize="9"
              fontWeight="bold"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.15 }}
            >
              {candle.label}
            </motion.text>

            {/* Connection lines */}
            {i < 3 && (
              <motion.line
                x1={candle.x}
                y1={i % 2 === 0 ? candle.y : candle.y + candle.h}
                x2={[110, 150, 190][i]}
                y2={i % 2 === 0 ? [115, 120, 135][i] : [85, 105, 105][i]}
                stroke="rgba(150, 150, 150, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.3 }}
              />
            )}
          </motion.g>
        ))}

        {/* MSS Candle - Breaks structure */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.line
            x1="230"
            y1="125"
            x2="230"
            y2="165"
            stroke="rgba(255, 0, 100, 1)"
            strokeWidth="2.5"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.6 }}
          />
          <motion.rect
            x="222"
            y="135"
            width="16"
            height="30"
            fill="rgba(255, 0, 100, 0.4)"
            stroke="rgba(255, 0, 100, 1)"
            strokeWidth="3"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.7 }}
          />

          {/* Breaks below previous HL */}
          <motion.circle
            cx="230"
            cy="165"
            r="6"
            fill="rgba(255, 0, 100, 0.8)"
            stroke="white"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 2, duration: 0.5 }}
          />

          {/* MSS Label */}
          <motion.text
            x="230"
            y="185"
            fill="rgba(255, 0, 100, 1)"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
          >
            MSS
          </motion.text>
        </motion.g>

        {/* Arrow showing structure break */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <path
            d="M 200 155 L 220 165"
            stroke="rgba(255, 200, 0, 0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowhead-mss)"
          />
          <text
            x="155"
            y="150"
            fill="rgba(255, 200, 0, 1)"
            fontSize="10"
            fontWeight="bold"
          >
            Breaks Low
          </text>
        </motion.g>

        {/* New bearish structure */}
        {[
          { x: 270, y: 140, h: 30, label: "LH" },
          { x: 310, y: 155, h: 25, label: "LL" },
        ].map((candle, i) => (
          <motion.g key={i}>
            <motion.rect
              x={candle.x - 7}
              y={candle.y}
              width="14"
              height={candle.h}
              fill={i === 0 ? "rgba(0, 255, 100, 0.2)" : "rgba(255, 0, 100, 0.2)"}
              stroke={i === 0 ? "rgba(0, 255, 100, 0.6)" : "rgba(255, 0, 100, 0.6)"}
              strokeWidth="2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2.8 + i * 0.2 }}
            />
            <motion.text
              x={candle.x}
              y={candle.y - 8}
              fill="rgba(255, 0, 100, 0.9)"
              fontSize="9"
              fontWeight="bold"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 + i * 0.2 }}
            >
              {candle.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Structure change annotation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <rect
            x="250"
            y="25"
            width="120"
            height="35"
            fill="rgba(255, 0, 100, 0.2)"
            stroke="rgba(255, 0, 100, 0.8)"
            strokeWidth="2"
            rx="5"
          />
          <text
            x="310"
            y="42"
            fill="rgba(255, 0, 100, 1)"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            Bearish Structure
          </text>
          <text
            x="310"
            y="54"
            fill="rgba(255, 0, 100, 0.8)"
            fontSize="9"
            textAnchor="middle"
          >
            LH → LL
          </text>
        </motion.g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-mss"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255, 200, 0, 0.8)" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 right-4 text-[10px]">
        <p className="text-red-400">Market Structure Shift: Price breaks previous swing low (or high)</p>
        <p className="text-gray-400">Changes from HH/HL (bullish) to LH/LL (bearish) or vice versa</p>
      </div>
    </div>
  );
};
