import {
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineArrowsRightLeft,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlinePuzzlePiece,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiOutlineBanknotes,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import styles from "./DashboardMockup.module.css";

const NAV_ITEMS = [
  { icon: HiOutlineSquares2X2, label: "Overview", active: true },
  { icon: HiOutlineChartBar, label: "Analytics" },
  { icon: HiOutlineArrowsRightLeft, label: "Transactions" },
  { icon: HiOutlineDocumentText, label: "Reports" },
  { icon: HiOutlineUsers, label: "Customers" },
  { icon: HiOutlineCog6Tooth, label: "Settings" },
];

const NAV_ITEMS_SECONDARY = [
  { icon: HiOutlinePuzzlePiece, label: "Integrations" },
  { icon: HiOutlineQuestionMarkCircle, label: "Help Center" },
];

const STATS = [
  { icon: HiOutlineBanknotes, label: "Total Revenue", value: "$256,450", delta: "+12.5%" },
  { icon: HiOutlineUsers, label: "Active Users", value: "12,845", delta: "+8.2%" },
  { icon: HiOutlineArrowsRightLeft, label: "Transactions", value: "24,590", delta: "+15.7%" },
  { icon: HiOutlineCheckCircle, label: "Success Rate", value: "98.6%", delta: "+2.1%" },
];

const REVENUE_POINTS = "0,55 40,40 80,48 120,20 160,30 200,10 240,18 280,5";
const DONUT_SEGMENTS = [
  { color: "#4fb88b", pct: 45 },
  { color: "#7c8cf8", pct: 30 },
  { color: "#f5b301", pct: 15 },
  { color: "#5c6b7a", pct: 10 },
];

interface DashboardMockupProps {
  size?: "hero" | "desktop" | "tablet" | "mobile";
}

export function DashboardMockup({ size = "hero" }: DashboardMockupProps) {
  const showSidebar = size === "hero" || size === "desktop" || size === "tablet";
  const showFullSidebarLabels = size === "hero" || size === "desktop";
  const showDonut = size === "hero" || size === "desktop";
  const showTopbar = size !== "mobile";

  let circumference = 0;
  let offsetAcc = 0;

  return (
    <div className={`${styles.frame} ${styles[size]}`} aria-hidden="true">
      {showSidebar && (
        <div className={styles.sidebar}>
          <div className={styles.brand}>
            <span className={styles.brandMark} />
            {showFullSidebarLabels && <span className={styles.brandName}>FinTrack</span>}
          </div>
          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <span
                key={item.label}
                className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}
              >
                <item.icon size={13} />
                {showFullSidebarLabels && item.label}
              </span>
            ))}
          </nav>
          {showFullSidebarLabels && (
            <>
              <div className={styles.navDivider} />
              <nav className={styles.nav}>
                {NAV_ITEMS_SECONDARY.map((item) => (
                  <span key={item.label} className={styles.navItem}>
                    <item.icon size={13} />
                    {item.label}
                  </span>
                ))}
              </nav>
              <div className={styles.navDivider} />
              <span className={styles.navItem}>
                <HiOutlineArrowRightOnRectangle size={13} />
                Log out
              </span>
            </>
          )}
        </div>
      )}

      <div className={styles.main}>
        {showTopbar && (
          <div className={styles.topbar}>
            <div className={styles.searchBox}>
              <HiOutlineMagnifyingGlass size={12} />
              {showFullSidebarLabels && <span>Search anything...</span>}
            </div>
            <div className={styles.topbarRight}>
              <HiOutlineBell size={14} className={styles.bellIcon} />
              <span className={styles.avatar} />
              {showFullSidebarLabels && (
                <span className={styles.userMeta}>
                  <strong>John Smith</strong>
                  <em>Admin</em>
                </span>
              )}
            </div>
          </div>
        )}

        <div className={styles.contentTitle}>Overview</div>

        <div className={styles.statGrid}>
          {STATS.map((stat) => (
            <div className={styles.statCard} key={stat.label}>
              <div className={styles.statTop}>
                {size !== "mobile" && (
                  <span className={styles.statIcon}>
                    <stat.icon size={11} />
                  </span>
                )}
                <span className={styles.statDelta}>{stat.delta}</span>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              {showFullSidebarLabels && <div className={styles.statLabel}>{stat.label}</div>}
            </div>
          ))}
        </div>

        <div className={styles.panels}>
          <div className={styles.chartPanel}>
            {showFullSidebarLabels && <div className={styles.panelTitle}>Revenue Overview</div>}
            <svg viewBox="0 0 280 60" className={styles.chartSvg} preserveAspectRatio="none">
              <polyline
                points={REVENUE_POINTS}
                fill="none"
                stroke="#4fb88b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points={`0,60 ${REVENUE_POINTS} 280,60`} fill="url(#revGradient)" opacity="0.35" />
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4fb88b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#4fb88b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {showDonut && (
            <div className={styles.donutPanel}>
              <div className={styles.panelTitle}>Transactions by Type</div>
              <svg viewBox="0 0 42 42" className={styles.donutSvg}>
                {DONUT_SEGMENTS.map((seg, i) => {
                  const r = 15.9155;
                  circumference = 2 * Math.PI * r;
                  const dash = (seg.pct / 100) * circumference;
                  const el = (
                    <circle
                      key={i}
                      cx="21"
                      cy="21"
                      r={r}
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="6"
                      strokeDasharray={`${dash} ${circumference - dash}`}
                      strokeDashoffset={-offsetAcc}
                    />
                  );
                  offsetAcc += dash;
                  return el;
                })}
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
