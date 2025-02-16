import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, ModalTrigger } from "@/components/ui/animated-modal";
import SearchModal from "@/components/comp-27";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const routes = [
    { name: "Home", href: "/", isActive: true },
    { name: "Bikes", href: "/bike", isActive: false },
    { name: "Scooty", href: "/scooty", isActive: false },
    { name: "Accessories", href: "/accessories", isActive: false },
    { name: "Contact", href: "/contact", isActive: false },
    { name: "About", href: "/about-us", isActive: false },
];

const NavMenu = ({ routes, isOpen, setIsOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <ul
            className={`flex flex-col lg:flex-row lg:justify-center px-3 pt-10 lg:pt-0 lg:items-center text-3xl lg:text-base lg:gap-3 text-[1rem] fixed z-[10000] top-20 right-0 w-[16rem] h-screen lg:static lg:h-auto  lg:w-fit lg:bg-transparent bg-mainBg text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
                }`}
            id="navbar"
        >
            {routes.map((route, i) => (
                <li key={i}>
                    <Link
                        onClick={() => {
                            setIsOpen(false);
                            routes.forEach((r) => (r.isActive = false));
                            route.isActive = true;
                        }}
                        className={`px-2 hover:text-red-500 lg:hover:text-red-100 ${route.isActive
                            ? "opacity-100 font-bold text-red-500 lg:text-red-100"
                            : "opacity-90 hover:opacity-100"
                            }`}
                        to={route.href}
                    >
                        {route.name}
                    </Link>
                </li>
            ))}
            <li className="relative" ref={dropdownRef}>
                <button
                    className="flex items-center gap-1 px-2 text-white hover:text-red-500 lg:hover:text-red-100"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}

                >
                    Services
                    <MdArrowDropDown />
                </button>
                <ul
                    className={`absolute lg:left-0 right-0 w-52 lg:mt-[0.95rem] duration-500 lg:rounded-t-none lg:bg-mainRed bg-neutral-900 text-white rounded-lg shadow-lg transition-transform  ease-in-out ${isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                        }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="service-dropdown"
                    onClick={() => setIsOpen(false)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <li role="menuitem">
                        <Link
                            className="block px-4 py-3 text-sm transition-all hover:rounded-lg text-neutral-100 border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed hover:bg-neutral-800 hover:scale-[1.02]"
                            to="/service"
                        >
                            Vehicle Services
                        </Link>
                    </li>
                    <li role="menuitem">
                        <Link
                            className="block px-4 py-3 text-sm transition-all hover:rounded-lg text-neutral-100 border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed hover:bg-neutral-800 hover:scale-[1.02]"
                            to="/exchange"
                        >
                            Exchange
                        </Link>
                    </li>
                    <li role="menuitem">
                        <Link
                            className="block px-4 py-3 text-sm transition-all hover:rounded-lg text-neutral-100 border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed hover:bg-neutral-800 hover:scale-[1.02]"
                            to="/finance"
                        >
                            Finance
                        </Link>
                    </li>

                </ul>
            </li>
        </ul>
    );
};


NavMenu.propTypes = {
    routes: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[10000] py-4 bg-mainBg text-zinc-900">
            <div className="mx-auto bg-mainRed relative z-[100000000]">
                <div className="container relative flex lg:py-1 items-center justify-between mx-auto lg:max-w-[95%]">
                    <Link
                        to={"/"}
                        className="absolute text-3xl bg-black font-white"
                        href="#!"
                    >
                        <img
                            src="https://www.honda2wheelersindia.com/assets/images/LogoHondaNew_24.png"
                            className="w-[5rem] lg:w-[6rem]"
                            alt=""
                        />
                    </Link>
                    <div className="flex flex-row items-center gap-3 p-2 ml-auto lg:flex-row-reverse">
                        <div onClick={() => setIsOpen(false)}>
                            <Modal>
                                <ModalTrigger>
                                    <FaSearch className="w-5 h-5 text-white" />
                                </ModalTrigger>
                                <SearchModal />
                            </Modal>
                        </div>
                        <button
                            className="z-20 block cursor-pointer size-10 lg:hidden"
                            type="button"
                            id="hamburger"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <>
                                    <div className="h-0.5 w-7 bg-white mb-1" />
                                    <div className="h-0.5 w-7 bg-white mb-1" />
                                    <div className="h-0.5 w-7 bg-white" />
                                </>
                            )}
                        </button>
                        <NavMenu routes={routes} isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
