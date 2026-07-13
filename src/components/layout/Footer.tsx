import { Link } from "react-router-dom";
import { LogoMark } from "../ui/LogoMark";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.brand}>
            <LogoMark height={26} />
          </div>
          <p className={styles.tagline}>
            A software house helping startups and enterprises design, build, and ship reliable
            products.
          </p>
        </div>

        <div className={styles.columns}>
          <div>
            <div className={styles.columnTitle}>Company</div>
            <Link to="/services">Services</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
          </div>
          <div>
            <div className={styles.columnTitle}>Resources</div>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <div className={styles.columnTitle}>Contact</div>
            <ul className={styles.contactInfo}>
              <li>hello@devsloop.dev</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>&copy; {year} Devsloop Software. All rights reserved.</div>
    </footer>
  );
}
