/**
 * This project is frontend-only (no backend, no deployment — see plan section 6).
 * mockSubmit simulates a network request so forms have real submitting/success
 * states to build against. To wire up a real backend later, replace the body of
 * this function with a fetch()/axios call to your API endpoint — calling forms
 * (ContactForm, ApplicationForm) require no changes.
 */
export async function mockSubmit<T>(payload: T): Promise<{ success: true }> {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  console.log("[MOCK SUBMIT]", payload);
  return { success: true };
}
