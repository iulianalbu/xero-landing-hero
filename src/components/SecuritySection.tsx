import {
  AppWindow,
  Database,
  Fingerprint,
  Globe2,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

type SecurityPoint = {
  label: string
  icon: LucideIcon
}

const SECURITY_POINTS = [
  { label: 'Envelope encryption', icon: ShieldCheck },
  { label: 'Isolated key management', icon: KeyRound },
  { label: 'Automatic key rotation', icon: RefreshCw },
  { label: 'Least-privilege policies', icon: LockKeyhole },
  { label: 'Tamper-evident audit logs', icon: ScrollText },
  { label: 'Regional data controls', icon: Globe2 },
] satisfies readonly SecurityPoint[]

const COMPLIANCE_BADGES = ['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001', 'PCI DSS'] as const

function ArchitectureVisual() {
  return (
    <figure className="architecture-visual reveal" data-delay="120">
      <svg
        className="architecture-diagram"
        viewBox="0 0 680 520"
        role="img"
        aria-labelledby="security-architecture-title security-architecture-description"
      >
        <title id="security-architecture-title">Xero security architecture</title>
        <desc id="security-architecture-description">
          The Xero encryption layer receives ciphertext from the application,
          performs a policy check before protected data reaches the database,
          unwraps keys through an isolated key vault, and records every event in
          the audit log.
        </desc>

        <g className="architecture-paths">
          <path
            d="M210 86 C238 86 215 218 245 218"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M470 86 C442 86 465 218 435 218"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M210 434 C238 434 215 302 245 302"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M470 434 C442 434 465 302 435 302"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        <g className="architecture-packets" aria-hidden="true">
          <circle
            cx="222"
            cy="130"
            r="4"
            className="architecture-packet architecture-packet--one"
          />
          <circle
            cx="458"
            cy="130"
            r="4"
            className="architecture-packet architecture-packet--two"
          />
          <circle
            cx="222"
            cy="390"
            r="4"
            className="architecture-packet architecture-packet--three"
          />
          <circle
            cx="458"
            cy="390"
            r="4"
            className="architecture-packet architecture-packet--four"
          />
        </g>

        <g className="architecture-path-label" transform="translate(145 142)">
          <rect width="112" height="24" rx="12" />
          <text x="56" y="16" textAnchor="middle">
            Ciphertext
          </text>
        </g>
        <g className="architecture-path-label" transform="translate(423 142)">
          <rect width="112" height="24" rx="12" />
          <text x="56" y="16" textAnchor="middle">
            Key unwrap
          </text>
        </g>
        <g className="architecture-path-label" transform="translate(145 354)">
          <rect width="112" height="24" rx="12" />
          <text x="56" y="16" textAnchor="middle">
            Policy check
          </text>
        </g>
        <g className="architecture-path-label" transform="translate(423 354)">
          <rect width="112" height="24" rx="12" />
          <text x="56" y="16" textAnchor="middle">
            Event record
          </text>
        </g>

        <g className="architecture-node architecture-node--application">
          <rect x="20" y="45" width="190" height="82" rx="14" />
          <circle cx="52" cy="86" r="15" className="architecture-node-icon" />
          <path d="M45 80h14v11H45zM48 77h8" className="architecture-node-glyph" />
          <text x="78" y="82" className="architecture-node-title">
            Application
          </text>
          <text x="78" y="103" className="architecture-node-detail">
            SDK or proxy
          </text>
        </g>

        <g className="architecture-node architecture-node--key-vault">
          <rect x="470" y="45" width="190" height="82" rx="14" />
          <circle cx="502" cy="86" r="15" className="architecture-node-icon" />
          <circle cx="499" cy="83" r="4" className="architecture-node-glyph" />
          <path d="M502 86l7 7m-2-2 3-3" className="architecture-node-glyph" />
          <text x="528" y="82" className="architecture-node-title">
            Key vault
          </text>
          <text x="528" y="103" className="architecture-node-detail">
            Isolated keys
          </text>
        </g>

        <g className="architecture-node architecture-node--database">
          <rect x="20" y="393" width="190" height="82" rx="14" />
          <circle cx="52" cy="434" r="15" className="architecture-node-icon" />
          <ellipse cx="52" cy="428" rx="7" ry="3" className="architecture-node-glyph" />
          <path
            d="M45 428v11c0 2 14 2 14 0v-11M45 433c0 2 14 2 14 0"
            className="architecture-node-glyph"
          />
          <text x="78" y="430" className="architecture-node-title">
            Database
          </text>
          <text x="78" y="451" className="architecture-node-detail">
            Protected values
          </text>
        </g>

        <g className="architecture-node architecture-node--audit-log">
          <rect x="470" y="393" width="190" height="82" rx="14" />
          <circle cx="502" cy="434" r="15" className="architecture-node-icon" />
          <path
            d="M496 427h12M496 432h12M496 437h8"
            className="architecture-node-glyph"
          />
          <text x="528" y="430" className="architecture-node-title">
            Audit log
          </text>
          <text x="528" y="451" className="architecture-node-detail">
            Immutable events
          </text>
        </g>

        <g className="architecture-core">
          <rect x="245" y="185" width="190" height="150" rx="18" />
          <circle cx="340" cy="236" r="31" className="architecture-core-icon" />
          <path
            d="M340 218c8 4 15 6 22 7v13c0 12-7 22-22 29-15-7-22-17-22-29v-13c7-1 14-3 22-7Z"
            className="architecture-shield"
          />
          <path d="m331 242 6 6 13-15" className="architecture-shield-check" />
          <text x="340" y="295" textAnchor="middle" className="architecture-core-title">
            Xero
          </text>
          <text x="340" y="317" textAnchor="middle" className="architecture-core-detail">
            Encryption layer
          </text>
        </g>
      </svg>

      <div
        className="architecture-mobile"
        role="img"
        aria-label="Application data passes through Xero as ciphertext, with policy checks, isolated key unwrapping, and audit event recording."
      >
        <div className="architecture-mobile-core">
          <ShieldCheck size={24} strokeWidth={1.6} aria-hidden="true" />
          <span>
            <strong>Xero</strong>
            <small>Encryption layer</small>
          </span>
        </div>
        <ul className="architecture-mobile-nodes">
          <li>
            <AppWindow size={17} strokeWidth={1.6} aria-hidden="true" />
            <span>
              <strong>Application</strong>
              <small>Ciphertext</small>
            </span>
          </li>
          <li>
            <KeyRound size={17} strokeWidth={1.6} aria-hidden="true" />
            <span>
              <strong>Key vault</strong>
              <small>Key unwrap</small>
            </span>
          </li>
          <li>
            <Database size={17} strokeWidth={1.6} aria-hidden="true" />
            <span>
              <strong>Database</strong>
              <small>Policy check</small>
            </span>
          </li>
          <li>
            <ScrollText size={17} strokeWidth={1.6} aria-hidden="true" />
            <span>
              <strong>Audit log</strong>
              <small>Event record</small>
            </span>
          </li>
        </ul>
      </div>

      <figcaption className="architecture-caption">
        Keys, data, policy decisions, and access records remain separated by design.
      </figcaption>
    </figure>
  )
}

export default function SecuritySection() {
  return (
    <section id="security" className="security-section" aria-labelledby="security-heading">
      <div className="security-inner">
        <div className="security-copy reveal">
          <p className="security-eyebrow">Security by design</p>
          <h2 id="security-heading" className="security-heading">
            Your data remains protected,
            <br />
            even when infrastructure is compromised.
          </h2>
          <p className="security-description">
            Encryption keys are isolated from application data. Policies are evaluated
            before every reveal operation, and all access is recorded in immutable audit
            logs.
          </p>

          <ul className="security-points" aria-label="Security controls">
            {SECURITY_POINTS.map(({ label, icon: Icon }, index) => (
              <li
                key={label}
                className="security-point reveal"
                data-delay={String(50 + index * 45)}
              >
                <span className="security-point-icon" aria-hidden="true">
                  <Icon size={16} strokeWidth={1.7} />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <ArchitectureVisual />
      </div>

      <div className="security-compliance reveal" data-delay="160">
        <ul
          className="security-badges"
          aria-label="Compliance framework placeholders"
        >
          {COMPLIANCE_BADGES.map((badge) => (
            <li key={badge} className="security-badge">
              <Fingerprint size={15} strokeWidth={1.6} aria-hidden="true" />
              <span>{badge}</span>
            </li>
          ))}
        </ul>
        <p className="security-disclaimer">
          Compliance support depends on your configuration and deployment requirements.
        </p>
      </div>
    </section>
  )
}
