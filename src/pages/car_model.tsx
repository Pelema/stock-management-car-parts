import {
  Button,
  Card,
  Dropdown,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput
} from "flowbite-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiPencil, HiTrash } from "react-icons/hi";
import { toast } from "sonner";
import { ListSkeletalComponent, TableActionsComponent, TableFooterComponent, TableHeaderComponent } from "../components";
import { formatCurrency } from "../functions";
import useMutation from "../hooks/mutation";
import useQuery from "../hooks/query";
import { CarModel } from "../types";
import { tableTheme } from "./table_theme";

export function CarModelPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<CarModel>()
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);

  const { insert, update, loading } = useMutation();
  const { data: cars, search, loading: isLoading, refresh, count } = useQuery<CarModel[]>({ table: 'car_model', from: start, to: end });

  const onSubmit: SubmitHandler<CarModel> = async (values) => {
    const { data, error } = selectedCar ? await update('car_model', selectedCar.id, values) : await insert('car_model', values);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      reset();
      refresh();
      toast.success(`selectedCar ${selectedCar ? "updated" : "added"}`);
    }
  }

  useEffect(() => {
    if (selectedCar?.id) {
      setValue("make", selectedCar.make);
      setValue("model", selectedCar.model);
      setValue("price", selectedCar.price);
    }
  }, [selectedCar])

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(`make.ilike.%${text}%,model.ilike.%${text}%`);
  }

  return (
    <div className="flex space-x-2 h-full">
      <div className="overflow-x-auto rounded-md grow">
        <TableHeaderComponent onSearch={onSearch} />
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
                  {cars.map((item, key) => (
                    <TableRow key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {start + key + 1}
                      </TableCell>
                      <TableCell>{item.make}</TableCell>
                      <TableCell>{item.model}</TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => {
                                setSelectedCar(item);
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setSelectedCar(item);
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </>
                        </TableActionsComponent>
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
              {selectedCar ? "Update " : "Add new"} car model
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
            <Button disabled={loading} isProcessing={loading} type="submit">Save</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

