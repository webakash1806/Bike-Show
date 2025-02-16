import React, { useEffect, useId, useState } from 'react'
import { ModalBody, ModalContent, ModalFooter } from '@/components/ui/animated-modal'
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { SelectNative } from './ui/select-native';
import HomeLayout from '@/Layout/HomeLayout';
import { useGetAllBikeModelsQuery, useGetAllScootyModelsQuery } from '@/Redux/AllApi/BikeApi';
import { useAddTestDriveFormMutation } from '@/Redux/AllApi/FormApi';
import { useVerifyCaptchaMutation } from '@/Redux/AllApi/BikeApi';
import { toast } from 'sonner';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FaSpinner } from 'react-icons/fa6';




const TestDriveForm = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    useEffect(() => {
        if (!executeRecaptcha) {
            console.error("reCAPTCHA not ready yet.");
        }
    }, [executeRecaptcha]);

    const [verifyCaptcha, { isLoading: isVerifying }] = useVerifyCaptchaMutation()


    const [addTestDriveForm, isLoading] = useAddTestDriveFormMutation();
    const { data } = useGetAllBikeModelsQuery();
    const { data: scootyData } = useGetAllScootyModelsQuery();
    const [date, setDate] = useState();

    const [testData, setTestData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        model: '',
        dealer: '',
        message: '',
        vehicleType: ''
    })

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setTestData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not loaded. Please refresh and try again.");
            return;
        }

        console.log(executeRecaptcha)

        try {
            const token = await executeRecaptcha("onSubmit");
            console.log("object")
            console.log(token)
            const res = await verifyCaptcha({ token });
            console.log(res)

            if (!res?.data?.success) {
                toast.error("reCAPTCHA verification failed. Please try again.");
                return;
            }

            if (!testData?.name || !testData?.phoneNumber || !testData?.email || !testData?.vehicleType || !testData?.dealer || !testData?.model) {
                console.log(testData)
                toast.error("Please fill in all the fields.");
                return;
            }



            const response = await addTestDriveForm({ ...testData, date });
            console.log(response)
            if (response?.data?.success) {
                setTestData({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    model: '',
                    dealer: '',
                    message: '',
                    vehicleType: ''
                });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }

    }

    const id = useId();

    return (

        <form onSubmit={handleSubmit} noValidate className="relative w-[94vw] sm:w-[96vw] mt-2 p-4 sm:p-6 pb-4 sm:max-w-[50rem] max-w-[28rem] mx-auto mb-10 space-y-3 overflow-hidden border-2 border-neutral-700 bg-[#121212] rounded-md">
            <h4 className="mt-4 mb-6 text-lg font-bold text-center md:text-2xl text-neutral-100">
                Book your{" "}
                <span className="px-1 py-0.5 rounded-md bg-neutral-800 border-neutral-700 border ">
                    Test Drive
                </span>{" "}
                now!
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor={"name"} className="text-neutral-400 text-[0.85rem]">
                        Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id={"name"} name="name" value={testData?.name} onChange={handleValueChange} placeholder="Enter full name..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                </div>

                <div className="space-y-1">
                    <Label htmlFor={"phoneNumber"} className="text-neutral-400 text-[0.85rem]">
                        Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input id={"phoneNumber"} name="phoneNumber" value={testData?.phoneNumber} onChange={handleValueChange} type={"tel"} placeholder="Enter phone number..." required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                </div>

            </div>
            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor={"email"} className="text-neutral-400 text-[0.85rem]">
                        Customer Email <span className="text-destructive">*</span>
                    </Label>
                    <Input id={"email"} name="email" onChange={handleValueChange} value={testData?.email} placeholder="Enter email..." type="email" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Select vehicle <span className="text-destructive">*</span>
                    </Label>
                    <SelectNative
                        id={id}
                        className="border rounded-md border-neutral-800 text-neutral-200"
                        onChange={(e) => {
                            const selectedValue = JSON.parse(e.target.value); // Parse the JSON value
                            setTestData((prevData) => ({
                                ...prevData,
                                model: selectedValue.model,
                                vehicleType: selectedValue.type,
                            }));

                        }}
                        value={JSON.stringify({ model: testData?.model, type: testData?.vehicleType })}
                    >
                        <option className="text-[0.85rem] tracking-wide text-neutral-300" value="">
                            Select model
                        </option>
                        <optgroup className="text-neutral-500" label="Bike">
                            {data?.data?.map((item) => (
                                <option
                                    key={item?._id}
                                    className="text-[0.85rem] tracking-wide text-neutral-300"
                                    value={JSON.stringify({ model: item.bike, type: "Bike" })}
                                >
                                    {item.bikeModel}
                                </option>
                            ))}
                        </optgroup>
                        <optgroup label="Scooty" className="text-neutral-500">
                            {scootyData?.scooty?.map((item) => (
                                <option
                                    key={item?._id}
                                    className="text-[0.85rem] tracking-wide text-neutral-300"
                                    value={JSON.stringify({ model: item.scooty, type: "Scooty" })}
                                >
                                    {item.scootyModel}
                                </option>
                            ))}
                        </optgroup>
                    </SelectNative>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1">

                    <Label htmlFor={id} className="text-neutral-400 text-[0.85rem]">
                        Select date <span className="text-destructive">*</span>
                    </Label>
                    <Popover>

                        <PopoverTrigger asChild>

                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full bg-mainBg py-[0.45rem] border border-neutral-800 text-neutral-200 justify-start text-left font-normal",
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

                    <Label htmlFor={"dealer"} className="text-neutral-400 text-[0.85rem]">
                        Select dealer <span className="text-destructive">*</span>
                    </Label>
                    <SelectNative id={"dealer"} value={testData.dealer} onChange={handleValueChange} name={"dealer"} className="border rounded-md border-neutral-800 text-neutral-200">
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="">Select Dealer</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Islampur">Big Swing Honda Islampur</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Chakkarpur">Big Swing Honda Chakkarpur</option>
                        <option className='text-[0.85rem] tracking-wide text-neutral-300' value="Big Swing Honda Badshahpur">Big Swing Honda Badshahpur</option>
                    </SelectNative>
                </div>
            </div>

            <div className='space-y-1'>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-400"
                >
                    Suggestion
                </label>
                <Textarea id={id} name={"message"} value={testData.message} onChange={handleValueChange} className="[resize:none] py-[0.65rem] border-neutral-800 border rounded-md text-neutral-200" placeholder="Leave a comment" />

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
            <button disabled={isLoading} className="relative w-full px-8 py-3 text-sm text-white transition duration-200 border rounded-md top-2 bg-mainRed border-neutral-800">
                <div className="absolute inset-x-0 w-1/3 h-px mx-auto shadow-2xl -top-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20 flex items-center justify-center gap-4">

                    {
                        isLoading ? (
                            <FaSpinner className="animate-spin" />
                        ) :
                            "Book now!"
                    }
                </span>
            </button>



        </form>

    )
}

export default TestDriveForm
