import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import HomeLayout from "@/Layout/HomeLayout";

import React, { useEffect, useId, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const EMICalculator = () => {
    const id = useId();
    const [tenureType, setTenureType] = useState("months");

    const items = [
        { value: "months", label: "Month" },
        { value: "years", label: "Year" },
    ];

    const loanMinValue = 10000;
    const loanMaxValue = 1500000;
    const {
        sliderValue: loanAmount,
        inputValues: loanInputValues,
        validateAndUpdateValue: validateLoanValue,
        handleInputChange: handleLoanInputChange,
        handleSliderChange: handleLoanSliderChange,
    } = useSliderWithInput({ minValue: loanMinValue, maxValue: loanMaxValue });

    const interestRateMinValue = 1;
    const interestRateMaxValue = 25;
    const {
        sliderValue: interestRate,
        inputValues: interestRateInputValues,
        validateAndUpdateValue: validateInterestRateValue,
        handleInputChange: handleInterestRateInputChange,
        handleSliderChange: handleInterestRateSliderChange,
    } = useSliderWithInput({ minValue: interestRateMinValue, maxValue: interestRateMaxValue });

    const loanTenureMinValue = 1;
    const loanTenureMaxValue = 7;
    const {
        sliderValue: loanTenure,
        inputValues: loanTenureInputValues,
        validateAndUpdateValue: validateLoanTenureValue,
        handleInputChange: handleLoanTenureInputChange,
        handleSliderChange: handleLoanTenureSliderChange,
    } = useSliderWithInput({ minValue: loanTenureMinValue, maxValue: loanTenureMaxValue });

    const calculateEMI = () => {
        const monthlyRate = Number(interestRate) / 12 / 100;
        const tenureInMonths = Number(tenureType) === "years" ? loanTenure * 12 : loanTenure;

        const emi =
            loanAmount *
            monthlyRate *
            (Math.pow(1 + monthlyRate, tenureInMonths) /
                (Math.pow(1 + monthlyRate, tenureInMonths) - 1));
        return emi;
    };

    const emi = calculateEMI();
    const totalPayable = emi * (tenureType === "years" ? loanTenure * 12 : loanTenure);
    const interestAmount = totalPayable - loanAmount;

    const generateEMIBreakup = () => {
        console.log(loanTenure);
        const monthlyRate = interestRate / 12 / 100;
        const tenureInMonths = tenureType === "years" ? loanTenure * 12 : loanTenure;
        let balance = loanAmount;
        let rows = [];
        const currentDate = new Date();

        // Calculate EMI
        const emi =
            (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
            (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

        for (let i = 1; i <= tenureInMonths; i++) {
            const interest = balance * monthlyRate; // Interest for the current month
            const principal = emi - interest; // Principal for the current month
            balance -= principal; // Update remaining balance

            if (balance < 0) balance = 0; // Ensure balance doesn't go negative

            // Calculate month-year for the installment
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + i,
                1
            );
            const monthYear = date.toLocaleString("default", {
                month: "short",
                year: "numeric",
            });

            // Add installment details to rows
            rows.push({
                monthYear,
                principal: principal.toFixed(0),
                interest: interest.toFixed(0),
                total: emi.toFixed(0),
                balance: balance.toFixed(0),
            });
        }

        return rows;
    };

    const [emiBreakup, setEmiBreakup] = useState([])

    useEffect(() => {
        setEmiBreakup(generateEMIBreakup())
    }, [loanAmount, interestRate, loanTenure, tenureType])

    console.log(emiBreakup)

    const pieData = [
        { name: "Principal Amount", value: loanAmount[0] },
        { name: "Interest Amount", value: interestAmount },
    ];

    console.log(pieData)

    const COLORS = ["#0088FE", "#FF8042"];
    const hoverColors = ["#66BB6A", "#E57373"];

    return (
        <HomeLayout>
            <div className="p-5 mx-auto  max-w-[75rem]">

                <div className=" w-full bg-black   bg-grid-white/[0.2]  relative flex flex-col items-center justify-center">
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <h2 className="relative z-10 font-sans text-4xl font-bold tracking-wide text-center text-transparent md:text-6xl bg-clip-text bg-gradient-to-b from-white to-neutral-600">
                        EMI CALCULATOR
                    </h2>
                    <div className="grid relative w-full mt-10 z-[100] grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                            <div>

                                <Label className="mb-2 text-sm font-medium leading-none text-neutral-300">Loan Amount</Label>
                                <div className="flex items-center gap-4">
                                    <Slider
                                        className="flex-grow"
                                        value={loanAmount}
                                        onValueChange={handleLoanSliderChange}
                                        min={loanMinValue}
                                        max={loanMaxValue}
                                    />
                                    <Input
                                        className="w-20 h-8 px-2 py-1"
                                        type="text"
                                        value={Number(loanInputValues[0]).toLocaleString("en-IN")}
                                        onChange={(e) => validateLoanValue(e.target.value, 0)}

                                    />
                                </div>

                                <Label className="mb-2 text-sm font-medium leading-none text-neutral-300">Rate of Interest (%)</Label>
                                <div className="flex items-center gap-4">
                                    <Slider
                                        className="flex-grow"
                                        value={interestRate}
                                        onValueChange={handleInterestRateSliderChange}
                                        min={interestRateMinValue}
                                        max={interestRateMaxValue}
                                    />
                                    <Input
                                        className="w-20 h-8 px-2 py-1"
                                        inputMode="decimal"

                                        type="text"
                                        value={interestRateInputValues[0]}
                                        onChange={(e) => validateInterestRateValue(e.target.value, 0)}

                                    />
                                </div>


                                <Label className="mb-2 text-sm font-medium leading-none text-neutral-300">Loan Tenure</Label>
                                <div className="flex items-center gap-4">
                                    <Slider
                                        className="flex-grow"
                                        value={loanTenure}
                                        onValueChange={handleLoanTenureSliderChange}
                                        min={loanTenureMinValue}
                                        max={loanTenureMaxValue}
                                    />
                                    <Input
                                        className="w-20 h-8 px-2 py-1"
                                        type="text"
                                        inputMode="decimal"
                                        value={Number(loanTenureInputValues[0]).toLocaleString("en-IN")}
                                        onChange={(e) => validateLoanTenureValue(e.target.value, 0)}

                                    />
                                </div>
                                <fieldset className="">
                                    <legend className="mb-2 text-sm font-medium leading-none text-neutral-300">Tenure Type</legend>
                                    <RadioGroup className="flex flex-wrap gap-2 text-white" defaultValue="1">
                                        {items.map((item) => (
                                            <div
                                                key={`${id}-${item.value}`}
                                                className="relative flex flex-col items-start gap-4 rounded-lg border border-t-0 border-l-0 border-neutral-800 bg-neutral-800 text-white border-input p-3 py-2 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <RadioGroupItem
                                                        id={`${id}-${item.value}`}
                                                        checked={tenureType === item.value}
                                                        onClick={() => setTenureType(item.value)}
                                                        value={item.value}
                                                        className="after:absolute after:inset-0"
                                                    />
                                                    <Label className="text-sm text-neutral-200" htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                                                </div>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </fieldset>

                            </div>
                            <div>





                            </div>
                        </div>
                        <div className="flex flex-col justify-between w-full gap-4 p-4 rounded-lg shadow sm:items-center sm:flex-row bg-orange-50">
                            <div className="sm:w-[60%] h-full p-2 shadow-md border bg-orange-100 bg-opacity-45 rounded-md">
                                <h2 className="text-xl font-bold">Monthly Payment</h2>
                                <div className="text-4xl font-bold text-orange-600">
                                    ₹{Number(emi.toFixed(0)).toLocaleString('en-IN')}
                                </div>
                                <hr className="my-4" />
                                <p className="flex justify-between py-2 pt-0 text-base font-medium text-gray-900 border-b">
                                    <span>Principal Amount</span>
                                    <span className="text-neutral-900">₹{loanAmount.toLocaleString('en-IN')}</span>
                                </p>
                                <p className="flex justify-between py-2 text-base font-medium text-gray-900 border-b">
                                    <span>Interest Amount</span>
                                    <span className="text-neutral-900">₹{Number(interestAmount.toFixed(0)).toLocaleString('en-IN')}</span>
                                </p>
                                <p className="flex justify-between py-2 text-base font-medium ">
                                    <span className=" text-neutral-700 text-[0.9rem]">Total Amount Payable</span>
                                    <span className="text-neutral-900">₹{Number(totalPayable.toFixed(0)).toLocaleString("en-IN")}</span>
                                </p>


                            </div>
                            <div className="sm:w-[38%] border py-2 shadow-md bg-orange-100 bg-opacity-45 rounded-md">
                                <h2 className="text-xl font-bold text-center ">
                                    EMI Breakup
                                </h2>
                                <div className="flex justify-center">
                                    <PieChart width={200} height={200}>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={60}
                                            fill="#8884d8"
                                            dataKey="value"
                                            paddingAngle={3}
                                            isAnimationActive={true}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => `₹${value.toFixed(0).toLocaleString()}`}
                                            contentStyle={{
                                                backgroundColor: "#f5f5f5",
                                                padding: "1px",
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                borderRadius: "5px",
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>


                <div className="mt-10">
                    <h2 className="mb-4 text-xl font-bold text-center text-neutral-300">EMI Monthly Breakup</h2>
                    <div className="overflow-x-auto border-2 rounded-md scrollbar-thin scrollbar-thumb-neutral-800 border-neutral-800 scrollbar-track-mainBg">
                        <table className="w-full text-left text-white border-collapse rounded-md ">
                            <thead className="bg-neutral-950 rounded-t-md">
                                <tr className=" text-neutral-400">
                                    <th className="px-2  py-2 border-b font-semibold  border-r min-w-[6.4rem] border-neutral-700">Month-Year</th>
                                    <th className="px-2 py-2 font-semibold border-b border-r border-neutral-700 min-w-[6.6rem] ">Principal (A)</th>
                                    <th className="px-2 py-2 font-semibold border-b border-r border-neutral-700 min-w-[6.05rem]  ">Interest (B)</th>
                                    <th className="px-2 py-2 font-semibold border-b border-r border-neutral-700 min-w-[11rem]  ">
                                        Total Payment (A + B)
                                    </th>
                                    <th className="px-2 py-2 font-semibold border-b border-r border-neutral-700 min-w-[3.9rem] " >Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emiBreakup.map((row, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border border-t-0 border-l-0 border-neutral-800">
                                            {row.monthYear}
                                        </td>
                                        <td className="px-4 py-2 border border-t-0 border-l-0 border-neutral-800">
                                            ₹{row.principal.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border border-t-0 border-l-0 border-neutral-800">
                                            ₹{row.interest.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border border-t-0 border-l-0 border-neutral-800">
                                            ₹{row.total.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border border-t-0 border-l-0 border-neutral-800">
                                            ₹{row.balance.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default EMICalculator;

