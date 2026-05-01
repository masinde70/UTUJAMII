import type { ProjectInput } from "@/types/cms";

export type SampleProject = ProjectInput & {
  slug: string;
  location: string;
  sector: string;
};

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    slug: "fungoni-mineral-sands",
    title: "Fungoni Mineral Sands",
    client: "Strandline Resources",
    summary:
      "When mistrust ran high between the company and the village, our team arrived, listened, and built the bridge. Women's training, grievance committees, and a dignified pathway back to partnership.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1800&auto=format&fit=crop",
      alt: "Community workshop participants gathered around a table",
    },
    body: `## Background

Tensions had built up over months between the mining company and the community of Fungoni in Pwani Region. Our team was brought in to mediate.

## Approach

We facilitated open dialogue sessions, established a community grievance mechanism, and ran a women's training programme on rights and entrepreneurship.

## Outcome

Of 122 grievances raised, 106 were resolved within three months. The relationship between company and community moved from confrontation to ongoing partnership.`,
    impactMetrics: [
      { label: "Grievances resolved", value: "106 of 122" },
      { label: "Resolution timeframe", value: "3 months" },
      { label: "Women trained", value: "50+" },
    ],
    location: "Pwani Region, Tanzania",
    sector: "Mining",
  },
  {
    slug: "mwadui-resettlement",
    title: "Mwadui Resettlement",
    client: "Petra Diamonds",
    summary:
      "Strained relations, complex social dynamics, and a project at risk. We became the bridge — facilitating workshops, smoothing communication, and weaving threads of understanding between stakeholders and community.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1800&auto=format&fit=crop",
      alt: "Gathering of community members in discussion",
    },
    body: `## Background

A long-standing diamond mining operation in Shinyanga Region required resettlement of nearby households. Project momentum had stalled amid mistrust.

## Approach

Our team designed a participatory engagement plan: stakeholder mapping, dialogue workshops, and a transparent compensation framework aligned with IFC Performance Standards.

## Outcome

Resettlement proceeded with community consent. Mediation kept the project on schedule and within social risk thresholds.`,
    impactMetrics: [
      { label: "Households engaged", value: "240+" },
      { label: "Standards framework", value: "IFC PS 5" },
    ],
    location: "Shinyanga Region, Tanzania",
    sector: "Infrastructure",
  },
  {
    slug: "womens-leadership-programme",
    title: "Women's Leadership Programme",
    client: "Geita Gold Mining",
    summary:
      "Training women to speak up, to lead committees, to stand as a shield against violence. What began as grievance resolution became a programme of courage — and a community more unified than before.",
    mainImage: {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1800&auto=format&fit=crop",
      alt: "Women leading a community session",
    },
    body: `## Background

Patterns of gender-based violence and exclusion from decision-making had emerged in communities surrounding mining operations in Geita Region.

## Approach

We designed a leadership and rights-awareness programme delivered to cohorts of women, paired with the establishment of community committees with mandatory women's representation.

## Outcome

Three cohorts completed the programme. Women now sit on every operating community committee, and grievance reporting has tripled — a sign of restored confidence in being heard.`,
    impactMetrics: [
      { label: "Women trained", value: "10,000+" },
      { label: "Cohorts delivered", value: "3" },
      { label: "Community committees", value: "Mandatory women's seats" },
    ],
    location: "Geita Region, Tanzania",
    sector: "Training & Facilitation",
  },
];
