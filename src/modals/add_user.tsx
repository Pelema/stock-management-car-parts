import { Button, Label, Modal, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import { CarModel, Customer, StockItem, Supplier, TModalProps, UserInputs, VAT } from "../types";
import useMutation from "../hooks/mutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useQuery from "../hooks/query";
import { Key } from "react";
import useAdmin from "../hooks/admin";

export function AddUserModalComponent({
    openedModal,
    setOpenedModal
}: TModalProps) {

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserInputs>();
    const { createUser, updateUser, data: fetchData, loading, error } = useAdmin();

    const onSubmit: SubmitHandler<UserInputs> = async (values) => {
        await createUser(values);
        if (error) {
            toast.error(error);
        }
        if (fetchData) {
            toast.success("user added");
            setOpenedModal("");
        }
    }

    return (
        <Modal
            show={openedModal === "user-modal"}
            onClose={() => setOpenedModal("")}
            size={"lg"}
        >
            <Modal.Header>Add new user</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Full Name" />
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="fullname"
                            {...register("fullname", { required: "fullname is required" })}
                            helperText={
                                <>
                                    {errors.fullname && <span className="font-medium text-sm text-red-600">{errors.fullname.message}</span>}
                                </>
                            }
                        />
                    </div>

                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="email"
                            {...register("email", { required: "email is required" })}
                            helperText={
                                <>
                                    {errors.email && <span className="font-medium text-sm text-red-600">{errors.email.message}</span>}
                                </>
                            }
                        />
                    </div>

                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Phone Number" />
                        </div>
                        <TextInput
                            id="phone"
                            type="phone"
                            placeholder="phone"
                            {...register("phone", { required: "phone is required" })}
                            helperText={
                                <>
                                    {errors.phone && <span className="font-medium text-sm text-red-600">{errors.phone.message}</span>}
                                </>
                            }
                        />
                    </div>

                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="role" value="Role" />
                        </div>
                        <Select
                            id="role"
                            {...register("role", { required: "role is required" })}
                            helperText={
                                <>
                                    {errors.role && <span className="font-medium text-sm text-red-600">{errors.role.message}</span>}
                                </>
                            }
                        >
                            <option value="sales">Sales</option>
                            <option value="stock">Stock</option>
                        </Select>
                    </div>

                    <div className="grow">
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="password"
                            {...register("password", { required: "password is required" })}
                            helperText={
                                <>
                                    {errors.password && <span className="font-medium text-sm text-red-600">{errors.password.message}</span>}
                                </>
                            }
                        />
                    </div>

                    <Button disabled={loading} type="submit">Save &nbsp;&nbsp; {loading && <Spinner size="sm" />}</Button>
                </form>
            </Modal.Body>
            {/* <Modal.Footer className="justify-end">
                <Button onClick={() => setOpenedModal("")}>Save</Button>
            </Modal.Footer> */}
        </Modal>
    )
}