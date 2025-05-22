import React from 'react'
import { CTA, Features, Hero, Stats, Testimonials } from '../components'
import '../index.css'
;

const Landing = () => {
  return (
    <div className="bg-gray-50 font-sans">
    <Hero />
    <Features />
    <Stats />
    <Testimonials />
    <CTA />
  </div>
  )
}

export default Landing