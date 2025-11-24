import { motion } from "framer-motion";

export const SMTVisual = () => {
  return (
    <div className="relative w-full h-48 bg-card/50 rounded-lg overflow-hidden border border-border/50 p-4 flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 opacity-10 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="border-r border-b border-white/20" />
        ))}
      </div>

      <div className="relative w-full max-w-xs h-32 flex justify-between gap-8">
        {/* Asset A (ES) - Making Higher High */}
        <div className="flex-1 relative">
          <div className="absolute top-0 left-0 text-[10px] font-mono text-muted-foreground">ES (Asset A)</div>
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Path: Low -> High -> Higher Low -> Higher High */}
            <motion.path
              d="M0,80 L30,20 L60,50 L100,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            {/* Swing Points */}
            <motion.circle cx="30" cy="20" r="3" className="fill-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
            <motion.circle cx="100" cy="0" r="3" className="fill-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />

            {/* Label */}
            <motion.text x="100" y="-10" textAnchor="middle" className="fill-primary text-[8px] font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>HH</motion.text>
          </svg>
        </div>

        {/* Divider */}
        <div className="w-px h-full bg-border/50 dashed" />

        {/* Asset B (NQ) - Failing to make Higher High (SMT) */}
        <div className="flex-1 relative">
          <div className="absolute top-0 left-0 text-[10px] font-mono text-muted-foreground">NQ (Asset B)</div>
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Path: Low -> High -> Higher Low -> Lower High (Failure) */}
            <motion.path
              d="M0,80 L30,20 L60,50 L100,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-destructive"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            {/* Swing Points */}
            <motion.circle cx="30" cy="20" r="3" className="fill-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
            <motion.circle cx="100" cy="30" r="3" className="fill-destructive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />

            {/* Label */}
            <motion.text x="100" y="20" textAnchor="middle" className="fill-destructive text-[8px] font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>LH (SMT)</motion.text>
          </svg>
        </div>
      </div>

      {/* SMT Label */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-destructive/20 text-destructive border border-destructive/30 px-2 py-0.5 rounded text-[10px] font-bold font-mono"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, repeat: Infinity, repeatDelay: 3, repeatType: "reverse" }}
      >
        BEARISH SMT DETECTED
      </motion.div>
    </div>
  );
};
