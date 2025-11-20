import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-trading-grid flex items-center justify-center p-4">
      <div className="glass-premium p-8 md:p-12 rounded-xl border-primary/10 text-center max-w-lg w-full relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/20 mb-4 font-mono">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Signal Lost</h2>
        <p className="text-muted-foreground mb-8">
          The requested coordinate could not be found in the current fractal.
        </p>
        
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-bold hover:bg-primary/90 transition-colors"
        >
          RETURN_HOME
        </a>
      </div>
    </div>
  );
};

export default NotFound;
