import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Sparkles } from 'lucide-react';

interface AITooltipProps {
  term: string;
  children: React.ReactNode;
}

export const AITooltip = ({ term, children }: AITooltipProps) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    if (explanation) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('mecha-ai', {
        body: { query: `Explain: ${term}` }
      });
      if (error) throw error;
      setExplanation(data.answer);
    } catch (err) {
      setExplanation('Failed to load explanation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <HoverCard openDelay={300} onOpenChange={(open) => open && fetchExplanation()}>
      <HoverCardTrigger asChild>
        <span className="cursor-help border-b border-dotted border-primary/50 hover:border-primary transition-colors">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-gradient-to-br from-slate-900 to-blue-900 text-white border-blue-500">
        <div className="flex items-start space-x-2">
          <Sparkles className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading explanation...</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{explanation || 'Hover to see AI explanation'}</p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
