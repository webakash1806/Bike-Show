import { cn } from "../../lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full font-semibold rounded border border-gray-400 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm shadow-black/5 transition-shadow placeholder:text-gray-500/70 focus-visible:border-red-900 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 ",
          type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
          "p-0 pr-3 italic text-gray-500/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-gray-950   ",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
