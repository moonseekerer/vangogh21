import json
from collections import Counter

with open('src/archive/data/raw_artworks.json', encoding='utf-8') as f:
    raw = json.load(f)

print(f"=== 1. 기본 수량 점검 ===")
print(f"현재 등록된 총 레코드 수: {len(raw)}점")

# 1. ID 중복 확인
ids = [x['id'] for x in raw]
unique_ids = set(ids)
print(f"고유 위키데이터 ID 수: {len(unique_ids)}개")
if len(ids) == len(unique_ids):
    print("-> ID 기준 완전 중복 항목은 0건 (고유 ID 무결성 확보)")
else:
    print(f"-> ID 중복 {len(ids) - len(unique_ids)}건 발견!")

# 2. 이미지 URL 중복 확인
image_urls = [x['imageUrl'] for x in raw if x.get('imageUrl')]
print(f"\n=== 2. 이미지 파일 중복 점검 ===")
print(f"이미지 URL이 있는 작품: {len(image_urls)}점")
print(f"이미지가 없는 작품: {len(raw) - len(image_urls)}점")

img_counts = Counter(image_urls)
dup_imgs = {k: v for k, v in img_counts.items() if v > 1}
print(f"동일한 이미지 URL을 공유하는 중복 케이스: {len(dup_imgs)}건")
for img_url, count in list(dup_imgs.items())[:10]:
    items_with_img = [x for x in raw if x.get('imageUrl') == img_url]
    print(f"\n[중복 이미지 발견 ({count}개 항목이 동일 이미지 공유)]")
    for it in items_with_img:
        print(f"  - ID: {it['id']}, 제목: {it.get('titleKo')} / {it.get('titleEn')}, 연도: {it.get('year')}, 소장처: {it.get('collection')}, F: {it.get('fNumber')}")

# 3. 제목 중복 확인 (시리즈 연작 vs 데이터 오류 분별)
print(f"\n=== 3. 동일 제목(연작/중복) 점검 ===")
titles = [x['titleEn'].strip().lower() for x in raw if x.get('titleEn')]
title_counts = Counter(titles)
dup_titles = {k: v for k, v in title_counts.items() if v > 1}
print(f"동일한 영어 제목을 가진 그룹 수: {len(dup_titles)}개 그룹")
for t, cnt in list(dup_titles.items())[:8]:
    items_with_title = [x for x in raw if (x.get('titleEn') or '').strip().lower() == t]
    print(f"\n제목: '{t}' (총 {cnt}점)")
    for it in items_with_title[:4]:
        print(f"  - ID: {it['id']}, 연도: {it.get('year')}, 소장처: {it.get('collection')}, F: {it.get('fNumber')}")

# 4. 결측치 점검
print(f"\n=== 4. 메타데이터 결측치 점검 ===")
no_year = [x for x in raw if not x.get('year')]
no_collection = [x for x in raw if not x.get('collection')]
no_coord = [x for x in raw if x.get('lat') is None]
no_fnum = [x for x in raw if not x.get('fNumber')]

print(f"제작연도 미상: {len(no_year)}건")
print(f"소장처 미상(개인소장 포함): {len(no_collection)}건")
print(f"미술관 좌표 누락: {len(no_coord)}건")
print(f"카탈로그 레조네(F번호) 누락: {len(no_fnum)}건")
