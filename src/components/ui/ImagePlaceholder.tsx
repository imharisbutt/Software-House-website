import type { CSSProperties } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import styles from "./ImagePlaceholder.module.css";

interface ImagePlaceholderProps {
  aspectRatio?: string;
  rounded?: boolean;
  label?: string;
  className?: string;
}

/**
 * Stand-in for a real photo/screenshot. This project has no image assets yet
 * (see README) — swap the rendered <div> for an <img src="..."> once real
 * images are supplied, keeping the same sizing/aspect-ratio.
 */
export function ImagePlaceholder({
  aspectRatio = "4 / 3",
  rounded = false,
  label = "Image placeholder",
  className = "",
}: ImagePlaceholderProps) {
  const style: CSSProperties = { aspectRatio };
  const classes = `${styles.placeholder} ${rounded ? styles.rounded : ""} ${className}`.trim();

  return (
    <div className={classes} style={style}>
      <HiOutlinePhoto size={28} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
