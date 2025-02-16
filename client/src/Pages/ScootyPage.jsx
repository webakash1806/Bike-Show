import React, { useRef } from "react";
import { Timeline } from "../components/ui/timeline";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import HomeLayout from "@/Layout/HomeLayout";
import { useGetAllScootyQuery } from "@/Redux/AllApi/BikeApi";

const ScootyPage = () => {

    const { data: scooty, isLoading } = useGetAllScootyQuery();
    const data = scooty?.scootyData?.map((scooty) => ({
        img: scooty?.image,
        title: scooty?.name,
        navigate: `/scooty/${scooty?._id}`,
        content: (
            <div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="w-fit">
                        <div className="flex items-end justify-between">
                            <h2 className="text-3xl font-semibold">
                                {scooty?.mileage?.toString().split(/[a-zA-Z]+/)[0]}
                            </h2>
                            <p className="text-[0.9rem] font-normal ">
                                {scooty?.mileage?.toString().match(/[a-zA-Z/]+/)?.[0]}
                            </p>
                        </div>
                        <p>Mileage</p>

                    </div>
                    <div className="w-fit">
                        <div className="flex items-end justify-between">
                            <h2 className="text-3xl font-semibold">
                                {scooty?.weight?.toString().split(/[a-zA-Z]+/)[0]}

                            </h2>
                            <p className="text-[0.9rem] font-normal ">
                                {scooty?.weight?.toString().match(/[a-zA-Z]+/)?.[0]}
                            </p>
                        </div>

                        <p>Weight</p>
                    </div>
                    <div className="w-fit">
                        <div className="flex items-end justify-between">
                            <h2 className="text-3xl font-semibold">
                                {scooty?.displacement?.toString().split(/[a-zA-Z]+/)[0]}
                            </h2>
                            <p className="text-[0.9rem] font-normal ">
                                {scooty?.displacement?.toString().match(/[a-zA-Z]+/)?.[0]}
                            </p>
                        </div>

                        <p>Engine CC</p>
                    </div>
                </div>
            </div >
        ),
    }));

    const timelineRef = useRef(null);
    return (
        (<HomeLayout>
            <HeroHighlight>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}

                    className="max-w-4xl px-4 mx-auto ">
                    <p className="text-2xl font-semibold leading-relaxed text-center text-transparent md:text-3xl lg:leading-snug bg-clip-text bg-gradient-to-br from-neutral-500 via-white to-neutral-200">
                        The future of scootering is here. Introducing the all-new Honda Scooter model, set to revolutionize the roads in 2025. Experience innovation and performance like never before.

                    </p>
                    <div className="mx-auto mt-4 text-sm w-fit">
                        <button onClick={() => timelineRef.current.scrollIntoView({ behavior: "smooth" })} className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative z-10 flex items-center px-4 py-2 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                                <span>
                                    Explore more
                                </span>
                                <MdOutlineKeyboardArrowDown className="w-5 h-5" />
                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                        </button>
                    </div>
                    <div className="mx-auto mt-2 w-fit h-fit">
                        <Cover><img src="https://res.cloudinary.com/disdsorfp/image/upload/v1736509193/86cf48c2-3eec-420b-a554-4db0f3df4cb8Honda-Grazia125_360_14-Sep_01-Prev-removebg-preview_s1my59.png" alt="" /></Cover >
                    </div>
                </motion.h1>
            </HeroHighlight>
            <div id="timeline" ref={timelineRef}>
                <Timeline data={data} /></div>
        </HomeLayout>)
    );
}


export default ScootyPage