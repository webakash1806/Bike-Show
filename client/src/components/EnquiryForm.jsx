import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { SelectNative } from './ui/select-native'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { useGetAllBikeModelsQuery, useGetAllScootyModelsQuery, useVerifyCaptchaMutation } from '@/Redux/AllApi/BikeApi'
import { toast } from 'sonner'
import { useAddProductEnquiryFormMutation } from '@/Redux/AllApi/FormApi'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import MyReCaptchaProvider from './MyRecaptchaProvider'
import { FaSpinner } from 'react-icons/fa6'

const EnquiryForm = ({ vehicleType, model }) => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    useEffect(() => {
        if (!executeRecaptcha) {
            console.error("reCAPTCHA not ready yet.");
        }
    }, [executeRecaptcha]);

    const [message, setMessage] = useState("");
    const [addProductEnquiryForm, { isLoading }] = useAddProductEnquiryFormMutation()

    const [verifyCaptcha, { isLoading: isVerifying }] = useVerifyCaptchaMutation()
    const [enquiryData, setEnquiryData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        model: model || '',
        dealer: '',
        category: vehicleType || '',
        message: ''
    })

    const { data } = useGetAllBikeModelsQuery();
    const { data: scootyModel } = useGetAllScootyModelsQuery();
    console.log(scootyModel)
    console.log(data)



    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setEnquiryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log(enquiryData)

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(executeRecaptcha)
        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not loaded. Please refresh and try again.");
            return;
        }

        try {
            const token = await executeRecaptcha("onSubmit");
            console.log(token)
            const res = await verifyCaptcha({ token });

            if (!res?.data?.success) {
                toast.error("reCAPTCHA verification failed. Please try again.");
                return;
            }

            if (!enquiryData?.name || !enquiryData?.phoneNumber || !enquiryData?.email || !enquiryData?.category || !enquiryData?.dealer || !enquiryData?.model) {
                toast.error("Please fill in all the fields.");
                return;
            }

            const response = await addProductEnquiryForm(enquiryData).unwrap();

            if (response?.data?.success) {
                setEnquiryData({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    model: '',
                    dealer: '',
                    category: '',
                    message: ''
                });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };


    console.log(isLoading)

    return (
        <form className='' onSubmit={handleSubmit} noValidate >
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor={"name"} className="text-neutral-400 text-[0.85rem]">
                        Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input value={enquiryData.name} onChange={handleValueChange} id={"name"} name={"name"} placeholder="Enter full name..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"phoneNumber"} className="text-neutral-400 text-[0.85rem]">
                        Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input value={enquiryData.phoneNumber} onChange={handleValueChange} id={"phoneNumber"} name={"phoneNumber"} placeholder="Enter phone number..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor={"email"} className="text-neutral-400 text-[0.85rem]">
                        Your Email <span className="text-destructive">*</span>
                    </Label>
                    <Input id={"email"} value={enquiryData.email} onChange={handleValueChange} name={"email"} placeholder="Enter email..." type="email" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                </div>
                <div className="space-y-1">

                    <Label htmlFor={"dealer"} className="text-neutral-400 text-[0.85rem]">
                        Select dealer <span className="text-destructive">*</span>
                    </Label>
                    <SelectNative id={"dealer"} value={enquiryData.dealer} onChange={handleValueChange} name={"dealer"} className="border rounded-md border-neutral-800 text-neutral-200">
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="">Select Dealer</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Islampur">Big Swing Honda Islampur</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Chakkarpur">Big Swing Honda Chakkarpur</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Badshahpur">Big Swing Honda Badshahpur</option>
                    </SelectNative>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor={"category"} className="text-neutral-400 text-[0.85rem]">
                        Category <span className="text-destructive">*</span>
                    </Label>
                    <SelectNative id={"category"} value={enquiryData.category} onChange={handleValueChange} name={"category"} className="border rounded-md border-neutral-800 text-neutral-200">
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="">Select category</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Bike">Bike</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Scooty">Scooty</option>
                    </SelectNative>
                </div>
                {enquiryData?.category === "Bike" && (
                    <div className="space-y-1">
                        <Label htmlFor={"model"} className="text-neutral-400 text-[0.85rem]">
                            Select model <span className="text-destructive">*</span>
                        </Label>
                        <SelectNative id={"model"} value={enquiryData.model} onChange={handleValueChange} name={"model"} className="border rounded-md border-neutral-800 text-neutral-200">
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="">Select model</option>

                            {data?.data?.map((item) => <option key={item?._id} className='text-[0.85rem] tracking-wide text-neutral-300' value={item.bike}>{item.bikeModel}</option>)}

                        </SelectNative>
                    </div>
                )}
                {enquiryData?.category === "Scooty" && (
                    <div className="space-y-1">
                        <Label htmlFor={"model"} className="text-neutral-400 text-[0.85rem]">
                            Select model <span className="text-destructive">*</span>
                        </Label>
                        <SelectNative id={"model"} value={enquiryData.model} onChange={handleValueChange} name={"model"} className="border rounded-md border-neutral-800 text-neutral-200">
                            <option className='text-[0.85rem] tracking-wide text-neutral-300' value="">Select model</option>

                            {scootyModel?.scooty?.map((item) => <option key={item?._id} className='text-[0.85rem] tracking-wide text-neutral-300' value={item.scooty}>{item.scootyModel}</option>)}

                        </SelectNative>
                    </div>
                )}


            </div>


            <div className='space-y-1'>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-400"
                >
                    Enquiry message
                </label>
                <Textarea id={"message"} value={enquiryData.message} onChange={handleValueChange} name={"message"} className="[resize:none] py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" placeholder="Leave a comment" />
            </div>
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
            <button disabled={isLoading} type='submit' className="relative w-full px-8 py-3 text-sm text-white transition duration-200 border rounded-md top-2 bg-mainRed border-neutral-800">
                <div className="absolute inset-x-0 w-1/3 h-px mx-auto shadow-2xl -top-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20 flex items-center justify-center gap-4">

                    {
                        isLoading ? (
                            <FaSpinner className="animate-spin" />
                        ) :
                            "Submit"
                    }
                </span>
            </button>
        </form>
    )
}

export default EnquiryForm
