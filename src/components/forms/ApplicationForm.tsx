import { useRef, useState } from "react";
import type { DragEvent, FormEvent, KeyboardEvent } from "react";
import { HiOutlineArrowUpTray, HiOutlineLockClosed, HiOutlinePaperAirplane } from "react-icons/hi2";
import { FormStatus } from "./FormStatus";
import type { SubmitStatus } from "./FormStatus";
import { mockSubmit } from "../../lib/mockSubmit";
import { isRequired, isValidEmail, requiredError, EMAIL_ERROR } from "../../lib/validation";
import type { Errors } from "../../lib/validation";
import styles from "./ApplicationForm.module.css";

const COVER_NOTE_MAX = 500;

type Field = "name" | "email" | "coverNote";

export function ApplicationForm({ jobTitle }: { jobTitle: string }) {
  const [values, setValues] = useState({ name: "", email: "", coverNote: "" });
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors<Field>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function setValue(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): Errors<Field> {
    const next: Errors<Field> = {};
    if (!isRequired(values.name)) next.name = requiredError("Name");
    if (!isRequired(values.email)) next.email = requiredError("Email");
    else if (!isValidEmail(values.email)) next.email = EMAIL_ERROR;
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      // Resume file is held in memory only for this UI demo — there is no
      // backend/storage to upload to (see plan section 6).
      await mockSubmit({ form: "career-application", jobTitle, resumeName, ...values });
      setStatus("success");
      setValues({ name: "", email: "", coverNote: "" });
      setResumeName(null);
    } catch {
      setStatus("error");
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleDropzoneKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFilePicker();
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setResumeName(file.name);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="application-name">
          Name<span className={styles.required}>*</span>
        </label>
        <input
          id="application-name"
          className={`${styles.control} ${errors.name ? styles.controlError : ""}`}
          value={values.name}
          placeholder="Enter your full name"
          aria-invalid={Boolean(errors.name)}
          onChange={(e) => setValue("name", e.target.value)}
        />
        {errors.name && (
          <span className={styles.error} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="application-email">
          Email<span className={styles.required}>*</span>
        </label>
        <input
          id="application-email"
          type="email"
          className={`${styles.control} ${errors.email ? styles.controlError : ""}`}
          value={values.email}
          placeholder="Enter your email address"
          aria-invalid={Boolean(errors.email)}
          onChange={(e) => setValue("email", e.target.value)}
        />
        {errors.email && (
          <span className={styles.error} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <span className={styles.label}>
          Resume<span className={styles.required}>*</span>
        </span>
        <div
          className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`}
          onClick={openFilePicker}
          onKeyDown={handleDropzoneKeyDown}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label="Upload resume"
        >
          <HiOutlineArrowUpTray size={22} className={styles.dropzoneIcon} aria-hidden="true" />
          <p className={styles.dropzoneText}>
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p className={styles.dropzoneHint}>PDF, DOC, DOCX (Max. 5MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className={styles.hiddenInput}
            onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? null)}
          />
        </div>
        {resumeName && <p className={styles.resumeName}>Selected: {resumeName}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="application-cover-note">
          Cover Note
        </label>
        <div className={styles.textareaWrap}>
          <textarea
            id="application-cover-note"
            className={styles.control}
            rows={5}
            maxLength={COVER_NOTE_MAX}
            value={values.coverNote}
            placeholder="Tell us why you're a good fit..."
            onChange={(e) => setValue("coverNote", e.target.value)}
          />
          <span className={styles.charCount}>
            {values.coverNote.length} / {COVER_NOTE_MAX}
          </span>
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={status === "submitting"}>
        <HiOutlinePaperAirplane size={16} aria-hidden="true" />
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </button>

      <p className={styles.secureNote}>
        <HiOutlineLockClosed size={13} aria-hidden="true" />
        Your information is secure and confidential.
      </p>

      <FormStatus status={status} successMessage="Application received — we'll review it and follow up soon." />
    </form>
  );
}
