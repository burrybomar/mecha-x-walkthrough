import { useNavigate } from 'react-router-dom';
import { BookOpen, RefreshCw, ArrowUpRight, Search, FileText, ChartColumnIncreasing } from 'lucide-react';
import { Button } from './ui/button';
import { MobileNav } from './MobileNav';

export const ResponsiveNav = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
        {/* Framework Core */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/fractal-model')}
          className="font-mono"
          aria-label="Fractal Model"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Model
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/sequences')}
          className="font-mono"
          aria-label="Three Sequences"
        >
          <ArrowUpRight className="w-4 h-4 mr-1" />
          Sequences
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/sequence-identifier')}
          className="font-mono"
          aria-label="Sequence Identifier"
        >
          <Search className="w-4 h-4 mr-1" />
          Identify
        </Button>

        {/* Learning */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/knowledge')}
          className="font-mono"
          aria-label="Learn Framework"
        >
          <BookOpen className="w-4 h-4 mr-1" />
          Learn
        </Button>


        {/* Tools */}



        {/* Reference */}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/faq')}
          className="font-mono"
          aria-label="Frequently Asked Questions"
        >
          FAQ
        </Button>
      </nav>
    </>
  );
};
