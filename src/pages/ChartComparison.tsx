import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';

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
                    <div className="aspect-video mb-4 bg-gradient-to-br from-success/5 to-success/10 rounded-lg p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentSequence.successData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.05}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                          <XAxis 
                            dataKey="time" 
                            stroke="rgba(148,163,184,0.3)"
                            tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="rgba(148,163,184,0.3)"
                            tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }}
                            domain={['dataMin - 3', 'dataMax + 3']}
                            axisLine={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="hsl(var(--success))"
                            strokeWidth={3}
                            fill="url(#successGradient)"
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
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
                    <div className="aspect-video mb-4 bg-gradient-to-br from-destructive/5 to-destructive/10 rounded-lg p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentSequence.failedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.05}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                          <XAxis 
                            dataKey="time" 
                            stroke="rgba(148,163,184,0.3)"
                            tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="rgba(148,163,184,0.3)"
                            tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }}
                            domain={['dataMin - 3', 'dataMax + 3']}
                            axisLine={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="hsl(var(--destructive))"
                            strokeWidth={3}
                            fill="url(#failedGradient)"
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
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
