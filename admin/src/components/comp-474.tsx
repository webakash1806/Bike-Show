import { Table, TableBody, TableCell, TableRow } from "../components/ui/table";

export default function Component() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:border-gray-800 dark:bg-gray-950">
        <Table>
          <TableBody>
            <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
              <TableCell className="py-2 font-medium bg-gray-100/50 dark:bg-gray-800/50">Name</TableCell>
              <TableCell className="py-2">David Kim</TableCell>
            </TableRow>
            <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
              <TableCell className="py-2 font-medium bg-gray-100/50 dark:bg-gray-800/50">Email</TableCell>
              <TableCell className="py-2">d.kim@company.com</TableCell>
            </TableRow>
            <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
              <TableCell className="py-2 font-medium bg-gray-100/50 dark:bg-gray-800/50">Location</TableCell>
              <TableCell className="py-2">Seoul, KR</TableCell>
            </TableRow>
            <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
              <TableCell className="py-2 font-medium bg-gray-100/50 dark:bg-gray-800/50">Status</TableCell>
              <TableCell className="py-2">Active</TableCell>
            </TableRow>
            <TableRow className="*:border-gray-200 hover:bg-transparent [&>:not(:last-child)]:border-r dark:*:border-gray-800">
              <TableCell className="py-2 font-medium bg-gray-100/50 dark:bg-gray-800/50">Balance</TableCell>
              <TableCell className="py-2">$1,000.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">Vertical table</p>
    </div>
  );
}
