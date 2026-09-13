import React, { useState } from 'react';
import { OwnershipCertificate, Artwork } from '../types';
import { CertificateCard } from './CertificateCard';
import { X, Layers, ShieldAlert, PackageCheck, Truck, CheckCircle2 } from 'lucide-react';

interface VaultModalProps {
  certificates: OwnershipCertificate[];
  artworks: Artwork[];
  onClose: () => void;
  onUpdateCertificate: (updated: OwnershipCertificate) => void;
}

export const VaultModal: React.FC<VaultModalProps> = ({
  certificates,
  artworks,
  onClose,
  onUpdateCertificate,
}) => {
  const [selectedCertForRedeem, setSelectedCertForRedeem] = useState<OwnershipCertificate | null>(null);
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState(false);

  const handleStartRedeem = (cert: OwnershipCertificate) => {
    setSelectedCertForRedeem(cert);
    setRecipient(cert.collectorName);
    setPhone(cert.collectorPhone);
    setAddress('서울특별시 성동구 성수이로 22 (성수동 어반스페이스 3층)');
    setPostalCode('04781');
    setRedeemSuccessMsg(false);
  };

  const handleConfirmRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCertForRedeem) return;

    setIsProcessing(true);
    setTimeout(() => {
      const updated: OwnershipCertificate = {
        ...selectedCertForRedeem,
        vaultStatus: 'redeemed',
        redeemedAt: new Date().toISOString().split('T')[0],
        shippingAddress: {
          recipient,
          phone,
          address,
          postalCode,
        }
      };

      onUpdateCertificate(updated);
      setIsProcessing(false);
      setRedeemSuccessMsg(true);
      setTimeout(() => {
        setSelectedCertForRedeem(null);
        setRedeemSuccessMsg(false);
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-vangogh-navy/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-vangogh-charcoal/10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-vangogh-charcoal/10 flex items-center justify-between bg-vangogh-canvas">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-vangogh-gold" />
            <h2 className="font-bold text-lg text-vangogh-navy">내 안심 보관함 & 소유 보증서</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-vangogh-navy text-vangogh-gold font-bold">
              {certificates.length}점 소장 중
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
          
          {/* Mechanism Explanation Banner */}
          <div className="p-4 bg-vangogh-stone/60 rounded-xl border border-vangogh-gold/30 text-xs text-vangogh-charcoal/80 space-y-1">
            <h4 className="font-bold text-vangogh-navy flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-vangogh-gold" />
              <span>실제 작품 교환(Redemption) 시스템 작동 안내</span>
            </h4>
            <p className="leading-relaxed">
              취득하신 원작은 1년간 피지 수거 허브 및 제휴 전시관에 무상으로 안전 보관됩니다. 
              원하실 때 [실제 작품 교환 신청]을 누르시면 특수 미술품 포장 후 국내 지정 주소로 안전하게 배송됩니다. 
              <strong>실제 작품 교환을 신청하면 기존 실물 작품 교환권은 자동으로 &lsquo;실물 인도 완료&rsquo; 상태로 전환·동결되어 이중 거래가 방지됩니다.</strong>
            </p>
          </div>

          {/* Certificates Grid */}
          {certificates.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm text-vangogh-charcoal/60">아직 소장하신 작품이 없습니다.</p>
              <p className="text-xs text-vangogh-charcoal/40">피지 에디션 작품을 둘러보고 나만의 21세기 반 고흐를 발굴해 보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {certificates.map((cert) => {
                const artwork = artworks.find(a => a.id === cert.artworkId);
                return (
                  <div key={cert.certificateId} className="p-5 bg-vangogh-canvas rounded-2xl border border-vangogh-charcoal/10 space-y-3">
                    <CertificateCard 
                      certificate={cert}
                      artwork={artwork}
                      onOpenRedeem={handleStartRedeem}
                    />
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Redemption Modal Sub-layer */}
        {selectedCertForRedeem && (
          <div className="absolute inset-0 bg-vangogh-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-vangogh-charcoal/15">
              
              <div className="flex items-center justify-between border-b border-vangogh-charcoal/10 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-vangogh-navy">실제 작품 교환 신청</h3>
                  <span className="text-xs text-vangogh-charcoal/60">{selectedCertForRedeem.artworkTitle}</span>
                </div>
                <button 
                  onClick={() => setSelectedCertForRedeem(null)}
                  className="p-1 rounded-full hover:bg-vangogh-stone"
                >
                  <X className="w-4 h-4 text-vangogh-charcoal/70" />
                </button>
              </div>

              {redeemSuccessMsg ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                  <h4 className="font-bold text-base text-vangogh-navy">실제 작품 교환 신청이 완료되었습니다!</h4>
                  <p className="text-xs text-vangogh-charcoal/70">
                    실물 작품 교환권이 &lsquo;실물 인도 완료&rsquo; 상태로 전환·동결되었습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirmRedeem} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-vangogh-charcoal/70 mb-1 font-medium">수령인 성명</label>
                    <input 
                      type="text" 
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-vangogh-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-vangogh-charcoal/70 mb-1 font-medium">수령인 연락처</label>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-vangogh-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-vangogh-charcoal/70 mb-1 font-medium">배송지 주소</label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-vangogh-navy"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-vangogh-stone/60 space-y-1 text-[11px] text-vangogh-charcoal/70">
                    <div className="flex justify-between font-bold text-vangogh-navy">
                      <span>특수 미술품 완충 패키징 및 국내 안전 택배</span>
                      <span>무료 지원 (시즌 1 프로모션)</span>
                    </div>
                    <p>전문 미술품 운송 규격 박스 및 온습도 보존 에어캡으로 2일 내 안전 발송됩니다.</p>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCertForRedeem(null)}
                      className="flex-1 py-2.5 rounded-xl border border-vangogh-charcoal/20 font-semibold text-vangogh-charcoal/70 hover:bg-vangogh-stone"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 py-2.5 rounded-xl bg-vangogh-navy hover:bg-vangogh-blue text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-vangogh-gold" />
                      <span>{isProcessing ? '처리 중...' : '교환 신청 완료'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

