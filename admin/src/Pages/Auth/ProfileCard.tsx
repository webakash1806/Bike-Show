import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailProfile } from '../../Redux/Slice/AuthSlice';
import { User } from '../../interfaces/interface';
import { AnyAction } from '@reduxjs/toolkit';


interface DetailedUser {
    addedBikeCount: number;
    addedScootyCount: number;
    addedAccessoriesCount: number;
    updatedBikeCount: number;
    updatedScootyCount: number;
    updatedAccessoriesCount: number;
    addedHelmetsCount: number;
    updatedHelmetsCount: number;
    testDriveInProgressCount: number;
    testDriveResolvedCount: number;
    contactFormInProgressCount: number;
    contactFormResolvedCount: number;
    inProgressCount: number;
    resolvedCount: number
}

interface authData {
    auth: {
        user: User
    }
}

const ProfileCard: React.FC = () => {

    const getProfile = useSelector((state: authData) => state?.auth?.user);
    const [detailUser, setDetailUser] = useState<DetailedUser | null>(null)


    const dispatch = useDispatch()
    const fetchData = async () => {
        console.log("object")
        const res: { payload: DetailedUser } = await dispatch(getDetailProfile() as unknown as AnyAction).unwrap()
        setDetailUser(res?.payload)
        console.log(res)
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 p-2 bg-gray-300 rounded-full">
                    <img src="https://www.honda2wheelersindia.com/assets/images/LogoHondaNew_24.png" alt="Profile" className="w-full " />
                </div>
                <h2 className="mb-2 font-semibold text-gray-800 text-md">{getProfile?.fullName}  <span className="px-2 py-0.5 text-[0.7rem] font-semibold text-green-700 bg-green-100 rounded whitespace-nowrap">
                    {getProfile?.role}
                </span></h2>

                <p className="mb-4 text-gray-600">{getProfile?.email}</p>

                {(getProfile?.role === "ADMIN" || getProfile?.role === "EDITOR") &&
                    <div className='flex flex-wrap items-center justify-center gap-3'>
                        <div className='flex flex-col justify-between border border-purple-400 rounded h-fit w-fit'>
                            <p className='p-1 text-sm font-semibold tracking-wide text-center text-white uppercase bg-neutral-900'>Bike</p>
                            <div className='flex items-center justify-between gap-2 px-2 py-2 bg-purple-100 rounded'>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.addedBikeCount}</p>
                                    <p className="text-sm font-semibold text-gray-600">Added</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.updatedBikeCount}</p>
                                    <p className="text-sm font-semibold text-gray-600 ">Updated</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between my-4 border border-purple-400 rounded w-fit'>
                            <p className='p-1 text-sm font-semibold tracking-wide text-center text-white uppercase bg-neutral-900'>Scooty</p>
                            <div className='flex items-center justify-between gap-2 px-2 py-2 bg-purple-100 rounded'>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.addedScootyCount}</p>
                                    <p className="text-sm font-semibold text-gray-600">Added</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.updatedScootyCount}</p>
                                    <p className="text-sm font-semibold text-gray-600 ">Updated</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between mb-4 border border-purple-400 rounded w-fit'>
                            <p className='p-1 text-sm font-semibold tracking-wide text-center text-white uppercase bg-neutral-900'>Accessories</p>
                            <div className='flex items-center justify-between gap-2 px-2 py-2 bg-purple-100 rounded'>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.addedAccessoriesCount}</p>
                                    <p className="text-sm font-semibold text-gray-600">Added</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.updatedAccessoriesCount}</p>
                                    <p className="text-sm font-semibold text-gray-600 ">Updated</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between mb-4 border border-purple-400 rounded w-fit'>
                            <p className='p-1 text-sm font-semibold tracking-wide text-center text-white uppercase bg-neutral-900'>Helmet</p>
                            <div className='flex items-center justify-between gap-2 px-2 py-2 bg-purple-100 rounded'>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.addedHelmetsCount}</p>
                                    <p className="text-sm font-semibold text-gray-600">Added</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.updatedHelmetsCount}</p>
                                    <p className="text-sm font-semibold text-gray-600 ">Updated</p>
                                </div>
                            </div>
                        </div>

                    </div>
                }
                {(getProfile?.role === "ADMIN" || getProfile?.role === "SALES") &&
                    <div className='flex flex-wrap items-center justify-center gap-3'>


                        <div className='flex flex-col justify-between my-4 border border-purple-400 rounded w-fit'>
                            <p className='p-1 text-sm font-semibold tracking-wide text-center text-white uppercase bg-neutral-900'>Test Drive</p>
                            <div className='flex items-center justify-between gap-2 px-2 py-2 bg-purple-100 rounded'>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.testDriveInProgressCount}</p>
                                    <p className="text-sm font-semibold text-gray-600">Active</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.testDriveResolvedCount}</p>
                                    <p className="text-sm font-semibold text-gray-600 ">Resolved</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between border border-purple-400 rounded w-fit'>
                            <p className='p-1 text-sm font-semibold tracking-wide text-center text-white uppercase bg-neutral-900'>Contact</p>
                            <div className='flex items-center justify-between gap-2 px-2 py-2 bg-purple-100 rounded'>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.contactFormInProgressCount}</p>
                                    <p className="text-sm font-semibold text-gray-600">Added</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.contactFormResolvedCount}</p>
                                    <p className="text-sm font-semibold text-gray-600 ">Updated</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between border border-purple-400 rounded h-fit w-[16rem]'>
                            <p className='p-1 text-sm font-semibold tracking-wide text-center text-white uppercase bg-neutral-900'>Product Enquiry</p>
                            <div className='flex items-center justify-between gap-2 px-2 py-2 bg-purple-100 rounded'>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.inProgressCount}</p>
                                    <p className="text-sm font-semibold text-gray-600">Active</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="font-semibold leading-3 text-gray-800">{detailUser?.resolvedCount}</p>
                                    <p className="text-sm font-semibold text-gray-600 ">Resolved</p>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileCard;