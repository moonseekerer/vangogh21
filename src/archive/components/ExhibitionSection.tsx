import React from 'react';
import { MAJOR_MUSEUMS } from '../data/vangoghArtworks';
import { HISTORICAL_EXHIBITIONS } from '../data/vangoghExhibitions';
import { Building2, History, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

interface ExhibitionSectionProps {
  onGoToMapWithMuseum: (museumName: string) => void;
}

export const ExhibitionSection: React.FC<ExhibitionSectionProps> = ({ onGoToMapWithMuseum }) => {
  return (
    <div className="space-y-12">
      {/* 1. Global Major Permanent Collections Guide */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-100 tracking-tight">
              전 세계 주요 상설 전시관 가이드
            </h2>
          </div>
          <span className="text-xs text-stone-400 font-mono">
            공식 컬렉션 보유 주요 {MAJOR_MUSEUMS.length}개 미술관
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MAJOR_MUSEUMS.map((museum) => (
            <div
              key={museum.id}
              className="bg-stone-900 border border-stone-800 rounded-lg p-5 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-amber-400">
                    {museum.city}, {museum.country}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    소장 약 {museum.artworkCount}점
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-100">{museum.nameKo}</h3>
                  <p className="text-xs text-stone-400 font-serif italic">{museum.nameEn}</p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {museum.description}
                </p>

                <div className="border-t border-stone-800/80 pt-2.5 text-xs text-stone-300">
                  <span className="text-amber-400/90 font-medium block mb-0.5">관람 안내:</span>
                  <p className="leading-snug">{museum.visitingTips}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-800/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onGoToMapWithMuseum(museum.nameKo)}
                  className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  지도에서 위치 및 소장작 보기
                  <ArrowRight className="w-3 h-3" />
                </button>

                <a
                  href={museum.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-stone-200 inline-flex items-center gap-1"
                >
                  공식 사이트
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Historical Exhibitions Timeline */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-100 tracking-tight">
              역사적 주요 전시 연표
            </h2>
          </div>
          <span className="text-xs text-stone-400 font-mono">
            1890년 생전 전시부터 1973년 전용 미술관 개관까지
          </span>
        </div>

        <div className="relative border-l-2 border-amber-500/40 ml-4 pl-6 space-y-8 py-2">
          {HISTORICAL_EXHIBITIONS.map((ex, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-stone-950 border-2 border-amber-500 group-hover:bg-amber-400 transition-colors" />

              <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {ex.year}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {ex.location} · {ex.venue}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-100">
                  {ex.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans pt-1">
                  {ex.significance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
