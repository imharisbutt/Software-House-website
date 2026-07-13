import { Button } from "./Button";
import styles from "./CtaBanner.module.css";

interface CtaBannerProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonTo: string;
}

export function CtaBanner({ title, subtitle, buttonLabel, buttonTo }: CtaBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <Button to={buttonTo} variant="onPrimary">
        {buttonLabel}
      </Button>
    </div>
  );
}
