type Brand = {
  name: string
  mark: 'expedia' | 'asana' | 'zenefits' | 'hubspot' | 'loom'
}

const brands: Brand[] = [
  { name: 'Expedia', mark: 'expedia' },
  { name: 'asana', mark: 'asana' },
  { name: 'zenefits', mark: 'zenefits' },
  { name: 'HubSpot', mark: 'hubspot' },
  { name: 'loom', mark: 'loom' },
]

function BrandMark({ mark }: { mark: Brand['mark'] }) {
  if (mark === 'expedia') {
    return (
      <svg className="brand-svg-filled" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path fill="var(--bg)" d="M8 9h8v2H8zm0 4h6v2H8z" />
      </svg>
    )
  }

  if (mark === 'asana') {
    return (
      <svg className="brand-svg-filled" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7" r="4" fill="currentColor" />
        <circle cx="5" cy="16" r="3.5" fill="currentColor" />
        <circle cx="19" cy="16" r="3.5" fill="currentColor" />
      </svg>
    )
  }

  if (mark === 'zenefits') {
    return (
      <svg className="brand-svg-stroked" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="4 8 20 8" />
        <polyline points="8 12 16 12" />
        <polyline points="4 16 20 16" />
      </svg>
    )
  }

  if (mark === 'hubspot') {
    return (
      <svg className="brand-svg-stroked" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="15.5" cy="8.5" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="8.5" r="2" />
        <path d="M10.5 8.5H13M8.5 10.5v5.5M8.5 16h5M13.5 16v-3" />
      </svg>
    )
  }

  return (
    <svg className="brand-svg-stroked" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </svg>
  )
}

export default function LogoCloud() {
  return (
    <div className="brands" aria-label="Trusted by leading teams">
      {brands.map((brand) => (
        <div className="brand-item" key={brand.name}>
          <BrandMark mark={brand.mark} />
          {brand.mark === 'hubspot' ? (
            <span className="hubspot-word">
              HubSp<span className="hubspot-dot" />t
            </span>
          ) : (
            <span>{brand.name}</span>
          )}
        </div>
      ))}
    </div>
  )
}
