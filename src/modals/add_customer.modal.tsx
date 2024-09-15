import { Button, Label, Modal, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import { CarModel, Customer, StockItem, Supplier, TModalProps, VAT } from "../types";
import useMutation from "../hooks/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useQuery from "../hooks/query";
import { Key } from "react";

export function AddCustomerModalComponent({
    openedModal,
    setOpenedModal,
    refresh
}: TModalProps & { refresh: () => void }) {

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Customer>();
    const { insert, data: fetchData, loading, error } = useMutation();

    const onSubmit: SubmitHandler<Customer> = async (values) => {
        await insert('stock', values);
        if (error) {
            toast.error(error);
        }
        if (fetchData) {
            toast.success("customer added");
            refresh();
            setOpenedModal("");
        }
    }

    return (
        <Modal
            show={openedModal === "customer-modal"}
            onClose={() => setOpenedModal("")}
            size={"xl"}
        >
            <Modal.Header>Add new customer</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="customer" value="Customer Name" />
                        </div>
                        <TextInput
                            id="customer"
                            type="text"
                            placeholder="customer name"
                            {...register("name", { required: "customer name is required" })}
                            helperText={
                                <>
                                    {errors.name && <span className="font-medium text-sm">{errors.name.message}</span>}
                                </>
                            }
                        />
                    </div>

                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="customer_phone" value="Contact Number" />
                        </div>
                        <TextInput
                            id="customer_phone"
                            type="tel"
                            placeholder="customer_phone"
                            {...register("contact", { required: "customer phone name is required" })}
                            helperText={
                                <>
                                    {errors.contact && <span className="font-medium text-sm">{errors.contact.message}</span>}
                                </>
                            }
                        />
                    </div>

                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="company_name" value="Company Name" />
                        </div>
                        <TextInput
                            id="company_name"
                            type="text"
                            placeholder="company name"
                            {...register("company_name", { required: "company name is required" })}
                        />
                    </div>
                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="company_reg" value="Company Reg #" />
                        </div>
                        <TextInput
                            id="company_reg"
                            type="text"
                            placeholder="company registration number"
                            {...register("company_reg")}
                        />
                    </div>
                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="VAT_reg" value="VAT Reg Number" />
                        </div>
                        <TextInput
                            id="VAT_reg"
                            type="text"
                            placeholder="VAT reg number"
                            {...register("VAT_reg")}
                        />
                    </div>
                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <Textarea
                            id="address"
                            placeholder="Address"
                            rows={3}
                            {...register("address")}
                        />
                    </div>

                    <Button type="submit">Save {"\t\t"} {loading && <Spinner size="sm" />}</Button>
                </form>
            </Modal.Body>
            {/* <Modal.Footer className="justify-end">
                <Button onClick={() => setOpenedModal("")}>Save</Button>
            </Modal.Footer> */}
        </Modal>
    )
}