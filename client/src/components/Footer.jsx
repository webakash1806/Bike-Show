import React from 'react'
import {
    BsEnvelope,
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsTelephone,
    BsTwitter,
    BsTwitterX,
    BsWhatsapp
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { HeroHighlight } from '@/components/ui/hero-highlight'
const Footer = () => {
    return (
        <footer className=' relative w-full mx-auto  z-100 bg-[#121b1b] text-white border-t-2 border-neutral-900 mt-20 shadow-[0px_0px_20px_-10px_rgba(255,0,0,0.5)]'>
            <div className=" w-full bg-black   bg-grid-white/[0.2]  relative flex flex-col items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                <div className="grid gap-8 p-6 py-10 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Big Swing Honda Islampur",
                            sales: ["+91 8826897589", "+91 9212168811", "+91 9773548833"],
                            service: ["+91 9354911208", "+91 9354911209", "+91 9354911210"],
                        },
                        {
                            title: "Big Swing Honda Badshahpur",
                            sales: ["+91 9773548844"],
                            service: ["+91 9773548811"],
                        },
                        {
                            title: "Big Swing Honda Chakkarpur",
                            sales: ["+91 9355990083", "+91 9355990084"],
                            service: ["+91 9355990085"],
                        },
                    ].map((location, index) => (
                        <div
                            key={index}
                            className="relative p-6 py-3 transition-transform shadow-2xl bg-gradient-to-tr from-neutral-800 via-neutral-900 to-neutral-950 rounded-xl rounded-b-none hover:scale-[1.02] hover:shadow"
                        >
                            <h2 className="mb-3 text-2xl font-bold text-mainRed">
                                {location.title}
                            </h2>
                            <div className="flex gap-6">
                                <div className="flex flex-col ">
                                    <h4 className="text-[1.1rem] font-semibold text-neutral-400 mb-1">Sales</h4>
                                    {location.sales.map((phone, i) => (
                                        <Link
                                            key={i}
                                            to={`tel:${phone}`}
                                            className="mb-2 font-semibold text-gray-200 transition-colors text-md hover:text-mainRed"
                                        >
                                            {phone}
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex flex-col ">
                                    <h4 className="text-[1.1rem] font-semibold text-neutral-400 mb-1">Service</h4>
                                    {location.service.map((phone, i) => (
                                        <Link
                                            key={i}
                                            to={`tel:${phone}`}
                                            className="mb-2 font-semibold text-gray-200 transition-colors text-md hover:text-mainRed"
                                        >
                                            {phone}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* Decorative Bottom Border */}
                            <div className="absolute inset-x-0 bottom-0 h-1 rounded-t-full bg-gradient-to-r from-yellow-600 via-mainRed to-orange-500"></div>
                        </div>
                    ))}
                </div>
            </div>
            <HeroHighlight className={" w-full bg-[#0b4b5b16]"}>
                <div className='p-[1.5rem_0.5rem]  w-full mx-auto max-w-[75rem] md:p-[2.5rem] md:pt-4 flex flex-col gap-8 lg:flex-row  sm:justify-around lg:items-center'>
                    <div className='flex flex-col items-center  pl-[2.2rem] gap-2 '>
                        <Link to='/' className='mb-1'><img className='w-[8rem]' src={"https://www.honda2wheelersindia.com/assets/images/LogoHondaNew_24.png"} alt="" /></Link>
                        {/* <Link to="" className='flex items-center gap-2 text-[0.83rem] font-[400] tracking-wide'><BsEnvelope /><span>itsakash18.06@gmail.com</span></Link>
                        <Link to="" className='flex items-center gap-2 text-[0.83rem] font-[400] tracking-wide'><BsTelephone /><span>+91 6207234759</span></Link>
                         */}
                        <div className='flex gap-6 mt-3'>
                            {/* <Link target='_blank' to="" className='text-[17px]'><BsLinkedin /></Link> */}
                            <Link target='_blank' to="https://www.facebook.com/BigSwingHondaGurgaon" className='text-[17px]'><BsFacebook /></Link>
                            <Link target='_blank' to="https://wa.me" className='text-[17px]'><BsWhatsapp /></Link>
                            <Link target='_blank' to="https://www.instagram.com/bigswinghonda/" className='text-[17px]'><BsInstagram /></Link>
                            {/* <Link target='_blank' to="" className='text-[17px]'><BsTwitterX /></Link> */}
                        </div>
                    </div>
                    <div className='flex mt-2 flex-col gap-8 sm:flex-row sm:justify-around  md:gap-[5rem]'>
                        <div className='w-[17rem] '>
                            <div>
                                <p className='text-[1.09rem] font-[600]'>Quick Links</p>
                                <p className='w-[15rem] m-[9px_0] h-[3.4px] bg-mainRed rounded-md'></p>
                            </div>
                            <div className='flex justify-between gap-4 pr-6 mt-6'>
                                <div className='flex flex-col gap-4 '>
                                    <Link to={'/bike'} className="text-[0.82rem] text-slate-300">Explore Bike</Link>
                                    <Link to={'/about-us'} className="text-[0.82rem] text-slate-300">About Us</Link>
                                    <Link to={'/accessories'} className="text-[0.82rem] text-slate-300">Accessories</Link>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <Link to={'/scooty'} className="text-[0.82rem] text-slate-300">Explore Scooty</Link>
                                    <Link to={'/contact'} className="text-[0.82rem] text-slate-300">Contact us</Link>
                                    <Link to={'/terms-and-conditions'} className="text-[0.82rem] text-slate-300">Terms & condition</Link>
                                </div>
                            </div>
                        </div>
                        <div className='w-[17rem] '>
                            <div>
                                <p className='text-[1.09rem] font-[600]'>Services</p>
                                <p className='w-[15rem] m-[9px_0] h-[3.3px] bg-mainRed rounded-md'></p>
                            </div>
                            <div className='flex justify-between gap-4 pr-6 mt-6'>
                                <div className='flex flex-col gap-4'>
                                    <Link to="/vehicle-services" className="text-[0.82rem] text-slate-300">Vehicle Services</Link>
                                    <Link to="/enquiry" className="text-[0.82rem] text-slate-300">Product Enquiry</Link>
                                    <Link to="/exchange" className="text-[0.82rem] text-slate-300">Exchange</Link>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <Link to="/insurance" className="text-[0.82rem] text-slate-300">Insurance</Link>
                                    <Link to="/finance" className="text-[0.82rem] text-slate-300">Finance</Link>
                                    <Link to="/book-test-drive" className="text-[0.82rem] text-slate-300">Test Drive</Link>
                                    {/* <p className="text-[0.82rem] text-slate-300">Blog</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HeroHighlight>
            <div className='text-center bg-mainBg text-neutral-400 text-[0.95rem] font-[500] p-3 border-t border-t-neutral-800'><span>&#169;</span> 2025 | Copyright Big Swing Honda</div>
        </footer>
    )
}

export default Footer
