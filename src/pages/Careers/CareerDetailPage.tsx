import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineClipboardDocumentList,
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineDocumentText,
  HiOutlineCodeBracket,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import { ApplicationForm } from "../../components/forms/ApplicationForm";
import jobsData from "../../content/jobs.json";
import type { Job } from "../../types/content";
import notFoundStyles from "../shared/DetailPage.module.css";
import styles from "./CareerDetailPage.module.css";

const jobs = jobsData as Job[];

const PERKS = [
  {
    icon: HiOutlineSquares2X2,
    title: "Impactful Work",
    text: "Work on meaningful projects that solve real business problems.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Great Culture",
    text: "Collaborative team, open communication and continuous learning.",
  },
  {
    icon: HiOutlineHeart,
    title: "Growth & Learning",
    text: "Career growth, mentorship and access to the latest technologies.",
  },
];

const HIRING_STEPS = [
  { icon: HiOutlineDocumentText, title: "1. Apply", description: "Submit your application and resume." },
  { icon: HiOutlineUserGroup, title: "2. Interview", description: "We'll review your application and invite you for a chat." },
  { icon: HiOutlineCodeBracket, title: "3. Assignment", description: "A short assignment to help us understand your skills." },
  { icon: HiOutlineCheckBadge, title: "4. Welcome Aboard", description: "Join our team and build amazing things together." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const revealProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
} as const;

export function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <>
        <Meta title="Position Not Found" description="This job listing could not be found." />
        <Section>
          <div className={notFoundStyles.notFound}>
            <h1 className={notFoundStyles.title}>Position not found</h1>
            <p>We couldn't find the job listing you're looking for.</p>
            <Button to="/careers">Back to Careers</Button>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <Meta title={job.title} description={job.summary} />
      <div className={styles.page}>
        <div className={styles.container}>
          <Link to="/careers" className={styles.back}>
            &larr; Back to Careers
          </Link>

          <div className={styles.grid}>
            <motion.div
              className={styles.main}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.eyebrow}>{job.department}</span>
              <h1 className={styles.title}>{job.title}</h1>

              <div className={styles.badgeRow}>
                <span className={styles.badge}>
                  <HiOutlineBriefcase size={14} aria-hidden="true" />
                  {job.type}
                </span>
                <span className={styles.badgeMuted}>{job.location}</span>
              </div>

              <p className={styles.summary}>{job.summary}</p>

              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}>
                    <HiOutlineClipboardDocumentList size={18} />
                  </span>
                  <h2 className={styles.sectionTitle}>Responsibilities</h2>
                </div>
                <ul className={styles.list}>
                  {job.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}>
                    <HiOutlineUser size={18} />
                  </span>
                  <h2 className={styles.sectionTitle}>Requirements</h2>
                </div>
                <ul className={styles.list}>
                  {job.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <motion.div className={styles.perksCard} {...revealProps} variants={stagger}>
                <div className={styles.perksHeader}>
                  <span className={styles.perksIcon}>
                    <HiOutlineStar size={18} />
                  </span>
                  <h2 className={styles.sectionTitle}>Why join us?</h2>
                </div>
                <div className={styles.perksGrid}>
                  {PERKS.map((perk) => (
                    <motion.div className={styles.perkItem} key={perk.title} variants={fadeUp}>
                      <div className={styles.perkTop}>
                        <perk.icon size={16} className={styles.perkIcon} aria-hidden="true" />
                        <span className={styles.perkTitle}>{perk.title}</span>
                      </div>
                      <p className={styles.perkText}>{perk.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.aside
              className={styles.sidebar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.applyCard}>
                <h2 className={styles.applyTitle}>Apply for this Position</h2>
                <span className={styles.applyUnderline} aria-hidden="true" />
                <ApplicationForm jobTitle={job.title} />
              </div>
            </motion.aside>
          </div>

          <motion.div className={styles.expectCard} {...revealProps} variants={fadeUp}>
            <h2 className={styles.expectTitle}>What to Expect</h2>
            <span className={styles.expectUnderline} aria-hidden="true" />
            <motion.div className={styles.stepsRow} variants={stagger} {...revealProps}>
              {HIRING_STEPS.map((step, i) => (
                <motion.div className={styles.step} key={step.title} variants={fadeUp}>
                  <div className={styles.stepIconWrap}>
                    <step.icon size={18} />
                  </div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepDescription}>{step.description}</div>
                  {i < HIRING_STEPS.length - 1 && <span className={styles.stepLine} aria-hidden="true" />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
