import { RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const ResetTourButton = () => {
  const handleReset = () => {
    localStorage.removeItem('mecha-x-tour-completed');
    toast.success('Onboarding tour reset! Refresh the page to see it again.');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReset}
      className="gap-2"
      aria-label="Reset onboarding tour"
    >
      <RotateCcw className="w-4 h-4" />
      Reset Tour
    </Button>
  );
};
