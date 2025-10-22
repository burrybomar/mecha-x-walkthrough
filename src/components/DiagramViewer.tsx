import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DiagramViewerProps {
  diagramType: string;
  title: string;
  description: string;
}

export const DiagramViewer = ({ diagramType, title, description }: DiagramViewerProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDiagram = async () => {
      setLoading(true);
      setError('');
      
      try {
        const { data, error: functionError } = await supabase.functions.invoke('generate-diagram', {
          body: { diagramType }
        });
        
        if (functionError) throw functionError;
        if (data?.imageUrl) {
          setImageUrl(data.imageUrl);
        } else {
          throw new Error('No image returned');
        }
      } catch (err) {
        console.error('Error fetching diagram:', err);
        setError('Failed to load diagram');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagram();
  }, [diagramType]);

  if (loading) {
    return (
      <Card className="w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm text-slate-600">Generating {title}...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full aspect-video bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center border-red-200">
        <div className="flex flex-col items-center space-y-2 text-red-600">
          <ImageIcon className="w-8 h-8" />
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-colors">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-auto"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h4 className="text-white font-bold text-lg">{title}</h4>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
};
