import { Badge } from "../components/ui/badge";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Box, House, PanelsTopLeft } from "lucide-react";

export default function Component() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="mb-3">
          <TabsTrigger value="tab-1">
            <House
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tab-2" className="group">
            <PanelsTopLeft
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Projects
            <Badge
              className="ms-1.5 min-w-5 bg-gray-900/15 px-1 transition-opacity group-data-[state=inactive]:opacity-50 dark:bg-gray-50/15"
              variant="secondary"
            >
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tab-3" className="group">
            <Box
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Packages
            <Badge className="ms-1.5 transition-opacity group-data-[state=inactive]:opacity-50">
              New
            </Badge>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <p className="p-4 pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="p-4 pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  );
}
