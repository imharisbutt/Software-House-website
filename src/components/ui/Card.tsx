import { Link } from "react-router-dom";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Tag } from "./Tag";
import styles from "./Card.module.css";

interface CardProps {
  to: string;
  eyebrow?: string;
  title: string;
  excerpt: string;
  tag?: string;
  image?: string;
  imageLabel?: string;
}

export function Card({ to, eyebrow, title, excerpt, tag, image, imageLabel }: CardProps) {
  return (
    <Link to={to} className={styles.card}>
      {image ? (
        <div className={styles.imageWrap}>
          <img src={image} alt={imageLabel ?? title} className={styles.image} loading="lazy" />
        </div>
      ) : (
        <ImagePlaceholder aspectRatio="4 / 3" label={imageLabel ?? title} />
      )}
      <div className={styles.body}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        {tag && (
          <div className={styles.tags}>
            <Tag>{tag}</Tag>
          </div>
        )}
      </div>
    </Link>
  );
}
