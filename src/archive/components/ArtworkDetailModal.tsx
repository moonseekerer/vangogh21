import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { X, ZoomIn, ZoomOut, RotateCcw, MapPin, Calendar, Palette, BookOpen, ExternalLink, Camera, Image } from 'lucide-react';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onSelectMuseum?: (museumName: string) => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  onClose,
  onSelectMuseum
}) => {
  const [viewMode, setViewMode] = useState<'canvas' | 'site'>('canvas');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setViewMode('canvas');
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [artwork?.id]);

  if (!artwork) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.4, 3.5));
  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.4, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsPanning(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || zoomLevel <= 1) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[94vh] lg:h-[88vh] bg-stone-900 border border-stone-800 rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 z-30 p-2 text-stone-400 hover:text-stone-100 bg-stone-900/80 hover:bg-stone-800 border border-stone-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Canvas Viewer or Real Site Photo */}
        <div className="relative flex-1 min-w-0 min-h-0 h-[45vh] lg:h-full bg-black flex flex-col items-center justify-center overflow-hidden select-none">
          {/* View Mode Switcher Header */}
          {artwork.realSitePhotoUrl && (
            <div className="absolute top-4 left-4 z-20 flex items-center bg-stone-900/90 border border-stone-700/80 rounded-full p-1 shadow-lg text-xs">
              <button
                onClick={() => {
                  setViewMode('canvas');
                  handleResetZoom();
                }}
                className={`px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'canvas'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-300 hover:text-stone-100'
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                원작 캔버스
              </button>
              <button
                onClick={() => {
                  setViewMode('site');
                  handleResetZoom();
                }}
                className={`px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'site'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-300 hover:text-stone-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                실제 창작 현장 사진
              </button>
            </div>
          )}

          {viewMode === 'canvas' ? (
            <>
              <div
                className={`w-full h-full p-4 sm:p-8 pt-14 pb-16 flex items-center justify-center overflow-hidden ${
                  zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={artwork.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'}
                  alt={artwork.titleKo}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                    transition: isPanning ? 'none' : 'transform 0.15s ease-out'
                  }}
                  className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-none select-none drop-shadow-md"
                  loading="lazy"
                />
              </div>

              {/* Zoom Controls Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-stone-900/90 border border-stone-700/80 px-3 py-1.5 rounded-full shadow-lg text-xs text-stone-300">
                <button
                  onClick={handleZoomIn}
                  className="p-1 hover:text-amber-400 transition-colors"
                  title="확대"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="font-mono min-w-[42px] text-center">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={handleZoomOut}
                  className="p-1 hover:text-amber-400 transition-colors"
                  title="축소"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 hover:text-amber-400 transition-colors border-l border-stone-700 pl-2"
                  title="초기화"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 pt-16 relative overflow-hidden ${
              artwork.realSiteDescription ? 'pb-24' : 'pb-8'
            }`}>
              <img
                src={artwork.realSitePhotoUrl}
                alt="실제 창작 현장"
                className="max-h-full max-w-full w-auto h-auto object-contain rounded shadow-lg"
              />
              {artwork.realSiteDescription && (
                <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 z-20 bg-stone-950/95 border border-stone-800 rounded-md p-3 text-xs text-stone-200 shadow-xl">
                  <span className="text-amber-400 font-semibold block mb-0.5">현장 지리 기록:</span>
                  {artwork.realSiteDescription}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Metadata, Palette & Story */}
        <div className="w-full lg:w-[460px] min-h-0 h-[47vh] lg:h-full flex flex-col justify-between p-6 overflow-y-auto bg-stone-900 divide-y divide-stone-800 flex-shrink-0">
          <div className="space-y-5 pb-5">
            {/* Title & Badge */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {artwork.periodLabel}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-stone-800 text-stone-300">
                  {artwork.genre}
                </span>
                {artwork.fNumber && (
                  <span className="px-1.5 py-0.5 text-[11px] font-mono text-stone-400 bg-stone-950/60 rounded">
                    F: {artwork.fNumber}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-stone-100 tracking-tight leading-snug">
                {artwork.titleKo}
              </h2>
              <p className="text-sm text-stone-400 font-serif italic mt-0.5">
                {artwork.titleEn}
              </p>
            </div>

            {/* Dominant Color Palette Section */}
            {artwork.dominantColors && artwork.dominantColors.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 block mb-2">
                  주요 추출 색채
                </span>
                <div className="flex items-center gap-2">
                  {artwork.dominantColors.map((hex, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full h-6 rounded border border-stone-700 shadow-inner"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[9px] font-mono text-stone-400">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Spec Sheet Table */}
            <div className="border-t border-b border-stone-800 py-3 text-xs">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-stone-800/60 font-sans">
                  <tr>
                    <th className="py-2 pr-3 font-normal text-stone-400 w-28 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      제작 연도
                    </th>
                    <td className="py-2 text-stone-200 font-medium">
                      {artwork.year ? `${artwork.year}년` : '미상'}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-3 font-normal text-stone-400 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-stone-400" />
                      기법 및 재료
                    </th>
                    <td className="py-2 text-stone-200 font-medium">
                      {artwork.medium} {artwork.dimensions ? `· ${artwork.dimensions}` : '· 캔버스에 유채'}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-3 font-normal text-stone-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500/80" />
                      창작 장소
                    </th>
                    <td className="py-2 text-stone-200 font-medium">
                      {artwork.creationLocation}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-3 font-normal text-stone-400 align-top flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                      소장처
                    </th>
                    <td className="py-2">
                      <span className="text-amber-300 font-medium block">
                        {artwork.collection}
                      </span>
                      {onSelectMuseum && artwork.collection !== '개인 소장 또는 미상' && (
                        <button
                          onClick={() => {
                            onSelectMuseum(artwork.collection);
                            onClose();
                          }}
                          className="text-[11px] text-amber-400/80 hover:text-amber-300 underline mt-0.5 inline-flex items-center gap-1"
                        >
                          지도에서 소장처 위치 확인
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Description */}
            {artwork.description && (
              <div className="space-y-1.5">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                  작품 해설
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Letter Quote Card */}
            {artwork.letterQuote && (
              <div className="border-l-2 border-amber-500/80 pl-4 py-1 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-amber-400/90 font-medium">
                  <span>서간 기록 ({artwork.letterQuote.recipient})</span>
                  <span className="text-stone-400 font-mono text-[11px]">{artwork.letterQuote.date}</span>
                </div>
                <blockquote className="text-stone-300 italic font-serif leading-relaxed">
                  "{artwork.letterQuote.textKo}"
                </blockquote>
                {artwork.letterQuote.letterNo && (
                  <span className="text-[10px] text-stone-400 block font-mono">
                    {artwork.letterQuote.letterNo}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 text-[11px] text-stone-400 flex items-center justify-between">
            <span>위키데이터 카탈로그 ID: {artwork.id}</span>
            <a
              href={`https://www.wikidata.org/wiki/${artwork.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-200 underline inline-flex items-center gap-1"
            >
              위키데이터 원문
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
