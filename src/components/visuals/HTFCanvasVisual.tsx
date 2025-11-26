import { motion } from "framer-motion";

export const HTFCanvasVisual = () => {
  return (
    <div className="relative h-80 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-6 font-mono">
      <svg className="w-full h-full" viewBox="0 0 500 300">
        {/* 4H Candle (Large bullish candle) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* 4H Candle Body */}
          <motion.rect
            x="180"
            y="120"
            width="140"
            height="120"
            fill="rgba(0, 255, 100, 0.2)"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="3"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* 4H Wick */}
          <motion.line
            x1="250"
            y1="100"
            x2="250"
            y2="240"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="3"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />

          {/* 4H Label */}
          <motion.text
            x="250"
            y="90"
            fill="hsl(120, 100%, 50%)"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            4H CANVAS (ERL)
          </motion.text>
        </motion.g>

        {/* LTF Swing Points (1H swings within the 4H candle) */}
        {[
          { x: 200, y: 200, label: "L", color: "hsl(0, 100%, 60%)" },
          { x: 230, y: 150, label: "H", color: "hsl(190, 100%, 50%)" },
          { x: 260, y: 180, label: "L", color: "hsl(0, 100%, 60%)" },
          { x: 290, y: 130, label: "H", color: "hsl(190, 100%, 50%)" },
        ].map((point, i) => (
          <motion.g key={i}>
            {/* Swing Point Circle */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill={point.color}
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 1.5 + i * 0.2, duration: 0.5 }}
            />

            {/* Label */}
            <motion.text
              x={point.x}
              y={point.y - 15}
              fill={point.color}
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 + i * 0.2 }}
            >
              {point.label}
            </motion.text>

            {/* Connecting line to next point */}
            {i < 3 && (
              <motion.line
                x1={point.x}
                y1={point.y}
                x2={[230, 260, 290][i]}
                y2={[150, 180, 130][i]}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.9 + i * 0.2, duration: 0.4 }}
              />
            )}
          </motion.g>
        ))}

        {/* LTF Label */}
        <motion.text
          x="250"
          y="270"
          fill="hsl(190, 100%, 50%)"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          1H SWING POINTS (LTF Trigger)
        </motion.text>

        {/* Arrow showing fractal relationship */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <path
            d="M 140 180 L 170 180"
            stroke="hsl(50, 100%, 50%)"
            strokeWidth="2"
            markerEnd="url(#arrowhead-yellow)"
          />
          <text
            x="70"
            y="185"
            fill="hsl(50, 100%, 50%)"
            fontSize="10"
            fontWeight="bold"
          >
            HTF Context
          </text>

          <path
            d="M 340 180 L 370 180"
            stroke="hsl(50, 100%, 50%)"
            strokeWidth="2"
            markerEnd="url(#arrowhead-yellow)"
          />
          <text
            x="380"
            y="185"
            fill="hsl(50, 100%, 50%)"
            fontSize="10"
            fontWeight="bold"
          >
            LTF Trigger
          </text>
        </motion.g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-yellow"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(50, 100%, 50%)" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 right-4 space-y-1 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-3 bg-green-500/20 border border-green-500"></div>
          <span className="text-green-400">4H Candle = Your main canvas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span className="text-cyan-400">LTF Highs (H) = Permission to enter short</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span className="text-red-400">LTF Lows (L) = Permission to enter long</span>
        </div>
      </div>
    </div>
  );
};
