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
    <>
      <div className="flex space-x-2">
        <div className="overflow-x-auto rounded-md grow">
          {
            isLoading ? <span>Loading...</span>
              :
              <Table hoverable theme={tableTheme}>
                <TableHead>
                  <TableHeadCell>id</TableHeadCell>
                  <TableHeadCell>label</TableHeadCell>
                  <TableHeadCell>vat amount</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">Edit</span>
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {
                    VAT?.map((item) => (
                      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item.id}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </TableCell>
                        <TableCell>
                          {item.percentage}
                        </TableCell>
                        <TableCell>
                          <a
                            href="#"
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            Edit
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
          }
        </div>

        <div className="basis-1/3">
          <Card className="w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <legend className="uppercase text-gray-900 dark:text-white">Add new vat</legend>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Label" value="Label" />
                </div>
                <TextInput
                  id="Label"
                  type="text"
                  placeholder="2020-VAT"
                  {...register("label", { required: "label is required" })}
                  // color={errors.label ? "failure" : ""}
                  helperText={
                    <>
                      {errors.label && <span className="font-medium text-sm">{errors.label.message}</span>}
                    </>
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="percentage" value="Percentage" />
                </div>
                <TextInput id="percentage" type="number"
                  {...register("percentage", {
                    max: { value: 100, message: "value should be <= 100" },
                    min: { value: 0, message: "value should be >= 0" },
                    required: "percentage is required"
                  })}
                  // color={errors.percentage ? "failure" : ""}
                  helperText={
                    <>
                      {errors.percentage && <span className="font-medium text-sm">{errors.percentage.message}</span>}
                    </>
                  }
                />
              </div>
              <Button type="submit">Save &nbsp; {loading && <Spinner size={'sm'} />}</Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
