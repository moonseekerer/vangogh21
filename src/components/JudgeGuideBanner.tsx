import React, { useState } from 'react';
import { Compass, X } from 'lucide-react';

interface JudgeGuideBannerProps {
  onOpenVault: () => void;
  onOpenAbout: () => void;
  onOpenSalon?: () => void;
  onResetDemo?: () => void;
}

export const JudgeGuideBanner: React.FC<JudgeGuideBannerProps> = ({ 
  onOpenVault, 
  onOpenAbout, 
  onOpenSalon, 
  onResetDemo 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-30 px-3.5 py-2 rounded-full bg-vangogh-navy text-vangogh-gold text-xs font-bold shadow-lg border border-vangogh-gold/40 flex items-center gap-1.5 hover:scale-105 transition-all"
      >
        <Compass className="w-3.5 h-3.5" />
        <span>심사위원 시연 가이드</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-30 bg-vangogh-navy text-vangogh-canvas p-4 rounded-2xl shadow-2xl border border-vangogh-gold/40">
      <div className="flex items-start justify-between pb-2 border-b border-vangogh-gold/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-vangogh-gold animate-pulse"></span>
          <h4 className="font-bold text-xs text-vangogh-gold uppercase tracking-wider">
            모두의 창업 심사위원 시연 가이드
          </h4>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-vangogh-canvas/60 hover:text-white p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-2.5 space-y-1.5 text-xs text-vangogh-canvas/80">
        <div className="flex items-start gap-1.5">
          <span className="font-mono text-vangogh-gold font-bold">1.</span>
          <span>피지 신예 아티스트 작품 클릭 후 상세 서사 및 룸 뷰 감상</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="font-mono text-vangogh-gold font-bold">2.</span>
          <span><strong>1:1 원작 소장권 결제(시연)</strong> 완료 시 <strong>실시간 품절(Sold Out)</strong> 및 소장자 성명 즉시 반영</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="font-mono text-vangogh-gold font-bold">3.</span>
          <span>원작 품절 작품은 타 방문자에게 <strong>공식 아트 프린팅 실물 주문만 가능</strong>하도록 자동 전환</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="font-mono text-vangogh-gold font-bold">4.</span>
          <span><strong>[내 보관함]</strong>에서 취득한 보증서 확인 및 <strong>'실물 원화 인출(Redeem)'</strong> 신청</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="font-mono text-vangogh-gold font-bold">5.</span>
          <span><strong>[소장자 살롱]</strong>에서 실물 액자 거치 후기 및 피지 현지 작가의 감사 답글 교류</span>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-vangogh-gold/20 text-[11px]">
        <div className="flex items-center gap-2">
          {onOpenSalon && (
            <button
              onClick={onOpenSalon}
              className="text-vangogh-gold hover:underline font-medium"
            >
              소장자 살롱 →
            </button>
          )}
          {onResetDemo && (
            <button
              onClick={onResetDemo}
              className="text-vangogh-canvas/50 hover:text-vangogh-gold underline"
              title="초기 상태로 되돌리기"
            >
              데이터 초기화
            </button>
          )}
        </div>
        <button
          onClick={onOpenVault}
          className="px-2.5 py-1 rounded bg-vangogh-stone/20 hover:bg-vangogh-stone/30 text-vangogh-canvas font-semibold transition-colors"
        >
          내 보관함
        </button>
      </div>
    </div>
  );
};

