import fintrack from "../assets/case-studies/fintrack.svg";
import healthhub from "../assets/case-studies/healthhub.svg";
import edulearn from "../assets/case-studies/edulearn.svg";
import retailpro from "../assets/case-studies/retailpro.svg";
import travelgo from "../assets/case-studies/travelgo.svg";
import taskly from "../assets/case-studies/taskly.svg";

/** Case-study card artwork, keyed by slug from content/caseStudies.json. */
export const CASE_STUDY_IMAGES: Record<string, string> = {
  "fintrack-dashboard": fintrack,
  "healthhub-mobile-app": healthhub,
  "edulearn-platform": edulearn,
  "retail-pro-system": retailpro,
  "travelgo-website": travelgo,
  "taskly-saas": taskly,
};
