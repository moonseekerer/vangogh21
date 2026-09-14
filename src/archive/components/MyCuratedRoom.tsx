import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { VAN_GOGH_ARTWORKS } from '../data/vangoghArtworks';
import { Bookmark, Sparkles, Trash2, Edit3, Check, Share2, Plus, ExternalLink } from 'lucide-react';

interface MyCuratedRoomProps {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onGoToCatalog: () => void;
}

export const MyCuratedRoom: React.FC<MyCuratedRoomProps> = ({
  bookmarkedIds,
  onToggleBookmark,
  onSelectArtwork,
  onGoToCatalog
}) => {
  const [roomTitle, setRoomTitle] = useState<string>(() => {
    return localStorage.getItem('vangogh_curated_title') || '개인 수장고 및 선별 서재';
  });
  const [curatorStatement, setCuratorStatement] = useState<string>(() => {
    return (
      localStorage.getItem('vangogh_curated_desc') ||
      '전작 도록에서 선별한 빈센트 반 고흐의 주요 작품 목록입니다.'
    );
  });
  const [isEditingMeta, setIsEditingMeta] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('vangogh_curated_title', roomTitle);
  }, [roomTitle]);

  useEffect(() => {
    localStorage.setItem('vangogh_curated_desc', curatorStatement);
  }, [curatorStatement]);

  const curatedArtworks = React.useMemo(() => {
    const set = new Set(bookmarkedIds);
    return VAN_GOGH_ARTWORKS.filter((a) => set.has(a.id));
  }, [bookmarkedIds]);

  const handleShareRoom = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleAddQuickRecommendations = () => {
    // Add 4 top masterpieces to bookmarks
    const recommended = ['Q45585', 'Q21948567', 'Q1025704', 'Q18713070'];
    recommended.forEach((id) => {
      if (!bookmarkedIds.includes(id)) {
        onToggleBookmark(id);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Curation Header & Studio Editor */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Bookmark className="w-3.5 h-3.5 fill-amber-400" />
              <span>개인 선별 서재</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-400">선별 작품 {curatedArtworks.length}점</span>
            </div>

            {isEditingMeta ? (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  className="w-full text-xl sm:text-2xl font-bold bg-stone-950 border border-amber-500 rounded px-3 py-1.5 text-stone-100 focus:outline-none"
                  placeholder="서재 제목을 입력하세요..."
                />
                <textarea
                  value={curatorStatement}
                  onChange={(e) => setCuratorStatement(e.target.value)}
                  rows={2}
                  className="w-full text-xs sm:text-sm bg-stone-950 border border-stone-700 rounded px-3 py-2 text-stone-200 focus:outline-none"
                  placeholder="서재 해설을 입력하세요..."
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight">
                  {roomTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1.5 font-sans leading-relaxed">
                  {curatorStatement}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => setIsEditingMeta(!isEditingMeta)}
              className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-medium text-stone-200 flex items-center gap-1.5 transition-colors"
            >
              {isEditingMeta ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  저장 완료
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  제목·해설 수정
                </>
              )}
            </button>

            <button
              onClick={handleShareRoom}
              className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedNotification ? '링크 복사 완료' : '서재 링크 공유'}
            </button>
          </div>
        </div>

        {/* Gallery Wall Grid */}
        {curatedArtworks.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-sm text-stone-400">
              아직 보관된 작품이 없습니다.
            </p>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              전작 도록에서 보관 아이콘을 누르면 이곳에 나만의 선별 서재가 구성됩니다.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleAddQuickRecommendations}
                className="px-4 py-2 rounded-md bg-stone-800 hover:bg-stone-700 border border-amber-500/50 text-xs font-semibold text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                대표작 4점 즉시 추가
              </button>
              <button
                onClick={onGoToCatalog}
                className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors"
              >
                전작 도록 둘러보기
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {curatedArtworks.map((art, idx) => (
              <div
                key={art.id}
                className="bg-stone-950 border border-stone-800 rounded-lg p-3 shadow-lg flex flex-col justify-between group hover:border-amber-500/60 transition-all duration-300"
              >
                {/* Artwork Frame */}
                <div
                  onClick={() => onSelectArtwork(art)}
                  className="aspect-[4/3] bg-black rounded overflow-hidden cursor-pointer relative"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.titleKo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-stone-950/80 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded border border-stone-700">
                    보관 순서 {idx + 1}
                  </span>
                </div>

                {/* Museum Style Label Plate */}
                <div className="mt-4 pt-3 border-t border-stone-800 flex items-start justify-between gap-3">
                  <div className="cursor-pointer" onClick={() => onSelectArtwork(art)}>
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                      {art.titleKo}
                    </h4>
                    <p className="text-xs text-stone-400 font-serif italic">
                      {art.titleEn}
                    </p>
                    <p className="text-[11px] text-stone-400 font-mono mt-1">
                      {art.year ? `${art.year}년` : ''} · {art.collection}
                    </p>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(art.id)}
                    title="서재에서 제거"
                    className="p-1.5 rounded text-stone-400 hover:text-red-400 hover:bg-stone-900 border border-transparent hover:border-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
