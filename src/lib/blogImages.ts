import webDevelopment from "../assets/blog/web-development.svg";
import saasScale from "../assets/blog/saas-scale.svg";
import uiUx from "../assets/blog/ui-ux.svg";
import devops from "../assets/blog/devops.svg";

/** Blog post thumbnail artwork, keyed by slug from content/blogPosts.json. */
export const BLOG_IMAGES: Record<string, string> = {
  "the-future-of-web-development": webDevelopment,
  "building-scalable-saas-applications": saasScale,
  "ui-ux-design-principles": uiUx,
  "devops-automation-guide": devops,
};
