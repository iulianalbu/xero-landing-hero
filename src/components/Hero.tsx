import { useEffect, useRef } from 'react'

type AnimationPhase = 'p1' | 'splash' | 'p2' | 'idle'

export default function Hero() {
  const pipelineRef = useRef<HTMLDivElement>(null)
  const nodeStackRef = useRef<HTMLDivElement>(null)
  const nodeXRef = useRef<HTMLDivElement>(null)
  const nodeShieldRef = useRef<HTMLDivElement>(null)
  const beamGlowRef = useRef<SVGPathElement>(null)
  const beamCoreRef = useRef<SVGPathElement>(null)
  const beamGradientRef = useRef<SVGLinearGradientElement>(null)
  const splashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pipeline = pipelineRef.current
    const nodeStack = nodeStackRef.current
    const nodeX = nodeXRef.current
    const nodeShield = nodeShieldRef.current
    const glowPath = beamGlowRef.current
    const corePath = beamCoreRef.current
    const gradient = beamGradientRef.current
    const splash = splashRef.current

    if (
      !pipeline ||
      !nodeStack ||
      !nodeX ||
      !nodeShield ||
      !glowPath ||
      !corePath ||
      !gradient ||
      !splash
    ) {
      return
    }

    let animationFrame = 0
    let phase: AnimationPhase = 'p1'
    let lastStateChange = performance.now()
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePath = () => {
      const pipelineRect = pipeline.getBoundingClientRect()
      const stackRect = nodeStack.getBoundingClientRect()
      const xRect = nodeX.getBoundingClientRect()
      const shieldRect = nodeShield.getBoundingClientRect()
      const startX = stackRect.left + stackRect.width / 2 - pipelineRect.left
      const startY = stackRect.top + stackRect.height / 2 - pipelineRect.top
      const midX = xRect.left + xRect.width / 2 - pipelineRect.left
      const midY = xRect.top + xRect.height / 2 - pipelineRect.top
      const endX = shieldRect.left + shieldRect.width / 2 - pipelineRect.left
      const endY = shieldRect.top + shieldRect.height / 2 - pipelineRect.top
      const path = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`

      glowPath.setAttribute('d', path)
      corePath.setAttribute('d', path)
    }

    const updateGradient = (percentage: number) => {
      const center = percentage * 100
      gradient.setAttribute('x1', `${center - 5}%`)
      gradient.setAttribute('x2', `${center + 5}%`)
      gradient.setAttribute('y1', '0%')
      gradient.setAttribute('y2', '0%')
    }

    const setBeamVisible = (visible: boolean) => {
      glowPath.style.opacity = visible ? '1' : '0'
      corePath.style.opacity = visible ? '1' : '0'
    }

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastStateChange

      if (phase === 'p1') {
        const progress = Math.min(elapsed / 800, 1)
        const percentage = progress * 0.5
        updateGradient(percentage)
        nodeStack.classList.toggle('active', percentage < 0.4)

        if (progress >= 1) {
          nodeStack.classList.remove('active')
          phase = 'splash'
          lastStateChange = timestamp
          setBeamVisible(false)
          splash.classList.add('animate')
        }
      } else if (phase === 'splash') {
        if (elapsed >= 800) {
          phase = 'p2'
          lastStateChange = timestamp
          splash.classList.remove('animate')
          setBeamVisible(true)
        }
      } else if (phase === 'p2') {
        const progress = Math.min(elapsed / 800, 1)
        const percentage = 0.5 + progress * 0.5
        updateGradient(percentage)
        nodeShield.classList.toggle('active', percentage > 0.6)

        if (progress >= 1) {
          nodeShield.classList.remove('active')
          phase = 'idle'
          lastStateChange = timestamp
        }
      } else if (elapsed >= 1000) {
        phase = 'p1'
        lastStateChange = timestamp
        updateGradient(0)
      }

      animationFrame = window.requestAnimationFrame(animate)
    }

    const stopAnimation = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
      nodeStack.classList.remove('active')
      nodeShield.classList.remove('active')
      splash.classList.remove('animate')
      updateGradient(0.5)
      setBeamVisible(true)
    }

    const startAnimation = () => {
      window.cancelAnimationFrame(animationFrame)
      phase = 'p1'
      lastStateChange = performance.now()
      updateGradient(0)
      setBeamVisible(true)
      animationFrame = window.requestAnimationFrame(animate)
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopAnimation()
      } else {
        startAnimation()
      }
    }

    updatePath()
    updateGradient(0)
    window.addEventListener('resize', updatePath)
    motionQuery.addEventListener('change', handleMotionPreference)

    if (motionQuery.matches) {
      stopAnimation()
    } else {
      startAnimation()
    }

    return () => {
      window.removeEventListener('resize', updatePath)
      motionQuery.removeEventListener('change', handleMotionPreference)
      window.cancelAnimationFrame(animationFrame)
      nodeStack.classList.remove('active')
      nodeShield.classList.remove('active')
      splash.classList.remove('animate')
    }
  }, [])

  return (
    <section id="top" className="hero-card" aria-labelledby="hero-heading">
      <div className="hero-grid" aria-hidden="true" />

      <div className="icon-pipeline" ref={pipelineRef} aria-hidden="true">
        <svg className="beam-svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="blur" in2="SourceGraphic" operator="over" />
            </filter>
            <linearGradient
              id="beam-gradient"
              ref={beamGradientRef}
              gradientUnits="userSpaceOnUse"
              x1="-5%"
              x2="5%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#b04090" stopOpacity="0" />
              <stop offset="20%" stopColor="#b04090" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fff" stopOpacity="1" />
              <stop offset="80%" stopColor="#c8a0e0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c8a0e0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            ref={beamGlowRef}
            className="beam-glow"
            d="M 23,32 L 350,32 L 677,32"
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth="2"
            filter="url(#glow)"
            opacity="0.6"
          />
          <path
            ref={beamCoreRef}
            d="M 23,32 L 350,32 L 677,32"
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth="0.8"
          />
        </svg>

        <div className="icon-node node-light-right" ref={nodeStackRef}>
          <svg viewBox="0 0 24 24">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>

        <div className="pipeline-line" />

        <div className="icon-center-wrap">
          <div className="splash" ref={splashRef} />
          <div className="icon-node-center" ref={nodeXRef}>
            <svg viewBox="0 0 40 40">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h9.15L20 14.23 26.85 5H36L24.54 20 36 35h-9.15L20 25.77 13.15 35H4l11.46-15L4 5Zm9.91 4.78h-2.67l7.07 9.29 1.69-2.2-6.09-7.09Zm12.18 0L20 16.87l1.69 2.2 7.07-9.29h-2.67ZM18.31 20.93l-7.07 9.29h2.67L20 23.13l-1.69-2.2Zm3.38 0L20 23.13l6.09 7.09h2.67l-7.07-9.29Z"
              />
            </svg>
          </div>
        </div>

        <div className="pipeline-line right" />

        <div className="icon-node node-light-left" ref={nodeShieldRef}>
          <svg viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
      </div>

      <div className="hero-content">
        <h1 id="hero-heading" className="hero-heading">
          The simple way <strong>encryption your data</strong>
        </h1>
        <p className="hero-sub">
          Fully managed data encrypting service and annotation
          <br />
          platform for teams of all industries.
        </p>
        <a href="#pricing" className="btn-cta">
          Get Started
        </a>
      </div>
    </section>
  )
}
