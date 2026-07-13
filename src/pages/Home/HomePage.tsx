import {
  HiOutlineUserGroup,
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiStar,
} from "react-icons/hi2";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ServiceMiniCard } from "../../components/ui/ServiceMiniCard";
import { CtaBanner } from "../../components/ui/CtaBanner";
import { SERVICE_ICONS } from "../../lib/serviceIcons";
import { CASE_STUDY_IMAGES } from "../../lib/caseStudyImages";
import servicesData from "../../content/services.json";
import caseStudiesData from "../../content/caseStudies.json";
import testimonialsData from "../../content/testimonials.json";
import type { Service, CaseStudy, Testimonial } from "../../types/content";
import heroImage from "../../assets/hero-team.jpg";
import styles from "./HomePage.module.css";

const services = servicesData as Service[];
const featuredCaseStudies = (caseStudiesData as CaseStudy[]).slice(0, 4);
const testimonials = testimonialsData as Testimonial[];

const FEATURES = [
  { icon: HiOutlineUserGroup, title: "Client Focused", subtitle: "We partner with you" },
  { icon: HiOutlineArrowPath, title: "Agile Approach", subtitle: "Flexible and iterative" },
  { icon: HiOutlineShieldCheck, title: "Quality First", subtitle: "Clean, tested, reliable" },
  { icon: HiOutlineClock, title: "On-Time Delivery", subtitle: "We respect deadlines" },
];

export function HomePage() {
  return (
    <>
      <Meta
        title="Software House for Startups & Enterprises"
        description="Devsloop designs, builds, and ships reliable web and mobile products — from MVPs to enterprise platforms."
      />

      <Section tight fullBleed>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroDots} aria-hidden="true" />
            <h1 className={styles.heroTitle}>
              We Build Digital Products That Drive Business Forward
            </h1>
            <p className={styles.heroSubtitle}>
              Devsloop is a software development company focused on building scalable, secure and
              user-friendly web and mobile applications.
            </p>
            <div className={styles.heroActions}>
              <Button to="/services">Our Services</Button>
              <Button to="/case-studies" variant="outlineOnDark">
                View Case Studies
              </Button>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Devsloop team collaborating around a laptop in the office"
            className={styles.heroBg}
          />
        </div>
      </Section>

      <Section alt tight>
        <div className={styles.features}>
          {FEATURES.map((feature) => (
            <div className={styles.feature} key={feature.title}>
              <feature.icon size={22} color="var(--color-primary)" aria-hidden="true" />
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>{feature.title}</div>
                <div className={styles.featureSubtitle}>{feature.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className={styles.whatWeDo}>
          <div className={styles.whatWeDoText}>
            <h2 className={styles.whatWeDoTitle}>
              End-to-end software solutions for modern businesses
            </h2>
            <p className={styles.whatWeDoParagraph}>
              From strategy and design to development and support, we help companies of all sizes
              build digital experiences that users love and businesses rely on.
            </p>
            <Button to="/services">Explore Services</Button>
          </div>
          <div className={styles.miniGrid}>
            {services.map((service) => (
              <ServiceMiniCard
                key={service.slug}
                icon={SERVICE_ICONS[service.icon]}
                title={service.title}
                summary={service.summary}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section alt>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Case studies</h2>
          </div>
          <Button to="/case-studies" variant="outline">
            View all cases
          </Button>
        </div>
        <div className={styles.caseStudyGrid}>
          {featuredCaseStudies.map((cs) => (
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
      </Section>

      <Section>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>What Clients Say</h2>
          </div>
        </div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((t) => (
            <div className={styles.testimonialCard} key={t.author}>
              <div className={styles.testimonialTop}>
                <span className={styles.quoteMark} aria-hidden="true">
                  &ldquo;
                </span>
                <div className={styles.stars} role="img" aria-label="Rated 5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <HiStar key={i} size={16} aria-hidden="true" />
                  ))}
                </div>
              </div>
              <p className={styles.testimonialQuote}>{t.quote}</p>
              <div className={styles.testimonialFooter}>
                <span className={styles.testimonialAvatar} aria-hidden="true">
                  {t.author
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <div className={styles.testimonialAuthor}>{t.author}</div>
                  <div className={styles.testimonialRole}>
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <CtaBanner
          title="Have a project in mind?"
          subtitle="Let's build something great together."
          buttonLabel="Get in Touch"
          buttonTo="/contact"
        />
      </Section>
    </>
  );
}
