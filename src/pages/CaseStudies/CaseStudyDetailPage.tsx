import { useParams } from "react-router-dom";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import { CaseStudyRichDetail } from "./CaseStudyRichDetail";
import caseStudiesData from "../../content/caseStudies.json";
import type { CaseStudy } from "../../types/content";
import styles from "../shared/DetailPage.module.css";

const caseStudies = caseStudiesData as CaseStudy[];

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return (
      <>
        <Meta title="Case Study Not Found" description="This case study could not be found." />
        <Section>
          <div className={styles.notFound}>
            <h1 className={styles.title}>Case study not found</h1>
            <p>We couldn't find the case study you're looking for.</p>
            <Button to="/case-studies">Back to Case Studies</Button>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <Meta title={caseStudy.title} description={caseStudy.summary} />
      <CaseStudyRichDetail caseStudy={caseStudy} />
    </>
  );
}
