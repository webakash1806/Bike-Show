"use client";;
import { useScroll, useTransform, motion, useElementScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TimelineData = ({ data }) => {
  console.log("jsjk", data)
  return (
    <>
      {data?.map((item, index) => {
        const [textColor, setTextColor] = useState("#171717");
        const ref = useRef(null);

        useEffect(() => {
          const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            console.log(rect)
            const topInView = rect.top >= 60 && rect.top <= 400;

            if (topInView) {
              setTextColor("#fff");
            } else {
              setTextColor("#171717");
            }
          };

          window.addEventListener("scroll", handleScroll);
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, []);

        return (
          <Link to={item?.navigate} key={index} className="flex items-center justify-center pt-10 pr-4 md:gap-10">
            <div
              className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full"
            >
              <div
                className="absolute flex items-center justify-center w-10 h-10 bg-black rounded-full left-3 md:left-3"
              >
                <p className="text-[0.75rem] font-medium text-white">{item?.model}</p>
              </div>
              <div
                className="hidden text-xl font-bold md:block md:pl-20 md:text-5xl text-neutral-500"
              >
                <img src={item?.img} className="" alt="" />
                <p className="hidden text-transparent md:hidden bg-clip-text bg-gradient-to-b from-neutral-500 to-white">
                  {item.title}
                </p>
              </div>
            </div>

            <div
              ref={ref}
              className="relative flex flex-col lg:items-center lg:flex-row w-full h-[140px] justify-between pl-16 md:pl-4"
            >
              <div
                className="block w-full mb-4 text-2xl font-bold text-left md:hidden text-neutral-500"
              >
                <img src={item?.img} className="max-w-[25rem] w-[90%] sm:min-[10rem]" alt="" />
                <p className="mt-10 text-transparent bg-clip-text bg-gradient-to-b md:hidden from-neutral-500 to-white">
                  {item.title}
                </p>
              </div>
              <p className="hidden text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b md:block md:text-3xl from-neutral-500 to-white">
                {item.title}
              </p>

              <motion.div
                initial={{ color: "#808080" }}
                animate={{ color: textColor }}
                transition={{ duration: 0.5 }}
                className="lg:w-[30rem]"
              >
                {item.content}
              </motion.div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export const Timeline = ({
  data
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);


  return (
    (<div
      className="relative w-full font-sans bg-mainBg md:px-10"
      ref={containerRef}>
      <div className="px-4 py-20 pb-6 mx-auto max-w-7xl md:px-8 lg:px-10">
        <h2 className="mb-4 text-3xl font-semibold text-center text-transparent md:text-5xl bg-clip-text bg-gradient-to-b from-neutral-500 to-white">
          Listed Models
        </h2>

      </div>

      <div ref={ref} className="relative flex flex-col gap-[60vw] sm:gap-[42vw] mb-[20rem] sm:mb-[17rem] md:mb-[7rem] md:gap-[6rem] pb-20 mx-auto max-w-7xl">

        <TimelineData data={data} />
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full" />
        </div>
      </div>
    </div>)
  );
};
