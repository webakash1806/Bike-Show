import React, { useEffect, useRef, useState } from "react";
import previewBg from '../assets/previewBg.jpg'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { FaClipboardQuestion, FaHouse, FaLeftLong } from "react-icons/fa6";
import { TabsContent } from "@radix-ui/react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Table, TableBody, TableCell, TableRow } from "../components/ui/table";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useGetScootyQuery } from "@/Redux/AllApi/BikeApi";
import { useParams } from "react-router-dom";
import EnquiryForm from "@/components/EnquiryForm";
import HomeLayout from "@/Layout/HomeLayout";
import MyReCaptchaProvider from "@/components/MyRecaptchaProvider";



const ScootyPreview = () => {

    useEffect(() => {
        AOS.init({ easing: "ease-in-out", once: false });
    }, []);

    const { id } = useParams();

    const { data: scootyData } = useGetScootyQuery(id);
    console.log(scootyData)
    const [expandedSection, setExpandedSection] = useState(null);

    const [hoveredIndex, setHoveredIndex] = useState(null);

    console.log(scootyData?.scooty?.image?.url)

    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [activeImage, setActiveImage] = useState(scootyData?.scooty?.image?.url);
    console.log(activeImage)
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
    };


    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <HomeLayout>
            <div className="min-h-screen p-1 bg-[#010101] sm:p-6">
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
                                    {scootyData?.scooty?.features?.length > 0 && (
                                        <TabsTrigger value="tab-3" className="group">

                                            Features

                                        </TabsTrigger>
                                    )}

                                    <TabsTrigger value="tab-4" className="fixed data-[state=active]:bg-red-600 -right-[4.2rem] bg-red-600 rounded-r-none hover:pr-4 hover:gap-1 p-2 pl-3 hover:pl-2 gap-6  shadow-sm shadow-green-500 z-[500000000] text-neutral-200 duration-300 data-[state=active]:text-[#ffffff] w-fit bottom-16 hover:right-0">
                                        <FaClipboardQuestion /> Enquiry
                                    </TabsTrigger>
                                </TabsList>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            <TabsContent value="tab-1">
                                <div className="relative z-40 flex flex-col scootyData?.scootys-center justify-around gap-10 p-6 pt-20 lg:pt-28 lg:flex-row">
                                    <div className="flex scootyData?.scootys-center justify-center  gap-10 w-[90%] sm:w-[95%] lg:w-[45%]">
                                        <div className="flex flex-row gap-2 mt-4 sm:flex-col">
                                            {scootyData?.scooty?.colors?.map((color, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="relative flex scootyData?.scootys-center gap-2"
                                                    onMouseEnter={() => setHoveredIndex(index)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                >

                                                    <motion.div onClick={() => setActiveImage(color?.colorScootyImg?.url)}
                                                        style={{ backgroundColor: color?.colorCode }}
                                                        className="w-10 h-10 relative z-[1001] border-white rounded-full border-2"
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
                                                src={activeImage || scootyData?.scooty?.image?.url}
                                                alt={scootyData?.scooty?.name}
                                                className="object-cover w-full mx-auto mb-4 rounded-xl "
                                                initial={{ x: -300, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 100, damping: 10 }}

                                            />


                                            {hovered && (
                                                <div
                                                    className="absolute w-48 h-48 bg-white border-white rounded-full z-[100] pointer-events-none border-6"
                                                    style={{
                                                        backgroundImage: `url(${activeImage || scootyData?.scooty?.image?.url})`,
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
                                            {scootyData?.scooty?.name} - {scootyData?.scooty?.model}
                                        </h1>
                                        <p data-aos="fade-up" data-aos-duration="500" className="mb-4 text-xl ">₹{scootyData?.scooty?.price?.toLocaleString("en-In")}</p>
                                        <p data-aos="fade-up" data-aos-duration="700" className="">{scootyData?.scooty?.description}</p>


                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="tab-2">
                                <div className="relative z-40 flex flex-col scootyData?.scootys-center justify-around gap-10 p-2 pt-20 lg:pt-28 lg:scootyData?.scootys-start lg:flex-row">
                                    <div className="flex scootyData?.scootys-center sm:flex-row flex-col-reverse justify-center  gap-10 w-[90%] sm:w-[95%] lg:w-[45%]">
                                        <div className="flex flex-row gap-2 sm:mt-4 sm:flex-col">
                                            {scootyData?.scooty?.colors?.map((color, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="relative flex scootyData?.scootys-center gap-2"
                                                    onMouseEnter={() => setHoveredIndex(index)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                >

                                                    <motion.div onClick={() => setActiveImage(color?.colorScootyImg?.url)}
                                                        style={{ backgroundColor: color?.colorCode }}
                                                        className="w-10 h-10 relative z-[1001] border-white rounded-full border-2"
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

                                            <motion.img
                                                src={activeImage || scootyData?.scooty?.image?.url}
                                                alt={scootyData?.scooty?.name}
                                                className="object-cover w-full mx-auto sm:mb-4 rounded-xl "
                                                initial={{ x: -300, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                            />

                                            {hovered && (
                                                <div
                                                    className="absolute w-48 h-48 bg-white border-white rounded-full z-[100] pointer-events-none border-6"
                                                    style={{
                                                        backgroundImage: `url(${activeImage || scootyData?.scooty?.image?.url})`,
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
                                            <TabsContent data-aos="zoom-in-up" data-aos-duration="800" value="tab-1" className="border rounded-md shadow-md border-red-900/20">
                                                <Table className="overflow-hidden rounded-md shadow">
                                                    <TableBody className="overflow-hidden rounded-md">
                                                        {scootyData?.scooty?.specification?.bodyDimensions && (
                                                            Object.entries(scootyData?.scooty?.specification?.bodyDimensions || {}).map(([key, value]) => {
                                                                const valueString = value === null || value === undefined ? "" : String(value);
                                                                return (
                                                                    valueString &&
                                                                    <TableRow key={key} className=" hover:bg-transparent [&>:not(:last-child)]:border-r *:border-gray-800">

                                                                        <>
                                                                            <TableCell className="py-1 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-1 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
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
                                                        {scootyData?.scooty?.specification?.engine && (
                                                            Object.entries(scootyData?.scooty?.specification?.engine || {}).map(([key, value]) => {
                                                                const valueString = value === null || value === undefined ? "" : String(value);
                                                                return (
                                                                    valueString &&
                                                                    <TableRow key={key} className=" hover:bg-transparent [&>:not(:last-child)]:border-r *:border-gray-800">

                                                                        <>
                                                                            <TableCell className="py-1 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-1 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
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
                                                        {scootyData?.scooty?.specification?.transmission && (
                                                            Object.entries(scootyData?.scooty?.specification?.transmission || {}).map(([key, value]) => {
                                                                const valueString = value === null || value === undefined ? "" : String(value);
                                                                return (
                                                                    valueString &&
                                                                    <TableRow key={key} className=" hover:bg-transparent [&>:not(:last-child)]:border-r *:border-gray-800">

                                                                        <>
                                                                            <TableCell className="py-1 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-1 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
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
                                                        {scootyData?.scooty?.specification?.frameAndSuspension && (
                                                            Object.entries(scootyData?.scooty?.specification?.frameAndSuspension || {}).map(([key, value]) => {
                                                                const valueString = value === null || value === undefined ? "" : String(value);
                                                                return (
                                                                    valueString &&
                                                                    <TableRow key={key} className=" hover:bg-transparent [&>:not(:last-child)]:border-r *:border-gray-800">

                                                                        <>
                                                                            <TableCell className="py-1 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-1 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
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
                                                        {scootyData?.scooty?.specification?.tyresAndBrakes && (
                                                            Object.entries(scootyData?.scooty?.specification?.tyresAndBrakes || {}).map(([key, value]) => {
                                                                const valueString = value === null || value === undefined ? "" : String(value);
                                                                return (
                                                                    valueString &&
                                                                    <TableRow key={key} className=" hover:bg-transparent [&>:not(:last-child)]:border-r *:border-gray-800">

                                                                        <>
                                                                            <TableCell className="py-1 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-1 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
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
                                                        {scootyData?.scooty?.specification?.electronics && (
                                                            Object.entries(scootyData?.scooty?.specification?.electronics || {}).map(([key, value]) => {
                                                                const valueString = value === null || value === undefined ? "" : String(value);
                                                                return (
                                                                    valueString &&
                                                                    <TableRow key={key} className=" hover:bg-transparent [&>:not(:last-child)]:border-r *:border-gray-800">

                                                                        <>
                                                                            <TableCell className="py-1 font-semibold  w-[9rem] bg-neutral-900">
                                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                                                            </TableCell>
                                                                            <TableCell className="py-1 bg-[#010101]">{valueString}</TableCell>
                                                                        </>
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
                                    <h1 className="mb-8 text-3xl font-semibold text-white">{scootyData?.scooty?.name} - {scootyData?.scooty?.model}</h1>
                                    <Swiper
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
                                        {scootyData?.scooty?.features?.map((movie, index) => (
                                            <SwiperSlide
                                                key={index}
                                                className="flex justify-center rounded-lg p-2 pt-3 border bg-gradient-to-b from-[#4e4e4e] via-[#222222] to-[#080808] max-w-[26rem] shadow-lg"
                                            >
                                                <div className="relative mx-auto overflow-hidden w-[25rem] h-[14rem]">
                                                    <img
                                                        src={movie.featureImg.url}
                                                        alt={movie.title}
                                                        className="absolute left-0 top-4"
                                                    />
                                                    <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                                        <h3 className="text-lg font-bold">{movie.title}</h3>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Navigation Arrows Below the Swiper */}
                                    <div className="absolute z-[10000] flex flex-row-reverse scootyData?.scootys-center justify-center gap-4 mt-6 right-10 -bottom-20 lg:right-24">

                                        <button ref={nextRef} className="p-2 text-white bg-[#E7000B] rounded-lg text-[2rem] custom-prev">
                                            <MdKeyboardDoubleArrowRight />
                                        </button>
                                        <button ref={prevRef} className="p-2 text-white bg-[#E7000B] rounded-lg text-[2rem] custom-next">
                                            <MdKeyboardDoubleArrowLeft />
                                        </button>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="tab-4">
                                <div className="relative z-40 flex flex-col items-center justify-around gap-4 min-h-[22rem] sm:min-h-[25rem] lg:flex-row pb-10">
                                    <div className="flex sm:flex-row flex-col-reverse  items-center   max-h-[25rem]  h-full justify-center p-6  md:gap-4 w-[99%] sm:w-[95%] lg:w-[45%]">
                                        <div className="flex flex-row gap-2 sm:flex-col">
                                            {scootyData?.scooty?.colors?.map((color, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="relative flex items-center gap-2"
                                                    onMouseEnter={() => setHoveredIndex(index)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                >

                                                    <motion.div onClick={() => setActiveImage(color?.colorBikeImg?.url)}
                                                        style={{ backgroundColor: color?.colorCode }}
                                                        className="size-8 relative z-[1001] border-white rounded-full border-2"
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

                                            <motion.img
                                                src={activeImage || scootyData?.scooty?.image?.url}
                                                alt={scootyData?.scooty?.name}
                                                className="object-cover w-full mx-auto mb-4 rounded-xl "
                                                initial={{ x: -300, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                            />

                                            {hovered && (
                                                <div
                                                    className="absolute w-48 h-48 bg-white border-white rounded-full z-[100] pointer-events-none border-6"
                                                    style={{
                                                        backgroundImage: `url(${activeImage || scootyData?.scooty?.image?.url})`,
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
                                    <div className="text-white pb-10 p-4 border rounded-md bg-[#111111] border-neutral-700 w-[99%]  sm:w-[95%] lg:w-[45%]">

                                        <h2 className="relative z-10 mb-6 font-sans text-3xl font-bold tracking-wide text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                                            Enquiry
                                        </h2>
                                        <MyReCaptchaProvider>
                                            <EnquiryForm vehicleType={"Scooty"} model={scootyData?.scooty?._id} />
                                        </MyReCaptchaProvider>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                        <img src={previewBg} alt="" className="absolute top-0 z-10 object-cover w-full h-full rounded-lg" />
                        <div className="absolute inset-0 rounded-lg z-20 p-6 bg-gradient-to-b lg:bg-gradient-to-r from-[#08080874] via-[#080808d7] to-[#080808e5]"></div>

                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ScootyPreview;