export type ArtworkType = '1:1' | 'edition';

export interface ArtistProfile {
  name: string;
  localName: string;
  age: number;
  location: string;
  avatarUrl: string;
  bio: string;
  philosophy: string;
  instagram: string;
  website: string;
  studioLocation: string;
  exhibitions: string[];
}

export interface Artwork {
  id: string;
  title: string;
  artistName: string;
  artistLocalName: string;
  artistAge: number;
  location: string;
  medium: string;
  dimensions: string;
  year: number;
  imageUrl: string;
  secondaryImages?: string[];
  
  // Pricing & Availability
  originalPrice: number;          // 1:1 오리지널 원화 독점가
  artPrintPrice: number;          // 공식 아트 프린트 실물 제작/배송가 (예: 29,000원)
  isOriginalSold: boolean;        // 단 1명 판매 여부 (true면 원작 품절)
  originalCollector?: string;     // 1호 소장자 성명 (예: '김모두 님')
  
  // Narrative & Curation
  curatorNote: string;
  artistStory: string;
  artistQuote: string;
  craftProcess: string;
  
  // Logistics & Status
  storageVault: string;
  freeStorageDays: number;

  artistProfile: ArtistProfile;
}

export interface OwnershipCertificate {
  certificateId: string;
  serialNumber: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  collectorName: string;
  collectorPhone: string;
  purchaseType: 'original_vault' | 'art_print';
  price: number;
  mintedAt: string;
  
  // Vault & Physical Redemption
  vaultStatus: 'in_vault' | 'redeem_requested' | 'redeemed' | 'delivered';
  vaultExpiryDate?: string;
  shippingAddress?: {
    recipient: string;
    phone: string;
    address: string;
    postalCode: string;
    notes?: string;
  };
  redeemedAt?: string;
}
