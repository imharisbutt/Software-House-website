import type { CaseStudy } from "../types/content";
import testimonialsData from "../content/testimonials.json";

export interface OverviewItem {
  label: "Client" | "Industry" | "Year" | "Timeline" | "Team Size" | "Project Type";
  value: string;
}

export interface TitleLines {
  first: string;
  second: string | null;
}

export interface KpiCard {
  icon: string;
  trend: "up" | "down";
  value: string | null;
  caption: string;
}

export interface ProcessStepModel {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialModel {
  quote: string;
  authorName: string;
  authorRole: string;
  companyName: string;
}

export interface RelatedProjectModel {
  slug: string;
  title: string;
  description: string;
}

export interface CaseStudyDetailModel {
  categoryBadge: string;
  titleLines: TitleLines;
  description: string;
  overview: OverviewItem[];
  challenges: string[];
  approach: string[];
  kpis: KpiCard[];
  process: ProcessStepModel[];
  testimonial: TestimonialModel | null;
  related: RelatedProjectModel[];
  liveUrl?: string;
}

const DEFAULT_PROCESS: ProcessStepModel[] = [
  { icon: "research", title: "Research", description: "Understanding business needs and workflows" },
  { icon: "design", title: "Design", description: "UI/UX design and system architecture" },
  { icon: "development", title: "Development", description: "Agile development and implementation" },
  { icon: "testing", title: "Testing", description: "Quality assurance and performance testing" },
  { icon: "launch", title: "Launch", description: "Deployment and ongoing support" },
];

const KPI_ICON_CYCLE = ["shield", "bolt", "cycle", "users"];
const TREND_DOWN_RE = /\b(?:drop|reduc|cut|fewer|less|decrease|lower)\w*/i;
const RANGE_RE =
  /(\d[\d.,]*[%x]?\+?(?:\s+[a-zA-Z]+)?)\s+(?:→|->|to)\s+(?:under\s+|over\s+|about\s+)?(\d[\d.,]*[%x]?\+?(?:\s+[a-zA-Z]+)?)/i;
const PERCENT_RE = /\d[\d.,]*\s?%/;
const NUMBER_RE = /\d[\d,.]*\s?(?:%|x|\+)?/i;

function titleCaseUnits(text: string): string {
  return text.replace(/[a-zA-Z]+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

function extractKpiValue(text: string): string | null {
  const rangeMatch = text.match(RANGE_RE);
  if (rangeMatch) {
    return `${titleCaseUnits(rangeMatch[1].trim())} → ${titleCaseUnits(rangeMatch[2].trim())}`;
  }

  const percentMatch = text.match(PERCENT_RE);
  if (percentMatch && percentMatch.index !== undefined) {
    const preceding = text.slice(Math.max(0, percentMatch.index - 8), percentMatch.index);
    const suffix = /\bover\b/i.test(preceding) ? "+" : "";
    return `${percentMatch[0].trim()}${suffix}`;
  }

  const numberMatch = text.match(NUMBER_RE);
  if (numberMatch) {
    const suffix = /\bstar/i.test(text) ? "★" : "";
    return `${numberMatch[0].trim()}${suffix}`;
  }

  return null;
}

function synthesizeKpis(results: string[]): KpiCard[] {
  return results.map((text, i) => ({
    icon: KPI_ICON_CYCLE[i % KPI_ICON_CYCLE.length],
    trend: TREND_DOWN_RE.test(text) ? "down" : "up",
    value: extractKpiValue(text),
    caption: text,
  }));
}

function findTestimonial(client: string): TestimonialModel | null {
  const list = testimonialsData as { quote: string; author: string; role: string; company: string }[];
  const clientLower = client.toLowerCase();
  const match = list.find(
    (t) => t.company.toLowerCase().includes(clientLower) || clientLower.includes(t.company.toLowerCase())
  );
  if (!match) return null;
  return {
    quote: match.quote,
    authorName: match.author,
    authorRole: match.role,
    companyName: match.company,
  };
}

function splitTitle(title: string, client: string): TitleLines {
  const clientLower = client.toLowerCase();
  const titleLower = title.toLowerCase();
  if (titleLower.startsWith(clientLower)) {
    const remainder = title.slice(client.length).trim();
    if (remainder) {
      return { first: title.slice(0, client.length), second: remainder };
    }
  }
  return { first: title, second: null };
}

function buildRelated(caseStudy: CaseStudy, all: CaseStudy[]): RelatedProjectModel[] {
  return all
    .filter((cs) => cs.slug !== caseStudy.slug)
    .sort((a, b) => Number(b.category === caseStudy.category) - Number(a.category === caseStudy.category))
    .slice(0, 3)
    .map((cs) => ({ slug: cs.slug, title: cs.title, description: cs.summary }));
}

export function getCaseStudyDetailModel(caseStudy: CaseStudy, allCaseStudies: CaseStudy[]): CaseStudyDetailModel {
  const detail = caseStudy.detail;
  const meta = detail?.meta ?? caseStudy.projectMeta;
  const industry = caseStudy.industry ?? caseStudy.category;

  const overview: OverviewItem[] = [
    { label: "Client", value: caseStudy.client },
    { label: "Industry", value: industry },
    ...(meta?.year ? [{ label: "Year" as const, value: meta.year }] : []),
    ...(meta?.duration ? [{ label: "Timeline" as const, value: meta.duration }] : []),
    ...(meta?.teamSize ? [{ label: "Team Size" as const, value: meta.teamSize }] : []),
    { label: "Project Type", value: caseStudy.tag },
  ];

  const kpis: KpiCard[] = detail
    ? detail.metrics.map((m) => ({ icon: m.icon, trend: m.trend, value: m.value, caption: m.label }))
    : synthesizeKpis(caseStudy.results);

  return {
    categoryBadge: `${industry} • ${caseStudy.tag}`,
    titleLines: splitTitle(caseStudy.title, caseStudy.client),
    description: detail?.description ?? caseStudy.summary,
    overview,
    challenges: detail?.challenges ?? [],
    approach: detail?.approach ?? [],
    kpis,
    process: detail?.process ?? DEFAULT_PROCESS,
    testimonial: detail?.testimonial ?? findTestimonial(caseStudy.client),
    related: buildRelated(caseStudy, allCaseStudies),
    liveUrl: detail?.liveUrl,
  };
}
