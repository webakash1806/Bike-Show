import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { useId } from "react";

import { ListFilter } from "lucide-react";

export default function Component() {
  const id = useId();
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Filters">
            <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-3 w-36">
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Filters</div>
            <form className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id={`${id}-1`} />
                <Label htmlFor={`${id}-1`} className="font-normal">
                  Real Time
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id={`${id}-2`} />
                <Label htmlFor={`${id}-2`} className="font-normal">
                  Top Channels
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id={`${id}-3`} />
                <Label htmlFor={`${id}-3`} className="font-normal">
                  Last Orders
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id={`${id}-4`} />
                <Label htmlFor={`${id}-4`} className="font-normal">
                  Total Spent
                </Label>
              </div>
              <div
                role="separator"
                aria-orientation="horizontal"
                className="h-px my-1 -mx-3 bg-gray-200 dark:bg-gray-800"
              ></div>
              <div className="flex justify-between gap-2">
                <Button size="sm" variant="outline" className="px-2 h-7">
                  Clear
                </Button>
                <Button size="sm" className="px-2 h-7">
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
