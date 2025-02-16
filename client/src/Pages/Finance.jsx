import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import HomeLayout from '@/Layout/HomeLayout'
import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Finance = () => {

    const navigate = useNavigate()

    return (
        <HomeLayout>
            <BackgroundBeamsWithCollision>
                <h2 className="relative z-20 font-sans text-2xl font-bold tracking-tight text-center text-white md:text-4xl lg:text-7xl">
                    <h2 className="relative z-10 mb-4 font-sans text-4xl font-bold tracking-wide text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-white to-neutral-600">
                        FINANCE
                    </h2>
                    <div className="relative mx-auto inline-block  [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <p className="max-w-2xl px-4 m-4 mx-auto text-sm font-semibold tracking-wide text-center text-neutral-300">
                            At BigSwing Honda, we offer the best insurance services for your bikes and scooters.
                            With our comprehensive policies, you can ensure your vehicle is protected from any damage or loss.
                            Whether you are looking for a new policy or want to renew an existing one, we have got you covered.
                        </p>
                        <p className="max-w-2xl px-4 mx-auto my-4 text-sm font-semibold tracking-wide text-center text-neutral-300">
                            Even if your vehicle is currently not ensured, we have the facility to restart insurance of old vehicle.
                        </p>

                        <div onClick={() => navigate('/contact')} className="mx-auto mt-4 text-sm w-fit">
                            <button className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
                                <span className="absolute inset-0 overflow-hidden rounded-full">
                                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </span>
                                <div className="relative z-10 flex items-center px-4 py-2 space-x-2 tracking-wider rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                                    <span>
                                        Contact Us
                                    </span>
                                    <MdOutlineKeyboardArrowRight className="w-5 h-5" />
                                </div>
                                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                            </button>
                        </div>
                    </div>
                </h2>
            </BackgroundBeamsWithCollision>
        </HomeLayout>
    )
}

export default Finance
