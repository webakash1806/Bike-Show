import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Tabs } from "../components/ui/tabs";
import { Calendar, ListFilter, LoaderCircle, Search } from "lucide-react";
import { HomeLayout } from '../Layout/HomeLayout'
import { useEffect, useId, useState } from "react";
import { Input } from "../components/ui/input";
import { FaXmark } from "react-icons/fa6";
import { Skeleton } from "../components/ui/skeleton"

import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useGetAllContactFormQuery, useGetAllTestDriveQuery, useGetProductEnquiryQuery, useUpdateContactMutation, useUpdateProductEnquiryMutation, useUpdateTestDriveMutation } from "../Redux/API/FormApi";
import { FaList } from "react-icons/fa";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import ProductEnquiryMessage from "../components/ProductEnquiryMessage";
import TestDriveMessage from "../components/TestDriveMessage";
import ContactMessage from "../components/ContactMessage";
import { socket } from "../Helper/axiosInstance";
import useDebounce from "../Hooks/useDebounce";
import PaginationComponent from "../components/Pagination";
import { Form } from "../interfaces/interface";

interface ProductEnquiryResponse {
    productEnquiry: Form[],
    totalPage: number
}

interface TestDriveResponse {
    testDrive: Form[],
    totalPage: number
}

interface ContactResponse {
    contactForm: Form[],
    totalPage: number
}

const AllForms = () => {

    const id = useId();
    const [activeTab, setActiveTab] = useState<number>(1)
    const [searchInput, setSearchInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const userId = useSelector((state: any) => state?.auth?.user?._id)

    const [formId, setFormId] = useState<string>("")
    const [singleActive, setSingleActive] = useState<number | null>(null)

    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    const [productData, setProductData] = useState<ProductEnquiryResponse["productEnquiry"]>([])
    const [testData, setTestData] = useState<TestDriveResponse["testDrive"]>([])
    const [contactData, setContactData] = useState<ContactResponse["contactForm"]>([])
    const [status, setStatus] = useState<string>("")

    const debounceValue = useDebounce(searchInput, 500);
    const [updateProductEnquiry] = useUpdateProductEnquiryMutation()
    const [updateTestDrive] = useUpdateTestDriveMutation()
    const [updateContact] = useUpdateContactMutation()
    const { data: productEnquiry, isFetching: productEnquiryLoading, refetch: enquiryRefetch } = useGetProductEnquiryQuery({ search: debounceValue, page: page, status: status }, { skip: activeTab !== 1 })
    const { data: testDrive, isFetching: testDriveLoading, refetch: testDriveRefetch } = useGetAllTestDriveQuery({ search: debounceValue, page: page, status: status }, { skip: activeTab !== 2 })
    const { data: contactForm, isFetching: contactFormLoading, refetch: contactFormRefetch } = useGetAllContactFormQuery({ search: debounceValue, page: page, status: status }, { skip: activeTab !== 3 })

    console.log(productData)

    useEffect(() => {
        socket.on("productEnquiryChange", (data) => {
            setProductData((prevData: ProductEnquiryResponse["productEnquiry"]) => [data?.fullDocument, ...(prevData ?? [])])
        })

        socket.on("testDriveChange", (data) => {
            setTestData((prevData: any) => [data?.fullDocument, ...prevData])
        })
        socket.on("contactChange", (data) => {
            console.log("hello 1")

            setContactData((prevData: any) => [data?.fullDocument, ...prevData])
        })
    }, [])



    const handleStatusChange = async (id: string, userId: string, status: string) => {
        try {
            if (activeTab === 1) {
                await updateProductEnquiry({ id, status, userId });
            }
            else if (activeTab === 2) {
                await updateTestDrive({ id, status, userId });
            }
            else {
                await updateContact({ id, status, userId });
            }
            toast.success('Status updated!');
        } catch (error) {
            toast.error('Failed to update status');
        }
    }

    const handleRefetch = async () => {
        if (activeTab === 1) {
            const res = await enquiryRefetch() as { data: ProductEnquiryResponse }
            setProductData(res?.data?.productEnquiry)
            setTotalPages(res?.data?.totalPage)
        }
        else if (activeTab === 2) {
            const res = await testDriveRefetch() as { data: TestDriveResponse }
            setTestData(res?.data?.testDrive)
            setTotalPages(res?.data?.totalPage)
        }
        else if (activeTab === 3) {
            const res = await contactFormRefetch() as { data: ContactResponse }
            setContactData(res?.data?.contactForm)
            setTotalPages(res?.data?.totalPage)
        }
    }

    useEffect(() => {
        handleRefetch()
    }, [activeTab, productEnquiry, testDrive, contactForm])

    useEffect(() => {
        setSearchInput("")
        setStatus("")
        setPage(1)
    }, [activeTab])

    useEffect(() => {
        if (searchInput) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500)
            return () => clearTimeout(timer)
        }
        setIsLoading(false);
    }, [searchInput]);


    const tabList = ["Product Enquiry", "Test Drive", "Contact",]

    return (
        <HomeLayout>
            {singleActive ?
                <>
                    {singleActive === 1 && <ProductEnquiryMessage setSingleActive={setSingleActive} id={formId} />}
                    {singleActive === 2 && <TestDriveMessage setSingleActive={setSingleActive} id={formId} />}
                    {singleActive === 3 && <ContactMessage setSingleActive={setSingleActive} id={formId} />}
                </>
                :
                <Tabs defaultValue="tab-1" className="">

                    <div className="flex flex-1">
                        <main className="flex-1 px-1 pb-10">
                            <div className="w-full max-w-5xl mx-auto mt-4 overflow-hidden bg-white border rounded-lg shadow-md h-fit border-neutral-300">
                                <ScrollArea className="">
                                    <div className="flex items-center w-full h-auto gap-2 px-0 mx-auto bg-white border-b rounded-none border-border text-foreground">
                                        {tabList.map((tab, index) => (
                                            <div key={index}
                                                onClick={() => setActiveTab(index + 1)}
                                                className={`inline-flex py-3 cursor-pointer items-center justify-center whitespace-nowrap  px-3 text-sm font-medium outline-offset-2 transition-all hover:text-gray-500  focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm data-[state=active]:shadow-black/5 border-b-4  dark:hover:text-gray-400 dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-gray-50 ${activeTab === index + 1 ? "border-sky-600 border-b-4  text-black bg-sky-100 shadow-sm shadow-black/5" : "border-white"}`}
                                            >
                                                <FaList
                                                    className="-ms-0.5 me-1.5 opacity-60"
                                                    size={16}
                                                    strokeWidth={2}
                                                    aria-hidden="true"
                                                />
                                                {tab}
                                            </div>
                                        ))}



                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                                <header className="flex items-center justify-between max-w-5xl p-3 shadow-md bg-neutral-800">

                                    <div className="relative w-full max-w-[20rem]">
                                        <Input
                                            id={id}
                                            className="peer pe-9 w-full bg-[#ebebeb] text-black border-none ps-9"
                                            placeholder="Search..."
                                            type="search"
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
                                    <div className="flex flex-col gap-4">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" size="icon" aria-label="Filters">
                                                    <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-3 w-36">
                                                <div className="space-y-3">
                                                    <div className="text-xs font-medium text-muted-foreground">Filters</div>
                                                    <form className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                id={`1`}
                                                                name="status"
                                                                value={""}
                                                                defaultChecked={status === ""}
                                                                onChange={() => {
                                                                    setStatus("")
                                                                    setPage(1)
                                                                }}
                                                            />
                                                            <Label htmlFor={`1`} className="font-normal">
                                                                All
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                id={`1`}
                                                                name="status"
                                                                value={"Pending"}
                                                                defaultChecked={status === "Pending"}
                                                                onChange={() => {
                                                                    setStatus("Pending")
                                                                    setPage(1)
                                                                }}
                                                            />
                                                            <Label htmlFor={`1`} className="font-normal">
                                                                Pending
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                id={`2`}
                                                                name="status"
                                                                value={"Active"}
                                                                defaultChecked={status === "Active"}
                                                                onChange={() => {
                                                                    setStatus("Active")
                                                                    setPage(1)
                                                                }}
                                                            />
                                                            <Label htmlFor={`2`} className="font-normal">
                                                                Active
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                id={`3`}
                                                                name="status"
                                                                value={"Resolved"}
                                                                defaultChecked={status === "Resolved"}
                                                                onChange={() => {
                                                                    setStatus("Resolved")
                                                                    setPage(1)
                                                                }}
                                                            />
                                                            <Label htmlFor={`3`} className="font-normal">
                                                                Resolved
                                                            </Label>
                                                        </div>

                                                        <div
                                                            role="separator"
                                                            aria-orientation="horizontal"
                                                            className="h-px my-1 -mx-3 bg-border"
                                                        ></div>

                                                    </form>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </header>

                                {
                                    activeTab === 1 &&
                                    (productEnquiryLoading ? <div className="flex flex-col bg-gray-100 h-fit">
                                        <div className="w-full pb-2 text-gray-800">
                                            {[...Array(10)].map((_, index) => (
                                                <div key={index} className="flex flex-wrap items-center justify-between px-2 md:pt-2 pb-1.5 border-b border-gray-200 md:gap-4 bg-gray-50 animate-pulse">
                                                    <div className="flex items-center justify-between w-full gap-4 border-none md:w-1/2">
                                                        <Skeleton className="w-40 h-5" />
                                                        <Skeleton className="w-24 h-5" />
                                                    </div>
                                                    <div className="flex items-center justify-between w-full gap-4 md:w-[40%]">
                                                        <Skeleton className="w-20 h-6 rounded-full" />
                                                        <Skeleton className="w-16 h-6 rounded-full" />
                                                        <Skeleton className="w-24 h-5" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div> :
                                        productData?.length === 0 ? <div className="flex flex-col min-h-[10rem] bg-gray-100 ">
                                            <div className="flex items-center justify-center w-full pt-10 pb-2 text-gray-700">
                                                No Data Found
                                            </div>
                                        </div> :
                                            <div className="flex flex-col bg-gray-100 h-fit">

                                                <div className="w-full pb-2 text-gray-700">
                                                    {
                                                        productData?.map((item: any) => (
                                                            <div onClick={() => {
                                                                setSingleActive(1)
                                                                setFormId(item?._id)
                                                            }} key={item._id} className={`flex cursor-pointer flex-wrap items-center justify-between px-2 md:pt-2 pb-1.5 border-b border-gray-200 md:gap-4 hover:bg-transparent text-black  ${item.status === "Pending"
                                                                ? "bg-orange-50 "
                                                                : item.status === "Active"
                                                                    ? "bg-yellow-50 "
                                                                    : "bg-emerald-50 "
                                                                }`} >

                                                                <div className="flex items-center justify-between w-full gap-4 border-none md:w-1/2">
                                                                    <div className="font-semibold border-none ">
                                                                        {item?.name}
                                                                    </div>

                                                                    <div className="py-1 text-center border-none text-neutral-600">
                                                                        {item?.model?.name}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between w-full gap-4 md:w-[40%]">
                                                                    <div className="flex items-center w-[5rem] justify-center py-0 font-semibold border-none">
                                                                        <span className="px-3 py-0.5 text-sm w-fit mr-auto text-purple-700 bg-purple-100 rounded-full whitespace-nowrap">
                                                                            {item?.category}
                                                                        </span>
                                                                    </div>
                                                                    <div onClick={(e) => e.stopPropagation()} className="py-0 border-none min-w-[5rem] font-semibold text-center ">
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button size="icon" className="w-[4rem] py-0.5 h-6 mr-right" aria-label="Filters">
                                                                                    <span
                                                                                        className={`inline-flex font-semibold items-center w-full text-sm justify-center rounded px-3 py-0.5 ${item.status === "Pending"
                                                                                            ? "bg-orange-100 text-orange-800"
                                                                                            : item.status === "Active"
                                                                                                ? "bg-yellow-100 text-yellow-800"
                                                                                                : "bg-emerald-100 text-emerald-800"
                                                                                            }`}
                                                                                    >
                                                                                        {item?.status}
                                                                                    </span>
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="p-3 w-36">
                                                                                <div className="space-y-3">
                                                                                    <div className="text-xs font-medium text-muted-foreground">Status</div>
                                                                                    <form className="space-y-3">
                                                                                        {["Pending", "Active", "Resolved"].map((status) => (
                                                                                            <div key={status} className="flex items-center gap-2">
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    id={`${id}-${status.toLowerCase()}`}
                                                                                                    name="status"
                                                                                                    value={status}
                                                                                                    defaultChecked={item?.status === status}
                                                                                                    onChange={() => handleStatusChange(item?._id, userId, status)}
                                                                                                />
                                                                                                <label htmlFor={`${id}-${status.toLowerCase()}`} className="font-normal cursor-pointer">
                                                                                                    {status}
                                                                                                </label>
                                                                                            </div>
                                                                                        ))}
                                                                                    </form>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </div>
                                                                    <div className="py-0 text-end">
                                                                        <span
                                                                            className="inline-flex font-semibold items-center text-[0.7rem] justify-center rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800"
                                                                        >
                                                                            <Calendar size={13} className="mr-1" strokeWidth={2} aria-hidden="true" />
                                                                            {new Date(item?.createdAt).toDateString() !== new Date().toDateString() ? (
                                                                                new Intl.DateTimeFormat("en-GB", {
                                                                                    year: "2-digit",
                                                                                    month: "2-digit",
                                                                                    day: "2-digit",
                                                                                }).format(new Date(item?.createdAt))
                                                                            ) : (
                                                                                new Intl.DateTimeFormat("en-US", {
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    hour12: true,
                                                                                }).format(new Date(item?.createdAt))
                                                                            )
                                                                            }
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))
                                                    }
                                                </div>

                                            </div >)
                                }
                                {
                                    activeTab === 2 &&
                                    (testDriveLoading ? <div className="flex flex-col bg-gray-100 h-fit">
                                        <div className="w-full pb-2 text-gray-700">
                                            {[...Array(10)].map((_, index) => (
                                                <div key={index} className="flex flex-wrap items-center justify-between px-2 md:pt-2 pb-1.5 border-b border-gray-200 md:gap-4 bg-gray-50 animate-pulse">
                                                    <div className="flex items-center justify-between w-full gap-4 border-none md:w-1/2">
                                                        <Skeleton className="w-40 h-5" />
                                                        <Skeleton className="w-24 h-5" />
                                                    </div>
                                                    <div className="flex items-center justify-between w-full gap-4 md:w-[40%]">
                                                        <Skeleton className="w-20 h-6 rounded-full" />
                                                        <Skeleton className="w-16 h-6 rounded-full" />
                                                        <Skeleton className="w-24 h-5" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div> :
                                        testData?.length === 0 ? <div className="flex flex-col min-h-[10rem] bg-gray-100 ">
                                            <div className="flex items-center justify-center w-full pt-10 pb-2 text-gray-700">
                                                No Data Found
                                            </div>
                                        </div> :
                                            <div className="flex flex-col bg-gray-100 h-fit">

                                                <div className="w-full pb-2 text-gray-700">
                                                    {
                                                        testData?.map((item: any) => (
                                                            <div onClick={() => {
                                                                setSingleActive(2)
                                                                setFormId(item?._id)
                                                            }} key={item._id} className={`flex cursor-pointer flex-wrap items-center justify-between px-2 md:pt-2 pb-1.5 border-b border-gray-200 md:gap-4 hover:bg-transparent text-black  ${item.status === "Pending"
                                                                ? "bg-orange-50 "
                                                                : item.status === "Active"
                                                                    ? "bg-yellow-50 "
                                                                    : "bg-emerald-50 "
                                                                }`} >

                                                                <div className="flex items-center justify-between w-full gap-4 border-none md:w-1/2">
                                                                    <div className="font-semibold border-none ">
                                                                        {item?.name}
                                                                    </div>

                                                                    <div className="py-1 text-center border-none text-neutral-600">
                                                                        {item?.model?.name}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between w-full gap-4 md:w-[40%]">
                                                                    <div className="flex items-center justify-center py-0 font-semibold border-none">
                                                                        <span className="px-3 py-0.5 text-sm text-purple-700 bg-purple-100 rounded-full whitespace-nowrap">
                                                                            {item?.category}
                                                                        </span>
                                                                    </div>
                                                                    <div onClick={(e) => e.stopPropagation()} className="py-0 border-none min-w-[5rem] font-semibold text-center ">
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button size="icon" className="w-[4rem] py-0.5 h-6 mr-right" aria-label="Filters">
                                                                                    <span
                                                                                        className={`inline-flex font-semibold items-center w-full text-sm justify-center rounded px-3 py-0.5 ${item.status === "Pending"
                                                                                            ? "bg-orange-100 text-orange-800"
                                                                                            : item.status === "Active"
                                                                                                ? "bg-yellow-100 text-yellow-800"
                                                                                                : "bg-emerald-100 text-emerald-800"
                                                                                            }`}
                                                                                    >
                                                                                        {item?.status}
                                                                                    </span>
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="p-3 w-36">
                                                                                <div className="space-y-3">
                                                                                    <div className="text-xs font-medium text-muted-foreground">Status</div>
                                                                                    <form className="space-y-3">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <input type="radio" id={`${id}-pending`} name="status" value="Pending" defaultChecked={item?.status === "Pending"}
                                                                                                onChange={() => handleStatusChange(item?._id, userId, 'Pending')}
                                                                                            />
                                                                                            <Label htmlFor={`${id}-pending`} className="font-normal">
                                                                                                Pending
                                                                                            </Label>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                            <input type="radio" id={`${id}-active`} name="status" value="Active" defaultChecked={item?.status === "Active"} onChange={() => handleStatusChange(item?._id, userId, 'Active')} />
                                                                                            <Label htmlFor={`${id}-active`} className="font-normal">
                                                                                                Active
                                                                                            </Label>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                            <input type="radio" id={`${id}-resolved`} name="status" value="Resolved" defaultChecked={item?.status === "Resolved"} onChange={() => handleStatusChange(item?._id, userId, 'Resolved')} />
                                                                                            <Label htmlFor={`${id}-resolved`} className="font-normal">
                                                                                                Resolved
                                                                                            </Label>
                                                                                        </div>

                                                                                    </form>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </div>
                                                                    <div className="py-0 text-end">
                                                                        <span
                                                                            className="inline-flex font-semibold items-center text-[0.7rem] justify-center rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800"
                                                                        >
                                                                            <Calendar size={13} className="mr-1" strokeWidth={2} aria-hidden="true" />
                                                                            {new Date(item?.createdAt).toDateString() !== new Date().toDateString() ? (
                                                                                new Intl.DateTimeFormat("en-GB", {
                                                                                    year: "2-digit",
                                                                                    month: "2-digit",
                                                                                    day: "2-digit",
                                                                                }).format(new Date(item?.createdAt))
                                                                            ) : (
                                                                                new Intl.DateTimeFormat("en-US", {
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    hour12: true,
                                                                                }).format(new Date(item?.createdAt))
                                                                            )
                                                                            }
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))
                                                    }
                                                </div>

                                            </div >)
                                }
                                {
                                    activeTab === 3 &&

                                    (contactFormLoading ? <div className="flex flex-col bg-gray-100 h-fit">
                                        <div className="w-full pb-2 text-gray-700">
                                            {[...Array(10)].map((_, index) => (
                                                <div key={index} className="flex flex-wrap items-center justify-between px-2 md:pt-2 pb-1.5 border-b border-gray-200 md:gap-4 bg-gray-50 animate-pulse">
                                                    <div className="flex items-center justify-between w-full gap-4 border-none md:w-1/2">
                                                        <Skeleton className="w-40 h-5" />
                                                        <Skeleton className="w-24 h-5" />
                                                    </div>
                                                    <div className="flex items-center justify-between w-full gap-4 md:w-[40%]">
                                                        <Skeleton className="w-20 h-6 rounded-full" />
                                                        <Skeleton className="w-16 h-6 rounded-full" />
                                                        <Skeleton className="w-24 h-5" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div> :

                                        contactData?.length === 0 ? <div className="flex flex-col min-h-[10rem] bg-gray-100 ">
                                            <div className="flex items-center justify-center w-full pt-10 pb-2 text-gray-700">
                                                No Data Found
                                            </div>
                                        </div> :
                                            <div className="flex flex-col bg-gray-100 h-fit">

                                                <div className="w-full pb-2 text-gray-700">
                                                    {
                                                        contactData?.map((item: any) => (
                                                            <div key={item._id}
                                                                onClick={() => {
                                                                    setSingleActive(3)
                                                                    setFormId(item?._id)
                                                                }}
                                                                className={`flex cursor-pointer flex-wrap items-center justify-between px-2 md:pt-2 pb-1.5 border-b border-gray-200 md:gap-4 hover:bg-transparent text-black  ${item.status === "Pending"
                                                                    ? "bg-orange-50 "
                                                                    : item.status === "Active"
                                                                        ? "bg-yellow-50 "
                                                                        : "bg-emerald-50 "
                                                                    }`} >

                                                                <div className="flex items-center justify-between w-full gap-4 border-none md:w-1/2">
                                                                    <div className="font-semibold border-none ">
                                                                        {item?.name}
                                                                    </div>

                                                                    <div className="py-1 font-semibold text-[0.85rem] text-center border-none text-neutral-600">
                                                                        {item?.phoneNumber}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center justify-between w-full gap-4 md:w-[40%]">
                                                                    {/* <div className="flex items-center justify-center py-0 font-semibold border-none">
                                                        <span className="px-3 py-0.5 text-sm text-purple-700 bg-purple-100 rounded-full whitespace-nowrap">
                                                            {item?.category}
                                                        </span>
                                                    </div> */}
                                                                    <div onClick={(e) => e.stopPropagation()} className="py-0 border-none min-w-[5rem] font-semibold text-center ">
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button size="icon" className="w-[4rem] py-0.5 h-6 mr-right" aria-label="Filters">
                                                                                    <span
                                                                                        className={`inline-flex font-semibold items-center w-full text-sm justify-center rounded px-3 py-0.5 ${item.status === "Pending"
                                                                                            ? "bg-orange-100 text-orange-800"
                                                                                            : item.status === "Active"
                                                                                                ? "bg-yellow-100 text-yellow-800"
                                                                                                : "bg-emerald-100 text-emerald-800"
                                                                                            }`}
                                                                                    >
                                                                                        {item?.status}
                                                                                    </span>
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="p-3 w-36">
                                                                                <div className="space-y-3">
                                                                                    <div className="text-xs font-medium text-muted-foreground">Status</div>
                                                                                    <form className="space-y-3">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <input type="radio" id={`${id}-pending`} name="status" value="Pending" defaultChecked={item?.status === "Pending"}
                                                                                                onChange={() => handleStatusChange(item?._id, userId, 'Pending')}
                                                                                            />
                                                                                            <Label htmlFor={`${id}-pending`} className="font-normal">
                                                                                                Pending
                                                                                            </Label>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                            <input type="radio" id={`${id}-active`} name="status" value="Active" defaultChecked={item?.status === "Active"} onChange={() => handleStatusChange(item?._id, userId, 'Active')} />
                                                                                            <Label htmlFor={`${id}-active`} className="font-normal">
                                                                                                Active
                                                                                            </Label>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                            <input type="radio" id={`${id}-resolved`} name="status" value="Resolved" defaultChecked={item?.status === "Resolved"} onChange={() => handleStatusChange(item?._id, userId, 'Resolved')} />
                                                                                            <Label htmlFor={`${id}-resolved`} className="font-normal">
                                                                                                Resolved
                                                                                            </Label>
                                                                                        </div>

                                                                                    </form>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </div>
                                                                    <div className="py-0 text-end">
                                                                        <span
                                                                            className="inline-flex font-semibold items-center text-[0.7rem] justify-center rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800"
                                                                        >
                                                                            <Calendar size={13} className="mr-1" strokeWidth={2} aria-hidden="true" />
                                                                            {new Date(item?.createdAt).toDateString() !== new Date().toDateString() ? (
                                                                                new Intl.DateTimeFormat("en-GB", {
                                                                                    year: "2-digit",
                                                                                    month: "2-digit",
                                                                                    day: "2-digit",
                                                                                }).format(new Date(item?.createdAt))
                                                                            ) : (
                                                                                new Intl.DateTimeFormat("en-US", {
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    hour12: true,
                                                                                }).format(new Date(item?.createdAt))
                                                                            )
                                                                            }
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))
                                                    }
                                                </div>

                                            </div >)
                                }
                                <div className="p-2">
                                    <PaginationComponent
                                        currentPage={page}
                                        setPage={setPage}
                                        totalPages={totalPages}
                                        paginationItemsToDisplay={10}
                                    />
                                </div>
                            </div>
                        </main>
                    </div>

                </Tabs>}

        </HomeLayout >
    )
}

export default AllForms
