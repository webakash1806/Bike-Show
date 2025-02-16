import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import { FaXmark } from 'react-icons/fa6';
import { useGetAllAccessoriesQuery, useGetAllHelmetQuery } from '@/Redux/AllApi/BikeApi';
import HomeLayout from '@/Layout/HomeLayout';


const AllAccessories = () => {

    const [getDataKey, setDataKey] = useState("bike")
    const [helmetActive, setHelmetActive] = useState(false)
    const { data, isLoading, refetch } = useGetAllAccessoriesQuery({ data: getDataKey })
    const { data: helmet, isLoading: helmetLoading } = useGetAllHelmetQuery()
    const [activeData, setActiveData] = useState()
    const [activeTab, setActiveTab] = useState(1)
    const [selectedSize, setSelectedSize] = useState(null)

    const tabArray = ["Bike Accessories", "Scooty Accessories", "Helmets"]

    useEffect(() => {
        setDataKey(activeTab === 1 ? "bike" : "scooty")
        if (activeTab === 1 || activeTab === 2) {
            refetch()
        }
    }, [activeTab])

    console.log(selectedSize)
    return (
        <HomeLayout>
            {helmetActive ?
                <div className='inset-0 flex items-center justify-center min-h-[80vh] bg-black '>
                    <div
                        className="flex flex-col justify-center rounded-lg  border bg-gradient-to-b from-[#4e4e4e] overflow-hidden via-[#222222] to-[#292929] w-[21rem] shadow-lg"
                    >
                        <h3 className="relative p-2 font-semibold text-center text-white uppercase rounded-none text-md size-neu">{activeData?.title} <span onClick={() => setHelmetActive(false)} className='absolute inset-0 right-0  ml-auto bg-red-500 w-[2.5rem] flex items-center justify-center'><FaXmark /></span></h3>
                        <div className="relative mx-auto overflow-hidden w-[17rem] h-[16rem] flex items-center justify-center">
                            <img
                                src={activeData?.helmetImg.url}
                                alt={activeData?.title}
                                className="left-0 "
                            />

                        </div>
                        <div className="bottom-0 left-0 w-full text-white ">
                            <p className='mb-3 text-center uppercase'>{activeData?.colorName}</p>

                            <div className='flex justify-between p-2 bg-neutral-900'>
                                <div className='flex items-center gap-1 tracking-wide'>
                                    Select Size :
                                    {activeData?.variant?.map((size, ind) => {
                                        return <div key={ind} onClick={() => setSelectedSize(size)} className={`rounded-[7px] cursor-pointer text-white flex items-center justify-center font-bold bg-[#363636] ${selectedSize?.size === size?.size ? "size-neu" : ""} size-[2.3rem]`}
                                        >
                                            {size?.size}
                                        </div>
                                    })}
                                </div>
                                <p className='mt-2 text-center '>&#8377; {selectedSize?.price.toLocaleString("en-In")}</p>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className=''>
                    <div className="relative flex">
                        <div className="relative flex pt-4 mx-auto bg-transparent w-fit">
                            {tabArray.map((tab, index) => (
                                <div key={index} onClick={() => setActiveTab(index + 1)}
                                    className={` rounded-b-none z-[10]  border-x border-t border-border bg-neutral-800 py-2  text-gray-100  flex items-center justify-center  rounded-md px-2.5  text-[0.85rem] font-semibold outline-offset-2 transition-all hover:bg-black cursor-pointer ${activeTab === index + 1 ? "bg-red-700" : ""}`}
                                >

                                    {tab}
                                </div>
                            ))}

                        </div>

                    </div>
                    {activeTab === 1 &&
                        <div className='flex  bg-black  overflow-hidden bg-grid-white/[0.2] flex-wrap items-center justify-center gap-6 p-6  w-[98%]  mx-auto rounded-xl'>
                            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                            {data?.bikeAccessories?.map((item, index) => {
                                return <div key={index} className='flex shadow shadow-red-300  w-[19rem] rounded-xl rounded-b-md flex-col items-center justify-center gap-2 bg-[#1f1f1f] relative group'>
                                    <div className='h-[20rem] w-full  flex-col flex items-center relative justify-center overflow-hidden'>
                                        <div className='p-1.5 absolute -left-[0.01rem] top-0 px-4 text-white z-[10] mr-auto bg-red-600 w-fit rounded-br'>
                                            <span>{item.model?.bike?.name}</span>
                                        </div>
                                        <img className='w-[17.5rem]' src={item.model?.bike?.image?.url} />
                                        <div className='h-[20rem] w-full bg-gradient-to-b from-red-700/10 via-[#010101] rounded-tr-2xl backdrop-blur-sm text-white to-[#000] flex absolute duration-500 group-hover:top-0 top-[20rem] group-hover:pt-10 flex-col items-center justify-center'>
                                            <h1 className='text-[1.2rem] font-semibold text-center'>Starting from <br />  &#8377; {item?.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</h1>
                                            {/* <p className='text-[0.9rem]'>{item.model?.bike?.name}</p> */}
                                            <p className='pt-2 text-center'>{item.description}</p>
                                        </div>
                                    </div>
                                    <h1 className='w-full p-2 bg-gradient-to-b rounded-b-md from-neutral-300 to-neutral-400 text-center font-semibold text-[1.1rem] uppercase' key={index}>{item.title}</h1>
                                </div>
                            })}
                        </div>}
                    {activeTab === 2 &&
                        <div className='flex bg-black  overflow-hidden bg-grid-white/[0.2] flex-wrap items-center justify-center gap-6 p-6  w-[98%]  mx-auto rounded-xl'>
                            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                            {data?.scootyAccessories?.map((item, index) => {
                                return <div key={index} className='flex shadow shadow-red-300  w-[19rem] rounded-xl rounded-b-md flex-col items-center justify-center gap-2 bg-[#1f1f1f] relative group'>
                                    <div className='h-[20rem] w-full  flex-col flex items-center relative justify-center overflow-hidden'>
                                        <div className='p-1.5 absolute left-0 top-0 px-4 text-white z-[10] mr-auto bg-red-600 w-fit rounded-br'>
                                            <span>{item.model?.scooty?.name}</span>
                                        </div>
                                        <img className='w-[17.5rem]' src={item.model?.scooty?.image?.url} />
                                        <div className='h-[20rem] w-full bg-gradient-to-b from-red-700/10 via-[#010101] rounded-tr-2xl backdrop-blur-sm text-white to-[#000] flex absolute duration-500 group-hover:top-0 top-[20rem] group-hover:pt-10 flex-col items-center justify-center'>
                                            <h1 className='text-[1.2rem] font-semibold text-center'>Starting from <br />  &#8377; {item?.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</h1>
                                            {/* <p className='text-[0.9rem]'>{item.model?.bike?.name}</p> */}
                                            <p className='pt-2 text-center'>{item.description}</p>
                                        </div>
                                    </div>
                                    <h1 className='w-full p-2 bg-gradient-to-b from-neutral-300 to-neutral-400 text-center font-semibold text-[1.1rem] uppercase' key={index}>{item.title}</h1>
                                </div>
                            })}
                        </div>}
                    {activeTab === 3 &&
                        <div className='w-[98%] space-y-6 mx-auto  '>
                            {helmet?.helmets?.map((item, index) => {
                                return <div key={index}
                                    className="relative border-red-900/50 shadow-red-800/60 shadow-md bg-grid-white/[0.2] flex flex-col items-center justify-center w-full p-4 overflow-hidden bg-black border  rounded-lg  md:flex-row md:p-8">
                                    <div className="absolute pointer-events-none inset-0 z-[10] flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                                    <div className="relative z-10 w-full p-4 md:w-[35%]">
                                        <h2 className="relative z-10 font-sans text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">{item?.title}</h2>
                                        <p className="mt-2 text-neutral-200">{item?.description}</p>
                                    </div>

                                    <div className="w-full relative z-[100] mt-6 md:w-[65%] md:mt-0">

                                        <Swiper
                                            effect={"coverflow"}
                                            grabCursor={true}
                                            centeredSlides={true}
                                            slidesPerView={"auto"}
                                            coverflowEffect={{
                                                rotate: 20,
                                                stretch: 20,
                                                depth: 60,
                                                modifier: 1.8,
                                                slideShadows: true,
                                            }}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            loop={true}
                                            // navigation={{
                                            //     prevEl: prevRef.current,
                                            //     nextEl: nextRef.current,
                                            // }}

                                            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                                            className="w-full"
                                        >
                                            {[...item?.helmet, ...item?.helmet, ...item?.helmet]?.map((helmetData, index) => (
                                                <SwiperSlide onClick={() => {
                                                    setHelmetActive(true)
                                                    setActiveData(helmetData)
                                                    setSelectedSize(helmetData?.variant?.length > 0 ? helmetData?.variant[0] : null)
                                                }}
                                                    key={index}
                                                    className="flex justify-center rounded-lg  border border-neutral-600 bg-gradient-to-b from-[#4e4e4e] via-[#222222] to-[#080808] max-w-[20rem] shadow-lg"
                                                >
                                                    <h3 className="p-2 font-semibold text-center text-white uppercase rounded-none text-md size-neu">{helmetData?.title}</h3>
                                                    <div className="relative mx-auto overflow-hidden w-[18rem] h-[16rem] flex items-center justify-center">
                                                        <img
                                                            src={helmetData.helmetImg.url}
                                                            alt={item?.title}
                                                            className="left-0 "
                                                        />


                                                    </div>
                                                    <div className="bottom-0 left-0 w-full p-4 text-white ">

                                                        <div className='flex items-center gap-2 tracking-wide'>
                                                            SIZE
                                                            {helmetData?.variant?.map((size, ind) => {
                                                                return <div key={ind} className="rounded-[7px] text-white flex items-center justify-center font-bold bg-[#363636] size-neu size-[2.5rem]"
                                                                >
                                                                    {size?.size}
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                    </div>
                                </div>
                            })}
                        </div>}
                </div>}
        </HomeLayout>
    )
}

export default AllAccessories
