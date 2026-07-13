import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  HiArrowRight,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineIdentification,
  HiOutlineSquares2X2,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineDevicePhoneMobile,
  HiUser,
  HiStar,
  HiOutlineRocketLaunch,
  HiOutlineExclamationTriangle,
  HiOutlineLightBulb,
} from "react-icons/hi2";
import { DashboardMockup } from "../../components/ui/DashboardMockup";
import { METRIC_ICONS, PROCESS_ICONS, TECH_BADGE_ICONS } from "../../lib/caseStudyDetailIcons";
import { getCaseStudyDetailModel } from "../../lib/caseStudyDetailModel";
import caseStudiesData from "../../content/caseStudies.json";
import type { CaseStudy } from "../../types/content";
import styles from "./CaseStudyRichDetail.module.css";

const allCaseStudies = caseStudiesData as CaseStudy[];

const OVERVIEW_ICONS = {
  Client: HiOutlineIdentification,
  Industry: HiOutlineSquares2X2,
  Year: HiOutlineCalendarDays,
  Timeline: HiOutlineClock,
  "Team Size": HiOutlineUserGroup,
  "Project Type": HiOutlineDevicePhoneMobile,
} as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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

export function CaseStudyRichDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  const model = getCaseStudyDetailModel(caseStudy, allCaseStudies);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/case-studies" className={styles.back}>
          &larr; Back to Case Studies
        </Link>

        <div className={styles.hero}>
          <motion.div
            className={styles.heroLeft}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.badge}>{model.categoryBadge}</span>
            <h1 className={styles.title}>
              {model.titleLines.first}
              {model.titleLines.second && (
                <>
                  <br />
                  <span className={styles.titleAccent}>{model.titleLines.second}</span>
                </>
              )}
            </h1>
            <p className={styles.description}>{model.description}</p>

            <div className={styles.heroOverviewGrid}>
              {model.overview.map((item) => {
                const Icon = OVERVIEW_ICONS[item.label];
                return (
                  <div className={styles.heroOverviewItem} key={item.label}>
                    <span className={styles.overviewIcon}>
                      <Icon size={16} />
                    </span>
                    <div className={styles.overviewText}>
                      <div className={styles.overviewLabel}>{item.label}</div>
                      <div className={styles.overviewValue}>{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.heroTechBlock}>
              <div className={styles.heroTechLabel}>Technologies</div>
              <div className={styles.heroTechRow}>
                {caseStudy.techStack.map((tech) => {
                  const badge = TECH_BADGE_ICONS[tech];
                  const TechIcon = badge?.icon;
                  return (
                    <span className={styles.heroTechChip} key={tech}>
                      {TechIcon && <TechIcon size={14} style={{ color: badge?.color }} />}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className={styles.heroActions}>
              {model.liveUrl ? (
                <a href={model.liveUrl} className={styles.primaryBtn} target="_blank" rel="noopener noreferrer">
                  View Live App
                  <HiArrowRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <Link to="/case-studies" className={styles.primaryBtn}>
                  View Live App
                  <HiArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
              <Link to="/contact" className={styles.secondaryBtn}>
                Contact Us
                <HiArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroRight}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.heroImageGlow} aria-hidden="true" />
            <div className={styles.heroImageFrame}>
              <DashboardMockup size="hero" />
            </div>
          </motion.div>
        </div>

        <motion.div className={styles.problemSolutionGrid} {...revealProps} variants={stagger}>
          <motion.div className={`${styles.psCard} ${styles.psCardProblem}`} variants={fadeUp}>
            <div className={styles.psHeader}>
              <span className={`${styles.psIcon} ${styles.psIconProblem}`}>
                <HiOutlineExclamationTriangle size={18} />
              </span>
              <h2 className={styles.psTitle}>The Problem</h2>
            </div>
            <p className={styles.psText}>{caseStudy.problem}</p>
            {model.challenges.length > 0 && (
              <>
                <div className={styles.psSubhead}>Challenges</div>
                <ul className={styles.checkList}>
                  {model.challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>

          <motion.div className={`${styles.psCard} ${styles.psCardSolution}`} variants={fadeUp}>
            <div className={styles.psHeader}>
              <span className={`${styles.psIcon} ${styles.psIconSolution}`}>
                <HiOutlineLightBulb size={18} />
              </span>
              <h2 className={styles.psTitle}>The Solution</h2>
            </div>
            <p className={styles.psText}>{caseStudy.solution}</p>
            {model.approach.length > 0 && (
              <>
                <div className={styles.psSubhead}>Our Approach</div>
                <ul className={styles.checkList}>
                  {model.approach.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </motion.div>

        <motion.div className={styles.sectionBlock} {...revealProps} variants={fadeUp}>
          <h2 className={styles.sectionHeading}>Project Screenshots</h2>
          <div className={styles.galleryGrid}>
            <div className={`${styles.galleryItem} ${styles.galleryDesktop}`}>
              <div className={styles.galleryFrame}>
                <DashboardMockup size="desktop" />
              </div>
              <div className={styles.galleryCaption}>Desktop View</div>
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryTablet}`}>
              <div className={styles.galleryFrame}>
                <DashboardMockup size="tablet" />
              </div>
              <div className={styles.galleryCaption}>Tablet View</div>
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryMobile}`}>
              <div className={styles.galleryFrame}>
                <DashboardMockup size="mobile" />
              </div>
              <div className={styles.galleryCaption}>Mobile View</div>
            </div>
          </div>
        </motion.div>

        <div className={styles.sectionBlock}>
          <h2 className={styles.sectionHeading}>Technology Stack</h2>
          <motion.div className={styles.techGrid} {...revealProps} variants={stagger}>
            {caseStudy.techStack.map((tech) => {
              const badge = TECH_BADGE_ICONS[tech];
              const TechIcon = badge?.icon;
              return (
                <motion.div className={styles.techCard} key={tech} variants={fadeUp}>
                  <span className={styles.techIcon} style={{ color: badge?.color }}>
                    {TechIcon && <TechIcon size={20} />}
                  </span>
                  <div className={styles.techTextBlock}>
                    <div className={styles.techName}>{tech}</div>
                    <div className={styles.techSubtitle}>{badge?.subtitle ?? "Technology"}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className={styles.sectionBlock}>
          <h2 className={styles.sectionHeading}>Project Results</h2>
          <motion.div className={styles.metricGrid} {...revealProps} variants={stagger}>
            {model.kpis.map((kpi, i) => {
              const MetricIcon = METRIC_ICONS[kpi.icon] ?? METRIC_ICONS.cycle;
              const TrendIcon = kpi.trend === "up" ? HiOutlineArrowTrendingUp : HiOutlineArrowTrendingDown;
              return (
                <motion.div className={styles.metricCard} key={i} variants={fadeUp}>
                  <div className={styles.metricTop}>
                    <span className={styles.metricIcon}>
                      <MetricIcon size={16} />
                    </span>
                    <span className={styles.metricTrend}>
                      <TrendIcon size={13} />
                    </span>
                  </div>
                  {kpi.value ? (
                    <>
                      <div className={styles.metricValue}>{kpi.value}</div>
                      <div className={styles.metricCaption}>{kpi.caption}</div>
                    </>
                  ) : (
                    <div className={styles.metricTextOnly}>{kpi.caption}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div className={styles.sectionBlock} {...revealProps} variants={fadeUp}>
          <h2 className={styles.sectionHeading}>Our Development Process</h2>
          <motion.div className={styles.processRow} variants={stagger} {...revealProps}>
            {model.process.map((step, i) => {
              const StepIcon = PROCESS_ICONS[step.icon] ?? PROCESS_ICONS.research;
              return (
                <motion.div className={styles.processStep} key={step.title} variants={fadeUp}>
                  <div className={styles.processIconWrap}>
                    <StepIcon size={18} />
                  </div>
                  <div className={styles.processTitle}>{step.title}</div>
                  <div className={styles.processDescription}>{step.description}</div>
                  {i < model.process.length - 1 && <span className={styles.processLine} aria-hidden="true" />}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {model.testimonial && (
          <motion.div className={styles.testimonialCard} {...revealProps} variants={fadeUp}>
            <div className={styles.testimonialStars} aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <HiStar key={i} size={16} />
              ))}
            </div>
            <div className={styles.testimonialRow}>
              <div className={styles.testimonialQuoteBlock}>
                <span className={styles.testimonialQuoteMark} aria-hidden="true">
                  &ldquo;
                </span>
                <p className={styles.testimonialQuote}>{model.testimonial.quote}</p>
              </div>

              <div className={styles.testimonialAuthorBlock}>
                <span className={styles.testimonialAvatar} aria-hidden="true">
                  <HiUser size={22} />
                </span>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialName}>{model.testimonial.authorName}</div>
                  <div className={styles.testimonialRole}>{model.testimonial.authorRole}</div>
                </div>
              </div>

              <span className={styles.testimonialCompany}>
                <span className={styles.testimonialCompanyMark} aria-hidden="true" />
                {model.testimonial.companyName}
              </span>
            </div>
          </motion.div>
        )}

        {model.related.length > 0 && (
          <motion.div className={styles.sectionBlock} {...revealProps} variants={fadeUp}>
            <div className={styles.galleryHeader}>
              <h2 className={styles.sectionHeading}>Related Projects</h2>
              <Link to="/case-studies" className={styles.viewAllLink}>
                View All Projects
                <HiArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <motion.div className={styles.relatedGrid} variants={stagger} {...revealProps}>
              {model.related.map((project) => (
                <motion.div key={project.slug} variants={fadeUp}>
                  <Link to={`/case-studies/${project.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedThumb} aria-hidden="true">
                      <DashboardMockup size="tablet" />
                    </div>
                    <div className={styles.relatedTitle}>{project.title}</div>
                    <div className={styles.relatedDescription}>{project.description}</div>
                    <span className={styles.relatedLink}>
                      View Case Study
                      <HiArrowRight size={13} aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        <motion.div className={styles.ctaBlock} {...revealProps} variants={fadeUp}>
          <div className={styles.ctaIcon}>
            <HiOutlineRocketLaunch size={24} />
          </div>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Ready to build something similar?</h2>
            <p className={styles.ctaSubtitle}>Let's create a powerful solution that drives your business forward.</p>
          </div>
          <Link to="/contact" className={styles.ctaButton}>
            Start Your Project
            <HiArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
