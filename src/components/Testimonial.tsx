type Metric = {
  value: string
  label: string
}

const metrics: readonly Metric[] = [
  {
    value: '2 days',
    label: 'to first production field',
  },
  {
    value: '0',
    label: 'database migrations',
  },
  {
    value: '100%',
    label: 'reveal operations audited',
  },
]

export function Testimonial() {
  return (
    <section
      className="testimonial-section"
      aria-label="Customer testimonial and results"
    >
      <figure className="testimonial-card reveal">
        <span className="testimonial-quote-mark" aria-hidden="true">
          “
        </span>

        <blockquote className="testimonial-quote">
          “Xero let us add field-level encryption to our existing platform
          without forcing every product team to understand key management.”
        </blockquote>

        <figcaption className="testimonial-author">
          <span className="testimonial-avatar" aria-hidden="true" />
          <span className="testimonial-author-copy">
            <strong className="testimonial-author-name">Elena Marin</strong>
            <span className="testimonial-author-role">
              VP of Engineering, Northstar
            </span>
          </span>
        </figcaption>
      </figure>

      <dl className="metrics-grid" aria-label="Northstar results">
        {metrics.map((metric, index) => (
          <div
            className="metrics-item reveal"
            data-delay={index * 100}
            key={metric.label}
          >
            <dt className="metrics-label">{metric.label}</dt>
            <dd className="metrics-value">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default Testimonial
