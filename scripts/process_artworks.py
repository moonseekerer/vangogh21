import json
import os

with open('src/archive/data/raw_artworks.json', encoding='utf-8') as f:
    raw_list = json.load(f)

MASTERPIECES = {
    # Starry Night
    "Q1511": {
        "titleKo": "별이 빛나는 밤",
        "genre": "풍경화",
        "medium": "유화",
        "dimensions": "73.7 cm × 92.1 cm",
        "creationLocation": "생레미 드 프로방스",
        "colorMood": "blue",
        "dominantColors": ["#1E3A8A", "#172554", "#FACC15", "#3B82F6", "#042F2E"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Saint-Paul-de-Mausole_Saint-R%C3%A9my-de-Provence.jpg/800px-Saint-Paul-de-Mausole_Saint-R%C3%A9my-de-Provence.jpg",
        "realSiteDescription": "생레미 드 프로방스 생폴 드 모졸(Saint-Paul-de-Mausole) 수도원 요양원. 고흐가 머물던 2층 병실 창문 너머로 알피유 산맥과 올리브 나무숲이 펼쳐져 있으며, 고흐는 쇠창살 너머 새벽하늘을 바라보며 이 그림을 완성했습니다.",
        "description": "생레미 요양원 창밖으로 보이는 새벽하늘의 소용돌이치는 별과 달, 거대한 사이프러스 나무를 통해 불안과 영적 갈망을 표현한 고흐의 불멸의 걸작입니다.",
        "letterQuote": {
            "recipient": "테오 반 고흐",
            "date": "1889년 6월 2일",
            "textKo": "오늘 아침 해가 뜨기 전 나는 창문을 통해 오랫동안 시골을 바라보았다. 하늘에는 모닝스타 외에는 아무것도 없었는데, 그 별은 무척이나 커 보였다.",
            "letterNo": "Letter 777"
        },
        "curationTags": ["밤의 서정", "생레미의 소용돌이", "대표 걸작"]
    },
    # Sunflowers
    "Q170254": {
        "titleKo": "해바라기 (열다섯 송이)",
        "genre": "정물화",
        "medium": "유화",
        "dimensions": "92.1 cm × 73 cm",
        "creationLocation": "아를",
        "colorMood": "yellow",
        "dominantColors": ["#EAB308", "#CA8A04", "#FEF08A", "#854D0E", "#A16207"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/The_Yellow_House_%28original_photo%29.jpg/800px-The_Yellow_House_%28original_photo%29.jpg",
        "realSiteDescription": "아를 라마르틴 광장 2번지의 '노란 집(Maison Jaune)'. 고흐가 고갱과 함께 거주하며 남프랑스 예술가 공동체를 꿈꾸었던 아틀리에로, 고흐는 고갱의 침실 벽면을 장식하기 위해 해바라기 연작을 집중적으로 그렸습니다.",
        "description": "노란 집에서 고갱을 맞이하기 위해 아를의 눈부신 태양 빛을 온전히 담아낸 연작 중 가장 대표적인 작품입니다. 노란색의 무수한 변주를 보여줍니다.",
        "letterQuote": {
            "recipient": "테오 반 고흐",
            "date": "1888년 8월",
            "textKo": "나는 지금 마르세유 사람이 부야베스를 먹는 열정으로 그림을 그리고 있다. 해바라기를 그리고 있기 때문이라면 너도 놀라지 않겠지.",
            "letterNo": "Letter 666"
        },
        "curationTags": ["노란색과 아를의 태양", "정물의 미학", "대표 걸작"]
    },
    # Café Terrace at Night
    "Q475653": {
        "titleKo": "밤의 카페 테라스",
        "genre": "풍경화",
        "medium": "유화",
        "dimensions": "80.7 cm × 65.3 cm",
        "creationLocation": "아를",
        "colorMood": "yellow",
        "dominantColors": ["#F59E0B", "#1E3A8A", "#1E293B", "#FDE047", "#0F172A"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Cafe_Van_Gogh_Arles.jpg/800px-Cafe_Van_Gogh_Arles.jpg",
        "realSiteDescription": "프랑스 아를 포럼 광장(Place du Forum)의 카페 테라스. 현재는 '카페 반 고흐(Café Van Gogh)'라는 이름으로 그림 속 노란 외벽 차양을 그대로 복원하여 전 세계 관광객들이 방문하는 명소가 되었습니다.",
        "description": "검은색을 전혀 쓰지 않고 오직 짙은 푸른색과 보라색, 타오르는 가스등의 노란빛만으로 아를 포럼 광장의 황홀한 밤을 묘사했습니다.",
        "letterQuote": {
            "recipient": "여동생 빌레미나",
            "date": "1888년 9월 9일",
            "textKo": "검은색을 전혀 쓰지 않고 푸른색과 보라색, 초록색만으로 밤을 그리는 일은 나를 엄청나게 매료시킨다. 밤은 낮보다 훨씬 더 풍부한 색채를 지니고 있어.",
            "letterNo": "Letter 678"
        },
        "curationTags": ["밤의 서정", "노란색과 아를의 태양", "대표 걸작"]
    },
    # Bedroom in Arles
    "Q470877": {
        "titleKo": "아를의 침실",
        "genre": "풍경화",
        "medium": "유화",
        "dimensions": "72 cm × 90 cm",
        "creationLocation": "아를",
        "colorMood": "blue",
        "dominantColors": ["#3B82F6", "#EAB308", "#EF4444", "#84CC16", "#F3F4F6"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/The_Yellow_House_%28original_photo%29.jpg/800px-The_Yellow_House_%28original_photo%29.jpg",
        "realSiteDescription": "아를 노란 집 2층의 방. 고흐는 가구와 침대의 나무 질감, 라일락색 벽면, 붉은색 침대보를 통해 단순하고 안정감 있는 휴식의 분위기를 연출했습니다.",
        "description": "아를 '노란 집' 2층의 자신의 침실을 그린 그림으로, 단순하고 강렬한 색채 배치를 통해 완벽한 휴식과 안식을 표현하고자 했습니다.",
        "letterQuote": {
            "recipient": "테오 반 고흐",
            "date": "1888년 10월 16일",
            "textKo": "이 방의 색채가 모든 것을 지배해야 한다. 단순화된 색채를 통해 사물에 더 큰 스타일을 부여하고, 전반적인 휴식이나 잠을 암시해야 해.",
            "letterNo": "Letter 705"
        },
        "curationTags": ["노란색과 아를의 태양", "내면의 공간", "대표 걸작"]
    },
    # The Potato Eaters
    "Q154469": {
        "titleKo": "감자 먹는 사람들",
        "genre": "인물·농민화",
        "medium": "유화",
        "dimensions": "82 cm × 114 cm",
        "creationLocation": "뉘넌",
        "colorMood": "brown",
        "dominantColors": ["#451A03", "#78350F", "#1C1917", "#B45309", "#292524"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Nuenen_Gerwenseweg_4_Van_Gogh_Kerkje.jpg/800px-Nuenen_Gerwenseweg_4_Van_Gogh_Kerkje.jpg",
        "realSiteDescription": "네덜란드 브라반트주 뉘넌(Nuenen)의 드 흐로트(De Groot) 가문 농가. 고흐는 흙 묻은 감자 껍질을 벗기지 않은 듯한 묵직한 흙빛 톤으로 수공 노동의 신성함을 기록했습니다.",
        "description": "초기 네덜란드 시절 고흐의 최초의 대작으로, 등불 아래 거친 손으로 수확한 감자를 나누는 농민들의 정직한 노동과 삶의 숭고함을 흙빛 톤으로 담았습니다.",
        "letterQuote": {
            "recipient": "테오 반 고흐",
            "date": "1885년 4월 30일",
            "textKo": "작은 등불 밑에서 감자를 먹고 있는 이 사람들이 바로 그 손으로 흙을 파헤쳤다는 사실을 명백히 보여주고 싶었다. 이것이 수공 노동에 대한 진정한 찬사다.",
            "letterNo": "Letter 497"
        },
        "curationTags": ["대지와 노동", "초기 네덜란드", "대표 걸작"]
    },
    # Starry Night Over the Rhône
    "Q600494": {
        "titleKo": "론강의 별이 빛나는 밤",
        "genre": "풍경화",
        "medium": "유화",
        "dimensions": "72.5 cm × 92 cm",
        "creationLocation": "아를",
        "colorMood": "blue",
        "dominantColors": ["#0369A1", "#075985", "#FDE047", "#1E293B", "#0C4A6E"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Arles_Rhone_River_Quai.jpg/800px-Arles_Rhone_River_Quai.jpg",
        "realSiteDescription": "아를 론강 동쪽 부두(Quai du 6 Septembre). 고흐의 노란 집에서 도보로 2분 거리에 위치한 곳으로, 가스등 불빛이 물결에 비치며 밤하늘 북두칠성이 밝게 빛나던 실제 강변 풍경입니다.",
        "description": "론강 수면에 반사되는 아를 시가지의 가스등 빛과 밤하늘 북두칠성의 반짝임을 서정적으로 포착한 야상곡 같은 걸작입니다.",
        "letterQuote": {
            "recipient": "테오 반 고흐",
            "date": "1888년 9월 28일",
            "textKo": "하늘은 남색이고 물은 짙은 청색이다. 가스등의 노란 불빛이 물결 위에 긴 금빛 줄기를 드리우고, 북두칠성이 영롱하게 빛나고 있다.",
            "letterNo": "Letter 691"
        },
        "curationTags": ["밤의 서정", "노란색과 아를의 태양", "대표 걸작"]
    },
    # The Church at Auvers
    "Q158223": {
        "titleKo": "오베르의 교회",
        "genre": "풍경화",
        "medium": "유화",
        "dimensions": "94 cm × 74 cm",
        "creationLocation": "오베르 쉬르 우아즈",
        "colorMood": "blue",
        "dominantColors": ["#1D4ED8", "#1E3A8A", "#854D0E", "#15803D", "#94A3B8"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Auvers-sur-Oise_%C3%89glise_Notre-Dame_01.jpg/800px-Auvers-sur-Oise_%C3%89glise_Notre-Dame_01.jpg",
        "realSiteDescription": "오베르 쉬르 우아즈의 13세기 고딕 양식 성모 승천 교회(Église Notre-Dame-de-l'Assomption). 고흐는 실제 건물의 곧은 수직선 대신 살아 숨 쉬듯 파도치는 곡선과 짙은 코발트블루로 재창조했습니다.",
        "description": "고딕 양식의 고요한 교회가 살아 숨 쉬듯 꿈틀거리는 곡선과 짙은 코발트블루의 하늘로 재해석된 오베르 시기의 걸작입니다.",
        "letterQuote": {
            "recipient": "여동생 빌레미나",
            "date": "1890년 6월 5일",
            "textKo": "단순하고 짙은 코발트블루 하늘을 배경으로 교회의 건물이 서 있는 그림을 그렸다. 색채가 더욱 풍부하고 강렬해졌다.",
            "letterNo": "Letter 879"
        },
        "curationTags": ["마지막 불꽃 오베르", "대표 걸작"]
    },
    # Wheatfield with Crows
    "Q472140": {
        "titleKo": "까마귀가 나는 밀밭",
        "genre": "풍경화",
        "medium": "유화",
        "dimensions": "50.5 cm × 103 cm",
        "creationLocation": "오베르 쉬르 우아즈",
        "colorMood": "yellow",
        "dominantColors": ["#EAB308", "#1E3A8A", "#0F172A", "#15803D", "#B45309"],
        "realSitePhotoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Plaine_d%27Auvers_sur_Oise.jpg/800px-Plaine_d%27Auvers_sur_Oise.jpg",
        "realSiteDescription": "오베르 쉬르 우아즈 고원 평야(Plaine d'Auvers). 빈센트와 테오 형제가 나란히 잠든 오베르 시립 묘지 바로 위쪽으로 끝없이 펼쳐진 밀밭 고원으로, 고흐가 생애 마지막 순간까지 서성였던 실제 언덕입니다.",
        "description": "생애 마지막 달에 그려진 작품 중 하나로, 폭풍우가 몰아치는 검푸른 하늘 아래 세 갈래 길과 황금빛 밀밭 위를 날아오르는 까마귀 떼를 통해 극한의 고독과 슬픔을 담았습니다.",
        "letterQuote": {
            "recipient": "테오 반 고흐",
            "date": "1890년 7월 10일",
            "textKo": "험악한 하늘 아래 끝없이 펼쳐진 밀밭을 그렸다. 극도의 슬픔과 고독을 표현하기 위해 굳이 애쓸 필요조차 없었다.",
            "letterNo": "Letter 898"
        },
        "curationTags": ["마지막 불꽃 오베르", "비극과 숭고", "대표 걸작"]
    }
}

PERIOD_COORDS = {
    'netherlands': {'name': '초기 네덜란드 (쥔던트·헤이그·뉘넌)', 'location': '뉘넌', 'lat': 51.4756, 'lng': 5.5511},
    'paris': {'name': '파리 시기', 'location': '파리 (몽마르트르)', 'lat': 48.8867, 'lng': 2.3431},
    'arles': {'name': '아를 시기', 'location': '아를', 'lat': 43.6766, 'lng': 4.6278},
    'saint-remy': {'name': '생레미 시기', 'location': '생레미 드 프로방스', 'lat': 43.7895, 'lng': 4.8317},
    'auvers': {'name': '오베르 쉬르 우아즈', 'location': '오베르 쉬르 우아즈', 'lat': 49.0716, 'lng': 2.1713}
}

def determine_period(year):
    if not year or year <= 1885:
        return 'netherlands'
    elif year in [1886, 1887]:
        return 'paris'
    elif year == 1888:
        return 'arles'
    elif year == 1889:
        return 'saint-remy'
    else:
        return 'auvers'

def determine_genre(genre_raw, title):
    t = (title or '').lower()
    g = (genre_raw or '').lower()
    if 'self-portrait' in t or 'portrait' in t or '자화상' in t:
        if 'self' in t or '자화상' in t:
            return '자화상'
        return '인물·농민화'
    if 'still life' in t or 'flowers' in t or 'sunflowers' in t or 'vase' in t or '정물' in t:
        return '정물화'
    if 'landscape' in g or 'field' in t or 'night' in t or 'tree' in t or 'garden' in t or 'view' in t or 'street' in t or 'river' in t or 'house' in t:
        return '풍경화'
    if 'peasant' in t or 'woman' in t or 'man' in t or 'eaters' in t:
        return '인물·농민화'
    return '풍경화'

def determine_color_mood(title, period):
    t = (title or '').lower()
    if 'sun' in t or 'yellow' in t or 'cafe' in t or 'wheat' in t or 'straw' in t:
        return 'yellow'
    if 'night' in t or 'starry' in t or 'rhone' in t or 'sea' in t or 'iris' in t or 'church' in t:
        return 'blue'
    if 'potato' in t or 'weaver' in t or 'earth' in t or 'peasant' in t or period == 'netherlands':
        return 'brown'
    if 'olive' in t or 'cypress' in t or 'garden' in t or 'meadow' in t or 'orchard' in t:
        return 'green'
    return 'yellow'

processed_artworks = []

for item in raw_list:
    item_id = item["id"]
    year = item.get("year")
    period = determine_period(year)
    period_info = PERIOD_COORDS[period]
    
    title_en = item.get("titleEn") or "Untitled Artwork"
    title_ko = item.get("titleKo") or title_en
    
    genre = determine_genre(item.get("genre"), title_en)
    medium = "유화"
    if "drawing" in title_en.lower() or "sketch" in title_en.lower():
        medium = "소묘·드로잉"
    elif "watercolour" in title_en.lower() or "watercolor" in title_en.lower():
        medium = "수채화"
        
    color_mood = determine_color_mood(title_en, period)

    artwork = {
        "id": item_id,
        "titleKo": title_ko,
        "titleEn": title_en,
        "year": year,
        "period": period,
        "periodLabel": period_info["name"],
        "medium": medium,
        "genre": genre,
        "dimensions": "캔버스에 유채",
        "collection": item.get("collection") or "개인 소장 또는 미상",
        "collectionCity": "",
        "collectionCountry": "",
        "lat": item.get("lat"),
        "lng": item.get("lng"),
        "creationLocation": period_info["location"],
        "creationLat": period_info["lat"],
        "creationLng": period_info["lng"],
        "imageUrl": item.get("imageUrl") or "",
        "fNumber": item.get("fNumber") or "",
        "colorMood": color_mood,
        "isMasterpiece": False
    }
    
    if item_id in MASTERPIECES:
        m = MASTERPIECES[item_id]
        artwork["isMasterpiece"] = True
        artwork["titleKo"] = m.get("titleKo", artwork["titleKo"])
        artwork["genre"] = m.get("genre", artwork["genre"])
        artwork["medium"] = m.get("medium", artwork["medium"])
        artwork["dimensions"] = m.get("dimensions", artwork["dimensions"])
        artwork["creationLocation"] = m.get("creationLocation", artwork["creationLocation"])
        artwork["description"] = m.get("description")
        artwork["letterQuote"] = m.get("letterQuote")
        artwork["curationTags"] = m.get("curationTags")
        artwork["colorMood"] = m.get("colorMood", color_mood)
        artwork["dominantColors"] = m.get("dominantColors")
        artwork["realSitePhotoUrl"] = m.get("realSitePhotoUrl")
        artwork["realSiteDescription"] = m.get("realSiteDescription")
        
    processed_artworks.append(artwork)

processed_artworks.sort(key=lambda x: (not x["isMasterpiece"], -(x["year"] or 0)))

ts_content = f"""// Auto-generated Van Gogh artworks dataset with color palettes & real site data
import {{ Artwork, Museum, CreationJourneySpot }} from '../types';

export const VAN_GOGH_ARTWORKS: Artwork[] = {json.dumps(processed_artworks, ensure_ascii=False, indent=2)};

export const CREATION_JOURNEY: CreationJourneySpot[] = [
  {{
    id: 'netherlands',
    nameKo: '초기 네덜란드 (쥔던트·헤이그·뉘넌)',
    nameEn: 'Netherlands Period',
    years: '1880 ~ 1885',
    lat: 51.4756,
    lng: 5.5511,
    order: 1,
    summary: '화가로서의 결심과 노동자·농민의 척박한 삶을 어둡고 묵직한 흙빛 톤으로 화폭에 담은 출발기.',
    artisticSignificance: '밀레의 영향을 받아 농민의 정직한 땀과 노동을 숭고하게 묘사했으며, 최초의 걸작 <감자 먹는 사람들>을 탄생시켰습니다.'
  }},
  {{
    id: 'paris',
    nameKo: '파리 시기 (몽마르트르)',
    nameEn: 'Paris Period',
    years: '1886 ~ 1888. 02',
    lat: 48.8867,
    lng: 2.3431,
    order: 2,
    summary: '인상주의 화가들과의 교류, 일본 우키요에 판화와의 조우를 통해 어두운 색채를 벗고 밝고 화려한 원색을 수용한 변혁기.',
    artisticSignificance: '점묘파의 신인상주의와 인상파의 빛 처리를 체화하고 자화상 연작을 집중적으로 제작하며 자신만의 개성적인 붓질을 개척했습니다.'
  }},
  {{
    id: 'arles',
    nameKo: '남프랑스 아를',
    nameEn: 'Arles Period',
    years: '1888. 02 ~ 1889. 05',
    lat: 43.6766,
    lng: 4.6278,
    order: 3,
    summary: '남프랑스의 눈부신 햇살 속에서 색채의 폭발을 경험하며 노란 집에서 예술가 공동체를 꿈꾼 절정기.',
    artisticSignificance: '<해바라기>, <밤의 카페 테라스>, <아를의 침실> 등 고흐를 상징하는 불멸의 명작들이 불과 몇 달 만에 쏟아져 나온 시기입니다.'
  }},
  {{
    id: 'saint-remy',
    nameKo: '생레미 드 프로방스',
    nameEn: 'Saint-Rémy Period',
    years: '1889. 05 ~ 1890. 05',
    lat: 43.7895,
    lng: 4.8317,
    order: 4,
    summary: '생폴 드 모졸 요양원에서 발작과 회복을 반복하며 내면의 고통을 격정적인 소용돌이 붓터치로 승화시킨 시기.',
    artisticSignificance: '<별이 빛나는 밤>, <아이리스>, <사이프러스 나무> 등 물결치는 역동적 리듬의 선과 영적 신비감이 절정에 달했습니다.'
  }},
  {{
    id: 'auvers',
    nameKo: '오베르 쉬르 우아즈',
    nameEn: 'Auvers-sur-Oise Period',
    years: '1890. 05 ~ 1890. 07',
    lat: 49.0716,
    lng: 2.1713,
    order: 5,
    summary: '가셰 박사의 보살핌 속에 생애 마지막 70일간 70여 점이 넘는 대작을 쏟아내며 불꽃처럼 타오른 종착지.',
    artisticSignificance: '<까마귀가 나는 밀밭>, <오베르의 교회> 등 파란만장했던 삶의 종막을 장엄하고 비극적인 필치로 완성했습니다.'
  }}
];

export const MAJOR_MUSEUMS: Museum[] = [
  {{
    id: 'van-gogh-museum',
    nameKo: '반 고흐 미술관',
    nameEn: 'Van Gogh Museum',
    city: '암스테르담',
    country: '네덜란드',
    lat: 52.3584,
    lng: 4.8811,
    artworkCount: 200,
    description: '세계 최대 규모의 반 고흐 컬렉션을 보유한 미술관으로, 유화 200여 점과 소묘 500여 점, 친필 편지 대부분을 영구 보존·전시하고 있습니다.',
    visitingTips: '뮤지엄플레인에 위치하며 100% 사전 온라인 예약 필수. 대표작 <해바라기>, <아를의 침실>, <감자 먹는 사람들> 소장.',
    websiteUrl: 'https://www.vangoghmuseum.nl'
  }},
  {{
    id: 'kroller-muller',
    nameKo: '크뢸러 뮐러 미술관',
    nameEn: 'Kröller-Müller Museum',
    city: '오테를로',
    country: '네덜란드',
    lat: 52.0958,
    lng: 5.8164,
    artworkCount: 90,
    description: '반 고흐 작품의 세계 2위 소장처로, 데 호헤 벨루웨 국립공원 내에 위치하며 유화 약 90점과 소묘 180여 점을 소장하고 있습니다.',
    visitingTips: '<밤의 카페 테라스>, <감자 심는 사람들>, <사이프러스가 있는 시골길>을 한적한 자연 속에서 감상할 수 있습니다.',
    websiteUrl: 'https://krollermuller.nl'
  }},
  {{
    id: 'musee-dorsay',
    nameKo: '오르세 미술관',
    nameEn: "Musée d'Orsay",
    city: '파리',
    country: '프랑스',
    lat: 48.8600,
    lng: 2.3266,
    artworkCount: 24,
    description: '19세기 인상주의와 후기 인상주의의 메카로, 아를과 오베르 시절에 제작된 고흐의 결정적 걸작들을 집중 보유하고 있습니다.',
    visitingTips: '5층 상설 전시실에서 <론강의 별이 빛나는 밤>, <오베르의 교회>, <자화상(1889)>을 관람할 수 있습니다.',
    websiteUrl: 'https://www.musee-orsay.fr'
  }},
  {{
    id: 'moma-ny',
    nameKo: '뉴욕 근대미술관 (MoMA)',
    nameEn: 'Museum of Modern Art',
    city: '뉴욕',
    country: '미국',
    lat: 40.7614,
    lng: -73.9776,
    artworkCount: 5,
    description: '고흐의 가장 유명한 대표작인 <별이 빛나는 밤(The Starry Night, 1889)>을 소장하고 있는 현대 미술의 심장부입니다.',
    visitingTips: '5층 갤러리 502호에 전시되어 있으며 MoMA에서 가장 관람객이 많이 몰리는 하이라이트 구역입니다.',
    websiteUrl: 'https://www.moma.org'
  }},
  {{
    id: 'met-ny',
    nameKo: '메트로폴리탄 미술관',
    nameEn: 'The Metropolitan Museum of Art',
    city: '뉴욕',
    country: '미국',
    lat: 40.7794,
    lng: -73.9632,
    artworkCount: 16,
    description: '19세기 유럽 회화 갤러리에 <사이프러스>, <밀짚모자를 쓴 자화상>, <아이리스> 등 고흐의 다채로운 걸작들을 소장하고 있습니다.',
    visitingTips: '822번 갤러리(19세기 유럽 회화실)에 집중 전시되어 있습니다.',
    websiteUrl: 'https://www.metmuseum.org'
  }},
  {{
    id: 'national-gallery-london',
    nameKo: '내셔널 갤러리 (런던)',
    nameEn: 'The National Gallery',
    city: '런던',
    country: '영국',
    lat: 51.5089,
    lng: -0.1283,
    artworkCount: 9,
    description: '트라팔가 광장에 위치한 런던의 대표 미술관으로, 세계적으로 가장 널리 알려진 네 번째 버전의 <해바라기>와 <반 고흐의 의자>를 소장하고 있습니다.',
    visitingTips: '43번 전시실에 전시되어 있으며 상설 전시는 무료로 입장 가능합니다.',
    websiteUrl: 'https://www.nationalgallery.org.uk'
  }},
  {{
    id: 'art-institute-chicago',
    nameKo: '시카고 미술관',
    nameEn: 'Art Institute of Chicago',
    city: '시카고',
    country: '미국',
    lat: 41.8796,
    lng: -87.6237,
    artworkCount: 12,
    description: '<아를의 침실> 제2버전(1889)과 <자화상>, <마담 루랭의 초상>을 소장한 미국 3대 미술관 중 하나입니다.',
    visitingTips: '유럽 회화 및 조각 241호 갤러리에 위치합니다.',
    websiteUrl: 'https://www.artic.edu'
  }},
  {{
    id: 'sompo-tokyo',
    nameKo: '솜포 미술관 (도쿄)',
    nameEn: 'Sompo Museum of Art',
    city: '도쿄 (신주쿠)',
    country: '일본',
    lat: 35.6923,
    lng: 139.6976,
    artworkCount: 1,
    description: '아시아에서 유일하게 고흐의 <해바라기> 원작을 상설 전시하는 미술관입니다. (1987년 당시 세계 최고가로 낙찰)',
    visitingTips: '신주쿠역 서쪽 출구 도보 5분 거리에 위치하며 전용 전시실에서 상설 전시됩니다.',
    websiteUrl: 'https://www.sompo-museum.org'
  }}
];
"""

with open('src/archive/data/vangoghArtworks.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Updated vangoghArtworks.ts with dominant colors and real site metadata!")
