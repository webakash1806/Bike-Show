import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-gray-200 px-1.5 text-xs font-medium leading-normal transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 dark:border-gray-800",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900",
        secondary: "border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
        destructive: "border-transparent bg-red-500 text-gray-50 dark:bg-red-900 dark:text-gray-50",
        outline: "text-gray-950 dark:text-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
