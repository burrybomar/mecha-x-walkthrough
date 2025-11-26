import { motion } from "framer-motion";

export const OrderBlockVisual = () => {
  return (
    <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Downtrend candles */}
        {[
          { x: 60, y: 60, h: 30 },
          { x: 90, y: 80, h: 25 },
          { x: 120, y: 100, h: 20 },
        ].map((candle, i) => (
          <motion.g key={i}>
            <motion.rect
              x={candle.x - 8}
              y={candle.y}
              width="16"
              height={candle.h}
              fill="rgba(255, 0, 100, 0.3)"
              stroke="rgba(255, 0, 100, 0.8)"
              strokeWidth="2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            />
          </motion.g>
        ))}

        {/* Order Block Candle (last bearish before reversal) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.line
            x1="160"
            y1="110"
            x2="160"
            y2="150"
            stroke="rgba(255, 0, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.7 }}
          />
          <motion.rect
            x="152"
            y="120"
            width="16"
            height="30"
            fill="rgba(255, 0, 100, 0.4)"
            stroke="rgba(255, 0, 100, 1)"
            strokeWidth="3"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8 }}
          />

          {/* Highlight box around order block */}
          <motion.rect
            x="145"
            y="113"
            width="30"
            height="44"
            fill="none"
            stroke="rgba(255, 200, 0, 0.8)"
            strokeWidth="2"
            strokeDasharray="3,3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          />
        </motion.g>

        {/* Label for Order Block */}
        <motion.text
          x="160"
          y="105"
          fill="rgba(255, 200, 0, 1)"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Order Block
        </motion.text>

        {/* Reversal candles (bullish) */}
        {[
          { x: 200, y: 115, h: 40 },
          { x: 240, y: 95, h: 50 },
          { x: 280, y: 75, h: 45 },
        ].map((candle, i) => (
          <motion.g key={i}>
            <motion.line
              x1={candle.x}
              y1={candle.y}
              x2={candle.x}
              y2={candle.y + candle.h + 15}
              stroke="rgba(0, 255, 100, 0.8)"
              strokeWidth="2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.8 + i * 0.15 }}
            />
            <motion.rect
              x={candle.x - 8}
              y={candle.y}
              width="16"
              height={candle.h}
              fill="rgba(0, 255, 100, 0.3)"
              stroke="rgba(0, 255, 100, 0.8)"
              strokeWidth="2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.9 + i * 0.15 }}
            />
          </motion.g>
        ))}

        {/* Price returns to order block zone */}
        <motion.path
          d="M 290 85 Q 310 90, 320 110 Q 325 120, 320 135"
          stroke="rgba(0, 200, 255, 0.8)"
          strokeWidth="2.5"
          strokeDasharray="4,4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        />
        <motion.circle
          cx="320"
          cy="135"
          r="5"
          fill="rgba(0, 200, 255, 0.8)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 3.6, duration: 0.5 }}
        />
        <motion.text
          x="335"
          y="140"
          fill="rgba(0, 200, 255, 1)"
          fontSize="10"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8 }}
        >
          Retest = Entry
        </motion.text>

        {/* Arrow pointing to institutional orders */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <text
            x="30"
            y="135"
            fill="rgba(255, 200, 0, 0.9)"
            fontSize="9"
          >
            Institutional
          </text>
          <text
            x="30"
            y="145"
            fill="rgba(255, 200, 0, 0.9)"
            fontSize="9"
          >
            Orders Here
          </text>
          <path
            d="M 110 140 L 145 135"
            stroke="rgba(255, 200, 0, 0.8)"
            strokeWidth="1.5"
            markerEnd="url(#arrowhead-ob)"
          />
        </motion.g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-ob"
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
        <p className="text-yellow-400">Order Block: Last opposing candle before strong move</p>
        <p className="text-gray-400">Where institutions placed orders - price often returns here</p>
      </div>
    </div>
  );
};
