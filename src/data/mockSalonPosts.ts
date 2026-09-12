export interface SalonPost {
  id: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  purchaseType: 'original_vault' | 'art_print';
  authorName: string;
  authorLocation: string;
  createdAt: string;
  title: string;
  content: string;
  roomPhotoUrl?: string;
  likes: number;
  isVerifiedOwner: boolean;
  artistReply?: {
    artistName: string;
    artistAvatar: string;
    content: string;
    createdAt: string;
  };
}

export const INITIAL_SALON_POSTS: SalonPost[] = [
  {
    id: "post-01",
    artworkId: "fiji-01",
    artworkTitle: "태평양의 석양과 밤의 경계",
    artistName: "타니엘라 라부부",
    purchaseType: "original_vault",
    authorName: "김모두",
    authorLocation: "서울 성수동",
    createdAt: "2026-09-12",
    title: "피지 현지 유채 물감의 두터운 질감이 공간을 채워줍니다",
    content: "타니엘라 작가님의 1호 원작을 소장하게 되어 영광입니다. 거실 소파 벽면에 거치했는데, 석양이 바다로 스며드는 짙은 코발트 블루와 황금빛 오렌지가 퇴근 후 공간 분위기를 온화하게 감싸줍니다. 수입 물감 대신 현지 흙과 오일을 섞어 연구했다는 질감이 눈앞에서 생생히 전해집니다. 작가님께 지속적인 창작 지원금이 전달된다니 컬렉터로서 큰 보람을 느낍니다.",
    roomPhotoUrl: "./artworks/artwork-01.jpg",
    likes: 24,
    isVerifiedOwner: true,
    artistReply: {
      artistName: "타니엘라 라부부 (피지 수바)",
      artistAvatar: "./artists/artist-01.jpg",
      content: "Vinaka vakalevu(피지어로 대단히 감사합니다)! 한국의 멋진 공간에 제 그림이 걸려 있는 모습을 상상하니 눈물이 날 만큼 벅찹니다. 아버지가 계신 수바 앞바다의 노을을 기억하며 앞으로도 진실한 그림을 계속 그리겠습니다.",
      createdAt: "2026-09-12"
    }
  },
  {
    id: "post-02",
    artworkId: "fiji-02",
    artworkTitle: "맹그로브 숲의 침묵",
    artistName: "마리카 나이라",
    purchaseType: "art_print",
    authorName: "이서윤",
    authorLocation: "경기 성남시",
    createdAt: "2026-09-11",
    title: "파인아트 캔버스 인쇄 퀄리티와 원목 액자 마감이 기대 이상입니다",
    content: "원작은 소장 경쟁이 치열해 아트프린트로 주문했는데 결과물이 대만족입니다. 일반 매끈한 포스터 인쇄가 아니라 고급 캔버스 원단 특유의 결이 살아있어 멀리서 보면 원화와 구분이 어려울 정도입니다. 함께 동봉된 에디션 인증 카드와 작가 스토리북도 서재 책상에 함께 배치했습니다.",
    roomPhotoUrl: "./artworks/artwork-02.jpg",
    likes: 18,
    isVerifiedOwner: true
  },
  {
    id: "post-03",
    artworkId: "fiji-03",
    artworkTitle: "산호초와 햇살의 노래",
    artistName: "아테카 시바",
    purchaseType: "art_print",
    authorName: "정동우",
    authorLocation: "인천 송도",
    createdAt: "2026-09-10",
    title: "신혼집 다이닝 공간에 걸었습니다. 산뜻한 바다빛이 매력적입니다",
    content: "바누아레부 섬에서 아이들을 가르치며 그림을 그리는 22세 아테카 작가님의 스토리를 읽고 아트프린트를 신청했습니다. 터콰이즈 그린과 산호빛 분홍색이 식탁 벽면과 너무 잘 어울립니다. 집에 놀러오는 손님들마다 어디서 산 그림이냐고 물어보네요.",
    roomPhotoUrl: "./artworks/artwork-03.jpg",
    likes: 15,
    isVerifiedOwner: true,
    artistReply: {
      artistName: "아테카 시바 (피지 바누아레부)",
      artistAvatar: "./artists/artist-03.jpg",
      content: "제 그림을 가족의 소중한 식사 공간에 걸어주셔서 감사합니다. 바다의 산호초가 전하는 따뜻한 노랫소리가 매일의 일상에 잔잔한 기쁨이 되길 기원합니다.",
      createdAt: "2026-09-11"
    }
  },
  {
    id: "post-04",
    artworkId: "fiji-04",
    artworkTitle: "붉은 대지와 파초 잎의 휴식",
    artistName: "빌리아메 코로",
    purchaseType: "art_print",
    authorName: "최은지",
    authorLocation: "부산 해운대구",
    createdAt: "2026-09-09",
    title: "시가토카 계곡의 붉은 흙 안료가 주는 묵직한 안정감",
    content: "농업과 예술을 병행하며 고대 템페라 기법을 재해석했다는 빌리아메 작가님의 태도에 깊은 인상을 받았습니다. 프레임 마감이 정교하고 흙빛의 깊은 질감이 침실 헤드보드 위에 차분한 휴식을 선사합니다. 정기 시즌마다 한 점씩 모으고 싶습니다.",
    roomPhotoUrl: "./artworks/artwork-04.jpg",
    likes: 12,
    isVerifiedOwner: true
  }
];
