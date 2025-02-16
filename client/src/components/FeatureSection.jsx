import React from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeatureSection = () => {
    const features = [
        {
            link: "/bike",
            title: "Go ride with Bike",
            description:
                "Explore your surroundings with Bike, a ride hailing app that takes care of your daily commutes.",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-800",
        },
        {
            link: "/scooty",

            title: "Capture memories with Scooty",
            description:
                "Scooty is a two wheeler rental platform that uses AI to make your experience seamless.",
            skeleton: <SkeletonTwo />,
            className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
        },
        {
            link: "/accessories",

            title: "Discover Bike Accessories",
            description:
                "Enhance your biking experience with our wide range of bike accessories, designed for comfort and safety.",
            skeleton: <SkeletonThree />,
            className:
                "col-span-1 lg:col-span-3 lg:border-r border-neutral-800 border-b",

        },
        {
            link: "/service",

            title: "Get your bike serviced",
            description:
                "Experience unparalleled bike servicing with our expert mechanics, ensuring your bike runs smoothly and efficiently.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 lg:col-span-3 lg:border-r border-neutral-800 border-b",
        },

    ];
    return (
        (<div className="relative z-20 py-10 pb-6 mx-auto lg:py-20 lg:pb-6 max-w-7xl">
            <div className="px-8">
                <h1
                    className="relative z-10 text-3xl leading-[4rem] md:text-5xl md:leading-[5rem] bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500  text-center font-sans font-bold">
                    With full packed of services

                </h1>


                <p
                    className="max-w-2xl mx-auto my-4 text-sm font-normal text-center lg:text-base text-neutral-300">
                    From route planning to bike maintenance tracking, we have everything for
                    literally everything that you may need to run a bike services business.
                </p>
            </div>
            <div className="relative ">
                <div
                    className="grid grid-cols-1 mt-1 rounded-md lg:grid-cols-6 xl:border border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard link={feature.link} key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className="w-full h-full ">{feature.skeleton}</div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>)
    );
}

const FeatureCard = ({
    children,
    link,
    className
}) => {
    return (
        (<div
            className={cn(
                `p-3 sm:p-6 relative overflow-hidden group`,
                className
            )}
        >
            {children}

            <Link
                to={link}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-80 group-hover:opacity-100"
            >
                <div className="mt-4 text-sm w-fit">
                    <button className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.8)_0%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                        <div className="relative z-10 flex items-center px-4 py-1 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                            <span>
                                Visit now!
                            </span>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-60" />
                    </button>
                </div>
            </Link>
        </div>
        )
    );
};

const FeatureTitle = ({
    children
}) => {
    return (
        (<p
            className="max-w-5xl mx-auto text-xl tracking-tight text-left text-white md:text-2xl md:leading-snug">
            {children}
        </p>)
    );
};

const FeatureDescription = ({
    children
}) => {
    return (
        (<p
            className={cn(
                "text-sm md:text-base  max-w-4xl text-left mx-auto",
                " text-center font-normal text-neutral-300",
                "text-left max-w-sm mx-0 md:text-sm my-2 mb-2"
            )}>
            {children}
        </p>)
    );
};

export const SkeletonOne = () => {
    return (
        (<div className="relative flex h-full gap-10 px-2 py-2">
            <div
                className="w-full h-full px-5 mx-auto bg-neutral-900 group">
                <div className="flex flex-col flex-1 w-full h-[17rem] space-y-2 ">
                    <img
                        src="https://www.bigswinghonda.com/wp-content/uploads/2021/03/b8beef9c-3aa0-406e-bf99-c026f7c72c91Xblade-Prev.jpg"
                        alt="header"
                        width={800}
                        height={800}
                        className=" h-[23rem] w-full aspect-square object-cover object-left-top rounded-sm" />
                </div>
            </div>
            <div
                className="absolute inset-x-0 bottom-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-t from-black via-black to-transparent" />
            <div
                className="absolute inset-x-0 top-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-b from-black via-transparent to-transparent" />
        </div>)
    );
};

export const SkeletonThree = () => {
    const images = [
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/a12b83bb-2305-4b1d-bfef-065b2ffbef74dio-prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/f6cb9a18-5691-4ee0-99f0-a332f716ffdfRapsol_dio_prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/0933cb81-fb52-4455-a523-44685fe809c6Prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/96b062ef-6e0e-4abe-91b6-aca28de2e2c4prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/86cf48c2-3eec-420b-a554-4db0f3df4cb8Honda-Grazia125_360_14-Sep_01-Prev.jpg",
    ];

    const imageVariants = {
        whileHover: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
        whileTap: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
    };
    return (
        (<div
            className="relative flex flex-col items-center p-8 py-2 mt-8 overflow-hidden">
            <div className="flex flex-row -ml-20">
                {images.map((image, idx) => (
                    <motion.div
                        variants={imageVariants}
                        key={"images-first" + idx}
                        style={{
                            rotate: Math.random() * 20 - 10,
                        }}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="flex-shrink-0 p-1 my-6 -mr-4 overflow-hidden border lg:my-8 rounded-xl bg-neutral-800 border-neutral-700">
                        <img
                            src={image}
                            alt="bali images"
                            width="500"
                            height="500"
                            className="flex-shrink-0 object-cover w-24 h-24 rounded-lg md:h-36 md:w-36" />
                    </motion.div>
                ))}
            </div>

            <div
                className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black to-transparent  h-full pointer-events-none" />
            <div
                className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black  to-transparent h-full pointer-events-none" />
        </div>)
    );
};

export const SkeletonTwo = () => {
    const images = [
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/a12b83bb-2305-4b1d-bfef-065b2ffbef74dio-prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/f6cb9a18-5691-4ee0-99f0-a332f716ffdfRapsol_dio_prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/0933cb81-fb52-4455-a523-44685fe809c6Prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/96b062ef-6e0e-4abe-91b6-aca28de2e2c4prev.jpg",
        "https://www.bigswinghonda.com/wp-content/uploads/2021/03/86cf48c2-3eec-420b-a554-4db0f3df4cb8Honda-Grazia125_360_14-Sep_01-Prev.jpg",
    ];

    const imageVariants = {
        whileHover: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
        whileTap: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
    };
    return (
        (<div
            className="relative flex flex-col items-center gap-10 p-8 overflow-hidden">
            <div className="flex flex-row -ml-20">
                {images.map((image, idx) => (
                    <motion.div
                        variants={imageVariants}
                        key={"images-first" + idx}
                        style={{
                            rotate: Math.random() * 20 - 10,
                        }}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="flex-shrink-0 p-1 my-6 -mr-4 overflow-hidden border rounded-xl bg-neutral-800 border-neutral-700">
                        <img
                            src={image}
                            alt="bali images"
                            width="500"
                            height="500"
                            className="flex-shrink-0 object-cover w-24 h-24 rounded-lg md:h-36 md:w-36" />
                    </motion.div>
                ))}
            </div>

            <div
                className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black to-transparent  h-full pointer-events-none" />
            <div
                className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black  to-transparent h-full pointer-events-none" />
        </div>)
    );
};

export const SkeletonFour = () => {
    return (
        (<div className="relative flex h-full gap-10 px-2 py-2">
            <div
                className="w-full h-full px-5 mx-auto shadow-2xl bg-neutral-900 group">
                <div className="flex flex-col flex-1 w-full h-[17rem] space-y-2 ">
                    <img
                        src="https://garageoncall.com/static/media/bike-mechanic-near-me.a50ac3c646a6900d97be.jpg"
                        alt="header"
                        width={800}
                        height={800}
                        className=" h-[23rem] w-full aspect-square object-cover object-left-top rounded-sm" />
                </div>
            </div>
            <div
                className="absolute inset-x-0 bottom-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-t from-black via-black to-transparent" />
            <div
                className="absolute inset-x-0 top-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-b from-black via-transparent to-transparent" />
        </div>)
    );
};

export const SkeletonFive = () => {
    return (
        (<div className="relative flex h-full gap-10 p-2">
            <div
                className="w-full h-full p-5 mx-auto shadow-2xl bg-neutral-900 group">
                <div className="flex flex-1 w-full h-[15rem] flex-col space-y-2  ">
                    <img
                        src="https://garageoncall.com/static/media/bike-mechanic-near-me.a50ac3c646a6900d97be.jpg"
                        alt="header"
                        width={800}
                        height={800}
                        className=" h-[30rem] w-full aspect-square object-cover object-left-top rounded-sm" />
                </div>
            </div>
            <div
                className="absolute inset-x-0 bottom-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-t from-black via-black to-transparent" />
            <div
                className="absolute inset-x-0 top-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-b from-black via-transparent to-transparent" />
        </div>)
    );
};

export const SkeletonSix = () => {
    return (
        (<div className="relative flex h-full gap-10 p-2">
            <div
                className="w-full h-full p-5 mx-auto shadow-2xl bg-neutral-900 group">
                <div className="flex flex-1 w-full h-[15rem] flex-col space-y-2  ">
                    <img
                        src="https://garageoncall.com/static/media/bike-mechanic-near-me.a50ac3c646a6900d97be.jpg"
                        alt="header"
                        width={800}
                        height={800}
                        className=" h-[30rem] w-full aspect-square object-cover object-left-top rounded-sm" />
                </div>
            </div>
            <div
                className="absolute inset-x-0 bottom-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-t from-black via-black to-transparent" />
            <div
                className="absolute inset-x-0 top-0 z-40 w-full pointer-events-none h-60 bg-gradient-to-b from-black via-transparent to-transparent" />
        </div>)
    );
};

export const Globe = ({
    className
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.1 },
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.01;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        (<canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            className={className} />)
    );
};


export default FeatureSection