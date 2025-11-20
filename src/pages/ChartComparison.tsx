import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

import { SequenceDiagram } from "@/components/diagrams/SequenceDiagram";

const sequences = [
  {
    id: "continuation",
    title: "Continuation Sequence",
    successData: [
      { time: '1', price: 102 },
      { time: '2', price: 103 },
      { time: '3', price: 105 },
      { time: '4', price: 107 },
      { time: '5', price: 109 },
      { time: '6', price: 112 },
      { time: '7', price: 115 },
      { time: '8', price: 118 },
    ],
    failedData: [
      { time: '1', price: 102 },
      { time: '2', price: 103 },
      { time: '3', price: 102 },
      { time: '4', price: 100 },
      { time: '5', price: 98 },
      { time: '6', price: 96 },
      { time: '7', price: 94 },
      { time: '8', price: 92 },
    ],
    successLevels: [
      { y: 102, label: 'Swing Low', color: '#3b82f6', description: 'LTF swing confirmed - entry point' },
      { y: 105, label: 'Entry', color: '#10b981', description: 'Break of structure confirms continuation' },
      { y: 118, label: 'Target', color: '#8b5cf6', description: 'Premium zone objective' }
    ],
    failedLevels: [
      { y: 103, label: 'Failed Entry', color: '#ef4444', description: 'Entry in premium - wrong zone' },
      { y: 92, label: 'Loss', color: '#dc2626', description: 'Reversal against position' }
    ],
    successPoints: [
      "4H bullish candle forms in discount zone",
      "Clear LTF swing low confirms structure",
      "Entry on break of swing high",
      "Premium zone target clearly defined"
    ],
    failurePoints: [
      "Entry taken in premium zone instead of discount",
      "No clear LTF swing structure formed",
      "Premature entry without confirmation",
      "Immediate reversal against position"
    ]
  },
  {
    id: "reversal",
    title: "Reversal Sequence",
    successData: [
      { time: '1', price: 100 },
      { time: '2', price: 105 },
      { time: '3', price: 108 },
      { time: '4', price: 112 },
      { time: '5', price: 110 },
      { time: '6', price: 106 },
      { time: '7', price: 102 },
      { time: '8', price: 98 },
    ],
    failedData: [
      { time: '1', price: 100 },
      { time: '2', price: 105 },
      { time: '3', price: 108 },
      { time: '4', price: 112 },
      { time: '5', price: 114 },
      { time: '6', price: 116 },
      { time: '7', price: 119 },
      { time: '8', price: 122 },
    ],
    successLevels: [
      { y: 112, label: 'BSL Sweep', color: '#f59e0b', description: 'Liquidity sweep at premium - C2 pattern' },
      { y: 110, label: 'Swing High', color: '#3b82f6', description: 'LTF reversal structure confirmed' },
      { y: 106, label: 'Entry', color: '#10b981', description: 'Break below swing low' },
      { y: 98, label: 'Target', color: '#8b5cf6', description: 'Discount zone objective' }
    ],
    failedLevels: [
      { y: 112, label: 'No Sweep', color: '#ef4444', description: 'Failed to sweep BSL - no C2' },
      { y: 122, label: 'Continuation', color: '#dc2626', description: 'No reversal - continued higher' }
    ],
    successPoints: [
      "4H distribution candle sweeps liquidity at premium",
      "Clean LTF swing high forms during 4H candle",
      "Entry on break below swing low",
      "Discount zone target identified"
    ],
    failurePoints: [
      "No liquidity sweep on 4H candle",
      "LTF swing structure unclear or messy",
      "Entry without proper distribution confirmation",
      "Continuation move instead of reversal"
    ]
  },
  {
    id: "aligned",
    title: "Aligned Sequence",
    successData: [
      { time: '1', price: 95 },
      { time: '2', price: 98 },
      { time: '3', price: 102 },
      { time: '4', price: 106 },
      { time: '5', price: 110 },
      { time: '6', price: 114 },
      { time: '7', price: 118 },
      { time: '8', price: 122 },
    ],
    failedData: [
      { time: '1', price: 100 },
      { time: '2', price: 102 },
      { time: '3', price: 99 },
      { time: '4', price: 103 },
      { time: '5', price: 101 },
      { time: '6', price: 104 },
      { time: '7', price: 100 },
      { time: '8', price: 98 },
    ],
    successLevels: [
      { y: 95, label: 'C3 Realignment', color: '#3b82f6', description: 'Price realigns with HTF bias' },
      { y: 102, label: 'Entry', color: '#10b981', description: 'C3 continuation zone holds' },
      { y: 122, label: 'Target', color: '#8b5cf6', description: 'HTF expansion continues' }
    ],
    failedLevels: [
      { y: 102, label: 'No Alignment', color: '#ef4444', description: 'HTF and LTF not aligned' },
      { y: 98, label: 'HTF Pressure', color: '#dc2626', description: 'Counter-trend fails' }
    ],
    successPoints: [
      "All timeframes aligned in same direction",
      "HTF provides strong directional bias",
      "4H confirms HTF with proper candle",
      "LTF swing validates entry timing"
    ],
    failurePoints: [
      "Timeframes not aligned - fighting HTF bias",
      "Taking counter-trend trade against higher timeframe",
      "4H bullish but Daily still bearish",
      "HTF pressure overwhelms the trade"
    ]
  }
];

export default function ChartComparison() {
  const navigate = useNavigate();
  const [activeSequence, setActiveSequence] = useState("continuation");
  const [viewMode, setViewMode] = useState<"success" | "failed" | "both">("both");

  const currentSequence = sequences.find(s => s.id === activeSequence);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-primary/10 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-glow">Chart Comparison Tool</h1>
          <p className="text-muted-foreground text-lg">
            Compare successful setups with failed examples to understand critical differences
          </p>
        </div>

        <div className="grid gap-6">
          {/* Sequence Selector */}
          <Card className="glass-panel border-white/5">
            <CardContent className="pt-6">
              <Tabs value={activeSequence} onValueChange={setActiveSequence}>
                <TabsList className="grid w-full grid-cols-3 bg-muted/20">
                  <TabsTrigger value="continuation" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Continuation</TabsTrigger>
                  <TabsTrigger value="reversal" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Reversal</TabsTrigger>
                  <TabsTrigger value="aligned" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Aligned</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* View Mode Toggle */}
          <Card className="glass-panel border-white/5">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "success" ? "default" : "outline"}
                  onClick={() => setViewMode("success")}
                  className={`flex-1 ${viewMode === "success" ? "bg-success/20 text-success hover:bg-success/30 border-success/50" : "border-white/10 hover:bg-white/5"}`}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Success Only
                </Button>
                <Button
                  variant={viewMode === "both" ? "default" : "outline"}
                  onClick={() => setViewMode("both")}
                  className={`flex-1 ${viewMode === "both" ? "bg-primary/20 text-primary hover:bg-primary/30 border-primary/50" : "border-white/10 hover:bg-white/5"}`}
                >
                  Side by Side
                </Button>
                <Button
                  variant={viewMode === "failed" ? "default" : "outline"}
                  onClick={() => setViewMode("failed")}
                  className={`flex-1 ${viewMode === "failed" ? "bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/50" : "border-white/10 hover:bg-white/5"}`}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Failed Only
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Charts Display */}
          {currentSequence && (
            <div className={`grid gap-6 ${viewMode === "both" ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
              {(viewMode === "success" || viewMode === "both") && (
                <Card className="overflow-hidden border border-success/20 glass-card">
                  <div className="bg-success/10 px-6 py-4 border-b border-success/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <h2 className="text-xl font-semibold text-success">Successful {currentSequence.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="aspect-square mb-4 bg-muted/20 rounded-lg p-4 border border-white/5">
                      <SequenceDiagram variant={activeSequence as any} className="w-full h-full" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-success mb-2 font-mono uppercase tracking-wider">✓ What Makes This Work:</h3>
                      {currentSequence.successPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground font-mono">{point}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {(viewMode === "failed" || viewMode === "both") && (
                <Card className="overflow-hidden border border-destructive/20 glass-card">
                  <div className="bg-destructive/10 px-6 py-4 border-b border-destructive/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <h2 className="text-xl font-semibold text-destructive">Failed {currentSequence.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="aspect-square mb-4 bg-muted/20 rounded-lg p-4 border border-white/5">
                      <SequenceDiagram variant={`${activeSequence}-failed` as any} className="w-full h-full" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-destructive mb-2 font-mono uppercase tracking-wider">✗ Critical Mistakes:</h3>
                      {currentSequence.failurePoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground font-mono">{point}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Key Takeaways */}
          <Card className="glass-panel border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Key Takeaways</h3>
              <div className="space-y-3">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
                  <p className="font-medium text-primary mb-1">Pattern Recognition</p>
                  <p className="text-sm text-gray-400">
                    Study both successful and failed setups to train your eye for the subtle differences that matter
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
                  <p className="font-medium text-primary mb-1">Confirmation is Critical</p>
                  <p className="text-sm text-gray-400">
                    Failed trades often result from missing confirmations - never skip the LTF swing structure
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
                  <p className="font-medium text-primary mb-1">Context Matters</p>
                  <p className="text-sm text-gray-400">
                    Always check premium/discount zones, HTF bias, and liquidity context before entering
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
