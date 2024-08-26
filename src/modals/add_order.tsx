import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { Order, TModalProps } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import useMutation from "../hooks/mutation";
import { toast } from "sonner";

export function AddOrderModalComponent({
    openedModal,
    setOpenedModal,
    refresh
}: TModalProps & { refresh: () => void }) {

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Order>();
    const { insert, data: fetchData, loading, error } = useMutation();

    const onSubmit: SubmitHandler<Order> = async (values) => {
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
            show={openedModal === "order-modal"}
            onClose={() => setOpenedModal("")}
            size={"2xl"}
        >
            <form className="flex flex-col gap-4">
                <Modal.Header>Add new order</Modal.Header>
                <Modal.Body>
                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Name" />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="name@flowbite.com"
                                required
                            />
                        </div>
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Email" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Telephone" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Address" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Contact Person" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Website URL" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="VAT Registration" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                        <div className="grow">
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Company Reg. Number" />
                            </div>
                            <TextInput id="password1" type="password" required />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-end">
                    <Button type="submit">Save {" "} {loading && <Spinner size="sm" />}</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}