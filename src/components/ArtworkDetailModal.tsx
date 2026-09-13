import React, { useState } from 'react';
import { Artwork, ArtistProfile } from '../types';
import { ArtistProfileModal } from './ArtistProfileModal';
import { X, ShieldCheck, Compass, Info, Check, ExternalLink, User } from 'lucide-react';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onSelectOption: (artwork: Artwork, purchaseType: 'original_vault' | 'art_print', price: number) => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({ artwork, onClose, onSelectOption }) => {
  const [viewMode, setViewMode] = useState<'canvas' | 'room'>('canvas');
  const [selectedType, setSelectedType] = useState<'original_vault' | 'art_print'>(
    artwork?.isOriginalSold ? 'art_print' : 'original_vault'
  );
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);

  if (!artwork) return null;

  const originalPrice = artwork.originalPrice;
  const artPrintPrice = artwork.artPrintPrice;
  const currentPrice = selectedType === 'original_vault' ? originalPrice : artPrintPrice;
  const isOriginalSold = artwork.isOriginalSold;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-vangogh-navy/70 backdrop-blur-sm overflow-y-auto">
        <div 
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-vangogh-charcoal/10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header */}
          <div className="px-6 py-4 border-b border-vangogh-charcoal/10 flex items-center justify-between bg-vangogh-canvas">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-vangogh-gold uppercase tracking-wider">
                {artwork.location}
              </span>
              <span className="text-vangogh-charcoal/30">·</span>
              <button
                onClick={() => setIsArtistModalOpen(true)}
                className="text-xs font-bold text-vangogh-navy hover:text-vangogh-gold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{artwork.artistName} ({artwork.artistLocalName})</span>
                <ExternalLink className="w-3 h-3 text-vangogh-charcoal/40" />
              </button>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-vangogh-stone text-vangogh-charcoal/70 hover:text-vangogh-charcoal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Scrollable */}
          <div className="overflow-y-auto p-6 space-y-8 flex-1">
            
            {/* Main Visual & Room View Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-vangogh-charcoal/60">작품 뷰어</span>
                <div className="flex items-center gap-1 bg-vangogh-stone p-1 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setViewMode('canvas')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      viewMode === 'canvas' 
                        ? 'bg-white text-vangogh-navy font-bold shadow-sm' 
                        : 'text-vangogh-charcoal/60 hover:text-vangogh-charcoal'
                    }`}
                  >
                    원화 상세
                  </button>
                  <button
                    onClick={() => setViewMode('room')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      viewMode === 'room' 
                        ? 'bg-white text-vangogh-navy font-bold shadow-sm' 
                        : 'text-vangogh-charcoal/60 hover:text-vangogh-charcoal'
                    }`}
                  >
                    공간 연출 뷰
                  </button>
                </div>
              </div>

              {/* Viewer Display */}
              {viewMode === 'canvas' ? (
                <div className="relative aspect-[16/10] bg-vangogh-stone rounded-xl overflow-hidden flex items-center justify-center border border-vangogh-charcoal/5">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/10] bg-[#e8e4dc] rounded-xl overflow-hidden flex items-center justify-center p-8 border border-vangogh-charcoal/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c5beaf] to-transparent opacity-30"></div>
                  <div className="relative z-10 w-48 sm:w-64 p-3 bg-white shadow-2xl rounded-sm border-4 border-[#2d2926]">
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-vangogh-navy/80 text-vangogh-canvas text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                    모던 리빙룸 인테리어 거치 예시 ({artwork.dimensions})
                  </div>
                </div>
              )}
            </div>

            {/* Title & Core Specs with Clickable Artist Link */}
            <div className="border-b border-vangogh-charcoal/10 pb-6 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-vangogh-navy">
                {artwork.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-vangogh-charcoal/70">
                {/* Clickable Artist Profile Badge */}
                <button
                  type="button"
                  onClick={() => setIsArtistModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-vangogh-stone/80 hover:bg-vangogh-gold/20 border border-vangogh-charcoal/15 text-vangogh-navy font-bold transition-all cursor-pointer group shadow-xs"
                >
                  <img 
                    src={artwork.artistProfile.avatarUrl} 
                    alt={artwork.artistName}
                    className="w-4 h-4 rounded-full object-cover border border-vangogh-gold/60"
                  />
                  <span>작가: {artwork.artistName} ({artwork.artistLocalName})</span>
                  <ExternalLink className="w-3 h-3 text-vangogh-charcoal/50 group-hover:text-vangogh-gold transition-colors" />
                </button>

                <span><strong>기법:</strong> {artwork.medium}</span>
                <span><strong>규격:</strong> {artwork.dimensions}</span>
                <span><strong>제작년도:</strong> {artwork.year}년</span>
                <span><strong>현재 보관처:</strong> {artwork.storageVault}</span>
              </div>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Artist Story with Avatar */}
              <div className="p-5 rounded-xl bg-vangogh-canvas border border-vangogh-charcoal/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-vangogh-navy">
                    <Compass className="w-4 h-4 text-vangogh-gold" />
                    <span>작가의 이야기</span>
                  </div>
                  <button
                    onClick={() => setIsArtistModalOpen(true)}
                    className="text-[11px] font-bold text-vangogh-gold hover:underline flex items-center gap-1"
                  >
                    <span>프로필 상세</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-vangogh-charcoal/80 leading-relaxed">
                  {artwork.artistStory}
                </p>
                <div className="pt-2 text-xs italic text-vangogh-charcoal/60 border-t border-vangogh-charcoal/5">
                  "{artwork.artistQuote}"
                </div>
              </div>

              {/* Curator Note */}
              <div className="p-5 rounded-xl bg-vangogh-stone/80 border border-vangogh-gold/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-vangogh-navy">
                  <ShieldCheck className="w-4 h-4 text-vangogh-gold" />
                  <span>글로벌 큐레이션 팀 코멘트 (피지 지부)</span>
                </div>
                <p className="text-xs sm:text-sm text-vangogh-charcoal/80 leading-relaxed">
                  {artwork.curatorNote}
                </p>
                <div className="pt-1 text-[11px] text-vangogh-charcoal/60">
                  <strong>제작 과정:</strong> {artwork.craftProcess}
                </div>
              </div>
            </div>

            {/* Ownership Selection */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-sm font-bold text-vangogh-navy">소장 방식 선택</h3>
                <p className="text-xs text-vangogh-charcoal/70">
                  원작은 단 한 분의 컬렉터에게만 1:1 독점으로 양도되며, 아트 프린팅은 원작을 정밀 인쇄하여 실물 액자로 배송받는 방식입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option A: 1:1 Original Exclusive */}
                <div 
                  onClick={() => {
                    if (!isOriginalSold) {
                      setSelectedType('original_vault');
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isOriginalSold
                      ? 'border-vangogh-charcoal/15 bg-vangogh-stone/30 opacity-70 cursor-not-allowed'
                      : selectedType === 'original_vault'
                        ? 'border-vangogh-navy bg-vangogh-stone/40 cursor-pointer'
                        : 'border-vangogh-charcoal/10 hover:border-vangogh-charcoal/30 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        isOriginalSold 
                          ? 'bg-vangogh-charcoal/60 text-white' 
                          : 'bg-vangogh-navy text-vangogh-gold'
                      }`}>
                        {isOriginalSold ? '1호 소장 완료' : '1:1 원작 독점'}
                      </span>
                      <h4 className="font-bold text-sm text-vangogh-navy">원화 실물 독점 소유권</h4>
                      <p className="text-xs text-vangogh-charcoal/70 leading-relaxed">
                        {isOriginalSold 
                          ? `${(artwork.originalCollector || '김모두 님').replace('박문식', '김모두')} 독점 소장 중 (원작 판매 마감)`
                          : '세상에 단 하나뿐인 오리지널 원화의 유일한 독점 소장자 (1년 무료 안심 보관 포함)'
                        }
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                      isOriginalSold 
                        ? 'border-vangogh-charcoal/20 bg-vangogh-stone text-vangogh-charcoal/40'
                        : selectedType === 'original_vault' 
                          ? 'border-vangogh-navy bg-vangogh-navy text-white' 
                          : 'border-vangogh-charcoal/30'
                    }`}>
                      {selectedType === 'original_vault' && !isOriginalSold && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-vangogh-charcoal/5 flex items-baseline justify-between">
                    <span className="text-xs text-vangogh-charcoal/50">
                      {isOriginalSold ? '원작 품절' : '단 1명 한정 판매'}
                    </span>
                    <span className={`font-bold text-base ${isOriginalSold ? 'line-through text-vangogh-charcoal/40' : 'text-vangogh-navy'}`}>
                      {originalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* Option B: Art Printing Physical Delivery */}
                <div 
                  onClick={() => setSelectedType('art_print')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedType === 'art_print'
                      ? 'border-vangogh-navy bg-vangogh-stone/40'
                      : 'border-vangogh-charcoal/10 hover:border-vangogh-charcoal/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-vangogh-gold text-vangogh-navy">
                        실물 배송 주문 제작
                      </span>
                      <h4 className="font-bold text-sm text-vangogh-navy">원작 정밀 파인아트 프린팅</h4>
                      <p className="text-xs text-vangogh-charcoal/70 leading-relaxed">
                        원작의 붓 터치와 색채를 프리미엄 캔버스지에 정밀 인쇄한 실물 액자 (주문 즉시 제작 택배 발송)
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                      selectedType === 'art_print' ? 'border-vangogh-navy bg-vangogh-navy text-white' : 'border-vangogh-charcoal/30'
                    }`}>
                      {selectedType === 'art_print' && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-vangogh-charcoal/5 flex items-baseline justify-between">
                    <span className="text-xs text-vangogh-charcoal/50">원목 액자 패키지 포함</span>
                    <span className="font-bold text-base text-vangogh-navy">
                      {artPrintPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic explanation alert */}
              <div className="flex items-start gap-2.5 p-3.5 bg-vangogh-canvas rounded-xl border border-vangogh-charcoal/10 text-xs text-vangogh-charcoal/80">
                <Info className="w-4 h-4 text-vangogh-gold shrink-0 mt-0.5" />
                {selectedType === 'original_vault' ? (
                  <div>
                    <strong>원작 1:1 독점 소장 및 실제 작품 교환 안내:</strong> 1인 독점 소장권 결제 즉시 공식 디지털 소유 보증서 및 실물 작품 교환권이 발급되며, 피지 수거 허브에서 1년간 무상 보관됩니다. [내 보관함]에서 원하실 때 언제든 국내 안전 배송으로 실제 작품 교환을 신청하실 수 있습니다.
                  </div>
                ) : (
                  <div>
                    <strong>아트 프린팅 제작 및 배송 안내:</strong> 원작의 붓 터치와 질감을 살려 고급 파인아트 캔버스에 1:1 맞춤 정밀 인쇄 후 원목 프레임 액자에 담아 발송합니다. 결제 완료 후 3~5영업일 이내 지정하신 국내 주소로 안전하게 택배 배송됩니다.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 border-t border-vangogh-charcoal/10 bg-vangogh-canvas flex items-center justify-between">
            <div>
              <span className="text-xs text-vangogh-charcoal/60 block font-medium">
                {selectedType === 'original_vault' ? '원작 1:1 독점 소장가' : '아트 프린팅 실물 주문가'}
              </span>
              <span className="text-xl font-bold text-vangogh-navy">
                {currentPrice.toLocaleString()}원
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-vangogh-charcoal/70 hover:bg-vangogh-stone transition-colors"
              >
                닫기
              </button>
              {isOriginalSold && selectedType === 'original_vault' ? (
                <button
                  disabled
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-vangogh-charcoal/20 text-vangogh-charcoal/50 cursor-not-allowed"
                >
                  원작 소장 마감
                </button>
              ) : (
                <button
                  onClick={() => onSelectOption(artwork, selectedType, currentPrice)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-vangogh-navy hover:bg-vangogh-blue text-vangogh-canvas shadow-md transition-all flex items-center gap-2"
                >
                  <span>
                    {selectedType === 'original_vault' 
                      ? '원작 독점 소장권 결제 및 보증서 발급' 
                      : '아트 프린팅 실물 액자 주문하기'
                    }
                  </span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Artist Profile Modal Popup */}
      {isArtistModalOpen && (
        <ArtistProfileModal 
          profile={artwork.artistProfile}
          onClose={() => setIsArtistModalOpen(false)}
        />
      )}
    </>
  );
};
