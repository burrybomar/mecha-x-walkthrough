import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Activity, Layers, ShieldCheck, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCandlestickBackground } from "@/components/AnimatedCandlestickBackground";

const Index = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-12 relative overflow-hidden">
            <AnimatedCandlestickBackground variant="mixed" speed="slow" />
            <div className="space-y-6 max-w-3xl relative z-10">
                <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    MECHA-X
                </h1>
                <p className="text-xl text-muted-foreground">
                    Master the mechanical trading system. Precision. Logic. Execution.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link to="/knowledge">
                        <Button size="lg" className="gap-2">
                            Start Learning <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link to="/setup">
                        <Button size="lg" variant="outline">
                            System Setup
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                <Link to="/fractal-model" className="group">
                    <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 h-full text-left space-y-4">
                        <div className="p-3 rounded-lg bg-blue-500/10 w-fit group-hover:bg-blue-500/20 transition-colors">
                            <Layers className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold">The Framework</h3>
                        <p className="text-muted-foreground">
                            Master the Fractal Model: 4H Canvas + 1H Trigger. The core theory.
                        </p>
                    </div>
                </Link>

                <Link to="/sequences" className="group">
                    <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 h-full text-left space-y-4">
                        <div className="p-3 rounded-lg bg-green-500/10 w-fit group-hover:bg-green-500/20 transition-colors">
                            <Activity className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold">Sequences</h3>
                        <p className="text-muted-foreground">
                            Step-by-step execution guides for Continuation, Reversal, and Aligned setups.
                        </p>
                    </div>
                </Link>

                <Link to="/c2-patterns" className="group">
                    <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 h-full text-left space-y-4">
                        <div className="p-3 rounded-lg bg-purple-500/10 w-fit group-hover:bg-purple-500/20 transition-colors">
                            <LineChart className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold">C2 Patterns</h3>
                        <p className="text-muted-foreground">
                            Deep dive into C2 sweep variations, PSP & CIC SMT types, and mechanical rules.
                        </p>
                    </div>
                </Link>

                <Link to="/checklist" className="group">
                    <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 h-full text-left space-y-4">
                        <div className="p-3 rounded-lg bg-orange-500/10 w-fit group-hover:bg-orange-500/20 transition-colors">
                            <ShieldCheck className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-semibold">Pre-Flight Checklist</h3>
                        <p className="text-muted-foreground">
                            Daily routine and confirmation checklist before taking any trade.
                        </p>
                    </div>
                </Link>
            </div >
        </div >
    );
};

export default Index;
