import React from 'react'
import Navbar from "../components/layout/Navbar.jsx"
import Hero from '../components/landing/public/Hero.jsx'
import Features from '../components/landing/public/Features.jsx'
import Footer from '../components/landing/public/Footer.jsx'
import Testimonials from '../components/landing/public/Testimonials.jsx'
const LandingPage = () => {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <Features/>
    <Testimonials/>
     <Footer/>
    </div>
  )
}

export default LandingPage
