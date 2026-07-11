import { useEffect, useRef, useState, type MouseEvent } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef('')

  const closeMenu = () => setMenuOpen(false)

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.hash.slice(1)
    closeMenu()

    if (!targetId) return

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(targetId)
        if (!target) return

        const hadTabIndex = target.hasAttribute('tabindex')
        if (!hadTabIndex) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })

        if (!hadTabIndex) {
          target.addEventListener('blur', () => target.removeAttribute('tabindex'), {
            once: true,
          })
        }
      })
    })
  }

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main')
    const footer = document.querySelector<HTMLElement>('footer')

    if (menuOpen) {
      previousOverflow.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow.current
    }

    if (main) main.inert = menuOpen
    if (footer) footer.inert = menuOpen

    return () => {
      document.body.style.overflow = previousOverflow.current
      if (main) main.inert = false
      if (footer) footer.inert = false
    }
  }, [menuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) closeMenu()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!menuOpen) return

      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const controls = Array.from(
        navRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null)

      if (controls.length === 0) return

      const first = controls[0]
      const last = controls[controls.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const menuClassName = `nav-menu${menuOpen ? ' active' : ''}`
  const toggleClassName = `menu-toggle${menuOpen ? ' active' : ''}`

  return (
    <nav ref={navRef} className="site-nav" aria-label="Primary navigation">
      <a className="nav-logo" href="#top" aria-label="Xero home">
        Xero
      </a>

      <button
        ref={toggleRef}
        type="button"
        className={toggleClassName}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <div id="nav-menu" className={menuClassName}>
        <ul className="nav-links">
          <li>
            <a href="#method" onClick={handleNavigation}>
              Method
            </a>
          </li>
          <li>
            <a href="#pricing" onClick={handleNavigation}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#docs" onClick={handleNavigation}>
              Docs
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a className="btn-login" href="#contact" onClick={handleNavigation}>
            Log in
          </a>
          <a className="btn-signup" href="#pricing" onClick={handleNavigation}>
            Sign up
          </a>
        </div>
      </div>
    </nav>
  )
}
