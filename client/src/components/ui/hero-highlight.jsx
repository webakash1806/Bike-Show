"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    (<div
      className={cn(
        "relative h-fit flex items-start  bg-mainBg  justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}>
      <div
        className="absolute inset-0 pointer-events-none bg-dot-thick-neutral-900" />
      <motion.div
        className="absolute inset-0 transition duration-300 opacity-0 pointer-events-none bg-dot-thick-[#DC2C38] group-hover:opacity-50"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }} />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>)
  );
};

export const Highlight = ({
  children,
  className
}) => {
  return (
    (<motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1   px-1 rounded-lg bg-gradient-to-r   from-indigo-500 to-purple-500`,
        className
      )}>
      {children}
    </motion.span>)
  );
};
