import React, { useState } from 'react'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Accordion, AccordionContent, AccordionItem } from "../../ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Bell, ChevronDown, Link2, ShieldCheck } from "lucide-react";
import { useAddBikeSpecsMutation } from '../../../Redux/API/BikeAPI';
import { FaBackward, FaForward } from 'react-icons/fa';
import Loaders from '../../Loaders';
import { BodyDimensions, Electronics, Engine, FrameAndSuspension, ResponseData, Transmission, TyresAndBrakes } from '../../../interfaces/interface';




const EditBikeSpecs = ({ bikeId, editDimensions, editEngine, editTransmission, editTyresAndBrakes, editFrameAndSuspension, editElectronics, onTabChange }: { bikeId: string, editDimensions: BodyDimensions, editEngine: Engine, editTransmission: Transmission, editTyresAndBrakes: TyresAndBrakes, editFrameAndSuspension: FrameAndSuspension, editElectronics: Electronics, onTabChange: (tab: number) => void }) => {
    console.log(editElectronics)
    const [addBikeSpecs, { isLoading }] = useAddBikeSpecsMutation()

    const [bodyDimensions, setBodyDimensions] = useState<BodyDimensions>({
        length: editDimensions?.length || '',
        width: editDimensions?.width || '',
        height: editDimensions?.height || '',
        wheelBox: editDimensions?.wheelBox || '',
        groundClearance: editDimensions?.groundClearance || '',
        seatHeight: editDimensions?.seatHeight || '',
        seatLength: editDimensions?.seatLength || '',
        kerbWeight: editDimensions?.kerbWeight || '',
        fuelCapacity: editDimensions?.fuelCapacity || '',
    })

    const [engine, setEngine] = useState<Engine>({
        engineType: editEngine?.engineType || '',
        displacement: editEngine?.displacement || '',
        maxPower: editEngine?.maxPower || '',
        maxRpm: editEngine?.maxRpm || '',
        mileage: editEngine?.mileage || '',
        maxTorque: editEngine?.maxTorque || '',
        compressionRatio: editEngine?.compressionRatio || '',
        bore: editEngine?.bore || '',
        stroke: editEngine?.stroke || '',
        startingMethod: editEngine?.startingMethod || '',
        fuelSystem: editEngine?.fuelSystem || '',
    })

    const [transmission, setTransmission] = useState<Transmission>({
        clutchType: editTransmission?.clutchType || '',
        noOfGears: editTransmission?.noOfGears || '',
    })

    const [tyresAndBrakes, setTyresAndBrakes] = useState<TyresAndBrakes>({
        frontTyre: editTyresAndBrakes?.frontTyre || '',
        rearTyre: editTyresAndBrakes?.rearTyre || '',
        frontBrake: editTyresAndBrakes?.frontBrake || '',
        rearBrake: editTyresAndBrakes?.rearBrake || '',
    })

    const [frameAndSuspension, setFrameAndSuspension] = useState<FrameAndSuspension>({
        frameType: editFrameAndSuspension?.frameType || '',
        frontSuspension: editFrameAndSuspension?.frontSuspension || '',
        rearSuspension: editFrameAndSuspension?.rearSuspension || '',
    })

    const [electronics, setElectronics] = useState<Electronics>({
        headLights: editElectronics?.headLights || '',
        tailLights: editElectronics?.tailLights || '',
        winkers: editElectronics?.winkers || '',
        battery: editElectronics?.battery || '',
    })

    const handleBodyDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBodyDimensions({ ...bodyDimensions, [name]: value });
    }

    const handleEngineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEngine({ ...engine, [name]: value });
    }

    const handleTransmissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTransmission({ ...transmission, [name]: value });
    }

    const handleTyresAndBrakesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTyresAndBrakes({ ...tyresAndBrakes, [name]: value });
    }

    const handleFrameAndSuspensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFrameAndSuspension({ ...frameAndSuspension, [name]: value });
    }

    const handleElectronicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setElectronics({ ...electronics, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(bodyDimensions, engine, transmission, tyresAndBrakes, frameAndSuspension, electronics)
        const specs = {
            bodyDimensions,
            engine,
            transmission,
            tyresAndBrakes,
            frameAndSuspension,
            electronics,
            bikeId
        }

        const response = await addBikeSpecs({ specs }) as { data: ResponseData }
        if (response?.data?.success) onTabChange(3)
        console.log(response)
    }

    const handleBack = () => {
        onTabChange(1)
    }

    const items = [
        {
            id: "1",
            icon: Link2,
            title: "Body Dimensions",
            // sub: "Manage your linked social and work accounts",
            content:
                <div className="relative    pt-2 sm:pt-2 w-full mx-auto mb-10 space-y-4 overflow-hidden rounded-t  bg-[#fffefe] rounded-md">
                    {/* <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Add new bike</h1> */}
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                            <Label htmlFor="length" className=" text-[0.85rem]">
                                Length <span className="text-red-600">*</span>
                            </Label>
                            <Input name="length" onChange={handleBodyDimensionsChange} value={bodyDimensions?.length} id="length" placeholder="Enter length..." type="text" required className="py-[0.65rem] " />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="width" className=" text-[0.85rem]">
                                Width <span className="text-red-600">*</span>
                            </Label>
                            <Input name="width" onChange={handleBodyDimensionsChange} value={bodyDimensions?.width} id="width" placeholder="Enter width..." type="text" required className="py-[0.65rem] " />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="height" className=" text-[0.85rem]">
                                Height <span className="text-red-600">*</span>
                            </Label>
                            <Input name="height" onChange={handleBodyDimensionsChange} value={bodyDimensions?.height} id="height" placeholder="Enter height..." type="text" required className="py-[0.65rem]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">

                        <div className="space-y-1">
                            <Label htmlFor="wheelBox" className=" text-[0.85rem]">
                                Wheel Box <span className="text-red-600">*</span>
                            </Label>
                            <Input name="wheelBox" onChange={handleBodyDimensionsChange} value={bodyDimensions?.wheelBox} id="wheelBox" placeholder="Enter wheel box..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="groundClearance" className=" text-[0.85rem]">
                                Ground Clearance <span className="text-red-600">*</span>
                            </Label>
                            <Input name="groundClearance" onChange={handleBodyDimensionsChange} value={bodyDimensions?.groundClearance} id="groundClearance" placeholder="Enter ground clearance..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="fuelCapacity" className=" text-[0.85rem]">
                                Fuel Capacity <span className="text-red-600">*</span>
                            </Label>
                            <Input name="fuelCapacity" onChange={handleBodyDimensionsChange} value={bodyDimensions?.fuelCapacity} id="fuelCapacity" placeholder="Enter fuel capacity..." type="text" required className="py-[0.65rem]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">

                        <div className="space-y-1">
                            <Label htmlFor="seatHeight" className=" text-[0.85rem]">
                                Seat Height <span className="text-red-600">*</span>
                            </Label>
                            <Input name="seatHeight" onChange={handleBodyDimensionsChange} value={bodyDimensions?.seatHeight} id="seatHeight" placeholder="Enter seat height..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="seatLength" className=" text-[0.85rem]">
                                Seat Length <span className="text-red-600">*</span>
                            </Label>
                            <Input name="seatLength" onChange={handleBodyDimensionsChange} value={bodyDimensions?.seatLength} id="seatLength" placeholder="Enter seat length..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="kerbWeight" className=" text-[0.85rem]">
                                Kerb Weight <span className="text-red-600">*</span>
                            </Label>
                            <Input name="kerbWeight" onChange={handleBodyDimensionsChange} value={bodyDimensions?.kerbWeight} id="kerbWeight" placeholder="Enter kerb weight..." type="text" required className="py-[0.65rem]" />
                        </div>

                    </div>
                </div>
        },
        {
            id: "2",
            icon: Bell,
            title: "Engine Details",
            // sub: "Customize your notification preferences",
            content:
                <div className="relative    pt-2 sm:pt-2 w-full mx-auto mb-10 space-y-4 overflow-hidden rounded-t  bg-[#fffefe] rounded-md">
                    {/* <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Add new bike</h1> */}
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                            <Label htmlFor="engineType" className=" text-[0.85rem]">
                                Engine type <span className="text-red-600">*</span>
                            </Label>
                            <Input name="engineType" onChange={handleEngineChange} value={engine?.engineType} id="engineType" placeholder="Enter engine type..." type="text" required className="py-[0.65rem] " />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="displacement" className=" text-[0.85rem]">
                                Displacement <span className="text-red-600">*</span>
                            </Label>
                            <Input name="displacement" onChange={handleEngineChange} value={engine?.displacement} id="displacement" placeholder="Enter displacement..." type="text" required className="py-[0.65rem] " />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="compressionRatio" className=" text-[0.85rem]">
                                Compression Ratio <span className="text-red-600">*</span>
                            </Label>
                            <Input name="compressionRatio" onChange={handleEngineChange} value={engine?.compressionRatio} id="compressionRatio" placeholder="Enter compression ratio..." type="text" required className="py-[0.65rem]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">

                        <div className="space-y-1">
                            <Label htmlFor="stroke" className=" text-[0.85rem]">
                                Stroke <span className="text-red-600">*</span>
                            </Label>
                            <Input name="stroke" onChange={handleEngineChange} value={engine?.stroke} id="stroke" placeholder="Enter stroke..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="startingMethod" className=" text-[0.85rem]">
                                Starting Method <span className="text-red-600">*</span>
                            </Label>
                            <Input name="startingMethod" onChange={handleEngineChange} value={engine?.startingMethod} id="startingMethod" placeholder="Enter starting method..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="fuelSystem" className=" text-[0.85rem]">
                                Fuel System <span className="text-red-600">*</span>
                            </Label>
                            <Input name="fuelSystem" onChange={handleEngineChange} value={engine?.fuelSystem} id="fuelSystem" placeholder="Enter fuel system..." type="text" required className="py-[0.65rem]" />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                            <Label htmlFor="maxPower" className=" text-[0.85rem]">
                                Max Power <span className="text-red-600">*</span>
                            </Label>
                            <Input name="maxPower" onChange={handleEngineChange} value={engine?.maxPower} id="maxPower" placeholder="Enter max power..." type="text" required className="py-[0.65rem] " />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="maxRpm" className=" text-[0.85rem]">
                                Max RPM <span className="text-red-600">*</span>
                            </Label>
                            <Input name="maxRpm" onChange={handleEngineChange} value={engine?.maxRpm} id="maxRpm" placeholder="Enter max RPM..." type="text" required className="py-[0.65rem]" />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="bore" className=" text-[0.85rem]">
                                Bore <span className="text-red-600">*</span>
                            </Label>
                            <Input name="bore" onChange={handleEngineChange} value={engine?.bore} id="bore" placeholder="Enter bore..." type="text" required className="py-[0.65rem]" />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Label htmlFor="maxTorque" className=" text-[0.85rem]">
                                Max Torque <span className="text-red-600">*</span>
                            </Label>
                            <Input name="maxTorque" onChange={handleEngineChange} value={engine?.maxTorque} id="maxTorque" placeholder="Enter max Torque..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="mileage" className=" text-[0.85rem]">
                                Mileage <span className="text-red-600">*</span>
                            </Label>
                            <Input name="mileage" onChange={handleEngineChange} value={engine?.mileage} id="mileage" placeholder="Enter mileage..." type="text" required className="py-[0.65rem]" />
                        </div>

                    </div>


                </div>
        },
        {
            id: "3",
            icon: ShieldCheck,
            title: "Other Details",
            // sub: "Add an extra layer of security to your account",
            content:
                <div className="relative    pt-2 sm:pt-2 w-full mx-auto mb-10 space-y-4 overflow-hidden  rounded-t  bg-[#fffefe] rounded-md">
                    {/* <h1 className="mx-auto mb-6 text-xl font-semibold w-fit">Add new bike</h1> */}
                    <h2 className='mx-auto font-semibold text-black w-fit'>Transmissions</h2>
                    <div className="grid grid-cols-1 gap-2 pb-4 border-b sm:gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Label htmlFor="clutchType" className=" text-[0.85rem]">
                                Clutch type <span className="text-red-600">*</span>
                            </Label>
                            <Input name="clutchType" onChange={handleTransmissionChange} value={transmission?.clutchType} id="clutchType" placeholder="Enter clutch type..." type="text" required className="py-[0.65rem] " />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="noOfGears" className=" text-[0.85rem]">
                                No. of gears <span className="text-red-600">*</span>
                            </Label>
                            <Input name="noOfGears" onChange={handleTransmissionChange} value={transmission?.noOfGears} id="noOfGears" placeholder="Enter no. of gears..." type="text" required className="py-[0.65rem] " />
                        </div>


                    </div>

                    <h2 className='mx-auto font-semibold text-black w-fit'>Frame & Suspension</h2>

                    <div className="grid grid-cols-1 gap-2 pb-4 border-b sm:gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                            <Label htmlFor="frameType" className=" text-[0.85rem]">
                                Frame Type <span className="text-red-600">*</span>
                            </Label>
                            <Input name="frameType" onChange={handleFrameAndSuspensionChange} value={frameAndSuspension?.frameType} id="frameType" placeholder="Enter frame type..." type="text" required className="py-[0.65rem] " />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="frontSuspension" className=" text-[0.85rem]">
                                Front Suspension <span className="text-red-600">*</span>
                            </Label>
                            <Input name="frontSuspension" onChange={handleFrameAndSuspensionChange} value={frameAndSuspension?.frontSuspension} id="frontSuspension" placeholder="Enter front suspension..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="rearSuspension" className=" text-[0.85rem]">
                                Rear Suspension <span className="text-red-600">*</span>
                            </Label>
                            <Input name="rearSuspension" onChange={handleFrameAndSuspensionChange} value={frameAndSuspension?.rearSuspension} id="rearSuspension" placeholder="Enter rear suspension..." type="text" required className="py-[0.65rem]" />
                        </div>


                    </div>

                    <h2 className='mx-auto font-semibold text-black w-fit'>Tyres & Brakes</h2>


                    <div className="grid grid-cols-1 gap-2 pb-4 border-b sm:gap-4 sm:grid-cols-4">
                        <div className="space-y-1">
                            <Label htmlFor="frontTyre" className=" text-[0.85rem]">
                                Front Tyre <span className="text-red-600">*</span>
                            </Label>
                            <Input name="frontTyre" onChange={handleTyresAndBrakesChange} value={tyresAndBrakes?.frontTyre} id="frontTyre" placeholder="Enter front tyre..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="rearTyre" className=" text-[0.85rem]">
                                Rear Tyre <span className="text-red-600">*</span>
                            </Label>
                            <Input name="rearTyre" onChange={handleTyresAndBrakesChange} value={tyresAndBrakes?.rearTyre} id="rearTyre" placeholder="Enter rear tyre..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="frontBrake" className=" text-[0.85rem]">
                                Front Brake <span className="text-red-600">*</span>
                            </Label>
                            <Input name="frontBrake" onChange={handleTyresAndBrakesChange} value={tyresAndBrakes?.frontBrake} id="frontBrake" placeholder="Enter front brake..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="rearBrake" className=" text-[0.85rem]">
                                Rear Brake <span className="text-red-600">*</span>
                            </Label>
                            <Input name="rearBrake" onChange={handleTyresAndBrakesChange} value={tyresAndBrakes?.rearBrake} id="rearBrake" placeholder="Enter rear brake..." type="text" required className="py-[0.65rem]" />
                        </div>

                    </div>


                    <h2 className='mx-auto font-semibold text-black w-fit'>Electronics</h2>

                    <div className="grid grid-cols-1 gap-2 pb-4 border-b sm:gap-4 sm:grid-cols-4">
                        <div className="space-y-1">
                            <Label htmlFor="headLights" className=" text-[0.85rem]">
                                Head Lights <span className="text-red-600">*</span>
                            </Label>
                            <Input name="headLights" onChange={handleElectronicsChange} value={electronics?.headLights} id="headLights" placeholder="Enter head lights..." type="text" required className="py-[0.65rem] " />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="tailLights" className=" text-[0.85rem]">
                                Tail Lights <span className="text-red-600">*</span>
                            </Label>
                            <Input name="tailLights" onChange={handleElectronicsChange} value={electronics?.tailLights} id="tailLights" placeholder="Enter tail lights..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="winkers" className=" text-[0.85rem]">
                                Winkers <span className="text-red-600">*</span>
                            </Label>
                            <Input name="winkers" onChange={handleElectronicsChange} value={electronics?.winkers} id="winkers" placeholder="Enter winkers..." type="text" required className="py-[0.65rem]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="battery" className=" text-[0.85rem]">
                                Battery <span className="text-red-600">*</span>
                            </Label>
                            <Input name="battery" onChange={handleElectronicsChange} value={electronics?.battery} id="battery" placeholder="Enter battery..." type="text" required className="py-[0.65rem]" />
                        </div>


                    </div>



                </div>
        },

    ];


    return (
        <div className="relative w-full  p-4 sm:p-6  pt-2 sm:pt-2  mx-auto mb-10 space-y-4 overflow-hidden rounded-t shadow-lg bg-[#fffefe] rounded-md">
            {isLoading && <Loaders isLoading={isLoading} />}

            <Accordion type="single" className="w-full" defaultValue="1">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id} className="py-2">
                        <AccordionPrimitive.Header className="flex">
                            <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&[data-state=open]>svg]:rotate-180">
                                <span className="flex items-center gap-3">
                                    <span
                                        className="flex items-center justify-center border border-gray-200 rounded-full size-8 shrink-0 dark:border-gray-800"
                                        aria-hidden="true"
                                    >
                                        <item.icon size={16} strokeWidth={2} className="opacity-60" />
                                    </span>
                                    <span className="flex gap-1 space-y-1">
                                        <span>{item.title}</span>
                                        <span className="text-red-600">*</span>
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
            </Accordion>
            <div className='flex items-center justify-between gap-3'>
                <button onClick={handleBack} className="relative mb-4 w-fit flex items-center justify-center px-4 gap-3 py-2.5 text-sm text-white transition duration-200 bg-neutral-700 rounded-md top-2">
                    <FaBackward /> Back
                </button>
                <button onClick={handleSubmit} className="relative mb-4 w-fit flex items-center justify-center px-4 gap-3 py-2.5 text-sm text-white transition duration-200 bg-red-600 rounded-md top-2">
                    Edit Specs <FaForward />
                </button>
            </div>
        </div>
    )
}

export default EditBikeSpecs


