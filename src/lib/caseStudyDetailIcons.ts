import type { IconType } from "react-icons";
import {
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineArrowPath,
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlass,
  HiOutlineClipboardDocumentList,
  HiOutlinePaintBrush,
  HiOutlineCodeBracket,
  HiOutlineBeaker,
  HiOutlineRocketLaunch,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiNextdotjs,
  SiTypescript,
  SiDjango,
  SiStripe,
  SiWebrtc,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

export const METRIC_ICONS: Record<string, IconType> = {
  shield: HiOutlineShieldCheck,
  bolt: HiOutlineBolt,
  cycle: HiOutlineArrowPath,
  users: HiOutlineUserGroup,
};

export const PROCESS_ICONS: Record<string, IconType> = {
  research: HiOutlineMagnifyingGlass,
  planning: HiOutlineClipboardDocumentList,
  design: HiOutlinePaintBrush,
  development: HiOutlineCodeBracket,
  testing: HiOutlineBeaker,
  deployment: HiOutlineRocketLaunch,
  launch: HiOutlineRocketLaunch,
};

export const TECH_DETAIL_ICONS: Record<string, IconType> = {
  react: SiReact,
  node: SiNodedotjs,
  postgresql: SiPostgresql,
  redis: SiRedis,
  aws: FaAws,
};

/** Icon, brand color and short subtitle for every tech name used across content/caseStudies.json. */
export const TECH_BADGE_ICONS: Record<string, { icon: IconType; color: string; subtitle: string }> = {
  React: { icon: SiReact, color: "#61dafb", subtitle: "Frontend Library" },
  "React Native": { icon: SiReact, color: "#61dafb", subtitle: "Mobile Framework" },
  "Node.js": { icon: SiNodedotjs, color: "#8cc84b", subtitle: "Runtime" },
  PostgreSQL: { icon: SiPostgresql, color: "#4a9fd8", subtitle: "Database" },
  Redis: { icon: SiRedis, color: "#ff6b6b", subtitle: "Cache" },
  AWS: { icon: FaAws, color: "#ff9900", subtitle: "Cloud Platform" },
  "Next.js": { icon: SiNextdotjs, color: "#f5f5f5", subtitle: "React Framework" },
  TypeScript: { icon: SiTypescript, color: "#3178c6", subtitle: "Language" },
  Django: { icon: SiDjango, color: "#4fb88b", subtitle: "Backend Framework" },
  Stripe: { icon: SiStripe, color: "#635bff", subtitle: "Payments" },
  WebRTC: { icon: SiWebrtc, color: "#4dc9a1", subtitle: "Realtime Media" },
  Twilio: { icon: HiOutlineChatBubbleLeftRight, color: "#f22f46", subtitle: "Messaging API" },
};
