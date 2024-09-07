import { Button, Label, Popover, Spinner, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Customer } from "../types";
import useMutation from "../hooks/mutation";
import { toast } from "sonner";

export default function AddCustomer({ refresh }: { refresh: () => void }) {

    const { register: regCustomer, handleSubmit: handleSubmitCustomer, formState: { errors: customerFormError } } = useForm<Customer>();
    const { insert, data: fetchData, loading, error } = useMutation();

    const onCreateCustomer: SubmitHandler<Customer> = async (values) => {
        await insert('customers', values);
        if (error) {
            toast.error(error);
        }
        if (fetchData) {
            toast.success("customer added");
            refresh();
        }
    }


    const content = (
        <div className="p-4 w-80">
            <form className="flex flex-col gap-2" onSubmit={handleSubmitCustomer(onCreateCustomer)}>
                <div className="grow">
                    <div className="mb-2 block">
                        <Label htmlFor="customer" value="Customer Name" />
                    </div>
                    <TextInput
                        id="customer"
                        type="text"
                        placeholder="customer name"
                        {...regCustomer("name", { required: "customer name is required" })}
                        helperText={
                            <>
                                {customerFormError.name && <span className="font-medium text-sm">{customerFormError.name.message}</span>}
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
                        {...regCustomer("contact", { required: "customer phone name is required" })}
                        helperText={
                            <>
                                {customerFormError.contact && <span className="font-medium text-sm">{customerFormError.contact.message}</span>}
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
                        {...regCustomer("company_name", { required: "company name is required" })}
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
                        {...regCustomer("company_reg")}
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
                        {...regCustomer("VAT_reg")}
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
                        {...regCustomer("address")}
                    />
                </div>

                <Button type="submit">Save {"\t\t"} {loading && <Spinner size="sm" />}</Button>
            </form>
        </div>
    )

    // return content;
    return (
        <Popover content={content}>
            <Button size={"sm"}>Add Customer</Button>
        </Popover>
    )
}