import { HTFCanvasVisual } from "@/components/visuals/HTFCanvasVisual";
import { BSLSSLVisual } from "@/components/visuals/BSLSSLVisual";
import { C2LabelsVisual } from "@/components/visuals/C2LabelsVisual";
import { CISDVisual } from "@/components/visuals/CISDVisual";
import { SMTVisual } from "@/components/visuals/SMTVisual";
import { motion } from "framer-motion";

const FeatureSection = ({ title, subtitle, description, children, align = "left" }: any) => (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 ${align === "right" ? "lg:grid-flow-dense" : ""}`}>
        <div className={`space-y-6 ${align === "right" ? "lg:col-start-2" : ""}`}>
            <div className="space-y-2">
                <h3 className="text-3xl font-bold">{title}</h3>
                {subtitle && <p className="text-xl text-primary font-medium">{subtitle}</p>}
            </div>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
                {description}
            </div>
        </div>
        <div className={`relative ${align === "right" ? "lg:col-start-1" : ""}`}>
            <div className="glass-panel p-2 rounded-xl border border-black/5 overflow-hidden">
                {children}
            </div>
        </div>
    </div>
);

export const Features = () => {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">Every Element Has a Purpose</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Mecha-X doesn't add indicators. It visualizes the mechanical sequence taught by TTrades, MMXM, and Eleven_Trades.
                </p>
            </div>

            <div className="space-y-12">
                <FeatureSection
                    title="HTF Candle Display"
                    subtitle="See the 4H structure while executing on lower timeframes"
                    description={
                        <>
                            <p>
                                Mecha-X projects up to 4 HTF timeframes directly on your chart. You see the candle structure without switching tabs.
                            </p>
                            <ul className="list-disc list-inside space-y-1 mt-4">
                                <li>Which 4H candle created the swing point (C1)</li>
                                <li>Which 4H candle swept it (C2)</li>
                                <li>Whether the next candle is expanding (C3)</li>
                            </ul>
                        </>
                    }
                >
                    <HTFCanvasVisual />
                </FeatureSection>

                <FeatureSection
                    title="Sweep Detection & BSL/SSL Lines"
                    subtitle="The C2 moment"
                    align="right"
                    description={
                        <>
                            <p>
                                When an HTF candle sweeps the high or low of the previous candle, Mecha-X marks it.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                                <div className="bg-secondary/50 p-3 rounded border border-black/5">
                                    <div className="font-bold text-primary">BSL</div>
                                    <div className="text-xs">Buy Side Liquidity</div>
                                </div>
                                <div className="bg-secondary/50 p-3 rounded border border-black/5">
                                    <div className="font-bold text-primary">SSL</div>
                                    <div className="text-xs">Sell Side Liquidity</div>
                                </div>
                            </div>
                            <p>
                                <strong>The Strike System:</strong> Not every sweep holds. Mecha-X tracks when price breaks back through to prevent you from holding onto a dead setup.
                            </p>
                        </>
                    }
                >
                    <BSLSSLVisual />
                </FeatureSection>

                <FeatureSection
                    title="C2 Formation Labels"
                    subtitle="Not all sweeps are equal"
                    description={
                        <>
                            <p>The framework distinguishes how C2 closes relative to C1:</p>
                            <ul className="space-y-4 mt-4">
                                <li>
                                    <strong className="text-primary">SNAP (⚡H→S↓)</strong>
                                    <br />Swept and immediately rejected to the opposite extreme. Highest conviction.
                                </li>
                                <li>
                                    <strong className="text-primary">REV (⚡L→R↑)</strong>
                                    <br />Swept and closed back inside the range. Standard reversal.
                                </li>
                                <li>
                                    <strong className="text-primary">EXP (⚡H→E↓)</strong>
                                    <br />Swept and body engulfed C1's entire range. This is expansion, not reversal.
                                </li>
                            </ul>
                        </>
                    }
                >
                    <C2LabelsVisual />
                </FeatureSection>

                <FeatureSection
                    title="CISD — Change in State of Delivery"
                    subtitle="Where delivery shifted"
                    align="right"
                    description={
                        <>
                            <p>
                                CISD confirms that the underlying order flow has actually shifted direction.
                                Mecha-X detects the momentum candles leading into C2 and marks the CISD level.
                            </p>
                            <p className="mt-4">
                                <strong>Projection Targets:</strong> Standard deviation projections from the manipulation leg (C2 move). The 2.0-2.5 zone is highlighted as the primary target area.
                            </p>
                        </>
                    }
                >
                    <CISDVisual />
                </FeatureSection>

                <FeatureSection
                    title="SMT — Correlated Asset Divergence"
                    subtitle="When correlated markets disagree"
                    description={
                        <>
                            <p>
                                If you're trading ES and NQ makes a higher high while ES fails to — that's divergence. Mecha-X tracks this automatically.
                            </p>
                            <div className="mt-4 p-4 bg-secondary/50 rounded-lg font-mono text-sm border border-black/5">
                                <div>SMT-</div>
                                <div>[NQ·YM]</div>
                                <div className="text-muted-foreground mt-2 text-xs">
                                    Bearish divergence. NQ & YM failed to confirm.
                                </div>
                            </div>
                        </>
                    }
                >
                    <SMTVisual />
                </FeatureSection>
            </div>
        </section>
    );
};
