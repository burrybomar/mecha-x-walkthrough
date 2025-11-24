import { motion } from "framer-motion";

export const HTFVisual = () => {
    return (
        <div className="relative w-full h-48 bg-card/50 rounded-lg overflow-hidden border border-border/50 p-4 flex items-center justify-center">
            {/* Grid Background */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-4 gap-2 opacity-10 pointer-events-none">
                {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border-r border-b border-white/20" />
                ))}
            </div>

            <div className="relative w-full max-w-xs h-32">
                {/* HTF Candle (Ghosted Background) */}
                <motion.div
                    className="absolute left-1/4 right-1/4 top-4 bottom-8 bg-primary/10 border border-primary/30 rounded-sm z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Wicks */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-4 h-4 w-0.5 bg-primary/30" />
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 h-4 w-0.5 bg-primary/30" />

                    {/* Label */}
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] font-mono text-primary/50 rotate-90">
                        4H CANDLE
                    </div>
                </motion.div>

                {/* LTF Candles (Foreground) */}
                <div className="absolute inset-0 flex items-end justify-between px-8 z-10">
                    {[40, 60, 45, 70, 55, 80, 65, 50].map((h, i) => (
                        <motion.div
                            key={i}
                            className={`w-2 rounded-sm ${i % 2 === 0 ? 'bg-primary' : 'bg-destructive'}`}
                            style={{ height: `${h}%`, marginBottom: `${Math.random() * 20}%` }}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        />
                    ))}
                </div>
            </div>

            {/* Context Label */}
            <div className="absolute top-2 left-2 px-2 py-1 bg-background/50 backdrop-blur rounded border border-white/10 text-[10px] font-mono text-muted-foreground">
                1H Chart (LTF) inside 4H Context (HTF)
            </div>
        </div>
    );
};
