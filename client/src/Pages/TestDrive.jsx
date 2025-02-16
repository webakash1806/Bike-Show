import MyReCaptchaProvider from '@/components/MyRecaptchaProvider'
import TestDriveForm from '@/components/TestDriveForm'
import HomeLayout from '@/Layout/HomeLayout'
import React from 'react'

const TestDrive = () => {
    return (
        <HomeLayout>

            <div className=" w-full bg-black   bg-grid-white/[0.2]  relative flex items-center flex-col justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>


                <div className="flex items-center justify-center mt-10">
                    <MyReCaptchaProvider>
                        <TestDriveForm />
                    </MyReCaptchaProvider>
                </div >
            </div >
        </HomeLayout >
    )
}

export default TestDrive
