import { useEffect, useRef, useState } from 'react'
import {
  AppWindow,
  Check,
  Copy,
  Database,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionIntro from './SectionIntro'

type WorkflowStep = {
  label: string
  description: string
  icon: LucideIcon
}

const workflowSteps: readonly WorkflowStep[] = [
  {
    label: 'Application',
    description: 'Send data using the SDK, API, or database proxy.',
    icon: AppWindow,
  },
  {
    label: 'Xero encryption layer',
    description:
      'Apply encryption, policies, tokenization, and audit controls.',
    icon: ShieldCheck,
  },
  {
    label: 'Existing database',
    description:
      'Store protected values in Postgres, MySQL, MongoDB, or your current system.',
    icon: Database,
  },
]

const codeSnippet = `const customer = await xero.encrypt({
  email: "maya@example.com",
  paymentCard: "4242 4242 4242 4242"
});`

async function writeToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Fall through to the selection-based path for restrictive browsers.
    }
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.inset = '0 auto auto -9999px'
  document.body.appendChild(textArea)
  textArea.select()

  let copied = false

  try {
    copied = document.execCommand('copy')
  } finally {
    textArea.remove()
  }

  if (!copied) {
    throw new Error('Unable to copy text')
  }
}

export default function HowItWorks() {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    try {
      await writeToClipboard(codeSnippet)
      setCopied(true)

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false)
        resetTimerRef.current = null
      }, 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="method" className="method-section">
      <div className="method-layout">
        <SectionIntro
          eyebrow="How it works"
          title={
            <>
              Encryption between your app
              <br />
              and your database.
            </>
          }
          description="Add Xero at the data boundary. Sensitive fields are protected automatically, without moving your entire application into a proprietary platform."
          align="left"
        />

        <div className="method-workflow reveal" data-delay="100">
          <div
            className="workflow-track"
            role="list"
            aria-label="Data protection workflow"
          >
            {workflowSteps.map((step, index) => {
              const Icon = step.icon

              return (
                <div className="workflow-stage" role="listitem" key={step.label}>
                  <article className="workflow-node">
                    <span className="workflow-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.65} />
                    </span>
                    <h3 className="workflow-label">{step.label}</h3>
                    <p className="workflow-description">{step.description}</p>
                  </article>
                  {index < workflowSteps.length - 1 ? (
                    <div
                      className="workflow-connector"
                      data-segment={index + 1}
                      aria-hidden="true"
                    >
                      <span className="workflow-line" />
                      <span className="workflow-packet" />
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="code-window">
            <div className="code-toolbar">
              <span className="code-language">TypeScript</span>
              <button
                className="code-copy"
                type="button"
                onClick={handleCopy}
                aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
              >
                {copied ? (
                  <Check aria-hidden="true" size={14} strokeWidth={2} />
                ) : (
                  <Copy aria-hidden="true" size={14} strokeWidth={1.8} />
                )}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="code-snippet">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
