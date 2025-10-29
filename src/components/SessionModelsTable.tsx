import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Zap, Target } from 'lucide-react';

interface SessionData {
  name: string;
  active: boolean;
  timeRemaining: string;
  currentHour: 1 | 2 | 3 | 4 | null;
  hourLabel: string;
  silverBullet: string;
  macro: string;
  phase: 'REVERSAL' | 'EXPANSION' | 'CONSOLIDATION' | 'RETRACEMENT' | 'CONTINUATION';
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export const SessionModelsTable = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessions, setSessions] = useState<SessionData[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getUTCHours();
    const minute = currentTime.getUTCMinutes();

    // London: 2:00-6:00 UTC (4 hours)
    const londonActive = hour >= 2 && hour < 6;
    const londonHour = londonActive ? Math.floor((hour - 2) * 60 + minute) / 60 + 1 : null;
    const londonRemaining = londonActive ? 
      `${5 - hour}h ${60 - minute}m` : 'Closed';

    // NY AM: 13:00-17:00 UTC (4 hours)
    const nyamActive = hour >= 13 && hour < 17;
    const nyamHour = nyamActive ? Math.floor((hour - 13) * 60 + minute) / 60 + 1 : null;
    const nyamRemaining = nyamActive ?
      `${16 - hour}h ${60 - minute}m` : 'Closed';

    // NY PM: 17:00-21:00 UTC (4 hours)
    const nypmActive = hour >= 17 && hour < 21;
    const nypmHour = nypmActive ? Math.floor((hour - 17) * 60 + minute) / 60 + 1 : null;
    const nypmRemaining = nypmActive ?
      `${20 - hour}h ${60 - minute}m` : 'Closed';

    const getHourLabel = (h: number | null): string => {
      if (!h) return '-';
      if (h <= 1) return 'H1: Setup';
      if (h <= 2) return 'H2: Quiet/SB';
      if (h <= 3) return 'H3: Catalyst';
      return 'H4: Delivery';
    };

    const getSilverBullet = (sessionName: string, h: number | null): string => {
      if (!h) return '-';
      if (sessionName === 'London') return h === 2 ? '3:00-4:00 UTC' : '-';
      if (sessionName === 'NY AM') return h === 2 ? '14:00-15:00 UTC' : '-';
      if (sessionName === 'NY PM') return h === 2 ? '18:00-19:00 UTC' : '-';
      return '-';
    };

    const getMacro = (h: number | null): string => {
      if (!h || h > 2) return '-';
      return h === 1 ? ':05-:10' : ':50-:55';
    };

    // Simplified phase detection based on hour
    const getPhase = (h: number | null): SessionData['phase'] => {
      if (!h) return 'CONSOLIDATION';
      if (h <= 1) return 'CONSOLIDATION';
      if (h <= 2) return 'REVERSAL';
      if (h <= 3) return 'EXPANSION';
      return 'CONTINUATION';
    };

    // Simplified bias (in real app, this would come from actual price analysis)
    const getBias = (): SessionData['bias'] => {
      return 'NEUTRAL';
    };

    setSessions([
      {
        name: 'London',
        active: londonActive,
        timeRemaining: londonRemaining,
        currentHour: londonHour as 1 | 2 | 3 | 4 | null,
        hourLabel: getHourLabel(londonHour),
        silverBullet: getSilverBullet('London', londonHour),
        macro: getMacro(londonHour),
        phase: getPhase(londonHour),
        bias: getBias(),
      },
      {
        name: 'NY AM',
        active: nyamActive,
        timeRemaining: nyamRemaining,
        currentHour: nyamHour as 1 | 2 | 3 | 4 | null,
        hourLabel: getHourLabel(nyamHour),
        silverBullet: getSilverBullet('NY AM', nyamHour),
        macro: getMacro(nyamHour),
        phase: getPhase(nyamHour),
        bias: getBias(),
      },
      {
        name: 'NY PM',
        active: nypmActive,
        timeRemaining: nypmRemaining,
        currentHour: nypmHour as 1 | 2 | 3 | 4 | null,
        hourLabel: getHourLabel(nypmHour),
        silverBullet: getSilverBullet('NY PM', nypmHour),
        macro: getMacro(nypmHour),
        phase: getPhase(nypmHour),
        bias: getBias(),
      },
    ]);
  }, [currentTime]);

  const getPhaseColor = (phase: SessionData['phase']) => {
    switch (phase) {
      case 'REVERSAL': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'EXPANSION': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'CONSOLIDATION': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'RETRACEMENT': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'CONTINUATION': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    }
  };

  const getBiasColor = (bias: SessionData['bias']) => {
    switch (bias) {
      case 'BULLISH': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'BEARISH': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'NEUTRAL': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Live Session Models
          <Badge variant="outline" className="ml-auto text-xs">
            {currentTime.toUTCString().slice(17, 25)} UTC
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-semibold">Session</th>
                <th className="text-left py-3 px-2 font-semibold">Status</th>
                <th className="text-left py-3 px-2 font-semibold">Time Left</th>
                <th className="text-left py-3 px-2 font-semibold">Model Hour</th>
                <th className="text-left py-3 px-2 font-semibold">Silver Bullet</th>
                <th className="text-left py-3 px-2 font-semibold">Macro</th>
                <th className="text-left py-3 px-2 font-semibold">Phase</th>
                <th className="text-left py-3 px-2 font-semibold">Bias</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, i) => (
                <tr 
                  key={i} 
                  className={`border-b border-border/50 ${session.active ? 'bg-primary/5' : 'opacity-50'}`}
                >
                  <td className="py-3 px-2 font-medium">{session.name}</td>
                  <td className="py-3 px-2">
                    {session.active ? (
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="opacity-50">Closed</Badge>
                    )}
                  </td>
                  <td className="py-3 px-2">{session.timeRemaining}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded ${session.currentHour ? 'bg-primary/20 text-primary' : ''}`}>
                      {session.hourLabel}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-xs">{session.silverBullet}</td>
                  <td className="py-3 px-2 text-xs">{session.macro}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className={getPhaseColor(session.phase)}>
                      {session.phase}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className={getBiasColor(session.bias)}>
                      {session.bias === 'BULLISH' && <TrendingUp className="w-3 h-3 mr-1" />}
                      {session.bias === 'BEARISH' && <Target className="w-3 h-3 mr-1" />}
                      {session.bias}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border">
          <h4 className="font-semibold text-sm mb-2">Session Model Hours Explained:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div><strong className="text-foreground">H1 (Setup):</strong> Market sets up the range, identifies liquidity</div>
            <div><strong className="text-foreground">H2 (Quiet/SB):</strong> Silver Bullet window - optimal reversal zone</div>
            <div><strong className="text-foreground">H3 (Catalyst):</strong> News/momentum drives directional move</div>
            <div><strong className="text-foreground">H4 (Delivery):</strong> Final push to targets, delivery phase completes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
