import './App.css'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import FeatureCards from './components/FeatureCards'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'

function App() {


  return (
    <>

    <Header/>
    <Hero/>
      <FeatureCards/>
  
      <SocialProof />
    <CTA />
    <FAQ />
      
    </>
  )
}

export default App;
