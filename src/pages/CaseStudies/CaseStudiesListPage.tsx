import { useMemo, useState } from "react";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { Card } from "../../components/ui/Card";
import { FilterTabs } from "../../components/ui/FilterTabs";
import { CASE_STUDY_IMAGES } from "../../lib/caseStudyImages";
import caseStudiesData from "../../content/caseStudies.json";
import type { CaseStudy } from "../../types/content";
import styles from "../Services/ServicesPage.module.css";

const caseStudies = caseStudiesData as CaseStudy[];
const CATEGORIES = ["All", "Web Applications", "Mobile Apps", "SaaS", "Systems"];

export function CaseStudiesListPage() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? caseStudies : caseStudies.filter((cs) => cs.category === category)),
    [category]
  );

  return (
    <>
      <Meta
        title="Case Studies"
        description="Real projects Devsloop has shipped for startups and enterprises — problem, solution, tech stack, and results."
      />
      <Section>
        <div className={styles.header}>
          <h1 className={styles.title}>Case Studies</h1>
          <p className={styles.subtitle}>
            Explore how we've helped our clients solve problems and achieve their business goals.
          </p>
        </div>

        <FilterTabs options={CATEGORIES} active={category} onChange={setCategory} />

        {filtered.length === 0 ? (
          <p className={styles.subtitle}>No case studies in this category yet.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((cs) => (
              <Card
                key={cs.slug}
                to={`/case-studies/${cs.slug}`}
                title={cs.title}
                excerpt={cs.summary}
                tag={cs.tag}
                image={CASE_STUDY_IMAGES[cs.slug]}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
