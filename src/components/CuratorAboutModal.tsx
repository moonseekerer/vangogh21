import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface CuratorAboutModalProps {
  onClose: () => void;
}

export const CuratorAboutModal: React.FC<CuratorAboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FCFAF7] border border-neutral-300 shadow-2xl my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-vangogh-gold" />
            <h2 className="font-bold text-base sm:text-lg text-neutral-900 tracking-tight">
              큐레이터 노트 및 운영 원칙
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-7 text-neutral-800 text-sm leading-relaxed">
          
          {/* Section 1: Curatorial Vision */}
          <section className="space-y-2.5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              CURATORIAL VISION
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              21세기 반 고흐를 찾아서
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              생전에 단 한 점의 그림만을 남긴 채 가난과 고독 속에서 세상을 떠났던 빈센트 반 고흐. 
              오늘날에도 지리적 한계와 미술 시장의 부재로 인해 자신의 재능을 온전히 펼치지 못하는 청년 화가들이 세계 곳곳에 존재합니다.
            </p>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              반 고흐 21은 국경 너머 묵묵히 붓을 쥐고 있는 숨은 창작자를 발굴하여 국내 컬렉터와 직접 연결하는 소셜 아트 프로젝트입니다. 
              뛰어난 예술성이 인프라의 부재로 묻히지 않고 지속될 수 있도록 실질적인 전시와 유통의 기회를 만듭니다.
            </p>
          </section>

          <hr className="border-neutral-200" />

          {/* Section 2: Logistics & Preservation */}
          <section className="space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              LOGISTICS & PRESERVATION
            </span>
            <h3 className="text-sm font-bold text-neutral-900">
              작품 보관 및 물류 체계
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              <div className="space-y-1">
                <h4 className="font-semibold text-xs text-neutral-900">
                  1. 원작 안심 보관
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  원작의 1:1 독점 소장 권리를 확정한 뒤, 현지 보관소에서 1년간 무상 보관을 지원합니다. 소장자는 원하는 시점에 실물 원화를 안전하게 인출 및 배송받을 수 있습니다.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-xs text-neutral-900">
                  2. 시즌제 일괄 수거 물류
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  건별 개별 항공 특송 대신 시즌 종료 후 정기 일괄 수거 방식을 채택하여 고가의 국제 운송 비용을 90% 이상 절감하고 운송 과정에서의 파손 위험을 최소화합니다.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* Section 3: Transparent Settlement Table */}
          <section className="space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              TRANSPARENCY & SETTLEMENT
            </span>
            <h3 className="text-sm font-bold text-neutral-900">
              투명한 수익 배분 기준 (운영 예시)
            </h3>
            <p className="text-xs text-neutral-600">
              반 고흐 21은 창작자의 정당한 권익 보호와 자립을 위해 명확한 정산 기준을 사전에 공시합니다. (아래 배분율은 사업 모델 시연을 위한 운영 예시입니다.)
            </p>

            {/* Curatorial Academic Table */}
            <div className="border border-neutral-200 bg-white overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100/70 border-b border-neutral-200 text-neutral-800">
                    <th className="py-2.5 px-3 font-semibold w-24">구분</th>
                    <th className="py-2.5 px-3 font-semibold">배분 항목 (예시)</th>
                    <th className="py-2.5 px-3 font-semibold text-right w-20">비율</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-neutral-900 bg-neutral-50/50" rowSpan={3}>
                      원작 소장권
                    </td>
                    <td className="py-2 px-3">현지 창작자 직접 정산</td>
                    <td className="py-2 px-3 text-right font-bold text-neutral-900">60%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">청년 미술 창작 기금 (화구 및 작업실 지원)</td>
                    <td className="py-2 px-3 text-right font-medium">10%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">전문 보관 및 플랫폼 운영 관리비</td>
                    <td className="py-2 px-3 text-right text-neutral-500">30%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-neutral-900 bg-neutral-50/50" rowSpan={4}>
                      파인아트 에디션
                    </td>
                    <td className="py-2 px-3">캔버스 인쇄, 원목 액자 가공 및 국내 발송 실비</td>
                    <td className="py-2 px-3 text-right text-neutral-500">35%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">원작 작가 창작 로열티 (순이익의 50% 분배)</td>
                    <td className="py-2 px-3 text-right font-bold text-neutral-900">30%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">품질 검수 및 패키징 운영비</td>
                    <td className="py-2 px-3 text-right text-neutral-500">30%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">로컬 청년 예술가 육성 기금</td>
                    <td className="py-2 px-3 text-right font-medium">5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-neutral-500 leading-normal pt-1">
              * 위 항목 및 정산 비율은 플랫폼 시연과 사업 계획 검증을 위한 운영 모델 예시입니다.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
