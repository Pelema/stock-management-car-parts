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
  Spinner,
} from "flowbite-react";
import { tableTheme } from "./table_theme";
import { VAT } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useMutation from "../hooks/mutation";
import useQuery from "../hooks/query";

export function VATPage() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<VAT>()

  const { insert, data: fetchData, loading, error } = useMutation();
  const { data: VAT, loading: isLoading, error: isError, refresh } = useQuery<VAT[]>('VAT', false, 0, 10);

  const onSubmit: SubmitHandler<VAT> = async (values) => {
    await insert('VAT', values);
    if (error) {
      toast.error(error);
    }
    if (fetchData) {
      toast.success("VAT added");
      // refresh;
    }
  }

  return (
    <div className="flex space-x-2 h-full">
      <div className="overflow-x-auto rounded-md grow">
        <Table hoverable theme={tableTheme}>
          <TableHead>
            <TableHeadCell>id</TableHeadCell>
            <TableHeadCell>vat amount</TableHeadCell>
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

      <div className="basis-1/3">
        <Card className="w-full">
          <form className="flex flex-col gap-4">
            <legend className="uppercase text-gray-900 dark:text-white">
              Add new vat
            </legend>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Label" />
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
                <Label htmlFor="password1" value="Percentage" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
