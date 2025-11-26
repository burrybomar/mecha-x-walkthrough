import { motion } from "framer-motion";

export const PremiumDiscountVisual = () => {
  return (
    <div className="relative h-80 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-6 font-mono">
      <svg className="w-full h-full" viewBox="0 0 500 280">
        {/* Price Range Box */}
        <motion.rect
          x="100"
          y="40"
          width="300"
          height="200"
          fill="rgba(50, 50, 50, 0.1)"
          stroke="rgba(150, 150, 150, 0.3)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* High */}
        <motion.line
          x1="80"
          y1="40"
          x2="420"
          y2="40"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />
        <motion.text
          x="430"
          y="45"
          fill="rgba(255, 255, 255, 0.6)"
          fontSize="11"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          High
        </motion.text>

        {/* Equilibrium (50%) */}
        <motion.line
          x1="80"
          y1="140"
          x2="420"
          y2="140"
          stroke="hsl(50, 100%, 50%)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
        <motion.text
          x="430"
          y="145"
          fill="hsl(50, 100%, 50%)"
          fontSize="12"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          EQ (50%)
        </motion.text>

        {/* Low */}
        <motion.line
          x1="80"
          y1="240"
          x2="420"
          y2="240"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        <motion.text
          x="430"
          y="245"
          fill="rgba(255, 255, 255, 0.6)"
          fontSize="11"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Low
        </motion.text>

        {/* Premium Zone (Above EQ) */}
        <motion.rect
          x="100"
          y="40"
          width="300"
          height="100"
          fill="rgba(255, 0, 100, 0.15)"
          stroke="rgba(255, 0, 100, 0.4)"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        />
        <motion.text
          x="250"
          y="75"
          fill="rgba(255, 0, 100, 0.9)"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          PREMIUM
        </motion.text>
        <motion.text
          x="250"
          y="95"
          fill="rgba(255, 0, 100, 0.7)"
          fontSize="11"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          Expensive - Look for SHORTS
        </motion.text>

        {/* Discount Zone (Below EQ) */}
        <motion.rect
          x="100"
          y="140"
          width="300"
          height="100"
          fill="rgba(0, 255, 100, 0.15)"
          stroke="rgba(0, 255, 100, 0.4)"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        />
        <motion.text
          x="250"
          y="175"
          fill="rgba(0, 255, 100, 0.9)"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          DISCOUNT
        </motion.text>
        <motion.text
          x="250"
          y="195"
          fill="rgba(0, 255, 100, 0.7)"
          fontSize="11"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          Cheap - Look for LONGS
        </motion.text>

        {/* Price Example - Moving from premium to discount */}
        {[
          { x: 150, y: 60, label: "P" },
          { x: 180, y: 80, label: "" },
          { x: 210, y: 100, label: "" },
          { x: 240, y: 130, label: "EQ" },
          { x: 270, y: 160, label: "" },
          { x: 300, y: 180, label: "" },
          { x: 330, y: 200, label: "D" },
        ].map((point, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={point.y < 140 ? "rgba(255, 0, 100, 0.6)" : "rgba(0, 255, 100, 0.6)"}
              stroke="white"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.15, duration: 0.3 }}
            />
            {i < 6 && (
              <motion.line
                x1={point.x}
                y1={point.y}
                x2={[180, 210, 240, 270, 300, 330][i]}
                y2={[80, 100, 130, 160, 180, 200][i]}
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2 + i * 0.15, duration: 0.15 }}
              />
            )}
            {point.label && (
              <motion.text
                x={point.x}
                y={point.y - 10}
                fill="white"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 + i * 0.15 }}
              >
                {point.label}
              </motion.text>
            )}
          </motion.g>
        ))}

        {/* Arrows showing bias */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          {/* Short bias in premium */}
          <path
            d="M 50 70 L 50 110"
            stroke="rgba(255, 0, 100, 0.8)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead-short)"
          />
          <text
            x="30"
            y="80"
            fill="rgba(255, 0, 100, 0.9)"
            fontSize="10"
            fontWeight="bold"
            transform="rotate(-90 30 80)"
          >
            SHORT
          </text>

          {/* Long bias in discount */}
          <path
            d="M 50 210 L 50 170"
            stroke="rgba(0, 255, 100, 0.8)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead-long)"
          />
          <text
            x="30"
            y="200"
            fill="rgba(0, 255, 100, 0.9)"
            fontSize="10"
            fontWeight="bold"
            transform="rotate(-90 30 200)"
          >
            LONG
          </text>
        </motion.g>

        {/* Arrow markers */}
        <defs>
          <marker
            id="arrowhead-short"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255, 0, 100, 0.8)" />
          </marker>
          <marker
            id="arrowhead-long"
            markerWidth="10"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(0, 255, 100, 0.8)" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-4 right-4 space-y-1 text-[10px]">
        <p className="text-gray-300 font-semibold">Premium/Discount Concept:</p>
        <p className="text-gray-400">Price above EQ (50%) = Premium = Look to SELL</p>
        <p className="text-gray-400">Price below EQ (50%) = Discount = Look to BUY</p>
      </div>
    </div>
  );
};
