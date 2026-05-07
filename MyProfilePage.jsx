import React from "react";
import "./MyProfilePage.css";

import userAvatar from "./assets/account-icon.svg";

function ProfileNav() {
  const links = [
    { href: "#profile-personal", label: "Personal" },
    { href: "#profile-contact", label: "Contact" },
    { href: "#profile-addresses", label: "Addresses" },
    { href: "#profile-education", label: "Education" },
    { href: "#profile-identification", label: "Identification" },
    { href: "#profile-emergency", label: "Emergency" },
    { href: "#profile-preferences", label: "Preferences" },
    { href: "#profile-security", label: "Security" },
    { href: "#profile-documents", label: "Documents" },
  ];

  return (
    <nav className="susi-profile__subnav" aria-label="Profile sections">
      <ul className="susi-profile__subnav-list">
        {links.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="susi-profile__subnav-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ProfileCard({ id, title, badge, badgeVariant, intro, children, actions }) {
  const titleId = `${id}-heading`;
  return (
    <section className="susi-profile-card" id={id} aria-labelledby={titleId}>
      <header className="susi-profile-card__header">
        <div className="susi-profile-card__header-text">
          <h2 className="susi-profile-card__title" id={titleId}>
            {title}
          </h2>
          {badge ? (
            <span className={`susi-profile-card__badge${badgeVariant ? ` susi-profile-card__badge--${badgeVariant}` : ""}`}>
              {badge}
            </span>
          ) : null}
          {intro ? <p className="susi-profile-card__intro">{intro}</p> : null}
        </div>
        {actions ? <div className="susi-profile-card__actions">{actions}</div> : null}
      </header>
      <div className="susi-profile-card__body">{children}</div>
    </section>
  );
}

function ProfileDl({ children }) {
  return <dl className="susi-profile-dl">{children}</dl>;
}

function ProfileRow({ label, value, hint, masked }) {
  return (
    <div className="susi-profile-row">
      <dt className="susi-profile-row__label">{label}</dt>
      <dd className="susi-profile-row__value">
        {masked ? <span className="susi-profile-row__masked">{value}</span> : value}
        {hint ? <span className="susi-profile-row__hint">{hint}</span> : null}
      </dd>
    </div>
  );
}

function SecondaryButton({ children, type = "button" }) {
  return (
    <button type={type} className="susi-profile-btn susi-profile-btn--secondary">
      {children}
    </button>
  );
}

function PrimaryButton({ children, type = "button" }) {
  return (
    <button type={type} className="susi-profile-btn susi-profile-btn--primary">
      {children}
    </button>
  );
}

export default function MyProfilePage() {
  return (
    <div className="susi-profile">
      <header className="susi-profile__page-header">
        <h1 className="susi-profile__title">My Profile</h1>
        <p className="susi-profile__lede">
          View and manage your personal details and account settings. Some fields are verified against official records and
          can only be changed through a formal update request.
        </p>
      </header>

      <div className="susi-profile__summary" aria-label="Account summary">
        <img src={userAvatar} alt="" className="susi-profile__avatar" width={48} height={48} />
        <div className="susi-profile__summary-text">
          <p className="susi-profile__name">John Doe</p>
          <p className="susi-profile__meta">
            <span>Student</span>
            <span className="susi-profile__meta-sep" aria-hidden="true">
              ·
            </span>
            <span className="susi-profile__status">Account status: Active</span>
          </p>
        </div>
        <p className="susi-profile__updated">Profile last reviewed 3 February 2026</p>
      </div>

      <ProfileNav />

      <div className="susi-profile__sections">
        <ProfileCard
          id="profile-personal"
          title="Personal information"
          badge="Editable"
          intro="Details held on your student record. Changes may require verification."
          actions={
            <>
              <SecondaryButton>Edit section</SecondaryButton>
            </>
          }
        >
          <ProfileDl>
            <ProfileRow label="Full name" value="John Doe" />
            <ProfileRow label="Date of birth" value="14 March 2003" />
            <ProfileRow label="Nationality" value="Irish" />
            <ProfileRow label="Preferred language" value="English" />
          </ProfileDl>
        </ProfileCard>

        <ProfileCard
          id="profile-contact"
          title="Contact details"
          badge="Editable"
          actions={<SecondaryButton>Edit section</SecondaryButton>}
        >
          <ProfileDl>
            <ProfileRow label="Primary email" value="john.doe.student@email.com" hint="Used for sign-in and notifications." />
            <ProfileRow label="Mobile number" value="+353 87 123 4567" />
          </ProfileDl>
        </ProfileCard>

        <ProfileCard
          id="profile-addresses"
          title="Addresses"
          badge="Editable"
          actions={<SecondaryButton>Edit section</SecondaryButton>}
        >
          <ProfileDl>
            <ProfileRow
              label="Permanent address"
              value="42 Maple Grove, Dundrum, Dublin 14, D14 X2Y1"
            />
            <ProfileRow
              label="Term-time address"
              value="Same as permanent address"
              hint="Update each academic year if you move during term."
            />
          </ProfileDl>
        </ProfileCard>

        <ProfileCard
          id="profile-education"
          title="Education"
          badge="Read only"
          badgeVariant="muted"
          intro="Sourced from your institution. Request changes through your college if details are incorrect."
        >
          <ProfileDl>
            <ProfileRow label="Institution" value="National College of Ireland" />
            <ProfileRow label="Course" value="BA (Hons) Business" />
            <ProfileRow label="Year of study" value="Year 2" />
            <ProfileRow label="Expected graduation" value="May 2027" />
          </ProfileDl>
        </ProfileCard>

        <ProfileCard
          id="profile-identification"
          title="Identification & references"
          badge="View only"
          badgeVariant="muted"
          intro="Sensitive identifiers are masked. Request a correction if something looks wrong."
          actions={<SecondaryButton type="button">Request correction</SecondaryButton>}
        >
          <ProfileDl>
            <ProfileRow label="Student number" value="SUSI-STU-2024-884920" />
            <ProfileRow label="PPS number" value="•••••••PA" masked hint="Full number is never shown here for your security." />
          </ProfileDl>
        </ProfileCard>

        <ProfileCard
          id="profile-emergency"
          title="Emergency contact"
          badge="Editable"
          actions={<SecondaryButton>Edit section</SecondaryButton>}
        >
          <ProfileDl>
            <ProfileRow label="Name" value="Jane Doe" />
            <ProfileRow label="Relationship" value="Parent / guardian" />
            <ProfileRow label="Phone" value="+353 1 765 4321" />
          </ProfileDl>
        </ProfileCard>

        <ProfileCard
          id="profile-preferences"
          title="Preferences"
          badge="Editable"
          actions={<SecondaryButton>Edit section</SecondaryButton>}
        >
          <ProfileDl>
            <ProfileRow label="Preferred contact channel" value="Email" />
            <ProfileRow label="Application notifications" value="On (email)" />
            <ProfileRow label="Marketing communications" value="Off" hint="Service messages are always sent when required." />
          </ProfileDl>
        </ProfileCard>

        <ProfileCard
          id="profile-security"
          title="Account & security"
          badge="Read only"
          badgeVariant="muted"
          actions={<PrimaryButton type="button">Manage security</PrimaryButton>}
        >
          <ProfileDl>
            <ProfileRow label="Password" value="Last updated 18 November 2025" />
            <ProfileRow label="Two-factor authentication" value="Enabled (authenticator app)" />
            <ProfileRow label="Recent sign-in" value="Today · Chrome on Windows · Dublin (approx.)" />
          </ProfileDl>
          <p className="susi-profile-card__footnote">
            For your protection, security changes may sign you out on other devices.
          </p>
        </ProfileCard>

        <ProfileCard
          id="profile-documents"
          title="Profile documents"
          intro="Supporting documents you have supplied or that we have verified."
          actions={<SecondaryButton type="button">Upload document</SecondaryButton>}
        >
          <div className="susi-profile-table-wrap">
            <table className="susi-profile-table">
              <caption className="susi-profile-visually-hidden">Documents on file</caption>
              <thead>
                <tr>
                  <th scope="col">Document</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Proof of identity</td>
                  <td>
                    <span className="susi-profile-pill susi-profile-pill--success">Verified</span>
                  </td>
                  <td>12 Jan 2026</td>
                  <td>
                    <button type="button" className="susi-profile-link-btn">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Proof of address</td>
                  <td>
                    <span className="susi-profile-pill susi-profile-pill--pending">Pending review</span>
                  </td>
                  <td>2 Feb 2026</td>
                  <td>
                    <button type="button" className="susi-profile-link-btn">
                      Replace
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Student status letter</td>
                  <td>
                    <span className="susi-profile-pill susi-profile-pill--muted">Not uploaded</span>
                  </td>
                  <td>—</td>
                  <td>
                    <button type="button" className="susi-profile-link-btn">
                      Upload
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ProfileCard>

        <footer className="susi-profile__footer-actions">
          <p className="susi-profile__footer-note">
            Need help with your details?{" "}
            <a href="#help" className="susi-profile-inline-link">
              Contact support
            </a>{" "}
            or read our{" "}
            <a href="#privacy" className="susi-profile-inline-link">
              privacy notice
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
