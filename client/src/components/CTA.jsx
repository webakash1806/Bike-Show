import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { Modal, ModalTrigger } from "@/components/ui/animated-modal";
import ProductEnquiryForm from "@/components/ProductEnquiryForm";
import CallbackForm from "@/components/CallbackForm";
import QuoteForm from "@/components/QuoteForm";
import { Link } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FaArrowRight, FaSpinner } from "react-icons/fa6";
import { useAddNewsletterMutation } from "@/Redux/AllApi/BikeApi";

const BentoGridSecondDemo = () => {

    const [email, setEmail] = useState('');

    const [addNewsletter, { isLoading }] = useAddNewsletterMutation()

    const handleSubmit = async () => {

        const res = await addNewsletter({ email })

        if (res?.data?.success) setEmail('')
    }


    const items = [
        {
            title: "The Dawn of Innovation",
            description: "Explore the birth of groundbreaking ideas and inventions.",
            header: <div className="p-4 bg-gradient-to-br from-transparent to-[#ff000035] flex-col h-full flex sm:flex-row gap-4 justify-between text-white">
                <div>
                    <div className="p-2 py-1 font-sans text-[0.8rem] font-semibold border-[1.2px] rounded-full w-fit text-[#DD2828] bg-[#ff000017] border-[#dd282899]">Book Test Drive</div>
                    <div className="font-bold text-[1.8rem] tracking-wide ">Book <span className="text-[#ff4040]">Test</span> Drive</div>
                    <p className="text-sm text-neutral-300 mb-4 max-w-[28rem]">Get ready to ride the world with Honda&apos;s latest and most powerful scooter, the X-ADV. Book your test drive today and experience the thrill of riding the two-wheeler that's taking the world by storm!</p>
                    <Link to={"/book-test-drive"} className="ml-4 text-sm w-fit">

                        <div className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.8)_0%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative z-10 flex items-center px-4 py-1 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                                <span>
                                    Book Now
                                </span>
                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-60" />
                        </div>

                    </Link>
                </div>
                <img className="h-[11rem] w-fit hidden sm:block rounded-md" src="https://img.freepik.com/free-photo/motorcycle-driving-school_342744-696.jpg?uid=R55011592&ga=GA1.1.774467265.1732693696&semt=ais_hybrid" alt="" />
            </div>,
            className: "md:col-span-2",
            icon: <IconClipboardCopy className="w-4 h-4 text-neutral-500" />,
        },
        {
            title: "The Digital Revolution",
            description: "Dive into the transformative power of technology.",
            header: <div className="p-4  bg-gradient-to-tr from-transparent to-[#5526e043] flex-col flex   justify-between text-white h-full">
                <div className="space-y-1">
                    <div className="p-2 py-1 font-sans text-[0.8rem] font-semibold border-[1.2px] rounded-full w-fit text-[#7043f6] bg-[#7043f610] border-[#7043f6]">Newsletter</div>
                    <div className="font-bold text-[1.8rem] tracking-wide ">Subscribe to <span className="text-[#7043f6]">Newsletter</span></div>
                    <p className="text-sm text-neutral-300">
                        Don't miss out on our latest news, offers, and updates.

                    </p>


                    <div className="flex items-center justify-center p-0.5  rounded-md bg-[#7043f6]">

                        <Input placeholder="Enter your email..." type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                        <button disabled={isLoading} onClick={() => handleSubmit()} className="bg-[#7043f6] p-2">
                            {
                                isLoading ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <FaArrowRight />
                                )
                            }
                        </button>
                    </div>


                </div>

            </div>,
            className: "md:col-span-1",
            icon: <IconFileBroken className="w-4 h-4 text-neutral-500" />,
        },
        {
            title: "The Art of Design",
            description: "Discover the beauty of thoughtful and functional design.",
            header: <div className="p-4 bg-gradient-to-br from-transparent to-[#00ff5935] flex-col flex  gap-4 justify-between text-white h-full">
                <div>
                    <div className="p-2 py-1 font-sans text-[0.8rem] font-semibold border-[1.2px] rounded-full w-fit text-[#23C45C] bg-[#23C45C10] border-[#23C45C]">Exchange</div>
                    <div className="font-bold text-[1.8rem] tracking-wide ">Request a <span className="text-[#23C45C]">Exchange</span></div>
                    <p className="text-sm text-neutral-300">At BigSwing Honda, we offer the best exchange services for your old bikes and scooters.</p>
                    <div className="mt-4 text-sm w-fit">
                        <Modal>
                            <ModalTrigger>
                                <div className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.8)_0%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    </span>
                                    <div className="relative z-10 flex items-center px-4 py-1 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                                        <span>
                                            Exchange

                                        </span>
                                    </div>
                                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-60" />
                                </div>
                            </ModalTrigger>
                            <QuoteForm />
                        </Modal>
                    </div>
                </div>

            </div>,
            className: "md:col-span-1",
            icon: <IconSignature className="w-4 h-4 text-neutral-500" />,
        },
        {
            title: "The Power of Communication",
            description:
                "Understand the impact of effective communication in our lives.",
            header: <div className="p-4 bg-gradient-to-br from-transparent to-[#f985004d] flex-col flex sm:flex-row gap-4 justify-between text-white">
                <div>
                    <div className="p-2 py-1 font-sans text-[0.8rem] font-semibold border-[1.2px] rounded-full w-fit text-[#CE7712] bg-[#CE771210] border-[#ce7612d5]">Product Enquiry</div>
                    <div className="font-bold text-[1.8rem] tracking-wide ">Get <span className="text-[#ff961e]">Product</span> Enquiry</div>
                    <p className="text-sm text-neutral-300 max-w-[28rem]">Get a product enquiry for the Honda X-ADV, the latest and most powerful scooter. We'll get back to you with a quote and answer any questions you may have.</p>
                    <div className="mt-4 text-sm w-fit">

                        <div className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.8)_0%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <Link to={"/enquiry"} className="relative z-10 flex items-center px-4 py-1 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                                <span>
                                    Get Product Enquiry
                                </span>
                            </Link>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-60" />
                        </div>
                    </div>
                </div>
                <img className="h-[11rem] w-fit hidden sm:block rounded-md" src="https://img.freepik.com/free-photo/front-view-young-female-motorcycle-holding-note-signature-white-wall_179666-45573.jpg?uid=R55011592&ga=GA1.1.774467265.1732693696&semt=ais_hybrid" alt="" />
            </div>,
            className: "md:col-span-2",
            icon: <IconTableColumn className="w-4 h-4 text-neutral-500" />,
        },
    ];

    return (
        (<BentoGrid className="mx-auto mb-10 max-w-7xl ">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon} />
            ))}
        </BentoGrid>)
    );
}





export default BentoGridSecondDemo
