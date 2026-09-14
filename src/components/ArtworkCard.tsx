import React from 'react';
import { Artwork } from '../types';
import { MapPin, Sparkles, Layers } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onSelect }) => {
  const isOriginalSold = artwork.isOriginalSold;

  return (
    <div 
      onClick={() => onSelect(artwork)}
      className="group bg-white rounded-2xl border border-vangogh-charcoal/10 overflow-hidden cursor-pointer gallery-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-vangogh-stone">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badge */}
          <div className="absolute top-3 left-3">
            {isOriginalSold ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-vangogh-charcoal/85 text-white backdrop-blur-sm shadow-sm">
                <span>원작 1호 소장 완료 ({(artwork.originalCollector || '김모두 님').replace('박문식', '김모두')})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-vangogh-navy/90 text-vangogh-gold backdrop-blur-sm shadow-sm">
                <Sparkles className="w-3 h-3 text-vangogh-gold" />
                <span>1:1 원작 독점 소장 가능</span>
              </span>
            )}
          </div>

          {/* Location tag */}
          <div className="absolute bottom-3 left-3 bg-vangogh-navy/70 backdrop-blur-sm text-vangogh-canvas text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
            <MapPin className="w-3 h-3 text-vangogh-gold" />
            <span>{artwork.location}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2.5">
          <div>
            <span className="text-xs text-vangogh-charcoal/60 font-medium">
              {artwork.artistName} ({artwork.artistAge}세) · {artwork.year}
            </span>
            <h3 className="text-lg font-bold text-vangogh-navy group-hover:text-vangogh-blue transition-colors leading-snug">
              {artwork.title}
            </h3>
          </div>

          <p className="text-xs text-vangogh-charcoal/70 line-clamp-2 leading-relaxed">
            "{artwork.artistQuote}"
          </p>

          <div className="text-[11px] text-vangogh-charcoal/60 pt-1">
            <span className="font-medium text-vangogh-navy">기법: </span>
            {artwork.medium}
          </div>
        </div>
      </div>

      {/* Footer Pricing & Status */}
      <div className="px-5 pb-5 pt-3 border-t border-vangogh-charcoal/5 flex items-end justify-between gap-2">
        <div className="min-w-0">
          {isOriginalSold ? (
            <div className="space-y-0.5">
              <span className="text-[10px] text-vangogh-charcoal/50 block font-medium">
                원작 마감 · 공식 아트 프린팅 주문 가능
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-base text-vangogh-navy">
                  {artwork.artPrintPrice.toLocaleString()}원
                </span>
                <span className="text-[11px] text-vangogh-charcoal/50">(실물 액자)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5">
              <span className="text-[10px] text-vangogh-charcoal/50 block font-medium">
                1:1 원작 독점가 (아트 프린트 {artwork.artPrintPrice.toLocaleString()}원)
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-base text-vangogh-navy">
                  {artwork.originalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          )}
        </div>

        <button 
          type="button"
          className="px-3.5 py-2 rounded-xl text-xs font-bold border border-vangogh-charcoal/15 bg-vangogh-stone/80 group-hover:bg-vangogh-navy group-hover:border-vangogh-navy group-hover:text-vangogh-canvas text-vangogh-navy transition-all shrink-0 whitespace-nowrap shadow-xs flex items-center justify-center leading-none"
        >
          소장 / 주문
        </button>
      </div>
    </div>
  );
};

