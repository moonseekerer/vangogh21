import { VirtualExhibition, HistoricalExhibition } from '../types';

export const VIRTUAL_EXHIBITIONS: VirtualExhibition[] = [
  {
    id: 'theme-night',
    titleKo: '밤의 서정 : 어둠 속에서 타오르는 빛',
    titleEn: 'Poetics of the Night: Light Burning in the Dark',
    subtitle: '론강의 물결에서 생레미의 새벽하늘까지, 고흐가 탐닉한 밤의 황홀경',
    theme: '밤 풍경 & 별빛',
    curatorNote: '고흐에게 밤은 단순한 빛의 부재가 아니었습니다. 그는 검은색을 배제하고 코발트블루, 프러시안블루, 보라색과 눈부신 황금빛을 대비시켜 낮보다 훨씬 풍부하고 감성적인 밤의 생명력을 포착했습니다. 생레미의 새벽하늘을 담은 <별이 빛나는 밤>과 아를의 가스등을 비춘 <론강의 별이 빛나는 밤>, <밤의 카페 테라스>를 함께 조망합니다.',
    artworkIds: ['Q45585', 'Q1464531', 'Q1025704'],
    coverImageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=1200'
  },
  {
    id: 'theme-sun-yellow',
    titleKo: '노란색과 아를의 태양 : 남프랑스의 색채 폭발',
    titleEn: 'The Yellow of Arles: Explosion of Mediterranean Light',
    subtitle: '고갱과의 화합을 꿈꾸며 노란 집에서 쏟아낸 생명력의 절정',
    theme: '남프랑스 & 색채 연구',
    curatorNote: '1888년 2월, 파리의 회색빛 하늘을 떠나 남프랑스 아를에 도착한 고흐는 눈부신 지중해 햇살에 매료되었습니다. 그는 노란색을 희망, 따뜻함, 우정의 상징으로 여겼으며, 노란 집 2층에서 친구들을 맞이하기 위해 벽을 장식할 열두 점 이상의 <해바라기> 연작과 자신의 방을 그린 <아를의 침실>을 쉬지 않고 그려냈습니다.',
    artworkIds: ['Q21948567', 'Q18713070', 'Q2200610'],
    coverImageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vincent_Willem_van_Gogh_127.jpg?width=1200'
  },
  {
    id: 'theme-earth-labor',
    titleKo: '대지와 땀 : 초기 네덜란드의 노동 찬가',
    titleEn: 'Earth and Labor: Early Netherlands Tributes to Workers',
    subtitle: '밀레의 정신을 이어받아 흙과 땀에 젖은 농민과 직조공의 삶을 기록하다',
    theme: '농민화 & 사실주의',
    curatorNote: '화가의 길로 들어선 고흐의 초기 5년은 네덜란드의 탄광촌 보리나주와 뉘넌에서 흘린 땀방울이었습니다. 그는 아카데믹한 우아함 대신 거친 손, 주름진 이마, 흙먼지 묻은 투박한 옷을 있는 그대로 그렸습니다. 최초의 걸작 <감자 먹는 사람들>은 불빛 하나에 의지해 정직하게 수확한 감자를 나누는 노동자들에 대한 숭고한 헌사입니다.',
    artworkIds: ['Q154469', 'Q19833792', 'Q6485129'],
    coverImageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vincent_Van_Gogh_-_The_Potato_Eaters.png?width=1200'
  },
  {
    id: 'theme-self-portraits',
    titleKo: '응시하는 영혼 : 자화상으로 읽는 고흐의 내면',
    titleEn: 'The Piercing Gaze: Inner Life Through Self-Portraits',
    subtitle: '모델을 구할 돈이 없어 스스로를 거울에 비춘 35점 이상의 내면 기록',
    theme: '자화상 연작',
    curatorNote: '고흐는 1886년부터 1889년 사이 파리와 아를, 생레미에서 35점이 넘는 자화상을 남겼습니다. 가난하여 모델을 고용할 수 없었던 현실적 이유도 있었지만, 거울 속 자신을 끝없이 응시하며 화가로서의 정체성과 불안정한 정신세계를 탐구한 실존적 기록이기도 합니다. 귀에 붕대를 감은 자화상에서 그는 고통 속에서도 화가의 도구를 놓지 않는 의지를 드러냅니다.',
    artworkIds: ['Q19363211', 'Q3630735', 'Q18238237'],
    coverImageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vincent_van_Gogh_-_Self-Portrait_with_Bandaged_Ear_-_Google_Art_Project.jpg?width=1200'
  },
  {
    id: 'theme-auvers-finale',
    titleKo: '오베르의 마지막 불꽃 : 비극과 숭고의 종막',
    titleEn: 'The Final Spark at Auvers: Tragedy and Transcendence',
    subtitle: '생애 마지막 70일, 하루 한 점씩 쏟아낸 마지막 예술적 열정',
    theme: '오베르 쉬르 우아즈',
    curatorNote: '1890년 5월, 생레미 요양원을 퇴원한 고흐는 파리 북쪽의 고즈넉한 마을 오베르 쉬르 우아즈에 머물렀습니다. 가셰 박사의 치료를 받으며 평온을 찾는 듯했으나, 그는 70일 동안 무려 70여 점의 유화를 쏟아내는 광기 어린 작업을 이어갔습니다. 물결치는 교회의 외벽과 폭풍우 전야의 황금빛 밀밭 위를 나는 까마귀는 그의 마지막 심경을 전합니다.',
    artworkIds: ['Q634122', 'Q1213917', 'Q843044'],
    coverImageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg?width=1200'
  }
];

export const HISTORICAL_EXHIBITIONS: HistoricalExhibition[] = [
  {
    year: '1890년 3월',
    title: '제6회 파리 앙데팡당전',
    venue: '파리 앙데팡당 살롱',
    location: '프랑스 파리',
    significance: '생전 가장 큰 호평을 받은 전시로 <붉은 포도밭> 등이 출품되었습니다. 모네의 찬사와 비평가 알베르 오리에의 평론 "고립된 자들: 빈센트 반 고흐"가 발표된 계기였습니다.'
  },
  {
    year: '1890년 1월',
    title: '제7회 20인회 연례전',
    venue: '브뤼셀 벨기에 왕립 미술관',
    location: '벨기에 브뤼셀',
    significance: '브뤼셀 전위 예술가 모임 20인회(Les XX)의 초청으로 6점이 전시되었으며, 화가 안나 보쉬가 <붉은 포도밭>을 400프랑에 구입하여 생전 판매된 공식 유화로 기록되었습니다.'
  },
  {
    year: '1901년 3월',
    title: '파리 베른하임 쥔 갤러리 회고전',
    venue: 'Galerie Bernheim-Jeune',
    location: '프랑스 파리',
    significance: '고흐 사후 11년 만에 열린 유화 71점 규모의 대규모 회고전이었습니다. 당시 앙리 마티스와 앙드레 드랭이 이 전시를 관람한 뒤 강렬한 원색 대비를 탐구하며 야수파 운동의 기틀을 마련했습니다.'
  },
  {
    year: '1905년 7월',
    title: '암스테르담 시립미술관 대규모 회고전',
    venue: 'Stedelijk Museum Amsterdam',
    location: '네덜란드 암스테르담',
    significance: '테오의 아내 요한나 반 고흐 봉허의 체계적인 아카이빙으로 성사된 474점 규모의 역대 최대 회고전이었습니다. 유럽 미술계 전반에서 고흐의 위상이 확립된 분기점입니다.'
  },
  {
    year: '1913년 2월',
    title: '뉴욕 아모리 쇼',
    venue: '69연대 무기고 병기창',
    location: '미국 뉴욕',
    significance: '미국 대륙에 유럽 현대 미술을 본격 소개한 전시였습니다. 고흐의 유화와 드로잉이 미국 주요 소장가와 공공 미술관에 영구 소장되는 계기가 되었습니다.'
  },
  {
    year: '1973년 6월',
    title: '암스테르담 국립 반 고흐 미술관 개관',
    venue: 'Van Gogh Museum',
    location: '네덜란드 암스테르담',
    significance: '네덜란드 정부와 반 고흐 가문의 기증을 통해 게릿 리트펠트가 설계한 전용 미술관 개관. 고흐의 유화 200여 점과 드로잉 500여 점이 영구 보존 전시되기 시작했습니다.'
  }
];
