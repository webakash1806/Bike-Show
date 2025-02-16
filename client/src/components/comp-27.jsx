"use client";

import { Input } from "@/components/ui/input";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { ModalBody, ModalContent } from "@/components/ui/animated-modal";
import { useGetSearchDataQuery } from "@/Redux/AllApi/BikeApi";
import { useNavigate } from "react-router-dom";

const SearchModal = () => {
  const id = useId();

  const [inputValue, setInputValue] = useState("");
  const { data, refetch } = useGetSearchDataQuery(inputValue);
  const [clickedData, setClickedData] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleFun = () => {
    console.log("object")
  }

  console.log(data)

  useEffect(() => {
    refetch()
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    (
      <ModalBody onClose={clickedData} onCloseChange={setClickedData} className={"rounded-[0.4rem] max-w-[25rem] mx-2 md:max-w-[27rem]"}>
        <ModalContent className={"p-0 md:p-0"}>

          <div className="space-y-2 text-white">
            <div className="relative">
              <Input
                id={id}
                className="text-white border-b border-gray-800 peer pe-9 ps-9 rounded-t-md"
                placeholder="Search..."
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
              <div
                className="absolute inset-y-0 flex items-center justify-center pointer-events-none text-neutral-400 start-0 ps-3 peer-disabled:opacity-50">
                {isLoading ? (
                  <LoaderCircle
                    className="animate-spin"
                    size={16}
                    strokeWidth={2}
                    role="status"
                    aria-label="Loading..." />
                ) : (
                  <Search size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </div>

            </div>

            <div className="flex flex-col scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded scrollbar-thumb-neutral-900 h-fit max-h-[20rem] overflow-auto">
              {data?.result.map((searchData, index) => (
                <div onClick={() => {
                  setClickedData(true);
                  if (searchData?.category === "Bike") {
                    navigate(`/bike/${searchData?._id}`)
                  }
                  if (searchData?.category === "Scooty") {
                    navigate(`/scooty/${searchData?._id}`)
                  }
                }} key={index} className="flex items-center w-full gap-2 p-2 cursor-pointer hover:bg-neutral-900">
                  <img className="w-[4rem] rounded" src={searchData?.image} alt="" />
                  <div><h2 className="text-sm">
                    {searchData?.name || searchData?.title}</h2>
                    <p className="text-[0.75rem] font-semibold text-neutral-400">{searchData?.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </ModalContent>
      </ModalBody>
    )
  );
}


export default SearchModal