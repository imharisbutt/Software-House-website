# Devsloop — Corporate Website

A marketing website for a software house: Home, Services, Case Studies, Blog, Careers, About, and Contact.

**Frontend-only.** This is a React + Vite single-page app with no backend, no CMS, and no deployment — it runs locally via `npm run dev`. Contact and job-application forms validate input and show real submitting/success states, but submissions only log to the browser console (see `src/lib/mockSubmit.ts`).

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

Other scripts:
- `npm run build` — type-checks and produces a production bundle in `dist/`
- `npm run preview` — serves the production build locally
- `npm run lint` — runs Oxlint

## Adding Content

All content lives as static JSON in `src/content/`, typed by `src/types/content.ts`. To add an item, add an object to the relevant array — no code changes needed elsewhere, since list and detail pages read from these files directly.

- **Case studies**: `src/content/caseStudies.json` — `category` must be `"Web Applications" | "Mobile Apps" | "SaaS" | "Systems"` (drives the filter tabs on the Case Studies page); reachable at `/case-studies/<slug>`.
- **Blog posts**: `src/content/blogPosts.json` — `body` is an array of paragraph strings; reachable at `/blog/<slug>`.
- **Job listings**: `src/content/jobs.json` — `type` must be `"Full-time" | "Part-time" | "Contract"`, `location` must be `"Remote" | "Hybrid" | "On-site"`, `stack` is a short list of technologies shown on the Careers list row; reachable at `/careers/<slug>`.
- **Services** and **testimonials**: `src/content/services.json`, `testimonials.json`.

## Project Structure

```
src/
  components/layout/   Navbar, Footer, page Layout
  components/ui/       Button, Card, Section, Tag, Meta, LogoMark, ServiceMiniCard,
                        CtaBanner, FilterTabs, ImagePlaceholder (stand-in for real photos)
  components/forms/    ContactForm, ApplicationForm, and their shared FormField/FormStatus
  pages/                One folder per route
  content/              Static JSON content (see above)
  types/content.ts       Shared content type definitions
  lib/                   validation.ts (field validators), mockSubmit.ts (fake submit handler),
                          serviceIcons.ts (icon lookup shared by Home + Services)
```

## Known Gaps (by design, for this phase)

This build intentionally does not include: server-side rendering/SEO (Next.js), a sitemap or server-rendered meta tags, real form delivery (email/database), resume file storage, a CMS, deployment/hosting, or analytics. See the project plan for the reasoning — these are candidates for a fast-follow phase once there's a backend to wire up.
