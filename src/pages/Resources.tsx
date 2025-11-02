import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Download, BookOpen, Video, Users, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Resource {
  title: string;
  description: string;
  category: "Tools" | "Learning" | "Community" | "Practice";
  icon: any;
  link?: string;
  badge?: string;
}

const resources: Resource[] = [
  {
    title: "MECHA-X TradingView Indicator",
    description: "The official PineScript indicator that automates the entire 6-step framework. Auto-detects HTF levels, sweeps, CISD zones, and more.",
    category: "Tools",
    icon: Zap,
    badge: "Essential",
    link: "#"
  },
  {
    title: "TradingView Platform",
    description: "Professional charting platform. Free tier works fine, Premium adds more indicators and alerts. Required for using the MECHA-X indicator.",
    category: "Tools",
    icon: TrendingUp,
    link: "https://www.tradingview.com"
  },
  {
    title: "Chart Replay Feature",
    description: "Practice on historical data without risking money. TradingView's replay feature lets you 'trade' the past to build pattern recognition.",
    category: "Practice",
    icon: Video,
    link: "https://www.tradingview.com/chart/"
  },
  {
    title: "Knowledge Base (This Site)",
    description: "Complete framework documentation covering every step, concept, and execution rule. Bookmark this for quick reference.",
    category: "Learning",
    icon: BookOpen,
    badge: "Start Here"
  },
  {
    title: "Setup Configuration Guide",
    description: "Step-by-step walkthrough of every indicator setting, explaining what each does and how it automates the framework.",
    category: "Learning",
    icon: BookOpen
  },
  {
    title: "Chart Examples Gallery",
    description: "Real chart screenshots showing HTF analysis, sweeps, CISD zones, and complete trade setups from start to finish.",
    category: "Learning",
    icon: BookOpen
  },
  {
    title: "Trading Glossary",
    description: "Every term and acronym explained: BSL, SSL, CISD, iFVG, C2, SMT, and more. Quick reference for all framework terminology.",
    category: "Learning",
    icon: BookOpen
  },
  {
    title: "Pre-Trade Checklist",
    description: "Downloadable cheatsheet with the complete pre-trade checklist, session timing, risk rules, and common mistakes to avoid.",
    category: "Practice",
    icon: Download
  },
  {
    title: "Paper Trading Account",
    description: "TradingView offers paper trading (simulated money). Practice entries, stops, and targets with zero risk before going live.",
    category: "Practice",
    icon: TrendingUp,
    link: "https://www.tradingview.com/support/solutions/43000481029-paper-trading/"
  },
  {
    title: "Micro Futures Contracts",
    description: "MES (Micro E-mini S&P) and MNQ (Micro Nasdaq) let you trade with $50-$200 risk per trade. Perfect for building confidence.",
    category: "Practice",
    icon: TrendingUp
  },
  {
    title: "Trade Journal Template",
    description: "Notion or Excel template for logging every setup. Track: HTF bias, sweep type, entry, exit, RR, what worked/didn't work.",
    category: "Practice",
    icon: Download,
    badge: "Recommended"
  },
  {
    title: "MECHA-X Discord Community",
    description: "Join other traders using the framework. Share setups, ask questions, get feedback. Learning accelerates with community.",
    category: "Community",
    icon: Users,
    badge: "Free",
    link: "#"
  },
  {
    title: "Framework FAQ",
    description: "20+ frequently asked questions covering everything from timeframes to risk management to common beginner mistakes.",
    category: "Learning",
    icon: BookOpen
  }
];

const Resources = () => {
  const navigate = useNavigate();
  const categories = Array.from(new Set(resources.map(r => r.category)));

  const platformLinks = [
    { name: "TradingView", url: "https://www.tradingview.com", description: "Charting platform" },
    { name: "TastyTrade", url: "https://www.tastytrade.com", description: "Futures broker - low commissions" },
    { name: "Interactive Brokers", url: "https://www.interactivebrokers.com", description: "Professional trading platform" },
    { name: "ThinkOrSwim", url: "https://www.tdameritrade.com/tools-and-platforms/thinkorswim.html", description: "Advanced charting & analysis" }
  ];

  const learningPath = [
    { step: 1, task: "Read complete Knowledge Base", time: "2-3 hours" },
    { step: 2, task: "Configure MECHA-X indicator", time: "30 mins" },
    { step: 3, task: "Study Chart Examples gallery", time: "1-2 hours" },
    { step: 4, task: "Mark up 20 historical setups", time: "3-4 hours" },
    { step: 5, task: "Paper trade 50 setups", time: "2-4 weeks" },
    { step: 6, task: "Go live with micro contracts", time: "1-2 months" },
    { step: 7, task: "Scale up as consistency builds", time: "Ongoing" }
  ];

  return (
    <div className="min-h-screen bg-background bg-candlestick-pattern">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2 font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-medium">Resources</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-foreground text-3xl md:text-5xl">In One Place</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
            Tools, guides, practice platforms, and community—all the resources to master the framework.
          </p>
        </motion.div>

        {/* Resources by Category */}
        <div className="space-y-12 mb-16">
          {categories.map((category, catIdx) => {
            const categoryResources = resources.filter(r => r.category === category);
            
            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  {category}
                </h2>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {categoryResources.map((resource, idx) => {
                    const IconComponent = resource.icon;
                    
                    return (
                      <motion.div
                        key={resource.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Card className="p-5 hover:shadow-lg transition-all h-full flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-5 h-5 text-primary" />
                              </div>
                              <h3 className="font-bold text-base md:text-lg">{resource.title}</h3>
                            </div>
                            {resource.badge && (
                              <Badge variant="secondary" className="font-mono text-xs">
                                {resource.badge}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                            {resource.description}
                          </p>
                          
                          {resource.link && (
                            <Button variant="outline" size="sm" className="w-full gap-2 font-mono" asChild>
                              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                View Resource
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Learning Path */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="p-6 md:p-8 bg-primary/5 border-primary/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">Suggested Learning Path</h2>
            <p className="text-muted-foreground mb-8">
              Follow this sequence to build solid foundations before risking real money.
            </p>
            
            <div className="space-y-3">
              {learningPath.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background/80 border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm md:text-base">{item.task}</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {item.time}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Platform Links */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">Trading Platforms & Brokers</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {platformLinks.map((platform, idx) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-5 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{platform.name}</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{platform.description}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      Visit Site
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resources;
