import { HiOutlineRocketLaunch, HiOutlineEye, HiOutlineHeart } from "react-icons/hi2";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { CtaBanner } from "../../components/ui/CtaBanner";
import aboutTeam from "../../assets/about-team.svg";
import devsloopLogo from "../../assets/devsloop-logo.png";
import styles from "./AboutPage.module.css";

const VALUES = [
  {
    icon: HiOutlineRocketLaunch,
    title: "Our Mission",
    text: "To empower businesses with innovative digital solutions.",
  },
  {
    icon: HiOutlineEye,
    title: "Our Vision",
    text: "To be a trusted technology partner for companies worldwide.",
  },
  {
    icon: HiOutlineHeart,
    title: "Our Values",
    text: "Transparency, quality, collaboration and continuous improvement.",
  },
];

const STATS = [
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "20+", label: "Team Members" },
  { value: "5+", label: "Years Experience" },
];

export function AboutPage() {
  return (
    <>
      <Meta
        title="About Devsloop"
        description="Devsloop is a team of designers, developers and problem-solvers passionate about building great software."
      />
      <Section>
        <div className={styles.header}>
          <span className={styles.eyebrow}>WHO WE ARE</span>
          <h1 className={styles.title}>
            <span className={styles.titleText}>About</span>
            <img src={devsloopLogo} alt="Devsloop" className={styles.titleLogo} />
          </h1>
          <p className={styles.subtitle}>
            We are a team of designers, developers and problem-solvers passionate about building
            great software.
          </p>
        </div>

        <div className={styles.storyGrid}>
          <div className={styles.valuesColumn}>
            <span className={styles.eyebrow}>OUR STORY</span>
            {VALUES.map((item) => (
              <div className={styles.valueBlock} key={item.title}>
                <div className={styles.valueIcon} aria-hidden="true">
                  <item.icon size={22} />
                </div>
                <div>
                  <h2 className={styles.valueTitle}>{item.title}</h2>
                  <p className={styles.valueText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.photoWrap}>
            <img
              src={aboutTeam}
              alt="Illustration of the Devsloop team collaborating around a table"
              className={styles.photo}
            />
          </div>
        </div>

        <div className={styles.stats}>
          {STATS.map((stat) => (
            <div className={styles.statBlock} key={stat.label}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <CtaBanner
          title="Want to work with us?"
          subtitle="We're always looking for passionate people to join the team."
          buttonLabel="View Open Roles"
          buttonTo="/careers"
        />
      </Section>
    </>
  );
}
