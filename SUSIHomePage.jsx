import React, { useEffect, useState } from "react";
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

function Header({ onNotificationClick, notificationOpen }) {
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
        <button
          type="button"
          className="susi-header__notification susi-header__notification-btn"
          aria-label="Open notifications"
          aria-haspopup="dialog"
          aria-expanded={notificationOpen}
          onClick={onNotificationClick}
        >
          <img src={ASSETS.iconNotification} alt="Notifications" className="susi-header__bell" />
          <span className="susi-header__badge" aria-hidden="true">1</span>
        </button>

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

function NotificationModal({ onClose }) {
  return (
    <div className="susi-notification-modal__backdrop" onClick={onClose}>
      <div
        className="susi-notification-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Message from assessor"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="susi-notification-modal__header">
          <h2 className="susi-notification-modal__title">We found an issue with one of your documents</h2>
          <div className="susi-notification-modal__header-actions">
            <button type="button" className="susi-notification-modal__icon-btn" aria-label="Open in new view">
              ↗
            </button>
            <button type="button" className="susi-notification-modal__icon-btn" aria-label="Close message" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        <p className="susi-notification-modal__intro">
          Our case office has reviewed your application and they have found an issue, they have provided a message
          for you below, please read it carefully and complete the tasks required.
        </p>

        <div className="susi-notification-modal__message">
          <p className="susi-notification-modal__assessor">John Doe, Assessor.</p>
          <div className="susi-notification-modal__message-row">
            <img src={ASSETS.userAvatar} alt="" aria-hidden="true" className="susi-notification-modal__avatar" />
            <div className="susi-notification-modal__message-body">
              <p>
                Thank you for submitting your student grant application. During our review, we identified an issue
                with one of the supporting documents provided. Specifically, the bank statement submitted for your
                father is no longer valid, as it is dated more than three months prior to the application date.
              </p>
              <p>
                To continue processing your application, we kindly ask that you upload a more recent bank statement
                (dated within the last three months) for your father.
              </p>
              <p>
                Please click the button below to update your documents. If you have any questions or need assistance,
                our support team is here to help.
              </p>
              <p>Kind regards,</p>
              <p>SUSI Assessment Team</p>
            </div>
          </div>
        </div>

        <div className="susi-notification-modal__footer">
          <button type="button" className="susi-btn susi-btn--pink">Update Documentation</button>
        </div>
      </div>
    </div>
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    if (!isNotificationOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsNotificationOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNotificationOpen]);

  return (
    <div className="susi-layout">
      <Sidebar />

      <main className="susi-main">
        <Header
          onNotificationClick={() => setIsNotificationOpen(true)}
          notificationOpen={isNotificationOpen}
        />
        <HeroBanner />

        <div className="susi-content-row">
          <div className="susi-content-row__left">
            <ApplicationCard />
            <StudentIllustration />
          </div>
          <ImportantDates />
        </div>

        {isNotificationOpen && (
          <NotificationModal onClose={() => setIsNotificationOpen(false)} />
        )}
      </main>
    </div>
  );
}
