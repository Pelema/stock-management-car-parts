import { Button, Label, Modal, Select, Spinner, TextInput } from "flowbite-react";
import { CarModel, StockItem, Supplier, TModalProps, VAT } from "../types";
import useMutation from "../hooks/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useQuery from "../hooks/query";
import { Key } from "react";

export function AddStockModalComponent({
    openedModal,
    setOpenedModal,
    refresh
}: TModalProps & { refresh: () => void }) {

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<StockItem>();
    const { data: cars, loading: isCarsLoading, error: isCarError } = useQuery<CarModel[]>({ table: 'car_model', from: 0, to: 10 });
    const { data: suppliers, loading: isSuppliersLoading, error: isSupplierError } = useQuery<Supplier[]>({ table: 'suppliers', from: 0, to: 10 });
    const { data: VATData, loading: isVATLoading, error: isVATError } = useQuery<VAT[]>({ table: 'VAT', from: 0, to: 10 });
    const { insert, data: fetchData, loading, error } = useMutation();
    const net_price = watch("net_price");

    const onSubmit: SubmitHandler<StockItem> = async (values) => {
        await insert('stock', values);
        if (error) {
            toast.error(error);
        }
        if (fetchData) {
            toast.success("supplier added");
            refresh();
            setOpenedModal("");
        }
    }

    return (
        <Modal
            show={openedModal === "stock-modal"}
            onClose={() => setOpenedModal("")}
            size={"3xl"}
        >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>Add new item</Modal.Header>
                <Modal.Body>
                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="oem" value="OEM Number" />
                            </div>
                            <TextInput
                                id="oem"
                                type="text"
                                placeholder="24566"
                                {...register("OEM_number", { required: "OEM number is required" })}
                                // color={errors.label ? "failure" : ""}
                                helperText={
                                    <>
                                        {errors.OEM_number && <span className="font-medium text-sm">{errors.OEM_number.message}</span>}
                                    </>
                                }
                            />
                        </div>
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="manufacturer" value="Manufacturer" />
                            </div>
                            <TextInput
                                id="manufacturer"
                                type="text"
                                placeholder="example.. Centric Parts"
                                {...register("manufacturer", { required: "manufacturer is required" })}
                                // color={errors.manufacturer ? "failure" : ""}
                                helperText={
                                    <>
                                        {errors.manufacturer && <span className="font-medium text-sm">{errors.manufacturer.message}</span>}
                                    </>
                                }
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="VIN" value="VIN" />
                            </div>
                            <TextInput
                                id="VIN"
                                type="text"
                                placeholder="WVWZZZ6RXHKL90H"
                                {...register("VIN", { minLength: { value: 17, message: "min of 17 letters" } })}
                                helperText={
                                    <>
                                        {errors.VIN && <span className="font-medium text-sm">{errors.VIN.message}</span>}
                                    </>
                                }
                            />
                        </div>
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="engine_number" value="Engine Number" />
                            </div>
                            <TextInput
                                id="engine_number"
                                type="text"
                                placeholder="CJZ87443"
                                {...register("engine_number")}
                                helperText={
                                    <>
                                        {errors.engine_number && <span className="font-medium text-sm">{errors.engine_number.message}</span>}
                                    </>
                                }
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="car" value="Car Model" />
                            </div>
                            <Select id="car"
                                className="w-full"
                                {...register("car_model", { required: "car model is required" })}
                                onChange={(e) => {
                                    const car = cars?.find((item) => item.id === parseInt(e.target.value))
                                    setValue("net_price", car?.price as number);
                                }}
                                helperText={
                                    <>
                                        {errors.car_model && <span className="font-medium text-sm">{errors.car_model.message}</span>}
                                    </>
                                }>
                                {cars?.map((item, key: Key) => (
                                    <option key={key} value={item.id}>{item.make} - {item.model}</option>
                                ))}
                            </Select>
                        </div>

                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="model_range" value="Model Range / Year" />
                            </div>
                            <TextInput
                                id="model_range"
                                type="text"
                                placeholder="20,000"
                                {...register("model_range", { required: "model range / year is required" })}
                                helperText={
                                    <>
                                        {errors.model_range && <span className="font-medium text-sm">{errors.model_range.message}</span>}
                                    </>
                                }
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="cost" value="Cost(N$)" />
                            </div>
                            <TextInput
                                id="cost"
                                type="number"
                                placeholder="20,000"
                                {...register("cost", { required: "cost field is required" })}
                                helperText={
                                    <>
                                        {errors.cost && <span className="font-medium text-sm">{errors.cost.message}</span>}
                                    </>
                                }
                            />
                        </div>

                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="vat" value="VAT" />
                            </div>
                            <Select id="vat"
                                {...register("VAT", { required: "VAT is required" })}
                                onChange={(e) => {
                                    const vat = VATData?.find((item) => item.id === parseInt(e.target.value))
                                    if (net_price) setValue("gross_price", (vat?.percentage as number + 100) / 100 * net_price ?? 0)
                                }}
                                helperText={
                                    <>
                                        {errors.VAT && <span className="font-medium text-sm">{errors.VAT.message}</span>}
                                    </>
                                }>
                                {VATData?.map((item, key: Key) => (
                                    <option key={key} value={item.id}>{item.label} - {item.percentage}%</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="net_price" value="Price Exc VAT (N$)" />
                            </div>
                            <TextInput
                                id="net_price"
                                type="number"
                                placeholder="20,000"
                                disabled
                                {...register("net_price", { required: "net_price field is required" })}
                                helperText={
                                    <>
                                        {errors.net_price && <span className="font-medium text-sm">{errors.net_price.message}</span>}
                                    </>
                                }
                            />
                        </div>

                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="gross_price" value="Price Inc VAT (N$)" />
                            </div>
                            <TextInput
                                id="gross_price"
                                type="number"
                                placeholder="20,000"
                                disabled
                                {...register("gross_price", { required: "gross_price field is required" })}
                                helperText={
                                    <>
                                        {errors.gross_price && <span className="font-medium text-sm">{errors.gross_price.message}</span>}
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="available_stock" value="Quantity on Hand" />
                            </div>
                            <TextInput
                                id="available_stock"
                                type="number"
                                placeholder="5,000"
                                {...register("available_stock", { required: "quantity is required" })}
                                helperText={
                                    <>
                                        {errors.available_stock && <span className="font-medium text-sm">{errors.available_stock.message}</span>}
                                    </>
                                }
                            />
                        </div>

                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="min_stock_level" value="Reorder Quantity" />
                            </div>
                            <TextInput
                                id="min_stock_level"
                                type="number"
                                placeholder="1,000"
                                {...register("min_stock_level", { required: "reorder qnty is required" })}
                                helperText={
                                    <>
                                        {errors.min_stock_level && <span className="font-medium text-sm">{errors.min_stock_level.message}</span>}
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="supplier" value="Supplier" />
                            </div>
                            <Select id="supplier"
                                {...register("supplier", { required: "VAT is required" })}
                                helperText={
                                    <>
                                        {errors.supplier && <span className="font-medium text-sm">{errors.supplier.message}</span>}
                                    </>
                                }>
                                {suppliers?.map((item, key: Key) => (
                                    <option key={key} value={item.id}>{item.name} - ({item.email})</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className="justify-end">
                    <Button type="submit">Save {" "} {loading && <Spinner size="sm" />}</Button>
                </Modal.Footer>
            </form>
        </Modal >
    )
}