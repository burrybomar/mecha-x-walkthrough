import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Label, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

interface SimpleChartProps {
  type: 'htf' | 'liquidity' | 'cisd' | 'ifvg';
  title: string;
  description?: string;
}

export const SimpleChart = ({ type, title, description }: SimpleChartProps) => {
  const getChartConfig = () => {
    switch (type) {
      case 'htf':
        return {
          data: [
            { time: '9:00', price: 100 },
            { time: '9:30', price: 102 },
            { time: '10:00', price: 101 },
            { time: '10:30', price: 105 },
            { time: '11:00', price: 107 },
            { time: '11:30', price: 106 },
            { time: '12:00', price: 110 },
            { time: '12:30', price: 109 },
            { time: '13:00', price: 113 },
            { time: '13:30', price: 115 },
            { time: '14:00', price: 118 },
          ],
          lines: [
            { y: 115, label: '4H High', color: '#3b82f6', dash: '5 5' },
            { y: 100, label: '4H Low', color: '#ef4444', dash: '5 5' }
          ],
          gradient: ['#3b82f6', '#06b6d4'],
          areaColor: '#3b82f6',
          strokeColor: '#3b82f6'
        };
      
      case 'liquidity':
        return {
          data: [
            { time: '1', price: 102 },
            { time: '2', price: 104 },
            { time: '3', price: 106.5 },
            { time: '4', price: 105 },
            { time: '5', price: 103 },
            { time: '6', price: 100 },
            { time: '7', price: 97 },
            { time: '8', price: 94.5 },
            { time: '9', price: 97 },
            { time: '10', price: 100 },
          ],
          lines: [
            { y: 106.5, label: 'BSL (Buy Stops)', color: '#3b82f6', dash: '8 4' },
            { y: 94.5, label: 'SSL (Sell Stops)', color: '#ef4444', dash: '8 4' }
          ],
          gradient: ['#10b981', '#06b6d4'],
          areaColor: '#10b981',
          strokeColor: '#10b981'
        };
      
      case 'cisd':
        return {
          data: [
            { time: '1', price: 105 },
            { time: '2', price: 100 },
            { time: '3', price: 93 },
            { time: '4', price: 97 },
            { time: '5', price: 108 },
            { time: '6', price: 115 },
            { time: '7', price: 111 },
            { time: '8', price: 109 },
            { time: '9', price: 112 },
            { time: '10', price: 120 },
          ],
          lines: [
            { y: 97, label: 'CISD Zone', color: '#f59e0b', dash: '6 3' },
            { y: 93, label: 'Sweep Low', color: '#ef4444', dash: '3 3' }
          ],
          gradient: ['#f59e0b', '#eab308'],
          areaColor: '#f59e0b',
          strokeColor: '#f59e0b'
        };
      
      case 'ifvg':
        return {
          data: [
            { time: '1', price: 100 },
            { time: '2', price: 112 },
            { time: '3', price: 108 },
            { time: '4', price: 105 },
            { time: '5', price: 102 },
            { time: '6', price: 100 },
            { time: '7', price: 103 },
            { time: '8', price: 107 },
            { time: '9', price: 113 },
            { time: '10', price: 118 },
          ],
          lines: [
            { y: 105, label: 'iFVG Top', color: '#8b5cf6', dash: '4 4' },
            { y: 102, label: 'iFVG Bottom', color: '#6366f1', dash: '4 4' }
          ],
          gradient: ['#8b5cf6', '#6366f1'],
          areaColor: '#8b5cf6',
          strokeColor: '#8b5cf6'
        };
    }
  };

  const config = getChartConfig();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700/50 hover:border-primary/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-primary/20"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        {/* Title */}
        <div className="mb-4">
          <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
          {description && (
            <p className="text-slate-400 text-sm">{description}</p>
          )}
        </div>

        {/* Chart */}
        <div className="aspect-video relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={config.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.gradient[0]} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={config.gradient[1]} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="rgba(148,163,184,0.3)"
                tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }}
                axisLine={false}
              />
              <YAxis 
                stroke="rgba(148,163,184,0.3)"
                tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }}
                domain={['dataMin - 3', 'dataMax + 3']}
                axisLine={false}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={config.strokeColor}
                strokeWidth={3}
                fill={`url(#gradient-${type})`}
                dot={false}
                activeDot={{ r: 5, fill: config.strokeColor }}
              />
              {config.lines.map((line, idx) => (
                <ReferenceLine 
                  key={idx}
                  y={line.y} 
                  stroke={line.color}
                  strokeWidth={2}
                  strokeDasharray={line.dash}
                >
                  <Label 
                    value={line.label} 
                    position="insideTopRight"
                    fill={line.color}
                    fontSize={11}
                    fontWeight="700"
                    className="drop-shadow-lg"
                  />
                </ReferenceLine>
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};
