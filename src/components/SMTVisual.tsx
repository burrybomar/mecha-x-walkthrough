import { motion } from "framer-motion";

export const SMTVisual = () => {
  return (
    <div className="relative h-96 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-6 font-mono">
      <svg className="w-full h-full" viewBox="0 0 600 320">
        {/* Title */}
        <motion.text
          x="50"
          y="30"
          fill="rgba(255, 255, 255, 0.9)"
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Binary Mode (ES vs NQ)
        </motion.text>

        {/* ES Chart - Sweeps high */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <text x="60" y="60" fill="hsl(190, 100%, 50%)" fontSize="11" fontWeight="bold">
            ES
          </text>

          {/* ES Candles */}
          {[
            { x: 60, y: 120, h: 30 },
            { x: 90, y: 100, h: 40 },
            { x: 120, y: 90, h: 35 },
            { x: 150, y: 75, h: 50 }, // Sweep candle
            { x: 180, y: 95, h: 30 },
          ].map((candle, i) => (
            <motion.g key={i}>
              <motion.rect
                x={candle.x - 8}
                y={candle.y}
                width="16"
                height={candle.h}
                fill={i === 3 ? "rgba(255, 0, 100, 0.3)" : "rgba(0, 255, 100, 0.3)"}
                stroke={i === 3 ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)"}
                strokeWidth="2"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              />
            </motion.g>
          ))}

          {/* Sweep line */}
          <motion.line
            x1="50"
            y1="85"
            x2="200"
            y2="85"
            stroke="hsl(0, 100%, 60%)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          />
          <motion.text
            x="210"
            y="90"
            fill="hsl(0, 100%, 60%)"
            fontSize="10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Sweeps
          </motion.text>

          {/* Highlight sweep */}
          <motion.circle
            cx="150"
            cy="75"
            r="5"
            fill="hsl(0, 100%, 60%)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 1.8, duration: 0.5 }}
          />
        </motion.g>

        {/* NQ Chart - Doesn't sweep (PSP Divergence) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <text x="310" y="60" fill="hsl(280, 100%, 60%)" fontSize="11" fontWeight="bold">
            NQ
          </text>

          {/* NQ Candles - doesn't reach the same level */}
          {[
            { x: 310, y: 115, h: 30 },
            { x: 340, y: 95, h: 40 },
            { x: 370, y: 90, h: 35 },
            { x: 400, y: 85, h: 40 }, // Falls short
            { x: 430, y: 100, h: 30 },
          ].map((candle, i) => (
            <motion.g key={i}>
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
                transition={{ delay: 2.2 + i * 0.1 }}
              />
            </motion.g>
          ))}

          {/* Line showing it doesn't sweep */}
          <motion.line
            x1="300"
            y1="85"
            x2="450"
            y2="85"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          />
          <motion.text
            x="460"
            y="90"
            fill="rgba(150, 150, 150, 0.6)"
            fontSize="10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.1 }}
          >
            Doesn't Sweep
          </motion.text>
        </motion.g>

        {/* PSP Divergence Label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <rect
            x="200"
            y="50"
            width="100"
            height="30"
            fill="rgba(255, 200, 0, 0.2)"
            stroke="rgba(255, 200, 0, 0.8)"
            strokeWidth="2"
            rx="5"
          />
          <text
            x="250"
            y="72"
            fill="rgba(255, 200, 0, 1)"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            PSP ⟐
          </text>
        </motion.g>

        {/* Divider */}
        <motion.line
          x1="50"
          y1="180"
          x2="550"
          y2="180"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 4, duration: 0.8 }}
        />

        {/* Triad Mode Title */}
        <motion.text
          x="50"
          y="210"
          fill="rgba(255, 255, 255, 0.9)"
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
        >
          Triad Mode (ES vs NQ vs RTY)
        </motion.text>

        {/* Three mini charts for Triad */}
        {[
          { x: 80, y: 240, label: "ES", color: "hsl(190, 100%, 50%)", sweeps: true },
          { x: 250, y: 240, label: "NQ", color: "hsl(280, 100%, 60%)", sweeps: false },
          { x: 420, y: 240, label: "RTY", color: "hsl(50, 100%, 50%)", sweeps: false },
        ].map((asset, idx) => (
          <motion.g
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 + idx * 0.2 }}
          >
            <text
              x={asset.x}
              y={asset.y - 10}
              fill={asset.color}
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
            >
              {asset.label}
            </text>

            {/* Mini candles */}
            {[0, 20, 40].map((offset, i) => (
              <motion.rect
                key={i}
                x={asset.x - 20 + offset}
                y={asset.sweeps && i === 2 ? asset.y - 10 : asset.y}
                width="8"
                height={asset.sweeps && i === 2 ? 30 : 20}
                fill={asset.sweeps && i === 2 ? "rgba(255, 0, 100, 0.3)" : "rgba(0, 255, 100, 0.3)"}
                stroke={asset.sweeps && i === 2 ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)"}
                strokeWidth="1.5"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 4.7 + idx * 0.2 + i * 0.05 }}
              />
            ))}

            {/* Sweep indicator */}
            {asset.sweeps ? (
              <motion.circle
                cx={asset.x}
                cy={asset.y - 20}
                r="3"
                fill="hsl(0, 100%, 60%)"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ delay: 5.5, duration: 0.5 }}
              />
            ) : (
              <motion.line
                x1={asset.x - 25}
                y1={asset.y - 15}
                x2={asset.x + 25}
                y2={asset.y - 15}
                stroke="rgba(100, 100, 100, 0.5)"
                strokeWidth="1"
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 5.3, duration: 0.4 }}
              />
            )}
          </motion.g>
        ))}

        {/* Full Triad Label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6 }}
        >
          <rect
            x="230"
            y="195"
            width="140"
            height="30"
            fill="rgba(255, 100, 0, 0.2)"
            stroke="rgba(255, 100, 0, 0.8)"
            strokeWidth="2"
            rx="5"
          />
          <text
            x="300"
            y="217"
            fill="rgba(255, 100, 0, 1)"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            Full Triad ⟐⟐
          </text>
        </motion.g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 right-4 space-y-1 text-[10px]">
        <p className="text-gray-300 font-semibold">SMT Divergence:</p>
        <p className="text-yellow-400">⟐ Binary PSP = One asset diverges (+10% confidence)</p>
        <p className="text-orange-400">⟐⟐ Full Triad = Both secondaries diverge (+20% confidence)</p>
      </div>
    </div>
  );
};
