import { Link } from "react-router-dom";
import { ResponsiveNav } from "./ResponsiveNav";
import { Terminal } from "lucide-react";

export const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <Terminal className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-wider text-foreground group-hover:text-glow transition-all">
                            MECHA-X
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                            SYSTEM v2.0.5
                        </span>
                    </div>
                </Link>

                {/* Navigation */}
                <ResponsiveNav />
            </div>
        </header>
    );
};
