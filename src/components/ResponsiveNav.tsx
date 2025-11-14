import { useNavigate } from 'react-router-dom';
import { BookOpen, RefreshCw, ArrowUpRight, Search, FileText } from 'lucide-react';
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
          onClick={() => navigate('/ohlc-tutorial')} 
          className="font-mono"
          aria-label="OHLC Tutorial"
        >
          OHLC
        </Button>
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
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/case-studies')} 
          className="font-mono"
          aria-label="Case Studies"
        >
          <FileText className="w-4 h-4 mr-1" />
          Cases
        </Button>
        
        {/* Tools */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/checklist')} 
          className="font-mono"
          aria-label="Pre-Trade Checklist"
        >
          Checklist
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/setup')} 
          className="font-mono"
          aria-label="Setup Indicators"
        >
          Setup
        </Button>
        
        {/* Reference */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/glossary')} 
          className="font-mono"
          aria-label="Trading Glossary"
        >
          Glossary
        </Button>
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
