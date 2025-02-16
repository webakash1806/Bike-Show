import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "grid p-4 grid-cols-1 md:grid-cols-3 gap-4 max-w-[85rem] mx-auto",
        className
      )}>
      {children}
    </div>)
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    (<div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-none  bg-black border-white/[0.2]  border  justify-between overflow-hidden flex flex-col space-y-4",
        className
      )}>
      {header}

    </div>)
  );
};
