import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
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
        {/* Core Learning */}
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
          onClick={() => navigate('/trade-journal')} 
          className="font-mono"
          aria-label="Trade Journal"
        >
          Journal
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
          onClick={() => navigate('/chart-examples')} 
          className="font-mono"
          aria-label="Chart Examples"
        >
          Charts
        </Button>
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
