import { motion } from "framer-motion";

export const CISDVisual = () => {
  return (
    <div className="relative bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 space-y-3">
      {/* Chart Visual */}
      <svg className="w-full h-48" viewBox="0 0 400 150">
        {/* Price movement */}
        <motion.path
          d="M 50 100 L 80 95 L 110 90 L 140 120 L 170 60 L 200 70 L 230 75 L 260 80 L 290 85 L 320 90"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {/* C2 Sweep Point */}
        <motion.circle
          cx="140"
          cy="120"
          r="5"
          fill="hsl(0, 100%, 60%)"
          stroke="hsl(0, 100%, 60%)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
        <motion.text
          x="140"
          y="140"
          textAnchor="middle"
          fill="hsl(0, 100%, 60%)"
          fontSize="10"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          C2 SWEEP
        </motion.text>

        {/* Momentum candles */}
        {[
          { x: 170, y: 60, height: 40 },
          { x: 190, y: 65, height: 35 },
          { x: 210, y: 72, height: 28 },
        ].map((candle, i) => (
          <motion.g key={i}>
            <motion.rect
              x={candle.x - 6}
              y={candle.y}
              width="12"
              height={candle.height}
              fill="hsl(190, 100%, 50%)"
              fillOpacity="0.3"
              stroke="hsl(190, 100%, 50%)"
              strokeWidth="1.5"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 1 + i * 0.2 }}
            />
            {i === 0 && (
              <motion.text
                x={candle.x}
                y={candle.y - 5}
                textAnchor="middle"
                fill="hsl(190, 100%, 50%)"
                fontSize="8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                MOMENTUM
              </motion.text>
            )}
          </motion.g>
        ))}

        {/* CISD Line */}
        <motion.line
          x1="50"
          y1="72"
          x2="350"
          y2="72"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="2.5"
          strokeDasharray="4,4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        />

        {/* CISD Label */}
        <motion.rect
          x="240"
          y="62"
          width="60"
          height="20"
          fill="hsl(190, 100%, 50%)"
          fillOpacity="0.2"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="1"
          rx="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5, type: "spring" }}
        />
        <motion.text
          x="270"
          y="76"
          textAnchor="middle"
          fill="hsl(190, 100%, 50%)"
          fontSize="11"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7 }}
        >
          CISD
        </motion.text>

        {/* Target Lines */}
        {[
          { y: 50, label: "T4 (4x)", delay: 3 },
          { y: 60, label: "T2 (2x)", delay: 3.2 },
          { y: 70, label: "T1 (1x)", delay: 3.4 },
        ].map((target, i) => (
          <motion.g key={i}>
            <motion.line
              x1="250"
              y1={target.y}
              x2="350"
              y2={target.y}
              stroke="hsl(120, 100%, 50%)"
              strokeWidth="1"
              strokeDasharray="2,2"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: target.delay, duration: 0.4 }}
            />
            <motion.text
              x="355"
              y={target.y + 4}
              fill="hsl(120, 100%, 50%)"
              fontSize="8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: target.delay + 0.2 }}
            >
              {target.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Entry Arrow */}
        <motion.path
          d="M 220 85 L 220 72"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="2"
          markerEnd="url(#entry-arrow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8 }}
        />
        <motion.text
          x="225"
          y="88"
          fill="hsl(190, 100%, 50%)"
          fontSize="10"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          ENTRY
        </motion.text>

        <defs>
          <marker
            id="entry-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
          >
            <polygon points="0 0, 10 5, 0 10" fill="hsl(190, 100%, 50%)" />
          </marker>
        </defs>
      </svg>

      {/* Explanation Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] font-mono">
        <motion.div
          className="p-2 bg-red-500/10 border border-red-500/30 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2 }}
        >
          <span className="text-red-400 font-bold">1. C2 SWEEP</span>
          <p className="text-muted-foreground mt-1">Liquidity grab confirmed</p>
        </motion.div>
        <motion.div
          className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4 }}
        >
          <span className="text-cyan-400 font-bold">2. MOMENTUM</span>
          <p className="text-muted-foreground mt-1">Reversal candles form</p>
        </motion.div>
        <motion.div
          className="p-2 bg-green-500/10 border border-green-500/30 rounded"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6 }}
        >
          <span className="text-green-400 font-bold">3. CISD = ENTRY</span>
          <p className="text-muted-foreground mt-1">Close of last momentum</p>
        </motion.div>
      </div>
    </div>
  );
};
