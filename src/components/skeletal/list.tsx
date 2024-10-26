import { Table, TableRow } from "flowbite-react";

type TSkeletal = {
  cols?: number;
  rows?: number;
};

export function ListSkeletalComponent({
  rows = 10,
  cols = 6,
}: TSkeletal) {
  return (
    <>
      {[...Array(rows).keys()].map((_, index) => (
        <TableRow
          key={index + "rows"}
          className="dark:bg-gray-800  dark:border-gray-700"
        >
          <Table.Cell className="p-4">
            <div className="h-4 bg-gray-300 rounded-sm dark:bg-gray-600 w-4 animate-pulse"></div>
          </Table.Cell>

          {[...Array(cols).keys()].map((_, index) => (
            <Table.Cell key={index + 'cols'}>
              <div
                key={index}
                className="h-4 bg-gray-300 rounded-sm dark:bg-gray-600 w-full animate-pulse"
              ></div>
            </Table.Cell>
          ))}
          <Table.Cell>
            <div className="h-4 bg-gray-300 rounded-sm dark:bg-gray-600 w-10 animate-pulse"></div>
          </Table.Cell>
        </TableRow>
      ))}
    </>
  );
}
