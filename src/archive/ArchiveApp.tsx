import React, { useState, useEffect } from 'react';
import { Artwork } from './types';
import { ArtworkCatalog } from './components/ArtworkCatalog';
import { InteractiveMap } from './components/InteractiveMap';
import { ExhibitionSection } from './components/ExhibitionSection';
import { CurationRooms } from './components/CurationRooms';
import { LettersArchive } from './components/LettersArchive';
import { MyCuratedRoom } from './components/MyCuratedRoom';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { ArtworkComparisonModal } from './components/ArtworkComparisonModal';
import { VAN_GOGH_ARTWORKS } from './data/vangoghArtworks';
import { Image, Map, Sparkles, Building2, Mail, Bookmark, Menu, X } from 'lucide-react';

const NAV_TABS = [
  { id: 'catalog', label: '전작 도록', icon: Image },
  { id: 'map', label: '지리 아카이브', icon: Map },
  { id: 'curation', label: '주제별 기획전', icon: Sparkles },
  { id: 'letters', label: '서간집 원문', icon: Mail },
  { id: 'exhibitions', label: '소장 미술관', icon: Building2 },
  { id: 'my-room', label: '나만의 서재', icon: Bookmark },
] as const;

export const ArchiveApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'catalog' | 'map' | 'curation' | 'exhibitions' | 'letters' | 'my-room'
  >('catalog');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [comparisonArtwork, setComparisonArtwork] = useState<Artwork | null>(null);
  const [mapTargetMuseum, setMapTargetMuseum] = useState<string | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vangogh_bookmarks');
      return saved ? JSON.parse(saved) : ['Q45585', 'Q21948567'];
    } catch {
      return ['Q45585', 'Q21948567'];
    }
  });

  useEffect(() => {
    localStorage.setItem('vangogh_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectMuseumFromModal = (museumName: string) => {
    setMapTargetMuseum(museumName);
    setActiveTab('map');
  };

  const handleGoToMapWithMuseum = (museumName: string) => {
    setMapTargetMuseum(museumName);
    setActiveTab('map');
  };

  const currentTabInfo = NAV_TABS.find((tab) => tab.id === activeTab) || NAV_TABS[0];
  const CurrentTabIcon = currentTabInfo.icon;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-stone-950/95 border-b border-stone-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* Logo & Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <a
                href="./"
                className="text-xs text-stone-400 hover:text-stone-100 transition-colors border border-stone-800 hover:border-stone-700 rounded px-2 py-1 bg-stone-900 shrink-0"
              >
                ← 복귀
              </a>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-amber-600 flex items-center justify-center text-stone-950 font-bold font-serif text-sm sm:text-base shrink-0">
                V
              </div>
              <div className="min-w-0">
                <h1 className="text-xs sm:text-sm md:text-base font-semibold tracking-tight text-stone-100 truncate">
                  빈센트 반 고흐 전작 카탈로그
                </h1>
                <p className="text-[11px] text-stone-400 hidden sm:block truncate">
                  현존 유화 {VAN_GOGH_ARTWORKS.length}점 전수 도록 및 지리 아카이브
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs (Inline on large screens) */}
            <nav className="hidden lg:flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm shrink-0">
              {NAV_TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 shrink-0 text-xs sm:text-sm ${
                      isActive
                        ? 'bg-stone-800 text-amber-300 font-medium border border-stone-700'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                    {tab.id === 'my-room' && bookmarkedIds.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-stone-900 text-stone-300 border border-stone-700 font-mono">
                        {bookmarkedIds.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile / Narrow Screen: Current Tab Pill & Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-xs text-amber-300 font-medium">
                <CurrentTabIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="max-w-[75px] sm:max-w-none truncate">{currentTabInfo.label}</span>
                {activeTab === 'my-room' && bookmarkedIds.length > 0 && (
                  <span className="text-[10px] text-amber-400 font-mono">({bookmarkedIds.length})</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="p-1.5 rounded border border-stone-800 bg-stone-900 text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
                aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-800 bg-stone-950/98 backdrop-blur-md px-3 sm:px-6 py-3 space-y-1 shadow-2xl">
            <div className="text-[11px] font-mono text-stone-400 px-2 py-1">
              아카이브 메뉴
            </div>
            {NAV_TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                    isActive
                      ? 'bg-stone-800 text-amber-300 font-medium border border-stone-700'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TabIcon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.id === 'my-room' && bookmarkedIds.length > 0 && (
                    <span className="px-2 py-0.5 rounded text-xs bg-stone-900 text-amber-400 border border-stone-700 font-mono">
                      {bookmarkedIds.length}점
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-stone-800/80 mt-2">
              <a
                href="./"
                className="flex items-center gap-2 px-3 py-2 text-xs text-stone-400 hover:text-stone-200 transition-colors"
              >
                ← 반 고흐 21 메인으로 복귀
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'catalog' && (
          <ArtworkCatalog
            onSelectArtwork={(art) => setSelectedArtwork(art)}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenComparison={(art) => setComparisonArtwork(art)}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMap
            onSelectArtwork={(art) => setSelectedArtwork(art)}
            selectedMuseumName={mapTargetMuseum}
          />
        )}

        {activeTab === 'curation' && (
          <CurationRooms onSelectArtwork={(art) => setSelectedArtwork(art)} />
        )}

        {activeTab === 'letters' && (
          <LettersArchive onSelectArtwork={(art) => setSelectedArtwork(art)} />
        )}

        {activeTab === 'exhibitions' && (
          <ExhibitionSection onGoToMapWithMuseum={handleGoToMapWithMuseum} />
        )}

        {activeTab === 'my-room' && (
          <MyCuratedRoom
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectArtwork={(art) => setSelectedArtwork(art)}
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Modals */}
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onSelectMuseum={handleSelectMuseumFromModal}
        />
      )}

      {comparisonArtwork && (
        <ArtworkComparisonModal
          initialArtworkA={comparisonArtwork}
          onClose={() => setComparisonArtwork(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-800 py-8 px-4 sm:px-6 text-xs text-stone-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-stone-300 font-medium">
              빈센트 반 고흐 전작 카탈로그 레조네 및 지리 아카이브
            </p>
            <p className="text-stone-500 mt-1">
              데이터 출처: 위키데이터, 위키미디어 커먼즈, 암스테르담 반 고흐 미술관 서간집 편찬위원회
            </p>
          </div>
          <div className="flex items-center gap-3 text-stone-500 font-mono">
            <span>수록 유화 {VAN_GOGH_ARTWORKS.length}점</span>
            <span>·</span>
            <span>창작 연대 1880 ~ 1890</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
