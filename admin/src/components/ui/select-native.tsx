import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export interface SelectPropsNative extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const SelectNative = React.forwardRef<HTMLSelectElement, SelectPropsNative>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border border-gray-200 bg-white text-sm text-gray-950 outline-none  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-gray-500  ",
            props.multiple
              ? "py-1 [&>*]:px-3 [&>*]:py-1 [&_option:checked]:bg-gray-100 dark:[&_option:checked]:bg-gray-800"
              : "h-9 pe-8 ps-3",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {!props.multiple && (
          <span className="absolute inset-y-0 flex items-center justify-center h-full pointer-events-none end-0 w-9 text-gray-500/80 peer-disabled:opacity-50 dark:text-gray-400/80">
            <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
          </span>
        )}
      </div>
    );
  },
);
SelectNative.displayName = "SelectNative";

export { SelectNative };
