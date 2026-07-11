import type { MouseEvent } from 'react'

type FooterLink = {
  label: string
  href: string
  placeholder?: boolean
}

type FooterLinkGroup = {
  title: string
  links: readonly FooterLink[]
}

const footerLinkGroups: readonly FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Method', href: '#method' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Security', href: '#security' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#', placeholder: true },
      { label: 'SDKs', href: '#', placeholder: true },
      { label: 'Changelog', href: '#', placeholder: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#', placeholder: true },
      { label: 'Blog', href: '#', placeholder: true },
      { label: 'Careers', href: '#', placeholder: true },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#', placeholder: true },
      { label: 'Terms', href: '#', placeholder: true },
      { label: 'Security', href: '#security' },
      { label: 'DPA', href: '#', placeholder: true },
    ],
  },
]

const footerMetaLinks: readonly FooterLink[] = [
  { label: 'Status', href: '#', placeholder: true },
  { label: 'GitHub', href: '#', placeholder: true },
  { label: 'LinkedIn', href: '#', placeholder: true },
]

const preventPlaceholderJump = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault()
}

export function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-logo" href="#top" aria-label="Xero home">
            Xero
          </a>
          <p className="footer-brand-description">
            Field-level encryption infrastructure for modern applications.
          </p>
        </div>

        {footerLinkGroups.map((group) => (
          <nav
            className="footer-link-group"
            aria-label={`${group.title} footer links`}
            key={group.title}
          >
            <h2 className="footer-link-heading">{group.title}</h2>
            <ul className="footer-link-list">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    className="footer-link"
                    href={link.href}
                    onClick={link.placeholder ? preventPlaceholderJump : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 Xero. All rights reserved.
        </p>
        <nav className="footer-meta" aria-label="Social and status links">
          {footerMetaLinks.map((link) => (
            <a
              className="footer-meta-link"
              href={link.href}
              onClick={link.placeholder ? preventPlaceholderJump : undefined}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
