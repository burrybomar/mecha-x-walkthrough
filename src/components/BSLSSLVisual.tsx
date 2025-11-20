import { motion } from "framer-motion";

export const BSLSSLVisual = () => {
  return (
    <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
      {/* Price Candles (simplified) */}
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* BSL Line (Buyside Liquidity - at highs) */}
        <motion.line
          x1="50"
          y1="40"
          x2="350"
          y2="40"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.text
          x="360"
          y="45"
          fill="hsl(190, 100%, 50%)"
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          BSL
        </motion.text>

        {/* SSL Line (Sellside Liquidity - at lows) */}
        <motion.line
          x1="50"
          y1="160"
          x2="350"
          y2="160"
          stroke="hsl(0, 100%, 60%)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.text
          x="360"
          y="165"
          fill="hsl(0, 100%, 60%)"
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          SSL
        </motion.text>

        {/* Simplified Candlesticks */}
        {[80, 120, 160, 200, 240, 280].map((x, i) => {
          const isHigh = i === 2;
          const isLow = i === 4;
          const baseY = 100;
          const height = isHigh ? -50 : isLow ? 50 : (i % 2 === 0 ? -20 : 20);

          return (
            <motion.g key={i}>
              {/* Wick */}
              <motion.line
                x1={x}
                y1={baseY + height}
                x2={x}
                y2={baseY}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.1 }}
              />
              {/* Body */}
              <motion.rect
                x={x - 8}
                y={baseY + (height > 0 ? 0 : height)}
                width="16"
                height={Math.abs(height) * 0.6}
                fill={height < 0 ? "rgba(0,255,0,0.3)" : "rgba(255,0,0,0.3)"}
                stroke={height < 0 ? "rgba(0,255,0,0.6)" : "rgba(255,0,0,0.6)"}
                strokeWidth="1"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.1 }}
              />

              {/* Highlight sweep points */}
              {isHigh && (
                <motion.circle
                  cx={x}
                  cy={40}
                  r="4"
                  fill="hsl(190, 100%, 50%)"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />
              )}
              {isLow && (
                <motion.circle
                  cx={x}
                  cy={160}
                  r="4"
                  fill="hsl(0, 100%, 60%)"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Arrows showing liquidity pools */}
        <motion.path
          d="M 165 30 L 165 45"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arrowhead-cyan)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        />
        <motion.path
          d="M 245 170 L 245 155"
          stroke="hsl(0, 100%, 60%)"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arrowhead-red)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        />

        {/* Arrow markers */}
        <defs>
          <marker
            id="arrowhead-cyan"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(190, 100%, 50%)" />
          </marker>
          <marker
            id="arrowhead-red"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(0, 100%, 60%)" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 right-4 flex gap-4 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-cyan-400"></div>
          <span className="text-cyan-400">BSL = Stops above</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-red-400"></div>
          <span className="text-red-400">SSL = Stops below</span>
        </div>
      </div>
    </div>
  );
};
