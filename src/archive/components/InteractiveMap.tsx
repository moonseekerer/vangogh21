import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Artwork, Museum, CreationJourneySpot } from '../types';
import { MAJOR_MUSEUMS, CREATION_JOURNEY, VAN_GOGH_ARTWORKS } from '../data/vangoghArtworks';
import { MapPin, Navigation, Play, Pause, RotateCcw, ExternalLink, Globe, Layers } from 'lucide-react';

interface InteractiveMapProps {
  onSelectArtwork: (artwork: Artwork) => void;
  selectedMuseumName?: string | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectArtwork,
  selectedMuseumName
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const polylineLayerRef = useRef<L.Polyline | null>(null);
  const baseTilesLayerRef = useRef<L.Layer | null>(null);

  const [mapMode, setMapMode] = useState<'museums' | 'journey'>('museums');
  const [tileStyle, setTileStyle] = useState<'dark' | 'satellite' | 'topo'>('dark');
  const [activeMuseum, setActiveMuseum] = useState<Museum | null>(null);
  const [activeJourneySpot, setActiveJourneySpot] = useState<CreationJourneySpot | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  // Timelapse Journey Player State
  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Helper to apply basemap tile layers (Free & Public GIS services, no API key required)
  const applyTileLayer = (map: L.Map, style: 'dark' | 'satellite' | 'topo') => {
    if (baseTilesLayerRef.current) {
      map.removeLayer(baseTilesLayerRef.current);
      baseTilesLayerRef.current = null;
    }

    let newLayer: L.Layer;

    if (style === 'dark') {
      newLayer = L.layerGroup([
        L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
            maxNativeZoom: 16,
            maxZoom: 18
          }
        ),
        L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: '',
            maxNativeZoom: 16,
            maxZoom: 18
          }
        )
      ]);
    } else if (style === 'satellite') {
      newLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
          maxNativeZoom: 18,
          maxZoom: 18
        }
      );
    } else {
      newLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ',
          maxNativeZoom: 18,
          maxZoom: 18
        }
      );
    }

    newLayer.addTo(map);
    baseTilesLayerRef.current = newLayer;
  };

  const handleTileStyleChange = (newStyle: 'dark' | 'satellite' | 'topo') => {
    setTileStyle(newStyle);
    if (mapInstanceRef.current) {
      applyTileLayer(mapInstanceRef.current, newStyle);
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [48.8566, 2.3522],
      zoom: 5,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    applyTileLayer(map, tileStyle);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Filter museums by country
  const filteredMuseums = React.useMemo(() => {
    if (selectedCountry === 'all') return MAJOR_MUSEUMS;
    return MAJOR_MUSEUMS.filter((m) => m.country === selectedCountry);
  }, [selectedCountry]);

  const countries = ['all', '네덜란드', '프랑스', '미국', '영국', '일본'];

  // Update Markers based on mode
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();
    if (polylineLayerRef.current) {
      polylineLayerRef.current.remove();
      polylineLayerRef.current = null;
    }

    if (mapMode === 'museums') {
      filteredMuseums.forEach((m) => {
        const isSelected = activeMuseum?.id === m.id;
        const iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="w-8 h-8 rounded-full flex items-center justify-center ${
              isSelected
                ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/50 shadow-lg scale-110'
                : 'bg-stone-900 border-2 border-amber-500 text-amber-300 shadow-md hover:scale-110'
            } transition-transform">
              <span class="text-xs font-bold font-mono">${m.artworkCount}</span>
            </div>
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] bg-stone-900/90 text-stone-200 px-1.5 py-0.5 rounded border border-stone-700 pointer-events-none shadow-sm">
              ${m.nameKo}
            </div>
          </div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-museum-pin',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([m.lat, m.lng], { icon });
        marker.on('click', () => {
          setActiveMuseum(m);
          setActiveJourneySpot(null);
          map.flyTo([m.lat, m.lng], Math.max(map.getZoom(), 7), { duration: 0.8 });
        });
        markersGroup.addLayer(marker);
      });

      if (!activeMuseum && filteredMuseums.length > 0) {
        setActiveMuseum(filteredMuseums[0]);
      }
    } else {
      // Journey Mode
      const sortedSpots = [...CREATION_JOURNEY].sort((a, b) => a.order - b.order);
      const latlngs: [number, number][] = sortedSpots.map((s) => [s.lat, s.lng]);

      polylineLayerRef.current = L.polyline(latlngs, {
        color: '#f59e0b',
        weight: 3,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round'
      }).addTo(map);

      sortedSpots.forEach((spot, idx) => {
        const isSelected = activeJourneySpot?.id === spot.id;
        const iconHtml = `
          <div class="relative group cursor-pointer">
            <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
              isSelected
                ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/60 shadow-xl scale-125'
                : 'bg-stone-900 border-2 border-amber-400 text-amber-300'
            } shadow-lg transition-transform">
              ${spot.order}
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] bg-stone-900/95 text-stone-200 px-2 py-0.5 rounded border border-stone-700 pointer-events-none shadow-md">
              ${spot.nameKo.split(' ')[0]}
            </div>
          </div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-journey-pin',
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        const marker = L.marker([spot.lat, spot.lng], { icon });
        marker.on('click', () => {
          setActiveJourneySpot(spot);
          setCurrentStepIndex(idx);
          setIsPlayingTimeline(false);
          setActiveMuseum(null);
          map.flyTo([spot.lat, spot.lng], 8, { duration: 0.8 });
        });
        markersGroup.addLayer(marker);
      });

      if (!activeJourneySpot) {
        setActiveJourneySpot(sortedSpots[0]);
      }
    }
  }, [mapMode, activeMuseum?.id, activeJourneySpot?.id, filteredMuseums]);

  // Timeline Auto Player Effect
  useEffect(() => {
    let timer: any = null;
    if (isPlayingTimeline && mapMode === 'journey') {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          const nextIndex = (prev + 1) % CREATION_JOURNEY.length;
          const targetSpot = CREATION_JOURNEY[nextIndex];
          setActiveJourneySpot(targetSpot);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([targetSpot.lat, targetSpot.lng], 8, { duration: 1.2 });
          }
          return nextIndex;
        });
      }, 3800);
    }
    return () => clearInterval(timer);
  }, [isPlayingTimeline, mapMode]);

  // If museum was requested from outside
  useEffect(() => {
    if (!selectedMuseumName) return;
    const found = MAJOR_MUSEUMS.find(
      (m) =>
        m.nameKo.includes(selectedMuseumName) ||
        m.nameEn.toLowerCase().includes(selectedMuseumName.toLowerCase()) ||
        selectedMuseumName.toLowerCase().includes(m.nameEn.toLowerCase())
    );
    if (found) {
      setMapMode('museums');
      setActiveMuseum(found);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([found.lat, found.lng], 8, { duration: 0.8 });
      }
    }
  }, [selectedMuseumName]);

  // Artworks for active museum or journey
  const displayArtworks = React.useMemo(() => {
    if (mapMode === 'museums' && activeMuseum) {
      return VAN_GOGH_ARTWORKS.filter((a) => {
        const c = (a.collection || '').toLowerCase();
        const mKo = activeMuseum.nameKo.toLowerCase();
        const mEn = activeMuseum.nameEn.toLowerCase();
        return (
          c.includes(mKo) ||
          c.includes(mEn) ||
          (activeMuseum.id === 'van-gogh-museum' && (c.includes('van gogh museum') || c.includes('반 고흐'))) ||
          (activeMuseum.id === 'kroller-muller' && (c.includes('kröller') || c.includes('kroller'))) ||
          (activeMuseum.id === 'musee-dorsay' && (c.includes("d'orsay") || c.includes('orsay'))) ||
          (activeMuseum.id === 'moma-ny' && (c.includes('modern art') || c.includes('moma'))) ||
          (activeMuseum.id === 'met-ny' && (c.includes('metropolitan') || c.includes('met'))) ||
          (activeMuseum.id === 'national-gallery-london' && c.includes('national gallery')) ||
          (activeMuseum.id === 'art-institute-chicago' && c.includes('chicago')) ||
          (activeMuseum.id === 'sompo-tokyo' && (c.includes('sompo') || c.includes('yasuda')))
        );
      });
    } else if (mapMode === 'journey' && activeJourneySpot) {
      return VAN_GOGH_ARTWORKS.filter((a) => a.period === activeJourneySpot.id);
    }
    return [];
  }, [mapMode, activeMuseum, activeJourneySpot]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[660px] bg-stone-950 rounded-lg border border-stone-800 overflow-hidden">
      {/* Top Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-stone-900 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
            지도 탐색 모드
          </span>
          <div className="flex items-center bg-stone-950 p-1 rounded-md border border-stone-800 text-xs ml-2">
            <button
              onClick={() => {
                setMapMode('museums');
                setIsPlayingTimeline(false);
              }}
              className={`px-3 py-1 rounded transition-all font-medium flex items-center gap-1.5 ${
                mapMode === 'museums'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              현재 소장 미술관
            </button>
            <button
              onClick={() => {
                setMapMode('journey');
                setActiveJourneySpot(CREATION_JOURNEY[0]);
                setCurrentStepIndex(0);
              }}
              className={`px-3 py-1 rounded transition-all font-medium flex items-center gap-1.5 ${
                mapMode === 'journey'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              창작 여정 동선 (1880~1890)
            </button>
          </div>
        </div>

        {/* Dynamic Toolbar depending on mode */}
        {mapMode === 'museums' ? (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <div className="flex items-center gap-1 text-stone-400 mr-1 shrink-0">
              <Globe className="w-3.5 h-3.5" />
              <span className="font-mono">국가:</span>
            </div>
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors shrink-0 ${
                  selectedCountry === country
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {country === 'all' ? '전체 국가' : country}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                isPlayingTimeline
                  ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400/50 animate-pulse'
                  : 'bg-stone-800 text-amber-300 border border-amber-500/40 hover:bg-stone-700'
              }`}
            >
              {isPlayingTimeline ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  일시정지
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-amber-400" />
                  10년 여정 타임랩스 재생
                </>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setActiveJourneySpot(CREATION_JOURNEY[0]);
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo([CREATION_JOURNEY[0].lat, CREATION_JOURNEY[0].lng], 8, { duration: 0.8 });
                }
              }}
              title="처음부터 다시보기"
              className="p-1 rounded bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Map + Side Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Leaflet Map Canvas */}
        <div className="relative flex-1 w-full h-[50vh] lg:h-full z-0">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Map Basemap Style Switcher (Dark / Satellite / Topo) */}
          <div className="absolute bottom-3 left-3 z-20 bg-stone-950/90 border border-stone-800 backdrop-blur rounded-md p-1 flex items-center gap-1 text-[11px] shadow-lg">
            <button
              type="button"
              onClick={() => handleTileStyleChange('dark')}
              className={`px-2 py-0.5 rounded transition-colors font-medium ${
                tileStyle === 'dark'
                  ? 'bg-stone-800 text-amber-300 font-semibold border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              다크
            </button>
            <button
              type="button"
              onClick={() => handleTileStyleChange('satellite')}
              className={`px-2 py-0.5 rounded transition-colors font-medium ${
                tileStyle === 'satellite'
                  ? 'bg-stone-800 text-amber-300 font-semibold border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              위성
            </button>
            <button
              type="button"
              onClick={() => handleTileStyleChange('topo')}
              className={`px-2 py-0.5 rounded transition-colors font-medium ${
                tileStyle === 'topo'
                  ? 'bg-stone-800 text-amber-300 font-semibold border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              지형
            </button>
          </div>
        </div>

        {/* Timeline Progress Bar for Journey Mode */}
        {mapMode === 'journey' && (
          <div className="absolute top-3 left-3 sm:left-4 right-3 sm:right-auto z-20 bg-stone-950/90 border border-stone-800 backdrop-blur rounded-lg px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-4 text-xs shadow-lg max-w-[calc(100%-1.5rem)] sm:max-w-md overflow-x-auto no-scrollbar">
            <span className="font-mono text-amber-400 font-bold shrink-0 text-[11px] sm:text-xs">
              진행: {currentStepIndex + 1}/{CREATION_JOURNEY.length}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {CREATION_JOURNEY.map((spot, idx) => (
                <button
                  key={spot.id}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setActiveJourneySpot(spot);
                    setIsPlayingTimeline(false);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.flyTo([spot.lat, spot.lng], 8, { duration: 0.8 });
                    }
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors shrink-0 ${
                    idx === currentStepIndex
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {spot.nameKo.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Side Panel: Selected Museum / Journey Info & Artworks */}
        <div className="w-full lg:w-[440px] bg-stone-900/95 backdrop-blur border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col h-[50vh] lg:h-full z-10">
          {mapMode === 'museums' && activeMuseum ? (
            <div className="flex flex-col h-full">
              {/* Museum Header */}
              <div className="p-5 border-b border-stone-800 bg-stone-950/60">
                <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-1">
                  <span>{activeMuseum.city}, {activeMuseum.country}</span>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                    소장 약 {activeMuseum.artworkCount}점
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-100 tracking-tight">
                  {activeMuseum.nameKo}
                </h3>
                <p className="text-xs text-stone-400 font-serif italic mb-2.5">
                  {activeMuseum.nameEn}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed font-sans mb-3">
                  {activeMuseum.description}
                </p>
                <div className="bg-stone-900 border border-stone-800 rounded p-2.5 text-[11px] text-stone-400 mb-2">
                  <strong className="text-amber-400/90 font-medium block mb-0.5">관람 안내:</strong>
                  {activeMuseum.visitingTips}
                </div>
                <a
                  href={activeMuseum.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium underline"
                >
                  미술관 공식 웹사이트 방문
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Works Grid */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 font-medium px-1">
                  <span>소장 작품 목록 ({displayArtworks.length}점 확인됨)</span>
                </div>

                {displayArtworks.length === 0 ? (
                  <div className="text-center py-12 text-xs text-stone-400">
                    상세 소장 작품 목록을 확인 중입니다.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {displayArtworks.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => onSelectArtwork(art)}
                        className="group bg-stone-950 border border-stone-800/80 rounded overflow-hidden cursor-pointer hover:border-amber-500/60 transition-all shadow-sm"
                      >
                        <div className="aspect-[4/3] bg-black overflow-hidden relative">
                          <img
                            src={art.imageUrl || 'https://via.placeholder.com/400x300?text=Van+Gogh'}
                            alt={art.titleKo}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {art.isMasterpiece && (
                            <span className="absolute top-1.5 left-1.5 bg-amber-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                              대표작
                            </span>
                          )}
                        </div>
                        <div className="p-2.5">
                          <h4 className="text-xs font-semibold text-stone-200 truncate group-hover:text-amber-400 transition-colors">
                            {art.titleKo}
                          </h4>
                          <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                            {art.year ? `${art.year}년` : ''} · {art.medium}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : mapMode === 'journey' && activeJourneySpot ? (
            <div className="flex flex-col h-full">
              {/* Journey Header */}
              <div className="p-5 border-b border-stone-800 bg-stone-950/60">
                <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-1">
                  <span>여정 제 {activeJourneySpot.order}단계 ({currentStepIndex + 1}/{CREATION_JOURNEY.length})</span>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-medium">
                    {activeJourneySpot.years}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-100 tracking-tight">
                  {activeJourneySpot.nameKo}
                </h3>
                <p className="text-xs text-stone-400 font-serif italic mb-2.5">
                  {activeJourneySpot.nameEn}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed font-sans mb-3">
                  {activeJourneySpot.summary}
                </p>
                <div className="bg-stone-900 border border-stone-800 rounded p-2.5 text-[11px] text-stone-300">
                  <strong className="text-amber-400/90 font-medium block mb-0.5">미술사적 의의:</strong>
                  {activeJourneySpot.artisticSignificance}
                </div>
              </div>

              {/* Works from this period */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 font-medium px-1">
                  <span>이 시기에 탄생한 주요 작품 ({displayArtworks.length}점)</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {displayArtworks.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => onSelectArtwork(art)}
                      className="group bg-stone-950 border border-stone-800/80 rounded overflow-hidden cursor-pointer hover:border-amber-500/60 transition-all shadow-sm"
                    >
                      <div className="aspect-[4/3] bg-black overflow-hidden relative">
                        <img
                          src={art.imageUrl || 'https://via.placeholder.com/400x300?text=Van+Gogh'}
                          alt={art.titleKo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {art.isMasterpiece && (
                          <span className="absolute top-1.5 left-1.5 bg-amber-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                            대표작
                          </span>
                        )}
                      </div>
                      <div className="p-2.5">
                        <h4 className="text-xs font-semibold text-stone-200 truncate group-hover:text-amber-400 transition-colors">
                          {art.titleKo}
                        </h4>
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                          {art.year ? `${art.year}년` : ''} · {art.genre}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
