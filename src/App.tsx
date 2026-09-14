import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArtworkCard } from './components/ArtworkCard';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CertificateCard } from './components/CertificateCard';
import { VaultModal } from './components/VaultModal';
import { CuratorAboutModal } from './components/CuratorAboutModal';
import { SalonModal } from './components/SalonModal';
import { JudgeGuideBanner } from './components/JudgeGuideBanner';
import { MOCK_ARTWORKS } from './data/mockArtworks';
import { Artwork, OwnershipCertificate } from './types';
import { Sparkles, ShieldCheck, X, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'vangogh21_certificates_v2';
const ARTWORKS_STORAGE_KEY = 'vangogh21_artworks_v2';

// Auto-migrate legacy localStorage entries to replace '박문식' with '김모두'
try {
  ['vangogh21_artworks', 'vangogh21_certificates', 'vangogh21_salon_posts', 'vangogh21_artworks_v2', 'vangogh21_certificates_v2'].forEach(key => {
    const val = localStorage.getItem(key);
    if (val && val.includes('박문식')) {
      localStorage.setItem(key, val.replace(/박문식/g, '김모두'));
    }
  });
} catch (e) {
  // ignore
}

// Initial sample certificates for testing
const INITIAL_SAMPLE_CERT: OwnershipCertificate = {
  certificateId: 'cert-sample-01',
  serialNumber: 'VG21-ORIGINAL-2026-108',
  artworkId: 'fiji-01',
  artworkTitle: '태평양의 석양과 밤의 경계',
  artistName: '타니엘라 라부부',
  collectorName: '김모두',
  collectorPhone: '010-9876-5432',
  purchaseType: 'original_vault',
  price: 195000,
  mintedAt: '2026-09-12',
  vaultStatus: 'in_vault',
  vaultExpiryDate: '2027-09-12',
};

const INITIAL_SAMPLE_PRINT_CERT: OwnershipCertificate = {
  certificateId: 'cert-sample-02',
  serialNumber: 'VG21-PRINT-2026-042',
  artworkId: 'fiji-02',
  artworkTitle: '맹그로브 숲의 침묵',
  artistName: '마리카 나이라',
  collectorName: '김모두',
  collectorPhone: '010-9876-5432',
  purchaseType: 'art_print',
  price: 34000,
  mintedAt: '2026-09-13',
  vaultStatus: 'delivered',
  shippingAddress: {
    recipient: '김모두',
    phone: '010-9876-5432',
    address: '서울특별시 성동구 성수이로 22 (성수 어반스페이스 3층)',
    postalCode: '04781',
  },
};

export const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    try {
      const saved = localStorage.getItem(ARTWORKS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((a: Artwork) => ({
          ...a,
          originalCollector: a.originalCollector ? a.originalCollector.replace('박문식', '김모두') : a.originalCollector
        }));
      }
    } catch (e) {
      // ignore
    }
    return MOCK_ARTWORKS;
  });

  const [filter, setFilter] = useState<'all' | 'available' | 'sold'>('all');
  
  // Modals state
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [checkoutArtwork, setCheckoutArtwork] = useState<Artwork | null>(null);
  const [checkoutType, setCheckoutType] = useState<'original_vault' | 'art_print'>('original_vault');
  const [checkoutPrice, setCheckoutPrice] = useState<number>(0);
  
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSalonOpen, setIsSalonOpen] = useState(false);
  const [newlyMintedCert, setNewlyMintedCert] = useState<OwnershipCertificate | null>(null);

  // Secret Easter Egg Trigger (Keyboard typing OR Mobile 3-tap on logo)
  const [secretPromptOpen, setSecretPromptOpen] = useState<boolean>(false);
  const [secretTransitioning, setSecretTransitioning] = useState<boolean>(false);
  const [matchedSecretCode, setMatchedSecretCode] = useState<string>('');
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const keyBufferRef = useRef<string>('');

  const triggerSecretPrompt = (code: string) => {
    if (secretPromptOpen || secretTransitioning) return;
    setMatchedSecretCode(code);
    setSecretPromptOpen(true);
  };

  const handleConfirmWarp = () => {
    setSecretPromptOpen(false);
    setSecretTransitioning(true);
  };

  useEffect(() => {
    if (secretTransitioning) {
      const pTimer = setTimeout(() => setTransitionProgress(100), 50);
      const navTimer = setTimeout(() => {
        window.location.href = './archive.html';
      }, 950);
      return () => {
        clearTimeout(pTimer);
        clearTimeout(navTimer);
      };
    } else {
      setTransitionProgress(0);
    }
  }, [secretTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If secret prompt modal is open: Escape closes, Enter confirms
      if (secretPromptOpen) {
        if (e.key === 'Escape') {
          setSecretPromptOpen(false);
          return;
        }
        if (e.key === 'Enter') {
          handleConfirmWarp();
          return;
        }
      }

      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key && e.key.length === 1) {
        keyBufferRef.current = (keyBufferRef.current + e.key.toLowerCase()).slice(-10);

        if (
          keyBufferRef.current.endsWith('gogh') ||
          keyBufferRef.current.endsWith('1890') ||
          keyBufferRef.current.endsWith('vangogh')
        ) {
          let code = 'GOGH';
          if (keyBufferRef.current.endsWith('1890')) code = '1890';
          else if (keyBufferRef.current.endsWith('vangogh')) code = 'VAN GOGH';

          triggerSecretPrompt(code);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretPromptOpen, secretTransitioning]);

  // Sync artworks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(artworks));
    } catch (e) {
      // ignore
    }
  }, [artworks]);

  // Certificates in LocalStorage
  const [certificates, setCertificates] = useState<OwnershipCertificate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const mapped = parsed.map((c: OwnershipCertificate) => ({
          ...c,
          collectorName: c.collectorName ? c.collectorName.replace('박문식', '김모두') : '김모두'
        }));
        if (!mapped.some((c: OwnershipCertificate) => c.purchaseType === 'art_print')) {
          return [...mapped, INITIAL_SAMPLE_PRINT_CERT];
        }
        return mapped;
      }
    } catch (e) {
      // ignore
    }
    return [INITIAL_SAMPLE_CERT, INITIAL_SAMPLE_PRINT_CERT];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
    } catch (e) {
      // ignore
    }
  }, [certificates]);

  // Auto-open certificate modal if ?verify= query param is present
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const verifySerial = params.get('verify');
      if (verifySerial) {
        const found = certificates.find(c => c.serialNumber === verifySerial);
        if (found) {
          setIsVaultOpen(true);
        } else {
          const publicCert: OwnershipCertificate = {
            certificateId: `shared-${verifySerial}`,
            serialNumber: verifySerial,
            artworkId: 'fiji-01',
            artworkTitle: '태평양의 석양과 밤의 경계',
            artistName: '타니엘라 라부부',
            collectorName: '김모두',
            collectorPhone: '010-****-5432',
            purchaseType: 'original_vault',
            price: 195000,
            mintedAt: '2026-09-12',
            vaultStatus: 'in_vault',
            vaultExpiryDate: '2027-09-12',
          };
          setCertificates(prev => [publicCert, ...prev.filter(c => c.serialNumber !== verifySerial)]);
          setIsVaultOpen(true);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Handlers
  const handleOpenDetail = (artwork: Artwork) => {
    const current = artworks.find(a => a.id === artwork.id) || artwork;
    setSelectedArtwork(current);
  };

  const handleStartCheckout = (artwork: Artwork, type: 'original_vault' | 'art_print', price: number) => {
    setSelectedArtwork(null);
    setCheckoutArtwork(artwork);
    setCheckoutType(type);
    setCheckoutPrice(price);
  };

  const handleCheckoutComplete = (newCert: OwnershipCertificate) => {
    setCertificates(prev => [newCert, ...prev]);

    // If original was purchased, immediately mark artwork as sold out!
    if (newCert.purchaseType === 'original_vault') {
      setArtworks(prev => prev.map(art => {
        if (art.id === newCert.artworkId) {
          return {
            ...art,
            isOriginalSold: true,
            originalCollector: `${newCert.collectorName} 님`,
          };
        }
        return art;
      }));
    }

    setCheckoutArtwork(null);
    setNewlyMintedCert(newCert);
  };

  const handleResetDemo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ARTWORKS_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setArtworks(MOCK_ARTWORKS);
    setCertificates([INITIAL_SAMPLE_CERT, INITIAL_SAMPLE_PRINT_CERT]);
  };

  const handleUpdateCertificate = (updated: OwnershipCertificate) => {
    setCertificates(prev => prev.map(c => c.certificateId === updated.certificateId ? updated : c));
  };

  const filteredArtworks = artworks.filter(a => {
    if (filter === 'available') return !a.isOriginalSold;
    if (filter === 'sold') return a.isOriginalSold;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-vangogh-canvas text-vangogh-charcoal">
      
      {/* Top Navigation */}
      <Navbar 
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSalon={() => setIsSalonOpen(true)}
        vaultCount={certificates.length}
        onSecretTrigger={() => triggerSecretPrompt('3-TAP')}
      />

      {/* Main Hero */}
      <HeroSection 
        onExploreClick={() => {
          const el = document.getElementById('season-artworks');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Curated Artworks Section */}
      <main id="season-artworks" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex-1 w-full">
        
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-vangogh-charcoal/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-vangogh-gold uppercase tracking-wider mb-1">
              <span>CURATED EXHIBITION</span>
              <span>·</span>
              <span>SEASON 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-vangogh-navy">
              피지(Fiji) 신예 아티스트 원화 큐레이션
            </h2>
            <p className="text-xs sm:text-sm text-vangogh-charcoal/70 mt-1">
              현지 파트너십을 통해 발굴한 남태평양 피지 작가들의 오리지널 원화 및 공식 아트 프린트입니다.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-vangogh-stone p-1 rounded-xl text-xs font-medium self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' 
                  ? 'bg-vangogh-navy text-white font-bold shadow-sm' 
                  : 'text-vangogh-charcoal/70 hover:text-vangogh-charcoal'
              }`}
            >
              전체 작품 ({artworks.length})
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'available' 
                  ? 'bg-vangogh-navy text-white font-bold shadow-sm' 
                  : 'text-vangogh-charcoal/70 hover:text-vangogh-charcoal'
              }`}
            >
              원작 소장 가능 ({artworks.filter(a => !a.isOriginalSold).length})
            </button>
            <button
              onClick={() => setFilter('sold')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'sold' 
                  ? 'bg-vangogh-navy text-white font-bold shadow-sm' 
                  : 'text-vangogh-charcoal/70 hover:text-vangogh-charcoal'
              }`}
            >
              원작 소장 완료 ({artworks.filter(a => a.isOriginalSold).length})
            </button>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard 
              key={artwork.id} 
              artwork={artwork} 
              onSelect={handleOpenDetail} 
            />
          ))}
        </div>

        {/* Season Logistics Notice */}
        <div className="mt-14 p-6 bg-white border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-vangogh-navy flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-vangogh-gold" />
              <span>피지 시즌 1 일괄 단체 수거 및 안심 보관 안내</span>
            </h3>
            <p className="text-xs text-vangogh-charcoal/70 leading-relaxed max-w-2xl">
              시즌 1 종료 직후 소장 및 주문이 완료된 원화는 현지 거점에서 정기 항공 특송으로 국내 일괄 반입됩니다. 
              소장자는 원할 때 언제든 실제 작품 교환을 신청하거나 1년간 무상 보관 혜택을 이용할 수 있습니다.
            </p>
          </div>

          <button
            onClick={() => setIsAboutOpen(true)}
            className="px-4 py-2 text-xs font-semibold bg-neutral-100 border border-neutral-300 text-vangogh-navy hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
          >
            기획 배경 및 정산 원칙 확인
          </button>
        </div>

        {/* Next Season Teaser */}
        <section className="mt-12 pt-8 border-t border-neutral-200">
          <div className="relative overflow-hidden bg-[#0A101D] text-white p-7 sm:p-9 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm group">
            {/* Background Mongolian Steppe Oil Painting Image */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <img 
                src="./images/season2_mongolia.jpg" 
                alt="시즌 2 몽골 초원 유화 배경" 
                className="absolute inset-0 w-full h-full object-cover scale-110 opacity-35 filter contrast-110 brightness-90 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060B18]/95 via-[#0A101D]/80 to-[#060B18]/85"></div>
            </div>

            {/* Content Foreground */}
            <div className="relative z-10 space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-vangogh-gold uppercase font-semibold">
                <span>NEXT SEASON</span>
                <span className="text-white/30">/</span>
                <span>COMING SOON</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>시즌 2 : 끝없는 지평선의 서사, 몽골 (Mongolia)</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                남태평양 피지에 이어, 반 고흐 21의 시선은 중앙아시아의 거친 초원으로 향합니다. 
                제도권 갤러리와 단절된 채 영하 30도의 혹한과 유목의 삶을 묵묵히 캔버스에 기록해 온 몽골 청년 화가들을 곧 소개합니다.
              </p>
            </div>

            <div className="relative z-10 shrink-0 flex flex-col sm:items-end gap-1 pt-2 md:pt-0">
              <span className="text-xs font-mono text-vangogh-gold font-bold tracking-wider px-2.5 py-1 rounded bg-black/40 border border-vangogh-gold/30">
                2026. AUTUMN OPEN
              </span>
              <span className="text-[11px] text-white/60">
                현지 작가 인터뷰 및 1차 아카이빙 진행 중
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-vangogh-charcoal/10 bg-vangogh-canvas py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-vangogh-charcoal/60">
          
          <div className="flex items-center gap-3">
            <img 
              src="./logo.jpg" 
              alt="반 고흐 21 로고" 
              className="w-8 h-8 rounded-full border border-vangogh-gold/40"
            />
            <div>
              <span className="font-bold text-sm text-vangogh-navy block">
                반 고흐 21 (Van Gogh 21)
              </span>
              <span className="text-[11px] text-vangogh-charcoal/50">
                개발도상국 청년 예술가와 일상 공간을 잇는 소셜 아트 플랫폼
              </span>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="font-medium text-vangogh-navy">
              모두의 창업 2차 출품 프로젝트 | 반 고흐 21
            </p>
            <p className="text-[11px] text-vangogh-charcoal/40">
              © 2026 Van Gogh 21. All rights reserved. Field Hub: Suva & Nadi, Fiji.
            </p>
          </div>

        </div>
      </footer>

      {/* Modals */}
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onSelectOption={handleStartCheckout}
        />
      )}

      {checkoutArtwork && (
        <CheckoutModal
          artwork={checkoutArtwork}
          purchaseType={checkoutType}
          price={checkoutPrice}
          onClose={() => setCheckoutArtwork(null)}
          onComplete={handleCheckoutComplete}
        />
      )}

      {/* Newly Minted Certificate Celebration Modal */}
      {newlyMintedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vangogh-navy/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-vangogh-charcoal/10 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-vangogh-charcoal/10 pb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-vangogh-gold">
                <Sparkles className="w-4 h-4" />
                <span>발급 완료 : 1호 공식 소장 보증서</span>
              </div>
              <button 
                onClick={() => setNewlyMintedCert(null)}
                className="p-1 rounded-full hover:bg-vangogh-stone"
              >
                <X className="w-4 h-4 text-vangogh-charcoal/70" />
              </button>
            </div>

            <CertificateCard 
              certificate={newlyMintedCert}
              artwork={artworks.find(a => a.id === newlyMintedCert.artworkId)}
              onOpenRedeem={() => {
                setNewlyMintedCert(null);
                setIsVaultOpen(true);
              }}
            />

            <button
              onClick={() => {
                setNewlyMintedCert(null);
                setIsVaultOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-vangogh-navy text-white text-xs font-bold hover:bg-vangogh-blue transition-colors"
            >
              내 보관함에서 전체 목록 확인하기
            </button>
          </div>
        </div>
      )}

      {isVaultOpen && (
        <VaultModal
          certificates={certificates}
          artworks={artworks}
          onClose={() => setIsVaultOpen(false)}
          onUpdateCertificate={handleUpdateCertificate}
        />
      )}

      {isAboutOpen && (
        <CuratorAboutModal 
          onClose={() => setIsAboutOpen(false)}
        />
      )}

      {isSalonOpen && (
        <SalonModal
          certificates={certificates}
          artworks={artworks}
          onClose={() => setIsSalonOpen(false)}
          onExploreArtworks={() => {
            const el = document.getElementById('season-artworks');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Persistent floating judge guide */}
      <JudgeGuideBanner 
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSalon={() => setIsSalonOpen(true)}
        onResetDemo={handleResetDemo}
      />
      {/* Secret Easter Egg Confirmation Modal */}
      {secretPromptOpen && (
        <div className="fixed inset-0 z-[9999] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-[#0b101d] border border-stone-700/80 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center text-stone-100 overflow-hidden animate-fade-in">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            {/* Emblem */}
            <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-stone-900/90 mx-auto mb-3 flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-inner">
              V
            </div>

            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono text-amber-400 bg-amber-950/50 border border-amber-800/60 mb-2.5">
              시크릿 코드 감지: {matchedSecretCode}
            </div>

            <h3 className="text-xl font-bold font-serif text-stone-100 mb-2 tracking-tight">
              빈센트 반 고흐 전작 아카이브
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6 font-sans">
              현존 유화 703점 전수 도록, 10개년 창작 여정 지리 아카이브 및 테오와의 서간집 원문이 보존된 전용 아카이브 공간으로 이동하시겠습니까?
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setSecretPromptOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800/60 transition-colors order-2 sm:order-1"
              >
                현재 페이지에 머무르기
              </button>
              <button
                type="button"
                onClick={handleConfirmWarp}
                className="flex-1 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-sm order-1 sm:order-2 flex items-center justify-center gap-1.5"
              >
                <span>아카이브 입장</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Cinematic Transition Screen */}
      {secretTransitioning && (
        <div className="fixed inset-0 z-[10000] bg-[#05070d] flex flex-col items-center justify-center p-6 text-center text-stone-100 select-none overflow-hidden">
          {/* Radial ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(217,119,6,0.12)_0%,_rgba(5,7,13,0.95)_70%)] pointer-events-none" />

          {/* Central Monogram */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border border-amber-500/40 flex items-center justify-center bg-stone-900/60 backdrop-blur shadow-[0_0_30px_rgba(245,158,11,0.15)] animate-pulse">
              <span className="font-serif font-bold text-3xl text-amber-300">
                V
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-2 max-w-sm">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-tight">
              빈센트 반 고흐 전작 아카이브
            </h3>
            <p className="text-xs text-stone-400 font-sans">
              현존 유화 703점 전수 도록 및 지리 아카이브 연결 중
            </p>

            {/* Hairline Progress Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-stone-800 rounded-full overflow-hidden mx-auto mt-5">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-900 ease-out"
                style={{ width: `${transitionProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;

