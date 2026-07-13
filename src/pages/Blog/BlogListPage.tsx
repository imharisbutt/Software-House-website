import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import blogPostsData from "../../content/blogPosts.json";
import { BLOG_IMAGES } from "../../lib/blogImages";
import type { BlogPost } from "../../types/content";
import servicesStyles from "../Services/ServicesPage.module.css";
import styles from "./BlogListPage.module.css";

const posts = blogPostsData as BlogPost[];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogListPage() {
  return (
    <>
      <Meta
        title="Blog"
        description="Insights on product strategy, engineering, and design from the Devsloop team."
      />
      <Section>
        <div className={servicesStyles.header}>
          <h1 className={servicesStyles.title}>Latest Insights</h1>
          <p className={servicesStyles.subtitle}>
            Read our latest articles on technology, development and digital transformation.
          </p>
        </div>

        <div className={styles.list}>
          {posts.map((post) => (
            <article className={styles.row} key={post.slug}>
              <Link to={`/blog/${post.slug}`} className={styles.thumbLink} tabIndex={-1} aria-hidden="true">
                <img src={BLOG_IMAGES[post.slug]} alt="" className={styles.thumb} loading="lazy" />
              </Link>
              <div className={styles.rowBody}>
                <Link to={`/blog/${post.slug}`} className={styles.rowTitle}>
                  {post.title}
                </Link>
                <p className={styles.rowExcerpt}>{post.excerpt}</p>
                <div className={styles.rowFooter}>
                  <span className={styles.rowMeta}>
                    {formatDate(post.date)} &middot; {post.readTime}
                  </span>
                  <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                    Read more <HiArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
