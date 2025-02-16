import { HomeLayout } from "../Layout/HomeLayout";


import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddScootyForm from "../components/Forms/ScootyForm/AddScootyForm";
import AddScootySpecs from "../components/Forms/ScootyForm/AddScootySpecs";
import ColorsFeaturesForm from "../components/Forms/ScootyForm/ColorsFeaturesForm";


export default function AddScooty() {

    const [scootyId, setScootyId] = useState<string | Blob | null>(null)
    const [activeTab, setActiveTab] = useState<number>(1)

    const tabArray = ["Add Scooty", "Add Specs", "Add Others"]

    return (
        <HomeLayout>
            <div className="mt-12 w-[94vw] lg:w-full sm:w-[96vw] sm:max-w-[50rem] max-w-[28rem] mx-auto h-full">

                <div className="relative flex">
                    <div className="relative flex p-0 mx-auto bg-transparent w-fit">
                        {tabArray.map((tab, index) => (
                            <div key={index}
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

                </div>
                <div className="min-h-screen outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70">
                    {activeTab === 1 && <AddScootyForm onScootyIdChange={setScootyId} onTabChange={setActiveTab} />}
                    {activeTab === 2 && <AddScootySpecs onTabChange={setActiveTab} scootyId={scootyId} />}
                    {activeTab === 3 && <ColorsFeaturesForm onTabChange={setActiveTab} scootyId={scootyId} />}
                </div>


            </div>
        </HomeLayout>
    );
}
