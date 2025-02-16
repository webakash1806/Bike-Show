import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-lg border border-input bg-mainBg px-3 py-2 text-sm  shadow-sm shadow-black/5 transition-shadow placeholder:text-neutral-500  outline-none disabled:cursor-not-allowed disabled:opacity-50",
        type === "search" &&
        "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
        type === "file" &&
        "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
        className
      )}
      ref={ref}
      {...props} />)
  );
});
Input.displayName = "Input";

export { Input };
