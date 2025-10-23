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
            { time: '3', price: 90 },
            { time: '4', price: 93 },
            { time: '5', price: 105 },
            { time: '6', price: 110 },
            { time: '7', price: 115 },
            { time: '8', price: 120 },
          ],
          lines: [
            { y: 90, label: 'CISD Zone', color: '#f97316' }
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
    <div className="bg-white/10 backdrop-blur rounded-xl overflow-hidden hover:bg-white/20 transition-all">
      <div className="aspect-[4/3] p-4 bg-gradient-to-br from-slate-950 to-blue-950">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#22d3ee" 
              strokeWidth={2}
              dot={{ fill: '#22d3ee', r: 4 }}
              activeDot={{ r: 6 }}
            />
            {lines.map((line, idx) => (
              <ReferenceLine 
                key={idx}
                y={line.y} 
                stroke={line.color}
                strokeWidth={2}
                strokeDasharray="5 5"
              >
                <Label 
                  value={line.label} 
                  position="right" 
                  fill={line.color}
                  fontSize={11}
                  fontWeight="bold"
                />
              </ReferenceLine>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="p-3 text-center bg-slate-900/50">
        <p className="text-white text-sm font-semibold">{title}</p>
      </div>
    </div>
  );
};
