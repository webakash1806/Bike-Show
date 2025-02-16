import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useId, useRef, useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { SelectNative } from '@/components/ui/select-native';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import HomeLayout from '@/Layout/HomeLayout';
import { useNavigate } from 'react-router-dom';

const ExchangeForm = () => {
    const id = useId();
    const [date, setDate] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form noValidate className="relative w-[94vw] sm:w-[96vw] mt-12 p-4 sm:p-6 pb-4 sm:max-w-[50rem] max-w-[28rem] mx-auto mb-10 space-y-3 overflow-hidden border-2 border-neutral-700 bg-[#121212] rounded-md">
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
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
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Customer Email <span className="text-destructive">*</span>
                    </Label>
                    <Input id={id} placeholder="Enter email..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                </div>

                <div className="space-y-1">
                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Vehicle Condition <span className="text-destructive">*</span>
                    </Label>
                    <SelectNative id={id} className="border rounded-md border-neutral-800 text-neutral-200">
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="1">React</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="2">Vue</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="3">Angular</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="4">Node.js</option>

                    </SelectNative>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Select vehicle <span className="text-destructive">*</span>
                    </Label>
                    <SelectNative id={id} className="border rounded-md border-neutral-800 text-neutral-200">
                        <optgroup className='text-neutral-500' label="Scooty">
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="1">React</option>
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="2">Vue</option>
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="3">Angular</option>
                        </optgroup>
                        <optgroup label="Bikes" className='text-neutral-500'>
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="4">Node.js</option>
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="5">Python</option>
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="6">Java</option>
                        </optgroup>
                    </SelectNative>
                </div>
                <div className="space-y-1">
                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Select model <span className="text-destructive">*</span>
                    </Label>
                    <SelectNative id={id} className="border rounded-md border-neutral-800 text-neutral-200">
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="1">React</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="2">Vue</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="3">Angular</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="4">Node.js</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="5">Python</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="6">Java</option>
                    </SelectNative>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-3">
                <div className="space-y-1">

                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Date of registration <span className="text-destructive">*</span>
                    </Label>
                    <Popover>

                        <PopoverTrigger asChild>

                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full bg-mainBg py-[0.65rem] border border-neutral-800 text-neutral-200 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-1">
                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">Total distance travelled</Label>
                    <div className="relative flex border rounded-lg border-neutral-800">

                        <Input
                            id={id}
                            className="py-[0.65rem] bg-mainBg border-none rounded-l-md text-neutral-200"
                            placeholder="Total Distance..."
                            type="number"
                        />
                        <span className="z-10 inline-flex items-center px-3 text-sm font-semibold tracking-wider rounded-e-lg bg-neutral-900 text-neutral-300">
                            KM
                        </span>
                    </div>
                </div>
                <div className="space-y-1">

                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Date of Service <span className="text-destructive">*</span>
                    </Label>
                    <Popover>

                        <PopoverTrigger asChild>

                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full bg-mainBg py-[0.65rem] border border-neutral-800 text-neutral-200 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className='space-y-1'>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-neutral-400"
                >
                    Product description
                </label>
                <Textarea id={id} className="[resize:none] py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" placeholder="Leave a comment" />

            </div>

            <button className="relative w-full px-8 py-3 text-sm text-white transition duration-200 border rounded-md top-2 bg-mainRed border-neutral-800">
                <div className="absolute inset-x-0 w-1/3 h-px mx-auto shadow-2xl -top-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20">
                    Book Exchange
                </span>
            </button>



        </form>
    )
}

const Exchange = () => {
    const formRef = useRef(null)

    const navigate = useNavigate()

    return (
        <HomeLayout>
            <BackgroundBeamsWithCollision>
                <h2 className="relative z-20 font-sans text-2xl font-bold tracking-tight text-center text-white md:text-4xl lg:text-7xl">
                    <h2 className="relative z-10 mb-4 font-sans text-4xl font-bold tracking-wide text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-white to-neutral-600">
                        EXCHANGE
                    </h2>
                    <div className="relative mx-auto inline-block  [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <p className="max-w-2xl px-4 m-4 mx-auto text-sm font-semibold tracking-wide text-center text-neutral-300">
                            At BigSwing Honda, we offer the best exchange services for your old bikes and scooters.
                            With our transparent exchange process, you can get a fair price for your old vehicle and upgrade to a new one.
                            Whether you are looking to upgrade to a latest model or want to exchange your old vehicle for a new one, we have got you covered.
                        </p>
                        <p className="max-w-2xl px-4 mx-auto my-4 text-sm font-semibold tracking-wide text-center text-neutral-300">
                            Even if your vehicle is currently not ensured, we have the facility to restart insurance of old vehicle.
                        </p>

                        <div onClick={() => navigate('/contact')} className="mx-auto mt-4 text-sm w-fit">
                            <button className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
                                <span className="absolute inset-0 overflow-hidden rounded-full">
                                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(248,0,0,0.6)_0%,rgba(248,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </span>
                                <div className="relative z-10 flex items-center px-4 py-2 space-x-2 tracking-wider rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                                    <span>
                                        Contact us
                                    </span>
                                    <MdOutlineKeyboardArrowRight className="w-5 h-5" />
                                </div>
                                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                            </button>
                        </div>
                    </div>
                </h2>
            </BackgroundBeamsWithCollision>
            {/* <div ref={formRef} className=" w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                <ExchangeForm />
            </div> */}
        </HomeLayout>
    )
}

export default Exchange
