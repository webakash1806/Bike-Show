import React, { useEffect, useState } from "react";

import { FaEnvelopeOpenText, FaHdd, FaPhoneAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import ShineBorder from "@/components/ui/shine-border";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Link } from "react-router-dom";
import HomeLayout from "@/Layout/HomeLayout";
import { Label } from "recharts";
import { SelectNative } from "@/components/ui/select-native";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddContactFormMutation } from "@/Redux/AllApi/FormApi";
import { toast } from "sonner";
import MyReCaptchaProvider from "@/components/MyRecaptchaProvider";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useVerifyCaptchaMutation } from "@/Redux/AllApi/BikeApi";
import { FaSpinner } from "react-icons/fa6";

const contactInfoList = [
    {
        icon: FaEnvelopeOpenText,
        label: "email@honda.com",
        href: "mailto:email@honda.com",
    },
    {
        icon: FaPhoneAlt,
        label: "+880 1742-0****0",
        href: "callto:+880 1742-0****0",
    },
    { icon: FaHdd, label: "honda.com", href: "honda.com" },
];

const ContactForm = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    useEffect(() => {
        if (!executeRecaptcha) {
            console.error("reCAPTCHA not ready yet.");
        }
    }, [executeRecaptcha]);

    const [verifyCaptcha, { isLoading: isVerifying }] = useVerifyCaptchaMutation()


    const [addContactForm, { isLoading }] = useAddContactFormMutation()

    const [contactData, setContactData] = useState({ name: "", dealer: "", email: "", phoneNumber: "", message: "" });

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setContactData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log(isLoading)

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not loaded. Please refresh and try again.");
            return;
        }

        const token = await executeRecaptcha("onSubmit");
        console.log("object")
        console.log(token)
        const res = await verifyCaptcha({ token });
        console.log(res)

        if (!res?.data?.success) {
            toast.error("reCAPTCHA verification failed. Please try again.");
            return;
        }

        const { name, dealer, email, phoneNumber, message } = contactData;

        if (!name || !email || !phoneNumber || !dealer || !message) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        const response = await addContactForm(contactData)

        if (response?.data?.success) {
            setContactData({ name: "", dealer: "", email: "", phoneNumber: "", message: "" });
        }

    };

    return (
        <form className="space-y-2" noValidate onSubmit={handleSubmit}>

            <Input value={contactData.name} onChange={handleValueChange} id={"name"} name={"name"} placeholder="Enter full name..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />

            <Input id={"email"} value={contactData.email} onChange={handleValueChange} name={"email"} placeholder="Enter email..." type="email" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />

            <Input value={contactData.phoneNumber} onChange={handleValueChange} id={"phoneNumber"} name={"phoneNumber"} placeholder="Enter phone number..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />


            <SelectNative id={"dealer"} value={contactData.dealer} onChange={handleValueChange} name={"dealer"} className="border rounded-md border-neutral-800 text-neutral-200">
                <option className='text-[0.85rem] tracking-wide text-neutral-500' value="">Select Dealer</option>
                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Islampur">Big Swing Honda Islampur</option>
                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Chakkarpur">Big Swing Honda Chakkarpur</option>
                <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Badshahpur">Big Swing Honda Badshahpur</option>
            </SelectNative>


            <Textarea id={"message"} value={contactData.message} onChange={handleValueChange} name={"message"} className="[resize:none] py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" placeholder="Leave a comment" />

            <div className="flex items-center p-2 my-4 space-x-2 font-semibold bg-white border border-gray-300 rounded-md shadow-md w-fit bottom-2 left-2">
                <img
                    src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                    alt="reCAPTCHA Logo"
                    className="w-6 h-6 animate-spin"
                />

                <p className="text-xs text-gray-600">
                    Protected by reCAPTCHA.
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-600 hover:underline"
                    >
                        Privacy
                    </a> |
                    <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-600 hover:underline"
                    >
                        Terms
                    </a>
                </p>
            </div>

            <button type="submit" disabled={isLoading} className="relative w-full px-8 py-2 text-sm text-white transition duration-200 border rounded-md bg-mainRed border-neutral-800">
                <div className="absolute inset-x-0 w-1/3 h-px mx-auto shadow-2xl -top-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20 flex items-center justify-center gap-4">

                    {
                        isLoading ? (
                            <FaSpinner className="animate-spin" />
                        ) :
                            "Contact"
                    }
                </span>
            </button>
        </form>
    );
};

const ContactFormCard = () => (
    <ShineBorder className="w-full max-w-[30rem] bg-black rounded-2xl"
        color={["#9C9A92", "#171717", "#808080"]}
        borderWidth={1.4}
    >
        <div className="w-full p-6 shadow-xl bg-neutral-950 rounded-2xl">
            <h2 className="text-2xl md:text-[35px] leading-none font-semibold mb-2">
                Contact Us
            </h2>
            <p className="mb-6 text-md">
                We list your menu online, help you process orders.
            </p>
            <MyReCaptchaProvider>
                <ContactForm />
            </MyReCaptchaProvider>
        </div>
    </ShineBorder>
);

const ContactInfo = ({ contactInfoList }) => (
    <div className="mt-5 pt-md-4">
        {contactInfoList.map((info, i) => (
            <ShineBorder className="shadow cursor-pointer bg-neutral-950 max-w-[30rem] w-full flex items-center rounded-lg p-5 py-4 mt-4"
                key={i}
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={1.1}
            >

                {info.icon && <info.icon className="px-2 text-3xl" />}
                <i className="px-2 text-3xl fas fa-envelope-open-text"></i>
                <Link className="ml-4 text-lg font-medium" to={info.href || "#!"}>
                    {info.label}
                </Link>
            </ShineBorder>
        ))}
    </div>
);

ContactInfo.propTypes = {
    contactInfoList: PropTypes.array.isRequired,
};

const Contact = () => {
    return (
        <HomeLayout>
            <section className="overflow-hidden text-neutral-300 ezy__contact9 light bg-mainBg">
                <div className="container relative px-4 pt-10 mx-auto lg:px-36">
                    <div className="grid relative z-[20]  w-fit mx-auto grid-cols-12 py-6 lg:gap-8">
                        <div className="col-span-12 mb-12 lg:col-span-5 lg:mb-0">

                            <h2 className="text-3xl md:leading-[3.8rem]  text-transparent md:text-[45px] bg-clip-text bg-gradient-to-b from-white to-neutral-500 font-bold mb-6 ">
                                How can we help you?
                            </h2>
                            <p className="text-md max-w-[30rem] w-full text-neutral-300">
                                It’s easier to reach your savings goals when you have the right
                                savings account. Take a look and find the right one for you!
                            </p>

                            <ContactInfo contactInfoList={contactInfoList} />
                        </div>

                        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                            <ContactFormCard />
                        </div>

                    </div>
                    <BackgroundBeams />
                </div>
            </section>
        </HomeLayout>
    );
};

export default Contact
