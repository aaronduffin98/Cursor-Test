import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./SUSIHomePage.css";
import MyProfilePage from "./MyProfilePage.jsx";

import logoSrc from "./assets/susi-logo.svg";
import iconHome from "./assets/home.svg";
import iconApplication from "./assets/application.svg";
import iconAppeals from "./assets/appeals.svg";
import iconPayments from "./assets/payments.svg";
import iconProfile from "./assets/profile.svg";
import iconHelpSupport from "./assets/help&support.svg";
import iconNotification from "./assets/notifications.svg";
import iconPhone from "./assets/support-contact.svg";
import iconStartApp from "./assets/start-application-icon.svg";
import userAvatar from "./assets/account-icon.svg";
import studentIllustration from "./assets/person-illistration.svg";
import primaryIcon from "./assets/primary-icon.svg";
import iconCalendar from "./assets/calendar_month.svg";
import iconArrowRight from "./assets/secondary-arrow.svg";

const ASSETS = {
  logo: logoSrc,
  navIconHome: iconHome,
  iconApplication,
  iconAppeals,
  iconPayments,
  iconProfile,
  iconHelp: iconHelpSupport,
  iconPhone,
  iconNotification,
  iconStartApp,
  userAvatar,
  studentIllustration,
  primaryIcon,
  iconCalendar,
  iconArrowRight,
};

const heroBgUrl = "https://www.figma.com/api/mcp/asset/c051a478-1edc-4765-ae7d-6be25cb061ba";

const IMPORTANT_DATES = [
  { id: "renewal-open", label: "Renewal Applications Open", date: "6 March 2025 - 12AM" },
  { id: "new-open", label: "New Applications Open", date: "3 April 2025 - 12AM" },
  { id: "priority-renew", label: "Priority Closing Date (Renewals)", date: "5 June 2025" },
  { id: "priority-new", label: "Priority Closing Date (New Applications)", date: "10 July 2025" },
  { id: "final-close", label: "Final Closing Date (All Applications)", date: "7 November 2025 - 12PM" },
];

const NAV_ITEMS = [
  { id: "current", label: "Current Application", icon: ASSETS.navIconHome },
  { id: "history", label: "Application History", icon: ASSETS.iconApplication },
  { id: "appeals", label: "Appeals", icon: ASSETS.iconAppeals },
  { id: "payments", label: "Payments", icon: ASSETS.iconPayments },
  { id: "profile", label: "My Profile", icon: ASSETS.iconProfile },
  { id: "help", label: "Help & Support", icon: ASSETS.iconHelp },
];

function navHrefForItem(itemId) {
  if (itemId === "profile") return "#profile";
  if (itemId === "current") return "#";
  return `#${itemId}`;
}

function isProfileHash(hash) {
  return hash === "#profile" || hash.startsWith("#profile-");
}

const APPLICATION_SECTIONS = [
  {
    id: "section-1",
    section: "Section 1",
    progress: "100% Complete",
    title: "Personal Details",
    items: ["Data Protection Information", "Applicants Personal Details"],
    verified: true,
    action: "Review",
  },
  {
    id: "section-2",
    section: "Section 2",
    progress: "100% Complete",
    title: "Nationality & Residency",
    items: ["Country Information", "Resident of the State/EU,UK or Switzerland"],
    verified: true,
    action: "Review",
  },
  {
    id: "section-3",
    section: "Section 3",
    progress: "100% Complete",
    title: "New Course and Previous Courses",
    items: ["Course Details/ Previous Education", "Previous Grant/Funding"],
    verified: true,
    action: "Review",
  },
  {
    id: "section-4",
    section: "Section 4",
    progress: "100% Complete",
    title: "Dependent Children & Relevant Persons",
    items: ["Number of Dependent Children", "List of Dependent Children"],
    verified: true,
    action: "Review",
  },
  {
    id: "section-5",
    section: "Section 5",
    progress: "60% Complete",
    title: "Income",
    items: ["Important Information: Declare all income", "Declaring income: Job, Social welfare, Rent"],
    verified: true,
    action: "Review",
    warningBorder: true,
  },
  {
    id: "section-6",
    section: "Section 6",
    progress: "0% Complete",
    title: "Other Parties To Application",
    items: ["Parent (Father)", "Parent (Mother)"],
    verified: false,
    action: "Open",
    actionRequired: true,
  },
];

function Sidebar({ activeNavId }) {
  return (
    <aside className="susi-sidebar">
      <nav className="susi-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={navHrefForItem(item.id)}
            className={`susi-nav__item${item.id === activeNavId ? " susi-nav__item--active" : ""}`}
            aria-current={item.id === activeNavId ? "page" : undefined}
          >
            <img src={item.icon} alt="" className="susi-nav__icon" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Header({ onNotificationClick, notificationOpen, notificationBellRef }) {
  return (
    <header className="susi-header">
      <img src={ASSETS.logo} alt="SUSI — Student Universal Support Ireland" className="susi-header__logo" />

      <div className="susi-header__actions">
        <div className="susi-header__support">
          <img src={ASSETS.iconPhone} alt="" className="susi-header__support-icon" aria-hidden="true" />
          <span className="susi-header__support-label">Support:</span>
          <a href="tel:0818888777" className="susi-header__support-number">0818 888 777</a>
        </div>

        <button
          ref={notificationBellRef}
          type="button"
          className="susi-header__notification susi-header__notification-btn"
          aria-label="Open notifications"
          aria-haspopup="dialog"
          aria-expanded={notificationOpen}
          onClick={onNotificationClick}
        >
          <img src={ASSETS.iconNotification} alt="Notifications" className="susi-header__bell" />
          <span className="susi-header__badge" aria-hidden="true">
            <span className="susi-header__badge-count">1</span>
          </span>
        </button>

        <div className="susi-header__divider" aria-hidden="true" />

        <div className="susi-header__profile">
          <img src={ASSETS.userAvatar} alt="User avatar" className="susi-header__avatar" />
          <div className="susi-header__profile-info">
            <span className="susi-header__profile-name">John Doe</span>
            <span className="susi-header__profile-role">Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function PrototypeUscSwitcher({ mode, onChange, position, onDragStart }) {
  return (
    <div className="susi-usc-float" style={{ left: position.x, top: position.y }} aria-label="Prototype use case switcher">
      <button
        type="button"
        className="susi-usc-float__grab"
        title="Drag to move prototype switcher"
        onMouseDown={onDragStart}
      >
        ⋮⋮
      </button>
      <span className="susi-usc__label">Prototype USC</span>
      <button
        type="button"
        className={`susi-usc__chip${mode === "usc1" ? " susi-usc__chip--active" : ""}`}
        onClick={() => onChange("usc1")}
      >
        USC 1 · Apply
      </button>
      <button
        type="button"
        className={`susi-usc__chip${mode === "usc2" ? " susi-usc__chip--active" : ""}`}
        onClick={() => onChange("usc2")}
      >
        USC 2 · Reviewed
      </button>
    </div>
  );
}

function DashboardIntro() {
  return (
    <section className="susi-dashboard-intro">
      <div className="susi-dashboard-intro__top-row">
        <h1 className="susi-dashboard-intro__title">Welcome to my SUSI Portal</h1>
        <div className="susi-dashboard-intro__actions">
          <span className="susi-status-chip">
            <span className="susi-status-chip__dot" aria-hidden="true" />
            Status Applicant Action Required
          </span>
          <button type="button" className="susi-btn susi-btn--pink">Submit Application</button>
        </div>
      </div>

      <div className="susi-dashboard-intro__bottom-row">
        <div className="susi-assessor-card">
          <div className="susi-assessor-card__header">
            <img src={ASSETS.iconStartApp} alt="" aria-hidden="true" className="susi-assessor-card__mail-icon" />
            <h2>Our Assessor has reviewed and has some tasks for you to complete</h2>
          </div>
          <p>
            We&apos;ve reviewed your application and found an issue with the income information provided. To continue
            processing your application, please review and update the income section. You can upload supporting
            documents or make corrections through the portal.
          </p>
          <p>If you need help, visit the Help Centre or contact our support team.</p>
        </div>

        <div className="susi-illustration" aria-hidden="true">
          <img src={ASSETS.studentIllustration} alt="" className="susi-illustration__figure" />
        </div>
      </div>
    </section>
  );
}

function HeroBanner() {
  return (
    <section className="susi-hero" aria-label="Welcome banner">
      <div className="susi-hero__bg" aria-hidden="true">
        <img src={heroBgUrl} alt="" className="susi-hero__bg-img" />
        <div className="susi-hero__overlay" />
      </div>
      <div className="susi-hero__content">
        <div className="susi-hero__intro">
          <h1 className="susi-hero__title">Welcome to the My SUSI Portal</h1>
          <p className="susi-hero__subtitle">
            You haven&apos;t applied for a student grant yet. Take the eligibility test to see what best suits your needs
          </p>
        </div>
        <button type="button" className="susi-btn">
          Take the eligibility test
          <img src={ASSETS.primaryIcon} alt="" className="susi-btn__arrow" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function ApplicationCard() {
  return (
    <div className="susi-application-card">
      <div className="susi-application-card__header">
        <img src={ASSETS.iconStartApp} alt="" aria-hidden="true" className="susi-application-card__icon" />
        <h2 className="susi-application-card__title">Start an application</h2>
      </div>
      <div className="susi-application-card__body">
        <p>
          You haven&apos;t started your grant application yet. Once you apply, your timeline will show key updates like
          application status, decisions, payments, and more all in one place.
        </p>
        <p>Ready to begin? Click Start Application to get going.</p>
      </div>
      <button type="button" className="susi-btn">
        Start an application
        <img src={ASSETS.primaryIcon} alt="" className="susi-btn__arrow" aria-hidden="true" />
      </button>
    </div>
  );
}

function ImportantDates() {
  return (
    <aside className="susi-dates-panel" aria-label="Important application dates">
      <div className="susi-dates-panel__header">
        <img src={ASSETS.iconCalendar} alt="" aria-hidden="true" className="susi-dates-panel__icon" />
        <h2 className="susi-dates-panel__title">Important Dates</h2>
      </div>
      <ul className="susi-dates-list">
        {IMPORTANT_DATES.map((item, index) => (
          <React.Fragment key={item.id}>
            <li className="susi-dates-list__item">
              <span className="susi-dates-list__label">{item.label}</span>
              <span className="susi-dates-list__date">{item.date}</span>
            </li>
            {index < IMPORTANT_DATES.length - 1 && <li className="susi-dates-list__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </ul>
      <div className="susi-dates-panel__footer">
        <a href="#dates-info" className="susi-dates-panel__more-link">
          More info on Dates
          <img src={ASSETS.iconArrowRight} alt="" className="susi-dates-panel__more-chevron" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}

function ApplicationSectionCard({ section }) {
  return (
    <article className={`susi-grant-card${section.warningBorder ? " susi-grant-card--warning" : ""}`}>
      <div className="susi-grant-card__heading-row">
        <span>{section.section}</span>
        <span>{section.progress}</span>
      </div>
      <h3 className="susi-grant-card__title">{section.title}</h3>

      <ol className="susi-grant-card__tasks">
        {section.items.map((item, index) => (
          <li className="susi-grant-card__task" key={`${section.id}-${item}`}>
            <span className="susi-grant-card__task-index">{index + 1}</span>
            <span className={`susi-grant-card__task-label${item.includes("(Father)") ? " susi-grant-card__task-label--error" : ""}`}>
              {item}
            </span>
            <span className={`susi-grant-card__task-status${item.includes("(Father)") ? " susi-grant-card__task-status--error" : ""}`}>
              {item.includes("(Father)") ? "×" : "✓"}
            </span>
          </li>
        ))}
      </ol>

      <div className="susi-grant-card__footer">
        {section.verified && <span className="susi-verified-chip">Section Verified</span>}
        {section.actionRequired && <span className="susi-action-required-chip">Action Required</span>}
        <a href={`#${section.id}`} className="susi-grant-card__action-link">
          {section.action}
          <img src={ASSETS.iconArrowRight} alt="" aria-hidden="true" className="susi-grant-card__action-arrow" />
        </a>
      </div>
    </article>
  );
}

function ApplicationGrid() {
  return (
    <section className="susi-grant-section" aria-label="SUSI grant application sections">
      <h2 className="susi-grant-section__title">Your SUSI Grant Application</h2>
      <div className="susi-grant-grid">
        {APPLICATION_SECTIONS.map((section) => (
          <ApplicationSectionCard key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}

function NotificationModalExpandIcon() {
  return (
    <svg className="susi-notification-modal__expand-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
      />
    </svg>
  );
}

function getClampedBellTransformOrigin(shellEl, innerEl, bellEl) {
  const br = bellEl.getBoundingClientRect();
  const sr = shellEl.getBoundingClientRect();
  let ox = br.left + br.width / 2 - sr.left;
  let oy = br.top + br.height / 2 - sr.top;
  const w = innerEl.offsetWidth;
  const h = innerEl.offsetHeight;
  const pad = 16;
  if (w <= 2 * pad || h <= 2 * pad) {
    return { ox: w / 2, oy: h / 2 };
  }
  return {
    ox: Math.min(Math.max(pad, ox), w - pad),
    oy: Math.min(Math.max(pad, oy), h - pad),
  };
}

function NotificationModal({ onClose, bellRef }) {
  const shellRef = useRef(null);
  const modalRef = useRef(null);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const inner = modalRef.current;
    const bell = bellRef?.current;
    if (!shell || !inner || !bell) return;
    const { ox, oy } = getClampedBellTransformOrigin(shell, inner, bell);
    inner.style.transformOrigin = `${ox}px ${oy}px`;
  }, [bellRef]);

  useEffect(() => {
    if (!animateOpen || isLeaving) return undefined;
    const inner = modalRef.current;
    if (!inner) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      inner.style.transformOrigin = "50% 50%";
      return undefined;
    }

    const lockCenterAfterOpen = (event) => {
      if (event.target !== inner || event.propertyName !== "transform") return;
      inner.style.transformOrigin = "50% 50%";
      inner.removeEventListener("transitionend", lockCenterAfterOpen);
    };
    inner.addEventListener("transitionend", lockCenterAfterOpen);
    return () => inner.removeEventListener("transitionend", lockCenterAfterOpen);
  }, [animateOpen, isLeaving]);

  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setAnimateOpen(true);
      return undefined;
    }
    let innerId;
    const outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(() => setAnimateOpen(true));
    });
    return () => {
      cancelAnimationFrame(outerId);
      if (innerId !== undefined) cancelAnimationFrame(innerId);
    };
  }, []);

  useEffect(() => {
    if (!isLeaving) return undefined;
    const modal = modalRef.current;
    if (!modal) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onClose();
      return undefined;
    }

    let finished = false;
    const handleEnd = (event) => {
      if (event.target !== modal) return;
      if (event.propertyName !== "transform") return;
      if (finished) return;
      finished = true;
      onClose();
    };
    modal.addEventListener("transitionend", handleEnd);
    const fallback = window.setTimeout(() => {
      if (!finished) {
        finished = true;
        onClose();
      }
    }, 500);
    return () => {
      modal.removeEventListener("transitionend", handleEnd);
      window.clearTimeout(fallback);
    };
  }, [isLeaving, onClose]);

  useEffect(() => {
    if (!animateOpen || isLeaving) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsLeaving(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [animateOpen, isLeaving]);

  const beginClose = () => {
    const shell = shellRef.current;
    const inner = modalRef.current;
    const bell = bellRef?.current;
    if (shell && inner && bell) {
      const { ox, oy } = getClampedBellTransformOrigin(shell, inner, bell);
      inner.style.transformOrigin = `${ox}px ${oy}px`;
    }
    setIsLeaving(true);
  };

  const modalClassName = [
    "susi-notification-modal",
    animateOpen ? "susi-notification-modal--open" : "",
    isLeaving ? "susi-notification-modal--leave" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const backdropClassName = [
    "susi-notification-modal__backdrop",
    animateOpen && !isLeaving ? "susi-notification-modal__backdrop--visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={backdropClassName} onClick={beginClose}>
      <div
        ref={shellRef}
        className="susi-notification-modal-shell"
        role="presentation"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={modalRef}
          className={modalClassName}
          role="dialog"
          aria-modal="true"
          aria-labelledby="susi-notification-modal-title"
        >
        <div className="susi-notification-modal__header">
          <h2 id="susi-notification-modal-title" className="susi-notification-modal__title">
            We found an issue with one of your documents
          </h2>
          <div className="susi-notification-modal__header-actions">
            <button type="button" className="susi-notification-modal__icon-btn" aria-label="Expand dialog">
              <NotificationModalExpandIcon />
            </button>
            <button type="button" className="susi-notification-modal__icon-btn" aria-label="Close message" onClick={beginClose}>
              ×
            </button>
          </div>
        </div>
        <p className="susi-notification-modal__intro">
          Our case office has reviewed your application and they have found an issue, they have provided a message for
          you below, please read it carefully and complete the tasks required.
        </p>

        <div className="susi-notification-modal__message-card">
          <p className="susi-notification-modal__assessor-line">John Doe, Assessor.</p>
          <div className="susi-notification-modal__message-body">
            <img src={ASSETS.userAvatar} alt="" className="susi-header__avatar" width={36} height={36} />
            <div className="susi-notification-modal__message-text">
              <p>
                Thank you for submitting your student grant application. During our review, we identified an issue with
                one of the supporting documents provided. Specifically, the bank statement submitted for your father is
                no longer valid, as it is dated more than three months prior to the application date.
              </p>
              <p>
                To continue processing your application, we kindly ask that you upload a more recent bank statement
                (dated within the last three months) for your father.
              </p>
              <p>
                Please click the button below to update your documents. If you have any questions or need assistance, our
                support team is here to help.
              </p>
              <p className="susi-notification-modal__signoff">Kind regards, SUSI Assessment Team</p>
            </div>
          </div>
        </div>

        <div className="susi-notification-modal__footer">
          <button type="button" className="susi-btn susi-notification-modal__cta">
            Update Documentation
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function SUSIHomePage() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationBellRef = useRef(null);
  const [uscMode, setUscMode] = useState("usc2");
  const [switcherPos, setSwitcherPos] = useState({ x: 260, y: 12 });
  const [isDraggingSwitcher, setIsDraggingSwitcher] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [routeHash, setRouteHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRouteHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isProfilePage = isProfileHash(routeHash);
  const activeNavId = isProfilePage ? "profile" : "current";

  useEffect(() => {
    if (!isDraggingSwitcher) return undefined;

    const handleMouseMove = (event) => {
      setSwitcherPos({
        x: Math.max(8, event.clientX - dragOffsetRef.current.x),
        y: Math.max(8, event.clientY - dragOffsetRef.current.y),
      });
    };

    const handleMouseUp = () => setIsDraggingSwitcher(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSwitcher]);

  const handleSwitcherDragStart = (event) => {
    setIsDraggingSwitcher(true);
    dragOffsetRef.current = {
      x: event.clientX - switcherPos.x,
      y: event.clientY - switcherPos.y,
    };
  };

  return (
    <div className="susi-layout">
      {!isProfilePage && (
        <PrototypeUscSwitcher
          mode={uscMode}
          onChange={setUscMode}
          position={switcherPos}
          onDragStart={handleSwitcherDragStart}
        />
      )}
      <Sidebar activeNavId={activeNavId} />
      <main className="susi-main">
        <Header
          onNotificationClick={() => setIsNotificationOpen(true)}
          notificationOpen={isNotificationOpen}
          notificationBellRef={notificationBellRef}
        />
        {isProfilePage ? (
          <MyProfilePage />
        ) : uscMode === "usc1" ? (
          <div className="susi-apply-layout">
            <HeroBanner />
            <div className="susi-content-row">
              <div className="susi-content-row__left">
                <ApplicationCard />
                <div className="susi-illustration" aria-hidden="true">
                  <img src={ASSETS.studentIllustration} alt="" className="susi-illustration__figure" />
                </div>
              </div>
              <ImportantDates />
            </div>
          </div>
        ) : (
          <>
            <DashboardIntro />
            <ApplicationGrid />
          </>
        )}
      </main>
      {isNotificationOpen && (
        <NotificationModal bellRef={notificationBellRef} onClose={() => setIsNotificationOpen(false)} />
      )}
    </div>
  );
}
