import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

interface SimpleChartProps {
  type: 'htf' | 'liquidity' | 'cisd' | 'ifvg';
  title: string;
}

export const SimpleChart = ({ type, title }: SimpleChartProps) => {
  const getChartData = () => {
    switch (type) {
      case 'htf':
        return {
          data: [
            { time: '1', price: 100 },
            { time: '2', price: 105 },
            { time: '3', price: 103 },
            { time: '4', price: 110 },
            { time: '5', price: 108 },
            { time: '6', price: 115 },
            { time: '7', price: 112 },
            { time: '8', price: 118 },
          ],
          lines: [
            { y: 110, label: '4H High', color: '#3b82f6' },
            { y: 103, label: '4H Low', color: '#ef4444' }
          ]
        };
      
      case 'liquidity':
        return {
          data: [
            { time: '1', price: 95 },
            { time: '2', price: 98 },
            { time: '3', price: 103 },
            { time: '4', price: 105 },
            { time: '5', price: 106 },
            { time: '6', price: 104 },
            { time: '7', price: 100 },
            { time: '8', price: 97 },
          ],
          lines: [
            { y: 106, label: 'BSL', color: '#3b82f6' },
            { y: 95, label: 'SSL', color: '#ef4444' }
          ]
        };
      
      case 'cisd':
        return {
          data: [
            { time: '1', price: 100 },
            { time: '2', price: 95 },
            { time: '3', price: 88 }, // Sweep low
            { time: '4', price: 92 },  // Reaction up
            { time: '5', price: 105 }, // Strong move
            { time: '6', price: 112 },
            { time: '7', price: 108 }, // Retest CISD
            { time: '8', price: 118 }, // Continue
          ],
          lines: [
            { y: 92, label: 'CISD', color: '#f59e0b' },
            { y: 88, label: 'Sweep', color: '#ef4444' }
          ]
        };
      
      case 'ifvg':
        return {
          data: [
            { time: '1', price: 100 },
            { time: '2', price: 110 },
            { time: '3', price: 105 },
            { time: '4', price: 103 },
            { time: '5', price: 98 },
            { time: '6', price: 102 },
            { time: '7', price: 108 },
            { time: '8', price: 115 },
          ],
          lines: [
            { y: 103, label: 'iFVG', color: '#8b5cf6' }
          ]
        };
    }
  };

  const { data, lines } = getChartData();

  return (
    <div className="bg-slate-900/90 backdrop-blur rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600/70 transition-all">
      <div className="aspect-[4/3] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(148,163,184,0.4)"
              tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }}
            />
            <YAxis 
              stroke="rgba(148,163,184,0.4)"
              tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#06b6d4" 
              strokeWidth={2.5}
              dot={{ fill: '#06b6d4', r: 3 }}
              activeDot={{ r: 5 }}
            />
            {lines.map((line, idx) => (
              <ReferenceLine 
                key={idx}
                y={line.y} 
                stroke={line.color}
                strokeWidth={2}
                strokeDasharray="4 4"
              >
                <Label 
                  value={line.label} 
                  position="right" 
                  fill={line.color}
                  fontSize={10}
                  fontWeight="600"
                />
              </ReferenceLine>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="px-3 py-2 text-center border-t border-slate-700/50 bg-slate-900/50">
        <p className="text-slate-300 text-xs font-medium">{title}</p>
      </div>
    </div>
  );
};
