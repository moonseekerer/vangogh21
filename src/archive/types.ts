export type PeriodCategory = 'netherlands' | 'paris' | 'arles' | 'saint-remy' | 'auvers';

export type MediumCategory = '유화' | '소묘·드로잉' | '수채화' | '판화';

export type GenreCategory = '자화상' | '풍경화' | '정물화' | '인물·농민화' | '기타';

export interface LetterQuote {
  recipient: string;
  date: string;
  textKo: string;
  letterNo?: string;
}

export interface Artwork {
  id: string;
  titleKo: string;
  titleEn: string;
  year: number | null;
  period: PeriodCategory;
  periodLabel: string;
  medium: MediumCategory;
  genre: GenreCategory;
  dimensions?: string;
  collection: string;
  collectionCity: string;
  collectionCountry: string;
  lat: number | null;
  lng: number | null;
  creationLocation: string;
  creationLat: number;
  creationLng: number;
  imageUrl: string;
  highResUrl?: string;
  fNumber?: string;
  jhNumber?: string;
  description?: string;
  letterQuote?: LetterQuote;
  curationTags?: string[];
  isMasterpiece?: boolean;
  dominantColors?: string[];
  colorMood?: 'yellow' | 'blue' | 'brown' | 'green' | 'red';
  realSitePhotoUrl?: string;
  realSiteDescription?: string;
}

export interface Museum {
  id: string;
  nameKo: string;
  nameEn: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  artworkCount: number;
  description: string;
  visitingTips: string;
  websiteUrl: string;
}

export interface CreationJourneySpot {
  id: PeriodCategory;
  nameKo: string;
  nameEn: string;
  years: string;
  lat: number;
  lng: number;
  order: number;
  summary: string;
  artisticSignificance: string;
}

export interface VirtualExhibition {
  id: string;
  titleKo: string;
  titleEn: string;
  subtitle: string;
  theme: string;
  curatorNote: string;
  artworkIds: string[];
  coverImageUrl: string;
}

export interface HistoricalExhibition {
  year: string;
  title: string;
  venue: string;
  location: string;
  significance: string;
}
