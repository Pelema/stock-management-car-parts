import {
  Button,
  Card,
  Dropdown,
  Label,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiPencil, HiTrash } from "react-icons/hi";
import { toast } from "sonner";
import { ListSkeletalComponent, TableActionsComponent } from "../components";
import useMutation from "../hooks/mutation";
import useQuery from "../hooks/query";
import { ConfirmModal } from "../modals";
import { VAT } from "../types";
import { tableTheme } from "./table_theme";

export function MarkupPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [selectedVAT, setSelectedVAT] = useState<VAT | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<VAT>()

  const { insert, update, onDelete, loading } = useMutation();
  const { data: VAT, loading: isLoading, refresh } = useQuery<VAT[]>({ table: 'VAT', is_single: false, from: 0, to: 10 });

  const onSubmit: SubmitHandler<VAT> = async (values) => {
    const { data, error } = selectedVAT ? await update('VAT', selectedVAT.id, values) : await insert('VAT', values);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      reset();
      refresh();
      toast.success(`selectedVAT ${selectedVAT ? "updated" : "added"}`);
    }
  }

  const confirmDelete = async () => {
    const { data, error } = await onDelete("VAT", selectedVAT?.id as number);
    if (data) {
      toast.success(`${selectedVAT?.label} deleted`);
      setOpenedModal("");
      refresh();
    }

    if (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (selectedVAT?.id) {
      setValue("label", selectedVAT.label);
      setValue("percentage", selectedVAT.percentage);
    }
  }, [selectedVAT])

  return (
    <>
      <div className="flex space-x-2">
        <div className="overflow-x-auto rounded-md grow">
          <Table hoverable theme={tableTheme}>
            <TableHead>
              <TableHeadCell>id</TableHeadCell>
              <TableHeadCell>label</TableHeadCell>
              <TableHeadCell>vat amount(%)</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {isLoading ?
                <ListSkeletalComponent cols={2} />
                :
                <>
                  {
                    VAT?.map((item, key) => (
                      <TableRow key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {key + 1}
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </TableCell>
                        <TableCell>
                          {item.percentage}
                        </TableCell>
                        <TableCell>
                          <TableActionsComponent>
                            <>
                              <Dropdown.Item
                                icon={HiPencil}
                                onClick={() => {
                                  setSelectedVAT(item);
                                }}
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                icon={HiTrash}
                                onClick={() => {
                                  setSelectedVAT(item);
                                  setOpenedModal("confirm-modal")
                                }}
                              >
                                Delete
                              </Dropdown.Item>
                            </>
                          </TableActionsComponent>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </>
              }
            </TableBody>
          </Table>
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
        <ConfirmModal
          openedModal={openedModal}
          setOpenedModal={setOpenedModal} confirm={confirmDelete} loading={loading} />
      </div>
    </>
  );
}
