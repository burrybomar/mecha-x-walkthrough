import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import continuationSuccess from "@/assets/continuation-sequence.jpg";
import reversalSuccess from "@/assets/reversal-sequence.jpg";
import alignedSuccess from "@/assets/aligned-sequence.jpg";
import continuationFailed from "@/assets/failed-continuation.jpg";
import reversalFailed from "@/assets/failed-reversal.jpg";
import alignedFailed from "@/assets/failed-aligned.jpg";

const sequences = [
  {
    id: "continuation",
    title: "Continuation Sequence",
    successImage: continuationSuccess,
    failedImage: continuationFailed,
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
    successImage: reversalSuccess,
    failedImage: reversalFailed,
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
    successImage: alignedSuccess,
    failedImage: alignedFailed,
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Chart Comparison Tool</h1>
          <p className="text-muted-foreground text-lg">
            Compare successful setups with failed examples to understand critical differences
          </p>
        </div>

        <div className="grid gap-6">
          {/* Sequence Selector */}
          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeSequence} onValueChange={setActiveSequence}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="continuation">Continuation</TabsTrigger>
                  <TabsTrigger value="reversal">Reversal</TabsTrigger>
                  <TabsTrigger value="aligned">Aligned</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* View Mode Toggle */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "success" ? "default" : "outline"}
                  onClick={() => setViewMode("success")}
                  className="flex-1"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Success Only
                </Button>
                <Button
                  variant={viewMode === "both" ? "default" : "outline"}
                  onClick={() => setViewMode("both")}
                  className="flex-1"
                >
                  Side by Side
                </Button>
                <Button
                  variant={viewMode === "failed" ? "default" : "outline"}
                  onClick={() => setViewMode("failed")}
                  className="flex-1"
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
                <Card className="overflow-hidden">
                  <div className="bg-success/10 px-6 py-4 border-b border-success/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <h2 className="text-xl font-semibold">Successful {currentSequence.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <img
                      src={currentSequence.successImage}
                      alt={`Successful ${currentSequence.title}`}
                      className="w-full rounded-lg mb-4"
                    />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-success mb-2">✓ What Makes This Work:</h3>
                      {currentSequence.successPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground/80">{point}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {(viewMode === "failed" || viewMode === "both") && (
                <Card className="overflow-hidden">
                  <div className="bg-destructive/10 px-6 py-4 border-b border-destructive/20">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <h2 className="text-xl font-semibold">Failed {currentSequence.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <img
                      src={currentSequence.failedImage}
                      alt={`Failed ${currentSequence.title}`}
                      className="w-full rounded-lg mb-4"
                    />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-destructive mb-2">✗ Critical Mistakes:</h3>
                      {currentSequence.failurePoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground/80">{point}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Key Takeaways */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
              <div className="space-y-3">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-medium text-primary mb-1">Pattern Recognition</p>
                  <p className="text-sm text-muted-foreground">
                    Study both successful and failed setups to train your eye for the subtle differences that matter
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-medium text-primary mb-1">Confirmation is Critical</p>
                  <p className="text-sm text-muted-foreground">
                    Failed trades often result from missing confirmations - never skip the LTF swing structure
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-medium text-primary mb-1">Context Matters</p>
                  <p className="text-sm text-muted-foreground">
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
