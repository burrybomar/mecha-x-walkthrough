import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Info, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IndicatorExplainerProps {
  title: string;
  what: string;
  why: string;
  howToRead: {
    element: string;
    meaning: string;
    action?: string;
  }[];
  visualExample?: React.ReactNode;
  beforeAfter?: {
    before: React.ReactNode;
    after: React.ReactNode;
  };
}

export const IndicatorExplainer = ({
  title,
  what,
  why,
  howToRead,
  visualExample,
  beforeAfter,
}: IndicatorExplainerProps) => {
  const [showBefore, setShowBefore] = useState(false);
  const [activeElement, setActiveElement] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-bold text-primary font-mono uppercase tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5" />
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-primary font-medium">WHAT:</span> {what}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-primary font-medium">WHY:</span> {why}
          </p>
        </div>
      </div>

      {/* How to Read Section */}
      <Card className="p-4 border-primary/20 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold text-primary uppercase font-mono">How to Read</h4>
        </div>
        <div className="space-y-2">
          {howToRead.map((item, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded border transition-all duration-200 cursor-pointer ${
                activeElement === index
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
              }`}
              onClick={() => setActiveElement(activeElement === index ? null : index)}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-3">
                <Badge className="mt-0.5 bg-primary/20 text-primary border-primary/30 text-[10px] font-mono">
                  {item.element}
                </Badge>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {item.meaning}
                  </p>
                  {item.action && (
                    <p className="text-[11px] text-primary font-mono">
                      → {item.action}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Visual Example */}
      {visualExample && (
        <Card className="p-6 border-primary/20 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm">
          <h4 className="text-xs font-bold text-primary uppercase font-mono mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Visual Example
          </h4>
          {visualExample}
        </Card>
      )}

      {/* Before/After Toggle */}
      {beforeAfter && (
        <Card className="p-4 border-primary/20 bg-black/40 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-primary uppercase font-mono">
              {showBefore ? "Before" : "After"} Indicator
            </h4>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowBefore(!showBefore)}
              className="h-7 gap-2 text-xs border-primary/30 hover:bg-primary/10"
            >
              {showBefore ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {showBefore ? "Show With Indicator" : "Show Without Indicator"}
            </Button>
          </div>
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={showBefore ? "before" : "after"}
                initial={{ opacity: 0, x: showBefore ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: showBefore ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {showBefore ? beforeAfter.before : beforeAfter.after}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      )}
    </motion.div>
  );
};
