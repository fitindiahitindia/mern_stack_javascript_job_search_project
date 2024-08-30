import React from 'react'
import Navbar from './common/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import Footer from './common/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection/>
            <CategoryCarousel/>
            <Footer/>
        </>
    )
}

export default Home