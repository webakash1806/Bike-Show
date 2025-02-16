"use client";
import { ReactNode, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
} from "@tabler/icons-react";
import { RiEBike2Line, RiMotorbikeFill } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slice/AuthSlice";
import { FaPlus, FaTools, FaWpforms } from "react-icons/fa";

export function HomeLayout({ children }: { children: ReactNode }) {
    const links = [
        {
            label: "Dashboard",
            href: "/",
            icon: (
                <IconBrandTabler className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },
        {
            label: "Add Accessories",
            href: "/add-accessories",
            icon: (
                <FaPlus className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },
        {
            label: "All Accessories",
            href: "/all-accessories",
            icon: (
                <FaTools className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },
        {
            label: "Add Scooty",
            href: "/add-scooty",
            icon: (
                <FaPlus className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },
        {
            label: "All Scooty",
            href: "/all-scooty",
            icon: (
                <RiEBike2Line className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },
        {
            label: "Add Bike",
            href: "/add-bike",
            icon: (
                <FaPlus className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },

        {
            label: "All Bike",
            href: "/all-bike",
            icon: (
                <RiMotorbikeFill className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },

        {
            label: "All Forms",
            href: "/all-forms",
            icon: (
                <FaWpforms className="flex-shrink-0 w-5 h-5 text-neutral-200" />
            ),
        },


    ];

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await dispatch(logout() as any)
        if (res?.payload?.success) {
            navigate('/login')
        }
    }

    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-white  flex-1 w-full mx-auto border border-neutral-700 overflow-hidden",
                "min-h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-6  w-[18rem]">
                    <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto ">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="flex flex-col gap-2 mt-8">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>

                    </div>
                    <div onClick={handleLogout} className="flex items-center justify-center gap-4 p-2 text-white bg-red-500 rounded">
                        <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-200" />
                        {open && "Logout"}
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="w-full min-h-screen md:pl-16 bg-gradient-to-b from-neutral-300 to-neutral-100">
                {children}
            </div>
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            to="#"
            className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
        >
            <div className="flex-shrink-0 w-6 h-5 bg-white rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-white whitespace-pre"
            >
                Big Swing Honda
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            to="#"
            className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
        >
            <div className="flex-shrink-0 w-6 h-5 bg-white rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg" />
        </Link>
    );
};


