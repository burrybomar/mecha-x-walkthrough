import { AnimatedCandlestickBackground } from "@/components/AnimatedCandlestickBackground";
import { Hero } from "@/components/landing/Hero";
import { Framework } from "@/components/landing/Framework";
import { Features } from "@/components/landing/Features";
import { HowToRead } from "@/components/landing/HowToRead";
import { UseCases } from "@/components/landing/UseCases";
import { Configuration } from "@/components/landing/Configuration";
import { FAQSection } from "@/components/landing/FAQSection";
import { LearnAccess } from "@/components/landing/LearnAccess";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <AnimatedCandlestickBackground variant="mixed" speed="slow" opacity={0.3} />

            <main className="relative z-10 flex flex-col">
                <Hero />
                <Framework />
                <Features />
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
