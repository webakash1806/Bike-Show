import AboutSection from '@/components/AboutSection'
import { CardContainer, CardItem } from '@/components/ui/3d-card'
import { HeroHighlight } from '@/components/ui/hero-highlight'
import { motion } from "framer-motion";
import ShineBorder from '@/components/ui/shine-border';
import HomeLayout from '@/Layout/HomeLayout';

const About = () => {
    return (
        <HomeLayout>
            <AboutSection />
            <CardContainer className="w-full mx-auto inter-var max-w-fit">
                <ShineBorder className="relative flex flex-col items-center justify-center w-full overflow-hidden rounded-lg h-fit bg-neutral-800 md:shadow-xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                    <motion.div
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
                        className="container mx-auto lg:max-w-[75rem] overflow-hidden  rounded-lg shadow-lg  bg-gradient-to-t from-gray-900 via-gray-800 to-black">
                        <HeroHighlight containerClassName="h-fit py-10  px-6">
                            <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
                                <motion.div

                                    className="lg:w-1/2">
                                    <motion.h2

                                        className="mb-6 text-3xl font-bold leading-snug text-center text-transparent lg:text-left bg-clip-text bg-gradient-to-b from-neutral-500 to-white"
                                    >
                                        Our Brand
                                    </motion.h2>
                                    <div className="space-y-4">
                                        <p className="leading-relaxed text-justify text-neutral-300">
                                            Bigswing Honda Motors is dedicated to providing top-notch services to our customers in Gurgaon, Haryana. As an authorized dealer, we offer the latest models of Honda bikes and scooters, along with exceptional customer support and service.
                                        </p>
                                        <p className="leading-relaxed text-justify text-neutral-300">
                                            Bigswing Honda Motors prides itself on its commitment to quality, ensuring a seamless experience for customers, from purchase to after-sales service. We prioritize customer satisfaction and strive to build long-lasting relationships with our clients.
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="flex justify-center lg:justify-end lg:items-end lg:w-1/2">
                                    <CardItem translateZ="200" className=" w-fit">
                                        <img
                                            className="rounded-lg shadow-lg object-cover max-w-[18rem] md:max-w-[24rem] lg:max-w-[28rem]"
                                            src="https://pbs.twimg.com/media/FmBMNYoacAAPlwf.jpg"
                                            alt="Honda Motors Display"
                                        />
                                    </CardItem>
                                </div>
                            </div>
                        </HeroHighlight>
                    </motion.div>
                </ShineBorder>
            </CardContainer>
            <CardContainer className="w-full mx-auto inter-var max-w-fit">
                <ShineBorder className="relative flex flex-col items-center justify-center w-full overflow-hidden rounded-lg h-fit bg-neutral-800 md:shadow-xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                    <motion.div
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
                        className="container mx-auto lg:max-w-[75rem] overflow-hidden  rounded-lg shadow-lg  bg-gradient-to-t from-gray-900 via-gray-800 to-black">
                        <HeroHighlight containerClassName="h-fit py-10  px-6">
                            <div className="flex flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:gap-12">
                                <div className="flex justify-center lg:w-1/2">
                                    <CardItem translateZ="100" className="w-full ">
                                        <img
                                            className="rounded-lg shadow-lg object-cover max-w-[18rem] md:max-w-[24rem] lg:max-w-[28rem]"
                                            src="https://pbs.twimg.com/media/FmBMNYoacAAPlwf.jpg"
                                            alt="Honda Motors Display"
                                        />
                                    </CardItem>
                                </div>
                                <motion.div

                                    className="lg:w-1/2">
                                    <motion.h2

                                        className="mb-6 text-3xl font-bold leading-snug text-center text-transparent lg:text-left bg-clip-text bg-gradient-to-b from-neutral-500 to-white"
                                    >
                                        Our Vision
                                    </motion.h2>
                                    <div className="space-y-4">
                                        <p className="leading-relaxed text-justify text-neutral-300">
                                            Bigswing Honda Motors is dedicated to providing top-notch services to our customers in Gurgaon, Haryana. As an authorized dealer, we offer the latest models of Honda bikes and scooters, along with exceptional customer support and service.
                                        </p>
                                        <p className="leading-relaxed text-justify text-neutral-300">
                                            Bigswing Honda Motors prides itself on its commitment to quality, ensuring a seamless experience for customers, from purchase to after-sales service. We prioritize customer satisfaction and strive to build long-lasting relationships with our clients.
                                        </p>
                                    </div>
                                </motion.div>


                            </div>
                        </HeroHighlight>
                    </motion.div>
                </ShineBorder>
            </CardContainer>
            <CardContainer className="w-full mx-auto inter-var max-w-fit">
                <ShineBorder className="relative flex flex-col items-center justify-center w-full overflow-hidden rounded-lg h-fit bg-neutral-800 md:shadow-xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                    <motion.div
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
                        className="container mx-auto lg:max-w-[75rem] overflow-hidden  rounded-lg shadow-lg bg-gradient-to-t from-gray-900 via-gray-800 to-black">
                        <HeroHighlight containerClassName="h-fit py-10  px-6">
                            <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
                                <motion.div

                                    className="lg:w-1/2">
                                    <motion.h2

                                        className="mb-6 text-3xl font-bold leading-snug text-center text-transparent lg:text-left bg-clip-text bg-gradient-to-b from-neutral-500 to-white"
                                    >
                                        Our Mission
                                    </motion.h2>
                                    <div className="space-y-4">
                                        <p className="leading-relaxed text-justify text-neutral-300">
                                            Bigswing Honda Motors is dedicated to providing top-notch services to our customers in Gurgaon, Haryana. As an authorized dealer, we offer the latest models of Honda bikes and scooters, along with exceptional customer support and service.
                                        </p>
                                        <p className="leading-relaxed text-justify text-neutral-300">
                                            Bigswing Honda Motors prides itself on its commitment to quality, ensuring a seamless experience for customers, from purchase to after-sales service. We prioritize customer satisfaction and strive to build long-lasting relationships with our clients.
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="flex justify-center lg:justify-end lg:items-end lg:w-1/2">
                                    <CardItem translateZ="100" className=" w-fit">
                                        <img
                                            className="rounded-lg shadow-lg object-cover max-w-[18rem] md:max-w-[24rem] lg:max-w-[28rem]"
                                            src="https://pbs.twimg.com/media/FmBMNYoacAAPlwf.jpg"
                                            alt="Honda Motors Display"
                                        />
                                    </CardItem>
                                </div>
                            </div>
                        </HeroHighlight>
                    </motion.div>
                </ShineBorder>
            </CardContainer>
        </HomeLayout>
    )
}

export default About
