import { useState } from "react";
import type { FormEvent } from "react";
import {
  HiOutlinePaperAirplane,
  HiChevronRight,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { IoHeadsetOutline } from "react-icons/io5";
import { FormField } from "./FormField";
import { FormStatus } from "./FormStatus";
import type { SubmitStatus } from "./FormStatus";
import { Button } from "../ui/Button";
import { mockSubmit } from "../../lib/mockSubmit";
import { isRequired, isValidEmail, requiredError, EMAIL_ERROR } from "../../lib/validation";
import type { Errors } from "../../lib/validation";
import styles from "./ContactForm.module.css";

type Field = "name" | "email" | "projectType" | "message";

const PROJECT_TYPE_OPTIONS = [
  { value: "", label: "Select a project type" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "mvp-build", label: "MVP Build" },
  { value: "other", label: "Other" },
];

const TRUST_BADGES = [
  { icon: HiOutlineShieldCheck, label: "Response within", value: "24 hours" },
  { icon: IoHeadsetOutline, label: "Free", value: "Consultation" },
  { icon: HiOutlineLockClosed, label: "NDA available", value: "on request" },
];

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", projectType: "", message: "" });
  const [errors, setErrors] = useState<Errors<Field>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function setValue(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): Errors<Field> {
    const next: Errors<Field> = {};
    if (!isRequired(values.name)) next.name = requiredError("Name");
    if (!isRequired(values.email)) next.email = requiredError("Email");
    else if (!isValidEmail(values.email)) next.email = EMAIL_ERROR;
    if (!isRequired(values.message)) next.message = requiredError("Message");
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      await mockSubmit({ form: "contact", ...values });
      setStatus("success");
      setValues({ name: "", email: "", projectType: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className={styles.formHeader}>
        <div className={styles.formHeaderIcon} aria-hidden="true">
          <HiOutlinePaperAirplane size={20} />
          <span className={styles.formHeaderDot} />
        </div>
        <div>
          <h2 className={styles.formTitle}>Send us a message</h2>
          <p className={styles.formSubtitle}>We'll respond as soon as possible</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formRow}>
          <FormField
            id="contact-name"
            label="Name"
            required
            value={values.name}
            error={errors.name}
            onChange={(v) => setValue("name", v)}
            placeholder="Your full name"
            surface="dark"
          />
          <FormField
            id="contact-email"
            label="Email"
            type="email"
            required
            value={values.email}
            error={errors.email}
            onChange={(v) => setValue("email", v)}
            placeholder="Your email address"
            surface="dark"
          />
        </div>
        <FormField
          id="contact-projectType"
          label="Project Type"
          as="select"
          options={PROJECT_TYPE_OPTIONS}
          value={values.projectType}
          onChange={(v) => setValue("projectType", v)}
          surface="dark"
        />
        <FormField
          id="contact-message"
          label="Message"
          as="textarea"
          required
          value={values.message}
          error={errors.message}
          onChange={(v) => setValue("message", v)}
          placeholder="Tell us about your project..."
          surface="dark"
        />
        <Button type="submit" className={styles.submitBtn} disabled={status === "submitting"}>
          {status === "submitting" ? (
            "Sending..."
          ) : (
            <>
              <HiOutlinePaperAirplane size={18} aria-hidden="true" />
              Send Message
              <HiChevronRight size={16} aria-hidden="true" />
            </>
          )}
        </Button>

        <div className={styles.trustRow}>
          {TRUST_BADGES.map((badge) => (
            <div className={styles.trustItem} key={badge.label}>
              <div className={styles.trustIcon} aria-hidden="true">
                <badge.icon size={16} />
              </div>
              <div>
                <div className={styles.trustLabel}>{badge.label}</div>
                <div className={styles.trustValue}>{badge.value}</div>
              </div>
            </div>
          ))}
        </div>

        <FormStatus status={status} successMessage="Thanks — we'll be in touch within 2 business days." />
      </form>
    </div>
  );
}
