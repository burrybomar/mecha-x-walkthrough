import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Zap, Target, TrendingUp, Eye, Activity, Layers, Clock } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'HTF Setup',
    color: '#6bb0dd',
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
    settings: [
      { label: 'Show iFVG', type: 'switch', value: true },
      { label: 'Auto-Label', type: 'switch', value: true },
      { label: 'Min. Gap %', type: 'number', value: '0.3' },
    ]
  },
  {
    icon: Clock,
    title: 'Session Models',
    color: '#e9f2fa',
    settings: [
      { label: 'Show Sessions', type: 'switch', value: true },
      { label: 'H2 Silver Bullet', type: 'switch', value: true },
      { label: 'Timezone', type: 'select', value: 'EST', options: ['EST', 'GMT', 'UTC'] },
    ]
  },
];

export const SettingsHypeClip = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentFeature = features[currentIndex];
  const IconComponent = currentFeature.icon;

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-background via-card to-background">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: currentFeature.color }}
        animate={{
          x: ['-50%', '150%'],
          y: ['0%', '100%'],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: '#abdbd6' }}
        animate={{
          x: ['150%', '-50%'],
          y: ['100%', '0%'],
          scale: [1.5, 1, 1.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative h-full flex flex-col items-center justify-center p-8">
        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            MECHA-X Intelligence
          </h2>
          <p className="text-muted-foreground text-lg">Precision Trading Framework</p>
        </motion.div>

        {/* Feature showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-2xl"
          >
            <Card className="border-2 p-8 bg-card/80 backdrop-blur-sm" style={{ borderColor: currentFeature.color }}>
              {/* Feature header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: currentFeature.color + '20' }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IconComponent className="w-8 h-8" style={{ color: currentFeature.color }} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold">{currentFeature.title}</h3>
                  <p className="text-xs text-muted-foreground">Advanced Configuration</p>
                </div>
              </div>

              {/* Settings showcase */}
              <div className="space-y-4">
                {currentFeature.settings.map((setting, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all"
                  >
                    <span className="text-sm font-medium">{setting.label}</span>
                    <div className="min-w-[120px] flex justify-end">
                      {setting.type === 'switch' && (
                        <Switch checked={setting.value as boolean} />
                      )}
                      {setting.type === 'select' && (
                        <Select value={setting.value as string}>
                          <SelectTrigger className="h-8 text-xs w-[100px]">
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
                          className="h-8 w-[80px] text-center text-xs"
                          readOnly
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="flex gap-2 mt-8">
          {features.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className="relative h-2 rounded-full overflow-hidden"
              style={{ 
                width: idx === currentIndex ? '60px' : '30px',
                backgroundColor: idx === currentIndex ? features[idx].color : 'hsl(var(--muted))',
              }}
              animate={{ 
                width: idx === currentIndex ? '60px' : '30px',
              }}
              transition={{ duration: 0.3 }}
            >
              {idx === currentIndex && isPlaying && (
                <motion.div
                  className="absolute inset-0 bg-background/50"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2.5, ease: 'linear' }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Play/Pause control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="mt-4 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors text-xs font-medium"
        >
          {isPlaying ? 'Pause' : 'Play'} Showcase
        </button>
      </div>
    </div>
  );
};
