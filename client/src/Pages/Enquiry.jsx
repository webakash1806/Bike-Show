import React from 'react'
import EnquiryForm from '@/components/EnquiryForm'
import HomeLayout from '@/Layout/HomeLayout'

const Enquiry = () => {
    return (
        <HomeLayout>
            <div className=" w-full bg-black min-h-screen py-10  bg-grid-white/[0.2]  relative flex flex-col items-start justify-start">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className='max-w-[45rem] w-full bg-neutral-950 p-4 rounded-md border border-gray-600 relative z-10 mx-auto'>
                    <h1 className='mb-4 text-2xl font-bold text-center text-white'>Enquiry Form</h1>
                    <EnquiryForm />
                </div>
            </div>
        </HomeLayout>
    )
}

export default Enquiry
