import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  HiOutlineWifi,
  HiOutlineBolt,
  HiOutlineWindow,
  HiOutlineLink,
  HiOutlineLightBulb,
  HiOutlineCheck,
  HiArrowRight,
} from "react-icons/hi2";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Meta } from "../../components/ui/Meta";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import { BLOG_IMAGES } from "../../lib/blogImages";
import blogPostsData from "../../content/blogPosts.json";
import type { BlogPost } from "../../types/content";
import notFoundStyles from "../shared/DetailPage.module.css";
import styles from "./BlogDetailPage.module.css";

const posts = blogPostsData as BlogPost[];

const FEATURE_ICONS: Record<string, IconType> = {
  offline: HiOutlineWifi,
  performance: HiOutlineBolt,
  experience: HiOutlineWindow,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  if (!post) {
    return (
      <>
        <Meta title="Post Not Found" description="This blog post could not be found." />
        <Section>
          <div className={notFoundStyles.notFound}>
            <h1 className={notFoundStyles.title}>Post not found</h1>
            <p>We couldn't find the blog post you're looking for.</p>
            <Button to="/blog">Back to Blog</Button>
          </div>
        </Section>
      </>
    );
  }

  const sections = post.detail?.sections ?? [];
  const [quote, ...paragraphs] = post.body;
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <>
      <Meta title={post.title} description={post.excerpt} />
      <div className={styles.page}>
        <div className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.container}>
            <Link to="/blog" className={styles.back}>
              &larr; Back to Blog
            </Link>

            <div className={styles.heroGrid}>
              <motion.div
                className={styles.heroLeft}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.categoryBadge}>
                  <span className={styles.categoryDot} aria-hidden="true" />
                  {post.category}
                </span>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.authorRow}>
                  <span className={styles.authorAvatar} aria-hidden="true">
                    {initials(post.author)}
                  </span>
                  <span className={styles.authorName}>{post.author}</span>
                  <span className={styles.metaDot}>&middot;</span>
                  <span className={styles.metaText}>{formatDate(post.date)}</span>
                  <span className={styles.metaDot}>&middot;</span>
                  <span className={styles.metaText}>{post.readTime}</span>
                </div>

                <div className={styles.tagRow}>
                  {post.tags.map((tag) => (
                    <span className={styles.tagPill} key={tag}>
                      {titleCase(tag)}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className={styles.heroImageWrap}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={BLOG_IMAGES[post.slug]} alt="" className={styles.heroImage} />
              </motion.div>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.bodyGrid}>
              <aside className={styles.shareRail} aria-label="Share this article">
                <span className={styles.shareLabel}>Share</span>
                <a
                  href={tweetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBtn}
                  aria-label="Share on Twitter"
                >
                  <FaTwitter size={15} />
                </a>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareBtn}
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn size={15} />
                </a>
                <button type="button" onClick={copyLink} className={styles.shareBtn} aria-label="Copy link">
                  {copied ? <HiOutlineCheck size={16} /> : <HiOutlineLink size={16} />}
                </button>
              </aside>

              <motion.article className={styles.article} initial="hidden" animate="show" variants={fadeUp}>
                {quote && (
                  <blockquote className={styles.quoteBlock}>
                    <span className={styles.quoteMark} aria-hidden="true">
                      &ldquo;
                    </span>
                    <p>{quote}</p>
                  </blockquote>
                )}

                {paragraphs.map((paragraph, idx) => (
                  <p className={styles.paragraph} key={idx}>
                    {paragraph}
                  </p>
                ))}

                {sections.map((section) => (
                  <section key={section.id} id={section.id} className={styles.section}>
                    <h2 className={styles.sectionHeading}>{section.heading}</h2>
                    {section.paragraphs.map((paragraph, idx) => (
                      <p className={styles.paragraph} key={idx}>
                        {paragraph}
                      </p>
                    ))}
                    {section.features && (
                      <div className={styles.featureGrid}>
                        {section.features.map((feature) => {
                          const FeatureIcon = FEATURE_ICONS[feature.icon] ?? HiOutlineBolt;
                          return (
                            <div className={styles.featureCard} key={feature.title}>
                              <span className={styles.featureIcon}>
                                <FeatureIcon size={18} />
                              </span>
                              <div className={styles.featureTitle}>{feature.title}</div>
                              <div className={styles.featureText}>{feature.text}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                ))}

                <div className={styles.authorCard}>
                  <span className={styles.authorCardAvatar} aria-hidden="true">
                    {initials(post.author)}
                  </span>
                  <div className={styles.authorCardText}>
                    <div className={styles.authorCardName}>
                      Written by <span>{post.author}</span>
                    </div>
                    {post.detail?.authorBio && <p className={styles.authorCardBio}>{post.detail.authorBio}</p>}
                  </div>
                  <Link to="/blog" className={styles.authorCardBtn}>
                    View all posts
                  </Link>
                </div>
              </motion.article>

              <aside className={styles.sidebar}>
                {sections.length > 0 && (
                  <div className={styles.sideCard}>
                    <div className={styles.sideCardTitle}>Table of Contents</div>
                    <ul className={styles.tocList}>
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a href={`#${section.id}`} className={styles.tocLink}>
                            {section.heading}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.sideCard}>
                  <div className={styles.sideCardTitle}>Stay in the loop</div>
                  <p className={styles.sideCardText}>
                    Get the latest articles and insights on {post.category.toLowerCase()} straight to your inbox.
                  </p>
                  {subscribed ? (
                    <p className={styles.subscribedNote} role="status">
                      <HiOutlineCheck size={16} aria-hidden="true" />
                      You're subscribed!
                    </p>
                  ) : (
                    <form
                      className={styles.subscribeForm}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubscribed(true);
                      }}
                    >
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        aria-label="Email address"
                        className={styles.subscribeInput}
                      />
                      <button type="submit" className={styles.subscribeBtn}>
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>

                {related.length > 0 && (
                  <div className={styles.sideCard}>
                    <div className={styles.sideCardTitle}>Related Articles</div>
                    <div className={styles.relatedList}>
                      {related.map((rp) => (
                        <Link to={`/blog/${rp.slug}`} className={styles.relatedItem} key={rp.slug}>
                          <img src={BLOG_IMAGES[rp.slug]} alt="" className={styles.relatedThumb} />
                          <div className={styles.relatedText}>
                            <div className={styles.relatedTitle}>{rp.title}</div>
                            <div className={styles.relatedDate}>{formatDate(rp.date)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`${styles.sideCard} ${styles.ctaCard}`}>
                  <span className={styles.ctaIcon}>
                    <HiOutlineLightBulb size={22} />
                  </span>
                  <div className={styles.ctaTitle}>Have an idea to discuss?</div>
                  <p className={styles.sideCardText}>
                    We help startups and enterprises build fast, scalable, and future-ready digital products.
                  </p>
                  <Link to="/contact" className={styles.ctaBtn}>
                    Let's Talk
                    <HiArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
