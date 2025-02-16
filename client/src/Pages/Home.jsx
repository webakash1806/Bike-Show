import AboutSection from '@/components/AboutSection'
import BentoGridSecondDemo from '@/components/CTA'
import FeatureSection from '@/components/FeatureSection'
import Hero from '@/components/Hero'
import Testimonial from '@/components/Testimonial'
import HomeLayout from '@/Layout/HomeLayout'
import React from 'react'

const Home = () => {
    return (
        <HomeLayout>
            <Hero />
            <AboutSection />
            <FeatureSection />
            <BentoGridSecondDemo />
            <Testimonial />
        </HomeLayout>
    )
}

export default Home
