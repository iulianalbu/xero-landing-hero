import {
  Activity,
  Blocks,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  Hexagon,
  Layers3,
  Leaf,
  Server,
  Terminal,
  Triangle,
  type LucideIcon,
} from 'lucide-react'

type IntegrationSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type Integration = {
  name: string
  icon: LucideIcon
  slot: IntegrationSlot
}

const INTEGRATIONS = [
  { name: 'PostgreSQL', icon: Database, slot: 1 },
  { name: 'MySQL', icon: Server, slot: 2 },
  { name: 'MongoDB', icon: Leaf, slot: 3 },
  { name: 'Node.js', icon: Hexagon, slot: 4 },
  { name: 'Python', icon: Braces, slot: 5 },
  { name: 'Go', icon: Terminal, slot: 6 },
  { name: 'AWS', icon: Cloud, slot: 7 },
  { name: 'Google Cloud', icon: Layers3, slot: 8 },
  { name: 'Azure', icon: Triangle, slot: 9 },
  { name: 'Kubernetes', icon: Container, slot: 10 },
  { name: 'Terraform', icon: Blocks, slot: 11 },
  { name: 'Datadog', icon: Activity, slot: 12 },
] satisfies readonly Integration[]

function IntegrationConnections() {
  return (
    <svg
      className="integrations-connections"
      viewBox="0 0 1160 430"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="integration-lines">
        <line x1="580" y1="215" x2="90" y2="55" />
        <line x1="580" y1="215" x2="330" y2="55" />
        <line x1="580" y1="215" x2="830" y2="55" />
        <line x1="580" y1="215" x2="1070" y2="55" />
        <line x1="580" y1="215" x2="90" y2="215" />
        <line x1="580" y1="215" x2="330" y2="215" />
        <line x1="580" y1="215" x2="830" y2="215" />
        <line x1="580" y1="215" x2="1070" y2="215" />
        <line x1="580" y1="215" x2="90" y2="375" />
        <line x1="580" y1="215" x2="330" y2="375" />
        <line x1="580" y1="215" x2="830" y2="375" />
        <line x1="580" y1="215" x2="1070" y2="375" />
      </g>
      <circle className="integration-connection-hub" cx="580" cy="215" r="64" />
    </svg>
  )
}

export default function Integrations() {
  return (
    <section id="docs" className="integrations-section" aria-labelledby="integrations-heading">
      <span id="integrations" className="integration-anchor" aria-hidden="true" />

      <div className="integrations-intro reveal">
        <h2 id="integrations-heading" className="integrations-heading">
          Fits into the stack
          <br />
          you already operate.
        </h2>
        <p className="integrations-description">
          Use an SDK, API, database proxy, or infrastructure integration. Start with one
          sensitive field and expand progressively.
        </p>
      </div>

      <div className="integrations-map reveal" data-delay="80">
        <IntegrationConnections />

        <ul className="integrations-grid" aria-label="Supported technology integrations">
          {INTEGRATIONS.map(({ name, icon: Icon, slot }, index) => (
            <li
              key={name}
              className={`integration-card integration-card--slot-${slot} reveal`}
              data-delay={String((index % 4) * 45)}
            >
              <span className="integration-icon" aria-hidden="true">
                <Icon size={23} strokeWidth={1.45} />
              </span>
              <span className="integration-name">{name}</span>
            </li>
          ))}

          <li className="integration-card integration-card--core reveal" data-delay="180">
            <span className="integration-core-mark" aria-hidden="true">
              <Code2 size={27} strokeWidth={1.5} />
            </span>
            <strong className="integration-core-name">Xero API</strong>
            <span className="integration-core-detail">SDK · API · Proxy</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
