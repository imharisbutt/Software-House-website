import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import styles from "../shared/DetailPage.module.css";

export function NotFoundPage() {
  return (
    <>
      <Meta title="Page Not Found" description="The page you're looking for doesn't exist." />
      <Section>
        <div className={styles.notFound}>
          <h1 className={styles.title}>404 &mdash; Page Not Found</h1>
          <p>The page you're looking for doesn't exist or may have moved.</p>
          <Button to="/">Back to Home</Button>
        </div>
      </Section>
    </>
  );
}
