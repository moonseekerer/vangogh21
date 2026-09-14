import urllib.request
import urllib.parse
import json
import os
import re

SPARQL_QUERY = """
SELECT ?item ?itemLabel ?itemLabel_ko ?year ?image ?collectionLabel ?coord ?fNumber ?genreLabel WHERE {
  ?item wdt:P170 wd:Q5582 .
  OPTIONAL { ?item wdt:P571 ?inception . BIND(YEAR(?inception) AS ?year) }
  OPTIONAL { ?item wdt:P18 ?image . }
  OPTIONAL {
    ?item wdt:P195 ?collection .
    ?collection rdfs:label ?collectionLabel . FILTER(LANG(?collectionLabel) = 'en')
    OPTIONAL { ?collection wdt:P625 ?coord . }
  }
  OPTIONAL { ?item wdt:P528 ?fNumber . }
  OPTIONAL {
    ?item wdt:P136 ?genre .
    ?genre rdfs:label ?genreLabel . FILTER(LANG(?genreLabel) = 'en')
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  OPTIONAL {
    ?item rdfs:label ?itemLabel_ko .
    FILTER(LANG(?itemLabel_ko) = "ko")
  }
}
LIMIT 2000
"""

def fetch():
    print("Fetching from Wikidata...")
    url = "https://query.wikidata.org/sparql?query=" + urllib.parse.quote(SPARQL_QUERY) + "&format=json"
    req = urllib.request.Request(url, headers={
        "User-Agent": "VanGoghDigitalArchive/1.0 (academic-curation; contact@vangogh-archive.org)"
    })
    
    with urllib.request.urlopen(req, timeout=60) as resp:
        raw = json.loads(resp.read().decode("utf-8"))
        bindings = raw["results"]["bindings"]
        print(f"Raw bindings received: {len(bindings)}")

    artworks_map = {}
    for b in bindings:
        item_id = b["item"]["value"].split("/")[-1]
        img = b.get("image", {}).get("value", "")
        if not img and item_id in artworks_map and artworks_map[item_id]["imageUrl"]:
            continue
            
        title_en = b.get("itemLabel", {}).get("value", "")
        title_ko = b.get("itemLabel_ko", {}).get("value", "")
        year = b.get("year", {}).get("value")
        collection = b.get("collectionLabel", {}).get("value", "")
        coord_raw = b.get("coord", {}).get("value", "")
        f_num = b.get("fNumber", {}).get("value", "")
        genre = b.get("genreLabel", {}).get("value", "")
        
        lat, lng = None, None
        if coord_raw and coord_raw.startswith("Point("):
            match = re.search(r"Point\(([-\d\.]+)\s+([-\d\.]+)\)", coord_raw)
            if match:
                lng = float(match.group(1))
                lat = float(match.group(2))

        image_url = img
        if image_url and "commons.wikimedia.org/wiki/Special:FilePath/" in image_url:
            filename = image_url.split("/")[-1]
            image_url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{filename}?width=1000"
        elif image_url.startswith("http://"):
            image_url = image_url.replace("http://", "https://")

        if item_id not in artworks_map:
            artworks_map[item_id] = {
                "id": item_id,
                "titleEn": title_en,
                "titleKo": title_ko if title_ko else title_en,
                "year": int(year) if year and year.isdigit() else None,
                "imageUrl": image_url,
                "collection": collection,
                "lat": lat,
                "lng": lng,
                "fNumber": f_num,
                "genre": genre
            }
        else:
            curr = artworks_map[item_id]
            if not curr["titleKo"] and title_ko:
                curr["titleKo"] = title_ko
            if not curr["imageUrl"] and image_url:
                curr["imageUrl"] = image_url
            if not curr["collection"] and collection:
                curr["collection"] = collection
            if curr["lat"] is None and lat is not None:
                curr["lat"] = lat
                curr["lng"] = lng
            if not curr["fNumber"] and f_num:
                curr["fNumber"] = f_num

    artworks_list = list(artworks_map.values())
    print(f"Total unique artworks deduplicated: {len(artworks_list)}")
    
    os.makedirs("src/archive/data", exist_ok=True)
    out_path = "src/archive/data/raw_artworks.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(artworks_list, f, ensure_ascii=False, indent=2)
    print(f"Saved to {out_path}")

if __name__ == "__main__":
    fetch()
