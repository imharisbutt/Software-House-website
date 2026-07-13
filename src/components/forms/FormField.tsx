import type { ReactNode } from "react";
import styles from "./FormField.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  as?: "input" | "textarea" | "select";
  type?: string;
  rows?: number;
  options?: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  surface?: "light" | "dark";
}

export function FormField({
  id,
  label,
  required = false,
  error,
  as = "input",
  type = "text",
  rows = 4,
  options,
  value,
  onChange,
  placeholder,
  surface = "light",
}: FormFieldProps) {
  const controlClasses = [
    styles.control,
    surface === "dark" && styles.controlDark,
    error && styles.controlError,
  ]
    .filter(Boolean)
    .join(" ");
  const labelClasses = [styles.label, surface === "dark" && styles.labelDark]
    .filter(Boolean)
    .join(" ");
  const describedBy = error ? `${id}-error` : undefined;

  let control: ReactNode;
  if (as === "textarea") {
    control = (
      <textarea
        id={id}
        className={controlClasses}
        rows={rows}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (as === "select") {
    control = (
      <select
        id={id}
        className={controlClasses}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
      >
        {(options ?? []).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        id={id}
        type={type}
        className={controlClasses}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div className={styles.field}>
      <label className={labelClasses} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {control}
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
