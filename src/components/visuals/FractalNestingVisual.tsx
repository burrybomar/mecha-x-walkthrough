import { motion } from "framer-motion";

export const FractalNestingVisual = () => {
  return (
    <div className="relative h-80 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-6 font-mono">
      <svg className="w-full h-full" viewBox="0 0 500 300">
        {/* Outer Box - Daily */}
        <motion.rect
          x="50"
          y="30"
          width="400"
          height="220"
          fill="rgba(100, 100, 255, 0.05)"
          stroke="rgba(100, 100, 255, 0.6)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
        <motion.text
          x="60"
          y="50"
          fill="rgba(100, 100, 255, 0.8)"
          fontSize="12"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          DAILY CANVAS
        </motion.text>

        {/* Middle Box - 4H */}
        <motion.rect
          x="100"
          y="70"
          width="300"
          height="150"
          fill="rgba(0, 255, 100, 0.05)"
          stroke="rgba(0, 255, 100, 0.8)"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
        <motion.text
          x="110"
          y="90"
          fill="rgba(0, 255, 100, 0.9)"
          fontSize="11"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          4H CANVAS
        </motion.text>

        {/* Inner Box - 1H */}
        <motion.rect
          x="150"
          y="110"
          width="200"
          height="80"
          fill="rgba(0, 255, 255, 0.1)"
          stroke="rgba(0, 255, 255, 0.8)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        />
        <motion.text
          x="160"
          y="130"
          fill="rgba(0, 255, 255, 0.9)"
          fontSize="10"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          1H TRIGGER
        </motion.text>

        {/* Price action within 1H */}
        {[
          { x: 180, y: 160, size: 15 },
          { x: 210, y: 145, size: 20 },
          { x: 240, y: 170, size: 12 },
          { x: 270, y: 140, size: 18 },
          { x: 300, y: 155, size: 16 },
        ].map((candle, i) => (
          <motion.g key={i}>
            <motion.rect
              x={candle.x - 5}
              y={candle.y}
              width="10"
              height={candle.size}
              fill={i % 2 === 0 ? "rgba(0, 255, 100, 0.3)" : "rgba(255, 0, 100, 0.3)"}
              stroke={i % 2 === 0 ? "rgba(0, 255, 100, 0.8)" : "rgba(255, 0, 100, 0.8)"}
              strokeWidth="1"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 1.8 + i * 0.1, duration: 0.3 }}
            />
          </motion.g>
        ))}

        {/* Arrows showing fractal hierarchy */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          {/* Daily to 4H */}
          <path
            d="M 60 260 L 80 260 L 80 240"
            stroke="rgba(255, 200, 0, 0.8)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead-fractal)"
          />

          {/* 4H to 1H */}
          <path
            d="M 110 230 L 130 230 L 130 210"
            stroke="rgba(255, 200, 0, 0.8)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead-fractal)"
          />
        </motion.g>

        {/* Annotation labels */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <text
            x="420"
            y="100"
            fill="rgba(255, 255, 255, 0.6)"
            fontSize="9"
            textAnchor="end"
          >
            Direction
          </text>
          <text
            x="420"
            y="160"
            fill="rgba(255, 255, 255, 0.6)"
            fontSize="9"
            textAnchor="end"
          >
            Context
          </text>
          <text
            x="340"
            y="200"
            fill="rgba(255, 255, 255, 0.6)"
            fontSize="9"
            textAnchor="end"
          >
            Entry
          </text>
        </motion.g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-fractal"
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
      <div className="absolute bottom-2 left-4 right-4 space-y-1 text-[10px]">
        <p className="text-gray-300 font-semibold">Markets are fractal:</p>
        <p className="text-gray-400">What happens on 1H mirrors what happens on 4H, which mirrors Daily</p>
        <p className="text-yellow-400">↳ Trade when ALL timeframes align</p>
      </div>
    </div>
  );
};
