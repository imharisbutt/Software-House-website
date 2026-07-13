import type { IconType } from "react-icons";
import {
  HiOutlinePuzzlePiece,
  HiOutlineCubeTransparent,
  HiOutlineSwatch,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

/** Job listing icons, keyed by slug from content/jobs.json. */
export const JOB_ICONS: Record<string, IconType> = {
  "senior-frontend-developer": HiOutlinePuzzlePiece,
  "backend-developer": HiOutlineCubeTransparent,
  "ui-ux-designer": HiOutlineSwatch,
  "qa-engineer": HiOutlineShieldCheck,
  "devops-engineer": HiOutlineChatBubbleLeftRight,
};
