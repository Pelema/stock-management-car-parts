import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { ReStockItem, StockItem, Supplier, TModalProps, VAT } from "../types";
import useMutation from "../hooks/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useQuery from "../hooks/query";
import { Key } from "react";

export function ReStockModalComponent({
  openedModal,
  setOpenedModal,
  refresh,
  item,
}: TModalProps & { refresh: () => void } & { item: StockItem | undefined }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<ReStockItem>();

  const {
    data: suppliers,
    // loading: isSuppliersLoading,
    // error: isSupplierError,
  } = useQuery<Supplier[]>({ table: "suppliers", from: 0, to: 10 });

  const {
    data: VATData,
    // loading: isVATLoading,
    // error: isVATError,
  } = useQuery<VAT[]>({ table: "VAT", from: 0, to: 10 });

  const { insert, update, data: fetchData, loading, error } = useMutation();
  // const purchase_price = watch("purchase_price");

  const onSubmit: SubmitHandler<ReStockItem> = async (values) => {
    console.log("called..");
    await insert("stock_history", { ...values, stock_id: item?.id });
    if (error) {
      console.log(error);
      return toast.error(error);
    }

    if (item?.id) {
      console.log("updating stock ", item.id);
      await update("stock", item?.id, {
        quantity_on_hand: item.quantity_on_hand + values.quantity_received,
      });
    }

    if (fetchData) {
      toast.success("Stock updated!");
      refresh();
      setOpenedModal("");
    }
  };

  return (
    <Modal
      show={openedModal === "restock-modal"}
      onClose={() => setOpenedModal("")}
      size={"3xl"}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>Restock - {item?.OEM_number}</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="invoice_number" value="Invoice #" />
            </div>
            <TextInput
              id="invoice_number"
              type="text"
              placeholder="INV-2984"
              {...register("invoice_number", {
                required: "Invoice # field is required",
              })}
              helperText={
                <>
                  {errors.invoice_number && (
                    <span className="font-medium text-sm">
                      {errors.invoice_number.message}
                    </span>
                  )}
                </>
              }
            />
          </div>
          <div className="flex space-x-2">
            <div className="grow basis-1">
              <div className="mb-2 block">
                <Label htmlFor="purchase_price" value="Purchase price(N$)" />
              </div>
              <TextInput
                id="purchase_price"
                type="number"
                placeholder="20,000"
                {...register("purchase_price", {
                  required: "Purchase price field is required",
                })}
                helperText={
                  <>
                    {errors.purchase_price && (
                      <span className="font-medium text-sm">
                        {errors.purchase_price.message}
                      </span>
                    )}
                  </>
                }
              />
            </div>

            <div className="grow basis-1">
              <div className="mb-2 block">
                <Label htmlFor="vat" value="Markup" />
              </div>
              <Select
                id="mark_up_perc"
                {...register("markup_perc", {
                  required: "Markup is required",
                })}
                helperText={
                  <>
                    {errors.markup_perc && (
                      <span className="font-medium text-sm">
                        {errors.markup_perc.message}
                      </span>
                    )}
                  </>
                }
              >
                {VATData?.map((item, key: Key) => (
                  <option key={key} value={item.id}>
                    {item.label} - {item.percentage}%
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow basis-1">
              <div className="mb-2 block">
                <Label htmlFor="quantity_received" value="Quantity received" />
              </div>
              <TextInput
                id="quantity_received"
                type="number"
                placeholder="5,000"
                {...register("quantity_received", {
                  required: "quantity is required",
                })}
                helperText={
                  <>
                    {errors.quantity_received && (
                      <span className="font-medium text-sm">
                        {errors.quantity_received.message}
                      </span>
                    )}
                  </>
                }
              />
            </div>
            <div className="grow basis-1">
              <div className="mb-2 block">
                <Label htmlFor="supplier_id" value="Supplier" />
              </div>
              <Select
                id="supplier_id"
                {...register("supplier_id", {
                  required: "Supplier field is required",
                })}
                helperText={
                  <>
                    {errors.supplier_id && (
                      <span className="font-medium text-sm">
                        {errors.supplier_id.message}
                      </span>
                    )}
                  </>
                }
              >
                {suppliers?.map((item, key: Key) => (
                  <option key={key} value={item.id}>
                    {item.name} - ({item.email})
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="markup_price" value="Price Inc VAT (N$)" />
              </div>
              <TextInput
                id="markup_price"
                type="number"
                placeholder="20,000"
                {...register("markup_price", {
                  required: "Markup price field is required",
                })}
                helperText={
                  <>
                    {errors.markup_price && (
                      <span className="font-medium text-sm">
                        {errors.markup_price.message}
                      </span>
                    )}
                  </>
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button type="submit">Save {loading && <Spinner size="sm" />}</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
