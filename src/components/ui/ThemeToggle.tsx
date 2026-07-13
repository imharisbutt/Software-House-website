import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
    </button>
  );
}
