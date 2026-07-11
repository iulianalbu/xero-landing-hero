import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section
      className="final-cta-section reveal"
      id="get-started"
      aria-labelledby="final-cta-title"
    >
      <span className="final-cta-grid" aria-hidden="true" />
      <span className="final-cta-glow" aria-hidden="true" />

      <div className="final-cta-content">
        <h2 className="final-cta-title" id="final-cta-title">
          Protect sensitive data
          <br />
          before your next incident.
        </h2>
        <p className="final-cta-description">
          Add field-level encryption without replacing your existing database or
          application stack.
        </p>

        <div className="final-cta-actions">
          <a className="final-cta-button final-cta-button-primary" href="#pricing">
            Get Started
            <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
          </a>
          <a className="final-cta-button final-cta-button-secondary" href="#docs">
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
