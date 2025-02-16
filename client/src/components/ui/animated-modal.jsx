"use client";;
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const ModalContext = createContext(undefined);

export const ModalProvider = ({
  children
}) => {
  const [open, setOpen] = useState(false);

  return (
    (<ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>)
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({
  children
}) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className
}) => {
  const { setOpen } = useModal();
  return (
    (<button
      className={cn(
        "px-4 py-2 rounded-md text-white text-center relative overflow-hidden",
        className
      )}
      onClick={() => setOpen(true)}>
      {children}
    </button>)
  );
};

export const ModalBody = ({
  children,
  className,
  onClose,
  onCloseChange
}) => {
  const { open } = useModal();

  // console.log(onCloseChange)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      if (typeof onCloseChange == "function") onCloseChange(false);
    }
  }, [open]);

  useEffect(() => {
    if (onClose) {
      setOpen(false)
    }
  }, [onClose])

  console.log(onClose)

  const modalRef = useRef(null);
  const { setOpen } = useModal();
  onClose && (() => setOpen(false));
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    (<AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed [perspective:800px]  [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-[1000]">
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] max-w-[95%] bg-neutral-950 border border-neutral-800 rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}>
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>)
  );
};

export const ModalContent = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col flex-1 p-8 md:p-10", className)}>
      {children}
    </div>)
  );
};

export const ModalFooter = ({
  children,
  className
}) => {
  return (
    (<div
      className={cn("flex justify-end p-4 bg-neutral-900", className)}>
      {children}
    </div>)
  );
};

const Overlay = ({
  className
}) => {
  return (
    (<motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}></motion.div>)
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    (<button onClick={() => setOpen(false)} className="absolute top-[0.65rem] right-2 z-[100] group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-white transition duration-200 group-hover:scale-125 group-hover:rotate-3">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>)
  );
};


export const useOutsideClick = (
  ref,
  callback
) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
