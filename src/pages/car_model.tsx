import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  Label,
  TextInput,
} from "flowbite-react";
import { tableTheme } from "./table_theme";

export function CarModelPage() {
  return (
    <>
      <div className="flex space-x-2">
        <div className="overflow-x-auto rounded-md grow">
          <Table hoverable theme={tableTheme}>
            <TableHead>
              <TableHeadCell>id</TableHeadCell>
              <TableHeadCell>make</TableHeadCell>
              <TableHeadCell>model</TableHeadCell>
              <TableHeadCell>price</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {data.map((item) => (
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.make}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="basis-1/3">
          <Card className="w-full">
            <form className="flex flex-col gap-4">
              <legend className="uppercase text-gray-900 dark:text-white">
                Add new car model
              </legend>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Make" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Model" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Price" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

const data = [
  { id: 1, make: "Chevrolet", model: "Camaro", price: 61435.88 },
  { id: 2, make: "Honda", model: "Accord", price: 89209.63 },
  { id: 3, make: "Volvo", model: "C70", price: 13210.24 },
  { id: 4, make: "BMW", model: "8 Series", price: 12034.51 },
  { id: 5, make: "Saab", model: "900", price: 6696.86 },
  { id: 6, make: "Chevrolet", model: "Express 1500", price: 69812.75 },
  { id: 7, make: "Bentley", model: "Mulsanne", price: 67448.93 },
  { id: 8, make: "Chevrolet", model: "Suburban 1500", price: 67464.79 },
  { id: 9, make: "Buick", model: "Enclave", price: 31564.94 },
  { id: 10, make: "Plymouth", model: "Prowler", price: 24825.74 },
  { id: 11, make: "GMC", model: "Savana 2500", price: 67453.45 },
  { id: 12, make: "Saab", model: "9-5", price: 16133.49 },
  { id: 13, make: "Chevrolet", model: "Prizm", price: 63654.43 },
  { id: 14, make: "Mazda", model: "CX-9", price: 41101.75 },
  { id: 15, make: "Bentley", model: "Continental GTC", price: 27718.73 },
  { id: 16, make: "Dodge", model: "Viper", price: 31782.07 },
  { id: 17, make: "BMW", model: "7 Series", price: 55560.48 },
  { id: 18, make: "Nissan", model: "240SX", price: 79440.31 },
  { id: 19, make: "Cadillac", model: "CTS-V", price: 68753.47 },
  { id: 20, make: "Nissan", model: "Pathfinder", price: 58058.25 },
];
