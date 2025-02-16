import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea rows={3}
      className={cn(
        "flex  w-full  bg-mainBg px-3 py-3 text-sm   transition-shadow placeholder:text-muted-foreground/70  outline-none disabled:cursor-not-allowed disabled:opacity-50 autofill:bg-mainBg autofill:text-foreground",
        className
      )}
      ref={ref}
      {...props} />)
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
