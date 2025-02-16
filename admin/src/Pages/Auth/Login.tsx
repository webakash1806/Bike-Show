import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Slice/AuthSlice';
import Loaders from '../../components/Loaders';
import { useForgotPasswordMutation } from '../../Redux/API/FormApi';

interface loginFormData {
    email: string
    password: string
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState<loginFormData>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const { email, password } = loginData

        if (!email || !password) {
            toast.error("Please enter email and password")
            setLoading(false)
            return
        };

        const res = await dispatch(login(loginData) as any)
        if (res?.payload?.success) {
            navigate('/')
        }

        setLoading(false)
    }

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault()
        if (!loginData.email) {
            toast.error("Please enter email")
            return
        }

        forgotPassword({ email: loginData.email })

    }
    return (
        <section className="min-h-screen py-10 bg-red-100">
            <Loaders isLoading={loading} />
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight textGradient sm:text-4xl lg:text-5xl ">Welcome Back!</h2>
                    <p className="max-w-xl mx-auto text-base leading-relaxed text-gray-600">{forgotPasswordPopup ? "Reset your password" : "Login to your account"}</p>
                </div>
                <div className="relative max-w-md mx-auto mt-4">
                    <div className="overflow-hidden bg-white border border-gray-200 rounded-md shadow-md">
                        <div className="px-3 py-6 sm:px-8 sm:py-7">
                            {forgotPasswordPopup ?
                                <form noValidate onSubmit={handleForgotPassword}>
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="" className="text-base font-medium text-gray-900"> Email address </label>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                    </svg>
                                                </div>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={handleInputChange}
                                                    value={loginData.email}
                                                    placeholder="Enter email..."
                                                    className="block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md hover:reverseBg gradientBg focus:outline-none hover:bg-red-700 ">
                                            Send reset link {isLoading && <div className='border-[3px] ml-4 animate-spin rounded-full size-4 border-r-transparent '></div>}
                                        </button>
                                    </div>
                                </form>
                                :
                                <form noValidate onSubmit={handleSubmit}>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="" className="text-base font-medium text-gray-900"> Email address </label>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                    </svg>
                                                </div>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={handleInputChange}
                                                    value={loginData.email}
                                                    placeholder="Enter email to get started"
                                                    className="block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="" className="text-base font-medium text-gray-900"> Password </label>

                                                <div onClick={() => setForgotPasswordPopup(true)} className="text-sm font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus:text-orange-600 hover:underline"> Forgot password? </div>
                                            </div>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                        />
                                                    </svg>
                                                </div>

                                                <input
                                                    type={!showPassword ? "password" : "text"}
                                                    name="password"
                                                    id="password"
                                                    onChange={handleInputChange}
                                                    value={loginData.password}
                                                    placeholder="Enter your password"
                                                    className="block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                    {!showPassword ? (
                                                        <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                                                    ) : (
                                                        <FaEye onClick={() => setShowPassword(!showPassword)} />
                                                    )}
                                                </div>

                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md hover:reverseBg gradientBg focus:outline-none hover:bg-red-700 ">
                                                Log in {loading && <div className='border-[3px] ml-4 animate-spin rounded-full size-4 border-r-transparent'></div>}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login