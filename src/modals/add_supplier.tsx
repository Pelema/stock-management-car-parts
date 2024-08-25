import { Modal, Label, TextInput, Button, Spinner } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Supplier } from "../types";
import { toast } from "sonner";
import useMutation from "../hooks/mutation";

type TAddSupplierModalProps = {
  openedModal: string;
  setOpenedModal: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddSupplierModal({
  openedModal,
  setOpenedModal,
}: TAddSupplierModalProps) {

  const { insert, data: fetchData, loading, error } = useMutation();
  const { register, handleSubmit } = useForm<Supplier>()
 
  const onSubmit: SubmitHandler<Supplier> = async (values) => {
    await insert('suppliers', values);
    if (error) {
      toast.error(error);
    }
    if (fetchData) {
      toast.success("supplier added");
    }
  }

  return (
    <Modal
      show={openedModal === "add-supplier-modal"}
      onClose={() => setOpenedModal("")}
      size={"2xl"}
    >
      <Modal.Header>Add new supplier</Modal.Header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="flex space-x-2">

            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" type="text" required
                {...register("name")}
              />
            </div>

            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                {...register("email")}
              />
            </div>

          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="telephone" value="Telephone" />
              </div>
              <TextInput
                id="telephone" type="tel" required
                {...register("telephone")}
              />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput id="address" type="text" required
                {...register("address")}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="contact_person" value="Contact Person" />
              </div>
              <TextInput id="contact_person" type="text" required
                {...register("contact_person")}
              />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="website" value="Website URL" />
              </div>
              <TextInput id="website" type="url"
                {...register("website")}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="VAT_reg" value="VAT Registration" />
              </div>
              <TextInput id="VAT_reg" type="text"
                {...register("VAT_reg")} />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="company_reg" value="Company Reg. Number" />
              </div>
              <TextInput id="company_reg" type="text"
                {...register("company_reg")} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button type="submit">Save &nbsp; {loading && <Spinner size={'sm'} />}</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
