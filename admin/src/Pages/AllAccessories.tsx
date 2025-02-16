import { useEffect, useState } from 'react'
import { useDeleteAccessoriesMutation, useGetAllAccessoriesQuery } from '../Redux/API/AccessoriesApi'
import { HomeLayout } from '../Layout/HomeLayout'
import { useGetAllHelmetQuery } from '../Redux/API/HelmetApi'
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import previewBg from "../assets/previewBg2.jpg"
import { FaXmark } from 'react-icons/fa6';
import EditAccessories from '../components/Forms/Accessories/EditAccessories';
import EditHelmet from '../components/Forms/Accessories/EditHelmet';
import { AccessoriesData, Helmet, ResponseData } from '../interfaces/interface';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface HelmetActive {
    uniqueId: string,
    title: string,
    colorName: string,
    helmetImg: {
        url: string,
        publicId: string
    },
    variant: Array<{
        size: string,
        price: number | 0
    }>
}

const AllAccessories = () => {
    const [getDataKey, setDataKey] = useState<string>("bike")
    const [helmetActive, setHelmetActive] = useState(false)
    const { data, refetch } = useGetAllAccessoriesQuery({ data: getDataKey }) as { data: { bikeAccessories: AccessoriesData[], scootyAccessories: AccessoriesData[] }, refetch: () => void }
    const [deleteAccessories, { isLoading: deleting }] = useDeleteAccessoriesMutation()
    const { data: helmet } = useGetAllHelmetQuery({}) as { data: { helmets: Helmet[] } }
    const [activeData, setActiveData] = useState<HelmetActive>()
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [deleteId, setDeleteId] = useState<string>('')
    const [editModalActive, setEditModalActive] = useState(false)
    const [activeTab, setActiveTab] = useState<number>(1)
    const [selectedSize, setSelectedSize] = useState<HelmetActive["variant"][number] | null>(null)
    const [editId, setEditId] = useState<string>('')
    const [editData, setEditData] = useState<AccessoriesData>()

    console.log(data?.scootyAccessories)
    const tabArray = ["Bike Accessories", "Scooty Accessories", "Helmets"]

    useEffect(() => {
        setDataKey(activeTab === 1 ? "bike" : "scooty")
        if (activeTab === 1 || activeTab === 2) {
            refetch()
        }
        setDeleteId('')
    }, [activeTab])


    const handleDelete = async (id: string) => {
        console.log(id)
        const res = await deleteAccessories({ id }) as { data: ResponseData }
        if (res?.data?.success) setDeleteModalActive(false)
    }

    const deleteModal = (id: string) => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000027] backdrop-blur-[2px] ">
                <div className="p-6 rounded-lg bg-gray-50 w-96">
                    <h2 className="text-lg font-semibold">Delete Bike</h2>
                    <p className="mt-2 text-gray-600">Are you sure you want to delete this bike?</p>
                    <div className="flex justify-end mt-4 space-x-3">
                        <button
                            onClick={() => setDeleteModalActive(false)}
                            className="px-4 py-1.5 border text-gray-700 bg-gray-300 rounded hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(id)}
                            className="px-4 flex items-center gap-2 py-1.5 text-white bg-red-600 rounded hover:bg-red-700"
                        >
                            {deleting ? <span className="border-2 border-t-2 border-white rounded-full border-t-gray-600 size-5 animate-spin"></span> :
                                <><FaTrashAlt />
                                    Delete</>}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <HomeLayout>
            {helmetActive ?
                <div className='inset-0 flex items-center justify-center min-h-screen bg-black '>
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
                <div className='py-10'>
                    <div className="relative flex">
                        <div className="relative flex p-0 mx-auto bg-transparent w-fit">
                            {tabArray.map((tab, index) => (
                                <div key={index} onClick={() => setActiveTab(index + 1)}
                                    className={` rounded-b-none border-x border-t border-border bg-neutral-800 py-2  text-gray-100  flex items-center justify-center  rounded-md px-2.5  text-[0.85rem] font-semibold outline-offset-2 transition-all hover:bg-black cursor-pointer ${activeTab === index + 1 ? "bg-red-700" : ""}`}
                                >

                                    {tab}
                                </div>
                            ))}

                        </div>

                    </div>
                    {activeTab === 1 &&
                        <div className='flex flex-wrap items-center justify-center gap-6 p-6 bg-white w-[97vw] lg:w-[90vw] rounded-lg mx-auto'>
                            {data?.bikeAccessories?.map((item: any, index: number) => {
                                return <div key={index}>
                                    {editModalActive && <div>
                                        <div className='fixed top-0 flex items-center justify-center left-0 inset-0 bg-black/40 backdrop-blur-sm z-[1000]'>
                                        </div>
                                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001]'>
                                            {editData && <EditAccessories data={editData} onClose={setEditModalActive} />}
                                        </div>
                                    </div>}
                                    <div className='flex shadow shadow-red-300  w-[19rem] rounded-xl rounded-b-md flex-col items-center justify-center gap-2 bg-[#1f1f1f] relative group'>
                                        {deleteModalActive && deleteModal(deleteId)}

                                        <div className='h-[20rem] w-full  flex-col flex items-center relative justify-center overflow-hidden'>
                                            <div onClick={() => { setDeleteModalActive(true); setDeleteId(item._id) }} className='absolute z-20 top-0 right-0 p-2.5 bg-red-600 text-white rounded-bl-md'>
                                                <FaTrashAlt />
                                            </div>


                                            <div className='p-1.5 absolute left-0 top-0 px-4 pr-12 text-white z-[10] mr-auto bg-red-600 w-fit rounded-br-md'>
                                                <span>{item.model?.bike?.name}</span>
                                                <div onClick={() => { setEditData(item); setEditModalActive(true); setEditId(item._id) }} className='absolute z-20 top-0 right-0 p-2.5 bg-yellow-600 text-white rounded-br-md'>
                                                    <FaEdit />
                                                </div>
                                            </div>

                                            <img className='w-[17.5rem]' src={item.model?.bike?.image?.url} />
                                            <div className='h-[20rem] w-full bg-gradient-to-b from-red-700/10 via-red-900/60 rounded-tr-2xl backdrop-blur-sm text-white to-red-800/10 flex absolute duration-500 group-hover:top-0 top-100 group-hover:pt-10 flex-col items-center justify-center'>
                                                <h1 className='text-[1.2rem] font-semibold'>Starting from &#8377; {item?.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</h1>
                                                {/* <p className='text-[0.9rem]'>{item.model?.bike?.name}</p> */}
                                                <p className='pt-2 text-center'>{item.description}</p>
                                            </div>
                                        </div>
                                        <h1 className='w-full p-2 bg-gradient-to-b from-neutral-300 to-neutral-400 text-center font-semibold text-[1.1rem] uppercase' key={index}>{item.title}</h1>
                                    </div>
                                </div>
                            })}
                        </div>}
                    {activeTab === 2 &&
                        <div className='flex flex-wrap items-center justify-center gap-6 p-6 bg-white w-[97vw] lg:w-[90vw] rounded-lg mx-auto'>

                            {data?.scootyAccessories?.map((item: any, index: number) => {
                                return <div key={index}>
                                    {editModalActive && <div>
                                        <div className='fixed top-0 flex items-center justify-center left-0 inset-0 bg-black/40 backdrop-blur-sm z-[1000]'>
                                        </div>
                                        <div className='absolute top-10 left-1/2 -translate-x-1/2  z-[1001]'>
                                            {editData && <EditAccessories data={editData} onClose={setEditModalActive} />}
                                        </div>
                                    </div>}
                                    <div className='flex shadow shadow-red-300  w-[19rem] rounded-xl rounded-b-md flex-col items-center justify-center gap-2 bg-[#1f1f1f] relative group'>

                                        {deleteModalActive && deleteModal(deleteId)}
                                        <div className='h-[20rem] w-full  flex-col flex items-center relative justify-center overflow-hidden'>
                                            <div onClick={() => { setDeleteModalActive(true); setDeleteId(item._id) }}
                                                className='absolute z-20 top-0 right-0 p-2.5 bg-red-600 text-white rounded-bl-md'>
                                                <FaTrashAlt />
                                            </div>

                                            <div className='p-1.5 absolute left-0 top-0 px-4 pr-12 text-white z-[10] mr-auto bg-red-600 w-fit rounded-br-md'>
                                                <span>{item.model?.scooty?.name}</span>
                                                <div onClick={() => { setEditData(item); setEditModalActive(true); setEditId(item._id) }} className='absolute z-20 top-0 right-0 p-2.5 bg-yellow-600 text-white rounded-br-md'>
                                                    <FaEdit />
                                                </div>
                                            </div>
                                            <img className='w-[17.5rem]' src={item.model?.scooty?.image?.url} />
                                            <div className='h-[20rem] w-full bg-gradient-to-b from-red-700/10 via-red-900/60 rounded-tr-2xl backdrop-blur-sm text-white to-red-800/10 flex absolute duration-500 group-hover:top-0 top-100 group-hover:pt-10 flex-col items-center justify-center'>
                                                <h1 className='text-[1.2rem] font-semibold'>Starting from &#8377; {item?.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</h1>
                                                {/* <p className='text-[0.9rem]'>{item.model?.bike?.name}</p> */}
                                                <p className='pt-2 text-center'>{item.description}</p>
                                            </div>
                                        </div>
                                        <h1 className='w-full p-2 bg-gradient-to-b from-neutral-300 to-neutral-400 text-center font-semibold text-[1.1rem] uppercase' key={index}>{item.title}</h1>
                                    </div>
                                </div>
                            })}
                        </div>
                    }
                    {activeTab === 3 &&
                        <div className='flex flex-wrap items-center justify-center gap-6 p-6 bg-white w-[97vw] lg:w-[90vw] rounded-lg mx-auto'>

                            {helmet?.helmets?.map((item: any) => {
                                return <>
                                    {editModalActive && <div>
                                        <div className='fixed top-0 flex items-center justify-center left-0 inset-0 bg-black/40 backdrop-blur-sm z-[1000]'>
                                        </div>
                                        <div className='absolute top-10 left-1/2 -translate-x-1/2  z-[1001]'>
                                            {item?._id === editId && <EditHelmet data={item} onClose={setEditModalActive} />}
                                        </div>
                                    </div>}

                                    <div

                                        className="relative flex flex-col items-center justify-center w-full p-4 overflow-hidden bg-black border border-gray-400 rounded-lg shadow-md md:flex-row md:p-8">
                                        <div onClick={() => { setEditModalActive(true); setEditId(item._id) }} className='absolute z-20 top-0 right-0 p-2.5 bg-yellow-600 text-white rounded-bl-md'>
                                            <FaEdit />
                                        </div>
                                        <img className='absolute object-cover w-full h-full' src={previewBg} alt="" />
                                        <div className='absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/10 to-black/60'>

                                        </div>
                                        {/* Left Content */}
                                        <div className="relative z-10 w-full p-4 md:w-[35%]">
                                            <h2 className="text-xl font-bold text-gray-800">{item?.title}</h2>
                                            <p className="mt-2 text-gray-600">{item?.description}</p>
                                        </div>

                                        <div className="w-full mt-6 md:w-[65%] md:mt-0">

                                            <Swiper
                                                effect={"coverflow"}
                                                grabCursor={true}
                                                centeredSlides={true}
                                                slidesPerView={"auto"}
                                                coverflowEffect={{
                                                    rotate: 20,
                                                    stretch: 30,
                                                    depth: 120,
                                                    modifier: 2,
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
                                                        className="flex justify-center rounded-lg  border bg-gradient-to-b from-[#4e4e4e] via-[#222222] to-[#080808] max-w-[20rem] shadow-lg"
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
                                                                {helmetData?.variant?.map((size: { size: string }) => {
                                                                    return <div className="rounded-[7px] text-white flex items-center justify-center font-bold bg-[#363636] size-neu size-[2.5rem]"
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
                                </>
                            })}
                        </div>}
                </div>}
        </HomeLayout>
    )
}

export default AllAccessories
