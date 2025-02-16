import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const HomeLayout = ({ children }) => {
    return (
        <div className='bg-mainBg '>
            <Navbar />
            <div className='mt-[5.4rem] lg:mt-[5.75rem]'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout
