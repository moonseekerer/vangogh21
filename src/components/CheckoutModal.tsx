import React, { useState } from 'react';
import { Artwork, OwnershipCertificate } from '../types';
import { X, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  artwork: Artwork | null;
  purchaseType: 'original_vault' | 'art_print';
  price: number;
  onClose: () => void;
  onComplete: (certificate: OwnershipCertificate) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  artwork,
  purchaseType,
  price,
  onClose,
  onComplete,
}) => {
  const [collectorName, setCollectorName] = useState('김모두');
  const [collectorPhone, setCollectorPhone] = useState('010-1234-5678');
  const [shippingAddress, setShippingAddress] = useState('서울특별시 성동구 성수이로 22 (성수동 어반스페이스 3층)');
  const [paymentMethod, setPaymentMethod] = useState<'toss' | 'kakao' | 'card'>('toss');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!artwork) return null;

  const isOriginal = purchaseType === 'original_vault';
  const artistRate = isOriginal ? 0.60 : 0.30;
  const localFundRate = isOriginal ? 0.10 : 0.05;
  const productionRate = isOriginal ? 0 : 0.35;
  const artistAmount = Math.round(price * artistRate);
  const localFundAmount = Math.round(price * localFundRate);
  const productionAmount = Math.round(price * productionRate);
  const platformAmount = price - artistAmount - localFundAmount - productionAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Generate Serial Number
      const randomNum = Math.floor(100 + Math.random() * 900);
      const prefix = isOriginal ? 'VG21-ORIGINAL' : 'VG21-PRINT';
      const serialNumber = `${prefix}-2026-${randomNum}`;
      
      const newCert: OwnershipCertificate = {
        certificateId: `cert-${Date.now()}`,
        serialNumber,
        artworkId: artwork.id,
        artworkTitle: artwork.title,
        artistName: artwork.artistName,
        collectorName: collectorName.trim() || '소장자',
        collectorPhone: collectorPhone.trim() || '010-0000-0000',
        purchaseType,
        price,
        mintedAt: new Date().toISOString().split('T')[0],
        vaultStatus: isOriginal ? 'in_vault' : 'delivered',
        vaultExpiryDate: isOriginal ? '2027-09-12' : undefined,
        shippingAddress: !isOriginal ? {
          recipient: collectorName.trim() || '주문자',
          phone: collectorPhone.trim() || '010-0000-0000',
          address: shippingAddress.trim() || '배송지 주소',
          postalCode: '04781',
        } : undefined,
      };

      // Confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e6a117', '#13284c', '#f4c430', '#fdfbf7'],
        });
      } catch (err) {
        // ignore
      }

      setIsSubmitting(false);
      onComplete(newCert);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-vangogh-navy/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-vangogh-charcoal/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-vangogh-charcoal/10 flex items-center justify-between bg-vangogh-canvas">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-vangogh-navy">
              {isOriginal ? '원작 1:1 독점 소장 결제' : '공식 아트 프린팅 실물 주문'}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-vangogh-stone text-vangogh-navy font-semibold">심사 시연 모드</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-vangogh-stone text-vangogh-charcoal/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          
          {/* Item Summary */}
          <div className="flex gap-3 p-3 bg-vangogh-stone/40 rounded-xl border border-vangogh-charcoal/5">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="w-16 h-16 rounded-lg object-cover border border-vangogh-charcoal/10 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className={`text-[10px] font-bold block uppercase ${isOriginal ? 'text-vangogh-gold' : 'text-vangogh-navy'}`}>
                {isOriginal ? '1:1 원작 실물 독점 소유권' : '원작 정밀 파인아트 프린팅 (실물 액자)'}
              </span>
              <h4 className="font-bold text-sm text-vangogh-navy truncate">{artwork.title}</h4>
              <p className="text-xs text-vangogh-charcoal/70">{artwork.artistName} ({artwork.location})</p>
              <p className="text-xs font-bold text-vangogh-navy pt-1">{price.toLocaleString()}원</p>
            </div>
          </div>

          {/* Customer / Shipping Info */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-vangogh-navy uppercase tracking-wider">
              {isOriginal ? '소장자 정보 (보증서 각인용)' : '주문 및 실물 배송 정보'}
            </h5>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-vangogh-charcoal/70 mb-1">
                  {isOriginal ? '소장자 성명 (한글/영문)' : '수령인 성명'}
                </label>
                <input 
                  type="text" 
                  value={collectorName}
                  onChange={(e) => setCollectorName(e.target.value)}
                  required
                  placeholder="예: 김모두"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-vangogh-charcoal/20 focus:outline-none focus:border-vangogh-navy"
                />
              </div>
              <div>
                <label className="block text-xs text-vangogh-charcoal/70 mb-1">연락처 (배송/알림톡 수신용)</label>
                <input 
                  type="text" 
                  value={collectorPhone}
                  onChange={(e) => setCollectorPhone(e.target.value)}
                  required
                  placeholder="예: 010-1234-5678"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-vangogh-charcoal/20 focus:outline-none focus:border-vangogh-navy"
                />
              </div>

              {!isOriginal && (
                <div>
                  <label className="block text-xs text-vangogh-charcoal/70 mb-1">실물 액자 배송지 주소 (도로명 주소)</label>
                  <input 
                    type="text" 
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                    placeholder="예: 서울특별시 성동구 성수이로 22, 3층"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-vangogh-charcoal/20 focus:outline-none focus:border-vangogh-navy"
                  />
                  <p className="text-[11px] text-vangogh-charcoal/50 mt-1">
                    * 주문 즉시 정밀 제작에 착수하며, 전국 무료 안전 배송됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-vangogh-navy uppercase tracking-wider">결제 수단 선택</h5>
            <div className="grid grid-cols-3 gap-2">
              {(['toss', 'kakao', 'card'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    paymentMethod === method
                      ? 'border-vangogh-navy bg-vangogh-navy text-white'
                      : 'border-vangogh-charcoal/15 bg-white text-vangogh-charcoal/70 hover:bg-vangogh-stone'
                  }`}
                >
                  {method === 'toss' ? '토스페이' : method === 'kakao' ? '카카오페이' : '신용카드'}
                </button>
              ))}
            </div>
          </div>

          {/* Transparent Settlement Breakdown (Impact Point) */}
          <div className="p-3 bg-vangogh-canvas rounded-xl border border-vangogh-gold/30 space-y-1.5 text-xs">
            <div className="flex items-center gap-1 font-bold text-vangogh-navy">
              <ShieldCheck className="w-3.5 h-3.5 text-vangogh-gold" />
              <span>
                {isOriginal ? '공정무역 정산 투명성 공시 (피지 현지 직접 전달)' : '아트 프린팅 저작권료 정산 공시'}
              </span>
            </div>
            <div className="flex justify-between text-vangogh-charcoal/70">
              <span>{isOriginal ? '피지 현지 작가 직접 정산 (60%)' : '피지 원작 작가 창작 로열티 (순이익 50% 분배)'}</span>
              <span className="font-medium text-vangogh-navy">{artistAmount.toLocaleString()}원</span>
            </div>
            {!isOriginal && (
              <div className="flex justify-between text-vangogh-charcoal/70">
                <span>캔버스·원목 액자 제작 및 배송 실비 (35%)</span>
                <span className="font-medium">{productionAmount.toLocaleString()}원</span>
              </div>
            )}
            <div className="flex justify-between text-vangogh-charcoal/70">
              <span>{isOriginal ? '피지 청년 미술 지원기금 (10%)' : '피지 로컬 창작 기금 (5%)'}</span>
              <span className="font-medium">{localFundAmount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-vangogh-charcoal/70">
              <span>{isOriginal ? '플랫폼 운영 및 1년 안심 보관 (30%)' : '플랫폼 운영 및 품질 검수 (30%)'}</span>
              <span className="font-medium">{platformAmount.toLocaleString()}원</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-vangogh-navy hover:bg-vangogh-blue text-vangogh-canvas font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-vangogh-gold" />
            <span>
              {isSubmitting 
                ? '처리 중...' 
                : isOriginal 
                  ? `${price.toLocaleString()}원 결제하고 보증서 발급`
                  : `${price.toLocaleString()}원 결제하고 실물 액자 주문`
              }
            </span>
          </button>

        </form>
      </div>
    </div>
  );
};
