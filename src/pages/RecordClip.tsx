import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Zap, Target, TrendingUp, Eye, Activity, Layers, Clock } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'HTF Setup',
    color: '#6bb0dd',
    gradient: 'from-[#6bb0dd] to-[#5289AD]',
    settings: [
      { label: 'Auto HTF Mode', type: 'switch', value: true },
      { label: 'HTF Timeframe', type: 'select', value: '4H', options: ['1H', '4H', 'Daily'] },
      { label: 'Bars Back', type: 'number', value: '100' },
    ]
  },
  {
    icon: Target,
    title: 'Liquidity Sweeps',
    color: '#abdbd6',
    gradient: 'from-[#abdbd6] to-[#6bb0dd]',
    settings: [
      { label: 'Show BSL/SSL', type: 'switch', value: true },
      { label: 'Sweep Detection', type: 'switch', value: true },
      { label: 'Min. Sweep %', type: 'number', value: '0.5' },
    ]
  },
  {
    icon: TrendingUp,
    title: 'Pattern Detection',
    color: '#5289AD',
    gradient: 'from-[#5289AD] to-[#3a647f]',
    settings: [
      { label: 'Auto Patterns', type: 'switch', value: true },
      { label: 'C2 Candles', type: 'switch', value: true },
      { label: 'Min. Body %', type: 'number', value: '60' },
    ]
  },
  {
    icon: Activity,
    title: 'CISD Zones',
    color: '#698696',
    gradient: 'from-[#698696] to-[#5289AD]',
    settings: [
      { label: 'Show CISD', type: 'switch', value: true },
      { label: 'Zone Style', type: 'select', value: 'Solid', options: ['Solid', 'Dashed', 'Dotted'] },
      { label: 'Opacity', type: 'number', value: '50' },
    ]
  },
  {
    icon: Layers,
    title: 'iFVG Detection',
    color: '#3a647f',
    gradient: 'from-[#3a647f] to-[#abdbd6]',
    settings: [
      { label: 'Show iFVG', type: 'switch', value: true },
      { label: 'Auto-Label', type: 'switch', value: true },
      { label: 'Min. Gap %', type: 'number', value: '0.3' },
    ]
  },
  {
    icon: Clock,
    title: 'Session Models',
    color: '#6bb0dd',
    gradient: 'from-[#6bb0dd] to-[#abdbd6]',
    settings: [
      { label: 'Show Sessions', type: 'switch', value: true },
      { label: 'H2 Silver Bullet', type: 'switch', value: true },
      { label: 'Timezone', type: 'select', value: 'EST', options: ['EST', 'GMT', 'UTC'] },
    ]
  },
];

const RecordClip = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000); // 5 seconds per feature = 30 seconds total loop

    return () => clearInterval(interval);
  }, []);

  const currentFeature = features[currentIndex];
  const IconComponent = currentFeature.icon;

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-background via-card to-background overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
          style={{ background: currentFeature.color }}
          animate={{
            x: ['0%', '50%', '0%'],
            y: ['0%', '70%', '0%'],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[700px] h-[700px] rounded-full blur-3xl opacity-15"
          style={{ background: '#abdbd6' }}
          animate={{
            x: ['0%', '-30%', '0%'],
            y: ['0%', '-50%', '0%'],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Main content - 16:9 safe area */}
      <div className="relative h-full flex flex-col items-center justify-center px-16">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight">
            MECHA-X
          </h1>
          <p className="text-xl text-muted-foreground text-center">Precision Trading Intelligence</p>
        </motion.div>

        {/* Feature showcase card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-4xl"
          >
            <div 
              className="relative rounded-2xl p-12 backdrop-blur-sm border-4 shadow-2xl"
              style={{ 
                borderColor: currentFeature.color,
                background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card))/60 100%)`,
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                style={{ background: currentFeature.color }}
              />
              
              <div className="relative">
                {/* Feature header */}
                <div className="flex items-center gap-6 mb-10">
                  <motion.div
                    className={`p-6 rounded-2xl bg-gradient-to-br ${currentFeature.gradient}`}
                    animate={{ 
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <IconComponent className="w-12 h-12 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-5xl font-bold mb-2">{currentFeature.title}</h2>
                    <p className="text-lg text-muted-foreground">Advanced Configuration System</p>
                  </div>
                </div>

                {/* Settings showcase */}
                <div className="space-y-5">
                  {currentFeature.settings.map((setting, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.2, duration: 0.6, ease: "easeOut" }}
                      className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-sm border border-border/50"
                    >
                      <span className="text-xl font-medium">{setting.label}</span>
                      <div className="min-w-[160px] flex justify-end">
                        {setting.type === 'switch' && (
                          <Switch checked={setting.value as boolean} className="scale-125" />
                        )}
                        {setting.type === 'select' && (
                          <Select value={setting.value as string}>
                            <SelectTrigger className="h-10 text-base w-[140px] border-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options?.map((opt) => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {setting.type === 'number' && (
                          <Input 
                            type="text" 
                            value={setting.value as string}
                            className="h-10 w-[100px] text-center text-base border-2"
                            readOnly
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-12 flex gap-3">
          {features.map((_, idx) => (
            <div
              key={idx}
              className="relative h-2 rounded-full overflow-hidden"
              style={{ 
                width: idx === currentIndex ? '80px' : '40px',
                backgroundColor: idx <= currentIndex ? features[idx].color : 'hsl(var(--muted))',
                opacity: idx === currentIndex ? 1 : 0.5,
                transition: 'all 0.3s ease',
              }}
            >
              {idx === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Professional Trading Framework • Real-time Analytics • Smart Automation
          </p>
        </motion.div>
      </div>

      {/* Recording indicator (optional - can be hidden) */}
      <div className="absolute top-6 right-6 flex items-center gap-2 text-xs text-muted-foreground opacity-30">
        <motion.div
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>RECORDING OPTIMIZED</span>
      </div>
    </div>
  );
};

export default RecordClip;
