export type Errors<T extends string> = Partial<Record<T, string>>;

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function requiredError(label: string): string {
  return `${label} is required.`;
}

export const EMAIL_ERROR = "Enter a valid email address.";
