import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineChatBubbleLeftRight,
  HiChevronRight,
} from "react-icons/hi2";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { ContactForm } from "../../components/forms/ContactForm";
import styles from "./ContactPage.module.css";

const INFO_ROWS = [
  { icon: HiOutlineEnvelope, label: "Email", value: "hello@devsloop.dev" },
  { icon: HiOutlinePhone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: HiOutlineMapPin, label: "Address", value: "123 Innovation Drive, Tech City, CA 94000" },
];

const SOCIAL_LINKS = [
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaXTwitter, label: "Twitter", href: "https://twitter.com" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com" },
];

export function ContactPage() {
  return (
    <>
      <Meta
        title="Contact"
        description="Get in touch with Devsloop to talk about your next web or mobile project."
      />
      <Section className={styles.contactSection}>
        <div className={styles.blobOne} aria-hidden="true" />
        <div className={styles.blobTwo} aria-hidden="true" />

        <div className={styles.panel}>
          <div className={styles.infoCard}>
            <div className={styles.scanLines} aria-hidden="true" />

            <div className={styles.infoContent}>
              <span className={styles.eyebrowChip}>
                <HiOutlineChatBubbleLeftRight size={14} aria-hidden="true" />
                Let's Connect
              </span>

              <h1 className={styles.title}>
                Let's Work <span className={styles.titleAccent}>Together</span>
              </h1>
              <p className={styles.subtitle}>
                Have a project in mind or want to say hi? Fill out the form and we'll get back to
                you.
              </p>

              <div className={styles.divider} />

              <div className={styles.infoList}>
                {INFO_ROWS.map((row) => (
                  <div className={styles.infoRow} key={row.label}>
                    <div className={styles.infoIcon} aria-hidden="true">
                      <row.icon size={20} />
                    </div>
                    <div className={styles.infoText}>
                      <div className={styles.infoLabel}>{row.label}</div>
                      <div className={styles.infoValue}>{row.value}</div>
                    </div>
                    <HiChevronRight
                      size={18}
                      className={styles.infoChevron}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>

              <div className={styles.socialSection}>
                <div className={styles.socialLabel}>Connect with us</div>
                <div className={styles.socialRow}>
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={styles.socialLink}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon size={18} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formPanel}>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
