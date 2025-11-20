import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const labelTypes = [
  {
    label: "C2-REV",
    formation: "REVERSAL",
    meaning: "Sweep + Close Inside + Reversal Pattern",
    color: "hsl(190, 100%, 50%)",
    description: "Price swept liquidity, closed back inside, and showed strong reversal momentum",
    strength: "★★★",
  },
  {
    label: "C2-SNAP",
    formation: "SNAPBACK",
    meaning: "Quick Violent Reversal After Sweep",
    color: "hsl(280, 100%, 60%)",
    description: "Aggressive immediate reversal - highest probability setup",
    strength: "★★★★★",
  },
  {
    label: "C2-EXP",
    formation: "EXPANSION",
    meaning: "Sweep + Expansion Into New Range",
    color: "hsl(45, 100%, 60%)",
    description: "Sweep followed by range expansion - continuation signal",
    strength: "★★★",
  },
  {
    label: "C3",
    formation: "EXPANSION",
    meaning: "Candle After C2 - Confirms Direction",
    color: "hsl(120, 100%, 50%)",
    description: "Third candle confirming the C2 reversal - entry trigger",
    strength: "★★★★",
  },
];

export const C2LabelDecoder = () => {
  const [selectedLabel, setSelectedLabel] = useState(0);

  return (
    <div className="space-y-4">
      {/* Label Grid */}
      <div className="grid grid-cols-2 gap-3">
        {labelTypes.map((type, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedLabel(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedLabel === index
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                : "border-border/50 bg-black/40 hover:border-primary/50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Badge
              className="mb-2 font-mono text-[10px]"
              style={{
                backgroundColor: type.color + "33",
                borderColor: type.color,
                color: type.color,
              }}
            >
              {type.label}
            </Badge>
            <p className="text-xs font-medium text-foreground mb-1">{type.formation}</p>
            <p className="text-[10px] text-muted-foreground">{type.meaning}</p>
          </motion.button>
        ))}
      </div>

      {/* Detailed Explanation */}
      <motion.div
        key={selectedLabel}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-lg border border-primary/30 bg-gradient-to-br from-black/60 to-primary/5"
      >
        <div className="flex items-start justify-between mb-3">
          <Badge
            className="font-mono text-xs"
            style={{
              backgroundColor: labelTypes[selectedLabel].color + "33",
              borderColor: labelTypes[selectedLabel].color,
              color: labelTypes[selectedLabel].color,
            }}
          >
            {labelTypes[selectedLabel].label}
          </Badge>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground">Strength:</span>
            <span className="text-sm" style={{ color: labelTypes[selectedLabel].color }}>
              {labelTypes[selectedLabel].strength}
            </span>
          </div>
        </div>

        <p className="text-sm text-foreground font-medium mb-2">
          {labelTypes[selectedLabel].formation}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          {labelTypes[selectedLabel].description}
        </p>

        {/* Visual Pattern */}
        <div className="bg-black/40 rounded p-3">
          <div className="flex items-center justify-center gap-2 h-16">
            {selectedLabel === 0 && (
              <>
                {/* REV pattern: sweep down, close inside, reversal up */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-8 bg-red-500/30 rounded"></div>
                  <div className="text-[8px] text-red-400">SWEEP</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-6 bg-cyan-500/50 rounded"></div>
                  <div className="text-[8px] text-cyan-400">CLOSE IN</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-10 bg-green-500/70 rounded"></div>
                  <div className="text-[8px] text-green-400">REVERSAL</div>
                </div>
              </>
            )}
            {selectedLabel === 1 && (
              <>
                {/* SNAP pattern: sweep, immediate violent reversal */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-6 bg-red-500/30 rounded"></div>
                  <div className="text-[8px] text-red-400">SWEEP</div>
                </div>
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <div className="w-3 h-12 bg-purple-500/80 rounded"></div>
                  <div className="text-[8px] text-purple-400 font-bold">SNAP!</div>
                </motion.div>
              </>
            )}
            {selectedLabel === 2 && (
              <>
                {/* EXP pattern: sweep, expansion range */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-6 bg-red-500/30 rounded"></div>
                  <div className="text-[8px] text-red-400">SWEEP</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-8 bg-yellow-500/50 rounded"></div>
                  <div className="text-[8px] text-yellow-400">EXPAND</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-10 bg-yellow-500/70 rounded"></div>
                  <div className="text-[8px] text-yellow-400">CONTINUE</div>
                </div>
              </>
            )}
            {selectedLabel === 3 && (
              <>
                {/* C3 pattern: C2 + expansion candle */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-8 bg-cyan-500/50 rounded"></div>
                  <div className="text-[8px] text-cyan-400">C2</div>
                </div>
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <div className="w-3 h-10 bg-green-500/70 rounded"></div>
                  <div className="text-[8px] text-green-400 font-bold">C3 →</div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
