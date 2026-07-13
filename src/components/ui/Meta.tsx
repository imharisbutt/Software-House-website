import { useEffect } from "react";

const SITE_NAME = "Devsloop";

interface MetaProps {
  title: string;
  description: string;
}

/**
 * Sets document.title and the meta description tag client-side.
 * Note: since this is a client-rendered SPA, crawlers/social previews that
 * don't execute JS won't see these tags — see the plan's "gaps vs PDF" section.
 */
export function Meta({ title, description }: MetaProps) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [title, description]);

  return null;
}
