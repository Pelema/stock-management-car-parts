import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { HiUsers } from "react-icons/hi";
import { card_theme } from "./card_theme";
import { tableTheme } from "./table_theme";

export function DashboardPage() {

  // const { data: orders, loading, error } = useQuery<Order[]>('orders', false, 0, 5);

  // console.log("Dashboard ", orders);

  // const { data: users, loading: isLoading, error: isError } = useQuery<User[]>('auth.users', false, 0, 5);

  // console.log("Dashboard Users", users);


  return (
    <div className="h-full">
      <div className="flex space-x-2 mb-5">
        <Card className="basis-1/4" horizontal theme={card_theme}>
          <div className="flex space-x-4 justify-between text-gray-700 dark:text-gray-400">
            <div>
              <HiUsers />
              <div>Total Users</div>
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-400 text-3xl">
              2
            </p>
          </div>
        </Card>
        <Card className="max-w-sm basis-1/4" horizontal theme={card_theme}>
          <div className="flex space-x-4  justify-between text-gray-700 dark:text-gray-400">
            <div>
              <HiUsers />
              <div>Car Models</div>
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-400 text-3xl">
              2
            </p>
          </div>
        </Card>
        <Card className="max-w-sm basis-1/4" horizontal theme={card_theme}>
          <div className="flex space-x-4 justify-between text-gray-700 dark:text-gray-400">
            <div>
              <HiUsers />
              <div>Suppliers</div>
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-400 text-3xl">
              2
            </p>
          </div>
        </Card>
        <Card className="max-w-sm basis-1/4" horizontal theme={card_theme}>
          <div className="flex space-x-4 justify-between text-gray-700 dark:text-gray-400">
            <div>
              <HiUsers />
              <div>Orders</div>
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-400 text-3xl">
              2
            </p>
          </div>
        </Card>
      </div>

      <div className="flex space-x-2">
        <div className="overflow-x-auto rounded-md grow">
          <Table hoverable theme={tableTheme}>
            <caption className="p-5 uppercase text-md font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Recent Orders
            </caption>
            <TableHead>
              <TableHeadCell>Product name</TableHeadCell>
              <TableHeadCell>Color</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </TableCell>
                <TableCell>Sliver</TableCell>
                <TableCell>Laptop</TableCell>
                <TableCell>$2999</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Microsoft Surface Pro
                </TableCell>
                <TableCell>White</TableCell>
                <TableCell>Laptop PC</TableCell>
                <TableCell>$1999</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Magic Mouse 2
                </TableCell>
                <TableCell>Black</TableCell>
                <TableCell>Accessories</TableCell>
                <TableCell>$99</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="overflow-x-auto rounded-md basis-2/5">
          <Table hoverable theme={tableTheme}>
            <caption className="p-5 uppercase text-md font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Login Activity
            </caption>
            <TableHead>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Location</TableHeadCell>
              <TableHeadCell>Last login</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </TableCell>
                <TableCell>Sliver</TableCell>
                <TableCell>Laptop</TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Microsoft Surface Pro
                </TableCell>
                <TableCell>White</TableCell>
                <TableCell>Laptop PC</TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Magic Mouse 2
                </TableCell>
                <TableCell>Black</TableCell>
                <TableCell>Accessories</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
