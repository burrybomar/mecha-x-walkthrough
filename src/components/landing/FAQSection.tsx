import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
    const faqs = [
        {
            q: "What is this framework based on?",
            a: "The mechanical sequence concepts come from TTrades, MMXM Trader's Next Day Model, and Eleven_Trades' 4H Candle Profiling. Mecha-X is a visualization tool built by OmarxQQQ that plots these concepts on the chart."
        },
        {
            q: "Does it repaint?",
            a: "No. Once a C2 is confirmed on a closed HTF candle, it doesn't change. Real-time mode shows developing patterns that may change before the candle closes."
        },
        {
            q: "What markets does it work on?",
            a: "Any market on TradingView. The mechanical sequence is fractal — the same rules apply across timeframes and instruments."
        },
        {
            q: "What timeframes should I use?",
            a: "Auto mode handles this. The framework is designed to be fractal: the same HTF → LTF confirmation logic works at any scale."
        },
        {
            q: "Why no \"signals\" or \"alerts for entries\"?",
            a: "Mecha-X shows you the mechanical sequence. It doesn't tell you to buy or sell. The framework teaches that you need to understand what you're looking at, not follow arrows."
        },
        {
            q: "Is this the same as [other methodology]?",
            a: "No. While the educators who teach these concepts may have learned from similar sources, Mecha-X specifically visualizes the TTrades/MMXM/Eleven_Trades approach to the mechanical sequence. It's not an \"ICT indicator\" or \"SMC indicator\" — it's a visualization of this specific framework."
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">FAQ</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-left text-lg font-medium">
                            {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};
