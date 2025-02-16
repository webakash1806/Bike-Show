import { Fragment, useState } from 'react'
import { HomeLayout } from '../Layout/HomeLayout'
import { useDeleteBikeMutation, useGetAllBikesQuery } from '../Redux/API/BikeAPI'
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import EditBike from '../components/Bike/EditBike';
import { FaXmark } from 'react-icons/fa6';
import BikePreview from './BikePreview';
import { Input } from '../components/ui/input';
import { LoaderCircle, Search } from 'lucide-react';
import useDebounce from '../Hooks/useDebounce';
import PaginationComponent from '../components/Pagination';
import { Skeleton } from '../components/ui/skeleton';
import { BikeData, Colors, ResponseData } from '../interfaces/interface';

interface DataResponse {
    bikes: BikeData[],
    totalPage: number
}

const AllBike = () => {
    const [editData, setEditData] = useState<BikeData>()
    const [searchInput, setSearchInput] = useState<string>("")

    const debounceQuery = useDebounce(searchInput, 700)
    const [page, setPage] = useState<number>(1)

    const { data, isFetching } = useGetAllBikesQuery({ search: debounceQuery, page }) as unknown as { data: DataResponse, isFetching: boolean }
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [previewActive, setPreviewActive] = useState(false)
    const [deleteBikeId, setDeleteBikeId] = useState('')
    const [deleteBike, { isLoading }] = useDeleteBikeMutation()

    console.log(data)

    const handleEditActive = () => {
        setEditActive(!editActive)
    }

    const handlePreviewActive = () => {
        setPreviewActive(!previewActive)
    }

    const handleDelete = async (id: BikeData["_id"]) => {
        console.log(id)
        const res = await deleteBike({ id }) as { data: ResponseData };
        console.log(res)
        if (res?.data?.success) setDeleteModalActive(false)
    }

    const deleteModal = (id: BikeData["_id"]) => {
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
                            {isLoading ? <span className="border-2 border-t-2 border-white rounded-full border-t-gray-600 size-5 animate-spin"></span> :
                                <><FaTrashAlt />
                                    Delete</>}
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    const ProductItem = ({ item }: { item: BikeData, index: number }) => {
        console.log(item)
        interface imageProps {
            url: string,
            publicId: string
        }
        const { image, name, price, colors, _id } = item;
        console.log(_id)
        const [activeImage, setActiveImage] = useState<imageProps>(image)
        return (
            <div className="flex flex-col items-center p-2 mx-auto mb-4 md:flex-row md:p-6">
                {deleteModalActive && deleteModal(deleteBikeId)}
                <div className="flex items-center w-full gap-4 mx-4 mr-4 rounded-xl md:mr-6 lg:mb-0 ">
                    <a href="#!">
                        <img
                            src={activeImage?.url}
                            alt={name}
                            className="h-[5rem] border max-w-[8rem] min-w-[8rem] object-contain mx-auto rounded-xl"
                        />
                    </a>
                    <div>
                        <div className="mb-1 text-base md:text-lg hover:text-blue-600">
                            <a className='text-[0.95rem] font-semibold' href="#!">{name}
                                <br />
                            </a>
                        </div>
                        <p className='text-[0.95rem] font-semibold'>&#8377; {price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>

                    </div>
                </div>

                <div className="flex items-center justify-between w-full my-2">
                    <div className='flex flex-col w-[12rem] items-start gap-1 '>

                        <div className='flex items-center gap-2'>
                            <p>Colors : </p>{colors.length <= 0 ? "None" :
                                <div className='flex gap-1.5'>{colors?.map((color: Colors | null) => <div onClick={() => color?.colorBikeImg && setActiveImage(color.colorBikeImg)} style={{ backgroundColor: color?.colorCode }} className={`bg-[${color?.colorCode}] size-5 rounded-full border-2 border-[#464646] shadow-[0px_0px_0px_1px_##0808080]`} key={color?.colorCode}></div>)}
                                </div>
                            }
                        </div>
                        <p>Features : {" "}
                            <span className='text-sm text-gray-600'>{item?.features?.length <= 0 ? "None" : item?.features?.length}</span>
                        </p>
                    </div>



                    <div className='flex gap-2'>
                        <button onClick={() => {
                            setEditData(item)
                            handlePreviewActive()
                        }} className="inline-flex items-center justify-center w-10 h-10 text-blue-600 bg-gray-200 rounded-full "><FaEye /></button>
                        <button onClick={() => {
                            setEditData(item)
                            handleEditActive()
                        }} className="inline-flex items-center justify-center w-10 h-10 text-orange-500 bg-gray-200 rounded-full ">
                            <FaEdit />
                        </button>
                        <button onClick={() => {
                            setDeleteModalActive(true)
                            setDeleteBikeId(item?._id)
                        }} className="inline-flex items-center justify-center w-10 h-10 text-red-600 bg-gray-200 rounded-full ">
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
            </div>
        );
    };



    return (
        <HomeLayout>
            {previewActive ? <BikePreview onClose={handlePreviewActive} item={editData} /> :
                editActive ? <div className="relative z-10 h-full light text-zinc-900">
                    <EditBike onClose={handleEditActive} item={editData} />
                </div> :
                    <section className="relative z-10 overflow-hidden ezy__epcart2 light py-14 md:py-24 text-zinc-900">
                        <div className="container px-4 mx-auto ">
                            <div className="flex flex-col mx-auto lg:w-[80%] w-full">
                                {/* products  */}

                                <header className="flex items-center justify-between w-full p-3 rounded-t-lg shadow-md bg-neutral-800">

                                    <div className="relative w-full max-w-[20rem]">
                                        <Input
                                            className="peer pe-9 w-full bg-[#ebebeb] text-black border-none ps-9"
                                            placeholder="Search..."
                                            type="text"
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                        />
                                        <div className="absolute inset-y-0 flex items-center justify-center text-black pointer-events-none start-0 ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                            {isLoading ? (
                                                <LoaderCircle
                                                    className=" animate-spin"
                                                    size={16}
                                                    strokeWidth={2}
                                                    role="status"
                                                    aria-label="Loading..."
                                                />
                                            ) : (
                                                <Search size={16} strokeWidth={2} aria-hidden="true" />
                                            )}
                                        </div>
                                        {searchInput && <div onClick={() => setSearchInput('')}
                                            className="absolute inset-y-0 flex items-center justify-center h-full text-red-400 transition-colors end-0 w-9 rounded-e-lg text-muted-foreground/80 outline-offset-2 hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <FaXmark size={16} strokeWidth={2} aria-hidden="true" />
                                        </div>}
                                    </div>

                                </header>
                                <div className="w-full mx-auto bg-gray-50 ">
                                    {

                                        isFetching ?
                                            <div className="flex flex-col bg-gray-100 h-fit">
                                                <div className="w-full pb-2 text-gray-700">
                                                    {[...Array(5)].map((_, index) => (
                                                        <div key={index} className="flex flex-col items-center p-2 mx-auto mb-4 border-b border-gray-200 md:flex-row md:p-6 bg-gray-50 animate-pulse">
                                                            <div className="flex items-center w-full gap-4 mx-4 mr-4 rounded-xl md:mr-6 lg:mb-0">
                                                                <Skeleton className="h-[5rem] max-w-[8rem] min-w-[8rem] object-contain rounded-xl" />
                                                                <div>
                                                                    <Skeleton className="w-32 h-5 mb-1" />
                                                                    <Skeleton className="w-24 h-5" />
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between w-full my-2">
                                                                <div className='flex flex-col w-[12rem] items-start gap-1'>
                                                                    <div className='flex items-center gap-2'>
                                                                        <Skeleton className="w-16 h-5" />
                                                                        <div className='flex gap-1.5'>
                                                                            {[...Array(3)].map((_, i) => (
                                                                                <Skeleton key={i} className="border-2 rounded-full size-5" />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <Skeleton className="w-24 h-5" />
                                                                </div>

                                                                <div className='flex gap-2'>
                                                                    <Skeleton className="w-10 h-10 rounded-full" />
                                                                    <Skeleton className="w-10 h-10 rounded-full" />
                                                                    <Skeleton className="w-10 h-10 rounded-full" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div> :
                                            (data?.bikes && data?.bikes?.length <= 0 ? <div className="flex flex-col items-center justify-center w-full gap-2 h-80">
                                                <h1 className='text-2xl font-semibold text-gray-800'>No Bikes Found</h1>
                                            </div> :
                                                (data?.bikes as BikeData[])?.map((item, i) => (
                                                    <Fragment key={i}>
                                                        {!!i && <hr className="my-4 border-[#D6D6D6]" />}
                                                        <ProductItem
                                                            item={item}
                                                            index={i}
                                                            key={i}
                                                        />
                                                    </Fragment>
                                                )))}
                                </div>
                                <div className="w-full p-2 rounded-b-lg shadow-lg shadow-neutral-500 bg-neutral-200">
                                    <PaginationComponent
                                        currentPage={page}
                                        setPage={setPage}
                                        totalPages={data?.totalPage}
                                        paginationItemsToDisplay={10}
                                    />
                                </div>


                            </div>
                        </div>
                    </section>}
        </HomeLayout>
    )
}

export default AllBike
