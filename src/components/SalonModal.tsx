import React, { useState, useEffect } from 'react';
import { OwnershipCertificate, Artwork } from '../types';
import { SalonPost, INITIAL_SALON_POSTS } from '../data/mockSalonPosts';
import { 
  X, 
  MessageSquareQuote, 
  ShieldCheck, 
  Heart, 
  PlusCircle, 
  Sparkles, 
  Compass, 
  Camera, 
  CheckCircle2, 
  Lock, 
  Share2 
} from 'lucide-react';

const SALON_STORAGE_KEY = 'vangogh21_salon_posts_v2';

interface SalonModalProps {
  onClose: () => void;
  certificates: OwnershipCertificate[];
  artworks: Artwork[];
  onExploreArtworks: () => void;
}

export const SalonModal: React.FC<SalonModalProps> = ({
  onClose,
  certificates,
  artworks,
  onExploreArtworks,
}) => {
  const [posts, setPosts] = useState<SalonPost[]>(() => {
    try {
      const saved = localStorage.getItem(SALON_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((p: SalonPost) => ({
          ...p,
          authorName: p.authorName ? p.authorName.replace('박문식', '김모두') : '김모두'
        }));
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_SALON_POSTS;
  });

  const [filter, setFilter] = useState<'all' | 'art_print' | 'original' | 'with_reply'>('all');
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Form state
  const hasPurchased = certificates.length > 0;
  const defaultArtworkId = certificates[0]?.artworkId || artworks[0]?.id || 'fiji-01';
  const [formArtworkId, setFormArtworkId] = useState(defaultArtworkId);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formLocation, setFormLocation] = useState('서울');

  useEffect(() => {
    try {
      localStorage.setItem(SALON_STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      // ignore
    }
  }, [posts]);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = likedPosts[postId];
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    const matchedArtwork = artworks.find(a => a.id === formArtworkId);
    const matchedCert = certificates.find(c => c.artworkId === formArtworkId) || certificates[0];
    const authorName = matchedCert ? matchedCert.collectorName : '익명의 소장자';
    const purchaseType = matchedCert ? matchedCert.purchaseType : 'art_print';

    const newPost: SalonPost = {
      id: `post-${Date.now()}`,
      artworkId: formArtworkId,
      artworkTitle: matchedArtwork?.title || '피지 큐레이션 원화',
      artistName: matchedArtwork?.artistName || '피지 신예 작가',
      purchaseType,
      authorName,
      authorLocation: formLocation.trim() || '국내 거주 소장자',
      createdAt: new Date().toISOString().split('T')[0],
      title: formTitle.trim(),
      content: formContent.trim(),
      roomPhotoUrl: matchedArtwork?.imageUrl,
      likes: 0,
      isVerifiedOwner: true,
    };

    setPosts([newPost, ...posts]);
    setIsWriteOpen(false);
    setFormTitle('');
    setFormContent('');
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'art_print') return post.purchaseType === 'art_print';
    if (filter === 'original') return post.purchaseType === 'original_vault';
    if (filter === 'with_reply') return !!post.artistReply;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-vangogh-navy/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-vangogh-charcoal/10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-vangogh-charcoal/10 flex items-center justify-between bg-vangogh-canvas">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-vangogh-navy text-vangogh-gold flex items-center justify-center">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base sm:text-lg text-vangogh-navy">
                  소장자 전용 살롱
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-vangogh-navy text-vangogh-gold font-bold">
                  COLLECTORS LOUNGE
                </span>
              </div>
              <p className="text-xs text-vangogh-charcoal/60">
                원작 및 공식 아트 프린트를 소장한 분들의 실제 공간 연출 후기와 작가 교류 커뮤니티
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-vangogh-stone text-vangogh-charcoal/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* Verification Status Banner */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
            hasPurchased 
              ? 'bg-vangogh-stone/50 border-vangogh-gold/40' 
              : 'bg-vangogh-canvas border-vangogh-charcoal/10'
          }`}>
            <div className="flex items-start gap-2.5">
              {hasPurchased ? (
                <ShieldCheck className="w-5 h-5 text-vangogh-gold shrink-0 mt-0.5" />
              ) : (
                <Lock className="w-5 h-5 text-vangogh-charcoal/40 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <div className="font-bold text-vangogh-navy flex items-center gap-1.5">
                  <span>{hasPurchased ? '공식 소장자 인증 완료' : '소장자 전용 글쓰기 권한 안내'}</span>
                  {hasPurchased && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-green-100 text-green-800 font-medium">
                      보유 작품 {certificates.length}점
                    </span>
                  )}
                </div>
                <p className="text-vangogh-charcoal/70 leading-relaxed">
                  {hasPurchased 
                    ? '소장하신 작품의 실물 액자 거치 소감, 인테리어 팁, 피지 현지 작가에게 전하는 응원 메시지를 남겨보세요.'
                    : '본 살롱은 아트 프린팅 및 원작을 실제로 소장하신 분들의 진솔한 감상평을 보존하기 위해 소장자 전용 인증제로 운영됩니다.'
                  }
                </p>
              </div>
            </div>

            {hasPurchased ? (
              <button
                onClick={() => setIsWriteOpen(!isWriteOpen)}
                className="px-4 py-2 rounded-xl bg-vangogh-navy hover:bg-vangogh-blue text-white font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5 text-vangogh-gold" />
                <span>{isWriteOpen ? '작성 취소' : '소장 이야기 남기기'}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onExploreArtworks();
                }}
                className="px-4 py-2 rounded-xl bg-vangogh-navy hover:bg-vangogh-blue text-white font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Compass className="w-3.5 h-3.5 text-vangogh-gold" />
                <span>작품 둘러보고 소장하기</span>
              </button>
            )}
          </div>

          {/* Write Post Form */}
          {isWriteOpen && hasPurchased && (
            <form onSubmit={handleCreatePost} className="p-5 bg-vangogh-stone/30 rounded-2xl border border-vangogh-charcoal/15 space-y-4">
              <div className="flex items-center justify-between border-b border-vangogh-charcoal/10 pb-2.5">
                <h3 className="font-bold text-sm text-vangogh-navy flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-vangogh-gold" />
                  <span>소장자 인증 이야기 작성</span>
                </h3>
                <span className="text-[11px] text-vangogh-charcoal/50">작성자: {certificates[0]?.collectorName || '소장자'} 님</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-vangogh-charcoal/70 mb-1 font-medium">소장 작품 선택</label>
                  <select 
                    value={formArtworkId} 
                    onChange={(e) => setFormArtworkId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:border-vangogh-navy"
                  >
                    {artworks.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.title} ({a.artistName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-vangogh-charcoal/70 mb-1 font-medium">거주 지역 (예: 서울 성수동)</label>
                  <input 
                    type="text" 
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    required
                    placeholder="예: 서울 마포구"
                    className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:border-vangogh-navy"
                  />
                </div>
              </div>

              <div className="text-xs space-y-1">
                <label className="block text-vangogh-charcoal/70 font-medium">한 줄 제목</label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  placeholder="예: 서재 책상 벽면에 걸어두니 공간의 분위기가 달라졌습니다"
                  className="w-full px-3.5 py-2 border rounded-lg bg-white focus:outline-none focus:border-vangogh-navy text-xs"
                />
              </div>

              <div className="text-xs space-y-1">
                <label className="block text-vangogh-charcoal/70 font-medium">공간 연출 소감 및 작가 응원 메시지</label>
                <textarea 
                  rows={4}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  required
                  placeholder="실물 액자를 받아보신 느낌, 공간에 걸어둔 후의 일상 변화, 피지 작가님에게 전하고 싶은 말을 솔직하게 적어주세요."
                  className="w-full px-3.5 py-2 border rounded-lg bg-white focus:outline-none focus:border-vangogh-navy text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-vangogh-charcoal/50">
                  <Camera className="w-3.5 h-3.5 text-vangogh-gold" />
                  <span>소장하신 작품의 고해상도 프리뷰가 본문에 자동 연동됩니다.</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteOpen(false)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-vangogh-charcoal/70 hover:bg-vangogh-stone"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-vangogh-navy text-white text-xs font-bold hover:bg-vangogh-blue transition-colors"
                  >
                    공식 소장자 인증으로 등록
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Filter Pills */}
          <div className="flex items-center justify-between gap-2 border-b border-vangogh-charcoal/10 pb-3">
            <div className="flex items-center gap-1.5 bg-vangogh-stone p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'all' 
                    ? 'bg-vangogh-navy text-white font-bold shadow-sm' 
                    : 'text-vangogh-charcoal/70 hover:text-vangogh-charcoal'
                }`}
              >
                전체 이야기 ({posts.length})
              </button>
              <button
                onClick={() => setFilter('art_print')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'art_print' 
                    ? 'bg-vangogh-navy text-white font-bold shadow-sm' 
                    : 'text-vangogh-charcoal/70 hover:text-vangogh-charcoal'
                }`}
              >
                아트 프린팅 후기 ({posts.filter(p => p.purchaseType === 'art_print').length})
              </button>
              <button
                onClick={() => setFilter('original')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'original' 
                    ? 'bg-vangogh-navy text-white font-bold shadow-sm' 
                    : 'text-vangogh-charcoal/70 hover:text-vangogh-charcoal'
                }`}
              >
                원작 1:1 소장 ({posts.filter(p => p.purchaseType === 'original_vault').length})
              </button>
              <button
                onClick={() => setFilter('with_reply')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'with_reply' 
                    ? 'bg-vangogh-navy text-white font-bold shadow-sm' 
                    : 'text-vangogh-charcoal/70 hover:text-vangogh-charcoal'
                }`}
              >
                피지 작가 답글 ({posts.filter(p => !!p.artistReply).length})
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-5">
            {filteredPosts.map((post) => {
              const isLiked = likedPosts[post.id];
              return (
                <article 
                  key={post.id}
                  className="p-5 bg-vangogh-canvas rounded-2xl border border-vangogh-charcoal/10 space-y-4 shadow-xs"
                >
                  {/* Post Top Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-vangogh-charcoal/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        post.purchaseType === 'original_vault'
                          ? 'bg-vangogh-navy text-vangogh-gold'
                          : 'bg-vangogh-gold text-vangogh-navy'
                      }`}>
                        {post.purchaseType === 'original_vault' ? '1:1 원작 독점 소장' : '공식 아트 프린팅 소장'}
                      </span>
                      <span className="font-bold text-xs text-vangogh-navy">
                        {post.authorName} 님
                      </span>
                      <span className="text-[11px] text-vangogh-charcoal/50">({post.authorLocation})</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-green-700 font-semibold bg-green-50 px-1.5 py-0.2 rounded border border-green-200">
                        <CheckCircle2 className="w-3 h-3" />
                        인증 소장자
                      </span>
                    </div>

                    <div className="text-[11px] text-vangogh-charcoal/50 font-mono">
                      {post.createdAt}
                    </div>
                  </div>

                  {/* Artwork Tag & Post Content */}
                  <div className="space-y-2">
                    <div className="text-xs text-vangogh-charcoal/60 flex items-center gap-1.5 font-medium">
                      <span className="text-vangogh-navy font-bold">소장 작품:</span>
                      <span>{post.artworkTitle}</span>
                      <span>·</span>
                      <span>작가 {post.artistName}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-vangogh-navy">
                      {post.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-vangogh-charcoal/80 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {/* Artwork Image & Frame Preview */}
                  {post.roomPhotoUrl && (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-vangogh-charcoal/10 max-w-sm">
                      <img 
                        src={post.roomPhotoUrl} 
                        alt={post.artworkTitle} 
                        className="w-16 h-16 rounded-lg object-cover border border-vangogh-charcoal/10 shrink-0"
                      />
                      <div className="min-w-0 text-xs">
                        <span className="text-[10px] text-vangogh-charcoal/50 block font-medium">실물 액자 패키지</span>
                        <div className="font-bold text-vangogh-navy truncate">{post.artworkTitle}</div>
                        <span className="text-[11px] text-vangogh-gold font-semibold">피지 현지 파트너십 인증 원화</span>
                      </div>
                    </div>
                  )}

                  {/* Artist Direct Reply Sub-card */}
                  {post.artistReply && (
                    <div className="p-4 bg-vangogh-stone/70 rounded-xl border border-vangogh-gold/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-vangogh-navy">
                          <img 
                            src={post.artistReply.artistAvatar} 
                            alt={post.artistReply.artistName}
                            className="w-5 h-5 rounded-full object-cover border border-vangogh-gold/60"
                          />
                          <span>피지 현지 작가의 감사 답글</span>
                          <span className="text-[11px] font-normal text-vangogh-charcoal/60">
                            ({post.artistReply.artistName})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-vangogh-charcoal/50">
                          {post.artistReply.createdAt}
                        </span>
                      </div>
                      <p className="text-vangogh-charcoal/80 italic leading-relaxed pl-7">
                        "{post.artistReply.content}"
                      </p>
                    </div>
                  )}

                  {/* Card Action Footer */}
                  <div className="pt-2 border-t border-vangogh-charcoal/5 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all ${
                        isLiked 
                          ? 'border-red-200 bg-red-50 text-red-600 font-bold' 
                          : 'border-vangogh-charcoal/15 bg-white text-vangogh-charcoal/70 hover:bg-vangogh-stone'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>공감 {post.likes}</span>
                    </button>

                    <span className="text-[11px] text-vangogh-charcoal/40">
                      반 고흐 21 공식 큐레이션 인증 게시물
                    </span>
                  </div>

                </article>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-vangogh-charcoal/10 bg-vangogh-canvas flex items-center justify-between text-xs text-vangogh-charcoal/60">
          <div>
            <span>본 살롱은 실물 아트프린트 및 원작 컬렉터들의 진솔한 감상으로 운영됩니다.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-vangogh-stone text-vangogh-navy font-semibold hover:bg-vangogh-charcoal/10 transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
