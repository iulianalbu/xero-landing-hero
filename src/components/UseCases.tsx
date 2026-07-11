import {
  BrainCircuit,
  ChevronRight,
  CreditCard,
  Database,
  HeartPulse,
  Layers3,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

type UseCaseId = 'payments' | 'healthcare' | 'saas' | 'ai-pipelines'

type UseCaseFlow = {
  source: string
  destination: string
  sample: string
  protectedValue: string
}

type UseCaseItem = {
  id: UseCaseId
  label: string
  description: string
  fields: readonly [string, string, string, string]
  icon: LucideIcon
  flow: UseCaseFlow
}

const USE_CASES = [
  {
    id: 'payments',
    label: 'Payments',
    description: 'Protect cardholder data and payment tokens across billing systems.',
    fields: ['Card numbers', 'Bank details', 'Billing addresses', 'Transaction metadata'],
    icon: CreditCard,
    flow: {
      source: 'Checkout',
      destination: 'Billing system',
      sample: '4242 4242 4242 4242',
      protectedValue: 'tok_7f3a••••',
    },
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    description:
      'Keep patient and clinical data protected throughout operational workflows.',
    fields: ['Patient identifiers', 'Clinical notes', 'Insurance information', 'Appointment data'],
    icon: HeartPulse,
    flow: {
      source: 'Care application',
      destination: 'Clinical record',
      sample: 'patient: Maya R.',
      protectedValue: 'tok_b81c••••',
    },
  },
  {
    id: 'saas',
    label: 'SaaS',
    description:
      'Add field-level encryption to multi-tenant products without redesigning the database.',
    fields: ['Customer PII', 'API credentials', 'Private messages', 'Integration secrets'],
    icon: Layers3,
    flow: {
      source: 'Product service',
      destination: 'Tenant database',
      sample: 'api_sk_live_••••',
      protectedValue: 'tok_45de••••',
    },
  },
  {
    id: 'ai-pipelines',
    label: 'AI pipelines',
    description: 'Remove sensitive values before data enters models, embeddings, or analytics systems.',
    fields: ['Prompt content', 'Training records', 'User identifiers', 'Internal documents'],
    icon: BrainCircuit,
    flow: {
      source: 'Raw input',
      destination: 'Model pipeline',
      sample: 'Email maya@••••',
      protectedValue: 'Email [protected]',
    },
  },
] satisfies readonly UseCaseItem[]

export default function UseCases() {
  const [activeCaseId, setActiveCaseId] = useState<UseCaseId>('payments')
  const [horizontalTabs, setHorizontalTabs] = useState(() =>
    window.matchMedia('(max-width: 768px)').matches,
  )
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const instanceId = useId()
  const activeCase = USE_CASES.find((item) => item.id === activeCaseId) ?? USE_CASES[0]
  const ActiveIcon = activeCase.icon
  const activeTabId = `${instanceId}-${activeCase.id}-tab`
  const panelId = `${instanceId}-panel`

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const updateOrientation = () => setHorizontalTabs(mediaQuery.matches)

    updateOrientation()
    mediaQuery.addEventListener('change', updateOrientation)
    return () => mediaQuery.removeEventListener('change', updateOrientation)
  }, [])

  const activateAndFocusTab = (index: number) => {
    const nextCase = USE_CASES[index]

    setActiveCaseId(nextCase.id)
    window.requestAnimationFrame(() => tabRefs.current[index]?.focus())
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null

    if (
      (horizontalTabs && event.key === 'ArrowRight') ||
      (!horizontalTabs && event.key === 'ArrowDown')
    ) {
      nextIndex = (index + 1) % USE_CASES.length
    } else if (
      (horizontalTabs && event.key === 'ArrowLeft') ||
      (!horizontalTabs && event.key === 'ArrowUp')
    ) {
      nextIndex = (index - 1 + USE_CASES.length) % USE_CASES.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = USE_CASES.length - 1
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    activateAndFocusTab(nextIndex)
  }

  return (
    <section id="use-cases" className="use-cases-section" aria-labelledby="use-cases-heading">
      <div className="use-cases-intro reveal">
        <h2 id="use-cases-heading" className="use-cases-heading">
          Built for data your business
          <br />
          cannot afford to expose.
        </h2>
      </div>

      <div className="use-cases-layout">
        <div
          className="case-tabs reveal"
          role="tablist"
          aria-label="Use case categories"
          aria-orientation={horizontalTabs ? 'horizontal' : 'vertical'}
        >
          {USE_CASES.map((item, index) => {
            const Icon = item.icon
            const isActive = item.id === activeCaseId
            const tabId = `${instanceId}-${item.id}-tab`

            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                id={tabId}
                className={`case-tab${isActive ? ' case-tab--active' : ''}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveCaseId(item.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span className="case-tab-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <span className="case-tab-label">{item.label}</span>
                <ChevronRight className="case-tab-arrow" size={17} aria-hidden="true" />
              </button>
            )
          })}
        </div>

        <div
          key={activeCase.id}
          id={panelId}
          className="case-panel"
          role="tabpanel"
          aria-labelledby={activeTabId}
          tabIndex={0}
        >
          <div className="case-panel-copy">
            <span className="case-panel-icon" aria-hidden="true">
              <ActiveIcon size={23} strokeWidth={1.6} />
            </span>
            <h3 className="case-panel-title">{activeCase.label}</h3>
            <p className="case-panel-description">{activeCase.description}</p>

            <p className="case-fields-label">Protected fields</p>
            <ul className="case-fields" aria-label={`${activeCase.label} protected fields`}>
              {activeCase.fields.map((field) => (
                <li key={field} className="case-field">
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <div className="case-flow" aria-hidden="true">
            <div className="case-flow-rail">
              <div className="case-flow-node case-flow-node--source">
                <span className="case-flow-node-label">{activeCase.flow.source}</span>
                <code>{activeCase.flow.sample}</code>
              </div>

              <div className="case-flow-connector">
                <span className="case-flow-line" />
                <span className="case-flow-packet" />
              </div>

              <div className="case-flow-node case-flow-node--xero">
                <span className="case-flow-shield">
                  <ShieldCheck size={21} strokeWidth={1.7} />
                </span>
                <span className="case-flow-node-label">Protected by Xero</span>
              </div>

              <div className="case-flow-connector case-flow-connector--outbound">
                <span className="case-flow-line" />
                <span className="case-flow-packet" />
              </div>

              <div className="case-flow-node case-flow-node--destination">
                <Database size={18} strokeWidth={1.6} />
                <span className="case-flow-node-label">{activeCase.flow.destination}</span>
                <code>{activeCase.flow.protectedValue}</code>
              </div>
            </div>
            <p className="case-flow-caption">
              Plaintext is isolated before the destination receives a stable reference.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
