import React from 'react';
import Avatar from '../assets/Avatar.png'
import Avatar_black from '../assets/Avatar_black.png'
import Indian_Emblem from '../assets/Indian_emblem.png'
import Aadhaar_Logo from '../assets/Aadhar_logo.svg'

export default function AadhaarCard({ name, aadhaarNumber, dob, gender, address}){
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <div className="flex items-center justify-between p-4">
                <img src={Indian_Emblem} alt="Aadhaar Logo" className="h-14"/>

                <div className="flex flex-col justify-between gap-2 text-center">
                    <p className="text-md  bg-orange-500 px-2">Government of India</p>
                    <p className="text-sm text-black bg-green-400 px-2">Unique Identification Authority of India</p>
                </div>

                <img src={Aadhaar_Logo} alt="Aadhaar Logo" className="h-12"/>
            </div>
            <div className="flex  p-4">
                <img src={Avatar} alt="User" className="w-20 h-22"/>
                <div className="ml-4">
                    <p className="text-sm"><span className="font-semibold">Name:</span> {name}</p>
                    <p className="text-sm"><span className="font-semibold">DOB:</span> {dob}</p>
                    <p className="text-sm"><span className="font-semibold">Gender:</span> {gender}</p>
                    <p className="text-sm"><span className="font-semibold">Address:</span> {address}</p>
                </div>
            </div>
            <div className="p-4 pt-2 border-t-2 border-red-600 text-center text-xl font-bold">
                {aadhaarNumber}
            </div>
        </div>
    );
};