import type { IconType } from "react-icons";
import styles from "./ServiceMiniCard.module.css";

interface ServiceMiniCardProps {
  icon: IconType;
  title: string;
  summary: string;
}

export function ServiceMiniCard({ icon: Icon, title, summary }: ServiceMiniCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        <Icon size={20} aria-hidden="true" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
    </div>
  );
}
