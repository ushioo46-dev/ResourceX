import { Link } from "@tanstack/react-router";
import { MapPin, Navigation, Satellite } from "lucide-react";
import { useMemo, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import { inr, matchScore, type ResourceListing } from "@/lib/resourcex-data";
import { cn } from "@/lib/utils";

/**
 * Google Maps integration surface for ResourceX.
 *
 * Renders cyan provider markers over a real, dark-styled Google Map.
 * Relies on <APIProvider> being set up once at the app root (see
 * src/routes/__root.tsx) so it doesn't need its own API key here.
 *
 * Uses the classic `Marker` (not `AdvancedMarker`/`Pin`) deliberately:
 * AdvancedMarker requires a cloud-registered Map ID and, without one,
 * throws "Unknown property 'data-tsd-source' of PinElement". Classic
 * Marker needs no Map ID, so inline `styles` can drive the dark theme
 * directly with no extra Cloud Console setup.
 */

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0f1418" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f1418" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a9aa0" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1c2529" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0f1418" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a1a1c" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#161d21" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2a3438" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

export function GoogleMapPanel({
  listings,
  activeId,
  onSelect,
  className,
}: {
  listings: ResourceListing[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const [internalActive, setInternalActive] = useState<string | null>(activeId ?? null);
  const currentActiveId = activeId ?? internalActive;

  const center = useMemo(() => {
    if (listings.length === 0) return { lat: 19.076, lng: 72.8777 }; // Mumbai fallback
    const lat = listings.reduce((sum, l) => sum + l.lat, 0) / listings.length;
    const lng = listings.reduce((sum, l) => sum + l.lng, 0) / listings.length;
    return { lat, lng };
  }, [listings]);

  const active = listings.find((l) => l.id === currentActiveId) ?? null;

  const handleSelect = (id: string) => {
    onSelect?.(id);
    setInternalActive(id);
  };

  return (
    <div className={cn("panel relative overflow-hidden", className)}>
      <div className="relative flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Satellite className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Google Maps · Nearby providers
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {listings.length} within 25 km
        </span>
      </div>

      <div className="relative h-[360px] sm:h-[420px] lg:h-[480px]">
        <Map
          defaultCenter={center}
          defaultZoom={listings.length > 1 ? 10 : 13}
          styles={darkMapStyle}
          disableDefaultUI
          zoomControl
          gestureHandling="greedy"
          className="h-full w-full"
        >
          {listings.map((listing) => {
            const isActive = listing.id === currentActiveId;
            return (
              <Marker
                key={listing.id}
                position={{ lat: listing.lat, lng: listing.lng }}
                onClick={() => handleSelect(listing.id)}
                icon={{
                  // google.maps.SymbolPath.CIRCLE === 0. Using the literal
                  // avoids touching the `google` global at all, since it can
                  // exist as a stub before google.maps.SymbolPath is ready
                  // (and doesn't exist yet during server-side rendering).
                  path: 0,
                  scale: isActive ? 11 : 8,
                  fillColor: isActive ? "#2de6d2" : "#12232a",
                  fillOpacity: 1,
                  strokeColor: "#2de6d2",
                  strokeWeight: 2,
                }}
              />
            );
          })}
        </Map>

        {active && (
          <div className="pointer-events-none absolute inset-x-3 bottom-3">
            <div className="glass pointer-events-auto rounded-xl p-3">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{active.provider}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {active.distanceKm} km · {active.quantity} {active.name.toLowerCase()}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-primary">
                    {inr(active.totalPrice)} · {matchScore(active.match)}% match
                  </p>
                </div>
                <Button asChild size="sm" className="shrink-0">
                  <Link to="/resource/$resourceId" params={{ resourceId: active.id }}>
                    View
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {!active && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-xl border border-primary/25 bg-surface/70 p-3 text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold text-primary">
              <Navigation className="h-3.5 w-3.5" /> Tap a marker to preview a provider
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Markers show provider distance, available quantity and match score across Mumbai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}