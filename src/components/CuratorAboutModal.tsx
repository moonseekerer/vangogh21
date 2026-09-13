import React from 'react';
import { X, BookOpen, Compass, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

interface CuratorAboutModalProps {
  onClose: () => void;
}

export const CuratorAboutModal: React.FC<CuratorAboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FCFAF7] border border-neutral-300 shadow-2xl my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-vangogh-gold" />
            <h2 className="font-bold text-base sm:text-lg text-neutral-900 tracking-tight">
              브랜드 미션 및 운영 원칙
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 text-neutral-800 text-sm leading-relaxed">
          
          {/* 1. Brand Mission & Philosophy */}
          <section className="space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              ABOUT OUR MISSION
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              브랜드 미션 &amp; 철학
            </h3>

            <div className="p-4 sm:p-5 bg-white border-l-2 border-vangogh-gold border-y border-r border-neutral-200 text-xs sm:text-sm space-y-3 text-neutral-800">
              <p className="font-bold text-neutral-950 text-sm sm:text-base tracking-tight">
                &ldquo;예술가의 재능이 태어난 곳의 국경에 갇히지 않도록&rdquo;
              </p>
              <p className="text-neutral-700 leading-relaxed">
                고흐의 위대한 붓질이 오랜 시간 고독 속에 머물렀던 비극이 오늘날 되풀이되지 않기를 바랍니다.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                우리는 단순한 그림 판매를 넘어, 예술과 개발협력의 가치를 잇는 새로운 통로를 만듭니다.
              </p>
              <div className="py-1 text-neutral-800 space-y-1 font-medium pl-1">
                <div>· 작가는 온전히 창작에만 몰입할 수 있도록,</div>
                <div>· 컬렉터는 세상에 단 하나뿐인 영감과 스토리를 소장할 수 있도록,</div>
              </div>
              <p className="text-neutral-700 leading-relaxed pt-1">
                글로벌 미술 시장의 문턱을 가장 따뜻한 방식으로 낮춰갑니다.
              </p>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* 2. Core Pillars / Approach */}
          <section className="space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              CORE PILLARS &amp; APPROACH
            </span>
            <h3 className="text-sm font-bold text-neutral-900">
              예술적 발견과 소셜 임팩트의 양립
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pillar 1: Artistic Discovery */}
              <div className="p-4 bg-white border border-neutral-200 space-y-2">
                <span className="text-[11px] font-bold text-neutral-900 tracking-wider uppercase block border-b border-neutral-100 pb-1.5 flex items-center justify-between">
                  <span>로컬의 고유한 예술성 발굴</span>
                  <span className="font-mono text-[10px] text-vangogh-gold font-bold">01</span>
                </span>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  중앙화된 주류 아트 씬 너머, 태평양의 섬과 아프리카의 대지, 남미의 골목 등 <strong className="font-semibold text-neutral-900">세계 곳곳의 고유한 숨결을 간직한 독립 예술가들</strong>을 직접 찾아갑니다. 지리적 경계를 넘어 그들의 진솔한 세계가 일상의 공간과 만납니다.
                </p>
              </div>

              {/* Pillar 2: Social Impact Commerce */}
              <div className="p-4 bg-white border border-neutral-200 space-y-2">
                <span className="text-[11px] font-bold text-neutral-900 tracking-wider uppercase block border-b border-neutral-100 pb-1.5 flex items-center justify-between">
                  <span>글로벌 사우스 임팩트 커머스</span>
                  <span className="font-mono text-[10px] text-vangogh-gold font-bold">02</span>
                </span>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  <strong className="font-semibold text-neutral-900">글로벌 사우스(Global South)의 풍부한 문화예술 자산과 소비 시장을 잇는 지속 가능한 솔루션</strong>입니다. 현지의 열악한 물류 및 유통 인프라 한계를 디지털 보증과 경량화된 모델로 극복하여, 소외 지역 창작자의 지속 가능한 경제적 자립을 지원합니다.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* 3. Problem Statement (Local Artist vs Young Collector) */}
          <section className="space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              PROBLEM STATEMENT
            </span>
            <h3 className="text-sm font-bold text-neutral-900">
              해결하고자 하는 문제
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Local Artist Problem */}
              <div className="p-4 bg-white border border-neutral-200 space-y-2.5">
                <div className="flex items-center gap-1.5 text-neutral-900 border-b border-neutral-100 pb-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="text-xs font-bold">개도국 현지 예술가가 직면한 문제</span>
                </div>
                <ul className="text-xs text-neutral-600 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-neutral-800">· 작품 알릴 기회의 부재:</strong> 현지 관광객 대상의 저가 기념품 매점 외에는 본인의 예술 세계를 알릴 글로벌 갤러리나 아트페어 진입 기회가 부재합니다.
                  </li>
                  <li>
                    <strong className="text-neutral-800">· 열악한 물류 및 유통 인프라:</strong> 고가의 국제 항공 운임이 작품가를 초과하며, 글로벌 전자결제 인프라가 미비하여 독자적인 해외 판로 개척이 불가능합니다.
                  </li>
                  <li>
                    <strong className="text-neutral-800">· 지속 불가능한 창작 여건:</strong> 정당한 유통 수익이 현지에 정산되지 않아 전문 화구 구입조차 어렵고, 생계를 위해 붓을 내려놓아야 하는 악순환에 놓입니다.
                  </li>
                </ul>
              </div>

              {/* Young Collector Problem */}
              <div className="p-4 bg-white border border-neutral-200 space-y-2.5">
                <div className="flex items-center gap-1.5 text-neutral-900 border-b border-neutral-100 pb-1.5">
                  <Scale className="w-3.5 h-3.5 text-vangogh-gold shrink-0" />
                  <span className="text-xs font-bold">국내 영컬렉터가 직면한 문제</span>
                </div>
                <ul className="text-xs text-neutral-600 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-neutral-800">· 작품 소비 기회의 제한:</strong> 유명 작가와 주류 상업 화랑 중심의 편중된 시장 구조 속에서, 애초에 개도국 독립 예술가의 진솔한 원작을 탐색하고 소비할 기회 자체가 제한됩니다.
                  </li>
                  <li>
                    <strong className="text-neutral-800">· 신뢰 가능한 유통 경로 부재:</strong> 현지를 직접 방문하지 않는 한 원작의 진품 여부와 창작자 출처(Provenance)를 객관적으로 검증할 수 있는 공인된 통로가 없습니다.
                  </li>
                  <li>
                    <strong className="text-neutral-800">· 보관 및 운송 비용 부담:</strong> 해외 원화 구매 시 수반되는 높은 국제 배송비와 파손 위험, 거주 공간 내 보관 부담이 첫 원작 소장의 문턱으로 작용합니다.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* 4. Solution & Logistics Mechanism */}
          <section className="space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              SOLUTION &amp; LOGISTICS MECHANISM
            </span>
            <h3 className="text-sm font-bold text-neutral-900">
              디지털 소유 보증권과 실제 작품 교환권 분리 메커니즘
            </h3>

            <div className="p-4 bg-white border border-neutral-200 space-y-3 text-xs text-neutral-700 leading-relaxed">
              <div className="space-y-1">
                <h4 className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-vangogh-gold" />
                  <span>1. 디지털 소유 보증권과 실제 작품 교환권의 분리</span>
                </h4>
                <p className="text-neutral-600 pl-5">
                  원작의 1:1 독점 소장 권리를 확정한 뒤, 현지 보관소에서 1년간 무상 보관을 지원합니다. 소장자는 디지털 소유 보증권을 통해 소장 자격을 즉시 증명받으며, 원하는 시점에 언제든 <strong className="text-neutral-800">&lsquo;실제 작품 교환권&rsquo;</strong>을 행사하여 실물 원화를 안전하게 국내로 수령할 수 있습니다.
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-neutral-100">
                <h4 className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-vangogh-navy" />
                  <span>소유권 이중 거래 방지 메커니즘</span>
                </h4>
                <p className="text-neutral-600 pl-5">
                  실제 작품 교환을 신청하면 기존 실물 작품 교환권은 자동으로 <strong className="text-neutral-800">&lsquo;실물 인도 완료&rsquo;</strong> 상태로 전환 및 동결됩니다. 이를 통해 동일한 원화에 대한 중복 교환, 이중 양도 및 유통 위조를 원천 방지합니다.
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-neutral-100">
                <h4 className="font-bold text-neutral-900 text-xs">
                  2. 시즌제 정기 일괄 수거 물류
                </h4>
                <p className="text-neutral-600">
                  건별 개별 항공 특송 대신 시즌 종료 후 정기 일괄 수거 방식을 채택하여 고가의 국제 항공 운송 비용을 90% 이상 절감하고 운송 과정에서의 충격 및 파손 위험을 최소화합니다.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* 5. Transparent Settlement Table */}
          <section className="space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              TRANSPARENCY &amp; SETTLEMENT
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
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-white flex justify-end shrink-0">
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
