import React, { useState } from 'react';
import { VIRTUAL_EXHIBITIONS } from '../data/vangoghExhibitions';
import { VAN_GOGH_ARTWORKS } from '../data/vangoghArtworks';
import { Artwork, VirtualExhibition } from '../types';
import { Sparkles, BookOpen, Quote, ChevronRight } from 'lucide-react';

interface CurationRoomsProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export const CurationRooms: React.FC<CurationRoomsProps> = ({ onSelectArtwork }) => {
  const [selectedExhibition, setSelectedExhibition] = useState<VirtualExhibition>(
    VIRTUAL_EXHIBITIONS[0]
  );

  // Find artworks for current exhibition
  const exhibitionArtworks = React.useMemo(() => {
    const ids = new Set(selectedExhibition.artworkIds);
    return VAN_GOGH_ARTWORKS.filter((a) => ids.has(a.id));
  }, [selectedExhibition]);

  return (
    <div className="space-y-8">
      {/* Curation Theme Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {VIRTUAL_EXHIBITIONS.map((ex) => {
          const isSelected = selectedExhibition.id === ex.id;
          return (
            <button
              key={ex.id}
              onClick={() => setSelectedExhibition(ex)}
              className={`p-3 text-left rounded-lg border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/80 text-amber-300 ring-1 ring-amber-500/40'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider mb-1 block">
                {ex.theme}
              </span>
              <h4 className="text-xs font-bold leading-snug line-clamp-2">
                {ex.titleKo.split(' : ')[0]}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Selected Exhibition Detail Room */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden shadow-xl">
        {/* Banner Area */}
        <div className="relative h-64 sm:h-80 bg-black overflow-hidden flex items-end p-6 sm:p-10">
          <img
            src={selectedExhibition.coverImageUrl}
            alt={selectedExhibition.titleKo}
            className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

          <div className="relative z-10 max-w-3xl space-y-2">
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-amber-500 text-stone-950 inline-block shadow">
              가상 큐레이션 기획전
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight leading-tight">
              {selectedExhibition.titleKo}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-serif italic">
              {selectedExhibition.subtitle}
            </p>
          </div>
        </div>

        {/* Curator's Note & Artwork Catalog */}
        <div className="p-6 sm:p-10 space-y-8 divide-y divide-stone-800">
          {/* Curator Note */}
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>전시 기획 서문</span>
            </div>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
              {selectedExhibition.curatorNote}
            </p>
          </div>

          {/* Featured Artworks Grid */}
          <div className="pt-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-stone-400">
                전시 출품 대표작 ({exhibitionArtworks.length}점)
              </h3>
              <span className="text-xs text-stone-400">
                작품을 클릭하면 고화질 캔버스와 편지 원문을 보실 수 있습니다.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exhibitionArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  onClick={() => onSelectArtwork(artwork)}
                  className="group bg-stone-950 border border-stone-800 rounded-lg overflow-hidden cursor-pointer hover:border-amber-500/70 transition-all flex flex-col justify-between shadow"
                >
                  <div className="relative aspect-[4/3] bg-black overflow-hidden">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.titleKo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded">
                      {artwork.year ? `${artwork.year}년` : ''}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {artwork.titleKo}
                      </h4>
                      <p className="text-xs text-stone-400 font-serif italic mt-0.5">
                        {artwork.titleEn}
                      </p>
                    </div>

                    {artwork.description && (
                      <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                        {artwork.description}
                      </p>
                    )}

                    {artwork.letterQuote && (
                      <div className="bg-stone-900 border-l border-amber-500/80 p-2.5 rounded-r text-[11px] text-stone-300 italic">
                        "{artwork.letterQuote.textKo.slice(0, 60)}..."
                      </div>
                    )}

                    <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                      <span>{artwork.collection}</span>
                      <span className="text-amber-400/90 font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                        상세 보기
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
