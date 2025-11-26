import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Target, Activity, Clock, Zap, Layers } from "lucide-react";
import { AnimatedCandlestickBackground } from "@/components/AnimatedCandlestickBackground";
import { useNavigate } from "react-router-dom";

const Knowledge = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("phase1");

    const phases = [
        {
            id: "phase1",
            title: "Phase 1: Universal Model",
            icon: Target,
            shortDesc: "KL to DL",
            content: (
                <div className="space-y-6">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <h3 className="font-bold text-lg mb-2 text-primary">The Foundation: Point A to Point B</h3>
                        <p className="text-muted-foreground">
                            The market moves from a <strong>Key Level (KL)</strong> to a <strong>Draw on Liquidity (DL)</strong>.
                            A reversal is <em>only</em> anticipated after price engages the Key Level.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-card/50 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-base">1. Breakout Model</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <strong>1H BSL/SSL → 4H/Daily SSL/BSL</strong>
                                <br />
                                Price trades into the 1H liquidity (Internal Range) and targets the opposing 4H/Daily liquidity (External Range).
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-base">2. Reversal Model</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <strong>4H/Daily SSL/BSL → 1H BSL/SSL</strong>
                                <br />
                                Price sweeps the External Range (4H/Daily), fails to continue, and reverses back to the Internal Range (1H).
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-base">3. Manipulation Range</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <strong>Swing Low → Swing High</strong>
                                <br />
                                Price dips below a clear swing low (manipulation), reverses, and expands toward the opposing swing high.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
        },
        {
            id: "phase2",
            title: "Phase 2: Confirmation",
            icon: Activity,
            shortDesc: "Mechanical Rules",
            content: (
                <div className="space-y-6">
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <h3 className="font-bold text-lg mb-2 text-blue-400">Mechanical Confirmation</h3>
                        <p className="text-muted-foreground">
                            Once the Key Level is engaged, we need proof. We use <strong>CISD (Candle/Swing Definitions)</strong> to confirm the reversal.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Three Confirmation Types:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="font-bold text-primary mb-1">1. C2 Closure</div>
                                <p className="text-sm text-muted-foreground">Price hits KL but fails to close within Candle 1's range. Suggests immediate reversal.</p>
                            </div>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="font-bold text-primary mb-1">2. C3 Closure</div>
                                <p className="text-sm text-muted-foreground">If C2 fails to confirm, C3 must close over/under C2's open. Enter on C4.</p>
                            </div>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="font-bold text-primary mb-1">3. C2 Reversion</div>
                                <p className="text-sm text-muted-foreground">Small wick on C2 indicating direct reversal into expansion.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <h3 className="font-bold text-lg mb-2 text-red-400">Invalidation: The EQ Rule</h3>
                        <p className="text-muted-foreground">
                            Expansion requires <strong>shallow retracements</strong>. If price hits the <strong>Equilibrium (EQ)</strong> (50%) of the previous candle, it creates a large wick. This invalidates the expansion signature.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: "phase3",
            title: "Phase 3: Alignment",
            icon: Layers,
            shortDesc: "Fractal Timing",
            content: (
                <div className="space-y-6">
                    <p className="text-lg text-muted-foreground">
                        Refining the Key Level using gaps and fractal alignment. We align the Lower Time Frame (LTF) model with the Higher Time Frame (HTF) Draw on Liquidity.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-card/50 border-white/10">
                            <CardHeader>
                                <CardTitle>Daily Continuation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Look for a <strong>4-hour gap</strong> within the previous day's range.
                                </p>
                                <div className="h-2 w-full bg-gradient-to-r from-primary/20 to-transparent rounded-full" />
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-white/10">
                            <CardHeader>
                                <CardTitle>4-Hour Continuation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Look for a <strong>1H or 30m gap</strong> within the previous 4H range.
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    This gap causes the reversal and forms the wick of the 4H candle.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-bold mb-2">Candle Phases</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li><strong>Protraction Phase:</strong> Forms the wick. Expected to conclude at the refined KL.</li>
                            <li><strong>Expansion Phase:</strong> Forms the body. Seek shallow retracements near the open.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: "phase4",
            title: "Phase 4: Sessions",
            icon: Clock,
            shortDesc: "Time & Flow",
            content: (
                <div className="space-y-6">
                    <div className="text-center p-6 bg-card/50 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-2">The Directional Flow Rule</h3>
                        <p className="text-lg text-primary">"If the previous session reversed, then the next session should continue."</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="p-2 bg-purple-500/20 rounded text-purple-400 font-bold text-sm min-w-[80px] text-center">ASIA<br />18:00</div>
                            <div>
                                <h4 className="font-bold">The Setup / Reversal</h4>
                                <p className="text-sm text-muted-foreground">Often establishes the high/low of the day. Its expansion creates gaps for the next session.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="p-2 bg-blue-500/20 rounded text-blue-400 font-bold text-sm min-w-[80px] text-center">LONDON<br />02:00</div>
                            <div>
                                <h4 className="font-bold">The Continuation</h4>
                                <p className="text-sm text-muted-foreground">Executes the move using Asia's gaps. A "London Reversal" sets up New York.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="p-2 bg-orange-500/20 rounded text-orange-400 font-bold text-sm min-w-[80px] text-center">NEW YORK<br />07:00</div>
                            <div>
                                <h4 className="font-bold">New Phase / Retracement</h4>
                                <p className="text-sm text-muted-foreground">If prior sessions expanded, expect retracement. Key times: 10:30 AM, 12:00 PM.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "phase5",
            title: "Phase 5: Execution",
            icon: Zap,
            shortDesc: "SMT Trigger",
            content: (
                <div className="space-y-6">
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h3 className="font-bold text-lg mb-2 text-green-400">The Trigger: SMT Sequence</h3>
                        <p className="text-muted-foreground">
                            We allow the reversal to occur first. When price reaches the refined gap, we use SMT (Smart Money Technique) to confirm entry.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" /> Reversal Signature
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Must see a <strong>V-shaped signature</strong> on LTF inside the reversal candle.
                                <br />
                                <em>Expansion into KL → Reversal → Expansion away.</em>
                                <br />
                                <span className="text-red-400 text-xs">No V-shape = Low Probability.</span>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2">
                                <Layers className="w-4 h-4 text-primary" /> Strength Switch SMT
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Leading asset hits DL. Lagging asset switches to weaker strength to chase the target. This confirms expansion.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-card/50 rounded-xl border border-white/10 text-center">
                        <h3 className="text-xl font-bold mb-2">The Result</h3>
                        <p className="text-muted-foreground">
                            A mechanical, repetitive process aligning Key Levels, Time, and Correlation for the highest probability trades.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <AnimatedCandlestickBackground variant="mixed" speed="slow" opacity={0.2} />

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
                <div className="mb-8">
                    <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all" onClick={() => navigate('/')}>
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
                    </Button>
                </div>

                <div className="space-y-8 mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        The Mecha-X Sequence
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        A complete, mechanical, simple, and logical approach to trading.
                        Fractal and applicable across any time frame.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card/30 p-6 rounded-xl border border-white/5">
                        <div>
                            <h3 className="font-semibold text-primary mb-2">Core Concept</h3>
                            <p className="text-sm text-muted-foreground">Price moves from a <strong>Key Level (KL)</strong> to a <strong>Draw on Liquidity (DL)</strong>.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary mb-2">Terminology</h3>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li><strong>IRL:</strong> 1H BSL/SSL</li>
                                <li><strong>ERL:</strong> 4H/Daily SSL/BSL</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="phase1" className="space-y-8" onValueChange={setActiveTab}>
                    <div className="overflow-x-auto pb-4 -mx-4 px-4 md:px-0 scrollbar-none">
                        <TabsList className="inline-flex h-auto p-1 bg-card/50 border border-white/10 rounded-xl w-auto min-w-full md:min-w-0 justify-start md:justify-center">
                            {phases.map((phase) => {
                                const Icon = phase.icon;
                                return (
                                    <TabsTrigger
                                        key={phase.id}
                                        value={phase.id}
                                        className="flex flex-col items-center gap-2 py-4 px-6 rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all min-w-[120px]"
                                    >
                                        <Icon className="w-6 h-6" />
                                        <div className="text-center">
                                            <div className="font-bold text-sm">{phase.title.split(":")[0]}</div>
                                            <div className="text-xs opacity-70">{phase.shortDesc}</div>
                                        </div>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>

                    <div className="min-h-[400px]">
                        {phases.map((phase) => (
                            <TabsContent key={phase.id} value={phase.id} className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle className="text-2xl md:text-3xl">{phase.title}</CardTitle>
                                            <CardDescription className="text-lg">{phase.shortDesc}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6 md:p-8">
                                            {phase.content}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>

                <div className="mt-12 flex justify-between items-center">
                    <Button
                        variant="outline"
                        disabled={activeTab === "phase1"}
                        onClick={() => {
                            const idx = phases.findIndex(p => p.id === activeTab);
                            if (idx > 0) setActiveTab(phases[idx - 1].id);
                        }}
                    >
                        Previous Phase
                    </Button>

                    <Button
                        onClick={() => {
                            const idx = phases.findIndex(p => p.id === activeTab);
                            if (idx < phases.length - 1) {
                                setActiveTab(phases[idx + 1].id);
                            } else {
                                navigate('/sequences');
                            }
                        }}
                    >
                        {activeTab === "phase5" ? "Explore Sequences" : "Next Phase"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Knowledge;
