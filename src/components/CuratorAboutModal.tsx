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
              1:1 실물 원작 보증과 실제 작품 교환권 분리 메커니즘
            </h3>

            <div className="p-4 bg-white border border-neutral-200 space-y-3 text-xs text-neutral-700 leading-relaxed">
              <div className="space-y-1">
                <h4 className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-vangogh-gold" />
                  <span>1. 1:1 실물 원작 독점 소장 (조각투자 배제)</span>
                </h4>
                <p className="text-neutral-600 pl-5">
                  반 고흐 21은 지분 쪼개기나 조각투자 방식의 투기적 금융 모델을 일절 배제합니다. 1점의 원화는 오직 1인의 컬렉터에게만 1:1로 독점 양도되며, 발급된 디지털 보증서는 실물 원화에 1:1로 영구 귀속되는 디지털 진품 보증서 역할을 합니다.
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-neutral-100">
                <h4 className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-vangogh-navy" />
                  <span>2. 디지털 소유 보증권과 실제 작품 교환권의 분리</span>
                </h4>
                <p className="text-neutral-600 pl-5">
                  원작 구매 즉시 무리한 개별 국제 배송을 진행하지 않고, 현지 및 국내 거점 볼트에서 1년간 무상 안전 보관을 지원합니다. 소장자는 디지털 보증서를 통해 1호 소장 자격을 즉시 증명받으며, 원하는 시점에 언제든 <strong className="text-neutral-800">&lsquo;실제 작품 교환권&rsquo;</strong>을 행사하여 실물 원화를 안전하게 수령할 수 있습니다.
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-neutral-100">
                <h4 className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-vangogh-gold ml-1 mr-1"></span>
                  <span>소유권 이중 거래 방지 메커니즘</span>
                </h4>
                <p className="text-neutral-600 pl-5">
                  실제 작품 교환을 신청하면 기존의 실물 작품 교환권은 즉시 <strong className="text-neutral-800">&lsquo;실물 인도 완료&rsquo;</strong> 상태로 전환되며 교환 권한이 영구 소각됩니다. 이후 해당 카드는 실물 원화와 평생 함께 귀속되는 '디지털 진품 보증서'로만 동결되어 이중 양도 및 유통 위조를 원천 차단합니다.
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-neutral-100">
                <h4 className="font-bold text-neutral-900 text-xs">
                  3. 시즌제 정기 일괄 수거 물류
                </h4>
                <p className="text-neutral-600">
                  산발적인 개별 항공 특송 대신 국가별 시즌 종료 후 정기 일괄 수거 방식을 채택하여 고가의 국제 물류비를 대폭 절감하고 장거리 운송에 따른 파손 리스크를 최소화합니다.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* 5. Sustainable Business Model & Transparency */}
          <section className="space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-vangogh-gold uppercase block">
              BUSINESS MODEL &amp; TRANSPARENCY
            </span>
            <h3 className="text-sm font-bold text-neutral-900">
              플랫폼 4대 수익 구조 및 투명한 배분 기준
            </h3>
            <p className="text-xs text-neutral-600">
              반 고흐 21은 창작자의 지속 가능한 자립과 플랫폼의 안정적 운영을 위해 4대 수익 파이프라인을 운영하며, 명확한 정산 기준을 사전에 공시합니다.
            </p>

            {/* Curatorial Academic Table */}
            <div className="border border-neutral-200 bg-white overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100/70 border-b border-neutral-200 text-neutral-800">
                    <th className="py-2.5 px-3 font-semibold w-28">수익 모델</th>
                    <th className="py-2.5 px-3 font-semibold">운영 구조 및 배분 항목</th>
                    <th className="py-2.5 px-3 font-semibold text-right w-24">비율 / 마진</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-neutral-900 bg-neutral-50/50" rowSpan={2}>
                      1. 원화 중개 수수료<br/>(주 수익원)
                    </td>
                    <td className="py-2 px-3">현지 창작자 정산 및 현지 창작 환경 지원비</td>
                    <td className="py-2 px-3 text-right font-bold text-neutral-900">75~80%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">플랫폼 운영 수수료 (원화 1:1 거래)</td>
                    <td className="py-2 px-3 text-right font-medium text-neutral-900">20~25%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-neutral-900 bg-neutral-50/50" rowSpan={3}>
                      2. 공식 아트프린트<br/>(상시 판매 마진)
                    </td>
                    <td className="py-2 px-3">원목 프레임 및 파인아트 캔버스 정밀 제작 실비</td>
                    <td className="py-2 px-3 text-right text-neutral-500">35%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">플랫폼 제품 판매 마진 (선재고 없는 주문 제작)</td>
                    <td className="py-2 px-3 text-right font-bold text-neutral-900">35~40%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">원작자 라이선스 창작 로열티 환원</td>
                    <td className="py-2 px-3 text-right font-medium">25~30%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-neutral-900 bg-neutral-50/50">
                      3. 전용 아트 패키징<br/>및 운송 핸들링
                    </td>
                    <td className="py-2 px-3">미술품 맞춤형 특수 완충재 패키징 및 국내외 특송 실비 대행</td>
                    <td className="py-2 px-3 text-right font-medium">10~15% 마진</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-neutral-900 bg-neutral-50/50">
                      4. 실물 2차 거래 마켓<br/>(장기 확장 모델)
                    </td>
                    <td className="py-2 px-3">
                      디지털 정품 보증서 기반 1:1 실물 C2C 양도 중개<br/>
                      <span className="text-[10px] text-neutral-500">* 미술진흥법 취지에 따라 재판매 대금 일부를 현지 원작자 로열티로 환원</span>
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-neutral-900">5~10% 수수료</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-neutral-500 leading-normal pt-1">
              * 조각투자 및 가상자산 모델을 완전히 배제하며, 실물 예술품의 1:1 안전 거래와 창작자 공정 배분을 지향합니다.
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
