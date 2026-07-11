import { Check } from 'lucide-react'

type PricingPlan = {
  name: string
  price: string
  description: string
  features: readonly string[]
  action: string
  href: string
  featured?: boolean
}

const pricingPlans: readonly PricingPlan[] = [
  {
    name: 'Developer',
    price: '$0',
    description: 'For prototypes and development.',
    features: [
      '100,000 operations / month',
      '1 environment',
      'Community support',
      '7-day audit history',
    ],
    action: 'Start building',
    href: '#docs',
  },
  {
    name: 'Growth',
    price: '$299 / month',
    description: 'For production applications.',
    features: [
      '5 million operations / month',
      '5 environments',
      'Email support',
      '90-day audit history',
      'Automatic key rotation',
    ],
    action: 'Start free trial',
    href: '#get-started',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For security-sensitive organizations.',
    features: [
      'Custom operation volume',
      'Unlimited environments',
      'Dedicated support',
      'Custom audit retention',
      'Regional deployment options',
      'Advanced policy controls',
    ],
    action: 'Contact sales',
    href: '#contact',
  },
]

export function Pricing() {
  return (
    <section
      className="pricing-section"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <header className="pricing-intro reveal">
        <p className="pricing-eyebrow">Pricing</p>
        <h2 className="pricing-title" id="pricing-title">
          Start small.
          <br />
          Protect more as you grow.
        </h2>
        <p className="pricing-description">
          Simple plans for testing, production workloads, and regulated
          environments.
        </p>
      </header>

      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => (
          <article
            className={`pricing-card${plan.featured ? ' pricing-card-featured' : ''} reveal`}
            data-delay={index * 100}
            key={plan.name}
          >
            {plan.featured && (
              <span className="pricing-popular-label">Most popular</span>
            )}

            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">{plan.name}</h3>
              <p className="pricing-price">{plan.price}</p>
              <p className="pricing-plan-description">{plan.description}</p>
            </div>

            <ul className="pricing-feature-list">
              {plan.features.map((feature) => (
                <li className="pricing-feature" key={feature}>
                  <Check
                    className="pricing-feature-icon"
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              className={`pricing-action${plan.featured ? ' pricing-action-primary' : ' pricing-action-secondary'}`}
              href={plan.href}
            >
              {plan.action}
            </a>
          </article>
        ))}
      </div>

      <p className="pricing-note reveal" data-delay="200">
        No credit card required for the Developer plan.
      </p>
    </section>
  )
}

export default Pricing
