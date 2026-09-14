import React, { useState } from 'react';
import { OwnershipCertificate, Artwork } from '../types';
import { RefreshCw, Download, CheckCircle2 } from 'lucide-react';

// Artist Signatures in Authentic White Ink
const TanielaSignature = () => (
  <svg viewBox="0 0 220 54" className="h-10 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18 C28 14 50 15 64 17" strokeWidth="2.2" />
    <path d="M38 17 C35 27 30 38 27 43 C25 46 29 47 34 43" strokeWidth="2" />
    <path d="M36 38 C40 33 46 33 45 38 C44 43 38 43 44 42 C47 36 51 36 53 42 C56 36 60 36 62 42 C64 28 65 24 66 43 C69 36 74 35 77 42" strokeWidth="1.8" />
    <circle cx="58" cy="28" r="1.2" fill="#FFFFFF" stroke="none" />
    <path d="M88 28 C83 18 86 12 91 14 C96 16 93 28 89 42 C88 45 100 43 112 40" strokeWidth="2.2" />
    <path d="M112 37 C115 32 120 33 119 38 C118 42 113 42 118 41 C121 35 125 35 126 41 C129 35 133 35 134 41 C137 35 141 35 143 41" strokeWidth="1.8" />
    <path d="M20 48 C65 49 135 46 168 38" strokeWidth="1.8" />
    <path d="M158 42 C166 39 172 36 176 33" strokeWidth="1.6" />
  </svg>
);

const MarikaSignature = () => (
  <svg viewBox="0 0 220 54" className="h-10 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 41 C18 30 21 18 24 14 C26 21 31 35 34 39 C36 31 40 16 44 18 C46 23 48 34 49 42" strokeWidth="2.3" />
    <path d="M52 37 C54 32 60 33 59 38 C58 42 53 42 58 41 C61 35 65 35 67 41 C69 35 70 33 71 41 C73 27 75 23 76 41 C78 35 83 34 85 41" strokeWidth="1.8" />
    <circle cx="71" cy="26" r="1.2" fill="#FFFFFF" stroke="none" />
    <path d="M98 41 C100 29 102 17 104 15 C107 23 116 37 118 42 C119 34 122 21 125 19" strokeWidth="2.3" />
    <path d="M128 37 C130 32 135 33 134 38 C133 42 129 42 133 41 C136 35 137 33 139 41 C141 35 145 35 147 41 C150 35 155 34 157 41" strokeWidth="1.8" />
    <circle cx="138" cy="26" r="1.2" fill="#FFFFFF" stroke="none" />
    <path d="M20 49 C55 50 100 45 135 49 C155 51 172 46 182 40" strokeWidth="1.8" />
  </svg>
);

const AtecaSignature = () => (
  <svg viewBox="0 0 220 54" className="h-10 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 42 C24 31 31 17 36 14 C40 15 42 25 43 41 M23 33 C31 31 40 32 46 32" strokeWidth="2.2" />
    <path d="M49 23 C49 31 49 39 50 42 M45 29 C51 28 56 28 58 28" strokeWidth="1.8" />
    <path d="M54 37 C54 33 59 33 60 37 C58 41 54 41 61 41 C65 35 70 35 71 41 C74 35 79 34 81 41" strokeWidth="1.8" />
    <path d="M99 23 C94 21 89 26 89 33 C89 40 95 43 102 41" strokeWidth="2.3" />
    <path d="M106 33 C107 36 107 39 108 42 M111 35 C113 40 115 42 117 35 M120 37 C122 32 127 33 126 38 C125 42 121 42 125 41" strokeWidth="1.8" />
    <circle cx="107" cy="26" r="1.2" fill="#FFFFFF" stroke="none" />
    <path d="M18 47 C48 48 105 47 145 43 C156 42 162 37 158 34" strokeWidth="1.7" />
  </svg>
);

const ViliameSignature = () => (
  <svg viewBox="0 0 220 54" className="h-10 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 19 C20 27 25 39 29 43 C32 39 39 25 43 21" strokeWidth="2.4" />
    <path d="M47 32 C48 36 48 40 49 42 M52 21 C52 31 52 39 53 42 M56 32 C57 36 57 40 58 42 M61 37 C63 32 68 33 67 38 C66 42 62 42 66 41 M70 35 C72 40 74 35 76 40 C78 35 81 35 83 42" strokeWidth="1.8" />
    <circle cx="48" cy="25" r="1.2" fill="#FFFFFF" stroke="none" />
    <circle cx="57" cy="25" r="1.2" fill="#FFFFFF" stroke="none" />
    <path d="M94 17 C94 27 94 37 94 43 M106 23 C102 27 97 31 95 32 M98 32 C101 35 106 40 109 43" strokeWidth="2.3" />
    <path d="M113 37 C112 33 117 33 117 38 C117 42 112 42 116 41 C119 35 122 35 124 41 C127 37 127 33 131 33 C134 33 134 40 130 41" strokeWidth="1.8" />
    <path d="M14 47 C45 46 95 46 132 44 M137 44 C143 44 152 43 155 41" strokeWidth="2.1" />
  </svg>
);

const GenericSignature = () => (
  <svg viewBox="0 0 220 54" className="h-10 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 28 C28 16 38 16 44 33 C49 43 59 23 74 28 C88 33 102 18 118 33 C132 43 148 23 162 28" strokeWidth="2" />
    <path d="M16 45 C58 47 118 45 170 41" strokeWidth="1.8" />
  </svg>
);

const ArtistSignature: React.FC<{ artistName: string }> = ({ artistName }) => {
  if (artistName.includes('타니엘라') || artistName.toLowerCase().includes('taniela')) {
    return <TanielaSignature />;
  }
  if (artistName.includes('마리카') || artistName.toLowerCase().includes('marika')) {
    return <MarikaSignature />;
  }
  if (artistName.includes('아테카') || artistName.toLowerCase().includes('ateca')) {
    return <AtecaSignature />;
  }
  if (artistName.includes('빌리아메') || artistName.toLowerCase().includes('viliame')) {
    return <ViliameSignature />;
  }
  return <GenericSignature />;
};

const getArtistEnglishName = (name: string): string => {
  if (name.includes('타니엘라') || name.toLowerCase().includes('taniela')) return 'Taniela Lavuvu';
  if (name.includes('마리카') || name.toLowerCase().includes('marika')) return 'Marika Naira';
  if (name.includes('아테카') || name.toLowerCase().includes('ateca')) return 'Ateca Civa';
  if (name.includes('빌리아메') || name.toLowerCase().includes('viliame')) return 'Viliame Koro';
  return name;
};

interface CertificateCardProps {
  certificate: OwnershipCertificate;
  artwork?: Artwork;
  onOpenRedeem?: (cert: OwnershipCertificate) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, artwork, onOpenRedeem }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isRedeemed = certificate.vaultStatus === 'redeemed';

  const handleCopyLink = () => {
    let verifyUrl = `https://vangogh-21.web.app/?verify=${certificate.serialNumber}`;
    if (typeof window !== 'undefined' && window.location.origin) {
      if (window.location.origin.includes('github.io')) {
        verifyUrl = `https://moonseekerer.github.io/vangogh21/?verify=${certificate.serialNumber}`;
      } else if (window.location.origin.includes('web.app') || window.location.origin.includes('firebaseapp.com')) {
        verifyUrl = `https://vangogh-21.web.app/?verify=${certificate.serialNumber}`;
      } else {
        const path = window.location.pathname.replace(/\/+$/, '');
        verifyUrl = `${window.location.origin}${path}/?verify=${certificate.serialNumber}`;
      }
    }
    navigator.clipboard.writeText(verifyUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-sm mx-auto">
      
      {/* 3D Flip Card Container */}
      <div 
        className="w-full aspect-[4/5] perspective cursor-pointer transition-transform duration-300"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}>
          
          {/* Card Front */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-6 certificate-card text-vangogh-canvas flex flex-col justify-between [backface-visibility:hidden] select-none">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-vangogh-gold/20 pb-3">
              <div className="flex items-center gap-2">
                <img 
                  src="./logo.jpg" 
                  alt="반 고흐 21 로고" 
                  className="w-7 h-7 rounded-full border border-vangogh-gold/40"
                />
                <span className="text-xs tracking-widest text-vangogh-gold uppercase font-bold">
                  VAN GOGH 21
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-vangogh-gold/90 px-2 py-0.5 rounded bg-vangogh-navy/80 border border-vangogh-gold/30">
                {certificate.serialNumber}
              </span>
            </div>

            {/* Middle Artwork Thumbnail & Title */}
            <div className="space-y-3 my-auto">
              <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden border border-vangogh-gold/40 shadow-md">
                <img 
                  src={artwork?.imageUrl || "./artworks/artwork-01.jpg"} 
                  alt={certificate.artworkTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center space-y-1">
                <span className="text-[11px] text-vangogh-gold uppercase tracking-wider block">
                  {certificate.purchaseType === 'original_vault' ? '원작 1:1 독점 소장 증명서' : '공식 아트 프린팅 주문 증명서'}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {certificate.artworkTitle}
                </h3>
                <p className="text-xs text-vangogh-canvas/70">
                  작가 : {certificate.artistName} (Fiji)
                </p>
              </div>
            </div>

            {/* Bottom Status & Collector Info */}
            <div className="border-t border-vangogh-gold/20 pt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-vangogh-canvas/60">
                  {certificate.purchaseType === 'original_vault' ? '공식 독점 소장자' : '주문자 / 수령인'}
                </span>
                <span className="font-bold text-vangogh-gold">{(certificate.collectorName || '김모두').replace('박문식', '김모두')} 님</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-vangogh-canvas/60">발급 일자</span>
                <span className="text-vangogh-canvas/80 font-mono text-[11px]">{certificate.mintedAt}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-vangogh-canvas/60">소장/배송 상태</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  certificate.purchaseType === 'art_print'
                    ? 'bg-vangogh-gold/20 text-vangogh-gold border border-vangogh-gold/40'
                    : isRedeemed 
                      ? 'bg-green-900/80 text-green-300 border border-green-500/30'
                      : 'bg-vangogh-gold/20 text-vangogh-gold border border-vangogh-gold/40'
                }`}>
                  {certificate.purchaseType === 'art_print'
                    ? '실물 액자 제작 및 배송 접수'
                    : isRedeemed 
                      ? '실물 원화 인도 완료' 
                      : '피지 허브 안심 보관 중'
                  }
                </span>
              </div>
            </div>

          </div>

          {/* Card Back (Provenance & Anti-tamper text & Artist Signature) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-5 certificate-card text-vangogh-canvas flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] select-none">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-vangogh-gold/20 pb-2">
              <span className="text-xs font-bold text-vangogh-gold tracking-wider">
                {certificate.purchaseType === 'original_vault' ? 'OFFICIAL PROVENANCE' : 'ART PRINT CERTIFICATE'}
              </span>
              <span className="text-[10px] text-vangogh-canvas/60 font-mono">{certificate.serialNumber}</span>
            </div>

            {/* Provenance Text */}
            <div className="space-y-2 text-[11px] text-vangogh-canvas/80 leading-relaxed">
              <p className="text-[11px] leading-snug">
                {certificate.purchaseType === 'original_vault'
                  ? '본 증명서는 남태평양 피지(Fiji) 현지에서 직접 수거된 정품 원화의 유일무이한 소장 권리를 보증합니다.'
                  : '본 증명서는 남태평양 피지 원작 작가의 공인 하에 파인아트 캔버스지로 제작된 공식 아트 프린팅 실물 액자임을 보증합니다.'
                }
              </p>
              <div className="p-2 rounded bg-vangogh-navy/70 border border-vangogh-gold/20 text-[10px] space-y-0.5">
                <div><strong>큐레이터 검수:</strong> 반 고흐 21 공식 큐레이션 팀 (피지 지부)</div>
                {certificate.purchaseType === 'original_vault' ? (
                  <>
                    <div><strong>안심 보관 기간:</strong> {certificate.vaultExpiryDate}까지 무료 보관</div>
                    <div><strong>이중 양도 방지:</strong> 실제 작품 교환 시 디지털 카드는 동결 처리됩니다.</div>
                  </>
                ) : (
                  <>
                    <div><strong>제작 방식:</strong> 독일 하네뮬레급 파인아트 캔버스 + 원목 액자</div>
                    <div><strong>배송 주소:</strong> {certificate.shippingAddress?.address || '국내 지정 주소'}</div>
                  </>
                )}
              </div>
            </div>

            {/* Artist Handwritten Signature in White Ink */}
            <div className="p-2.5 rounded-xl bg-vangogh-navy/90 border border-vangogh-gold/30 shadow-inner flex flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] text-vangogh-gold tracking-wider uppercase font-semibold border-b border-vangogh-gold/15 pb-1">
                <span>ARTIST SIGNATURE (작가 친필 서명)</span>
                <span className="text-white/60 font-mono text-[8px]">HAND-SIGNED INK</span>
              </div>
              
              <div className="py-1 flex items-center justify-center">
                <ArtistSignature artistName={certificate.artistName} />
              </div>

              <div className="flex items-center justify-between text-[10px] text-vangogh-canvas/70 font-mono pt-1 border-t border-vangogh-gold/15">
                <span className="text-white font-medium">{getArtistEnglishName(certificate.artistName)}</span>
                <span className="text-[9px] text-vangogh-gold/80">Fiji Islands</span>
              </div>
            </div>

            {/* Tamper-proof Authenticated Seal with Official Logo */}
            <div className="border-t border-vangogh-gold/20 pt-2 flex items-center justify-between">
              <div className="text-[9px] text-vangogh-canvas/60 leading-tight">
                <span className="font-semibold text-vangogh-canvas/90">VAN GOGH 21 OFFICIAL SEAL</span>
                <br />
                <span className="text-vangogh-gold font-mono">TAMPER-PROOF VERIFIED</span>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-vangogh-gold/60 shadow-sm shrink-0">
                <img 
                  src="./logo.jpg" 
                  alt="반 고흐 21 공식 로고 인장" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Action Buttons Below Card */}
      <div className="w-full flex items-center justify-between gap-2 text-xs">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1 py-2 px-3 rounded-lg bg-vangogh-stone hover:bg-vangogh-stone/80 text-vangogh-navy font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isFlipped ? '앞면 보기' : '뒷면 인증 보기'}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-vangogh-stone border border-vangogh-charcoal/15 text-vangogh-charcoal font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : <Download className="w-3.5 h-3.5 text-vangogh-gold" />}
          <span>{isCopied ? '링크 복사됨' : '보증서 공유'}</span>
        </button>
      </div>

      {/* Redeem Button (If Original Vault) */}
      {certificate.purchaseType === 'original_vault' && !isRedeemed && onOpenRedeem && (
        <button
          onClick={() => onOpenRedeem(certificate)}
          className="w-full py-2.5 px-4 rounded-xl bg-vangogh-gold hover:bg-vangogh-sun text-vangogh-navy font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
        >
          <span>실제 작품 교환 신청 (국내 안전 배송)</span>
        </button>
      )}

      {certificate.purchaseType === 'original_vault' && isRedeemed && (
        <div className="w-full py-2 px-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs text-center font-medium">
          ✓ 실제 작품 교환 신청이 완료된 작품입니다.
        </div>
      )}

      {certificate.purchaseType === 'art_print' && (
        <div className="w-full py-2 px-4 rounded-xl bg-vangogh-stone/70 border border-vangogh-charcoal/10 text-vangogh-navy text-xs text-center font-medium">
          ✓ 실물 액자 주문 제작 및 무료 배송 접수 완료
        </div>
      )}

    </div>
  );
};

