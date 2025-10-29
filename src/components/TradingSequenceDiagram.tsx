import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Target, Zap, TrendingUp, Eye } from 'lucide-react';

export const TradingSequenceDiagram = () => {
  const sequence = [
    {
      step: 1,
      title: 'HTF Analysis',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      description: 'Mark 4H/Daily BSL/SSL levels',
    },
    {
      step: 2,
      title: 'Session Window',
      icon: Target,
      color: 'from-pink-500 to-rose-500',
      description: 'Wait for H2 Silver Bullet hour',
    },
    {
      step: 3,
      title: 'Sweep + C2',
      icon: Zap,
      color: 'from-emerald-500 to-teal-500',
      description: 'Valid sweep reverses, C2 forms',
    },
    {
      step: 4,
      title: 'CISD Entry',
      icon: TrendingUp,
      color: 'from-orange-500 to-amber-500',
      description: 'Enter on retest, target H3/H4',
    },
  ];

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-lg">Trading Sequence Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sequence.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-all hover-scale">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-bold text-sm`}>
                    {item.step}
                  </div>
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
                  </div>
                </div>
                {i < sequence.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <h4 className="font-semibold text-sm mb-3 text-center">How Everything Connects</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-background/50">
              <strong className="text-primary">HTF → LTF:</strong> <span className="text-muted-foreground">Direction from HTF, entries from LTF</span>
            </div>
            <div className="p-2 rounded bg-background/50">
              <strong className="text-primary">Sweep → CISD:</strong> <span className="text-muted-foreground">Valid sweep creates entry level</span>
            </div>
            <div className="p-2 rounded bg-background/50">
              <strong className="text-primary">CISD → iFVG:</strong> <span className="text-muted-foreground">Confluence = highest probability</span>
            </div>
            <div className="p-2 rounded bg-background/50">
              <strong className="text-primary">H2 → Entry:</strong> <span className="text-muted-foreground">Silver Bullet = optimal window</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
