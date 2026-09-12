import React, { useState } from 'react';
import { OwnershipCertificate, Artwork } from '../types';
import { RefreshCw, Download, CheckCircle2 } from 'lucide-react';

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
    navigator.clipboard.writeText(`https://vangogh21.org/verify/${certificate.serialNumber}`);
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

          {/* Card Back (Provenance & Anti-tamper text) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-6 certificate-card text-vangogh-canvas flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] select-none">
            
            {/* Top */}
            <div className="flex items-center justify-between border-b border-vangogh-gold/20 pb-2">
              <span className="text-xs font-bold text-vangogh-gold ">
                {certificate.purchaseType === 'original_vault' ? 'OFFICIAL PROVENANCE' : 'ART PRINT CERTIFICATE'}
              </span>
              <span className="text-[10px] text-vangogh-canvas/60 font-mono">{certificate.serialNumber}</span>
            </div>

            {/* Provenance Text */}
            <div className="space-y-2 my-auto text-[11px] text-vangogh-canvas/80 leading-relaxed">
              <p>
                {certificate.purchaseType === 'original_vault'
                  ? '본 증명서는 남태평양 피지(Fiji) 현지에서 직접 수거된 정품 원화의 유일무이한 소장 권리를 보증합니다.'
                  : '본 증명서는 남태평양 피지 원작 작가의 공인 하에 파인아트 캔버스지로 제작된 공식 아트 프린팅 실물 액자임을 보증합니다.'
                }
              </p>
              <div className="p-2.5 rounded bg-vangogh-navy/70 border border-vangogh-gold/20 text-[10px] space-y-1">
                <div><strong>큐레이터 검수:</strong> 반 고흐 21 공식 큐레이션 팀 (피지 지부)</div>
                {certificate.purchaseType === 'original_vault' ? (
                  <>
                    <div><strong>안심 보관 기간:</strong> {certificate.vaultExpiryDate}까지 무료 보관</div>
                    <div><strong>이중 양도 방지:</strong> 실물 인출 시 본 카드는 '인도 완료' 상태로 동결됩니다.</div>
                  </>
                ) : (
                  <>
                    <div><strong>제작 방식:</strong> 독일 하네뮬레급 파인아트 캔버스 정밀 인쇄 + 원목 액자</div>
                    <div><strong>배송 주소:</strong> {certificate.shippingAddress?.address || '국내 지정 주소'}</div>
                  </>
                )}
              </div>
            </div>

            {/* QR & Signature */}
            <div className="border-t border-vangogh-gold/20 pt-3 flex items-center justify-between">
              <div className="text-[10px] text-vangogh-canvas/60">
                <span>VAN GOGH 21</span>
                <br />
                <span className="text-vangogh-gold">AUTHENTICATED</span>
              </div>
              <div className="w-9 h-9 bg-white p-1 rounded">
                <div className="w-full h-full bg-vangogh-navy rounded flex items-center justify-center">
                  <span className="text-[8px] font-mono font-bold text-vangogh-gold">VG21</span>
                </div>
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
          <span>실물 원화 인출 신청 (국내 안전 배송)</span>
        </button>
      )}

      {certificate.purchaseType === 'original_vault' && isRedeemed && (
        <div className="w-full py-2 px-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs text-center font-medium">
          ✓ 실물 원화 인출 신청이 완료된 작품입니다.
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

