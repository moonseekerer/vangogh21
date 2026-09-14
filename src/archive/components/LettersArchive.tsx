import React, { useState, useMemo } from 'react';
import { HISTORICAL_LETTERS, VanGoghLetter, LetterType } from '../data/vangoghLetters';
import { VAN_GOGH_ARTWORKS } from '../data/vangoghArtworks';
import { Artwork } from '../types';
import { Mail, Calendar, MapPin, User, ChevronRight, BookOpen, Languages, Copy, Check, Filter } from 'lucide-react';

interface LettersArchiveProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export const LettersArchive: React.FC<LettersArchiveProps> = ({ onSelectArtwork }) => {
  const [selectedLetter, setSelectedLetter] = useState<VanGoghLetter>(HISTORICAL_LETTERS[0]);
  const [textMode, setTextMode] = useState<'both' | 'ko' | 'original'>('both');
  const [letterFilter, setLetterFilter] = useState<'all' | LetterType>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredLetters = useMemo(() => {
    if (letterFilter === 'all') return HISTORICAL_LETTERS;
    return HISTORICAL_LETTERS.filter((l) => l.letterType === letterFilter);
  }, [letterFilter]);

  const relatedArtworks = useMemo(() => {
    const ids = new Set(selectedLetter.relatedArtworkIds);
    return VAN_GOGH_ARTWORKS.filter((a) => ids.has(a.id));
  }, [selectedLetter]);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-stone-100 tracking-tight">
              반 고흐 친필 서간집
            </h2>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            빈센트 반 고흐와 동생 테오 반 고흐가 1880~1890년대 주고받은 친필 편지의 19세기 프랑스어·네덜란드어 원문과 한국어 완역본을 1:1로 대조하여 읽을 수 있습니다.
          </p>
        </div>

        {/* Letter Type Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-md border border-stone-800 text-xs shrink-0">
          <button
            onClick={() => setLetterFilter('all')}
            className={`px-2.5 py-1 rounded transition-colors ${
              letterFilter === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            전체 서신 ({HISTORICAL_LETTERS.length})
          </button>
          <button
            onClick={() => setLetterFilter('vincent_to_theo')}
            className={`px-2.5 py-1 rounded transition-colors ${
              letterFilter === 'vincent_to_theo'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            빈센트 → 테오
          </button>
          <button
            onClick={() => setLetterFilter('theo_to_vincent')}
            className={`px-2.5 py-1 rounded transition-colors ${
              letterFilter === 'theo_to_vincent'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            테오의 답장
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Letters Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block px-1">
            서간문 목록 ({filteredLetters.length}편)
          </span>

          <div className="space-y-2 max-h-[78vh] overflow-y-auto pr-1">
            {filteredLetters.map((letter) => {
              const isSelected = selectedLetter.id === letter.id;
              return (
                <div
                  key={letter.id}
                  onClick={() => setSelectedLetter(letter)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/80 text-amber-300 ring-1 ring-amber-500/40 shadow-md'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1.5">
                    <span className="font-bold text-amber-400">{letter.letterNo}</span>
                    <span className="bg-stone-950 px-1.5 py-0.5 rounded text-[10px] text-stone-300 border border-stone-800">
                      {letter.originalLanguageLabel.split(' ')[0]}
                    </span>
                    <span>{letter.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-100 mb-1 leading-snug">
                    {letter.title}
                  </h3>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {letter.summary}
                  </p>

                  <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1 font-medium text-stone-300">
                      <User className="w-3 h-3 text-amber-500" />
                      {letter.sender.split(' ')[0]} → {letter.recipient.split(' ')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {letter.location.split(' ')[1] || letter.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Letter Full Text with Language View Switcher (8 cols) */}
        <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Letter Heading */}
          <div className="border-b border-stone-800 pb-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-amber-500 text-stone-950 font-bold">
                  {selectedLetter.letterNo}
                </span>
                <span className="bg-stone-950 text-stone-300 px-2 py-1 rounded border border-stone-700 text-[11px]">
                  {selectedLetter.originalLanguageLabel}
                </span>
              </div>

              <div className="flex items-center gap-4 text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {selectedLetter.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {selectedLetter.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-stone-100 tracking-tight">
                  {selectedLetter.title}
                </h2>
                <p className="text-xs text-amber-300 font-medium mt-1">
                  발신: {selectedLetter.sender} · 수신: {selectedLetter.recipient}
                </p>
              </div>

              {/* View Mode Toggle Bar */}
              <div className="flex items-center bg-stone-950 p-1 rounded-md border border-stone-800 text-xs self-start sm:self-center shrink-0">
                <button
                  onClick={() => setTextMode('both')}
                  className={`px-2.5 py-1 rounded transition-all font-medium ${
                    textMode === 'both'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  나란히 대조
                </button>
                <button
                  onClick={() => setTextMode('ko')}
                  className={`px-2.5 py-1 rounded transition-all font-medium ${
                    textMode === 'ko'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  한국어 완역본
                </button>
                <button
                  onClick={() => setTextMode('original')}
                  className={`px-2.5 py-1 rounded transition-all font-medium ${
                    textMode === 'original'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  원문 전사본
                </button>
              </div>
            </div>
          </div>

          {/* Letter Texts Display */}
          {textMode === 'both' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Korean Translation */}
              <div className="bg-stone-950 rounded-lg border border-stone-800/90 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    한국어 번역본
                  </span>
                  <button
                    onClick={() => handleCopyText(selectedLetter.fullTextKo)}
                    title="번역문 복사"
                    className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="font-serif text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {selectedLetter.fullTextKo}
                </div>
              </div>

              {/* Right Column: Original French / Dutch */}
              <div className="bg-stone-950 rounded-lg border border-stone-800/90 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-amber-500" />
                    {selectedLetter.originalLanguageLabel}
                  </span>
                  <button
                    onClick={() => handleCopyText(selectedLetter.fullTextOriginal)}
                    title="원문 복사"
                    className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="font-serif italic text-stone-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line selection:bg-amber-500 selection:text-stone-950">
                  {selectedLetter.fullTextOriginal}
                </div>
              </div>
            </div>
          ) : textMode === 'ko' ? (
            <div className="bg-stone-950 rounded-lg border border-stone-800/90 p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  한국어 번역 전문
                </span>
                <button
                  onClick={() => handleCopyText(selectedLetter.fullTextKo)}
                  className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1"
                >
                  {copied ? '복사됨' : '본문 복사'}
                </button>
              </div>
              <div className="font-serif text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {selectedLetter.fullTextKo}
              </div>
            </div>
          ) : (
            <div className="bg-stone-950 rounded-lg border border-stone-800/90 p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5" />
                  {selectedLetter.originalLanguageLabel} 전문
                </span>
                <button
                  onClick={() => handleCopyText(selectedLetter.fullTextOriginal)}
                  className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1"
                >
                  {copied ? '복사됨' : '원문 복사'}
                </button>
              </div>
              <div className="font-serif italic text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {selectedLetter.fullTextOriginal}
              </div>
            </div>
          )}

          {/* Related Artworks Section */}
          {relatedArtworks.length > 0 && (
            <div className="pt-5 border-t border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  이 편지에서 탄생 배경이 설명된 대표작
                </h4>
                <span className="text-[11px] text-stone-400">
                  클릭 시 고해상도 원작 뷰어로 연결됩니다
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArtworks.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArtwork(art)}
                    className="group bg-stone-950 border border-stone-800 rounded-lg overflow-hidden cursor-pointer hover:border-amber-500/70 transition-all flex items-center gap-4 p-3 shadow"
                  >
                    <div className="w-24 h-20 bg-black rounded overflow-hidden shrink-0 relative">
                      <img
                        src={art.imageUrl}
                        alt={art.titleKo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-amber-400 block mb-0.5">
                        {art.year}년 · {art.medium}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-stone-100 truncate group-hover:text-amber-300 transition-colors">
                        {art.titleKo}
                      </h5>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">
                        {art.collection}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
