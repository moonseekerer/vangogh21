import { Artwork } from '../types';

export const SEASON_INFO = {
  seasonNumber: 1,
  title: "시즌 1 : 태평양의 색채, 피지(Fiji) 신예전",
  subtitle: "남태평양의 햇살과 바다를 캔버스에 담아낸 피지 로컬 청년 아티스트 4인의 원화",
  period: "2026.09.01 ~ 2026.10.31",
  location: "피지 수바(Suva) & 나디(Nadi) 현지 수거 거점",
  totalArtists: 4,
  totalArtworks: 8,
  curator: "반 고흐 21 현지 큐레이션 팀 (피지 지부)",
  settlementRate: {
    artist: 75,
    localArtFund: 10,
    platform: 15,
  }
};

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: "fiji-01",
    title: "태평양의 석양과 밤의 경계",
    artistName: "타니엘라 라부부",
    artistLocalName: "Taniela Lavuvu",
    artistAge: 24,
    location: "피지 수바 (Suva, Fiji)",
    medium: "캔버스에 유채 (Oil on Canvas)",
    dimensions: "80 x 60 cm",
    year: 2026,
    imageUrl: "/artworks/artwork-01.jpg",
    originalPrice: 195000,
    artPrintPrice: 29000,
    isOriginalSold: true,
    originalCollector: "김모두 님",
    curatorNote: "수바 어촌 마을의 일몰 풍경을 담은 유화로, 현지 특유의 짙은 코발트 블루와 오렌지 안료의 질감이 차분하게 드러납니다. 현지 작업실 방문 시 가장 먼저 눈에 띄었던 작품입니다.",
    artistStory: "매일 저녁 바다로 나가는 아버지의 작은 배를 바라보며 그림을 시작했습니다. 수입 물감을 구하기 어려워 현지 흙과 오일을 섞어 독자적인 질감을 연구했습니다. 내 그림이 한국의 어떤 방 한구석에 걸릴 수 있다는 사실이 아직도 꿈만 같습니다.",
    artistQuote: "태평양의 밤은 그저 어둡기만 한 것이 아닙니다. 햇살이 바다 속으로 숨어드는 순간, 세상에서 가장 따뜻한 파란색이 번져납니다.",
    craftProcess: "작가가 수바 로컬 목재소에서 직접 짠 원목 캔버스 틀 위에 3주간의 덧칠 작업을 거쳐 완성되었습니다.",
    storageVault: "피지 수바 로컬 허브 보관 중 (1년 무료 보관)",
    freeStorageDays: 365,
    artistProfile: {
      name: "타니엘라 라부부",
      localName: "Taniela Lavuvu",
      age: 24,
      location: "피지 수바 (Suva, Fiji)",
      avatarUrl: "/artists/artist-01.jpg",
      bio: "피지 남부 수바 외곽의 라미(Lami) 어촌 마을에서 나고 자란 20대 청년 화가입니다. 정규 미술 교육을 받을 기회는 없었으나, 남태평양의 파도와 노을을 관찰하며 독학으로 캔버스 유채 기법을 발전시켰습니다. 서양 미술관의 기준이 아닌 피지 청년의 진짜 시선으로 바다를 그립니다.",
      philosophy: "바다는 우리의 삶이자 식탁이고, 하늘은 매일 저녁 피지의 신들이 펼쳐놓는 가장 거대한 캔버스입니다.",
      instagram: "@taniela_fiji_art",
      website: "https://taniela-lavuvu.art.mock",
      studioLocation: "Lami Coastal Bay Studio, Suva, Fiji",
      exhibitions: [
        "2025 Suva Youth Artists Showcase (피지 국립박물관 야외전시)",
        "2026 Pacific Horizons Emerging Art Collective (로컬 아트 위크)"
      ]
    }
  },
  {
    id: "fiji-02",
    title: "맹그로브 숲의 침묵",
    artistName: "마리카 나이라",
    artistLocalName: "Marika Naira",
    artistAge: 29,
    location: "피지 나디 (Nadi, Fiji)",
    medium: "피지 전통 마시(Masi) 천에 천연 수피 안료 및 아크릴",
    dimensions: "90 x 70 cm",
    year: 2026,
    imageUrl: "/artworks/artwork-02.jpg",
    originalPrice: 280000,
    artPrintPrice: 34000,
    isOriginalSold: false,
    curatorNote: "피지의 고유한 문화 유산인 뽕나무 껍질 천(Masi) 위에 기후변화로 사라져가는 맹그로브를 은유적으로 표현한 시그니처 대작입니다. 원작 소장자는 유일무이한 원화를, 아트 프린트 주문자는 파인아트 텍스처를 그대로 소장하실 수 있습니다.",
    artistStory: "어린 시절 뛰어놀던 나디 해안의 맹그로브 숲이 매년 해수면 상승으로 잠기는 것을 보며 붓을 들었습니다. 캔버스 대신 할머니에게 배운 전통 수피 천(Masi)을 직접 두드려 펴서 베이스를 만들었습니다.",
    artistQuote: "뿌리를 깊게 내린 맹그로브는 태풍으로부터 우리 섬을 지켜주는 방패입니다. 제 그림이 바다 너머 사람들에게 작은 경각심과 위로가 되길 바랍니다.",
    craftProcess: "전통 방식 그대로 나무 껍질을 돌로 수백 번 두드려 만든 천연 섬유질 원단에 작업했습니다.",
    storageVault: "피지 나디 파트너 센터 보관 중 (1년 무료 보관)",
    freeStorageDays: 365,
    artistProfile: {
      name: "마리카 나이라",
      localName: "Marika Naira",
      age: 29,
      location: "피지 나디 (Nadi, Fiji)",
      avatarUrl: "/artists/artist-02.jpg",
      bio: "피지 서부 나디 지역에서 활동하는 현대 미술가이자 전통 직조 연구가입니다. 태평양 전통 수피 직조인 마시(Masi) 제작 기술을 전수받아 현대적인 조형 언어와 결합하는 독창적인 작업을 지속하고 있습니다. 기후위기로 변화하는 피지 생태계를 화폭에 기록합니다.",
      philosophy: "자연에서 얻은 재료로 자연의 목소리를 기록할 때, 예술은 가장 강력한 치유와 보존의 힘을 가집니다.",
      instagram: "@marika_masi_fiji",
      website: "https://marika-naira.art.mock",
      studioLocation: "Nadi River Artisan Workshop, Viti Levu, Fiji",
      exhibitions: [
        "2024 Viti Heritage & Modernity (나디 로컬 아트센터)",
        "2025 Climate Voices Oceania (남태평양 기후예술 특별전)"
      ]
    }
  },
  {
    id: "fiji-03",
    title: "산호초와 햇살의 노래",
    artistName: "아테카 시바",
    artistLocalName: "Ateca Civa",
    artistAge: 22,
    location: "피지 바누아레부 (Vanua Levu, Fiji)",
    medium: "린넨에 유채 (Oil on Linen)",
    dimensions: "65 x 50 cm",
    year: 2026,
    imageUrl: "/artworks/artwork-03.jpg",
    originalPrice: 165000,
    artPrintPrice: 28000,
    isOriginalSold: false,
    curatorNote: "바누아레부 섬의 청년 여성 작가 아테카의 활기찬 붓 터치가 인상적인 작품입니다. 청량한 터콰이즈 그린과 분홍빛 산호의 대비가 공간의 분위기를 화사하게 바꿉니다.",
    artistStory: "바누아레부 섬에는 미술대학이 없습니다. 하지만 바다와 정글 자체가 저의 가장 위대한 스승이었습니다. 관광객 기념품점에서 파는 조잡한 그림이 아닌, 내 진짜 감정을 담은 예술을 세상에 보여주고 싶었습니다.",
    artistQuote: "산호초가 부르는 노랫소리를 들어본 적이 있나요? 파도가 스칠 때마다 바다는 분홍빛과 녹색으로 노래합니다.",
    craftProcess: "자연 건조시킨 고급 린넨 천에 얇은 유채 물감을 수차례 덧발라 은은한 투명도를 연출했습니다.",
    storageVault: "피지 수바 로컬 허브 보관 중 (1년 무료 보관)",
    freeStorageDays: 365,
    artistProfile: {
      name: "아테카 시바",
      localName: "Ateca Civa",
      age: 22,
      location: "피지 바누아레부 (Vanua Levu, Fiji)",
      avatarUrl: "/artists/artist-03.jpg",
      bio: "바누아레부 북부 사부사부(Savusavu) 마을 출신의 차세대 여성 화가입니다. 투명한 바다빛과 살아 숨 쉬는 산호초를 감각적인 색채로 포착하며, 섬마을 아이들에게 무료 미술 수업을 진행하는 로컬 커뮤니티 리더로도 활동하고 있습니다.",
      philosophy: "햇빛이 투과된 바닷물 속 산호는 세상에서 가장 솔직하고 따뜻한 색을 보여줍니다.",
      instagram: "@ateca_coral_arts",
      website: "https://ateca-civa.art.mock",
      studioLocation: "Savusavu Bayside Studio, Vanua Levu, Fiji",
      exhibitions: [
        "2025 Savusavu Youth Art Fair (사부사부 문화회관)",
        "2026 Women of Pacific Canvas (태평양 여성 작가 연합전)"
      ]
    }
  },
  {
    id: "fiji-04",
    title: "붉은 대지와 파초 잎의 휴식",
    artistName: "빌리아메 코로",
    artistLocalName: "Viliame Koro",
    artistAge: 31,
    location: "피지 시가토카 (Sigatoka, Fiji)",
    medium: "거친 캔버스에 오일 파스텔 및 템페라",
    dimensions: "100 x 80 cm",
    year: 2026,
    imageUrl: "/artworks/artwork-04.jpg",
    originalPrice: 320000,
    artPrintPrice: 32000,
    isOriginalSold: false,
    curatorNote: "피지 농촌의 붉은 황토 흙을 직접 안료로 개어 사용한 작품입니다. 묵직하고 원초적인 생명력이 느껴지는 걸작으로, 공간에 깊은 안정감을 선사합니다.",
    artistStory: "농사일로 거칠어진 손이지만 붓을 잡을 때만큼은 온 세상이 고요해집니다. 시가토카 계곡의 비옥한 붉은 흙은 우리 선조들의 피와 땀입니다. 이 땅의 온기를 캔버스에 온전히 담고자 했습니다.",
    artistQuote: "가장 소박한 일상의 그늘 속에서 인간은 진짜 평화를 배웁니다. 파초 잎이 만들어준 작은 그늘이 바로 저의 피난처입니다.",
    craftProcess: "시가토카 현지 황토 점토를 체로 걸러 달걀노른자와 혼합한 고대 템페라 기법을 현대적으로 재해석했습니다.",
    storageVault: "피지 수바 로컬 허브 보관 중 (1년 무료 보관)",
    freeStorageDays: 365,
    artistProfile: {
      name: "빌리아메 코로",
      localName: "Viliame Koro",
      age: 31,
      location: "피지 시가토카 (Sigatoka, Fiji)",
      avatarUrl: "/artists/artist-04.jpg",
      bio: "시가토카 계곡에서 농업과 회화 작업을 병행하는 대지 미술가입니다. 피지의 비옥한 적토와 식물성 염료를 물감으로 재탄생시키는 천연 안료 연구가로서, 피지 농촌 공동체의 일상과 자연에 대한 경외를 묵직한 유화 질감으로 표현합니다.",
      philosophy: "흙과 땀을 잊은 예술은 공허합니다. 대지에 발을 딛고 서서 그릴 때 비로소 진실한 색이 나옵니다.",
      instagram: "@viliame_earth_fiji",
      website: "https://viliame-koro.art.mock",
      studioLocation: "Sigatoka Valley Clay Atelier, Fiji",
      exhibitions: [
        "2024 Sigatoka Earth & Roots (시가토카 농업문화전)",
        "2025 Fiji Indigenous Creative Guild Annual (피지 창작연대 연례전)"
      ]
    }
  }
];
