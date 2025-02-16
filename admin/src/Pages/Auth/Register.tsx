import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/Slice/AuthSlice';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { SelectNative } from '../../components/ui/select-native';

interface loginFormData {
    email: string
    password: string,
    fullName: string,
    role: string,
    confirmPassword: string
}

const Register = () => {
    // const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [registerData, setRegisterData] = useState<loginFormData>({
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const { email, password, fullName, role, confirmPassword } = registerData

        if (!email || !password || !fullName || !role || !confirmPassword) {
            toast.error("Please enter all the fields")
            setLoading(false)
            return
        };

        const res = await dispatch(register(registerData) as any)
        if (res?.payload?.success) {
            toast.success("Registered successfully")
            setRegisterData({
                email: "",
                fullName: "",
                password: "",
                confirmPassword: "",
                role: ""
            })
            navigate('/')
        }

        setLoading(false)
    }


    return (
        <section className="w-full max-w-sm ">
            <div className="">

                <div className="relative w-full max-w-sm ">
                    <div className="overflow-hidden bg-white border border-gray-200 rounded-md shadow-md">
                        <h2 className='p-2 font-semibold text-center text-white bg-neutral-900'>Register</h2>
                        <form noValidate onSubmit={handleSubmit} className="px-3 pt-3 pb-6 sm:px-8 sm:pb-7">
                            <div className="grid grid-cols-1 gap-2 sm:gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor={"fullName"} className="text-neutral-900 text-[0.85rem]">
                                        Your Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input id={"fullName"} name="fullName" value={registerData?.fullName} onChange={handleInputChange} placeholder="Enter full name..." type="text" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-900" />
                                </div>


                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor={"email"} className="text-neutral-900 text-[0.85rem]">
                                        Customer Email <span className="text-destructive">*</span>
                                    </Label>
                                    <Input id={"email"} name="email" onChange={handleInputChange} value={registerData?.email} placeholder="Enter email..." type="email" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-900" />
                                </div>

                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={"password"} className="text-neutral-900 text-[0.85rem]">
                                    Password <span className="text-destructive">*</span>
                                </Label>
                                <Input id={"password"} name="password" onChange={handleInputChange} value={registerData?.password} placeholder="Enter password..." type="password" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-900" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor={"confirmPassword"} className="text-neutral-900 text-[0.85rem]">
                                    Confirm Password <span className="text-destructive">*</span>
                                </Label>
                                <Input id={"confirmPassword"} name="confirmPassword" onChange={handleInputChange} value={registerData?.confirmPassword} placeholder="Enter confirm password..." type="password" required className="py-[0.65rem] border-neutral-800 border rounded-md text-neutral-900" />
                            </div>

                            <div className="space-y-1">

                                <Label htmlFor={"role"} className="text-neutral-900 text-[0.85rem]">
                                    Select role <span className="text-destructive">*</span>
                                </Label>
                                <SelectNative id={"dealer"} value={registerData.role} onChange={handleInputChange} name={"role"} className="border rounded-md border-neutral-800 text-neutral-900">
                                    <option className='text-[0.85rem] tracking-wide text-neutral-800' value="">Select role</option>
                                    <option className='text-[0.85rem] tracking-wide text-neutral-800' value="ADMIN">ADMIN</option>
                                    <option className='text-[0.85rem] tracking-wide text-neutral-800' value="SALES">SALES</option>
                                    <option className='text-[0.85rem] tracking-wide text-neutral-800' value="EDITOR">EDITOR</option>
                                </SelectNative>
                            </div>
                            <div>
                                <button disabled={loading} type="submit" className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md hover:reverseBg gradientBg focus:outline-none bg-neutral-900 hover:bg-neutral-800 ">
                                    Register {loading && <div className='border-[3px] ml-4 animate-spin rounded-full size-4 border-r-transparent'></div>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register