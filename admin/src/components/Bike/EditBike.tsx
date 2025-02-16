import EditBikeForm from "../Forms/BikeForm/EditBikeForm";
import EditBikeSpecs from "../Forms/BikeForm/EditBikeSpecs";
import EditColorsFeaturesForm from "../Forms/BikeForm/EditColorsFeatures";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";


export default function EditBike({ item, onClose }: { item: any, onClose: (boolean: boolean) => void }) {
    const [activeTab, setActiveTab] = useState<number>(1)
    const tabArray = ["Edit Bike", "Edit Specs", "Edit Others"]

    return (
        <div className="mt-12 w-[94vw] lg:w-full sm:w-[96vw] sm:max-w-[50rem] max-w-[28rem] mx-auto h-full">
            <div className="relative flex">
                <div className="relative flex p-0 mx-auto bg-transparent w-fit">
                    {tabArray.map((tab, index) => (
                        <div
                            onClick={() => setActiveTab(index + 1)}
                            className={` rounded-b-none border-x border-t border-border bg-neutral-800 py-2  text-gray-100  flex items-center justify-center  rounded-md px-2.5  text-[0.85rem] font-semibold outline-offset-2 transition-all hover:bg-black cursor-pointer ${activeTab === index + 1 ? "bg-red-700" : ""}`}
                        >
                            <FaPlus
                                className="-ms-0.5  me-1.5 opacity-80"
                                size={12}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                            {tab}
                        </div>
                    ))}

                </div>
                <div
                    onClick={() => onClose(false)}
                    className={` rounded-b-none   border-border bg-red-700 py-1 border-t-3 border-[#D5D5D5] text-gray-100  flex items-center justify-center  rounded-md px-2.5 font-semibold outline-offset-2 transition-all hover:bg-red-600 cursor-pointer`}
                ><FaXmark /></div>
            </div>
            {activeTab === 1 &&
                <EditBikeForm onTabChange={setActiveTab} bikeData={item} />
            }
            {activeTab === 2 &&
                <EditBikeSpecs onTabChange={setActiveTab} bikeId={item?._id} editDimensions={item?.specification?.bodyDimensions} editEngine={item?.specification?.engine} editTransmission={item?.specification?.transmission} editTyresAndBrakes={item?.specification?.tyresAndBrakes} editFrameAndSuspension={item?.specification?.frameAndSuspension} editElectronics={item?.specification?.electronics} />
            }
            {activeTab === 3 &&
                <EditColorsFeaturesForm onClose={onClose} onTabChange={setActiveTab} bikeId={item?._id} editColor={item?.colors} editFeature={item?.features} />
            }
        </div>
    );
}
