import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Download, BookOpen, Video, Users, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedPriceAction } from "@/components/AnimatedPriceAction";
import { CandlestickCard } from "@/components/CandlestickCard";
import { CandlestickButton } from "@/components/CandlestickButton";

interface Resource {
  title: string;
  description: string;
  category: "Tools" | "Learning" | "Community" | "Practice";
  icon: React.ElementType;
  link?: string;
  badge?: string;
}

const resources: Resource[] = [
  {
    title: "MECHA-X TradingView Indicator",
    description: "Automates HTF levels, sweeps, CISD zones, and setup detection. Will add live examples soon.",
    category: "Tools",
    icon: Zap,
    badge: "Essential"
  },
  {
    title: "TradingView Platform",
    description: "Charting platform. Free tier works, Premium adds more indicators and alerts.",
    category: "Tools",
    icon: TrendingUp,
    link: "https://www.tradingview.com"
  },
  {
    title: "The Framework",
    description: "Core theory: 4H Canvas + 1H Trigger. Start here.",
    category: "Learning",
    icon: BookOpen,
    badge: "Start Here",
    link: "/fractal-model"
  },
  {
    title: "Setup Configuration",
    description: "Indicator settings walkthrough.",
    category: "Learning",
    icon: BookOpen,
    link: "/setup"
  },
  {
    title: "Chart Examples",
    description: "Real setups: HTF analysis, sweeps, CISD zones.",
    category: "Learning",
    icon: BookOpen,
    link: "/chart-examples"
  },
  {
    title: "Glossary",
    description: "BSL, SSL, CISD, iFVG, C2, SMT—all terms explained.",
    category: "Learning",
    icon: BookOpen,
    link: "/glossary"
  },
  {
    title: "Pre-Trade Checklist",
    description: "Checklist, session timing, risk rules.",
    category: "Practice",
    icon: Download,
    link: "/checklist"
  },
  {
    title: "Trade Journal",
    description: "Log setups: HTF bias, sweep type, entry, exit, RR.",
    category: "Practice",
    icon: Download,
    badge: "Recommended",
    link: "/trade-journal"
  },
  {
    title: "MECHA-X Discord",
    description: "Share setups, ask questions, get feedback.",
    category: "Community",
    icon: Users,
    badge: "Free"
  },
  {
    title: "FAQ",
    description: "Common questions on timeframes, risk, mistakes.",
    category: "Learning",
    icon: BookOpen,
    link: "/faq"
  }
];

const Resources = () => {
  const navigate = useNavigate();
  const categories = Array.from(new Set(resources.map(r => r.category)));

  const platformLinks = [
    { name: "TradingView", url: "https://www.tradingview.com", description: "Professional charting platform for OHLC analysis" }
  ];

  const learningPath = [
    { step: 1, task: "Study the Framework (Fractal Model)", time: "1-2 hours" },
    { step: 2, task: "Configure MECHA-X indicator", time: "30 mins" },
    { step: 3, task: "Study Chart Examples gallery", time: "1-2 hours" },
    { step: 4, task: "Mark up 20 historical setups", time: "3-4 hours" },
    { step: 5, task: "Paper trade 50 setups", time: "2-4 weeks" },
    { step: 6, task: "Go live with micro contracts", time: "1-2 months" },
    { step: 7, task: "Scale up as consistency builds", time: "Ongoing" }
  ];

  return (
    <div className="min-h-screen bg-chart-dots">{/* Header */}
      <motion.header
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate("/")}
              className="text-xs"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back
            </CandlestickButton>
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
          className="text-center mb-12 relative overflow-hidden"
        >
          <AnimatedPriceAction />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="text-foreground text-3xl md:text-5xl">In One Place</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
              Tools, guides, practice platforms.
            </p>
          </div>
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
                            resource.link.startsWith('http') ? (
                              <Button variant="outline" size="sm" className="w-full gap-2 font-mono" asChild>
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                  View Resource
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" className="w-full gap-2 font-mono" onClick={() => navigate(resource.link!)}>
                                View Resource
                              </Button>
                            )
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
              Build foundations before risking real money.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">Charting Platform</h2>
          <div className="grid gap-4 max-w-2xl">
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
                      Visit Platform
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
