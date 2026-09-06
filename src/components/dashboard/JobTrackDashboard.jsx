import React, { useState } from "react";
import {
  LayoutGrid,
  Briefcase,
  CalendarClock,
  BarChart3,
  Settings,
  Search,
  Bell,
  Moon,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  TrendingUp,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  X,
  Menu,
  GitBranch,
  Bookmark,
  FileText,
  Target,
  Lightbulb,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ---------------------------------------------------------------------------
// Design tokens (unchanged — do not modify)
// ---------------------------------------------------------------------------
const c = {
  bg: "#08090D",
  bg2: "#0D0F14",
  bg3: "#12151C",
  card: "#11141B",
  cardElevated: "#151922",
  cardHover: "#191D27",
  borderN: "rgba(255,255,255,0.08)",
  borderH: "rgba(255,255,255,0.15)",
  text: "#F5F7FA",
  textSecondary: "#A7ADB8",
  textMuted: "#6F7683",
  violet: "#7C5CFF",
  violet2: "#9B7BFF",
  violetBright: "#A78BFA",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#38BDF8",
};

const gradient = `linear-gradient(135deg, ${c.violet} 0%, #5B5FEF 50%, ${c.info} 100%)`;

// ===========================================================================
// mockData.js (centralized — in a real repo this lives at src/data/mockData.js)
// ===========================================================================
const mockData = {
  user: { name: "Monica", role: "Job Seeker", initials: "M" },

  mainNav: [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "applications", label: "Applications", icon: Briefcase },
    { key: "interviews", label: "Interviews", icon: CalendarClock },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
    { key: "settings", label: "Settings", icon: Settings },
  ],

  careerNav: [
    { key: "pipeline", label: "Job Pipeline", icon: GitBranch },
    { key: "saved-jobs", label: "Saved Jobs", icon: Bookmark },
    { key: "resume-manager", label: "Resume Manager", icon: FileText },
  ],

  productivityNav: [
    { key: "goals", label: "Goals", icon: Target },
    { key: "insights", label: "Insights", icon: Lightbulb },
  ],

  jobSearchProgress: { applications: 42, goal: 54, pct: 78 },

  stats: [
    { label: "Total Applications", value: "42", delta: "+12.5%", up: true, icon: Briefcase },
    { label: "Applied", value: "18", delta: "+4.0%", up: true, icon: TrendingUp },
    { label: "Interviews", value: "9", delta: "+2 this wk", up: true, icon: CalendarClock },
    { label: "Offers", value: "3", delta: "0%", up: null, icon: CheckCircle2 },
  ],

  trendData: [
    { month: "Mar", applications: 4 },
    { month: "Apr", applications: 9 },
    { month: "May", applications: 14 },
    { month: "Jun", applications: 21 },
    { month: "Jul", applications: 28 },
    { month: "Aug", applications: 36 },
    { month: "Sep", applications: 42 },
  ],

  statusData: [
    { name: "Applied", value: 18, color: "#7C5CFF" },
    { name: "Interview", value: 9, color: "#38BDF8" },
    { name: "Offer", value: 3, color: "#22C55E" },
    { name: "Rejected", value: 8, color: "#EF4444" },
    { name: "Saved", value: 4, color: "#8B93A1" },
  ],

  pipelineStages: [
    { key: "saved", label: "Saved", count: 4, color: "#8B93A1" },
    { key: "applied", label: "Applied", count: 18, color: "#7C5CFF" },
    { key: "interview", label: "Interview", count: 9, color: "#38BDF8" },
    { key: "offer", label: "Offer", count: 3, color: "#22C55E" },
    { key: "rejected", label: "Rejected", count: 8, color: "#EF4444" },
  ],

  applications: [
    { company: "Google", role: "Frontend Engineer", location: "Bengaluru, IN", type: "Full-time", date: "Sep 02, 2026", status: "Interview", matchScore: 87, resume: "V3" },
    { company: "Microsoft", role: "Product Designer", location: "Remote", type: "Full-time", date: "Aug 29, 2026", status: "Applied", matchScore: 92, resume: "V2" },
    { company: "Amazon", role: "SDE II", location: "Hyderabad, IN", type: "Full-time", date: "Aug 24, 2026", status: "Offer", matchScore: 78, resume: "V3" },
    { company: "Stripe", role: "Backend Engineer", location: "Remote", type: "Contract", date: "Aug 20, 2026", status: "Rejected", matchScore: 64, resume: "V1" },
    { company: "Notion", role: "Growth Marketer", location: "Remote", type: "Full-time", date: "Aug 15, 2026", status: "Saved", matchScore: 55, resume: "V2" },
    { company: "Figma", role: "UX Researcher", location: "Bengaluru, IN", type: "Full-time", date: "Aug 10, 2026", status: "Withdrawn", matchScore: 70, resume: "V4" },
  ],

  needsAttention: [
    { icon: AlertTriangle, color: "#F59E0B", title: "Google application", detail: "No activity for 8 days", action: "Follow Up" },
    { icon: CalendarClock, color: "#38BDF8", title: "Microsoft interview", detail: "Tomorrow at 10:00 AM", action: "Prepare" },
    { icon: CheckCircle2, color: "#22C55E", title: "Amazon offer received", detail: "Response due in 3 days", action: "Review" },
  ],

  interviews: [
    { day: "10", month: "SEP", company: "Google", role: "Technical Interview", time: "10:00 AM" },
    { day: "12", month: "SEP", company: "Microsoft", role: "HR Round", time: "3:30 PM" },
  ],

  resumeVersions: [
    { version: "V3", applications: 12, interviews: 5, rate: "41.7%" },
    { version: "V2", applications: 8, interviews: 2, rate: "25%" },
  ],

  notifications: [
    { icon: AlertTriangle, color: "#F59E0B", title: "3 applications need follow-up", detail: "No recruiter response in over a week", time: "2h ago", unread: true },
    { icon: CalendarClock, color: "#38BDF8", title: "2 interviews scheduled this week", detail: "Google · Microsoft", time: "5h ago", unread: true },
    { icon: CheckCircle2, color: "#22C55E", title: "1 application status changed", detail: "Amazon moved to Offer", time: "1d ago", unread: false },
    { icon: Briefcase, color: "#7C5CFF", title: "5 new applications added", detail: "This week", time: "2d ago", unread: false },
  ],

  insights: [
    "Frontend Developer roles have your highest interview rate.",
    "Applications using Resume V3 generate more interviews.",
    "3 applications may need follow-up.",
    "Interview conversion is strongest for Software Engineer roles.",
  ],

  productivity: { streakDays: 7, weekCount: 8, weekGoal: 10 },
};

const statusStyle = {
  Applied: { bg: "rgba(124,92,255,0.12)", border: "rgba(124,92,255,0.35)", text: c.violet2 },
  Interview: { bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.35)", text: c.info },
  Offer: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.35)", text: c.success },
  Rejected: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", text: c.danger },
  Saved: { bg: "rgba(167,173,184,0.10)", border: "rgba(167,173,184,0.3)", text: c.textSecondary },
  Withdrawn: { bg: "rgba(111,118,131,0.10)", border: "rgba(111,118,131,0.3)", text: c.textMuted },
};

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const avatarPalette = ["#7C5CFF", "#38BDF8", "#F59E0B", "#22C55E", "#EF4444", "#9B7BFF"];

function matchTier(score) {
  if (score >= 90) return { label: "Excellent Match", color: c.success };
  if (score >= 75) return { label: "Strong Match", color: c.violet2 };
  if (score >= 60) return { label: "Moderate Match", color: c.warning };
  return { label: "Low Match", color: c.danger };
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------
function Logo({ size = 28, collapsed = false }) {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          width: size, height: size, borderRadius: 9, background: gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, boxShadow: "0 0 16px rgba(124,92,255,0.35)",
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M6 12.5L10 16.5L18 7.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {!collapsed && <span style={{ color: c.text, fontWeight: 700, fontSize: 17, letterSpacing: "-0.01em" }}>JobTrack</span>}
    </div>
  );
}

function Badge({ status }) {
  const s = statusStyle[status] || statusStyle.Saved;
  return (
    <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

function MatchScorePill({ score }) {
  const tier = matchTier(score);
  return (
    <div className="flex items-center gap-2" title={tier.label}>
      <div style={{ width: 46, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", borderRadius: 999, background: tier.color, transition: "width 300ms ease-out" }} />
      </div>
      <span style={{ color: c.textSecondary, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{score}%</span>
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? c.cardHover : c.card,
        border: `1px solid ${hover ? c.borderH : c.borderN}`,
        borderRadius: 14, padding: "18px 20px",
        transition: "all 200ms ease-out",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(124,92,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={17} color={c.violet2} />
        </div>
      </div>
      <div style={{ color: c.textSecondary, fontSize: 13, marginBottom: 6 }}>{stat.label}</div>
      <div className="flex items-end gap-2">
        <span style={{ color: c.text, fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em" }}>{stat.value}</span>
        <span style={{ color: stat.up === true ? c.success : stat.up === false ? c.danger : c.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
          {stat.delta}
        </span>
      </div>
      <div style={{ color: c.textMuted, fontSize: 11, marginTop: 2 }}>vs last month</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SIDEBAR — nav item now supports a collapsed state with a hover tooltip
// ---------------------------------------------------------------------------
function NavItem({ item, active, onClick, collapsed }) {
  const Icon = item.icon;
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`w-full flex items-center relative ${collapsed ? "justify-center" : "gap-3"}`}
      style={{
        padding: collapsed ? "9px 0" : "9px 12px",
        borderRadius: 9,
        background: active ? "rgba(124,92,255,0.12)" : hover ? "rgba(255,255,255,0.04)" : "transparent",
        border: "none",
        cursor: "pointer",
        transition: "background 150ms ease-out",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            left: collapsed ? 2 : -12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 3,
            height: 18,
            borderRadius: 3,
            background: c.violet,
          }}
        />
      )}
      <Icon size={17} color={active ? c.violet2 : c.textMuted} style={{ flexShrink: 0 }} />
      {!collapsed && (
        <span style={{ fontSize: 14, fontWeight: active ? 600 : 500, color: active ? c.text : c.textSecondary, whiteSpace: "nowrap" }}>
          {item.label}
        </span>
      )}
      {collapsed && hover && (
        <span
          style={{
            position: "absolute", left: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)",
            background: c.cardElevated, border: `1px solid ${c.borderH}`, color: c.text,
            fontSize: 12, fontWeight: 500, padding: "5px 10px", borderRadius: 7, whiteSpace: "nowrap",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)", zIndex: 50, pointerEvents: "none",
          }}
        >
          {item.label}
        </span>
      )}
    </button>
  );
}

function SectionLabel({ children, collapsed }) {
  if (collapsed) return <div style={{ height: 1, background: c.borderN, margin: "10px 8px" }} />;
  return (
    <div style={{ color: c.textMuted, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", padding: "4px 12px", marginTop: 4 }}>
      {children}
    </div>
  );
}

// Compact progress card shown above the user profile area
function SidebarProgressCard({ collapsed }) {
  const { applications, pct } = mockData.jobSearchProgress;
  if (collapsed) {
    return (
      <div
        title={`Job Search Progress — ${pct}%`}
        style={{ width: 40, height: 40, borderRadius: 10, background: c.card, border: `1px solid ${c.borderN}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}
      >
        <span style={{ color: c.violet2, fontSize: 11, fontWeight: 700 }}>{pct}%</span>
      </div>
    );
  }
  return (
    <div style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 11, padding: "12px 14px" }}>
      <div style={{ color: c.textSecondary, fontSize: 11.5, fontWeight: 600, marginBottom: 8 }}>Job Search Progress</div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span style={{ color: c.text, fontSize: 17, fontWeight: 700 }}>{applications}</span>
        <span style={{ color: c.textMuted, fontSize: 11.5 }}>Applications</span>
      </div>
      <div style={{ width: "100%", height: 5, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: 8 }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: gradient, transition: "width 300ms ease-out" }} />
      </div>
      <div style={{ color: c.violet2, fontSize: 11.5, fontWeight: 600 }}>Keep going!</div>
    </div>
  );
}

function SidebarUserProfile({ collapsed, open, onToggle }) {
  const { name, role, initials: init } = mockData.user;
  return (
    <div style={{ position: "relative" }}>
      {open && (
        <div
          style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: 0, right: collapsed ? "auto" : 0,
            width: collapsed ? 160 : "auto",
            background: c.cardElevated, border: `1px solid ${c.borderH}`, borderRadius: 10,
            padding: 6, boxShadow: "0 12px 28px rgba(0,0,0,0.45)", zIndex: 40,
            animation: "jt-fade-in 160ms ease-out",
          }}
        >
          {[
            { label: "Profile", icon: User },
            { label: "Settings", icon: Settings },
            { label: "Logout", icon: LogOut },
          ].map((opt) => {
            const OptIcon = opt.icon;
            return (
              <button
                key={opt.label}
                className="w-full flex items-center gap-2.5"
                style={{ padding: "8px 10px", borderRadius: 7, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <OptIcon size={14} color={c.textSecondary} />
                <span style={{ color: c.textSecondary, fontSize: 13 }}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={onToggle}
        className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-2.5"}`}
        style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${c.borderN}`, background: c.card, cursor: "pointer" }}
      >
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
          {init}
        </div>
        {!collapsed && (
          <>
            <div style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
              <div style={{ color: c.text, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{name}</div>
              <div style={{ color: c.textMuted, fontSize: 11 }}>{role}</div>
            </div>
            <ChevronDown size={14} color={c.textMuted} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease-out", flexShrink: 0 }} />
          </>
        )}
      </button>
    </div>
  );
}

// Full sidebar contents, shared between the fixed desktop rail and the mobile drawer
function SidebarContent({ active, onNavigate, collapsed, onToggleCollapse, profileOpen, onToggleProfile, showCollapseToggle }) {
  return (
    <>
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`} style={{ paddingLeft: collapsed ? 0 : 4, marginBottom: 26 }}>
        <Logo collapsed={collapsed} />
        {showCollapseToggle && !collapsed && (
          <button
            onClick={onToggleCollapse}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: c.textMuted, padding: 4, borderRadius: 6, display: "flex" }}
          >
            <ChevronsLeft size={16} />
          </button>
        )}
      </div>

      {showCollapseToggle && collapsed && (
        <button
          onClick={onToggleCollapse}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: c.textMuted, padding: 4, borderRadius: 6, display: "flex", margin: "0 auto 18px" }}
        >
          <ChevronsRight size={16} />
        </button>
      )}

      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <SectionLabel collapsed={collapsed}>MAIN</SectionLabel>
        <nav className="flex flex-col gap-1" style={{ paddingLeft: collapsed ? 0 : 12, marginBottom: 6 }}>
          {mockData.mainNav.map((item) => (
            <NavItem key={item.key} item={item} active={active === item.key} onClick={() => onNavigate(item.key)} collapsed={collapsed} />
          ))}
        </nav>

        <SectionLabel collapsed={collapsed}>CAREER</SectionLabel>
        <nav className="flex flex-col gap-1" style={{ paddingLeft: collapsed ? 0 : 12, marginBottom: 6 }}>
          {mockData.careerNav.map((item) => (
            <NavItem key={item.key} item={item} active={active === item.key} onClick={() => onNavigate(item.key)} collapsed={collapsed} />
          ))}
        </nav>

        <SectionLabel collapsed={collapsed}>PRODUCTIVITY</SectionLabel>
        <nav className="flex flex-col gap-1" style={{ paddingLeft: collapsed ? 0 : 12 }}>
          {mockData.productivityNav.map((item) => (
            <NavItem key={item.key} item={item} active={active === item.key} onClick={() => onNavigate(item.key)} collapsed={collapsed} />
          ))}
        </nav>
      </div>

      <div style={{ height: 1, background: c.borderN, margin: "14px 0" }} />

      <div className="flex flex-col gap-2.5">
        <SidebarProgressCard collapsed={collapsed} />

        <button
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
          style={{ padding: collapsed ? "8px 0" : "8px 12px", borderRadius: 9, background: "transparent", border: "none", cursor: "pointer" }}
          title={collapsed ? "Help & Support" : undefined}
        >
          <HelpCircle size={16} color={c.textMuted} style={{ flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: 13, color: c.textSecondary, fontWeight: 500 }}>Help &amp; Support</span>}
        </button>

        <SidebarUserProfile collapsed={collapsed} open={profileOpen} onToggle={onToggleProfile} />
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Feature — Application Pipeline
// ---------------------------------------------------------------------------
function PipelineSection() {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 14, padding: "18px 20px" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600 }}>Application Pipeline</h3>
        <span style={{ color: c.textMuted, fontSize: 12 }}>42 total</span>
      </div>
      <div className="flex items-stretch gap-2" style={{ overflowX: "auto", paddingBottom: 2 }}>
        {mockData.pipelineStages.map((stage, i) => (
          <React.Fragment key={stage.key}>
            <PipelineStage stage={stage} />
            {i < mockData.pipelineStages.length - 1 && (
              <div className="flex items-center" style={{ flexShrink: 0 }}>
                <ArrowRight size={14} color={c.textMuted} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PipelineStage({ stage }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: "1 1 0", minWidth: 92,
        background: hover ? c.cardHover : c.bg3,
        border: `1px solid ${hover ? c.borderH : c.borderN}`,
        borderRadius: 10, padding: "12px 10px",
        transition: "all 180ms ease-out",
        transform: hover ? "translateY(-1px)" : "translateY(0)",
        cursor: "grab",
      }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: stage.color, flexShrink: 0 }} />
        <span style={{ color: c.textMuted, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.02em" }}>{stage.label}</span>
      </div>
      <div style={{ color: c.text, fontSize: 20, fontWeight: 700 }}>{stage.count}</div>
    </div>
  );
}

function NeedsAttention() {
  const items = mockData.needsAttention;
  return (
    <div style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 14, padding: "18px 20px", height: "100%" }}>
      <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Needs Attention</h3>
      {items.length === 0 ? (
        <EmptyState title="You're all caught up" subtitle="No applications need attention right now." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item, i) => <AttentionRow key={i} item={item} />)}
        </div>
      )}
    </div>
  );
}

function AttentionRow({ item }) {
  const Icon = item.icon;
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-3"
      style={{ padding: "10px 12px", borderRadius: 10, background: hover ? c.cardHover : c.bg3, border: `1px solid ${c.borderN}`, borderLeft: `2px solid ${item.color}`, transition: "background 180ms ease-out" }}
    >
      <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={14} color={item.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: c.text, fontSize: 13, fontWeight: 600 }}>{item.title}</div>
        <div style={{ color: c.textMuted, fontSize: 12 }}>{item.detail}</div>
      </div>
      <button style={{ background: "transparent", border: `1px solid ${c.borderH}`, color: c.textSecondary, fontSize: 11.5, fontWeight: 600, padding: "5px 10px", borderRadius: 7, cursor: "pointer", flexShrink: 0 }}>
        {item.action}
      </button>
    </div>
  );
}

function UpcomingInterviews() {
  const items = mockData.interviews;
  return (
    <div style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 14, padding: "18px 20px", height: "100%" }}>
      <div className="flex items-center justify-between mb-3.5">
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600 }}>Upcoming Interviews</h3>
        <span style={{ color: c.violet2, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>View all</span>
      </div>
      {items.length === 0 ? (
        <EmptyState title="Your interview schedule is clear" subtitle="Nothing scheduled right now." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((iv, i) => <InterviewRow key={i} iv={iv} />)}
        </div>
      )}
    </div>
  );
}

function InterviewRow({ iv }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-3"
      style={{ padding: "10px 12px", borderRadius: 10, background: hover ? c.cardHover : c.bg3, border: `1px solid ${c.borderN}`, transition: "background 180ms ease-out" }}
    >
      <div style={{ width: 42, height: 42, borderRadius: 9, background: "rgba(124,92,255,0.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ color: c.violet2, fontSize: 14, fontWeight: 700, lineHeight: 1 }}>{iv.day}</span>
        <span style={{ color: c.violet2, fontSize: 9, fontWeight: 600, letterSpacing: "0.03em" }}>{iv.month}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: c.text, fontSize: 13, fontWeight: 600 }}>{iv.role}</div>
        <div style={{ color: c.textMuted, fontSize: 12 }}>{iv.company} · {iv.time}</div>
      </div>
    </div>
  );
}

function ProductivityStrip() {
  const { streakDays, weekCount, weekGoal } = mockData.productivity;
  const pct = Math.min(100, Math.round((weekCount / weekGoal) * 100));
  return (
    <div className="flex items-center justify-between" style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 14, padding: "16px 22px", flexWrap: "wrap", gap: 16 }}>
      <div className="flex items-center gap-3">
        <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(245,158,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Flame size={17} color={c.warning} />
        </div>
        <div>
          <div style={{ color: c.text, fontSize: 14, fontWeight: 700 }}>{streakDays} Day Application Streak</div>
          <div style={{ color: c.textMuted, fontSize: 12 }}>Keep applying consistently.</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div style={{ textAlign: "right" }}>
          <div style={{ color: c.textMuted, fontSize: 11 }}>This Week</div>
          <div style={{ color: c.text, fontSize: 15, fontWeight: 700 }}>
            {weekCount} <span style={{ color: c.textMuted, fontWeight: 500, fontSize: 12 }}>/ {weekGoal} goal</span>
          </div>
        </div>
        <div style={{ width: 130, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: gradient, borderRadius: 999, transition: "width 300ms ease-out" }} />
        </div>
        <span style={{ color: c.violet2, fontSize: 13, fontWeight: 700, minWidth: 34 }}>{pct}%</span>
      </div>
    </div>
  );
}

function NotificationPanel({ onClose }) {
  const items = mockData.notifications;
  return (
    <div
      style={{
        position: "absolute", top: 46, right: 0, width: 340,
        background: c.cardElevated, border: `1px solid ${c.borderH}`, borderRadius: 12,
        boxShadow: "0 12px 32px rgba(0,0,0,0.45)", zIndex: 30,
        animation: "jt-fade-in 180ms ease-out",
      }}
    >
      <div className="flex items-center justify-between" style={{ padding: "12px 16px", borderBottom: `1px solid ${c.borderN}` }}>
        <span style={{ color: c.text, fontSize: 13.5, fontWeight: 600 }}>Notifications</span>
        <X size={15} color={c.textMuted} style={{ cursor: "pointer" }} onClick={onClose} />
      </div>
      {items.length === 0 ? (
        <div style={{ padding: "24px 16px" }}>
          <EmptyState title="You're all caught up" subtitle="No new notifications." />
        </div>
      ) : (
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {items.map((n, i) => {
            const Icon = n.icon;
            return (
              <div key={i} className="flex items-start gap-3" style={{ padding: "12px 16px", borderBottom: i < items.length - 1 ? `1px solid ${c.borderN}` : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${n.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Icon size={14} color={n.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: c.text, fontSize: 12.5, fontWeight: 600 }}>{n.title}</div>
                  <div style={{ color: c.textMuted, fontSize: 11.5, marginTop: 1 }}>{n.detail}</div>
                  <div style={{ color: c.textMuted, fontSize: 10.5, marginTop: 3 }}>{n.time}</div>
                </div>
                {n.unread && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.violet, flexShrink: 0, marginTop: 4 }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, subtitle }) {
  return (
    <div style={{ textAlign: "center", padding: "18px 8px" }}>
      <div style={{ color: c.textSecondary, fontSize: 13, fontWeight: 600 }}>{title}</div>
      <div style={{ color: c.textMuted, fontSize: 12, marginTop: 3 }}>{subtitle}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function JobTrackApp() {
  const [active, setActive] = useState("dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const hasUnread = mockData.notifications.some((n) => n.unread);

  const navigate = (key) => {
    setActive(key);
    setMobileOpen(false);
  };

  const sidebarWidth = collapsed ? 76 : 240;

  return (
    <div style={{ minHeight: "100vh", background: c.bg, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes jt-fade-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes jt-slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>

      <div style={{ position: "absolute", top: -120, left: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,255,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 200, right: "5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="flex" style={{ position: "relative", zIndex: 1 }}>
        {/* DESKTOP SIDEBAR — hidden below md, width animates on collapse */}
        <aside
          className="hidden md:flex"
          style={{
            width: sidebarWidth, minHeight: "100vh", background: c.bg2, borderRight: `1px solid ${c.borderN}`,
            padding: "22px 16px", flexDirection: "column", flexShrink: 0,
            transition: "width 200ms ease-out",
          }}
        >
          <SidebarContent
            active={active}
            onNavigate={navigate}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((v) => !v)}
            profileOpen={profileOpen}
            onToggleProfile={() => setProfileOpen((v) => !v)}
            showCollapseToggle
          />
        </aside>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div className="md:hidden" style={{ position: "fixed", inset: 0, zIndex: 60 }}>
            <div
              onClick={() => setMobileOpen(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
            />
            <aside
              style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: 260,
                background: c.bg2, borderRight: `1px solid ${c.borderN}`, padding: "22px 16px",
                display: "flex", flexDirection: "column", animation: "jt-slide-in 200ms ease-out",
              }}
            >
              <SidebarContent
                active={active}
                onNavigate={navigate}
                collapsed={false}
                profileOpen={profileOpen}
                onToggleProfile={() => setProfileOpen((v) => !v)}
                showCollapseToggle={false}
              />
            </aside>
          </div>
        )}

        {/* MAIN */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* NAVBAR */}
          <header className="flex items-center justify-between" style={{ padding: "16px 28px", borderBottom: `1px solid ${c.borderN}` }}>
            <div className="flex items-center gap-3">
              <button
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
                style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${c.borderN}`, background: c.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <Menu size={16} color={c.textSecondary} />
              </button>
              <div className="hidden sm:flex items-center gap-2.5" style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 10, padding: "8px 14px", width: 320 }}>
                <Search size={15} color={c.textMuted} />
                <input placeholder="Search applications..." style={{ background: "transparent", border: "none", outline: "none", color: c.text, fontSize: 13, width: "100%" }} />
                <span style={{ color: c.textMuted, fontSize: 10.5, border: `1px solid ${c.borderN}`, borderRadius: 5, padding: "1.5px 5px", flexShrink: 0 }}>Ctrl K</span>
              </div>
            </div>

            <div className="flex items-center gap-4" style={{ position: "relative" }}>
              <button style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${c.borderN}`, background: c.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Moon size={15} color={c.textSecondary} />
              </button>

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${c.borderN}`, background: c.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}
                >
                  <Bell size={15} color={c.textSecondary} />
                  {hasUnread && <span style={{ position: "absolute", top: 7, right: 8, width: 6, height: 6, borderRadius: "50%", background: c.violet }} />}
                </button>
                {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
              </div>

              <div style={{ width: 1, height: 22, background: c.borderN }} />
              <div className="flex items-center gap-2" style={{ cursor: "pointer" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
                  {mockData.user.initials}
                </div>
                <span className="hidden sm:inline" style={{ color: c.text, fontSize: 13, fontWeight: 500 }}>{mockData.user.name}</span>
                <ChevronDown size={14} color={c.textMuted} />
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div style={{ padding: "26px 28px 48px" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 style={{ color: c.text, fontSize: 26, fontWeight: 700, letterSpacing: "-0.01em" }}>Dashboard</h1>
                <p style={{ color: c.textMuted, fontSize: 13, marginTop: 3 }}>Here's how your job search is progressing.</p>
              </div>
              <button
                className="flex items-center gap-2"
                style={{ background: gradient, color: "white", fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer", boxShadow: "0 0 20px rgba(124,92,255,0.25)" }}
              >
                <Plus size={15} />
                Add Application
              </button>
            </div>

            {/* ROW 1 — stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {mockData.stats.map((s) => <StatCard key={s.label} stat={s} />)}
            </div>

            {/* ROW 2 — charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div style={{ gridColumn: "span 2", background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 14, padding: "20px 22px" }} className="lg:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600 }}>Application Activity</h3>
                  <span style={{ color: c.textMuted, fontSize: 12 }}>Last 7 months</span>
                </div>
                <p style={{ color: c.textMuted, fontSize: 12, marginBottom: 8 }}>Cumulative applications submitted over time</p>
                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="fillViolet" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={c.violet} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={c.violet} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="month" stroke={c.textMuted} tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis stroke={c.textMuted} tick={{ fill: c.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: c.cardElevated, border: `1px solid ${c.borderH}`, borderRadius: 8, color: c.text, fontSize: 12 }} labelStyle={{ color: c.textSecondary }} />
                      <Area type="monotone" dataKey="applications" stroke={c.violet2} strokeWidth={2} fill="url(#fillViolet)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 14, padding: "20px 22px" }}>
                <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600, marginBottom: 1 }}>Status Breakdown</h3>
                <p style={{ color: c.textMuted, fontSize: 12, marginBottom: 8 }}>Current pipeline distribution</p>
                <div style={{ height: 150 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={mockData.statusData} dataKey="value" innerRadius={40} outerRadius={58} paddingAngle={3} stroke="none">
                        {mockData.statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: c.cardElevated, border: `1px solid ${c.borderH}`, borderRadius: 8, color: c.text, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1">
                  {mockData.statusData.map((s) => (
                    <div key={s.name} className="flex items-center gap-1.5">
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }} />
                      <span style={{ color: c.textSecondary, fontSize: 11 }}>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3 — Pipeline + Upcoming Interviews */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2">
                <PipelineSection />
              </div>
              <UpcomingInterviews />
            </div>

            {/* ROW 4 — Recent Applications + Needs Attention */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2" style={{ background: c.card, border: `1px solid ${c.borderN}`, borderRadius: 14, overflow: "hidden" }}>
                <div className="flex items-center justify-between" style={{ padding: "16px 20px", borderBottom: `1px solid ${c.borderN}` }}>
                  <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600 }}>Recent Applications</h3>
                  <button style={{ color: c.violet2, fontSize: 13, fontWeight: 600, background: "transparent", border: "none", cursor: "pointer" }}>View all</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table className="w-full" style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Company", "Job Title", "Match", "Resume", "Status", ""].map((h) => (
                          <th key={h} style={{ textAlign: "left", padding: "10px 20px", color: c.textMuted, fontSize: 12, fontWeight: 500, borderBottom: `1px solid ${c.borderN}`, whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.applications.map((app, i) => <TableRow key={i} app={app} idx={i} />)}
                    </tbody>
                  </table>
                </div>
              </div>
              <NeedsAttention />
            </div>

            {/* ROW 5 — Productivity strip */}
            <ProductivityStrip />
          </div>
        </main>
      </div>
    </div>
  );
}

function TableRow({ app, idx }) {
  const [hover, setHover] = useState(false);
  return (
    <tr onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: hover ? "rgba(255,255,255,0.02)" : "transparent", transition: "background 150ms ease-out" }}>
      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${c.borderN}` }}>
        <div className="flex items-center gap-2.5">
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: avatarPalette[idx % avatarPalette.length], display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
            {initials(app.company)}
          </div>
          <span style={{ color: c.text, fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap" }}>{app.company}</span>
        </div>
      </td>
      <td style={{ padding: "14px 20px", color: c.textSecondary, fontSize: 13.5, borderBottom: `1px solid ${c.borderN}`, whiteSpace: "nowrap" }}>{app.role}</td>
      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${c.borderN}` }}>
        <MatchScorePill score={app.matchScore} />
      </td>
      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${c.borderN}` }}>
        <span style={{ color: c.textMuted, fontSize: 12, border: `1px solid ${c.borderN}`, borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap" }}>Resume {app.resume}</span>
      </td>
      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${c.borderN}` }}>
        <Badge status={app.status} />
      </td>
      <td style={{ padding: "14px 20px", borderBottom: `1px solid ${c.borderN}`, textAlign: "right" }}>
        <MoreHorizontal size={16} color={c.textMuted} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
}
