import React, { useState } from 'react'
import { useGetAllBikeModelsQuery } from '../../../Redux/API/BikeAPI'
import { useGetAllScootyModelsQuery } from '../../../Redux/API/ScootyApi'
import { useUpdateAccessoriesMutation } from '../../../Redux/API/AccessoriesApi'
import { Label } from '../../ui/label'
import Loaders from '../../Loaders'
import { Input } from '../../ui/input'
import { SelectNative } from '../../ui/select-native'
import { Textarea } from '../../ui/textarea'
import { FaCamera } from 'react-icons/fa'
import { HiXMark } from 'react-icons/hi2'
import { FaXmark } from 'react-icons/fa6'
import { AccessoriesData, Model } from '../../../interfaces/interface'



interface AccessoriesFormProps {
    _id: Model["_id"] | undefined,
    accessoriesType: string,
    model: string,
    title: string,
    previewImg: string | null,
    price: number | 0,
    description: string
}

interface ResponseData {
    success: boolean
}


const EditAccessories = ({ data, onClose }: { data: AccessoriesData, onClose: (boolean: boolean) => void }) => {
    const [accessories, setAccessories] = useState<AccessoriesFormProps>({
        _id: data?._id,
        title: data?.title ?? "",
        price: data?.price ?? 0,
        description: data?.description ?? "",
        previewImg: data?.image?.url ?? null,
        accessoriesType: data?.accessoriesType ?? "",
        model: data?.model?._id ?? ""
    })

    console.log(data)
    const { data: bikeModel } = useGetAllBikeModelsQuery({})
    const { data: scootyModel } = useGetAllScootyModelsQuery({})
    const [updateAccessories, { isLoading }] = useUpdateAccessoriesMutation()

    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file)
        if (file) {
            setAccessories({ ...accessories, previewImg: URL.createObjectURL(file) });
            setFile(file);
        }
    }

    const handleRemoveImage = () => {
        setAccessories({ ...accessories, previewImg: null });
        setFile(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAccessories(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { accessoriesType, model, title, price, description, _id } = accessories

        const formData = new FormData();
        formData.append("accessoriesType", accessoriesType)
        formData.append("model", model)
        formData.append("title", title)
        formData.append("price", price.toString())
        formData.append("description", description)
        formData.append("image", file as File)

        const res = await updateAccessories({ formData, id: _id as string }) as { data: ResponseData }
        if (res?.data?.success) {
            onClose(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-[94vw] sm:w-[96vw]  p-4 sm:p-6  pt-2 sm:pt-2 sm:max-w-[50rem] max-w-[28rem] mx-auto  space-y-4 overflow-hidden rounded-t shadow-lg bg-[#fffefe] rounded-md">
            {isLoading && <Loaders isLoading={isLoading} />}
            <div className="absolute top-0 right-0 p-2 text-lg text-white bg-red-600 cursor-pointer">
                <FaXmark onClick={() => onClose(false)} />
            </div>
            <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Edit {data?.model?.bike ? "Bike" : "Scooty"} Accessories</h1>

            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor="title" className=" text-[0.85rem]">
                        Accessory name <span className="text-red-600">*</span>
                    </Label>
                    <Input name="title" onChange={handleChange} value={accessories?.title} id="title" placeholder="Enter accessory title..." type="text" required className="py-[0.65rem] " />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="price" className=" text-[0.85rem]">Enter price <span className="text-red-600">*</span></Label>
                    <div className="relative flex border rounded-md border-neutral-200">
                        <span className="z-10 inline-flex items-center px-3 text-sm font-semibold tracking-wider rounded rounded-r-none bg-neutral-900 text-neutral-200">
                            Rs.
                        </span>
                        <Input
                            id="price"
                            className="py-[0.65rem] bg-mainBg border-none rounded-l-md "
                            placeholder="Enter price..."
                            type="number"
                            onChange={handleChange}
                            value={accessories?.price}
                            name="price"
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor={"model"}>Select {data?.model?.bike ? "Bike" : "Scooty"} model</Label>
                <SelectNative onChange={handleChange} name="model" id={"model"} defaultValue={accessories?.model}>
                    <option value="" disabled>
                        Please select a value
                    </option>
                    {data?.model?.bike ? bikeModel?.data?.map((model: Model) => (
                        <option key={model?._id} value={model?._id}>{model?.bikeModel}</option>
                    )) : scootyModel?.scooty?.map((model: Model) => (
                        <option key={model?._id} value={model?._id}>{model?.scootyModel}</option>
                    ))}
                </SelectNative>
            </div>

            <div className='space-y-1'>
                <Label
                    htmlFor="description"
                    className="block text-sm font-medium "
                >
                    Bike description <span className="text-red-600">*</span>
                </Label>
                <Textarea id="description" name="description" onChange={handleChange} value={accessories?.description} className="[resize:none] py-[0.65rem] " placeholder="Enter description..." />

            </div>

            {/* <div className="space-y-4"> */}
            <div className="flex flex-wrap items-center justify-start gap-4">
                <div >
                    <label

                        className="block text-sm font-medium text-gray-700"
                    >
                        Image
                    </label>
                    <div className="relative flex items-center mt-1 size-20 group">
                        {accessories?.previewImg ? (
                            <img
                                src={accessories?.previewImg}
                                alt={``}
                                className="object-cover border rounded size-20"
                            />
                        ) : (
                            <div className="flex items-center justify-center text-gray-500 border rounded size-20">
                                <div className="absolute inset-0 left-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded bg-opacity-80">
                                    <label
                                        htmlFor={`image`}
                                        className="text-white cursor-pointer"
                                    >
                                        <FaCamera />
                                    </label>
                                </div>
                            </div>
                        )}
                        <div
                            onClick={() => document.getElementById(`image`)?.click()}
                            className="absolute inset-0 left-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded opacity-0 group-hover:bg-opacity-50">
                            <FaCamera />
                        </div>
                        {accessories?.previewImg && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700"
                            >
                                <HiXMark className="text-[0.8rem]" />
                            </button>
                        )}
                        <input
                            type="file"
                            accept="image/.png, image/.jpg, image/.jpeg, image/.webp, image/.avif"
                            id={`image`}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            <button className="relative mb-4 w-full px-8 py-2.5 text-sm text-white transition duration-200 bg-red-600 rounded-md top-2">
                <div className="absolute inset-x-0 w-1/3 h-px mx-auto shadow-2xl -top-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20 font-semibold">
                    Edit accessories
                </span>
            </button>



        </form >
    )
}

export default EditAccessories
