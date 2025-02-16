import React, { useEffect, useState } from "react";
import {
    useAddBannerMutation,
    useDeleteBannerMutation,
    useGetBannerQuery,
    useUpdateBannerMutation,
} from "../../Redux/API/FormApi";
import { FaCamera, FaSpinner, FaTrash, FaTrashAlt, FaPlus } from "react-icons/fa";
import { ResponseData } from "../../interfaces/interface";

const Banner = () => {
    const { data, isLoading } = useGetBannerQuery({});
    const [addBanner, { isLoading: adding }] = useAddBannerMutation();
    const [bannerData, setBannerData] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [previews, setPreviews] = useState<{ [key: number]: string }>({});
    const [addPreview, setAddPreview] = useState<string>("")
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteModalActive, setDeleteModalActive] = useState<boolean | null>(
        null
    );
    const [newImage, setNewImage] = useState<boolean>(false)
    const [deleteBanner, { isLoading: deleteLoading }] = useDeleteBannerMutation();
    const [deleteId, setDeleteId] = useState<string>("");
    const [updateBanner, { isLoading: updateLoading }] = useUpdateBannerMutation();

    useEffect(() => {
        if (data?.banner) {
            setBannerData(data.banner);
        }
    }, [data]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const file = e.target.files?.[0];
        if (file && index !== undefined) {
            const newPreview = URL.createObjectURL(file);
            setFile(file);
            setEditIndex(index);
            setPreviews((prev) => ({ ...prev, [index]: newPreview }));
        } else if (newImage) {
            const newPreview = URL.createObjectURL(file!);
            setFile(file!);
            setAddPreview(newPreview);
        }
    };

    const handleUpdateImage = async (id: string) => {
        if (file && editIndex !== null) {
            const formData = new FormData();
            formData.append("image", file!);
            await updateBanner({ formData, id });
            setFile(null);
            setPreviews({});
            setEditIndex(null);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("image", file!);
        const res = await addBanner(formData) as { data: ResponseData };
        if (res?.data?.success) {
            setAddPreview("");
            setFile(null);
            setPreviews({});
            setNewImage(false)
        }
    };

    const handleDeleteBanner = async (id: string) => {
        const res = await deleteBanner(id) as { data: ResponseData };
        if (res?.data?.success) setDeleteModalActive(false);
    };

    const handleAddNewBanner = () => {
        setNewImage(true);
        setFile(null);
        setPreviews({});
    };

    const handleRemoveImage = () => {
        setNewImage(false);
        setFile(null);
        setPreviews({});
    };

    return (
        <div className="flex flex-col items-center w-full p-4 bg-mainRed">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <form className="w-full max-w-lg">
                    {deleteModalActive && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000027] backdrop-blur-[2px]">
                            <div className="p-6 rounded-lg bg-gray-50 w-96">
                                <h2 className="text-lg font-semibold">Delete Banner</h2>
                                <p className="mt-2 text-gray-600">
                                    Are you sure you want to delete this banner?
                                </p>
                                <div className="flex justify-end mt-4 space-x-3">
                                    <div
                                        onClick={() => setDeleteModalActive(false)}
                                        className="px-4 py-1.5 border text-gray-700 bg-gray-300 rounded hover:bg-gray-200"
                                    >
                                        Cancel
                                    </div>
                                    <div
                                        onClick={() => handleDeleteBanner(deleteId)}
                                        className="px-4 flex items-center gap-2 py-1.5 text-white bg-red-600 rounded hover:bg-red-700"
                                    >
                                        {deleteLoading ? (
                                            <span className="border-2 border-t-2 border-white rounded-full border-t-gray-600 size-5 animate-spin"></span>
                                        ) : (
                                            <>
                                                <FaTrashAlt />
                                                Delete
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4">
                        {bannerData.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center mb-2 rounded bg-neutral-900 w-fit"
                            >
                                <div className="relative overflow-hidden rounded group">
                                    {item._id && (
                                        <FaTrash
                                            className="absolute top-0 z-[10] left-0 p-1 text-white bg-red-500 rounded cursor-pointer"
                                            size={20}
                                            onClick={() => {
                                                setDeleteModalActive(true);
                                                setDeleteId(item?._id);
                                            }}
                                        />
                                    )}
                                    <img
                                        src={previews[index] || item.image?.url || "/placeholder.png"}
                                        alt="banner"
                                        className="object-cover w-20 h-20 rounded"
                                    />

                                    <label
                                        htmlFor={`fileInput-${index}`}
                                        className="absolute inset-0 flex items-center justify-center transition-opacity rounded opacity-0 cursor-pointer bg-black/40 backdrop-blur-sm group-hover:opacity-100"
                                    >
                                        <FaCamera className="text-white" size={20} />
                                    </label>
                                    <input
                                        type="file"
                                        className="hidden"
                                        id={`fileInput-${index}`}
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                </div>
                                {editIndex === index && (
                                    <div
                                        onClick={() => item._id && handleUpdateImage(item?._id)}
                                        className="px-2 py-1 cursor-pointer text-[0.8rem] w-full text-white bg-neutral-900 rounded-b"
                                    >
                                        {updateLoading ? (
                                            <FaSpinner className="mx-auto animate-spin" />
                                        ) : (
                                            "Update"
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        {newImage && (
                            <div className="relative flex flex-col items-center mb-2 rounded bg-neutral-900 w-fit">
                                <div className="relative overflow-hidden rounded group">
                                    <FaTrash
                                        className="absolute top-0 z-[1000] left-0 p-1 text-white bg-red-500 rounded cursor-pointer"
                                        size={20}
                                        onClick={() => handleRemoveImage()}
                                    />
                                    <img
                                        src={addPreview || "/placeholder.png"}
                                        alt="banner"
                                        className="object-cover w-20 h-20 rounded"
                                    />
                                    <label
                                        htmlFor="fileInput" className="absolute inset-0 flex items-center justify-center transition-opacity rounded opacity-0 cursor-pointer bg-black/40 backdrop-blur-sm group-hover:opacity-100">
                                        <FaCamera className="text-white" size={20} />
                                    </label>
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="fileInput"
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                </div>
                                {addPreview && (
                                    <div
                                        onClick={handleSubmit}
                                        className="px-2 py-1 text-center cursor-pointer text-[0.8rem] w-full text-white bg-neutral-900 rounded-b"
                                    >
                                        {adding ? (
                                            <FaSpinner className="mx-auto animate-spin" />
                                        ) : (
                                            "Add New"
                                        )}
                                    </div>
                                )}
                            </div>

                        )}

                        <div
                            onClick={handleAddNewBanner}
                            className="flex flex-col items-center justify-center w-20 h-20 text-lg text-white bg-blue-600 rounded cursor-pointer"
                        >

                            <FaPlus />
                            <span className="text-[0.8rem]">
                                Add New
                            </span>
                        </div>
                    </div>





                </form>
            )}
        </div>
    );
};

export default Banner;
