import type React from 'react'

export type SectionIntroProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionIntroProps) {
  return (
    <header
      className={`section-intro section-intro--${align} reveal`}
      data-delay="0"
    >
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-intro__title">{title}</h2>
      {description ? (
        <p className="section-intro__description">{description}</p>
      ) : null}
    </header>
  )
}
