import { Badge } from "../components/ui/badge";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Box, ChartLine, House, PanelsTopLeft, Settings, UsersRound } from "lucide-react";

export default function Component() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="h-auto gap-2 px-0 py-1 mb-3 bg-transparent border-b border-gray-200 rounded-none text-gray-950 dark:border-gray-800 dark:text-gray-50">
          <TabsTrigger
            value="tab-1"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-100 hover:text-gray-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-gray-900 data-[state=active]:hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:data-[state=active]:after:bg-gray-50 dark:data-[state=active]:hover:bg-gray-800"
          >
            <House
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-100 hover:text-gray-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-gray-900 data-[state=active]:hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:data-[state=active]:after:bg-gray-50 dark:data-[state=active]:hover:bg-gray-800"
          >
            <PanelsTopLeft
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Projects
            <Badge className="ms-1.5 min-w-5 bg-gray-900/15 px-1 dark:bg-gray-50/15" variant="secondary">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-100 hover:text-gray-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-gray-900 data-[state=active]:hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:data-[state=active]:after:bg-gray-50 dark:data-[state=active]:hover:bg-gray-800"
          >
            <Box
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Packages
            <Badge className="ms-1.5">New</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="tab-4"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-100 hover:text-gray-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-gray-900 data-[state=active]:hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:data-[state=active]:after:bg-gray-50 dark:data-[state=active]:hover:bg-gray-800"
          >
            <UsersRound
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Team
          </TabsTrigger>
          <TabsTrigger
            value="tab-5"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-100 hover:text-gray-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-gray-900 data-[state=active]:hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:data-[state=active]:after:bg-gray-50 dark:data-[state=active]:hover:bg-gray-800"
          >
            <ChartLine
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Insights
          </TabsTrigger>
          <TabsTrigger
            value="tab-6"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-100 hover:text-gray-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-gray-900 data-[state=active]:hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:data-[state=active]:after:bg-gray-50 dark:data-[state=active]:hover:bg-gray-800"
          >
            <Settings
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Settings
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <p className="pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 3</p>
      </TabsContent>
      <TabsContent value="tab-4">
        <p className="pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 4</p>
      </TabsContent>
      <TabsContent value="tab-5">
        <p className="pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 5</p>
      </TabsContent>
      <TabsContent value="tab-6">
        <p className="pt-1 text-xs text-center text-gray-500 dark:text-gray-400">Content for Tab 6</p>
      </TabsContent>
    </Tabs>
  );
}
