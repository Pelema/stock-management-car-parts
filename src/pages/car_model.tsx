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
import { ListSkeletalComponent, TableFooterComponent, TableHeaderComponent } from "../components";
import { Key, useState } from "react";
import useQuery from "../hooks/query";
import useMutation from "../hooks/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { CarModel } from "../types";
import { toast } from "sonner";
import { formatCurrency } from "../functions";

export function CarModelPage() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  
  const { insert, data: fetchData, loading, error } = useMutation();
  const { data: cars, loading: isLoading, error: isError, refresh, count } = useQuery<CarModel[]>({ table: 'car_model', from: 0, to: 10 });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CarModel>()

  const onSubmit: SubmitHandler<CarModel> = async (values) => {
    await insert('car_model', values);
    if (error) {
      toast.error(error);
    }
    if (fetchData) {
      toast.success("car added");
      refresh();
    }
  }

  return (
    <div className="flex space-x-2 h-full">
      <div className="overflow-x-auto rounded-md grow">
        <TableHeaderComponent />
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
            {
              isLoading ?
                <ListSkeletalComponent cols={3} /> :
                <>
                  {cars.map((item, key: Key) => (
                    <TableRow key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.make}</TableCell>
                      <TableCell>{item.model}</TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
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
                </>
            }
          </TableBody>
        </Table>
        <TableFooterComponent
          count={count}
          setStart={setStart}
          setEnd={setEnd}
          start={start}
        />
      </div>

      <div className="basis-1/3">
        <Card className="w-full">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <legend className="uppercase text-gray-900 dark:text-white">
              Add new car model
            </legend>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="make" value="Make" />
              </div>
              <TextInput
                id="make"
                type="text"
                placeholder="Volkswagen"
                required
                {...register("make", { required: "make is required" })}
                // color={errors.label ? "failure" : ""}
                helperText={
                  <>
                    {errors.make && <span className="font-medium text-sm">{errors.make.message}</span>}
                  </>
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="model" value="Model" />
              </div>
              <TextInput
                id="model"
                type="text"
                placeholder="Polo"
                required
                {...register("model", { required: "model is required" })}
                // color={errors.label ? "failure" : ""}
                helperText={
                  <>
                    {errors.model && <span className="font-medium text-sm">{errors.model.message}</span>}
                  </>
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price(N$)" />
              </div>
              <TextInput id="price" type="number"
                {...register("price", {
                  min: { value: 0, message: "value should be >= 0" },
                  required: "price is required"
                })}
                helperText={
                  <>
                    {errors.price && <span className="font-medium text-sm">{errors.price.message}</span>}
                  </>
                }
              />
            </div>
            <Button type="submit">Save {" "} {loading && <Spinner size={'sm'} />}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

