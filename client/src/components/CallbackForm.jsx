import React, { useId, useState } from 'react'
import { ModalBody, ModalContent, ModalFooter } from '@/components/ui/animated-modal'
import { SelectNative } from './ui/select-native';
import { Label } from './ui/label';
import { Input } from './ui/input';




const CallbackForm = () => {

    const id = useId();
    const [date, setDate] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <ModalBody className={"max-w-[26rem] md:max-w-[30rem]"}>
                <ModalFooter>
                    <h4 className="mx-auto text-lg font-bold text-center md:text-2xl text-neutral-100">
                        Request{" "}
                        <span className="px-1 py-0.5 rounded-md bg-neutral-800 border-neutral-700 border ">
                            Callback
                        </span>{" "}
                        now!
                    </h4>
                </ModalFooter>
                <div className="flex items-center justify-center">
                </div>

                <form noValidate className="relative w-full p-2 pb-4 mx-auto space-y-3 overflow-hidden rounded-md sm:p-6">
                    <div className="grid grid-cols-1 gap-2">
                        <div className="space-y-1">
                            <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                                Customer Name <span className="text-destructive">*</span>
                            </Label>
                            <Input id={id} placeholder="Enter full name..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                                Phone Number <span className="text-destructive">*</span>
                            </Label>
                            <Input id={id} placeholder="Enter phone number..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <div className="space-y-1">
                            <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                                Customer Email <span className="text-destructive">*</span>
                            </Label>
                            <Input id={id} placeholder="Enter email..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                                Enquiry reason <span className="text-destructive">*</span>
                            </Label>
                            <SelectNative id={id} className="border rounded-md border-neutral-800 text-neutral-200">
                                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="1">Service</option>
                                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="2">Finance</option>
                                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="3">Exchange</option>
                                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="4">Bike Enquiry</option>
                                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="4">Scooty Enquiry</option>
                            </SelectNative>
                        </div>

                    </div>

                </form>
                <ModalFooter className="gap-4">
                    <button className="w-24 px-2 py-1 text-sm text-white bg-black border border-black rounded-md">
                        Cancel
                    </button>
                    <button className="w-[10rem] px-8 py-[0.4rem] text-sm text-white transition duration-200 border rounded-md  bg-mainRed border-neutral-800">
                        <div className="absolute inset-x-0 w-1/3 h-px mx-auto shadow-2xl -top-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                        <span className="relative z-20">
                            Book Service
                        </span>
                    </button>
                </ModalFooter>
            </ModalBody>

        </div >
    )
}

export default CallbackForm
