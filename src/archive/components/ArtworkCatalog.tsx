import React, { useState, useMemo } from 'react';
import { Artwork, PeriodCategory, GenreCategory, MediumCategory } from '../types';
import { VAN_GOGH_ARTWORKS } from '../data/vangoghArtworks';
import { Search, Filter, Sparkles, ChevronLeft, ChevronRight, Palette, Bookmark, ArrowLeftRight } from 'lucide-react';

interface ArtworkCatalogProps {
  onSelectArtwork: (artwork: Artwork) => void;
  bookmarkedIds?: string[];
  onToggleBookmark?: (id: string) => void;
  onOpenComparison?: (artwork: Artwork) => void;
}

const ITEMS_PER_PAGE = 36;

export const ArtworkCatalog: React.FC<ArtworkCatalogProps> = ({
  onSelectArtwork,
  bookmarkedIds = [],
  onToggleBookmark,
  onOpenComparison
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodCategory | 'all'>('all');
  const [selectedGenre, setSelectedGenre] = useState<GenreCategory | 'all'>('all');
  const [selectedMedium, setSelectedMedium] = useState<MediumCategory | 'all'>('all');
  const [selectedColor, setSelectedColor] = useState<'all' | 'yellow' | 'blue' | 'brown' | 'green'>('all');
  const [onlyMasterpieces, setOnlyMasterpieces] = useState<boolean>(false);
  const [yearRange, setYearRange] = useState<[number, number]>([1881, 1890]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const periods: { id: PeriodCategory | 'all'; label: string }[] = [
    { id: 'all', label: '전체 시기' },
    { id: 'netherlands', label: '초기 네덜란드 (1881~1885)' },
    { id: 'paris', label: '파리 (1886~1888)' },
    { id: 'arles', label: '남프랑스 아를 (1888~1889)' },
    { id: 'saint-remy', label: '생레미 (1889~1890)' },
    { id: 'auvers', label: '오베르 쉬르 우아즈 (1890)' }
  ];

  const genres: (GenreCategory | 'all')[] = ['all', '풍경화', '정물화', '자화상', '인물·농민화'];
  const mediums: (MediumCategory | 'all')[] = ['all', '유화', '소묘·드로잉', '수채화'];

  const colorPalettes: { id: 'all' | 'yellow' | 'blue' | 'brown' | 'green'; label: string; color: string }[] = [
    { id: 'all', label: '전체 색채', color: 'transparent' },
    { id: 'yellow', label: '아를의 옐로우', color: '#EAB308' },
    { id: 'blue', label: '코발트 블루·밤하늘', color: '#2563EB' },
    { id: 'brown', label: '뉘넌의 흙빛 브라운', color: '#78350F' },
    { id: 'green', label: '사이프러스 그린', color: '#16A34A' }
  ];

  // Filter artworks
  const filteredArtworks = useMemo(() => {
    return VAN_GOGH_ARTWORKS.filter((art) => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchTitleKo = art.titleKo.toLowerCase().includes(query);
        const matchTitleEn = art.titleEn.toLowerCase().includes(query);
        const matchCollection = art.collection.toLowerCase().includes(query);
        const matchF = art.fNumber ? art.fNumber.toLowerCase().includes(query) : false;
        if (!matchTitleKo && !matchTitleEn && !matchCollection && !matchF) {
          return false;
        }
      }

      if (selectedPeriod !== 'all' && art.period !== selectedPeriod) {
        return false;
      }

      if (selectedGenre !== 'all' && art.genre !== selectedGenre) {
        return false;
      }

      if (selectedMedium !== 'all' && art.medium !== selectedMedium) {
        return false;
      }

      if (selectedColor !== 'all' && art.colorMood !== selectedColor) {
        return false;
      }

      if (onlyMasterpieces && !art.isMasterpiece) {
        return false;
      }

      if (art.year) {
        if (art.year < yearRange[0] || art.year > yearRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedPeriod, selectedGenre, selectedMedium, selectedColor, onlyMasterpieces, yearRange]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPeriod, selectedGenre, selectedMedium, selectedColor, onlyMasterpieces, yearRange]);

  const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);
  const displayedArtworks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArtworks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArtworks, currentPage]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 sm:p-5 space-y-4">
        {/* Top row: search + masterpiece toggle */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="작품명(한국어/원제), 소장 미술관, Faille 번호로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-md text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5">
            <button
              onClick={() => setOnlyMasterpieces(!onlyMasterpieces)}
              className={`px-3 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all border shrink-0 ${
                onlyMasterpieces
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              대표 명작만 보기
            </button>

            <span className="text-xs text-stone-400 font-mono shrink-0">
              전체 {VAN_GOGH_ARTWORKS.length}점 중 <strong className="text-amber-400 font-semibold">{filteredArtworks.length}</strong>점 일치
            </span>
          </div>
        </div>

        {/* Periods chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-800/80">
          <span className="text-xs font-semibold text-stone-400 mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-amber-500" />
            창작 시기:
          </span>
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPeriod(p.id)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                selectedPeriod === p.id
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Color Palette Mood Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80 text-xs">
          <span className="text-xs font-semibold text-stone-400 mr-1 flex items-center gap-1 shrink-0">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            지배적 색채:
          </span>
          {colorPalettes.map((cp) => {
            const isSelected = selectedColor === cp.id;
            return (
              <button
                key={cp.id}
                onClick={() => setSelectedColor(cp.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-stone-100 text-stone-950 border-stone-100 font-bold shadow'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {cp.color !== 'transparent' && (
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: cp.color }}
                  />
                )}
                {cp.label}
              </button>
            );
          })}
        </div>

        {/* Genre, Medium & Year Range */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-2 text-xs border-t border-stone-800/80">
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <span className="text-stone-400 font-semibold mr-1 shrink-0">장르:</span>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-2 py-0.5 rounded ${
                  selectedGenre === g
                    ? 'bg-stone-200 text-stone-950 font-medium'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200'
                }`}
              >
                {g === 'all' ? '전체 장르' : g}
              </button>
            ))}

            <span className="text-stone-400 font-semibold ml-2 sm:ml-3 mr-1 shrink-0">재료:</span>
            {mediums.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMedium(m)}
                className={`px-2 py-0.5 rounded ${
                  selectedMedium === m
                    ? 'bg-stone-200 text-stone-950 font-medium'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200'
                }`}
              >
                {m === 'all' ? '전체' : m}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 text-stone-400 font-mono text-xs w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-800/50">
            <span className="shrink-0">제작 연도:</span>
            <input
              type="range"
              min={1881}
              max={1890}
              value={yearRange[0]}
              onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
              className="flex-1 sm:w-20 accent-amber-500 min-w-[70px]"
            />
            <span className="shrink-0 font-medium text-stone-300">{yearRange[0]}년 ~ {yearRange[1]}년</span>
            <input
              type="range"
              min={1881}
              max={1890}
              value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
              className="flex-1 sm:w-20 accent-amber-500 min-w-[70px]"
            />
          </div>
        </div>
      </div>

      {/* Artworks Grid */}
      {displayedArtworks.length === 0 ? (
        <div className="text-center py-24 bg-stone-900/50 border border-stone-800 rounded-lg">
          <p className="text-stone-400 text-sm">해당 조건과 일치하는 작품이 없습니다.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedPeriod('all');
              setSelectedGenre('all');
              setSelectedMedium('all');
              setSelectedColor('all');
              setOnlyMasterpieces(false);
              setYearRange([1881, 1890]);
            }}
            className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline font-medium"
          >
            모든 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedArtworks.map((artwork) => {
            const isBookmarked = bookmarkedIds.includes(artwork.id);
            return (
              <div
                key={artwork.id}
                className="group bg-stone-900 border border-stone-800 rounded-md overflow-hidden hover:border-amber-500/70 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                {/* Image Top */}
                <div
                  onClick={() => onSelectArtwork(artwork)}
                  className="relative aspect-[4/3] bg-stone-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={artwork.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={artwork.titleKo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {artwork.isMasterpiece && (
                    <span className="absolute top-1.5 left-1.5 bg-amber-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      걸작
                    </span>
                  )}

                  {artwork.fNumber && (
                    <span className="absolute bottom-1.5 right-1.5 bg-stone-950/80 text-stone-400 text-[9px] font-mono px-1 rounded">
                      {artwork.fNumber}
                    </span>
                  )}

                  {/* Bookmark quick button */}
                  {onToggleBookmark && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(artwork.id);
                      }}
                      title={isBookmarked ? '서재에서 제거' : '서재에 보관'}
                      className={`absolute top-1.5 right-1.5 p-1 rounded-full backdrop-blur transition-all ${
                        isBookmarked
                          ? 'bg-amber-500 text-stone-950 shadow'
                          : 'bg-stone-950/60 text-stone-400 hover:text-amber-300 hover:bg-stone-900'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-stone-950' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Card Meta Body */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div onClick={() => onSelectArtwork(artwork)} className="cursor-pointer">
                    <h3 className="text-xs font-semibold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {artwork.titleKo}
                    </h3>
                    <p className="text-[11px] text-stone-400 font-serif italic line-clamp-1 mt-0.5">
                      {artwork.titleEn}
                    </p>
                  </div>

                  {/* Dominant Color Palette Preview Dots */}
                  {artwork.dominantColors && artwork.dominantColors.length > 0 && (
                    <div className="flex items-center gap-1 pt-1">
                      {artwork.dominantColors.map((hex, i) => (
                        <span
                          key={i}
                          style={{ backgroundColor: hex }}
                          className="w-2.5 h-2.5 rounded-full border border-stone-800"
                          title={hex}
                        />
                      ))}
                    </div>
                  )}

                  {/* Card Bottom Row: Museum & Comparison Button */}
                  <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between gap-1.5 text-[10px] text-stone-400">
                    <span className="truncate flex-1 min-w-0" title={artwork.collection}>
                      {artwork.year ? `${artwork.year}년` : artwork.collection}
                    </span>

                    {onOpenComparison && (
                      <button
                        onClick={() => onOpenComparison(artwork)}
                        title="다른 작품과 1:1 비교"
                        className="text-stone-400 hover:text-amber-400 flex items-center gap-0.5 font-mono text-[9px] bg-stone-950 px-1.5 py-0.5 rounded border border-stone-800 hover:border-amber-500/50 transition-colors shrink-0"
                      >
                        <ArrowLeftRight className="w-2.5 h-2.5" />
                        비교
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-4 pb-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
            className="p-1.5 sm:p-2 rounded bg-stone-900 border border-stone-800 text-stone-300 disabled:opacity-30 hover:bg-stone-800 transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Desktop pagination (up to 9) */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-mono">
            {Array.from({ length: Math.min(totalPages, 9) }).map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 9 && currentPage > 5) {
                pageNum = currentPage - 4 + i;
                if (pageNum > totalPages) pageNum = totalPages - (8 - i);
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded flex items-center justify-center font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-100 border border-stone-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Mobile pagination (up to 5) */}
          <div className="flex sm:hidden items-center gap-1 text-xs font-mono">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded flex items-center justify-center font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-100 border border-stone-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지"
            className="p-1.5 sm:p-2 rounded bg-stone-900 border border-stone-800 text-stone-300 disabled:opacity-30 hover:bg-stone-800 transition-colors shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
