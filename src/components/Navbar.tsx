import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, Layers, MessageSquareQuote } from 'lucide-react';

interface NavbarProps {
  onOpenVault: () => void;
  onOpenAbout: () => void;
  onOpenSalon: () => void;
  vaultCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVault, onOpenAbout, onOpenSalon, vaultCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 ${
        isScrolled 
          ? 'bg-vangogh-canvas/95 border-b border-vangogh-charcoal/10 text-vangogh-charcoal shadow-sm' 
          : 'bg-[#060B18]/80 border-b border-white/10 text-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-15 sm:h-18 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0 min-w-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="./logo.jpg" 
            alt="반 고흐 21 공식 엠블럼" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm border border-vangogh-gold/40 shrink-0"
          />
          <div className="min-w-0">
            <span className={`text-base sm:text-xl font-bold tracking-tight block leading-tight truncate transition-colors ${
              isScrolled ? 'text-vangogh-navy' : 'text-white'
            }`}>
              VAN GOGH 21
            </span>
            <span className={`hidden md:block text-[11px] font-medium tracking-wide transition-colors ${
              isScrolled ? 'text-vangogh-charcoal/60' : 'text-white/60'
            }`}>
              반 고흐 21 : 21세기 반 고흐를 찾아서
            </span>
          </div>
        </div>

        {/* Nav actions */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              const el = document.getElementById('season-artworks');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isScrolled 
                ? 'text-vangogh-charcoal/80 hover:text-vangogh-navy hover:bg-vangogh-stone/60' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="w-4 h-4 text-vangogh-gold shrink-0" />
            <span>시즌 1 : 피지전</span>
          </button>

          <button
            onClick={onOpenSalon}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors shrink-0 ${
              isScrolled 
                ? 'text-vangogh-charcoal/80 hover:text-vangogh-navy hover:bg-vangogh-stone/60' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="소장자 살롱"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vangogh-gold shrink-0" />
            <span><span className="hidden sm:inline">소장자 </span>살롱</span>
          </button>

          <button
            onClick={onOpenAbout}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 ${
              isScrolled 
                ? 'text-vangogh-charcoal/80 hover:text-vangogh-navy hover:bg-vangogh-stone/60' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4 text-vangogh-gold shrink-0" />
            <span>소개</span>
          </button>

          <button
            onClick={onOpenVault}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all shrink-0 ${
              isScrolled
                ? 'text-vangogh-canvas bg-vangogh-navy hover:bg-vangogh-blue'
                : 'text-vangogh-navy bg-vangogh-gold hover:bg-amber-400 font-bold'
            }`}
          >
            <Layers className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isScrolled ? 'text-vangogh-gold' : 'text-vangogh-navy'}`} />
            <span>보관함</span>
            {vaultCount > 0 && (
              <span className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold rounded-full leading-none ${
                isScrolled ? 'bg-vangogh-gold text-vangogh-navy' : 'bg-vangogh-navy text-vangogh-gold'
              }`}>
                {vaultCount}
              </span>
            )}
          </button>
        </nav>

      </div>
    </header>
  );
};
