import React from 'react';
import { ArtistProfile } from '../types';
import { X, MapPin, Globe, ExternalLink, Palette, Award } from 'lucide-react';

const InstagramIcon: React.FC = () => (
  <svg className="w-4 h-4 text-pink-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface ArtistProfileModalProps {
  profile: ArtistProfile | null;
  onClose: () => void;
}

export const ArtistProfileModal: React.FC<ArtistProfileModalProps> = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-vangogh-navy/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-vangogh-charcoal/10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-vangogh-charcoal/10 flex items-center justify-between bg-vangogh-canvas">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-vangogh-gold uppercase tracking-wider">
              ARTIST PROFILE
            </span>
            <span className="text-vangogh-charcoal/30">·</span>
            <span className="text-xs text-vangogh-charcoal/70">
              {profile.location}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-vangogh-stone text-vangogh-charcoal/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Top Hero Portrait & Core Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-vangogh-gold/40 shadow-md shrink-0 bg-vangogh-stone">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center sm:text-left space-y-1.5 min-w-0 flex-1">
              <span className="text-xs text-vangogh-gold font-bold uppercase tracking-wider block">
                피지 신예 아티스트
              </span>
              <h3 className="text-2xl font-bold text-vangogh-navy">
                {profile.name}
              </h3>
              <p className="text-xs text-vangogh-charcoal/60 font-medium">
                {profile.localName} · {profile.age}세
              </p>
              <div className="inline-flex items-center gap-1 text-xs text-vangogh-charcoal/70 pt-1">
                <MapPin className="w-3.5 h-3.5 text-vangogh-gold shrink-0" />
                <span className="truncate">{profile.studioLocation}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2 p-4 rounded-xl bg-vangogh-canvas border border-vangogh-charcoal/10 text-xs sm:text-sm text-vangogh-charcoal/80 leading-relaxed">
            <h4 className="font-bold text-xs text-vangogh-navy flex items-center gap-1.5 uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5 text-vangogh-gold" />
              <span>작가 소개</span>
            </h4>
            <p>{profile.bio}</p>
          </div>

          {/* Philosophy */}
          <div className="p-4 rounded-xl bg-vangogh-stone/50 border border-vangogh-gold/30 text-xs text-vangogh-charcoal/80 space-y-1">
            <span className="text-[10px] font-bold text-vangogh-navy uppercase tracking-wider block">창작 철학</span>
            <p className="italic text-vangogh-charcoal font-medium">"{profile.philosophy}"</p>
          </div>

          {/* Exhibitions */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-vangogh-navy flex items-center gap-1.5 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-vangogh-gold" />
              <span>주요 전시 및 활동 이력</span>
            </h4>
            <ul className="space-y-1 text-vangogh-charcoal/70">
              {profile.exhibitions.map((ex, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-vangogh-gold font-bold">·</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* External Mock Links */}
          <div className="space-y-2 pt-2 border-t border-vangogh-charcoal/10">
            <h4 className="text-xs font-bold text-vangogh-navy uppercase tracking-wider">
              공식 채널 & 포트폴리오
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a 
                href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`${profile.name} 작가의 공식 인스타그램(${profile.instagram})으로 연결되는 시연 링크입니다.`);
                }}
                className="flex items-center justify-between p-3 rounded-xl border border-vangogh-charcoal/15 hover:border-vangogh-navy bg-white hover:bg-vangogh-stone/30 text-xs font-semibold text-vangogh-charcoal transition-all"
              >
                <div className="flex items-center gap-2">
                  <InstagramIcon />
                  <span>{profile.instagram}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-vangogh-charcoal/40" />
              </a>

              <a 
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`${profile.name} 작가의 포트폴리오 아카이브(${profile.website})로 연결되는 시연 링크입니다.`);
                }}
                className="flex items-center justify-between p-3 rounded-xl border border-vangogh-charcoal/15 hover:border-vangogh-navy bg-white hover:bg-vangogh-stone/30 text-xs font-semibold text-vangogh-charcoal transition-all"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-vangogh-blue" />
                  <span>아티스트 웹사이트</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-vangogh-charcoal/40" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-vangogh-charcoal/10 bg-vangogh-canvas flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-vangogh-navy text-white hover:bg-vangogh-blue transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
