import type { NewsInput } from "@/types/cms";

export type SampleNewsItem = NewsInput & { slug: string };

export const SAMPLE_NEWS: SampleNewsItem[] = [
  {
    slug: "fungoni-grievance-mechanism-launched",
    title: "Fungoni grievance mechanism launched after 18 months of dialogue",
    publishedAt: "2026-04-15T09:00:00.000Z",
    excerpt:
      "After more than a year of community dialogue, the Fungoni Mineral Sands project formally adopted a grievance mechanism co-designed with affected residents — resolving 106 of 122 cases within three months.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1800&auto=format&fit=crop",
      alt: "Community workshop session in Pwani Region",
    },
    body: `## A long road from confrontation

When UTU JAMII first arrived at Fungoni in 2024, sentiment toward the mining operation had reached a low point. Two villages had organised separate protests, and a regional radio station was broadcasting weekly grievance segments.

Eighteen months later, both villages have signed a mutual cooperation memorandum with the operator, and grievances now flow through a single, transparent mechanism with quarterly community review.

## How it was built

We facilitated 11 dialogue rounds across the two villages. The mechanism's design — including its escalation thresholds and women's representation requirements — emerged directly from those sessions.

## Outcome

Of 122 grievances raised in the mechanism's first quarter, 106 were resolved within three months. The remaining 16 are in active mediation, with documented next steps and resolution dates.`,
  },
  {
    slug: "geita-women-leadership-cohort-3-graduates",
    title: "Geita Women's Leadership Programme graduates third cohort",
    publishedAt: "2026-03-08T10:00:00.000Z",
    excerpt:
      "Sixty women from villages around the Geita Gold Mining concession completed our flagship leadership programme, joining alumni now serving on every operating community committee.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1800&auto=format&fit=crop",
      alt: "Women in a community leadership session",
    },
    body: `## A milestone, not a destination

Three cohorts. Two hundred graduates. Every operating committee in the area now has mandatory women's representation — and grievance reporting has tripled, a sign that confidence in being heard has returned.

The third cohort graduated on International Women's Day in a ceremony attended by community elders, mine representatives, and regional government officials.

## What changes from here

Cohort 3 alumnae step into peer-mentor roles for the upcoming Cohort 4 in October 2026, completing a hand-off model that we've been building toward since the programme began.`,
  },
  {
    slug: "mwadui-resettlement-completed",
    title: "Mwadui resettlement completes ahead of schedule",
    publishedAt: "2026-02-20T08:30:00.000Z",
    excerpt:
      "Two hundred and forty households moved into new homes in line with IFC Performance Standard 5, two months ahead of the original timeline — without a single grievance escalation.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1800&auto=format&fit=crop",
      alt: "Community gathering in Shinyanga Region",
    },
    body: `## Built on consent

The Mwadui resettlement was a stress test of every principle we hold: free prior informed consent, transparent compensation, ongoing community voice, and adherence to international standards.

Working alongside Petra Diamonds and the regional administration, we facilitated 240 household relocations from a stalled position to completion — two months early.

## What enabled it

A participatory engagement plan with stakeholder mapping ahead of any compensation discussion. Public sessions where individual households could compare offers. And a dispute panel with rotating community representatives that handled every concern in under 14 days.

The result speaks for itself: zero grievance escalations to the regulator. Project momentum recovered. Trust intact.`,
  },
];
