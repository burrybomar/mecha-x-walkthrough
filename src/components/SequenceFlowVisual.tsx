import { motion } from "framer-motion";

export const SequenceFlowVisual = () => {
  return (
    <div className="relative h-80 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-6 font-mono overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 600 280">
        {/* C1 - Pre-Swing (Liquidity Level) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.rect
            x="50"
            y="140"
            width="15"
            height="60"
            fill="rgba(100, 100, 100, 0.3)"
            stroke="rgba(150, 150, 150, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.line
            x1="57"
            y1="130"
            x2="57"
            y2="200"
            stroke="rgba(150, 150, 150, 0.5)"
            strokeWidth="1.5"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.25 }}
          />
          <motion.text
            x="57"
            y="220"
            fill="rgba(150, 150, 150, 0.9)"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            C1
          </motion.text>
          <motion.text
            x="57"
            y="235"
            fill="rgba(150, 150, 150, 0.7)"
            fontSize="9"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Pre-Swing
          </motion.text>

          {/* BSL Line at C1 high */}
          <motion.line
            x1="40"
            y1="130"
            x2="580"
            y2="130"
            stroke="hsl(190, 100%, 50%)"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
          <motion.text
            x="590"
            y="135"
            fill="hsl(190, 100%, 50%)"
            fontSize="10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2 }}
          >
            BSL
          </motion.text>
        </motion.g>

        {/* C2 - Sweep Candle */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Wick going above BSL */}
          <motion.line
            x1="157"
            y1="100"
            x2="157"
            y2="200"
            stroke="rgba(255, 0, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.9 }}
          />
          {/* Body closes back inside */}
          <motion.rect
            x="145"
            y="145"
            width="24"
            height="55"
            fill="rgba(255, 0, 100, 0.3)"
            stroke="rgba(255, 0, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.0 }}
          />
          <motion.text
            x="157"
            y="220"
            fill="rgba(255, 0, 100, 0.9)"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            C2
          </motion.text>
          <motion.text
            x="157"
            y="235"
            fill="rgba(255, 0, 100, 0.7)"
            fontSize="9"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Sweep
          </motion.text>

          {/* Highlight sweep above BSL */}
          <motion.circle
            cx="157"
            cy="100"
            r="5"
            fill="hsl(190, 100%, 50%)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />

          {/* Arrow pointing to sweep */}
          <motion.path
            d="M 180 110 L 165 105"
            stroke="hsl(190, 100%, 50%)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowhead-sweep)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          />
          <motion.text
            x="185"
            y="112"
            fill="hsl(190, 100%, 50%)"
            fontSize="9"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            Liquidity Sweep
          </motion.text>
        </motion.g>

        {/* Momentum Candles (2 candles) */}
        {[
          { x: 210, y: 110, h: 40, label: "M1" },
          { x: 260, y: 90, h: 50, label: "M2" },
        ].map((candle, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.2 }}
          >
            <motion.line
              x1={candle.x}
              y1={candle.y}
              x2={candle.x}
              y2={candle.y + candle.h + 20}
              stroke="rgba(0, 255, 100, 0.6)"
              strokeWidth="1.5"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.9 + i * 0.2 }}
            />
            <motion.rect
              x={candle.x - 10}
              y={candle.y}
              width="20"
              height={candle.h}
              fill="rgba(0, 255, 100, 0.3)"
              stroke="rgba(0, 255, 100, 0.8)"
              strokeWidth="2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2.0 + i * 0.2 }}
            />
            <motion.text
              x={candle.x}
              y={candle.y - 8}
              fill="rgba(0, 255, 100, 0.7)"
              fontSize="9"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 + i * 0.2 }}
            >
              {candle.label}
            </motion.text>
          </motion.g>
        ))}

        {/* CISD Line (at close of last momentum candle) */}
        <motion.line
          x1="250"
          y1="90"
          x2="500"
          y2="90"
          stroke="hsl(190, 100%, 50%)"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
        <motion.text
          x="510"
          y="95"
          fill="hsl(190, 100%, 50%)"
          fontSize="11"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          CISD
        </motion.text>

        {/* C3 - Expansion Candle */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <motion.line
            x1="320"
            y1="50"
            x2="320"
            y2="100"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 2.9 }}
          />
          <motion.rect
            x="308"
            y="50"
            width="24"
            height="45"
            fill="rgba(0, 255, 100, 0.4)"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 3.0 }}
          />
          <motion.text
            x="320"
            y="220"
            fill="rgba(0, 255, 100, 0.9)"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
          >
            C3
          </motion.text>
          <motion.text
            x="320"
            y="235"
            fill="rgba(0, 255, 100, 0.7)"
            fontSize="9"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3 }}
          >
            Expansion
          </motion.text>
        </motion.g>

        {/* C4 - Target Reached */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <motion.line
            x1="380"
            y1="30"
            x2="380"
            y2="70"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 3.6 }}
          />
          <motion.rect
            x="368"
            y="30"
            width="24"
            height="35"
            fill="rgba(0, 255, 100, 0.5)"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 3.7 }}
          />
          <motion.text
            x="380"
            y="220"
            fill="rgba(0, 255, 100, 0.9)"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.9 }}
          >
            C4
          </motion.text>
          <motion.text
            x="380"
            y="235"
            fill="rgba(0, 255, 100, 0.7)"
            fontSize="9"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.0 }}
          >
            Target
          </motion.text>

          {/* Target star */}
          <motion.circle
            cx="380"
            cy="20"
            r="8"
            fill="hsl(50, 100%, 50%)"
            stroke="white"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 4.2, duration: 0.5 }}
          />
        </motion.g>

        {/* Flow Arrow */}
        <motion.path
          d="M 70 260 L 400 260"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead-flow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
        />

        {/* Arrow markers */}
        <defs>
          <marker
            id="arrowhead-sweep"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(190, 100%, 50%)" />
          </marker>
          <marker
            id="arrowhead-flow"
            markerWidth="12"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <polygon points="0 0, 12 4, 0 8" fill="rgba(255, 255, 255, 0.3)" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 right-4 text-[10px] space-y-0.5">
        <p className="text-gray-300 font-semibold">Complete Sequence Flow:</p>
        <p className="text-gray-400">C1 → C2 (Sweep) → Momentum → CISD Entry → C3 (Confirm) → C4 (Target)</p>
      </div>
    </div>
  );
};
