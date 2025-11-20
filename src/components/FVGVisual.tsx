import { motion } from "framer-motion";

export const FVGVisual = () => {
  return (
    <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Three candles creating FVG */}

        {/* Candle 1 - Before gap */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.line
            x1="80"
            y1="120"
            x2="80"
            y2="150"
            stroke="rgba(255, 0, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.rect
            x="72"
            y="130"
            width="16"
            height="20"
            fill="rgba(255, 0, 100, 0.3)"
            stroke="rgba(255, 0, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4 }}
          />
        </motion.g>

        {/* Candle 2 - Creates the gap (bullish impulse) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.line
            x1="140"
            y1="60"
            x2="140"
            y2="140"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.7 }}
          />
          <motion.rect
            x="132"
            y="60"
            width="16"
            height="70"
            fill="rgba(0, 255, 100, 0.3)"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8 }}
          />
        </motion.g>

        {/* Candle 3 - After gap */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.line
            x1="200"
            y1="50"
            x2="200"
            y2="90"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.1 }}
          />
          <motion.rect
            x="192"
            y="50"
            width="16"
            height="30"
            fill="rgba(0, 255, 100, 0.3)"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2 }}
          />
        </motion.g>

        {/* FVG Zone (the gap) */}
        <motion.rect
          x="100"
          y="90"
          width="120"
          height="30"
          fill="rgba(0, 255, 255, 0.2)"
          stroke="rgba(0, 255, 255, 0.8)"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />

        {/* FVG Label */}
        <motion.text
          x="160"
          y="108"
          fill="rgba(0, 255, 255, 1)"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          FVG
        </motion.text>

        {/* Arrows showing the gap */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <path
            d="M 90 125 L 90 115"
            stroke="rgba(0, 255, 255, 0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowhead-fvg)"
          />
          <path
            d="M 190 85 L 190 95"
            stroke="rgba(0, 255, 255, 0.8)"
            strokeWidth="2"
            markerEnd="url(#arrowhead-fvg)"
          />
          <text
            x="30"
            y="120"
            fill="rgba(0, 255, 255, 0.9)"
            fontSize="10"
          >
            Gap = Imbalance
          </text>
        </motion.g>

        {/* Price return to fill FVG */}
        <motion.path
          d="M 210 55 Q 240 50, 270 70 Q 290 85, 300 105"
          stroke="rgba(255, 200, 0, 0.8)"
          strokeWidth="2.5"
          strokeDasharray="4,4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        />
        <motion.text
          x="310"
          y="110"
          fill="rgba(255, 200, 0, 0.9)"
          fontSize="10"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          Price returns to fill
        </motion.text>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-fvg"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(0, 255, 255, 0.8)" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 right-4 text-[10px]">
        <p className="text-cyan-400">Fair Value Gap: Price imbalance where wicks don't overlap</p>
        <p className="text-gray-400">Acts as magnet - price often returns to fill the gap</p>
      </div>
    </div>
  );
};
