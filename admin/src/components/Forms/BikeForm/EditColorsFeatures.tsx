import { Accordion, AccordionContent, AccordionItem } from "../../../components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Bell, ChevronDown, Link2 } from "lucide-react";
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { useState } from "react";
import ColorPicker from "../../SelectColor";
import { FaBackward, FaCamera, FaForward, FaTrashAlt } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { v4 as uuidv4 } from 'uuid';
import { useAddBikeOthersMutation } from "../../../Redux/API/BikeAPI";
import Loaders from "../../Loaders";
import { Colors, Image, ResponseData } from "../../../interfaces/interface";



interface features {
    uniqueId: string,
    title: string,
    img: string,
    featureImg?: Image
}

export default function EditColorsFeaturesForm({ bikeId, editColor, editFeature, onTabChange, onClose }: { bikeId: string, editColor: Colors[], editFeature: features[], onTabChange: (tab: number) => void, onClose: (boolean: boolean) => void }) {
    const [addBikeOthers, { isLoading }] = useAddBikeOthersMutation()

    const [colorPalleteActive, setColorPalleteActive] = useState<number | null>(null)


    console.log(editColor)
    const [colorDataCount, setColorDataCount] = useState(editColor?.length || 1)
    const [colorFile, setColorFile] = useState<File[] | null>(null);
    const [colorData, setColorData] = useState<Colors[]>(editColor.length > 0 ? editColor?.map(color => ({
        colorName: color.colorName,
        colorCode: color.colorCode,
        uniqueId: color.uniqueId,
        img: color?.colorBikeImg?.url || ""
    })) : [{
        colorName: "",
        colorCode: "",
        uniqueId: "",
        img: ""
    }])

    console.log(colorData)

    const [featuresDataCount, setFeaturesDataCount] = useState(editFeature?.length || 1)
    const [featuresFile, setFeaturesFile] = useState<File[] | null>(null);
    const [featuresData, setFeaturesData] = useState<features[]>(editFeature?.length > 0 ? editFeature?.map(feature => ({ uniqueId: feature.uniqueId, title: feature.title, img: feature?.featureImg?.url || "" })) : [
        {
            uniqueId: "",
            title: "",
            img: ""
        }
    ])

    const handleAddColor = () => {
        setColorDataCount(colorDataCount + 1)
        setColorData([...colorData, {
            colorName: "",
            colorCode: "",
            uniqueId: "",
            img: ""
        }])
    }

    const handleAddFeature = () => {
        setFeaturesDataCount(featuresDataCount + 1)
        setFeaturesData([...featuresData, {
            uniqueId: "",
            title: "",
            img: ""
        }])
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setColorData([...colorData.map((color, i) => i === index ? { ...color, [name]: value } : color)])
    }

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setFeaturesData([...featuresData.map((feature, i) => i === index ? { ...feature, [name]: value } : feature)])
    }

    const getFileExtension = (fileName: string) => {
        return fileName.split('.').pop()
    }

    const generateUUID = (): string => {
        return uuidv4().slice(0, 8);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | null, index: number) => {
        const selectedFile = e?.target.files?.[0];
        console.log(index)

        if (selectedFile) {
            const uniqueId = generateUUID()
            console.log(uniqueId)
            console.log(selectedFile)
            const filename = selectedFile.name;
            const extension = getFileExtension(filename);
            if (colorData[index]?.uniqueId === "") {
                const fileName = `${uniqueId}.${extension}`;
                console.log(1)
                console.log(index)

                setColorData(prevData => [
                    ...prevData.slice(0, index),
                    { ...prevData[index], uniqueId: uniqueId, img: URL.createObjectURL(selectedFile) },
                    ...prevData.slice(index + 1)
                ]);
                console.log("object", colorData)
                setColorFile((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                });
            } else {
                const unique = colorData[index]?.uniqueId
                console.log(unique)
                const fileName = `${unique}.${extension}`;
                console.log(1)
                console.log(index)
                setColorData(prevData => [
                    ...prevData.slice(0, index),
                    { ...prevData[index], uniqueId: unique, img: URL.createObjectURL(selectedFile) },
                    ...prevData.slice(index + 1)
                ]);
                setColorFile((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                });
            }
        }
    };

    const handleFeatureFileChange = (e: React.ChangeEvent<HTMLInputElement> | null, index: number) => {
        const selectedFile = e?.target.files?.[0];
        if (selectedFile) {
            const uniqueId = generateUUID()
            console.log(uniqueId)
            console.log(selectedFile)
            const filename = selectedFile.name;
            const extension = getFileExtension(filename);
            if (featuresData[index]?.uniqueId === "") {
                const fileName = `${uniqueId}.${extension}`;
                console.log(1)
                console.log(index)

                setFeaturesData(prevData => [
                    ...prevData.slice(0, index),
                    { ...prevData[index], uniqueId: uniqueId, img: URL.createObjectURL(selectedFile) },
                    ...prevData.slice(index + 1)
                ]);
                console.log("object", colorData)
                setFeaturesFile((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                });
            } else {
                const unique = featuresData[index]?.uniqueId
                console.log(unique)
                const fileName = `${unique}.${extension}`;
                console.log(1)
                console.log(index)
                setFeaturesData(prevData => [
                    ...prevData.slice(0, index),
                    { ...prevData[index], uniqueId: unique, img: URL.createObjectURL(selectedFile) },
                    ...prevData.slice(index + 1)
                ]);
                setFeaturesFile((prevFiles: File[] | null) => {
                    const newFiles = [...(prevFiles || [])];
                    newFiles[index] = new File([selectedFile], fileName, { type: selectedFile.type });
                    return newFiles;
                });
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setColorData([...colorData.map((color, i) => i === index ? { ...color, img: "" } : color)])
    }

    const handleRemoveFeatureImage = (index: number) => {
        setFeaturesData([...featuresData.map((color, i) => i === index ? { ...color, img: "" } : color)])
    }

    const handleColorDataRemove = (index: number) => {
        setColorFile((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles.splice(index, 1);
            return newFiles;
        })

        setColorData([...colorData.filter((_, i) => i !== index)])
        setColorDataCount(colorDataCount - 1)
    }

    const handleFeatureDataRemove = (index: number) => {
        setFeaturesFile((prevFiles: File[] | null) => {
            const newFiles = [...(prevFiles || [])];
            newFiles.splice(index, 1);
            return newFiles;
        })

        setFeaturesData([...featuresData.filter((_, i) => i !== index)])
        setFeaturesDataCount(featuresDataCount - 1)
    }

    const handleColorCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setColorData((prevData: Colors[]) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                colorName: newData[index].colorName ? newData[index].colorName : "",
                uniqueId: newData[index].uniqueId ? newData[index].uniqueId : "",
                img: newData[index].img ? newData[index].img : "",
                colorCode: e.target.value
            };
            return newData;
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(colorData)
        const formData = new FormData()
        formData.append("colors", JSON.stringify(colorData.map(({ img, ...rest }) => rest)))

        formData.append("features", JSON.stringify(featuresData.map(({ img, ...rest }) => rest)))

        colorFile?.forEach((file) => {
            formData.append("colorImg", file)
        })
        featuresFile?.forEach((file) => {
            formData.append("featureImg", file)
        })

        formData.append("bikeId", bikeId)
        const res = await addBikeOthers({ formData }) as { data: ResponseData }

        if (res?.data?.success) {
            onClose(false)
        }
    }


    console.log(featuresData)

    const handleBack = () => {
        onTabChange(2)
    }

    const items = [
        {
            id: "1",
            icon: Link2,
            title: "Add colors",
            content:
                <div className="relative    pt-2 sm:pt-2 w-full mx-auto mb-10 space-y-4  rounded-t  bg-[#fffefe] rounded-md">
                    {/* <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Add new bike</h1> */}
                    <div className="grid grid-cols-1 gap-2 space-y-4 sm:gap-4 sm:grid-cols-2">
                        {Array.from({ length: colorDataCount })?.map((_, index) => (
                            <div className="relative p-2 space-y-3 bg-gray-100 border border-gray-100 rounded shadow-md">
                                <Label htmlFor="colorName" className=" text-[0.85rem]">
                                    Color name <span className="text-red-600">*</span>
                                </Label>
                                <Input name="colorName" value={colorData[index]?.colorName} onChange={(e) => handleColorChange(e, index)} id="colorName" placeholder="Enter engine type..." type="text" required className="py-[0.65rem] " />
                                <div className="">
                                    {
                                        index === colorPalleteActive && <div className="inset-0 bg-[#0000003c] backdrop-blur-sm rounded flex-col absolute flex items-center justify-center bottom-0 left-0 z-[1000]">
                                            <ColorPicker onClose={() => setColorPalleteActive(-1)} color={colorData[index]?.colorCode} setColor={(colorCode: string) => handleColorCodeChange({ target: { value: colorCode } } as React.ChangeEvent<HTMLInputElement>, index)} />
                                        </div>
                                    }
                                    <div className="flex items-center gap-2 text-gray-700 text-[0.85rem] font-semibold">
                                        Selected Color : <span onClick={() => setColorPalleteActive(index)} style={{ backgroundColor: colorData[index]?.colorCode }} className={` w-5 h-5 border rounded-full inline-block`}></span>
                                    </div>
                                </div>
                                <div >
                                    <label

                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Image
                                    </label>
                                    <div className="relative flex items-center mt-1 size-20 group">
                                        {colorData[index]?.img ? (
                                            <img
                                                src={colorData[index]?.img}
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
                                        {colorData[index]?.img && (
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
                                    <button onClick={() => handleColorDataRemove(index)} className="flex items-center justify-center w-full gap-2 p-1.5  text-white cursor-pointer bg-red-600 rounded"><FaTrashAlt />Remove Color</button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddColor}
                            className="flex items-center justify-center w-full px-4 py-2 text-white transition duration-300 rounded-md bg-amber-600 bg-mainBg hover:bg-mainBg/80"
                        >
                            Add more
                        </button>
                    </div>

                </div>
        },
        {
            id: "2",
            icon: Bell,
            title: "Add features",
            content:
                <div className="relative pt-2 sm:pt-2 w-full mx-auto mb-10 space-y-4  rounded-t  bg-[#fffefe] rounded-md">
                    {/* <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Add new bike</h1> */}
                    <div className="grid grid-cols-1 gap-2 space-y-4 sm:gap-4 sm:grid-cols-2">
                        {Array.from({ length: featuresDataCount })?.map((_, index) => (
                            <div className="p-2 space-y-1 bg-gray-100 border border-gray-100 rounded shadow-md">
                                <Label htmlFor="title" className=" text-[0.85rem]">
                                    Feature title <span className="text-red-600">*</span>
                                </Label>
                                <Input name="title" value={featuresData[index]?.title} onChange={(e) => handleFeatureChange(e, index)} id="title" placeholder="Enter engine type..." type="text" required className="py-[0.65rem] " />

                                <div >
                                    <label

                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Image
                                    </label>
                                    <div className="relative flex items-center mt-1 size-20 group">
                                        {featuresData[index]?.img ? (
                                            <img
                                                src={featuresData[index]?.img}
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
                                        {featuresData[index]?.img && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFeatureImage(index)}
                                                className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700"
                                            >
                                                <HiXMark className="text-[0.8rem]" />
                                            </button>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/.png, image/.jpg, image/.jpeg, image/.webp, image/.avif"
                                            id={`image-${index}`}
                                            onChange={(e) => handleFeatureFileChange(e, index)}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-2 mt-2">
                                    <div className="flex items-center justify-center px-5 text-white rounded size-8 bg-neutral-700 ">
                                        {index + 1}
                                    </div>
                                    <button onClick={() => handleFeatureDataRemove(index)} className="flex items-center justify-center w-full gap-2 p-1.5  text-white cursor-pointer bg-red-600 rounded"><FaTrashAlt />Remove Feature</button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddFeature}
                            className="flex items-center justify-center w-full px-4 py-2 text-white transition duration-300 rounded-md bg-amber-600 bg-mainBg hover:bg-mainBg/80"
                        >
                            Add more
                        </button>
                    </div>

                </div>
        },

    ];
    return (
        <div className="relative w-full  p-4 sm:p-6  pt-2 sm:pt-2  mx-auto mb-10 space-y-4 overflow-hidden rounded-t shadow-lg bg-[#fffefe] rounded-md">
            {isLoading && <Loaders isLoading={isLoading} />}

            <h2 className="mx-auto text-xl font-bold w-fit">Color & Features</h2>
            <Accordion type="single" collapsible className="w-full" defaultValue="1">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="py-2">
                        <AccordionPrimitive.Header className="flex">
                            <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&[data-state=open]>svg]:rotate-180">
                                <span className="flex items-center gap-3">
                                    <span
                                        className="flex items-center justify-center border border-gray-200 rounded-full size-10 shrink-0 dark:border-gray-800"
                                        aria-hidden="true"
                                    >
                                        <item.icon size={16} strokeWidth={2} className="opacity-60" />
                                    </span>
                                    <span className="flex flex-col space-y-1">
                                        <span>{item.title}</span>
                                    </span>
                                </span>
                                <ChevronDown
                                    size={16}
                                    strokeWidth={2}
                                    className="transition-transform duration-200 shrink-0 opacity-60"
                                    aria-hidden="true"
                                />
                            </AccordionPrimitive.Trigger>
                        </AccordionPrimitive.Header>
                        <AccordionContent className="pb-2 text-gray-500 dark:text-gray-400">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
                <div className='flex items-center justify-between gap-3'>
                    <button onClick={handleBack} className="relative mb-4 w-fit flex items-center justify-center px-4 gap-3 py-2.5 text-sm text-white transition duration-200 bg-neutral-700 rounded-md top-2">
                        <FaBackward /> Back
                    </button>
                    <button onClick={handleSubmit} className="relative mb-4 w-fit flex items-center justify-center px-4 gap-3 py-2.5 text-sm text-white transition duration-200 bg-red-600 rounded-md top-2">
                        Update <FaForward />
                    </button>
                </div>
            </Accordion>
        </div>
    );
}
