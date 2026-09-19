import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { GoogleMapPanel } from "@/components/resourcex/GoogleMapPanel";
import { ResourceCard } from "@/components/resourcex/ResourceCard";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, inr, listings, matchScore } from "@/lib/resourcex-data";

type SearchParams = {
  resource?: string;
  quantity?: number;
  location?: string;
  budget?: number;
  distance?: number;
  date?: string;
};

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    resource: typeof search["resource"] === "string" ? search["resource"] : "Banquet chairs",
    quantity: Number(search["quantity"]) || 150,
    location: typeof search["location"] === "string" ? search["location"] : "City Centre, Mumbai",
    budget: Number(search["budget"]) || 10000,
    distance: Number(search["distance"]) || 10,
    date: typeof search["date"] === "string" ? search["date"] : "2026-09-15",
  }),
  head: () => ({
    meta: [
      { title: "Search Results — Nearby Hospitality Resources | ResourceX" },
      {
        name: "description",
        content:
          "Compare ranked hospitality resources by match score, price, distance, availability and rating on a live map.",
      },
      { property: "og:title", content: "Search Results — ResourceX" },
      {
        property: "og:description",
        content: "Ranked providers with distance, price and availability on a dark-themed map.",
      },
    ],
  }),
  component: Results,
});

const sortOptions = ["Best Match", "Closest", "Lowest Price", "Highest Rated"] as const;

function Results() {
  const params = Route.useSearch();
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Best Match");
  const [activeId, setActiveId] = useState<string | null>(listings[0]!.id);
  const [maxDistance, setMaxDistance] = useState(params.distance ?? 10);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minRating, setMinRating] = useState(4);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = listings.filter(
      (l) =>
        l.distanceKm <= maxDistance + 4 &&
        l.totalPrice <= maxPrice &&
        l.rating >= minRating &&
        (!deliveryOnly || l.delivery) &&
        (selectedCats.length === 0 || selectedCats.includes(l.category)),
    );
    const sorted = [...filtered];
    if (sort === "Best Match") sorted.sort((a, b) => matchScore(b.match) - matchScore(a.match));
    if (sort === "Closest") sorted.sort((a, b) => a.distanceKm - b.distanceKm);
    if (sort === "Lowest Price") sorted.sort((a, b) => a.totalPrice - b.totalPrice);
    if (sort === "Highest Rated") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [sort, maxDistance, maxPrice, minRating, deliveryOnly, selectedCats]);

  const filters = (
    <div className="space-y-6">
      <div>
        <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Category</Label>
        <div className="mt-3 space-y-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={selectedCats.includes(c)}
                onCheckedChange={(v) =>
                  setSelectedCats((prev) => (v ? [...prev, c] : prev.filter((x) => x !== c)))
                }
              />
              <span className="min-w-0 truncate">{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-xs">
          <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Distance</Label>
          <span className="font-semibold text-primary">Within {maxDistance} km</span>
        </div>
        <Slider className="mt-3" min={1} max={20} value={[maxDistance]} onValueChange={([v]) => setMaxDistance(v!)} />
      </div>
      <div>
        <div className="flex items-center justify-between text-xs">
          <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Max price</Label>
          <span className="font-semibold text-primary">{inr(maxPrice)}</span>
        </div>
        <Slider className="mt-3" min={2000} max={80000} step={500} value={[maxPrice]} onValueChange={([v]) => setMaxPrice(v!)} />
      </div>
      <div>
        <div className="flex items-center justify-between text-xs">
          <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Min rating</Label>
          <span className="font-semibold text-primary">{minRating.toFixed(1)} ★</span>
        </div>
        <Slider className="mt-3" min={3} max={5} step={0.1} value={[minRating]} onValueChange={([v]) => setMinRating(v!)} />
      </div>
      <div className="space-y-2">
        <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Logistics</Label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox checked={deliveryOnly} onCheckedChange={(v) => setDeliveryOnly(Boolean(v))} />
          Delivery available
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">
              {params.quantity} × {params.resource}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {params.location} · within {params.distance} km · under {inr(params.budget ?? 10000)} ·{" "}
              {results.length} providers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setFiltersOpen((v) => !v)}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
            <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/search">Edit search</Link>
            </Button>
          </div>
        </div>
        {filtersOpen && <div className="border-t border-border px-4 py-5 lg:hidden">{filters}</div>}
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)_400px]">
        <aside className="hidden lg:block">
          <div className="panel sticky top-24 p-5">{filters}</div>
        </aside>

        <div className="min-w-0 space-y-4">
          {results.map((l) => (
            <ResourceCard key={l.id} listing={l} active={l.id === activeId} onHighlight={setActiveId} />
          ))}
          {results.length === 0 && (
            <div className="panel p-10 text-center text-sm text-muted-foreground">
              No resources match these filters. Widen the distance or budget range.
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <GoogleMapPanel
            listings={results}
            activeId={activeId}
            onSelect={setActiveId}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
