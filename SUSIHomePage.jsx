import React from "react";
import "./SUSIHomePage.css";

// ---------------------------------------------------------------------------
// Local asset imports from /assets
// ---------------------------------------------------------------------------
import logoSrc           from "./assets/susi-logo.svg";
import iconHome          from "./assets/home.svg";
import iconApplication   from "./assets/application.svg";
import iconAppeals       from "./assets/appeals.svg";
import iconPayments      from "./assets/payments.svg";
import iconProfile       from "./assets/profile.svg";
import iconHelpSupport   from "./assets/help&support.svg";
import iconNotification  from "./assets/notifications.svg";
import iconPhone         from "./assets/support-contact.svg";
import iconArrowRight    from "./assets/secondary-arrow.svg";
import iconCalendar      from "./assets/calendar_month.svg";
import iconStartApp      from "./assets/start-application-icon.svg";
import userAvatar        from "./assets/account-icon.svg";
import studentIllustration from "./assets/person-illistration.svg";
import primaryIcon       from "./assets/primary-icon.svg";

// Hero background still uses Figma CDN (no local image provided yet)
const heroBgUrl = "https://www.figma.com/api/mcp/asset/c051a478-1edc-4765-ae7d-6be25cb061ba";

const ASSETS = {
  logo:               logoSrc,
  heroBg:             heroBgUrl,
  navIconHome:        iconHome,
  iconApplication:    iconApplication,
  iconAppeals:        iconAppeals,
  iconPayments:       iconPayments,
  iconProfile:        iconProfile,
  iconHelp:           iconHelpSupport,
  iconPhone:          iconPhone,
  iconNotification:   iconNotification,
  iconArrowRight:     iconArrowRight,
  iconCalendar:       iconCalendar,
  assignmentCardIcon: iconStartApp,
  userAvatar:         userAvatar,
  studentIllustration: studentIllustration,
  primaryIcon:        primaryIcon,
};

// ---------------------------------------------------------------------------
// Navigation items
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { id: "current",  label: "Current Application",  icon: ASSETS.navIconHome,       active: true  },
  { id: "history",  label: "Application History",  icon: ASSETS.iconApplication,   active: false },
  { id: "appeals",  label: "Appeals",               icon: ASSETS.iconAppeals,       active: false },
  { id: "payments", label: "Payments",              icon: ASSETS.iconPayments,      active: false },
  { id: "profile",  label: "My Profile",            icon: ASSETS.iconProfile,       active: false },
  { id: "help",     label: "Help & Support",        icon: ASSETS.iconHelp,          active: false },
];

// ---------------------------------------------------------------------------
// Important dates data
// ---------------------------------------------------------------------------
const IMPORTANT_DATES = [
  { id: "renewal-open",    label: "Renewal Applications Open",         date: "6 March 2025 - 12AM"    },
  { id: "new-open",        label: "New Applications Open",             date: "3 April 2025 - 12AM"    },
  { id: "priority-renew",  label: "Priority Closing Date (Renewals)",  date: "5 June 2025"             },
  { id: "priority-new",    label: "Priority Closing Date (New Applications)", date: "10 July 2025"    },
  { id: "final-close",     label: "Final Closing Date (All Applications)", date: "7 November 2025 - 12PM" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Sidebar() {
  return (
    <aside className="susi-sidebar">
      <nav className="susi-nav">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`susi-nav__item${item.active ? " susi-nav__item--active" : ""}`}
          >
            <img src={item.icon} alt="" className="susi-nav__icon" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Header() {
  return (
    <header className="susi-header">
      <img src={ASSETS.logo} alt="SUSI — Student Universal Support Ireland" className="susi-header__logo" />

      <div className="susi-header__actions">
        {/* Support number */}
        <div className="susi-header__support">
          <img src={ASSETS.iconPhone} alt="" className="susi-header__support-icon" aria-hidden="true" />
          <span className="susi-header__support-label">Support:</span>
          <a href="tel:0818888777" className="susi-header__support-number">0818 888 777</a>
        </div>

        {/* Notification bell */}
        <div className="susi-header__notification" role="status" aria-label="1 notification">
          <img src={ASSETS.iconNotification} alt="Notifications" className="susi-header__bell" />
          <span className="susi-header__badge" aria-hidden="true">1</span>
        </div>

        <div className="susi-header__divider" aria-hidden="true" />

        {/* User profile chip */}
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

function HeroBanner() {
  return (
    <section className="susi-hero" aria-label="Welcome banner">
      <div className="susi-hero__bg" aria-hidden="true">
        <img src={ASSETS.heroBg} alt="" className="susi-hero__bg-img" />
        <div className="susi-hero__overlay" />
      </div>

      <div className="susi-hero__content">
        <h1 className="susi-hero__title">Welcome to the My SUSI Portal</h1>
        <p className="susi-hero__subtitle">
          You haven't applied for a student grant yet. Take the eligibility test to see what best suits your needs
        </p>
        <a href="#eligibility" className="susi-btn susi-btn--pink">
          Take the eligibility test
          <img src={ASSETS.primaryIcon} alt="" className="susi-btn__arrow" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function ApplicationCard() {
  return (
    <div className="susi-application-card">
      <div className="susi-application-card__header">
        <img src={ASSETS.assignmentCardIcon} alt="" aria-hidden="true" className="susi-application-card__icon" />
        <h2 className="susi-application-card__title">Start an application</h2>
      </div>
      <div className="susi-application-card__body">
        <p>
          You haven't started your grant application yet. Once you apply, your timeline will show key updates like
          application status, decisions, payments, and more all in one place.
        </p>
        <p>Ready to begin? Click Start Application to get going.</p>
      </div>
      <a href="#start-application" className="susi-btn susi-btn--pink">
        Start an application
        <img src={ASSETS.primaryIcon} alt="" className="susi-btn__arrow" aria-hidden="true" />
      </a>
    </div>
  );
}

function StudentIllustration() {
  return (
    <div className="susi-illustration" aria-hidden="true">
      <img src={ASSETS.studentIllustration} alt="" className="susi-illustration__figure" />
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
            {index < IMPORTANT_DATES.length - 1 && (
              <li role="separator" className="susi-dates-list__divider" aria-hidden="true" />
            )}
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

// ---------------------------------------------------------------------------
// Page root
// ---------------------------------------------------------------------------
export default function SUSIHomePage() {
  return (
    <div className="susi-layout">
      <Sidebar />

      <main className="susi-main">
        <Header />
        <HeroBanner />

        <div className="susi-content-row">
          <div className="susi-content-row__left">
            <ApplicationCard />
            <StudentIllustration />
          </div>
          <ImportantDates />
        </div>
      </main>
    </div>
  );
}
