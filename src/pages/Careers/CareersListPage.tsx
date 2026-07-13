import { Link } from "react-router-dom";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import { Tag } from "../../components/ui/Tag";
import { CtaBanner } from "../../components/ui/CtaBanner";
import jobsData from "../../content/jobs.json";
import { JOB_ICONS } from "../../lib/jobIcons";
import type { Job } from "../../types/content";
import servicesStyles from "../Services/ServicesPage.module.css";
import styles from "./CareersListPage.module.css";

const jobs = jobsData as Job[];

export function CareersListPage() {
  return (
    <>
      <Meta
        title="Careers"
        description="Open positions at Devsloop — join a small team building software for startups and enterprises."
      />
      <Section>
        <div className={servicesStyles.header}>
          <h1 className={servicesStyles.title}>Join Our Team</h1>
          <p className={servicesStyles.subtitle}>
            We are always looking for passionate and talented people to join us.
          </p>
        </div>

        {jobs.length === 0 ? (
          <p className={servicesStyles.subtitle}>
            No open positions right now — check back soon, or reach out anyway via our{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        ) : (
          <div className={styles.list}>
            {jobs.map((job) => {
              const Icon = JOB_ICONS[job.slug];
              return (
                <article className={styles.row} key={job.slug}>
                  <div className={styles.rowIcon} aria-hidden="true">
                    {Icon && <Icon size={22} />}
                  </div>

                  <div className={styles.rowInfo}>
                    <div className={styles.rowTop}>
                      <h2 className={styles.rowTitle}>{job.title}</h2>
                      <span className={styles.rowMeta}>
                        {job.department} &middot; {job.type} &middot; {job.location}
                      </span>
                    </div>
                    <p className={styles.rowSummary}>{job.summary}</p>
                    <div className={styles.rowStack}>
                      {job.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </div>

                  <Button to={`/careers/${job.slug}`} className={styles.rowButton}>
                    View Job
                  </Button>
                </article>
              );
            })}
          </div>
        )}

        <div className={styles.ctaRow}>
          <CtaBanner
            title="Don't see a role for you?"
            subtitle="Send us your resume and we'll keep you in mind."
            buttonLabel="Send Application"
            buttonTo="/contact"
          />
        </div>
      </Section>
    </>
  );
}
