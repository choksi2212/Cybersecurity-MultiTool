import './App.css'
import CTA from './components/cta'
import FAQ from './components/FAQ'
import FeatureCards from './components/FeatureCards'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'

function App() {


  return (
    <>
    <CTA />
    <Header/>
    <Hero/>
     
      <FeatureCards/>
  
      <SocialProof/>
      
      <FAQ />
      <Footer/>
      
    </>
  )
}

export default App
