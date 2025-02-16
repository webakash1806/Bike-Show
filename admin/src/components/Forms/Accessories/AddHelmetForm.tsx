import React, { useState } from 'react'
import { useAddHelmetMutation } from '../../../Redux/API/HelmetApi'
import Loaders from '../../Loaders'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { v4 as uuidv4 } from 'uuid';
import { SelectNative } from '../../ui/select-native'
import { Textarea } from '../../ui/textarea'
import { FaCamera, FaTrashAlt } from 'react-icons/fa'
import { HiXMark } from 'react-icons/hi2'
import { FaXmark } from 'react-icons/fa6'

interface helmet {
    helmetType: string
    title: string
    description: string
    helmet: Array<{
        uniqueId: string,
        title: string,
        colorName: string,
        previewImg: string,
        variant: Array<{
            size: string,
            price: number | 0
        }>
    }>
}

const AddHelmetForm = () => {

    const [addHelmet, { isLoading }] = useAddHelmetMutation()

    const [helmetDataCount, setHelmetDataCount] = useState<number>(1)

    const [variantCount, setVariantCount] = useState<number[]>([1])

    const [helmet, setHelmet] = useState<helmet>({
        helmetType: '',
        title: '',
        description: '',
        helmet: [
            {
                uniqueId: '',
                title: '',
                colorName: '',
                previewImg: '',
                variant: [
                    {
                        size: '',
                        price: 0
                    }
                ]
            }
        ]
    })
    const [file, setFile] = useState<File[] | null>(null)

    const handleAddHelmet = () => {
        setVariantCount([...variantCount, 1])
        setHelmetDataCount(helmetDataCount + 1)
        setHelmet(prev => ({
            ...prev, helmet: [...prev.helmet, {
                uniqueId: '',
                title: '',
                colorName: '',
                previewImg: '',
                variant: [
                    {
                        size: '',
                        price: 0
                    }
                ]
            }]
        }))
    }

    const handleVariantAdd = (index: number) => {
        setVariantCount((prev) => {
            const newVariantCount = [...prev]
            newVariantCount[index] = newVariantCount[index] + 1
            return newVariantCount
        })

        setHelmet(prev => ({
            ...prev, helmet: prev.helmet.map((helmet, i) => i === index ? { ...helmet, variant: [...helmet.variant, { size: '', price: 0 }] } : helmet)
        }))
    }

    const handleVariantRemove = (helmetIndex: number, variantIndex: number) => {
        setVariantCount((prev) => {
            const newVariantCount = [...prev]
            newVariantCount[helmetIndex] = Math.max(1, newVariantCount[helmetIndex] - 1)
            return newVariantCount
        })

        setHelmet(prev => ({
            ...prev, helmet: prev.helmet.map((helmet, i) => i === helmetIndex ? { ...helmet, variant: [...helmet.variant.slice(0, variantIndex), ...helmet.variant.slice(variantIndex + 1)] } : helmet)
        }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setHelmet(prev => ({ ...prev, [name]: value }))
    }

    const handleHelmetChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setHelmet(prev => ({
            ...prev, helmet: [...prev.helmet.map((helmet, i) => i === index ? { ...helmet, [name]: value } : helmet)]
        }))
    }

    const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, helmetIndex: number, variantIndex: number) => {
        const { name, value } = e.target;
        setHelmet(prev => ({
            ...prev, helmet: [...prev.helmet.map((helmet, i) => i === helmetIndex ? {
                ...helmet, variant: [...helmet.variant.map((variant, i) => i === variantIndex ? { ...variant, [name]: value } : variant)]
            } : helmet)]
        }))
    }

    const getFileExtension = (fileName: string) => {
        return fileName.split('.').pop()
    }

    const generateUUID = (): string => {
        return uuidv4().slice(0, 8);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | null, index: number) => {
        const selectedFile = e?.target.files?.[0];

        if (selectedFile) {
            const uniqueId = generateUUID()
            const filename = selectedFile.name;
            const extension = getFileExtension(filename);
            if (helmet.helmet[index]?.uniqueId === "") {
                const fileName = `${uniqueId}.${extension}`;

                setHelmet(prev => ({
                    ...prev, helmet: [
                        ...prev.helmet.slice(0, index),
                        { ...prev.helmet[index], uniqueId: uniqueId, previewImg: URL.createObjectURL(selectedFile) },
                        ...prev.helmet.slice(index + 1)
                    ]
                }));
                setFile((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                });
            } else {
                const unique = helmet.helmet[index]?.uniqueId
                const fileName = `${unique}.${extension}`;
                setHelmet(prev => ({
                    ...prev, helmet: [
                        ...prev.helmet.slice(0, index),
                        { ...prev.helmet[index], uniqueId: unique, previewImg: URL.createObjectURL(selectedFile) },
                        ...prev.helmet.slice(index + 1)
                    ]
                }));
                setFile((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                });
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setHelmet(prev => ({
            ...prev, helmet: [
                ...prev.helmet.slice(0, index),
                { ...prev.helmet[index], uniqueId: "", previewImg: "" },
                ...prev.helmet.slice(index + 1)
            ]
        }));
        setFile((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles[index] = new File([], "");
            return newFiles;
        });
    }

    const handleHelmetDataRemove = (index: number) => {
        setHelmet(prev => ({
            ...prev, helmet: [
                ...prev.helmet.slice(0, index),
                { ...prev.helmet[index], uniqueId: "", previewImg: "" },
                ...prev.helmet.slice(index + 1)
            ]
        }));
        setFile((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles[index] = new File([], "");
            return newFiles;
        })

        setHelmet(prev => ({
            ...prev, helmet: prev.helmet.filter((_, i) => i !== index)
        }));
        setVariantCount(prev => prev.filter((_, i) => i !== index))
        setHelmetDataCount(helmetDataCount - 1)
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("helmetType", helmet.helmetType)
        formData.append("title", helmet.title)
        formData.append("description", helmet.description)
        formData.append("helmet", JSON.stringify(helmet.helmet.map(({ previewImg, ...rest }) => rest)))

        file?.forEach((file) => {
            formData.append("helmetImg", file as File)
        })

        addHelmet({ formData })
    }


    return (
        <form onSubmit={handleSubmit} noValidate className="relative w-[94vw] sm:w-[96vw]  p-4 sm:p-6  pt-2 sm:pt-2 sm:max-w-[50rem] max-w-[28rem] mx-auto  space-y-4 overflow-hidden rounded-t shadow-lg bg-[#fffefe] rounded-md">
            {isLoading && <Loaders isLoading={isLoading} />}
            <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Add helmet</h1>

            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor="title" className=" text-[0.85rem]">
                        Accessory name <span className="text-red-600">*</span>
                    </Label>
                    <Input name="title" onChange={handleChange} value={helmet?.title} id="title" placeholder="Enter accessory title..." type="text" required className="py-[0.65rem] " />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={"helmetType"}>Select type</Label>
                    <SelectNative onChange={handleChange} name="helmetType" id={"helmetType"} defaultValue="">
                        <option value="" disabled>
                            Please select a value
                        </option>
                        <option value="HALF">Half</option>
                        <option value="FULL">Full</option>
                    </SelectNative>
                </div>

            </div>


            <div className='space-y-1'>
                <Label
                    htmlFor="description"
                    className="block text-sm font-medium "
                >
                    Bike description <span className="text-red-600">*</span>
                </Label>
                <Textarea id="description" name="description" onChange={handleChange} value={helmet?.description} className="[resize:none] py-[0.65rem] " placeholder="Enter description..." />

            </div>

            <div className="grid grid-cols-1 gap-2 space-y-4 sm:gap-4 sm:grid-cols-2">
                {Array.from({ length: helmetDataCount })?.map((_, index) => (
                    <div key={index} className="relative p-2 space-y-3 bg-gray-100 border border-gray-100 rounded shadow-md">
                        <div className='space-y-1'>
                            <Label
                                htmlFor="title"
                                className="block text-sm font-medium "
                            >
                                Helmet name <span className="text-red-600">*</span>
                            </Label>
                            <Input name="title" value={helmet.helmet[index]?.title} onChange={(e) => handleHelmetChange(e, index)} id="title" placeholder="Enter engine type..." type="text" required className="py-[0.65rem] " />
                        </div>
                        <div className='space-y-1'>
                            <Label
                                htmlFor="colorName"
                                className="block text-sm font-medium "
                            >
                                Helmet color name <span className="text-red-600">*</span>
                            </Label>
                            <Input name="colorName" value={helmet.helmet[index]?.colorName} onChange={(e) => handleHelmetChange(e, index)} id="colorName" placeholder="Enter color name..." type="text" required className="py-[0.65rem] " />
                        </div>

                        <label htmlFor="">Sizes</label>
                        {Array.from({ length: variantCount[index] })?.map((_, i) => {
                            return <div key={i} className="flex items-end gap-1 ">
                                <div className="space-y-2 w-[7rem] mr-2">
                                    <Label htmlFor={"size"}>Select size</Label>
                                    <SelectNative onChange={(e) => { handleVariantChange(e, index, i) }}
                                        name="size" id={"size"} defaultValue="">
                                        <option value="" disabled>
                                            Select size
                                        </option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </SelectNative>
                                </div>
                                <div className="w-full space-y-1">
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
                                            onChange={(e) => { handleVariantChange(e, index, i) }}
                                            value={helmet.helmet[index]?.variant[i]?.price}
                                            name="price"
                                        />
                                    </div>
                                </div>
                                {helmet.helmet[index]?.variant.length > 1 && <div onClick={() => handleVariantRemove(index, i)} className='w-[3.5rem] flex items-center justify-center rounded-md h-[2.4rem] bg-red-600 text-white'><FaXmark /></div>}
                            </div>
                        })}

                        <div onClick={() => handleVariantAdd(index)} className='p-2 space-y-1 text-center text-white bg-gray-700 rounded shadow-md cursor-pointer'>
                            add size
                        </div>

                        <div >
                            <label

                                className="block text-sm font-medium text-gray-700"
                            >
                                Image
                            </label>
                            <div className="relative flex items-center mt-1 size-20 group">
                                {helmet.helmet[index]?.previewImg ? (
                                    <img
                                        src={helmet.helmet[index]?.previewImg}
                                        alt={``}
                                        className="object-cover border rounded size-20"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-gray-500 border rounded size-20">
                                        <div className="absolute inset-0 left-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded bg-opacity-80">
                                            <label
                                                htmlFor={`image-${index}`}
                                                className="text-white cursor-pointer"
                                            >
                                                <FaCamera />
                                            </label>
                                        </div>
                                    </div>
                                )}
                                <div
                                    onClick={() => document.getElementById(`image-${index}`)?.click()}
                                    className="absolute inset-0 left-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded opacity-0 group-hover:bg-opacity-50">
                                    <FaCamera />
                                </div>
                                {helmet.helmet[index]?.previewImg && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700"
                                    >
                                        <HiXMark className="text-[0.8rem]" />
                                    </button>
                                )}
                                <input
                                    type="file"
                                    accept="image/.png, image/.jpg, image/.jpeg, image/.webp, image/.avif"
                                    id={`image-${index}`}
                                    onChange={(e) => handleFileChange(e, index)}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-2 mt-2">
                            <div className="flex items-center justify-center px-5 text-white rounded size-8 bg-neutral-700 ">
                                {index + 1}
                            </div>
                            <button onClick={() => handleHelmetDataRemove(index)} className="flex items-center justify-center w-full gap-2 p-1.5  text-white cursor-pointer bg-red-600 rounded"><FaTrashAlt />Remove Helmet</button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddHelmet}
                    className="flex items-center justify-center w-full px-4 py-2 text-white transition duration-300 rounded-md bg-amber-600 bg-mainBg hover:bg-mainBg/80"
                >
                    Add more
                </button>
            </div>

            <button className="relative mb-4 w-full px-8 py-2.5 text-sm text-white transition duration-200 bg-red-600 rounded-md top-2">
                <div className="absolute inset-x-0 w-1/3 h-px mx-auto shadow-2xl -top-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20 font-semibold">
                    Add helmet
                </span>
            </button>



        </form >
    )
}

export default AddHelmetForm
