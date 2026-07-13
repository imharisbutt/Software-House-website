export interface Service {
  slug: string;
  title: string;
  summary: string;
  icon: string;
}

export type CaseStudyCategory = "Web Applications" | "Mobile Apps" | "SaaS" | "Systems";

export interface CaseStudyMetric {
  icon: string;
  trend: "up" | "down";
  label: string;
  value: string;
  caption: string;
}

export interface CaseStudyTechItem {
  icon: string;
  name: string;
  subtitle: string;
}

export interface CaseStudyProcessStep {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyTestimonialDetail {
  quote: string;
  authorName: string;
  authorRole: string;
  companyName: string;
}

export interface CaseStudyRelatedProject {
  title: string;
  description: string;
}

export interface CaseStudyDetail {
  categoryBadge: string;
  description: string;
  meta: { client: string; year: string; duration: string; teamSize: string };
  techBadges: string[];
  liveUrl?: string;
  challenges: string[];
  approach: string[];
  metrics: CaseStudyMetric[];
  techStackDetailed: CaseStudyTechItem[];
  process: CaseStudyProcessStep[];
  resultsImpact: CaseStudyMetric[];
  testimonial: CaseStudyTestimonialDetail;
  relatedProjects: CaseStudyRelatedProject[];
}

export interface CaseStudyProjectMeta {
  year: string;
  duration: string;
  teamSize: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  results: string[];
  category: CaseStudyCategory;
  tag: string;
  /** Business/vertical industry (e.g. "Healthcare", "Retail") — distinct from `category`, which is the product/platform filter used on the case studies list. */
  industry?: string;
  /** Lightweight project facts (year/duration/team size) for case studies without a full `detail` block. */
  projectMeta?: CaseStudyProjectMeta;
  /** Rich, premium detail-page content — only populated for showcase case studies. */
  detail?: CaseStudyDetail;
}

export interface BlogFeatureCard {
  icon: string;
  title: string;
  text: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  features?: BlogFeatureCard[];
}

/** Rich, premium detail-page content — only populated for showcase posts. */
export interface BlogPostDetail {
  authorBio: string;
  sections: BlogSection[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  body: string[];
  detail?: BlogPostDetail;
}

export type JobType = "Full-time" | "Part-time" | "Contract";
export type JobLocation = "Remote" | "Hybrid" | "On-site";

export interface Job {
  slug: string;
  title: string;
  department: string;
  type: JobType;
  location: JobLocation;
  stack: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
