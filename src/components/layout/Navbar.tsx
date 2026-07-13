import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LogoMark } from "../ui/LogoMark";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={() => setOpen(false)} aria-label="Devsloop home">
          <LogoMark />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Button to="/contact">Get in Touch</Button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <HiOutlineXMark size={20} /> : <HiOutlineBars3 size={20} />}
        </button>
      </div>

      {open && (
        <nav className={styles.mobileNav} aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? styles.mobileNavActive : "")}
            >
              {link.label}
            </NavLink>
          ))}
          <div className={styles.mobileActions}>
            <ThemeToggle />
            <Button to="/contact" className={styles.mobileCta}>
              Get in Touch
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
