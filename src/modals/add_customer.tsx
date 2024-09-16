import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useMutation from "../hooks/mutation";
import { Customer, TModalProps } from "../types";
import { useEffect } from "react";

export function AddCustomerModalComponent({
    openedModal,
    setOpenedModal,
    refresh,
    customer
}: TModalProps & { refresh: () => void, customer: Customer | null }) {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Customer>();
    const { insert, update, loading } = useMutation();

    const onSubmit: SubmitHandler<Customer> = async (values) => {
        const { data, error } = customer ? await update('customers', customer.id, values) : await insert('customers', values);
        if (error) {
            toast.error(error.message);
        }
        if (data) {
            reset();
            refresh();
            setOpenedModal("");
            toast.success(`customer ${customer ? "updated" : "added"}`);
        }
    }

    useEffect(() => {
        if (customer?.id) {
            setValue("name", customer.name);
            setValue("contact", customer.contact);
            setValue("company_name", customer.company_name);
            setValue("company_reg", customer.company_reg);
            setValue("VAT_reg", customer.VAT_reg);
            setValue("address", customer.address);
        }
    }, [customer])

    return (
        <Modal
            show={openedModal === "customer-modal"}
            onClose={() => { setOpenedModal(""); reset(); }}
            size={"xl"}
        >
            <Modal.Header>{customer ? "Update" : "Add new"} customer</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="customer" value="Customer Name" />
                        </div>
                        <TextInput
                            id="customer"
                            type="text"
                            placeholder="Customer name"
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
                            placeholder="customer phone"
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
                            placeholder="Company name"
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
                            placeholder="Company registration number"
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

                    <Button isProcessing={loading} type="submit">Save</Button>
                </form>
            </Modal.Body>
            {/* <Modal.Footer className="justify-end">
                <Button onClick={() => setOpenedModal("")}>Save</Button>
            </Modal.Footer> */}
        </Modal>
    )
}