import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const SelectNative = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    (<div className="relative">
      <select
        className={cn(
          "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-md bg-mainBg text-sm py-[0.45rem] text-neutral-200  outline-none  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-muted-foreground",
          props.multiple
            ? "py-1 [&>*]:px-3 [&>*]:py-1 [&_option:checked]:bg-accent"
            : " pe-8 ps-3",
          className
        )}
        ref={ref}
        {...props}>
        {children}
      </select>
      {!props.multiple && (
        <span
          className="absolute inset-y-0 flex items-center justify-center h-full pointer-events-none end-0 w-9 text-muted-foreground/80 peer-disabled:opacity-50">
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      )}
    </div>)
  );
});
SelectNative.displayName = "SelectNative";

export { SelectNative };
