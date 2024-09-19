import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Invoice, PaymentInput, TModalProps } from "../types";
import useMutation from "../hooks/mutation";

export function AddPaymentModalComponent({
    openedModal,
    setOpenedModal,
    invoice,
    refresh
}: TModalProps & { invoice: Invoice, refresh: () => void }) {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<PaymentInput>();

    const { loading, insert, update } = useMutation();

    const onSubmit: SubmitHandler<PaymentInput> = async (values) => {
        const { data: invoiceD, error: invoiceError } = await update('invoices', invoice?.id, { status: values.amount >= invoice.total_amount ? "paid" : "partially_paid" });
        if (invoiceError) {
            toast.error(invoiceError.message);
            return
        }

        if (invoiceD) {
            const { data: payment, error: paymentError } = await insert('payments', { invoice_id: invoice.id, payment_date: new Date, amount_paid: values.amount, payment_method: values.method });
            if (paymentError) {
                toast.error(paymentError.message);
            }
            if (payment) {
                toast.success("payment added successfully");
                refresh();
                setOpenedModal("");
            }
        }
    }

    return (
        <Modal
            show={openedModal === "payment-modal"}
            onClose={() => {
                setOpenedModal("");
                reset();
            }}
            size={"lg"}
        >
            <Modal.Header>Make Payment</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="amount" value="Amount(N$)" />
                        </div>
                        <TextInput
                            id="amount"
                            type="number"
                            placeholder="amount"
                            {...register("amount", { required: "amount is required" })}
                            helperText={
                                <>
                                    {errors.amount && <span className="font-medium text-sm text-red-600">{errors.amount.message}</span>}
                                </>
                            }
                        />
                    </div>

                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="method" value="Payment Method" />
                        </div>
                        <Select
                            id="method"
                            {...register("method", { required: "method is required" })}
                            helperText={
                                <>
                                    {errors.method && <span className="font-medium text-sm text-red-600">{errors.method.message}</span>}
                                </>
                            }
                        >
                            <option value="cash">Cash</option>
                            <option value="credit-card">Credit Card</option>
                            <option value="bank-transfer">Bank Transfer(EFT)</option>
                        </Select>
                    </div>

                    <Button isProcessing={loading} disabled={loading} type="submit">Save</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}