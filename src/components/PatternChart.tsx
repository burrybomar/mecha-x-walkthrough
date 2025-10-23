import { motion } from 'framer-motion';

interface PatternChartProps {
  type: 'c1c2c3-bullish' | 'c1c2c3-bearish' | 'smt-divergence' | 'sessions-timeline';
  title: string;
}

export const PatternChart = ({ type, title }: PatternChartProps) => {
  if (type === 'c1c2c3-bullish' || type === 'c1c2c3-bearish') {
    const isBullish = type === 'c1c2c3-bullish';
    return (
      <div className="bg-slate-900/90 backdrop-blur rounded-xl p-6 border border-slate-700/50">
        <h4 className="text-cyan-400 font-bold text-center mb-4">{title}</h4>
        <div className="flex items-end justify-center gap-8 h-48">
          {/* C1 - Setup candle */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              {/* POI Line */}
              <div className={`absolute ${isBullish ? 'top-0' : 'bottom-0'} left-1/2 -translate-x-1/2 w-32 h-0.5 bg-purple-400 -${isBullish ? 'top' : 'bottom'}-4`}>
                <span className="absolute left-0 -top-5 text-[10px] text-purple-400 font-bold whitespace-nowrap">POI (FVG/OB)</span>
              </div>
              {/* Candle */}
              <div className="w-12 bg-slate-600 h-24 rounded-sm relative">
                {/* Wick */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-slate-400 ${isBullish ? 'h-6 -top-6' : 'h-6 -bottom-6'}`}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-bold text-sm">C1</div>
              <div className="text-[10px] text-slate-400">Touches POI</div>
            </div>
          </div>

          {/* C2 - THE SWING */}
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              className="relative"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {/* Sweep indicator */}
              <div className={`absolute left-1/2 -translate-x-1/2 text-[10px] font-bold ${isBullish ? 'text-red-400 -bottom-16' : 'text-blue-400 -top-16'}`}>
                {isBullish ? '↓ SWEEP SSL' : '↑ SWEEP BSL'}
              </div>
              {/* Candle with long wick */}
              <div className={`w-12 ${isBullish ? 'bg-emerald-600' : 'bg-red-600'} h-16 rounded-sm relative ${isBullish ? '' : 'mt-8'}`}>
                {/* Long sweep wick */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 ${isBullish ? 'bg-emerald-400' : 'bg-red-400'} ${isBullish ? 'h-12 -bottom-12' : 'h-12 -top-12'}`}></div>
              </div>
            </motion.div>
            <div className="text-center mt-2">
              <div className="text-yellow-400 font-bold text-lg">C2</div>
              <div className="text-[10px] text-yellow-400 font-bold">THE SWING</div>
            </div>
          </div>

          {/* C3 - Confirmation */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 bg-emerald-500 h-32 rounded-sm relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-emerald-300 h-4 -top-4"></div>
              {/* Reversal arrow */}
              <motion.div 
                className={`absolute -right-8 ${isBullish ? 'top-0' : 'bottom-0'} text-emerald-400 text-2xl`}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {isBullish ? '↑' : '↓'}
              </motion.div>
            </div>
            <div className="text-center">
              <div className="text-emerald-400 font-bold text-sm">C3</div>
              <div className="text-[10px] text-slate-400">Confirms</div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400">
          {isBullish ? 'Bullish: C2 lower than C1 & C3 (swing low)' : 'Bearish: C2 higher than C1 & C3 (swing high)'}
        </div>
      </div>
    );
  }

  if (type === 'smt-divergence') {
    return (
      <div className="bg-slate-900/90 backdrop-blur rounded-xl p-6 border border-slate-700/50">
        <h4 className="text-purple-400 font-bold text-center mb-4">{title}</h4>
        <div className="space-y-6">
          {/* Primary Asset (swept) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-blue-400">Primary (ES)</span>
              <span className="text-xs text-emerald-400">✓ Swept BSL</span>
            </div>
            <div className="relative h-20 bg-slate-800/50 rounded-lg border border-blue-500/30 flex items-end px-4 pb-2">
              <div className="flex items-end gap-1 w-full">
                <div className="w-8 h-12 bg-slate-600 rounded-sm"></div>
                <div className="w-8 h-10 bg-slate-600 rounded-sm"></div>
                <div className="w-8 h-14 bg-red-600 rounded-sm relative">
                  <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-red-400 h-6 -top-6"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-blue-400 whitespace-nowrap">Swept ↑</div>
                </div>
                <div className="w-8 h-8 bg-emerald-600 rounded-sm"></div>
              </div>
              <div className="absolute top-2 right-2 w-20 h-0.5 bg-blue-400">
                <span className="absolute -top-4 right-0 text-[10px] text-blue-400">BSL</span>
              </div>
            </div>
          </div>

          {/* Correlated Asset (failed to sweep) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-orange-400">Correlated (NQ)</span>
              <span className="text-xs text-red-400">✗ Failed to sweep</span>
            </div>
            <div className="relative h-20 bg-slate-800/50 rounded-lg border border-orange-500/30 flex items-end px-4 pb-2">
              <div className="flex items-end gap-1 w-full">
                <div className="w-8 h-12 bg-slate-600 rounded-sm"></div>
                <div className="w-8 h-10 bg-slate-600 rounded-sm"></div>
                <div className="w-8 h-11 bg-slate-600 rounded-sm relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-red-400 whitespace-nowrap">Failed ✗</div>
                </div>
                <div className="w-8 h-8 bg-slate-600 rounded-sm"></div>
              </div>
              <div className="absolute top-2 right-2 w-20 h-0.5 bg-orange-400">
                <span className="absolute -top-4 right-0 text-[10px] text-orange-400">BSL</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block bg-purple-500/20 border border-purple-500/50 rounded-lg px-4 py-2">
              <div className="text-purple-400 font-bold text-sm">PSP-REV Signal</div>
              <div className="text-[10px] text-slate-400 mt-1">Divergence = Reversal bias</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sessions-timeline') {
    return (
      <div className="bg-slate-900/90 backdrop-blur rounded-xl p-6 border border-slate-700/50">
        <h4 className="text-pink-400 font-bold text-center mb-6">{title}</h4>
        <div className="space-y-4">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 via-emerald-500 to-pink-500 rounded-full"></div>
            <div className="relative flex justify-between items-center">
              {[
                { time: '6p', session: 'ASIA', color: 'purple' },
                { time: '10p', session: '', color: 'purple' },
                { time: '2a', session: 'LON', color: 'blue' },
                { time: '6a', session: '', color: 'blue' },
                { time: '10a', session: 'NY', color: 'emerald' },
                { time: '2p', session: '', color: 'pink' },
                { time: '4p', session: 'Close', color: 'pink' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-3 h-3 bg-${item.color}-500 rounded-full border-2 border-slate-900 z-10`}></div>
                  <div className="text-[10px] text-slate-400 mt-2 font-mono">{item.time}</div>
                  {item.session && (
                    <div className={`text-xs text-${item.color}-400 font-bold mt-1`}>{item.session}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Session Models */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <div className="text-purple-400 font-bold text-xs mb-1">ASIA-REV</div>
              <div className="text-[10px] text-slate-400">6p→2a sweep</div>
              <div className="text-[10px] text-emerald-400 mt-1">→ LON expansion</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-blue-400 font-bold text-xs mb-1">LON-REV</div>
              <div className="text-[10px] text-slate-400">2a→10p trap</div>
              <div className="text-[10px] text-emerald-400 mt-1">→ NY reversal</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <div className="text-emerald-400 font-bold text-xs mb-1">NYAM-SB</div>
              <div className="text-[10px] text-slate-400">10-11am window</div>
              <div className="text-[10px] text-emerald-400 mt-1">Optimal entry</div>
            </div>
          </div>

          {/* H1-H4 Progression */}
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
            <div className="text-cyan-400 text-xs font-bold mb-3 text-center">1H Micro Profiling</div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { h: 'H1', desc: 'Setup', color: 'blue' },
                { h: 'H2', desc: 'Quiet', color: 'slate' },
                { h: 'H3', desc: 'News', color: 'orange' },
                { h: 'H4', desc: 'Delivery', color: 'emerald' },
              ].map((hour, i) => (
                <div key={i} className={`bg-${hour.color}-500/10 border border-${hour.color}-500/30 rounded p-2 text-center`}>
                  <div className={`text-${hour.color}-400 font-bold text-[10px]`}>{hour.h}</div>
                  <div className="text-[9px] text-slate-400">{hour.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
