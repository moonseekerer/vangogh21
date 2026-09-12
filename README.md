# 반 고흐 21 (Van Gogh 21)

> **"21세기 반 고흐를 찾아서"**  
> 지리적 한계와 미술 시장의 부재로 가려진 개발도상국 청년 예술가를 발굴하여, 국내 컬렉터와 일상 공간을 1:1로 연결하는 소셜 아트 플랫폼입니다.  
> (중소벤처기업부 2026 '모두의 창업' 2차 심사용 프로토타입)

---

## 1. 프로젝트 개요

- **공식 서비스명:** 반 고흐 21 (Van Gogh 21)
- **온라인 배포 URL:** [https://vangogh-21.web.app](https://vangogh-21.web.app)
- **시즌 1 테마:** 태평양의 색채, 피지(Fiji) 신예전 (피지 로컬 청년 작가 4인 큐레이션)
- **시즌 2 예고:** 끝없는 지평선의 서사, 몽골(Mongolia) 신예전

---

## 2. 3대 핵심 가치 모델

1. **01 / PROVENANCE (1:1 원작 독점 소장)**
   - 세상에 단 한 점만 존재하는 현지 작가의 실물 캔버스 원화 1:1 독점 소유권.
   - 캔버스 후면 친필 서명·일련번호 각인 및 디지털 정품 인증서 발급.
   - 현지 보관소 1년 무상 보관 후 소장자가 원하는 시점에 안전 배송.

2. **02 / CRAFTSMANSHIP (파인아트 캔버스 배송)**
   - 원작의 유화 붓터치와 마포 캔버스 결을 고해상도 스캔하여 파인아트 캔버스지에 정밀 인쇄.
   - 원목 프레임 맞춤 제작 후 안전하게 문 앞까지 실물 액자 배송.

3. **03 / SALON (소장자 프라이빗 살롱)**
   - 작품 소장자 전용 비공개 온라인 커뮤니티.
   - 공간 거치 사진 공유 시 현지 작가와 1:1 안부 및 창작 비하인드 스토리 교류.

---

## 3. 기술 스택 (Tech Stack)

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React
- **Hosting & Infrastructure:** Firebase Hosting, Firebase Analytics (GA4)
- **State & Storage:** Client-side LocalStorage Persistence & Cache Migration

---

## 4. 로컬 실행 및 빌드 방법

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 프로덕션 빌드
npm run build

# 4. 파이어베이스 배포
firebase deploy --only hosting
```
