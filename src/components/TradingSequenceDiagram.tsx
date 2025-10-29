import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Target, Zap, TrendingUp, Eye } from 'lucide-react';

export const TradingSequenceDiagram = () => {
  const sequence = [
    {
      step: 1,
      title: 'HTF Analysis',
      icon: <Eye className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Identify HTF structure on 4H/Daily',
      details: ['Draw BSL/SSL levels', 'Mark HTF candle highs/lows', 'Determine HTF bias'],
    },
    {
      step: 2,
      title: 'Session Setup',
      icon: <Target className="w-5 h-5" />,
      color: 'from-pink-500 to-rose-500',
      description: 'Wait for key session (London/NYAM/NYPM)',
      details: ['H1: Setup phase', 'Identify session range', 'Wait for Silver Bullet window'],
    },
    {
      step: 3,
      title: 'Liquidity Sweep',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-500',
      description: 'Price sweeps BSL/SSL',
      details: ['Valid sweep: Price reverses', 'Check SMT divergence', 'C2 label marks reversal'],
    },
    {
      step: 4,
      title: 'CISD + Entry',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-orange-500 to-amber-500',
      description: 'CISD forms, enter on retest',
      details: ['CISD level = entry zone', 'Look for iFVG confluence', 'Wait for H3/H4 delivery'],
    },
  ];

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center">MECHA-X Trading Sequence</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sequence.map((item, i) => (
            <div key={i}>
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-bold text-lg`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <ul className="space-y-1">
                    {item.details.map((detail, j) => (
                      <li key={j} className="text-xs flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {i < sequence.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <h4 className="font-semibold text-sm mb-2">Key Connections:</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><strong className="text-foreground">HTF → LTF:</strong> HTF sweeps provide direction, LTF sweeps provide entries</li>
            <li><strong className="text-foreground">Sweep → CISD:</strong> Valid sweep creates CISD level for retest entries</li>
            <li><strong className="text-foreground">CISD → iFVG:</strong> Best entries when CISD aligns with iFVG zone</li>
            <li><strong className="text-foreground">Session → Phase:</strong> H1-H4 models guide when to enter (H2 SB, H3 catalyst, H4 delivery)</li>
            <li><strong className="text-foreground">SMT + Sweep:</strong> SMT divergence at sweep = high-confidence reversal</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
