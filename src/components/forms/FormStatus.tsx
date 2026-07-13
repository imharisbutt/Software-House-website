import styles from "./FormStatus.module.css";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function FormStatus({ status, successMessage }: { status: SubmitStatus; successMessage: string }) {
  if (status === "success") {
    return (
      <div className={`${styles.status} ${styles.success}`} role="status">
        {successMessage}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`${styles.status} ${styles.error}`} role="alert">
        Something went wrong. Please try again.
      </div>
    );
  }

  return null;
}
