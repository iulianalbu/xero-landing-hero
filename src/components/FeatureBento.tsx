import {
  Activity,
  KeyRound,
  LockKeyhole,
  Search,
  type LucideIcon,
} from 'lucide-react'

type FeatureId = 'token' | 'policy' | 'query' | 'audit'

type FeatureDefinition = {
  id: FeatureId
  title: string
  description: string
  icon: LucideIcon
  illustration: () => React.JSX.Element
  delay: string
}

type TokenRow = {
  label: string
  plaintext: string
  token: string
}

type PolicyRow = {
  role: string
  permission: string
  status: 'limited' | 'allowed' | 'denied'
}

type AuditEvent = {
  time: string
  service: string
  action: string
  status: 'success' | 'review' | 'system'
}

const tokenRows: readonly TokenRow[] = [
  { label: 'Customer', plaintext: 'Maya Chen', token: 'tok_7f3a...' },
  { label: 'Email', plaintext: 'maya@example.com', token: 'tok_b81c...' },
  {
    label: 'Payment',
    plaintext: '4242 4242 4242 4242',
    token: 'tok_45de...',
  },
]

const policyRows: readonly PolicyRow[] = [
  {
    role: 'Support agent',
    permission: 'Last 4 digits',
    status: 'limited',
  },
  {
    role: 'Billing service',
    permission: 'Full access',
    status: 'allowed',
  },
  { role: 'Analytics', permission: 'Denied', status: 'denied' },
]

const auditEvents: readonly AuditEvent[] = [
  {
    time: '14:32:08',
    service: 'billing-api',
    action: 'Decrypted payment token',
    status: 'success',
  },
  {
    time: '14:31:54',
    service: 'support-portal',
    action: 'Revealed email address',
    status: 'review',
  },
  {
    time: '14:30:12',
    service: 'key-service',
    action: 'Rotated encryption key',
    status: 'system',
  },
]

function TokenizationIllustration() {
  return (
    <div
      className="token-illustration"
      aria-label="Sensitive values transformed into stable tokens"
      role="img"
    >
      <div className="token-heading" aria-hidden="true">
        <span>Plaintext</span>
        <span>Protected token</span>
      </div>
      <div className="token-rows" aria-hidden="true">
        {tokenRows.map((row, index) => (
          <div className="token-row" key={row.label}>
            <div className="token-source">
              <span className="token-label">{row.label}</span>
              <span className="token-plaintext">{row.plaintext}</span>
            </div>
            <div className="token-path">
              {index === 1 ? <span className="token-particle" /> : null}
              <span className="token-node">
                <KeyRound aria-hidden="true" size={14} strokeWidth={1.7} />
              </span>
            </div>
            <code className="token-value">{row.token}</code>
          </div>
        ))}
      </div>
    </div>
  )
}

function PolicyIllustration() {
  return (
    <div className="policy-editor">
      <div className="policy-toolbar">
        <span className="policy-toolbar__icon" aria-hidden="true">
          <LockKeyhole size={15} strokeWidth={1.8} />
        </span>
        <span className="policy-toolbar__title">Decryption policy</span>
        <span className="policy-toolbar__state">Active</span>
      </div>
      <table className="policy-table">
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Permission</th>
          </tr>
        </thead>
        <tbody>
          {policyRows.map((row) => (
            <tr key={row.role}>
              <td>{row.role}</td>
              <td>
                <span className={`policy-pill policy-pill--${row.status}`}>
                  {row.permission}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function QueryIllustration() {
  return (
    <div className="query-window">
      <div className="query-toolbar">
        <span className="query-toolbar__title">customers.sql</span>
        <span className="query-toolbar__status">Encrypted query</span>
      </div>
      <pre className="query-code" aria-label="Query-compatible encryption example">
        <code>
          <span className="query-keyword">SELECT</span>{' customer_id\n'}
          <span className="query-keyword">FROM</span>{' customers\n'}
          <span className="query-keyword">WHERE</span>{' email = '}
          <span className="query-function">xero.encrypt</span>{'($1);'}
        </code>
      </pre>
      <div className="query-results">
        <span className="query-results__count">3 results</span>
        <div className="query-results__rows" aria-hidden="true">
          <span>cus_83c1</span>
          <span>cus_5fe2</span>
          <span>cus_91a7</span>
        </div>
      </div>
    </div>
  )
}

function AuditIllustration() {
  return (
    <div className="audit-panel">
      <div className="audit-toolbar">
        <span className="audit-toolbar__title">Access activity</span>
        <span className="audit-live">
          <span className="audit-live__dot" aria-hidden="true" />
          Live
        </span>
      </div>
      <ol className="audit-timeline">
        {auditEvents.map((event) => (
          <li className="audit-event" key={event.time}>
            <span
              className={`audit-event__dot audit-event__dot--${event.status}`}
              aria-hidden="true"
            />
            <time className="audit-event__time">{event.time}</time>
            <code className="audit-event__service">{event.service}</code>
            <span className="audit-event__action">{event.action}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

const FEATURES = [
  {
    id: 'token',
    title: 'Tokenize sensitive fields',
    description:
      'Replace sensitive values with secure tokens before they reach your infrastructure. Your application keeps working with stable references while plaintext remains isolated.',
    icon: KeyRound,
    illustration: TokenizationIllustration,
    delay: '0',
  },
  {
    id: 'policy',
    title: 'Fine-grained access policies',
    description:
      'Control which service, user, or environment may decrypt each field.',
    icon: LockKeyhole,
    illustration: PolicyIllustration,
    delay: '100',
  },
  {
    id: 'query',
    title: 'Query-compatible encryption',
    description:
      'Keep exact-match searches, filtering, and application workflows without exposing plaintext.',
    icon: Search,
    illustration: QueryIllustration,
    delay: '0',
  },
  {
    id: 'audit',
    title: 'Complete audit visibility',
    description:
      'Record every request to encrypt, decrypt, reveal, or rotate protected data.',
    icon: Activity,
    illustration: AuditIllustration,
    delay: '100',
  },
] satisfies readonly FeatureDefinition[]

export default function FeatureBento() {
  return (
    <section className="feature-bento" aria-label="Encryption capabilities">
      <div className="bento-grid">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          const Illustration = feature.illustration

          return (
            <article
              className={`feature-card feature-card--${feature.id} reveal`}
              data-delay={feature.delay}
              key={feature.id}
            >
              <div className="feature-copy">
                <span className="feature-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              <Illustration />
            </article>
          )
        })}
      </div>
    </section>
  )
}
