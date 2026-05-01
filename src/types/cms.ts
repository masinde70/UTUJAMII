export interface CmsImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  client?: string;
  summary: string;
  mainImage?: CmsImage;
  gallery?: CmsImage[];
  body: string;
  impactMetrics?: ImpactMetric[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;

export interface News {
  id: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  mainImage?: CmsImage;
  gallery?: CmsImage[];
  body: string;
  createdAt: string;
  updatedAt: string;
}

export type NewsInput = Omit<News, "id" | "createdAt" | "updatedAt">;

export interface ValueItem {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  speciality?: string;
  bio: string;
  photo?: CmsImage;
}

export interface AboutPage {
  heading: string;
  intro: string;
  mission: string;
  vision: string;
  values: ValueItem[];
  team: TeamMember[];
  updatedAt: string;
}

export type AboutPageInput = Omit<AboutPage, "updatedAt">;

export interface PrincipleItem {
  title: string;
  body: string;
}

export interface ExpertiseService {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PartnerItem {
  name: string;
  url?: string;
  logo?: CmsImage;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  org: string;
  project: string;
  location: string;
}

export interface StatItem {
  end: number;
  suffix: string;
  label: string;
  caption: string;
}

export interface HomePage {
  heroLine1: string;
  heroLine2: string;
  heroConjunction: string;
  heroLine3: string;
  heroLine4: string;
  heroPlateCaption: string;
  trustBarLabel: string;
  trustBarSectors: string[];
  aboutHeading: string;
  aboutBody1: string;
  aboutBody2: string;
  aboutQuote: string;
  aboutPrinciples: PrincipleItem[];
  expertiseHeading: string;
  expertiseServices: ExpertiseService[];
  testimonials: TestimonialItem[];
  bannerHeadline1: string;
  bannerHeadline2: string;
  bannerQuote: string;
  bannerQuoteAttribution: string;
  stats: StatItem[];
  faqs: FaqItem[];
  partners: PartnerItem[];
  contactAddress: string;
  contactEmail: string;
  contactPhone: string;
  updatedAt: string;
}

export type HomePageInput = Omit<HomePage, "updatedAt">;

export interface ServicesPageService {
  number: string;
  title: string;
  targets: string;
  description: string;
  capabilities: string[];
}

export interface UniquenessItem {
  title: string;
  desc: string;
}

export interface ServicesPage {
  heroHeading: string;
  heroIntro: string;
  services: ServicesPageService[];
  sectorsHeading: string;
  sectors: string[];
  uniquenessHeading: string;
  uniquenessItems: UniquenessItem[];
  updatedAt: string;
}

export type ServicesPageInput = Omit<ServicesPage, "updatedAt">;
