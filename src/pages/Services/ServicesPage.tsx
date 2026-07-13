import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { ServiceMiniCard } from "../../components/ui/ServiceMiniCard";
import { CtaBanner } from "../../components/ui/CtaBanner";
import { SERVICE_ICONS } from "../../lib/serviceIcons";
import servicesData from "../../content/services.json";
import type { Service } from "../../types/content";
import styles from "./ServicesPage.module.css";

const services = servicesData as Service[];

export function ServicesPage() {
  return (
    <>
      <Meta
        title="Our Services"
        description="Web and mobile development, MVP builds, AI integration, product design, and DevOps — Devsloop's core service offerings."
      />
      <Section>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Services</h1>
          <p className={styles.subtitle}>
            We provide a wide range of services to help you build, launch and grow your digital
            product.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <ServiceMiniCard
              key={service.slug}
              icon={SERVICE_ICONS[service.icon]}
              title={service.title}
              summary={service.summary}
            />
          ))}
        </div>

        <div className={styles.ctaRow}>
          <CtaBanner
            title="Have a project in mind?"
            subtitle="Let's build something great together."
            buttonLabel="Get in Touch"
            buttonTo="/contact"
          />
        </div>
      </Section>
    </>
  );
}
