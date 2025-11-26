import { AnimatedCandlestickBackground } from "@/components/AnimatedCandlestickBackground";
import { Hero } from "@/components/landing/Hero";
import { Framework } from "@/components/landing/Framework";
import { HowToRead } from "@/components/landing/HowToRead";
import { UseCases } from "@/components/landing/UseCases";
import { Configuration } from "@/components/landing/Configuration";
import { FAQSection } from "@/components/landing/FAQSection";
import { LearnAccess } from "@/components/landing/LearnAccess";
import { Footer } from "@/components/landing/Footer";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { Layers, Target, Activity, ArrowRight, AlertCircle, Settings } from "lucide-react";

const Index = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <AnimatedCandlestickBackground variant="mixed" speed="slow" opacity={0.3} />

            <main className="relative z-10 flex flex-col">
                <Hero />
                <Framework />
                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={Layers}
                        title="HTF Structure"
                        description="Auto-mapping of HTF Dividers and Sweeps directly on your LTF chart. Never lose sight of the higher timeframes."
                        link="/features#htf"
                        color="primary"
                    />
                    <FeatureCard
                        icon={Target}
                        title="Smart Liquidity"
                        description="Intelligent BSL/SSL awareness. Distinguishes between Current Timeframe and HTF liquidity automatically."
                        link="/features#liquidity"
                        color="accent"
                    />
                    <FeatureCard
                        icon={Activity}
                        title="Context & Alignment"
                        description="Auto Timeframe Alignment and detailed C2 Labels with time & direction. Know your bias instantly."
                        link="/features#context"
                        color="purple-400"
                    />
                    <FeatureCard
                        icon={ArrowRight}
                        title="MTF CISD"
                        description="Multi-Timeframe Change in State of Delivery. Maps 15m CISD from 4H sweeps. Includes Retest Types."
                        link="/features#cisd"
                        color="green-400"
                    />
                    <FeatureCard
                        icon={AlertCircle}
                        title="Alert System"
                        description="Formation and Invalidation alerts. Never miss a setup, never hold a loser."
                        link="/alerts"
                        color="orange-400"
                    />
                    <FeatureCard
                        icon={Settings}
                        title="Configuration"
                        description="Master the inputs. Auto-HTF modes, visual settings, and customization."
                        link="/setup"
                        color="gray-400"
                    />
                </div>
                <HowToRead />
                <UseCases />
                <Configuration />
                <FAQSection />
                <LearnAccess />
            </main>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Index;
