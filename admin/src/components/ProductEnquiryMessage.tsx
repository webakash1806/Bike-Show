import React, { useEffect, useState } from 'react'
import { useGetSingleProductEnquiryQuery, useUpdateProductEnquiryMutation } from '../Redux/API/FormApi'
import { Button } from './ui/button'
import { FaBackward } from 'react-icons/fa'
import BikePreview from '../Pages/BikePreview'
import ScootyPreview from '../Pages/ScootyPreview'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Label } from './ui/label'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Form } from '../interfaces/interface'

interface FormResponse {
    productEnquiry: Form,
    success: boolean
}

const ProductEnquiryMessage = ({ id, setSingleActive }: { id: string, setSingleActive: React.Dispatch<React.SetStateAction<number | null>> }) => {
    console.log(id)
    const userId = useSelector((state: any) => state?.auth?.user?._id)
    const [updateProductEnquiry] = useUpdateProductEnquiryMutation()
    const [previewActive, setPreviewActive] = useState<boolean>(false)
    const { data, refetch } = useGetSingleProductEnquiryQuery(id) as { data?: FormResponse; refetch: () => void };
    useEffect(() => {
        refetch()
    }, [id])


    const handleStatusChange = async (status: string) => {
        try {
            await updateProductEnquiry({ id, status, userId });
            toast.success('Status updated!');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 bg-gray-100">
            <div className="w-full max-w-2xl overflow-hidden bg-white rounded-lg shadow-md">
                <div className='flex items-center justify-between pr-4 font-semibold text-white bg-neutral-900'>
                    <div onClick={() => setSingleActive(null)} className='p-4 bg-red-500 cursor-pointer'>
                        <FaBackward />
                    </div>
                    Product Enquiry
                </div>
                <div className='p-4'>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-purple-500 rounded-full">
                                {data?.productEnquiry?.name?.split("")[0]}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">{data?.productEnquiry?.name}</h2>
                                <p className="text-sm text-gray-600">{data?.productEnquiry?.email}</p>
                            </div>
                        </div>
                        <div>
                            <div onClick={(e) => e.stopPropagation()} className="py-0 border-none min-w-[5rem] font-semibold text-center ">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size="icon" className="w-fit py-0.5 h-6 mr-right" aria-label="Filters">
                                            <div
                                                className={`inline-flex font-semibold items-center w-full text-sm justify-center rounded px-3 py-0.5 ${data?.productEnquiry?.status === "Pending"
                                                    ? "bg-orange-100 text-orange-800"
                                                    : data?.productEnquiry?.status === "Active"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-emerald-100 text-emerald-800"
                                                    }`}
                                            >
                                                <div className={`mr-2 bg-black rounded-full animate-ping size-1 ${data?.productEnquiry?.status === "Pending"
                                                    ? "bg-orange-900 text-orange-800"
                                                    : data?.productEnquiry?.status === "Active"
                                                        ? "bg-yellow-900 text-yellow-800"
                                                        : "bg-emerald-900 text-emerald-800"
                                                    }`}></div>
                                                {data?.productEnquiry?.status}
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-3 w-36">
                                        <div className="space-y-3">
                                            <div className="text-xs font-medium text-muted-foreground">Status</div>
                                            <form className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <input type="radio" id={`${id}-pending`} name="status" value="Pending" defaultChecked={data?.productEnquiry?.status === "Pending"}
                                                        onChange={() => handleStatusChange('Pending')}
                                                    />
                                                    <Label htmlFor={`${id}-pending`} className="font-normal">
                                                        Pending
                                                    </Label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input type="radio" id={`${id}-active`} name="status" value="Active" defaultChecked={data?.productEnquiry?.status === "Active"} onChange={() => handleStatusChange('Active')} />
                                                    <Label htmlFor={`${id}-active`} className="font-normal">
                                                        Active
                                                    </Label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input type="radio" id={`${id}-resolved`} name="status" value="Resolved" defaultChecked={data?.productEnquiry?.status === "Resolved"} onChange={() => handleStatusChange('Resolved')} />
                                                    <Label htmlFor={`${id}-resolved`} className="font-normal">
                                                        Resolved
                                                    </Label>
                                                </div>

                                            </form>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {data?.productEnquiry?.createdAt && <p className="p-1 ml-auto mr-1 text-sm font-semibold text-gray-600 w-fit">
                                {new Date(data?.productEnquiry?.createdAt).toDateString() === new Date().toDateString()
                                    ? new Intl.DateTimeFormat(undefined, {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                    }).format(new Date(data?.productEnquiry?.createdAt))
                                    : new Date(data?.productEnquiry?.createdAt).toDateString() === new Date(Date.now() - 1000 * 60 * 60 * 24).toDateString()
                                        ? "Yesterday"
                                        : new Intl.DateTimeFormat(undefined, {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit",
                                        }).format(new Date(data?.productEnquiry?.createdAt))
                                }
                            </p>}
                        </div>
                    </div>

                    <div className="mb-6 space-y-4 text-gray-800">
                        <table className="min-w-full border border-separate border-gray-200 rounded table-auto border-spacing-0">

                            <tbody>
                                <tr className="">
                                    <td className="px-4 bg-gray-100 py-2 border-r text-sm w-[7rem] font-semibold border-b border-gray-200">Category</td>
                                    <td className="px-4 py-2 text-sm border-b border-gray-200">
                                        <span className="px-3 py-0.5 text-purple-700 bg-purple-100 rounded">
                                            {data?.productEnquiry?.category}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-semibold bg-gray-100 border-b border-r border-gray-200">Phone</td>
                                    <td className="px-4 py-2 text-sm border-b border-gray-200">
                                        <span className=" py-0.5">{data?.productEnquiry?.phoneNumber}</span>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-semibold bg-gray-100 border-b border-r border-gray-200">Dealer</td>
                                    <td className="px-4 py-2 text-sm border-b border-gray-200">
                                        <span className=" py-0.5">{data?.productEnquiry?.dealer}</span>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="px-4 py-2 text-sm font-semibold bg-gray-100 border-b border-r border-gray-200">Message</td>
                                    <td className="px-4 py-2 text-sm border-b border-gray-200">
                                        <span className=" py-0.5">{data?.productEnquiry?.message}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <div className='flex flex-col gap-2 md:flex-row'>
                            <div onClick={() => setPreviewActive(true)} className='flex flex-col justify-between w-full border rounded border-sky-400'>
                                <p className='p-2 text-sm font-semibold'>Model</p>
                                <div className='flex items-center justify-between gap-3 p-1 py-2 rounded bg-sky-100'>
                                    <div className='w-[7rem]'>
                                        <img src={data?.productEnquiry?.model?.image?.url} alt="" />
                                    </div>
                                    <div className='w-full'>
                                        <h2>{data?.productEnquiry?.model?.name}</h2>
                                        <p className='text-sm font-semibold'>&#8377; {data?.productEnquiry?.model?.price}</p>
                                    </div>
                                </div>
                            </div>
                            {data?.productEnquiry?.handledBy && <div className='flex flex-col justify-between w-full border border-purple-400 rounded'>
                                <p className='p-2 text-sm font-semibold'>Handled by :  <span className="px-3 ml-2 py-0.5 text-sm text-green-700 bg-green-100 rounded whitespace-nowrap">
                                    {data?.productEnquiry?.handledBy?.role}
                                </span></p>
                                <div className='flex items-center justify-between px-4 py-2 bg-purple-100 rounded'>
                                    <div className='w-[5rem]'>
                                        {data?.productEnquiry?.handledBy?.avatar?.url ? <img src={data?.productEnquiry?.handledBy?.avatar?.url} alt="" />
                                            : <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-purple-500 rounded-full">
                                                {data?.productEnquiry?.handledBy?.fullName?.split("")[0]}
                                            </div>}
                                    </div>
                                    <div className='w-full'>
                                        <h2>{data?.productEnquiry?.handledBy?.fullName}</h2>
                                        <p className="text-sm font-semibold">{data?.productEnquiry?.handledBy?.email}</p>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end pt-4 text-sm text-gray-600 border-t border-gray-300">
                        <p>© 2025 Bigswing Honda. All rights reserved.</p>
                    </div>
                </div>
            </div>

            <div className='min-w-[95%]'>
                {previewActive && data?.productEnquiry?.category === "Bike" && <BikePreview item={data?.productEnquiry?.model} onClose={setPreviewActive} />}
                {previewActive && data?.productEnquiry?.category === "Scooty" && <ScootyPreview item={data?.productEnquiry?.model} onClose={setPreviewActive} />}
            </div>
        </div>
    )
}

export default ProductEnquiryMessage
