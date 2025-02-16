import React, { useState } from 'react'
import { FaCamera } from "react-icons/fa";
import { HiXMark } from 'react-icons/hi2'
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import Loaders from '../../Loaders';
import { useUpdateScootyMutation } from '../../../Redux/API/ScootyApi';
import { ResponseData } from '../../../interfaces/interface';

interface EditScootyProps {
    name: string;
    price: number;
    description: string;
    previewImage: string | null;
}

const EditScootyForm = ({ scootyData, onTabChange }: { scootyData: any, onTabChange: (tab: number) => void }) => {

    const [updateScooty, { isLoading }] = useUpdateScootyMutation()

    const [scooty, setScooty] = useState<EditScootyProps>({
        name: scootyData?.name || '',
        price: scootyData?.price || 0,
        description: scootyData?.description || '',
        previewImage: scootyData?.image?.url || null
    });

    console.log(scooty)

    const [file, setFile] = useState<File | null>(null)
    console.log(file)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setScooty({ ...scooty, [name]: value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file)
        if (file) {
            setScooty({ ...scooty, previewImage: URL.createObjectURL(file) });
            setFile(file);
        }
    }

    const handleRemoveImage = () => {
        setScooty({ ...scooty, previewImage: null });
        setFile(null);
    }

    const handleScootyForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, price, description } = scooty
        console.log(scooty)

        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price.toString())
        formData.append("description", description)
        formData.append("image", file as File)

        const response = await updateScooty({ formData, id: scootyData?._id }) as { data: ResponseData }

        if (response?.data?.success) {
            onTabChange(2)
        }
        console.log(response)
    }

    return (
        <form onSubmit={handleScootyForm} noValidate className="relative w-full  p-4 sm:p-6  pt-2 sm:pt-2  mx-auto mb-10 space-y-4 overflow-hidden rounded-t shadow-lg bg-[#fffefe] rounded-md">
            {isLoading && <Loaders isLoading={isLoading} />}

            <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Edit scooty</h1>

            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">

                <div className="space-y-1">
                    <Label htmlFor="name" className=" text-[0.85rem]">
                        Scooty name <span className="text-red-600">*</span>
                    </Label>
                    <Input name="name" onChange={handleChange} value={scooty?.name} id="name" placeholder="Enter scooty name..." type="text" required className="py-[0.65rem] " />
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
                            value={scooty?.price}
                            name="price"
                        />

                    </div>
                </div>


            </div>

            <div className='space-y-1'>
                <Label
                    htmlFor="description"
                    className="block text-sm font-medium "
                >
                    Scooty description <span className="text-red-600">*</span>
                </Label>
                <Textarea id="description" name="description" onChange={handleChange} value={scooty?.description} className="[resize:none] py-[0.65rem] " placeholder="Enter description..." />

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
                        {scooty?.previewImage ? (
                            <img
                                src={scooty?.previewImage}
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
                        {scooty?.previewImage && (
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
                <span className="relative z-20">
                    Edit Scooty
                </span>
            </button>



        </form>
    )
}

export default EditScootyForm
