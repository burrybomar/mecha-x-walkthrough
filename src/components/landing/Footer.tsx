import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-black/20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">About</h3>
                    <p className="text-muted-foreground max-w-md leading-relaxed">
                        Mecha-X is developed by <strong className="text-primary">OmarxQQQ</strong> as a visualization tool for the mechanical trading sequence concepts taught by TTrades, MMXM Trader, and Eleven_Trades.
                    </p>
                    <p className="text-xs text-muted-foreground/60 max-w-md">
                        This is not financial advice. This is not a trading system that generates signals. It's a tool that plots HTF structure, sweep detection, and session context on your chart.
                    </p>
                </div>

                <div className="space-y-4 md:text-right">
                    <h3 className="text-xl font-bold">Links</h3>
                    <nav className="flex flex-col md:items-end gap-2 text-muted-foreground">
                        <Link to="/fractal-model" className="hover:text-primary transition-colors">Documentation</Link>
                        <a href="#" className="hover:text-primary transition-colors">TradingView</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </nav>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
                <p>Mecha-X — The Mechanical Sequence. Visualized.</p>
                <p className="mt-2 opacity-50">Built by OmarxQQQ. Based on concepts from TTrades, MMXM Trader, and Eleven_Trades.</p>
            </div>
        </footer>
    );
};
