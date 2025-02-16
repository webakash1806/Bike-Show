import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

const AboutSection = () => {
    return (
        <div
            className="max-h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-[80rem] mx-auto p-4">
                <h1
                    className="relative z-10 font-sans text-4xl font-bold text-center text-transparent md:leading-[5rem] leading-[2.8rem] md:text-6xl bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500">
                    Welcome to Bigswing Honda
                </h1>
                <h2 className="my-4 text-xl text-center text-neutral-200 md:text-3xl">
                    Authorised Honda Bike Dealer in Gurgaon, Haryana
                </h2>
                <p
                    className="relative z-10 max-w-xl mx-auto my-2 mt-4 text-sm text-center lg:max-w-2xl md:text-lg text-neutral-300">
                    Bigswing Honda is an authorised Honda dealership for bikes and scooters in Gurgaon, Haryana. Established with an aim to offer excellent customer services to its esteemed two-wheeler consumers in Gurgaon, the dealership brings modern and innovative auto services.
                </p>
                <p
                    className="relative z-10 max-w-xl mx-auto my-4 text-sm text-center lg:max-w-2xl md:text-lg text-neutral-300">
                    Offering the latest range of Honda bikes and scooters at very attractive prices, the dealership also provides repair & other services, finance & insurance deals, quick quotes and test drive facility. Backed by a team of highly-efficient professionals, the dealership is ready to deliver outstanding auto services and set a new benchmark in the dealership world.
                </p>
            </div>
            <BackgroundBeams />
        </div>
    );
}

export default AboutSection