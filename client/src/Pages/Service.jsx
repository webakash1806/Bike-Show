import { HeroHighlight } from '@/components/ui/hero-highlight'
import React, { useId, useRef, useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Cover } from '@/components/ui/cover'
import { FcSpeaker } from 'react-icons/fc'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IoMdInformationCircleOutline, IoMdSpeedometer } from 'react-icons/io'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SelectNative } from '@/components/ui/select-native'
import HomeLayout from '@/Layout/HomeLayout'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const invoices = [

    {
        service: "1st Free Service",
        kms: "750 kms - 1000 kms",
        days: "15 - 30 days",
    },
    {
        service: "2nd Free Service",
        kms: "5500 kms - 6000 kms",
        days: "165 - 180 days",
    },
    {
        service: "3rd Free Service",
        kms: "11500 kms - 12000 kms",
        days: "350 - 365 days",
    },
    {
        service: "PAID Service",
        kms: "Every 6000 kms",
        days: "Every 180 days",
    },
]

function ServiceTable() {

    const text = `नि:शुल्क सेवा का मतलब है कि आवधिक रखरखाव कार्यों के लिए श्रम शुल्क लागू नहीं होता है। ईंधन फ़िल्टर, एयर क्लीनर एलीमेंट, इंजन ऑयल, ग्रीस, सस्पेंशन ऑयल जैसी उपभोग्य वस्तुओं पर लागू नहीं।`;

    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = () => {
        if ("speechSynthesis" in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                const utterance = new SpeechSynthesisUtterance(text);

                utterance.lang = "hi-IN";
                utterance.rate = 1;
                utterance.pitch = 1;

                window.speechSynthesis.speak(utterance);

                setIsSpeaking(true);

                utterance.onend = () => {
                    setIsSpeaking(false);
                };
            }
        } else {
            alert("Text-to-Speech is not supported in your browser.");
        }
    };

    return (
        <Table className="border rounded-md">
            <TableHeader className="rounded-t-md">
                <TableHead className="rounded-t-md  sm:w-[200px]">Service</TableHead>
                <TableHead className="min-w-[100px]  sm:w-[200px]">Kms</TableHead>
                <TableHead className="text-right max-w-[100px]  sm:w-[200px]">Days</TableHead>
            </TableHeader>
            <TableBody>
                {invoices.map((service) => (
                    <TableRow key={service.service}>
                        <TableCell className="font-medium">{service.service}</TableCell>
                        <TableCell>{service.kms}</TableCell>
                        <TableCell className="text-right">{service.days}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow >
                    <TableCell colSpan={3}>
                        <p className='flex gap-2 py-2 font-normal tracking-wide text-neutral-300 text-[0.75rem]'>
                            <div className=' min-w-[1.3rem] mt-[0.05rem]'><IoMdInformationCircleOutline className='text-[1.3rem]' />
                                <FcSpeaker className='text-[1.3rem]' onClick={handleSpeak} />
                            </div>
                            Free Service means no labour charges applicable for Periodic maintenance jobs. Consumable like Fuel Filter, Air Cleaner Element, Engine Oil, Grease, Suspension Oil etc.</p>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

const ServiceForm = () => {
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
                    Book Service
                </span>
            </button>



        </form>
    )
}

const Service = () => {
    const navigate = useNavigate();

    return (
        <HomeLayout>
            <HeroHighlight className={"min-h-fit"}>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}

                    className="max-w-4xl px-2 mx-auto sm:px-4 ">
                    <p className="text-xl font-semibold leading-relaxed text-center text-transparent md:text-3xl lg:leading-snug bg-clip-text bg-gradient-to-b from-neutral-400 via-neutral-300 to-white ">
                        Experience the best-in-class servicing for your Honda bike or scooter with our trained technicians, genuine parts, and latest technology. Schedule your appointment today and experience the Honda difference.
                    </p>
                    <div className='mt-6 rounded-md'>
                        <ServiceTable />
                    </div>
                    <div onClick={() => navigate("/contact")} className="mx-auto mt-4 text-sm w-fit">
                        <button className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer group bg-slate-800 shadow-zinc-900">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative z-10 flex items-center px-4 py-2 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                                <span>
                                    Contact us
                                </span>
                                <MdOutlineKeyboardArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                        </button>
                    </div>

                </motion.h1>
            </HeroHighlight>
            {/* <div ref={formRef} className=" w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                <ServiceForm />
            </div> */}
        </HomeLayout>
    )
}

export default Service
