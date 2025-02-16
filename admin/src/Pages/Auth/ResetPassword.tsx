import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../Redux/API/FormApi';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [resetPassword] = useResetPasswordMutation()

    const navigate = useNavigate()
    const { token, expiry } = useParams<{ token: string; expiry: string }>();
    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

    const [loginData, setLoginData] = useState({
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const expiryDate = new Date(expiry ?? '');
            const timeDiff: number = expiryDate.getTime() - now.getTime();

            if (timeDiff <= 0) {
                clearInterval(interval);
                setTimeLeft({ minutes: 0, seconds: 0 });
            } else {
                const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);
                setTimeLeft({ minutes, seconds });
            }
        };

        const interval = setInterval(updateCountdown, 1000);

        updateCountdown();

        return () => clearInterval(interval);
    }, [expiry]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { confirmPassword, password } = loginData

        if (!password || !confirmPassword) {
            toast.error("Please enter password and confirm password")
            return
        };

        const res = await resetPassword({ token: token, newPassword: password })
        if (res?.data?.success) {
            navigate('/login')
        }
    }

    const formatTime = (time: number) => (time < 10 ? `0${time}` : time);



    return (
        <section className="min-h-screen py-10 bg-red-100">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight textGradient sm:text-4xl lg:text-5xl ">Reset Password!</h2>
                    <p className="max-w-xl mx-auto text-base leading-relaxed text-gray-600">Enter new password</p>
                </div>
                <div className="relative max-w-md mx-auto mt-4">
                    <div className="overflow-hidden bg-white border border-gray-200 rounded-md shadow-md">
                        <div className="">
                            <form noValidate onSubmit={handleSubmit}>
                                <div className="flex items-center justify-center gap-4 p-6 py-3 text-white bg-gray-800 rounded-lg shadow-lg">
                                    <h2 className="mb-5 text-2xl font-semibold">Expiring in </h2>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="flex flex-col items-center">
                                            <div className="p-2 py-1 text-3xl font-semibold bg-gray-900 rounded-md">
                                                {formatTime(timeLeft.minutes)}
                                            </div>
                                            <span className="mt-1 text-sm text-gray-200">Minutes</span>
                                        </div>
                                        <div className="mb-8 text-3xl font-semibold">:</div>
                                        <div className="flex flex-col items-center">
                                            <div className="p-2 py-1 text-3xl font-semibold bg-gray-900 rounded-md">
                                                {formatTime(timeLeft.seconds)}
                                            </div>
                                            <span className="mt-1 text-sm text-gray-200">Seconds</span>
                                        </div>
                                    </div>
                                </div>
                                {timeLeft.minutes === 0 && timeLeft.seconds === 0 ?
                                    <div className="px-3 py-6 space-y-5 sm:px-8 sm:py-7">
                                        <div className='py-6 text-center text-[1.2rem] font-semibold'>
                                            Reset Password Link Expired. <br /> Please request a new reset password link.
                                        </div>
                                        <div>
                                            <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md hover:reverseBg gradientBg focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                                Send link
                                            </button>
                                        </div>
                                    </div> :

                                    <div className="px-3 py-6 space-y-5 sm:px-8 sm:py-7">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="" className="text-base font-medium text-gray-900"> Password </label>

                                            </div>
                                            <div className="mt-1.5 relative text-gray-400 focus-within:text-gray-600">
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
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="" className="text-base font-medium text-gray-900">Confirm Password </label>

                                            </div>
                                            <div className="relative mt-1.5 text-gray-400 focus-within:text-gray-600">
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
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    onChange={handleInputChange}
                                                    value={loginData.confirmPassword}
                                                    placeholder="Enter your password again"
                                                    className="block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                />


                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md hover:reverseBg gradientBg focus:outline-none hover:bg-red-700 ">
                                                Reset Password
                                            </button>
                                        </div>
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword