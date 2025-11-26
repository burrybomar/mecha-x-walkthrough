import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
    const faqs = [
        {
            q: "Does this indicator give buy/sell signals?",
            a: "No. Mecha-X is a market structure visualization tool. It highlights mechanical conditions (Sweeps, C2 Closures) based on the framework. You must execute the trade based on your own plan and risk management."
        },
        {
            q: "What is the 'Mechanical' Sequence?",
            a: "It is the repetitive cycle of price delivery: Expansion → Retracement → Reversal → Expansion. Mecha-X identifies exactly where price is within this cycle using objective candle definitions."
        },
        {
            q: "Does it work on all markets?",
            a: "Yes. The logic of liquidity (Draw on Liquidity) and market structure is fractal and applies to all liquid markets, including Forex, Futures, Crypto, and Indices."
        },
        {
            q: "Is this a 'Get Rich Quick' system?",
            a: "Absolutely not. Trading carries significant risk. This framework provides a logical way to interpret data, but profitability requires discipline, patience, and strict risk management."
        },
        {
            q: "Do I need to know the educators mentioned?",
            a: "While Mecha-X visualizes the concepts, we highly recommend studying the source material (TTrades, MMXM Trader, Eleven_Trades) to understand the 'why' behind the logic."
        },
        {
            q: "Does the indicator repaint?",
            a: "No. Once a Higher Time Frame (HTF) candle closes and a condition (like a C2 sweep) is confirmed, it is permanent. Real-time mode shows developing patterns, but confirmed labels do not change."
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
