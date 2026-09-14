import React, { useState } from 'react';
import { Artwork } from '../types';
import { VAN_GOGH_ARTWORKS } from '../data/vangoghArtworks';
import { X, ArrowLeftRight, Sparkles, MapPin, Calendar, Palette, ExternalLink } from 'lucide-react';

interface ArtworkComparisonModalProps {
  initialArtworkA?: Artwork | null;
  onClose: () => void;
}

export const ArtworkComparisonModal: React.FC<ArtworkComparisonModalProps> = ({
  initialArtworkA,
  onClose
}) => {
  const [artworkA, setArtworkA] = useState<Artwork>(
    initialArtworkA || VAN_GOGH_ARTWORKS.find((a) => a.id === 'Q45585') || VAN_GOGH_ARTWORKS[0]
  );
  const [artworkB, setArtworkB] = useState<Artwork>(
    VAN_GOGH_ARTWORKS.find((a) => a.id === 'Q1464531') || VAN_GOGH_ARTWORKS[1]
  );

  const presetComparisons = [
    {
      label: '밤하늘의 진화 : 생레미 vs 아를',
      idA: 'Q45585', // Starry Night
      idB: 'Q1464531' // Starry Night Over the Rhône
    },
    {
      label: '아를의 노란색 : 해바라기 vs 카페 테라스',
      idA: 'Q21948567', // Sunflowers
      idB: 'Q1025704' // Cafe Terrace
    },
    {
      label: '10년의 변천 : 초기 흙빛 vs 말기 격정',
      idA: 'Q154469', // Potato Eaters
      idB: 'Q634122' // Wheatfield with Crows
    }
  ];

  const handleApplyPreset = (idA: string, idB: string) => {
    const a = VAN_GOGH_ARTWORKS.find((x) => x.id === idA);
    const b = VAN_GOGH_ARTWORKS.find((x) => x.id === idB);
    if (a) setArtworkA(a);
    if (b) setArtworkB(b);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-7xl max-h-[96vh] bg-stone-900 border border-stone-800 rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 sm:py-4 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-stone-100">
                작품 1:1 대조 분석
              </h3>
            </div>
            <button
              onClick={onClose}
              className="sm:hidden p-1.5 text-stone-400 hover:text-stone-100 rounded-full hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5 text-xs">
            <span className="text-stone-400 font-mono hidden lg:inline shrink-0">추천 비교군:</span>
            {presetComparisons.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p.idA, p.idB)}
                className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-medium transition-colors shrink-0 whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="hidden sm:block p-1.5 text-stone-400 hover:text-stone-100 rounded-full hover:bg-stone-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Body: Two Columns */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-800 p-4 sm:p-6 gap-6">
          {/* Column A */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Artwork A Selector */}
              <div className="flex items-center justify-between gap-2 text-xs text-amber-400 font-mono">
                <span className="shrink-0">비교 대상 A</span>
                <select
                  value={artworkA.id}
                  onChange={(e) => {
                    const found = VAN_GOGH_ARTWORKS.find((x) => x.id === e.target.value);
                    if (found) setArtworkA(found);
                  }}
                  className="bg-stone-950 border border-stone-700 rounded px-2 py-1 text-stone-200 text-xs focus:outline-none max-w-[170px] sm:max-w-[280px] truncate"
                >
                  {VAN_GOGH_ARTWORKS.filter((x) => x.isMasterpiece).map((art) => (
                    <option key={art.id} value={art.id}>
                      {art.titleKo} ({art.year}년)
                    </option>
                  ))}
                </select>
              </div>

              {/* Artwork A Image Frame */}
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden border border-stone-800 flex items-center justify-center p-2">
                <img
                  src={artworkA.imageUrl}
                  alt={artworkA.titleKo}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Title & Specs */}
              <div>
                <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {artworkA.periodLabel}
                </span>
                <h4 className="text-lg font-bold text-stone-100 mt-1.5">{artworkA.titleKo}</h4>
                <p className="text-xs text-stone-400 font-serif italic">{artworkA.titleEn}</p>
              </div>

              {/* Dominant Colors */}
              {artworkA.dominantColors && (
                <div className="pt-1">
                  <span className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    색채 팔레트 구성
                  </span>
                  <div className="flex items-center gap-1.5">
                    {artworkA.dominantColors.map((hex, i) => (
                      <div
                        key={i}
                        className="flex-1 h-4 rounded border border-stone-700"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Details table */}
              <div className="border-t border-b border-stone-800/80 py-2 text-xs">
                <table className="w-full text-left border-collapse font-sans">
                  <tbody className="divide-y divide-stone-800/50">
                    <tr>
                      <th className="py-1.5 pr-2 font-normal text-stone-400 w-24">제작 연도</th>
                      <td className="py-1.5 text-stone-200">{artworkA.year ? `${artworkA.year}년` : '미상'}</td>
                    </tr>
                    <tr>
                      <th className="py-1.5 pr-2 font-normal text-stone-400">창작 장소</th>
                      <td className="py-1.5 text-stone-200">{artworkA.creationLocation}</td>
                    </tr>
                    <tr>
                      <th className="py-1.5 pr-2 font-normal text-stone-400">소장처</th>
                      <td className="py-1.5 text-amber-300 font-medium truncate max-w-[220px]">{artworkA.collection}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {artworkA.description && (
              <p className="text-xs text-stone-300 font-sans leading-relaxed pt-2 border-t border-stone-800/60">
                {artworkA.description}
              </p>
            )}
          </div>

          {/* Column B */}
          <div className="space-y-4 flex flex-col justify-between pt-6 md:pt-0">
            <div className="space-y-3">
              {/* Artwork B Selector */}
              <div className="flex items-center justify-between gap-2 text-xs text-amber-400 font-mono">
                <span className="shrink-0">비교 대상 B</span>
                <select
                  value={artworkB.id}
                  onChange={(e) => {
                    const found = VAN_GOGH_ARTWORKS.find((x) => x.id === e.target.value);
                    if (found) setArtworkB(found);
                  }}
                  className="bg-stone-950 border border-stone-700 rounded px-2 py-1 text-stone-200 text-xs focus:outline-none max-w-[170px] sm:max-w-[280px] truncate"
                >
                  {VAN_GOGH_ARTWORKS.filter((x) => x.isMasterpiece).map((art) => (
                    <option key={art.id} value={art.id}>
                      {art.titleKo} ({art.year}년)
                    </option>
                  ))}
                </select>
              </div>

              {/* Artwork B Image Frame */}
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden border border-stone-800 flex items-center justify-center p-2">
                <img
                  src={artworkB.imageUrl}
                  alt={artworkB.titleKo}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Title & Specs */}
              <div>
                <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {artworkB.periodLabel}
                </span>
                <h4 className="text-lg font-bold text-stone-100 mt-1.5">{artworkB.titleKo}</h4>
                <p className="text-xs text-stone-400 font-serif italic">{artworkB.titleEn}</p>
              </div>

              {/* Dominant Colors */}
              {artworkB.dominantColors && (
                <div className="pt-1">
                  <span className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    색채 팔레트 구성
                  </span>
                  <div className="flex items-center gap-1.5">
                    {artworkB.dominantColors.map((hex, i) => (
                      <div
                        key={i}
                        className="flex-1 h-4 rounded border border-stone-700"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Details table */}
              <div className="border-t border-b border-stone-800/80 py-2 text-xs">
                <table className="w-full text-left border-collapse font-sans">
                  <tbody className="divide-y divide-stone-800/50">
                    <tr>
                      <th className="py-1.5 pr-2 font-normal text-stone-400 w-24">제작 연도</th>
                      <td className="py-1.5 text-stone-200">{artworkB.year ? `${artworkB.year}년` : '미상'}</td>
                    </tr>
                    <tr>
                      <th className="py-1.5 pr-2 font-normal text-stone-400">창작 장소</th>
                      <td className="py-1.5 text-stone-200">{artworkB.creationLocation}</td>
                    </tr>
                    <tr>
                      <th className="py-1.5 pr-2 font-normal text-stone-400">소장처</th>
                      <td className="py-1.5 text-amber-300 font-medium truncate max-w-[220px]">{artworkB.collection}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {artworkB.description && (
              <p className="text-xs text-stone-300 font-sans leading-relaxed pt-2 border-t border-stone-800/60">
                {artworkB.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
