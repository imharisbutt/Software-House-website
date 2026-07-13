import styles from "./FilterTabs.module.css";

interface FilterTabsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ options, active, onChange }: FilterTabsProps) {
  return (
    <div className={styles.filters}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`${styles.filterButton} ${active === option ? styles.filterButtonActive : ""}`}
          onClick={() => onChange(option)}
          aria-pressed={active === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
