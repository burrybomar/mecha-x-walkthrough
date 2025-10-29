import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

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

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Session Models</span>
          </div>
          <Badge variant="outline" className="text-xs font-mono">
            {currentTime.toUTCString().slice(17, 25)} UTC
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Compact Session Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sessions.map((session, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border-2 transition-all ${
                session.active
                  ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border/30 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{session.name}</h3>
                {session.active && (
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                    LIVE
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Time Left:</span>
                  <span className="font-mono font-semibold">{session.timeRemaining}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Model Hour:</span>
                  <Badge variant={session.currentHour ? "default" : "outline"} className="text-xs">
                    {session.hourLabel}
                  </Badge>
                </div>
                
                {session.silverBullet !== '-' && (
                  <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20">
                    <div className="text-xs text-muted-foreground mb-1">Silver Bullet</div>
                    <div className="font-mono text-xs font-semibold text-purple-300">{session.silverBullet}</div>
                  </div>
                )}
                
                {session.macro !== '-' && (
                  <div className="p-2 rounded bg-orange-500/10 border border-orange-500/20">
                    <div className="text-xs text-muted-foreground mb-1">Macro Window</div>
                    <div className="font-mono text-xs font-semibold text-orange-300">{session.macro}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hour Legend */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <h4 className="font-semibold text-sm mb-3">Hour Model Guide:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="font-semibold text-orange-300 mb-1">H1: Setup</div>
              <div className="text-muted-foreground">Range builds, liquidity identified</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="font-semibold text-purple-300 mb-1">H2: Silver Bullet</div>
              <div className="text-muted-foreground">Optimal entry window, sweeps occur</div>
            </div>
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <div className="font-semibold text-cyan-300 mb-1">H3: Catalyst</div>
              <div className="text-muted-foreground">Momentum & directional move</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="font-semibold text-emerald-300 mb-1">H4: Delivery</div>
              <div className="text-muted-foreground">Final push to targets</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
