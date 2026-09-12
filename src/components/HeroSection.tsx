import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenAbout: () => void;
}

const STORY_STEPS = [
  {
    step: '01',
    category: 'PROVENANCE',
    title: '1:1 원작 독점 소장',
    paragraphs: [
      '현지 작가가 작업한 단 한 점의 실물 캔버스 원화입니다. 캔버스 뒷면에 작가의 친필 서명과 일련번호가 기재되며, 소장자에게 독점 소유권과 공식 보증서를 발급합니다.',
      '원작 소장 권리를 취득한 후 현지 보관소에서 1년간 무상 보관을 이용할 수 있으며, 원하는 시점에 실물 원화를 안전하게 국내로 받아볼 수 있습니다.',
    ],
  },
  {
    step: '02',
    category: 'CRAFTSMANSHIP',
    title: '파인아트 캔버스 배송',
    paragraphs: [
      '원작의 유화 붓터치와 캔버스 천의 질감을 고해상도로 스캔하여 파인아트 전용 캔버스지에 충실하게 인쇄합니다.',
      '주문 즉시 원목 프레임 액자로 정성껏 제작하여 안전하게 포장 후 문 앞까지 배송합니다. 일상 공간 어디서나 원화의 색감을 편안하게 곁에 둘 수 있습니다.',
    ],
  },
  {
    step: '03',
    category: 'SALON',
    title: '소장자 프라이빗 살롱',
    paragraphs: [
      '작품을 소장한 컬렉터만을 위한 온라인 공간입니다. 공간에 그림을 건 사진과 소감을 남기면 현지 작가와 1:1로 안부를 나누고 작업 비하인드를 들을 수 있습니다.',
      '단순한 구매를 넘어, 지구 반대편 창작자의 일상과 작업을 교감하며 지속적인 창작 활동을 응원하는 커뮤니티입니다.',
    ],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenAbout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0); // 0: Main Title, 1: Step 01, 2: Step 02, 3: Step 03

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      if (progress < 0.20) {
        setActiveStage(0);
      } else if (progress < 0.45) {
        setActiveStage(1);
      } else if (progress < 0.72) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (stepIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    
    // Map stage (0: top, 1: 0.28, 2: 0.55, 3: 0.85)
    const targets = [0, 0.28, 0.55, 0.85];
    const targetScroll = containerTop + totalScrollable * targets[stepIndex];
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#060B18]">
      
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* 1. Cinematic Background: Authentic Starry Night Artwork + Ambient Video Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <img 
            src="./images/starry_night_hero.jpg" 
            alt="The Starry Night - Vincent van Gogh" 
            className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 transition-transform duration-[12000ms] ease-out motion-safe:scale-110"
          />

          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster="./images/starry_night_hero.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen"
          >
            <source src="./videos/night_timelapse.webm" type="video/webm" />
          </video>

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060B18]/70 via-[#060B18]/40 to-[#060B18]/90"></div>
        </div>

        {/* 2. Top Interactive Step Tracker (Editorial Museum Index) */}
        <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-20 sm:pt-24 flex items-center justify-between">
          <nav className="flex items-center gap-3 sm:gap-6 text-xs font-mono tracking-wider">
            <button
              onClick={() => scrollToStep(0)}
              className={`pb-1 transition-colors cursor-pointer ${
                activeStage === 0 
                  ? 'text-vangogh-gold font-semibold border-b-2 border-vangogh-gold' 
                  : 'text-white/45 hover:text-white/80'
              }`}
            >
              INTRO
            </button>
            {STORY_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => scrollToStep(idx + 1)}
                className={`pb-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeStage === idx + 1 
                    ? 'text-vangogh-gold font-semibold border-b-2 border-vangogh-gold' 
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                <span>{s.step}</span>
                <span className="hidden sm:inline">{s.category}</span>
              </button>
            ))}
          </nav>

          {/* Natural Curatorial Link */}
          <button 
            onClick={onOpenAbout}
            className="group hidden sm:inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-vangogh-gold transition-colors font-medium cursor-pointer"
          >
            <span className="border-b border-white/20 group-hover:border-vangogh-gold pb-0.5">
              프로젝트 소개
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3. Stage Contents with Smooth Scene Cross-fade Transitions */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 my-auto">
          
          {/* Stage 0: Main Brand Vision Headline */}
          <div 
            className={`transition-all duration-700 ease-out space-y-6 ${
              activeStage === 0 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 -translate-y-8 pointer-events-none absolute inset-x-0'
            }`}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]">
              21세기 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400">반 고흐</span>를 찾아서
            </h1>
            
            <div className="space-y-3 max-w-2xl text-white/85 leading-relaxed font-normal">
              <p className="text-base sm:text-lg">
                생전에 단 한 점의 그림만을 남긴 채 가난과 고독 속에서 세상을 떠났던 빈센트 반 고흐. 130여 년이 흐른 오늘날에도 세상 곳곳에는 묵묵히 붓을 들고 자신만의 세계를 그리지만, 지리적 고립과 유통 인프라의 부재로 인해 관객을 만나지 못하는 청년 화가들이 있습니다.
              </p>
              <p className="text-sm sm:text-base text-white/70">
                반 고흐 21은 국경 너머 성실하게 캔버스를 채워가는 숨은 신예를 찾아 나섭니다. 가려진 방 한구석에서 피어난 작업을 발굴하고, 이들의 붓끝이 멈추지 않도록 세상과 연결합니다. 지금, 21세기의 반 고흐를 찾아서 떠납니다.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={onOpenAbout}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-vangogh-gold transition-all font-medium cursor-pointer"
              >
                <span className="border-b border-white/20 group-hover:border-vangogh-gold pb-0.5">
                  큐레이터 노트 및 프로젝트 소개
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Stage 1, 2, 3: Interactive Value Narrative Steps */}
          {STORY_STEPS.map((s, idx) => {
            const isCurrent = activeStage === idx + 1;
            return (
              <div 
                key={s.step}
                className={`transition-all duration-700 ease-out max-w-3xl space-y-4 ${
                  isCurrent 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-8 pointer-events-none absolute inset-x-0'
                }`}
              >
                <div className="text-xs sm:text-sm font-mono tracking-widest text-vangogh-gold font-semibold uppercase">
                  {s.step} &nbsp;/&nbsp; {s.category}
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {s.title}
                </h2>

                <div className="space-y-2.5 text-sm sm:text-base text-white/80 leading-relaxed font-normal max-w-2xl">
                  {s.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            );
          })}

        </div>

        {/* 4. Bottom Scroll Transition Indicator */}
        <div className="relative z-30 flex flex-col items-center justify-center pb-8 sm:pb-10">
          <button 
            onClick={() => {
              if (activeStage < 3) {
                scrollToStep(activeStage + 1);
              } else {
                onExploreClick();
              }
            }}
            className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-xl select-none backdrop-blur-md ${
              activeStage === 3
                ? 'bg-vangogh-gold text-vangogh-navy font-bold hover:bg-amber-400 border border-amber-300'
                : 'bg-black/75 hover:bg-black/90 text-vangogh-gold hover:text-amber-300 border border-vangogh-gold/40 hover:border-vangogh-gold'
            }`}
          >
            <span className="tracking-wider uppercase font-mono text-[11px] font-semibold">
              {activeStage === 3 ? '전시 작품 관람하기 · SCROLL TO EXPLORE' : '다음 이야기 · SCROLL TO NEXT'}
            </span>
            <ChevronDown className={`w-4 h-4 animate-bounce ${
              activeStage === 3 ? 'text-vangogh-navy' : 'text-vangogh-gold'
            }`} />
          </button>
        </div>

      </div>

      {/* Multi-stage Soft Gradient Mask Melting into White-Cube Canvas at bottom of 250vh container */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none bg-gradient-to-b from-transparent via-[#FAF7F2]/60 to-[#FAF7F2]"
        aria-hidden="true"
      />
    </div>
  );
};
