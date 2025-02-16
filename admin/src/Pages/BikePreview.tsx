import React, { useEffect, useRef, useState } from "react";
import previewBg from '../assets/previewBg.jpg'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { FaHouse, FaXmark } from "react-icons/fa6";
import { TabsContent } from "@radix-ui/react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-coverflow";
// @ts-ignore
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Table, TableBody, TableCell, TableRow } from "../components/ui/table";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Colors, Features, Specification } from "../interfaces/interface";

interface BikeData {
    _id: string
    image: {
        url: string;
        publicId: string
    };
    name: string;
    model: string;
    price: number;
    description: string;
    colors: Colors[]
    features: Features[]
    specification: Specification
    addedBy: string | undefined
    lastModifiedBy: string | undefined
}

const BikePreview: React.FC<{ item: BikeData | undefined, onClose: (value: boolean) => void }> = ({ item, onClose }) => {

    useEffect(() => {
        AOS.init({ easing: "ease-in-out", once: false });
    }, []);

    // const [expandedSection, setExpandedSection] = useState<string | null>(null);

    // const toggleSection = (section: string) => {
    //     setExpandedSection(expandedSection === section ? null : section);
    // };

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    console.log(item?.image?.url)

    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [activeImage, setActiveImage] = useState<string | undefined>(item?.image?.url);
    console.log(activeImage)
    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top, width, height } = (e.target as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
    };

    console.log(item)

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {

    }, [prevRef, nextRef])

    return (
        <div className="min-h-screen p-1 bg-gray-100 sm:p-6">
            <div
                onClick={() => onClose(false)}
                className={` rounded-b-none w-fit relative ml-auto border-border bg-red-700 py-2 pb-4 top-5 border-t-3 border-[#D5D5D5] text-gray-100  flex items-center justify-center  rounded-md px-2.5 font-semibold outline-offset-2 transition-all hover:bg-red-600 cursor-pointer`}
            ><FaXmark /></div>
            <div className="pt-3 overflow-hidden">
                <div className="relative  min-h-[93vh]  bg-white rounded-lg shadow-lg">
                    <Tabs defaultValue="tab-1" className="relative top-0 right-0 z-50 w-full h-full">
                        <ScrollArea className="p-0.5 mx-auto z-[70] bg-white rounded-lg -top-2 w-fit">
                            <TabsList className="p-[0.18rem]">
                                <TabsTrigger value="tab-1">
                                    <FaHouse
                                        className="-ms-0.5 me-1.5 opacity-60"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="tab-2" className="group">

                                    Specification

                                </TabsTrigger>
                                {item?.features && item?.features?.length > 0 && (
                                    <TabsTrigger value="tab-3" className="group">

                                        Features

                                    </TabsTrigger>
                                )}
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <TabsContent value="tab-1">
                            <div className="relative z-40 flex flex-col items-center justify-around gap-10 p-6 pt-20 lg:pt-28 lg:flex-row">
                                <div className="flex items-center justify-center  gap-10 w-[90%] sm:w-[95%] lg:w-[45%]">
                                    <div className="flex flex-row gap-2 mt-4 sm:flex-col">
                                        {item?.colors?.map((color, index) => (
                                            <motion.div
                                                key={index}
                                                className="relative flex items-center gap-2"
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >

                                                <motion.div onClick={() => setActiveImage(color?.colorBikeImg?.url)}
                                                    style={{ backgroundColor: color?.colorCode }}
                                                    className="w-10 h-10 relative z-[1001] border-white rounded-full border-3"
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                                />

                                                {/* Color Name (Shown on Hover) */}
                                                {hoveredIndex === index && (
                                                    <motion.div
                                                        className="absolute z-[1000] h-10 left-0 w-48 px-3 pl-12   
                                                       rounded-l-full
                                                         text-[0.8rem] font-semibold text-white bg-gray-800  shadow-lg"
                                                        initial={{ x: -10, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        exit={{ x: -10, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {color?.colorName}
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div
                                        className="relative flex p-2 mb-4 rounded-xl "
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                        onMouseMove={handleMouseMove}
                                    >



                                        {/* Main Image */}
                                        <motion.img
                                            src={activeImage || item?.image?.url}
                                            alt={item?.name}
                                            className="object-cover w-full mx-auto mb-4 rounded-xl "
                                            initial={{ x: -300, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 10 }}

                                        />


                                        {hovered && (
                                            <div
                                                className="absolute w-48 h-48 bg-white border-white rounded-full z-[100] pointer-events-none border-6"
                                                style={{
                                                    backgroundImage: `url(${activeImage || item?.image?.url})`,
                                                    backgroundSize: "650%",
                                                    backgroundPosition: `${position.x}% ${position.y}%`,
                                                    top: `calc(${position.y}% - 0.2rem)`,
                                                    left: `calc(${position.x}% - 0.2rem)`,
                                                    transform: "translate(-10%, -10%)",
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-white w-[99%] sm:w-[95%] lg:w-[45%]">
                                    <h1 data-aos="fade-up" data-aos-duration="300" className="mb-2 text-3xl font-bold ">
                                        {item?.name}
                                    </h1>
                                    <p data-aos="fade-up" data-aos-duration="500" className="mb-4 text-xl ">₹{item?.price?.toLocaleString("en-In")}</p>
                                    <p data-aos="fade-up" data-aos-duration="700" className="">{item?.description}</p>

                                    <div data-aos="fade-up" data-aos-duration="900">
                                        <button className="px-6 font-semibold py-2 mt-4 text-sm text-white bg-[#E7000B] border border-black rounded-md">Enquiry</button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="tab-2">
                            <div className="relative z-40 flex flex-col items-center justify-around gap-10 p-2 pt-20 lg:pt-28 lg:items-start lg:flex-row">
                                <div className="flex items-center sm:flex-row flex-col-reverse justify-center  gap-10 w-[90%] sm:w-[95%] lg:w-[45%]">
                                    <div className="flex flex-row gap-2 sm:mt-4 sm:flex-col">
                                        {item?.colors?.map((color, index) => (
                                            <motion.div
                                                key={index}
                                                className="relative flex items-center gap-2"
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >

                                                <motion.div onClick={() => setActiveImage(color?.colorBikeImg?.url)}
                                                    style={{ backgroundColor: color?.colorCode }}
                                                    className="w-10 h-10 relative z-[1001] border-white rounded-full border-3"
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                                />

                                                {/* Color Name (Shown on Hover) */}
                                                {hoveredIndex === index && (
                                                    <motion.div
                                                        className="absolute hidden sm:block z-[1000] h-10 left-0 w-48 px-3 pl-12   
                                                       rounded-l-full
                                                         text-[0.8rem] font-semibold text-white bg-gray-800  shadow-lg"
                                                        initial={{ x: -10, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        exit={{ x: -10, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {color?.colorName}
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div
                                        className="relative flex p-2 mb-4 rounded-xl "
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                        onMouseMove={handleMouseMove}
                                    >



                                        {/* Main Image */}
                                        <motion.img
                                            src={activeImage || item?.image?.url}
                                            alt={item?.name}
                                            className="object-cover w-full mx-auto sm:mb-4 rounded-xl "
                                            initial={{ x: -300, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 10 }}

                                        />


                                        {hovered && (
                                            <div
                                                className="absolute w-48 h-48 bg-white border-white rounded-full z-[100] pointer-events-none border-6"
                                                style={{
                                                    backgroundImage: `url(${activeImage || item?.image?.url})`,
                                                    backgroundSize: "650%",
                                                    backgroundPosition: `${position.x}% ${position.y}%`,
                                                    top: `calc(${position.y}% - 0.2rem)`,
                                                    left: `calc(${position.x}% - 0.2rem)`,
                                                    transform: "translate(-10%, -10%)",
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-white w-[99%]  sm:w-[95%] lg:w-[40%]">
                                    <Tabs defaultValue="tab-1">
                                        <ScrollArea className="bg-transparent">
                                            <TabsList data-aos="flip-up" data-aos-duration="700" className="grid grid-cols-2 gap-1 p-1 mb-3 bg-black sm:grid-cols-3">
                                                <TabsTrigger value="tab-1" className="bg-neutral-900">
                                                    Body Dimensions
                                                </TabsTrigger>
                                                <TabsTrigger value="tab-2" className="group bg-neutral-900">
                                                    Engine
                                                </TabsTrigger>
                                                <TabsTrigger value="tab-3" className="group bg-neutral-900">
                                                    Transmission
                                                </TabsTrigger>
                                                <TabsTrigger value="tab-4" className="group bg-neutral-900">
                                                    Frame & Suspension
                                                </TabsTrigger>
                                                <TabsTrigger value="tab-5" className="group bg-neutral-900">
                                                    Electric
                                                </TabsTrigger>
                                                <TabsTrigger value="tab-6" className="group bg-neutral-900">
                                                    Tyres & Brake
                                                </TabsTrigger>
                                            </TabsList>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                        <TabsContent data-aos="zoom-in-up" data-aos-duration="800" value="tab-1" className="border rounded-md shadow-md border-red-900/20 shadow-red-500/50">
                                            <Table className="overflow-hidden rounded-md shadow">
                                                <TableBody className="overflow-hidden rounded-md">
                                                    {item?.specification?.bodyDimensions && (
                                                        Object.entries(item?.specification?.bodyDimensions || {}).map(([key, value]: [string, unknown]) => {
                                                            const valueString = value === null || value === undefined ? "" : String(value);
                                                            return (
                                                                <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
                                                                    {valueString && (
                                                                        <>
                                                                            <TableCell className="py-2 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-2 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
                                                                    )}
                                                                </TableRow>
                                                            );
                                                        })
                                                    )}

                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent data-aos="zoom-in-up" data-aos-duration="800" value="tab-2" className="border rounded-md shadow-md border-red-900/20 shadow-red-500/50">
                                            <Table className="overflow-hidden rounded-md shadow">
                                                <TableBody className="overflow-hidden rounded-md">
                                                    {item?.specification?.engine && (
                                                        Object.entries(item?.specification?.engine || {}).map(([key, value]: [string, unknown]) => {
                                                            const valueString = value === null || value === undefined ? "" : String(value);
                                                            return (
                                                                <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
                                                                    {valueString && (
                                                                        <>
                                                                            <TableCell className="py-2 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-2 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
                                                                    )}
                                                                </TableRow>
                                                            );
                                                        })
                                                    )}

                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent data-aos="zoom-in-up" data-aos-duration="800" value="tab-3" className="border rounded-md shadow-md border-red-900/20 shadow-red-500/50">
                                            <Table className="overflow-hidden rounded-md shadow">
                                                <TableBody className="overflow-hidden rounded-md">
                                                    {item?.specification?.transmission && (
                                                        Object.entries(item?.specification?.transmission || {}).map(([key, value]: [string, unknown]) => {
                                                            const valueString = value === null || value === undefined ? "" : String(value);
                                                            return (
                                                                <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
                                                                    {valueString && (
                                                                        <>
                                                                            <TableCell className="py-2 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-2 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
                                                                    )}
                                                                </TableRow>
                                                            );
                                                        })
                                                    )}

                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent data-aos="zoom-in-up" data-aos-duration="800" value="tab-4" className="border rounded-md shadow-md border-red-900/20 shadow-red-500/50">
                                            <Table className="overflow-hidden rounded-md shadow">
                                                <TableBody className="overflow-hidden rounded-md">
                                                    {item?.specification?.frameAndSuspension && (
                                                        Object.entries(item?.specification?.frameAndSuspension || {}).map(([key, value]: [string, unknown]) => {
                                                            const valueString = value === null || value === undefined ? "" : String(value);
                                                            return (
                                                                <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
                                                                    {valueString && (
                                                                        <>
                                                                            <TableCell className="py-2 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-2 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
                                                                    )}
                                                                </TableRow>
                                                            );
                                                        })
                                                    )}

                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent data-aos="zoom-in-up" data-aos-duration="800" value="tab-5" className="border rounded-md shadow-md border-red-900/20 shadow-red-500/50">
                                            <Table className="overflow-hidden rounded-md shadow">
                                                <TableBody className="overflow-hidden rounded-md">
                                                    {item?.specification?.tyresAndBrakes && (
                                                        Object.entries(item?.specification?.tyresAndBrakes || {}).map(([key, value]: [string, unknown]) => {
                                                            const valueString = value === null || value === undefined ? "" : String(value);
                                                            return (
                                                                <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
                                                                    {valueString && (
                                                                        <>
                                                                            <TableCell className="py-2 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-2 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
                                                                    )}
                                                                </TableRow>
                                                            );
                                                        })
                                                    )}

                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent data-aos="zoom-in-up" data-aos-duration="800" value="tab-6" className="border rounded-md shadow-md border-red-900/20 shadow-red-500/50">
                                            <Table className="overflow-hidden rounded-md shadow">
                                                <TableBody className="overflow-hidden rounded-md">
                                                    {item?.specification?.electronics && (
                                                        Object.entries(item?.specification?.electronics || {}).map(([key, value]: [string, unknown]) => {
                                                            const valueString = value === null || value === undefined ? "" : String(value);
                                                            return (
                                                                <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
                                                                    {valueString && (
                                                                        <>
                                                                            <TableCell className="py-2 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-2 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
                                                                    )}
                                                                </TableRow>
                                                            );
                                                        })
                                                    )}

                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="tab-3">
                            <div className="p-4 pt-12 text-xs text-center text-gray-500 lg:pt-16 dark:text-gray-400">
                                <h1 className="mb-8 text-3xl font-semibold text-white">{item?.name} - {item?.model}</h1>
                                <Swiper ref={nextRef}
                                    effect={"coverflow"}
                                    grabCursor={true}
                                    centeredSlides={true}
                                    slidesPerView={"auto"}
                                    coverflowEffect={{
                                        rotate: 20,
                                        stretch: 28,
                                        depth: 120,
                                        modifier: 2,
                                        slideShadows: true,
                                    }}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    navigation={{
                                        prevEl: prevRef.current,
                                        nextEl: nextRef.current,
                                    }}

                                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                                    className="w-full max-w-7xl"
                                >
                                    {item?.features?.map((feature, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className="flex justify-center rounded-lg p-2 pt-3 border bg-gradient-to-b from-[#4e4e4e] via-[#222222] to-[#080808] max-w-[26rem] shadow-lg"
                                        >
                                            <div className="relative mx-auto overflow-hidden w-[25rem] h-[14rem]">
                                                <img
                                                    src={feature.featureImg.url}
                                                    alt={feature.title}
                                                    className="absolute left-0 top-4"
                                                />
                                                <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                                    <h3 className="text-lg font-bold">{feature.title}</h3>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Navigation Arrows Below the Swiper */}
                                <div className="absolute z-[10000] flex flex-row-reverse items-center justify-center gap-4 mt-6 right-10 -bottom-20 lg:right-24">

                                    <button ref={nextRef} className="p-2 text-white bg-[#E7000B] rounded-lg text-[2rem] custom-prev">
                                        <MdKeyboardDoubleArrowRight />
                                    </button>
                                    <button ref={prevRef} className="p-2 text-white bg-[#E7000B] rounded-lg text-[2rem] custom-next">
                                        <MdKeyboardDoubleArrowLeft />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <img src={previewBg} alt="" className="absolute top-0 z-10 object-cover w-full h-full rounded-lg" />
                    <div className="absolute inset-0 rounded-lg z-20 p-6 bg-gradient-to-b lg:bg-gradient-to-r from-[#08080874] via-[#080808d7] to-[#080808e5]"></div>

                </div>
            </div>
        </div>
    );
};

export default BikePreview;