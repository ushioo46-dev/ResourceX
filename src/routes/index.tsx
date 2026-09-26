import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Handshake,
  Layers,
  MapPinned,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MatchMeter } from "@/components/resourcex/MatchMeter";
import { Button } from "@/components/ui/button";
import { featuredListing } from "@/lib/resourcex-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResourceX — Turn Idle Hospitality Resources Into Business" },
      {
        name: "description",
        content:
          "ResourceX is a smart B2B marketplace where hospitality businesses share banquet space, furniture, parking, vehicles and equipment with nearby businesses that need them.",
      },
      { property: "og:title", content: "ResourceX — B2B Hospitality Resource Exchange" },
      {
        property: "og:description",
        content:
          "Discover, compare, negotiate and book underutilised hospitality resources near you.",
      },
    ],
  }),
  component: Landing,
});

const problems = [
  {
    icon: Layers,
    title: "Underutilized resources",
    body: "Banquet spaces, parking, furniture, vehicles and equipment may remain unused for significant periods.",
  },
  {
    icon: MessagesSquare,
    title: "Fragmented discovery",
    body: "Businesses often rely on WhatsApp groups, personal contacts and traditional brokers to find temporary resources.",
  },
  {
    icon: CalendarCheck,
    title: "Last-minute shortages",
    body: "Finding the right resource at the right location, price and time can be slow and inefficient.",
  },
];

const steps = [
  {
    no: "01",
    title: "List",
    body: "Providers list their available hospitality resources and define quantity, pricing and availability.",
  },
  {
    no: "02",
    title: "Discover",
    body: "Seekers enter what they need, where they need it, when they need it and their budget.",
  },
  {
    no: "03",
    title: "Match",
    body: "The ResourceX matching engine ranks the best resources based on multiple factors.",
  },
  {
    no: "04",
    title: "Exchange",
    body: "Businesses compare, request, negotiate, confirm and complete bookings.",
  },
];

function SmartMatchCard() {
  return (
    <div className="group relative mx-auto w-full max-w-md [perspective:1200px]">
      {/* Floating match badge */}
      <div className="absolute -right-3 -top-4 z-20 flex items-center gap-2 rounded-full border border-primary/30 bg-background/90 px-3 py-2 shadow-[0_0_30px_rgba(45,230,210,0.15)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
          Live Match
        </span>
      </div>

      {/* Main card */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-[1deg] group-hover:border-primary/50 group-hover:shadow-[0_25px_70px_rgba(45,230,210,0.15)]">
        {/* Glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />

        {/* Header */}
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Smart Match
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Best resource for your requirement
            </p>
          </div>

          {/* Match score */}
          <div className="relative grid h-16 w-16 place-items-center rounded-full border border-primary/30 bg-primary/10">
            <div className="text-center">
              <div className="text-lg font-black leading-none text-primary">
                94%
              </div>
              <div className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
                Match
              </div>
            </div>
          </div>
        </div>

        {/* Resource */}
        <div className="relative mt-6 rounded-2xl border border-border bg-background/50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">
                  Premium Conference Hall
                </h3>
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPinned className="h-3.5 w-3.5 text-primary" />
                Lower Parel, Mumbai
              </div>
            </div>

            <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
              Available
            </span>
          </div>

          {/* Details */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-surface/70 p-3">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                Price
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                ₹2,500
              </p>
              <p className="text-[9px] text-muted-foreground">/ day</p>
            </div>

            <div className="rounded-xl bg-surface/70 p-3">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                Distance
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                2.4 km
              </p>
              <p className="text-[9px] text-muted-foreground">nearby</p>
            </div>

            <div className="rounded-xl bg-surface/70 p-3">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                Capacity
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                120
              </p>
              <p className="text-[9px] text-muted-foreground">guests</p>
            </div>
          </div>
        </div>

        {/* Why this match */}
        <div className="relative mt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Why this match?
          </p>

          <div className="mt-3 grid gap-2">
            {[
              "Closest available resource",
              "Fits your requested capacity",
              "Within your budget",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15">
                  <BadgeCheck className="h-3 w-3 text-primary" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/search"
          className="relative mt-6 flex items-center justify-between rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-all duration-300 hover:bg-primary/15 hover:shadow-[0_0_25px_rgba(45,230,210,0.12)]"
        >
          <span>Explore this match</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Decorative floating card */}
      <div className="absolute -bottom-5 -left-8 hidden rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10">
            <MapPinned className="h-4 w-4 text-primary" />
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
              Distance
            </p>
            <p className="text-xs font-bold text-foreground">
              2.4 km away
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-backdrop opacity-60" aria-hidden />
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          aria-hidden
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 65%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3 w-3" /> Smart B2B Hospitality Marketplace
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Turn Idle Hospitality Resources Into{" "}
              <span className="text-gradient-accent">New Business Opportunities.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              ResourceX connects hospitality businesses with available resources to businesses that
              need them — enabling smarter discovery, flexible sharing and efficient booking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/search">
                  <Search className="h-4 w-4" /> Find Resources
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard/add-resource" search={{ edit: undefined }}>List a Resource</Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
              {[
                ["1,240+", "Listed resources"],
                ["6 cities", "Live coverage"],
                ["94%", "Top match score"],
              ].map(([v, l]) => (
                <div key={l} className="panel px-4 py-3">
                  <dt className="text-lg font-extrabold text-primary tabular-nums">{v}</dt>
                  <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-w-0 py-6 sm:py-10">
          <SmartMatchCard />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="max-w-2xl text-3xl font-extrabold text-foreground sm:text-4xl">
          Hospitality resources shouldn't sit idle.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problems.map((p) => (
            <div key={p.title} className="panel p-6 transition-colors hover:border-primary/35">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/8 text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 panel bg-surface p-6 text-center">
          <p className="text-base font-semibold text-foreground sm:text-lg">
            ResourceX intelligently connects resources, requirements and availability.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">How it works</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Four steps from idle inventory to a completed, tracked exchange.
          </p>
          <div className="relative mt-12 grid gap-6 lg:grid-cols-4">
            <div
              className="absolute left-0 right-0 top-6 hidden h-px lg:block"
              aria-hidden
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
                opacity: 0.5,
              }}
            />
            {steps.map((s) => (
              <div key={s.no} className="relative panel p-6">
                <span className="absolute -top-4 left-6 grid h-8 w-12 place-items-center rounded-lg border border-primary/40 bg-background text-xs font-extrabold text-primary">
                  {s.no}
                </span>
                <h3 className="mt-3 text-lg font-bold uppercase tracking-wide text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO USER TYPES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          Built for both sides of the exchange
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            {
              title: "Resource Providers",
              icon: Layers,
              points: [
                "List resources",
                "Specify quantity / capacity",
                "Set pricing",
                "Define availability dates and times",
                "Set minimum rental periods",
                "Accept or reject requests",
                "Negotiate",
                "Manage bookings",
                "Track utilization",
              ],
              cta: "Start Listing Resources",
              to: "/dashboard/add-resource" as const,
            },
            {
              title: "Resource Seekers",
              icon: Search,
              points: [
                "Search resources",
                "Specify location",
                "Specify quantity",
                "Specify budget",
                "Specify date / time",
                "Compare providers",
                "View distance",
                "Check availability",
                "Send requests and negotiate",
                "Track bookings",
              ],
              cta: "Find a Resource",
              to: "/search" as const,
            },
          ].map((card) => (
            <div key={card.title} className="panel flex flex-col p-6 sm:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/8 text-primary">
                <card.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-foreground">{card.title}</h3>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {card.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="min-w-0">{p}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-7 w-full sm:w-auto">
                <Link to={card.to}>
                  {card.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* MATCHING ENGINE */}
      <section className="border-y border-border bg-surface/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Core feature
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
              Smart Matching Engine
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every requirement is scored against live listings using a transparent weighted model, so
              you always know why a provider ranks where it does.
            </p>
            <ul className="mt-6 grid gap-3">
              {[
                ["Availability", "30%"],
                ["Distance", "25%"],
                ["Price", "20%"],
                ["Quantity compatibility", "15%"],
                ["Rating", "10%"],
              ].map(([label, weight]) => (
                <li
                  key={label}
                  className="flex items-center justify-between gap-3 panel px-4 py-3 text-sm"
                >
                  <span className="min-w-0 truncate text-muted-foreground">{label}</span>
                  <span className="shrink-0 font-bold text-primary tabular-nums">{weight}</span>
                </li>
              ))}
            </ul>
          </div>
          <MatchMeter
            breakdown={featuredListing.match}
            explanation="This resource matches your requested quantity and availability, is nearby and fits your budget."
          />
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          Everything a resource exchange needs
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, t: "AI-assisted search", d: "Describe the requirement in plain language and get structured search parameters." },
            { icon: MapPinned, t: "Google Maps discovery", d: "Provider markers, distance and travel context on a dark-themed map." },
            { icon: Handshake, t: "Request & negotiation", d: "Structured B2B offers, counter-offers and a full transaction timeline." },
            { icon: ShieldCheck, t: "Conflict-free booking", d: "Live availability calendars prevent double booking and overlaps." },
            { icon: TrendingUp, t: "Utilization analytics", d: "See what earns, what idles and where demand is rising." },
            { icon: Layers, t: "Multi-category inventory", d: "Seating, tables, AV, parking, kitchens, vehicles and venues." },
            { icon: BadgeCheck, t: "Verified businesses", d: "Verification badges and ratings from completed exchanges." },
            { icon: CalendarCheck, t: "Fulfilment tracking", d: "Request → booking → fulfilment tracked end to end." },
          ].map((f) => (
            <div key={f.t} className="panel p-5 transition-colors hover:border-primary/35">
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-sm font-bold text-foreground">{f.t}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL MESSAGE */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 grid-backdrop opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Resources are everywhere.
            <br />
            <span className="text-gradient-accent">Finding the right one shouldn't be difficult.</span>
          </h2>
          <Button asChild size="lg" className="mt-8">
            <Link to="/search">
              Start with ResourceX <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
