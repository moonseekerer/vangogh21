import json

with open('src/archive/data/raw_artworks.json', encoding='utf-8') as f:
    raw = json.load(f)

print(f"Original items: {len(raw)}")

# Filter out items with NO image
valid_items = [x for x in raw if x.get('imageUrl') and x.get('imageUrl').strip()]
print(f"Items with image: {len(valid_items)} (dropped {len(raw) - len(valid_items)} image-less items)")

# Deduplicate by image URL
# When two items share the exact same image, score them:
# +3 if fNumber present, +2 if collection present, +2 if year present, +1 if title is specific
def score_item(it):
    score = 0
    if it.get('fNumber'): score += 3
    if it.get('collection') and it.get('collection') != '개인 소장 또는 미상': score += 2
    if it.get('year'): score += 2
    if it.get('titleKo') and not it.get('titleKo').startswith('Q'): score += 1
    return score

img_groups = {}
for it in valid_items:
    img = it['imageUrl']
    if img not in img_groups:
        img_groups[img] = []
    img_groups[img].append(it)

deduped = []
dropped_count = 0
for img, group in img_groups.items():
    if len(group) == 1:
        deduped.append(group[0])
    else:
        # Sort by score descending
        group.sort(key=score_item, reverse=True)
        best = group[0]
        # merge any missing info from other items
        for other in group[1:]:
            if not best.get('fNumber') and other.get('fNumber'):
                best['fNumber'] = other['fNumber']
            if not best.get('collection') and other.get('collection'):
                best['collection'] = other['collection']
            if not best.get('year') and other.get('year'):
                best['year'] = other['year']
            dropped_count += 1
        deduped.append(best)

print(f"Deduplicated count: {len(deduped)} (removed {dropped_count} duplicate items)")

# Overwrite raw_artworks.json with clean data
with open('src/archive/data/raw_artworks.json', 'w', encoding='utf-8') as f:
    json.dump(deduped, f, ensure_ascii=False, indent=2)

print("Saved cleaned raw_artworks.json")
