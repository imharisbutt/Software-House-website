import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
  alt?: boolean;
  tight?: boolean;
  fullBleed?: boolean;
  id?: string;
  className?: string;
}

export function Section({
  children,
  alt = false,
  tight = false,
  fullBleed = false,
  id,
  className = "",
}: SectionProps) {
  const sectionClasses = [
    styles.section,
    tight && styles.tight,
    fullBleed && styles.fullBleed,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div id={id} className={alt ? styles.alt : undefined}>
      <div className={sectionClasses}>{children}</div>
    </div>
  );
}
