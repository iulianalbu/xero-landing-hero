import FeatureBento from './components/FeatureBento'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Integrations from './components/Integrations'
import LogoCloud from './components/LogoCloud'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import SectionIntro from './components/SectionIntro'
import SecuritySection from './components/SecuritySection'
import Testimonial from './components/Testimonial'
import UseCases from './components/UseCases'
import { useReveal } from './components/useReveal'

function App() {
  useReveal()

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <LogoCloud />

        <section className="product-intro" aria-label="Product introduction">
          <SectionIntro
            eyebrow="Encryption infrastructure"
            title={
              <>
                Protect every sensitive field
                <br />
                without rebuilding your stack.
              </>
            }
            description="Xero encrypts sensitive application data before it reaches your database, while preserving the workflows, queries, and integrations your team already uses."
          />
        </section>

        <FeatureBento />
        <HowItWorks />
        <SecuritySection />
        <UseCases />
        <Integrations />
        <Pricing />
        <Testimonial />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}

export default App
