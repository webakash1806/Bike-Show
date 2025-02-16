import React, { useState } from 'react';

const RingSize = () => {
    const [radius, setRadius] = useState(150);

    const handleSliderChange = (event) => {
        setRadius(event.target.value);
    };

    const diameter = radius * 2;
    const circumference = Math.PI * diameter / 58.30;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="mb-4 text-2xl font-semibold">Adjust Circle Size to Match the Ring</h1>

            <div className="relative flex items-center justify-center bg-gray-200 rounded-lg w-96 h-96">
                <img
                    src="https://via.placeholder.com/200"
                    alt="Ring Image"
                    className="absolute object-contain w-full h-full rounded-lg"
                />
                <div
                    className="absolute transition-all duration-300 bg-green-500 rounded-full opacity-50"
                    style={{
                        width: `${diameter}px`,
                        height: `${diameter}px`,
                        left: `${(400 - diameter) / 2}px`,
                        top: `${(400 - diameter) / 2}px`,
                    }}
                ></div>
            </div>

            <div className="mt-4">
                <input
                    type="range"
                    min="20"
                    max="200"
                    value={radius}
                    onChange={handleSliderChange}
                    className="w-64"
                />
                <div className="flex justify-between mt-2 text-sm">
                    <span>20</span>
                    <span>200</span>
                </div>
            </div>

            <p className="mt-4 text-lg">
                Circle Circumference: <span className="font-semibold">{circumference.toFixed(0)}</span> units
            </p>
        </div>
    );
};

export default RingSize;
